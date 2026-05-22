/**
 * POST /api/BritishTelecom/process-order
 *
 * Full BT Wholesale order submission flow.
 *
 * The client sends the cart exactly as it was stored by Broadbandplans.tsx
 * — every item is a `Plan` from app/context/CartContext, carrying:
 *
 *   • productOfferingQualificationItem  ← canonical BT POQ row
 *   • zoikoPlan + zoikoVariation        ← Zoiko-side plan + chosen variation
 *   • address                           ← FormattedAddress chosen on the POQ step
 *   • bt_plan_id                        ← variation.effective_bt_plan_id (e.g. "E0000429")
 *
 * That means we never have to sniff `name` or guess speeds: every value
 * needed for the three BT calls is read directly off these fields.
 *
 * Flow per the BT API flow doc:
 *
 *   Step A     GET  /common/geographicAddressManagement/v1/geographicAddress
 *                       ?postcode=…&addressSource=ROBT
 *              (resolves a RoBT site id — required by the order endpoint)
 *
 *   Step 5.1   POST /common/appointmentManagement/v4/searchTimeSlot
 *   Step 5.2   POST /common/appointmentManagement/v4/appointment
 *   Step 6     POST /hubco/tmf/productOrderingManagement/v4/productOrder
 *
 * (Auth, address search and product availability — steps 1–4 in the doc —
 *  already happened earlier in the user's journey.)
 */

import { NextRequest, NextResponse } from "next/server";
import { callApi } from "../_lib/callApi";
import type {
  Plan,
  BTProductOfferingQualificationItem,
  ProductCharacteristic,
  FormattedAddress,
  ZoikoVariation,
} from "@/app/context/CartContext";

// ─── Request / billing shape ──────────────────────────────────────────────────

interface BillingAddress {
  firstName: string;
  lastName: string;
  companyName?: string;
  region?: string;
  state?: string;
  city?: string;
  street?: string;
  houseNumber?: string;
  zip?: string;
  phone: string;
  email: string;
}

interface OrderRequestBody {
  billingAddress: BillingAddress;
  shippingAddress: BillingAddress;
  coupon: { type: string; discount: string | number } | null;
  cart: Plan[];
  totals: { subtotal: number; discount: number; total: number };
  agreedToTerms: boolean;
  paymentMethod: string;
  createdAt: string;
  /** Optional explicit override. If absent we use cart[0].address. */
  serviceAddress?: FormattedAddress;
}

// ─── Helpers: read fields off the cart item ───────────────────────────────────

function generateOrderId(): string {
  return String(Math.floor(Math.random() * 99999) + 1);
}

/** Read a characteristic value by name (case-insensitive). */
function readChar(
  chars: ProductCharacteristic[] | undefined,
  name: string
): string {
  if (!chars?.length) return "";
  const wanted = name.toLowerCase();
  const hit = chars.find((c) => (c?.name ?? "").toLowerCase() === wanted);
  return (hit?.value ?? "").trim();
}

/**
 * Resolve the AccessTechnology value.
 *
 * `productOfferingQualificationItem.product.productCharacteristic[].name=AccessTechnology`
 * is authoritative — BT returns "SOGEA", "FTTC", "FTTP", "SOADSL", "ADSL".
 *
 * Per the BT flow doc §5, the appointment endpoints want a slightly different
 * spelling for SOGEA new installs ("SOGEA New Line"). The order endpoint keeps
 * the raw value in ATT_RT_AccessTechnology.
 */
function resolveAccessTechnology(
  poq: BTProductOfferingQualificationItem
): { raw: string; appointment: string } {
  const raw =
    readChar(poq.product.productCharacteristic, "AccessTechnology") || "FTTP";
  const upper = raw.toUpperCase();

  let appointment = raw;
  if (upper === "SOGEA") appointment = "SOGEA New Line";
  else if (upper === "FTTP") appointment = "FTTP";
  else if (upper === "FTTC") appointment = "FTTC";
  else if (upper === "SOADSL") appointment = "SOADSL";
  else if (upper === "ADSL") appointment = "ADSL";

  return { raw: upper, appointment };
}

/** BB1 vs Ethernet productSpecification id for appointment endpoints. */
function getProductSpec(rawTech: string): { id: string; family: string } {
  const t = rawTech.toLowerCase();
  if (t.includes("ethernet") || t.includes("gea_eth")) {
    return { id: "Ethernet", family: "Ethernet" };
  }
  return { id: "BB1", family: "BB1hub" };
}

/**
 * Contract term from the selected variation. The variation IS the choice
 * the user made on the plan card — its duration_value + duration_unit are
 * the truth.
 */
function resolveContractTerm(
  variation: ZoikoVariation | null,
  fallbackValidity: string
): { value: number; unit: string } {
  if (variation) {
    const unitRaw = (variation.duration_unit || "month").toLowerCase();
    const unit =
      unitRaw.charAt(0).toUpperCase() +
      unitRaw.slice(1).replace(/s$/, "");
    return { value: variation.duration_value || 24, unit };
  }

  const m = fallbackValidity.match(/^(\d+)\s*(month|year|day)?s?$/i);
  if (m) {
    const value = parseInt(m[1], 10);
    const unitRaw = (m[2] ?? "month").toLowerCase();
    const unit =
      unitRaw.charAt(0).toUpperCase() + unitRaw.slice(1).replace(/s$/, "");
    return { value, unit };
  }
  return { value: 24, unit: "Month" };
}

/** Minimum guaranteed speed → POQ char, fallback to 80% advertised. */
function resolveMinGuaranteedSpeed(
  poq: BTProductOfferingQualificationItem
): string {
  const chars = poq.product.productCharacteristic;

  const fromChar = readChar(chars, "productMinimumGuaranteedSpeed");
  if (fromChar) return String(Math.floor(parseFloat(fromChar) || 0));

  const adv = parseFloat(readChar(chars, "productAdvertisedDownloadSpeed"));
  if (!adv || isNaN(adv)) return "0";
  return String(Math.floor(adv * 0.8));
}

/** District code: FormattedAddress, then poq.product.place[].districtId, else "NS". */
function resolveDistrictCode(
  address: FormattedAddress,
  poq: BTProductOfferingQualificationItem
): string {
  if (address.districtCode) return address.districtCode;
  const placeWithDistrict = poq.product.place?.find((p) => p.districtId);
  return placeWithDistrict?.districtId ?? "NS";
}

/** Repair SLA sub-product code (mirrors WP plugin — Standard Care for all). */
function getRepairSlaCode(_rawTech: string): string {
  return "E0000704";
}

/**
 * Resolve the BT productOffering id we send on the order.
 *   1. Plan.bt_plan_id              (variation.effective_bt_plan_id, e.g. "E0000429")
 *   2. variation.effective_bt_plan_id
 *   3. zoikoPlan.bt_plan_id
 *   4. poq.product.productOffering.id   (e.g. "SOGEA 40_10M" — legacy)
 */
function resolveProductOfferingId(cart: Plan): string {
  return (
    cart.bt_plan_id ??
    cart.zoikoVariation?.effective_bt_plan_id ??
    cart.zoikoPlan?.bt_plan_id ??
    cart.productOfferingQualificationItem.product.productOffering.id
  );
}

// ─── Step A: RoBT site address lookup ─────────────────────────────────────────

/**
 * The BT productOrder endpoint expects a RoBT site address id (starts with
 * "R…"), not the Openreach NAD id (starts with "A…"). The cart only carries
 * the Openreach id, so we hit /geographicAddress with addressSource=ROBT.
 *
 * Returns the RoBT id, or the Openreach id as a graceful fallback.
 */
async function resolveRobtAddressId(
  address: FormattedAddress
): Promise<string> {
  if (!address.postcode) return address.id;

  const endpoint =
    `/common/geographicAddressManagement/v1/geographicAddress` +
    `?postcode=${encodeURIComponent(address.postcode)}&addressSource=ROBT`;

  type RobtAddress = {
    id?: string;
    streetNr?: string;
    streetName?: string;
    postcode?: string;
    uprn?: string;
  };

  const res = await callApi<RobtAddress[]>(endpoint, { method: "GET" });
  if (!res.success) return address.id;

  const list = Array.isArray(res.data) ? res.data : [];
  if (!list.length) return address.id;

  const eqPostcode = (a: string, b: string) =>
    a.replace(/\s+/g, "").toUpperCase() === b.replace(/\s+/g, "").toUpperCase();

  // 1. exact streetNr + streetName + postcode
  if (address.streetNr && address.streetName) {
    const exact = list.find(
      (r) =>
        (r.streetNr ?? "").trim() === (address.streetNr ?? "").trim() &&
        (r.streetName ?? "").trim().toLowerCase() ===
          (address.streetName ?? "").trim().toLowerCase() &&
        eqPostcode(r.postcode ?? "", address.postcode)
    );
    if (exact?.id) return exact.id;
  }

  // 2. UPRN match
  if (address.uprn) {
    const byUprn = list.find((r) => r.uprn === address.uprn);
    if (byUprn?.id) return byUprn.id;
  }

  // 3. First entry
  return list[0]?.id ?? address.id;
}

// ─── Step 5.1: search appointment time slots ──────────────────────────────────

/**
 * Build the searchTimeSlot payload per BT flow doc §5.1.
 *
 *   POST /common/appointmentManagement/v4/searchTimeSlot
 *   relatedEntity[0].product.place[0] = { id, role: "InstallationAddress",
 *                                         "@referredType": "OpenreachAddress" }
 */
function buildSearchTimeSlotPayload(params: {
  cart: Plan;
  appointmentTech: string;
  productSpec: { id: string; family: string };
  startDate: string;
}) {
  const { cart, appointmentTech, productSpec, startDate } = params;
  const address = cart.address!;

  return {
    relatedEntity: [
      {
        appointmentType: "Standard",
        siteVisitReason: "Standard",
        product: {
          productSpecification: { id: productSpec.id },
          characteristic: [
            { name: "AccessTechnology", value: appointmentTech },
          ],
          place: [
            {
              id: address.id, // Openreach NAD id from the cart
              role: "InstallationAddress",
              "@referredType": "OpenreachAddress",
            },
          ],
        },
        id: "1",
        role: "OrderInformation",
        "@referredType": "BTProductAppointmentSpecification",
        "@type": "BTProductAppointmentSpecification",
        "@baseType": "RelatedEntity",
      },
    ],
    requestedTimeSlot: [{ validFor: { startDateTime: startDate } }],
  };
}

interface SlotSearchResponse {
  availableTimeSlot?: Array<{
    id?: string;
    validFor?: { startDateTime?: string; endDateTime?: string };
  }>;
}

async function searchAppointmentSlots(params: {
  cart: Plan;
  appointmentTech: string;
  productSpec: { id: string; family: string };
  startDate: string;
}): Promise<{ start: string; end: string; id?: string } | null> {
  const body = buildSearchTimeSlotPayload(params);

  // console.log(
  //   "[BT processOrder] searchTimeSlot payload:",
  //   JSON.stringify(body, null, 2)
  // );

  const response = await callApi<SlotSearchResponse>(
    "/common/appointmentManagement/v4/searchTimeSlot",
    {
      method: "POST",
      body,
      headers: { productFamily: params.productSpec.family },
    }
  );

  if (!response.success) {
    console.error("[BT processOrder] ❌ Slot search failed:", response.message);
    return null;
  }

  const slots = response.data?.availableTimeSlot ?? [];
  if (!slots.length) return null;

  const first = slots[0];
  return {
    id: first.id,
    start: first.validFor?.startDateTime ?? params.startDate,
    end: first.validFor?.endDateTime ?? params.startDate,
  };
}

// ─── Step 5.2: book the chosen slot ───────────────────────────────────────────

/**
 * Build the appointment booking payload per BT flow doc §5.2.
 *   POST /common/appointmentManagement/v4/appointment
 *
 * Same relatedEntity shape as searchTimeSlot, plus a concrete validFor.
 */
function buildBookAppointmentPayload(params: {
  cart: Plan;
  appointmentTech: string;
  productSpec: { id: string; family: string };
  startTime: string;
  endTime: string;
}) {
  const { cart, appointmentTech, productSpec, startTime, endTime } = params;
  const address = cart.address!;

  return {
    relatedEntity: [
      {
        appointmentType: "Standard",
        siteVisitReason: "Standard",
        product: {
          productSpecification: { id: productSpec.id },
          characteristic: [
            { name: "AccessTechnology", value: appointmentTech },
          ],
          place: [
            {
              id: address.id,
              role: "InstallationAddress",
              "@referredType": "OpenreachAddress",
            },
          ],
        },
        id: "1",
        role: "OrderInformation",
        "@referredType": "BTProductAppointmentSpecification",
        "@type": "BTProductAppointmentSpecification",
        "@baseType": "RelatedEntity",
      },
    ],
    validFor: {
      startDateTime: startTime,
      endDateTime: endTime,
    },
  };
}

interface BookedAppointment {
  id: string;
  start: string;
  end: string;
}

async function bookAppointment(params: {
  cart: Plan;
  appointmentTech: string;
  productSpec: { id: string; family: string };
  startTime: string;
  endTime: string;
}): Promise<BookedAppointment | null> {
  const body = buildBookAppointmentPayload(params);

  // console.log(
  //   "[BT processOrder] bookAppointment payload:",
  //   JSON.stringify(body, null, 2)
  // );

  const response = await callApi<{
    id?: string;
    BESAppointmentId?: string;
    validFor?: { startDateTime?: string; endDateTime?: string };
    status?: string;
  }>("/common/appointmentManagement/v4/appointment", {
    method: "POST",
    body,
    headers: { productFamily: params.productSpec.family },
  });

  if (!response.success) {
    console.error(
      "[BT processOrder] ❌ Appointment booking failed:",
      response.message
    );
    return null;
  }

  return {
    id:
      response.data?.id ??
      response.data?.BESAppointmentId ??
      `APPT-${Date.now()}`,
    start: response.data?.validFor?.startDateTime ?? params.startTime,
    end: response.data?.validFor?.endDateTime ?? params.endTime,
  };
}

// ─── Step 6: build & submit product order (TMF622) ────────────────────────────

/**
 * Build the productOrder payload per BT flow doc §6.
 *
 *   POST /hubco/tmf/productOrderingManagement/v4/productOrder
 *
 * One envelope ({"@type":"BTProductOrder"}) with one productOrderItem,
 * which itself nests sub-items for Repair SLA, IP allocation and Managed
 * Install.
 */
function buildOrderPayload(params: {
  orderId: string;
  externalId: string;
  cart: Plan;
  robtAddressId: string;
  districtCode: string;
  billingAddress: BillingAddress;
  appointmentId: string;
  appointmentStart: string;
  rawTech: string;
  productOfferingId: string;
  contractTerm: { value: number; unit: string };
  btAccount: string;
  btCug: string;
  resellerId: string;
  minGuaranteedSpeed: string;
}) {
  const {
    orderId,
    externalId,
    cart,
    robtAddressId,
    districtCode,
    billingAddress,
    appointmentId,
    appointmentStart,
    rawTech,
    productOfferingId,
    contractTerm,
    btAccount,
    btCug,
    resellerId,
    minGuaranteedSpeed,
  } = params;

  const openreachId = cart.address!.id;
  const firstName = billingAddress.firstName;
  const lastName = billingAddress.lastName;
  const email = billingAddress.email;
  const phone = billingAddress.phone;

  // ── Main product characteristics (ATT_RT_*) ──
  const productCharacteristic: ProductCharacteristic[] = [
    { name: "ATT_RT_AccessTechnology", value: rawTech },
    { name: "ATT_RT_InstallType", value: "M" },
    { name: "ATT_RT_EndUserType", value: "Residential" },
    { name: "ATT_RT_TrafficWeighting", value: "Standard" },
    { name: "ATT_RT_ContractTerm", value: String(contractTerm.value) },
    { name: "ATT_RT_ContractTermUnit", value: contractTerm.unit },
    { name: "ATT_RT_ResellerID", value: resellerId },
    { name: "ATT_X_JOURNEYTYPE", value: "New Line Provide" },
    {
      name: "ATT_RT_ProductMinimumGuaranteedSpeed",
      value: minGuaranteedSpeed,
    },
  ];

  if (rawTech === "FTTP") {
    productCharacteristic.push({ name: "ATT_RT_ONTType", value: "New ONT" });
  }

  // Managed install characteristics — technology-specific
  const managedInstallChars =
    rawTech === "FTTP"
      ? [
          { name: "ATT_RT_ECCChargeband", value: "0" },
          { name: "ATT_RT_FTTPInstallType", value: "1 Stage" },
          { name: "ATT_RT_SiteVisitReason", value: "Standard" },
        ]
      : [
          { name: "ATT_RT_TRChargeBand", value: "0" },
          { name: "ATT_RT_UpperCostBand", value: "Standard" },
          { name: "ATT_RT_SiteVisitReason", value: "Standard" },
        ];

  // ── Sub-items: Repair SLA + IP + Managed Install ──
  const subItems = [
    {
      "@type": "BTProductOrderItem",
      id: `${orderId}.1`,
      action: "add",
      product: {
        "@type": "BTProductRefOrValue",
        productOffering: { id: getRepairSlaCode(rawTech) },
      },
    },
    {
      "@type": "BTProductOrderItem",
      id: `${orderId}.2`,
      action: "add",
      product: {
        "@type": "BTProductRefOrValue",
        productOffering: { id: "E0000703" }, // IP address
      },
    },
    {
      "@type": "BTProductOrderItem",
      id: `${orderId}.3`,
      action: "add",
      product: {
        "@type": "BTProductRefOrValue",
        productOffering: { id: "E0000153" }, // Managed install
        productCharacteristic: managedInstallChars,
      },
    },
  ];

  // ── Main product order item ──
  const mainItem = {
    "@type": "BTProductOrderItem",
    "@baseType": "ProductOrderItem",
    id: orderId,
    action: "add",
    billingAccount: { id: btAccount },
    appointment: {
      "@type": "AppointmentRef",
      id: appointmentId,
      BESAppointmentId: appointmentId,
      appointmentStart,
    },
    additionalNotes: [
      { text: "Engineering instruction", type: "Engineering", "@type": "BTNote" },
      { text: "PT Hazards Note", type: "HazardNote", "@type": "BTNote" },
    ],
    product: {
      "@type": "BTProductRefOrValue",
      "@baseType": "Product",
      productOffering: { id: productOfferingId },
      place: [
        // SiteAddress = RoBT id (R…) — required by BT order endpoint
        {
          "@type": "btRelatedPlaceRefOrValue",
          id: robtAddressId,
          role: "SiteAddress",
        },
        // OpenreachAddress = NAD id (A…)
        {
          "@type": "btRelatedPlaceRefOrValue",
          id: openreachId,
          role: "OpenreachAddress",
          address: { districtCode },
        },
      ],
      productCharacteristic,
      relatedParty: [
        {
          "@type": "BTRelatedParty",
          "@baseType": "RelatedParty",
          "@referredType": "Individual",
          id: "-1",
          role: "PrimarySiteContact",
          givenName: firstName,
          familyName: lastName,
          contactMedium: [
            {
              mediumType: "email",
              characteristic: {
                contactType: "Primary Work",
                emailAddress: email,
              },
            },
            {
              mediumType: "telephone",
              characteristic: {
                contactType: "Primary Work",
                phoneNumber: phone,
              },
            },
          ],
        },
      ],
    },
    productOrderItem: subItems,
  };

  // ── Top-level order envelope ──
  return {
    "@type": "BTProductOrder",
    "@baseType": "ProductOrder",
    externalId,
    requestedCompletionDate: appointmentStart,
    productOrderItem: [mainItem],
    relatedParty: [
      {
        "@type": "BTRelatedParty",
        "@baseType": "RelatedParty",
        "@referredType": "Customer",
        id: btCug,
        role: "BtCug",
        name: "BT CUG",
      },
      {
        "@type": "BTRelatedParty",
        "@baseType": "RelatedParty",
        "@referredType": "Customer",
        id: `${firstName} ${lastName}`.trim(),
        role: "EndCustomer",
      },
      {
        "@type": "BTRelatedParty",
        "@baseType": "RelatedParty",
        "@referredType": "Individual",
        id: "primary_order_contact",
        role: "PrimaryOrderContact",
        givenName: firstName,
        familyName: lastName,
        contactMedium: [
          {
            mediumType: "email",
            characteristic: {
              contactType: "Primary Work",
              emailAddress: email,
            },
          },
          {
            mediumType: "telephone",
            characteristic: {
              contactType: "Primary Work",
              phoneNumber: phone,
            },
          },
        ],
      },
    ],
  };
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  let body: OrderRequestBody;

  try {
    body = (await req.json()) as OrderRequestBody;
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const { billingAddress, cart, serviceAddress } = body;

  // ── Validate ─────────────────────────────────────────────────────────────
  if (!billingAddress?.email || !billingAddress?.firstName) {
    return NextResponse.json(
      {
        success: false,
        message: "billingAddress with firstName and email is required",
      },
      { status: 400 }
    );
  }

  if (!cart?.length) {
    return NextResponse.json(
      { success: false, message: "cart must contain at least one item" },
      { status: 400 }
    );
  }

  const cartItem = cart[0]; // single-line broadband checkout
  const address: FormattedAddress | null =
    serviceAddress ?? cartItem.address ?? null;

  if (!address?.id) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Service address with a valid Openreach id is required. " +
          "Make sure the address from the plan-selection step is stored " +
          "on the cart item.",
      },
      { status: 400 }
    );
  }

  if (!cartItem.productOfferingQualificationItem) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Cart item is missing productOfferingQualificationItem. " +
          "Re-select the plan on /fibre-packages so the cart is rebuilt " +
          "with the BT POQ row.",
      },
      { status: 400 }
    );
  }

  // Make sure the cart row knows its address (used by the payload builders).
  cartItem.address = address;

  // ── Resolve everything from the cart item ────────────────────────────────
  const poq = cartItem.productOfferingQualificationItem;
  const { raw: rawTech, appointment: appointmentTech } =
    resolveAccessTechnology(poq);
  const productSpec = getProductSpec(rawTech);
  const contractTerm = resolveContractTerm(
    cartItem.zoikoVariation ?? null,
    cartItem.validity ?? ""
  );
  const minGuaranteedSpeed = resolveMinGuaranteedSpeed(poq);
  const districtCode = resolveDistrictCode(address, poq);
  const productOfferingId = resolveProductOfferingId(cartItem);

  // ── Env config ───────────────────────────────────────────────────────────
  const btAccount = process.env.BT_ACCOUNT_ID ?? "";
  const btCug = process.env.BT_CUG ?? "CUG5025628076";
  const resellerId = process.env.BT_RESELLER_ID ?? "ABC";
  const isSandbox =
    process.env.NEXT_BT_ENDPOINT_URI?.includes("sandbox") ?? false;

  const orderId = generateOrderId();
  const externalId = `WC-${Date.now()}-${orderId}`;
  const startDate = new Date().toISOString();

  // console.log("[BT processOrder] ========== START ==========");
  // console.log("[BT processOrder] productOfferingId:", productOfferingId);
  // console.log("[BT processOrder] POQ offering.id  :", poq.product.productOffering.id);
  // console.log("[BT processOrder] Openreach NAD id :", address.id);
  // console.log("[BT processOrder] Postcode         :", address.postcode);
  // console.log("[BT processOrder] Raw tech         :", rawTech);
  // console.log("[BT processOrder] Appointment tech :", appointmentTech);
  // console.log("[BT processOrder] Contract         :", contractTerm.value, contractTerm.unit);
  // console.log("[BT processOrder] District code    :", districtCode);
  // console.log("[BT processOrder] Min guaranteed   :", minGuaranteedSpeed);
  // console.log("[BT processOrder] Sandbox          :", isSandbox);

  // ── Step A: RoBT site address ────────────────────────────────────────────
  // console.log("[BT processOrder] Step A: resolving RoBT site address…");
  const robtAddressId = isSandbox
    ? address.id // sandbox: don't burn an API call
    : await resolveRobtAddressId(address);
  // console.log("[BT processOrder] ✅ RoBT site address:", robtAddressId);

  // ── Step 5.1 / 5.2: Appointment ──────────────────────────────────────────
  let appointmentId = "";
  let appointmentStart = "";
  let appointmentEnd = "";

  if (isSandbox) {
    // console.log("[BT processOrder] 🟡 SANDBOX — mocking appointment");
    const installDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    appointmentId = `SANDBOX-APPT-${Date.now()}`;
    appointmentStart = installDate.toISOString();
    appointmentEnd = new Date(
      installDate.getTime() + 5 * 60 * 60 * 1000
    ).toISOString();
  } else {
    // console.log("[BT processOrder] Step 5.1: searchTimeSlot…");
    const slot = await searchAppointmentSlots({
      cart: cartItem,
      appointmentTech,
      productSpec,
      startDate,
    });

    if (!slot) {
      return NextResponse.json(
        {
          success: false,
          message:
            "No appointment slots available for the selected address and technology.",
        },
        { status: 422 }
      );
    }
    // console.log("[BT processOrder] ✅ Slot:", slot.start);

    // console.log("[BT processOrder] Step 5.2: bookAppointment…");
    const booked = await bookAppointment({
      cart: cartItem,
      appointmentTech,
      productSpec,
      startTime: slot.start,
      endTime: slot.end,
    });

    if (!booked) {
      return NextResponse.json(
        { success: false, message: "Failed to book installation appointment." },
        { status: 422 }
      );
    }

    appointmentId = booked.id;
    appointmentStart = booked.start;
    appointmentEnd = booked.end;
    // console.log("[BT processOrder] ✅ Appointment:", appointmentId);
  }

  // ── Step 6: Place product order ──────────────────────────────────────────
  // console.log("[BT processOrder] Step 6: productOrder…");

  const orderPayload = buildOrderPayload({
    orderId,
    externalId,
    cart: cartItem,
    robtAddressId,
    districtCode,
    billingAddress,
    appointmentId,
    appointmentStart,
    rawTech,
    productOfferingId,
    contractTerm,
    btAccount,
    btCug,
    resellerId,
    minGuaranteedSpeed,
  });

  // console.log(
  //   "[BT processOrder] Order payload:",
  //   JSON.stringify(orderPayload, null, 2)
  // );

  const orderResponse = await callApi<Record<string, unknown>>(
    "/hubco/tmf/productOrderingManagement/v4/productOrder",
    {
      method: "POST",
      body: orderPayload,
      headers: {
        productFamily: productSpec.family,
        "apigw-client-id": process.env.BT_APIGW_CLIENT_ID ?? "",
      },
    }
  );

  if (!orderResponse.success) {
    console.error(
      "[BT processOrder] ❌ Order submission failed:",
      orderResponse.message
    );
    return NextResponse.json(
      {
        success: false,
        message: orderResponse.message ?? "BT order submission failed",
        error: (orderResponse as { body?: unknown }).body,
      },
      { status: orderResponse.status_code ?? 500 }
    );
  }

  const statusCode = orderResponse.status_code;
  const data = orderResponse.data;

  // console.log("[BT processOrder] ✅ Order submitted. Status:", statusCode);
  // console.log("[BT processOrder] ========== END ==========");

  if (statusCode === 201 || statusCode === 202) {
    const btOrderId =
      statusCode === 201
        ? (data?.id as string | undefined) ?? externalId
        : `PENDING-${externalId}`;

    return NextResponse.json({
      success: true,
      status: statusCode === 201 ? "created" : "pending",
      btOrderId,
      externalId,
      appointmentId,
      appointmentStart,
      appointmentEnd,
      data,
    });
  }

  return NextResponse.json({
    success: true,
    status: "unknown",
    btOrderId: externalId,
    externalId,
    appointmentId,
    appointmentStart,
    appointmentEnd,
    data,
  });
}