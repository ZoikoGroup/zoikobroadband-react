/**
 * POST /api/BritishTelecom/process-order
 *
 * Full BT Wholesale order submission flow (NO BeQuick).
 *
 * The client (utils/stripeWebPaymentApi.ts) sends the **raw** localStorage
 * cart item — including BT's POQ-enriched `product` object and the matched
 * `zoikoPlan`. We use those instead of re-deriving them from a product name.
 *
 * Flow:
 *   1. Look up RoBT address          → GET  /common/geographicAddressManagement/v1/geographicAddress?postcode=...&addressSource=ROBT
 *   2. Search appointment slots      → POST /common/appointmentManagement/v4/searchTimeSlot
 *   3. Book appointment              → POST /common/appointmentManagement/v4/appointment
 *   4. Place product order           → POST /hubco/tmf/productOrderingManagement/v4/productOrder
 *
 * Expected request body (from utils/stripeWebPaymentApi.ts):
 *   {
 *     billingAddress: {...},
 *     shippingAddress: {...},
 *     cart: [ <raw cart item — see CartItem type below> ],
 *     totals, coupon, agreedToTerms, paymentMethod, createdAt,
 *     serviceAddress?: <legacy/explicit override — preferred if present>
 *   }
 */

import { NextRequest, NextResponse } from "next/server";
import { callApi } from "../_lib/callApi";

// ─── Types ────────────────────────────────────────────────────────────────────

/** Openreach (or RoBT) address as stored in the localStorage cart */
interface CartAddress {
  id: string;            // "A15113070302" (Openreach) or "R00000073111" (RoBT)
  display?: string;
  streetNr?: string;
  streetName?: string;
  city?: string;
  postcode: string;
  districtCode?: string;
  uprn?: string;
  exchangeGroupCode?: string;
  qualifier?: string;    // "Gold" / "Silver" / etc.
}

/** A single product characteristic from BT's POQ response */
interface ProductCharacteristic {
  name: string;
  value: string;
}

/** BT POQ-enriched product object stored inside the cart item */
interface CartBtProduct {
  id: string;                                      // e.g. "SOGEA 40_10M"
  characteristics?: ProductCharacteristic[];
  offering?: { id: string; name?: string };
  place?: Array<{
    id: string;
    role?: string;
    "@referredType"?: string;
  }>;
  download?: string;
  upload?: string;
}

/** Zoiko plan data matched alongside the BT product in the cart */
interface CartZoikoPlan {
  id?: number;
  name?: string;
  variationId?: number;
  contractType?: string;   // e.g. "24-months", "12-months", "1-month"
  price?: string | number;
  salePrice?: string | number | null;
}

/** Raw cart item shape — matches localStorage exactly */
interface CartItem {
  id: string | number;
  name: string;
  price: number | string;
  speed?: string;
  validity?: string;
  description?: string;
  address?: CartAddress;
  product?: CartBtProduct;
  zoikoPlan?: CartZoikoPlan;
  // back-compat — older items may carry a flat bt_plan_id
  bt_plan_id?: string | null;
  // and the older billing-summary fields normalised by the checkout page
  pricePerUnit?: number;
  quantity?: number;
  totalPrice?: number;
}

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
  cart: CartItem[];
  totals: { subtotal: number; discount: number; total: number };
  agreedToTerms: boolean;
  paymentMethod: string;
  createdAt: string;
  /** Explicit address override, forwarded by stripeWebPaymentApi for safety */
  serviceAddress?: CartAddress;
}

// ─── Helpers: read enriched cart shape ────────────────────────────────────────

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
 * Resolve access technology.
 * 1. Read AccessTechnology from POQ characteristics (authoritative).
 * 2. Fallback: derive from product name + address qualifier.
 */
function resolveAccessTechnology(
  cartItem: CartItem,
  address: CartAddress
): string {
  const fromChar = readChar(cartItem.product?.characteristics, "AccessTechnology");
  if (fromChar) {
    // BT returns "SOGEA", "FTTC", "FTTP", "ADSL" etc. directly.
    // For SOGEA new installs the order payload expects "SOGEA New Line".
    if (fromChar.toUpperCase() === "SOGEA") return "SOGEA New Line";
    return fromChar;
  }

  const name = (cartItem.name ?? "").toUpperCase();
  if (name.includes("FTTP") || (address.qualifier ?? "") === "Gold") return "FTTP";
  if (name.includes("SOGEA") || name.includes("SOADSL")) return "SOGEA New Line";
  if (name.includes("FTTC")) return "FTTC";
  if (name.includes("ADSL")) return "ADSL";
  return "FTTP";
}

/**
 * Product specification for the appointment endpoints.
 * BB1hub for residential broadband, Ethernet for GEA.
 */
function getProductSpec(accessTechnology: string) {
  const tech = accessTechnology.toLowerCase();
  if (tech.includes("ethernet") || tech.includes("gea")) {
    return { id: "Ethernet", family: "Ethernet" };
  }
  return { id: "BB1", family: "BB1hub" };
}

/**
 * Resolve contract term.
 * 1. zoikoPlan.contractType  →  "24-months" → { value:24, unit:"Month" }
 * 2. validity                →  "24 Months" / "24" → same
 * 3. Default 24 months.
 */
function resolveContractTerm(cartItem: CartItem): { value: number; unit: string } {
  const fromZoiko = cartItem.zoikoPlan?.contractType ?? "";
  const fromValidity = cartItem.validity ?? "";

  const match = (
    fromZoiko.match(/^(\d+)\s*[-_ ]?\s*(month|year|day)s?$/i) ??
    fromValidity.match(/^(\d+)\s*(month|year|day)s?$/i) ??
    fromValidity.match(/^(\d+)$/)
  );

  if (match) {
    const value = parseInt(match[1], 10);
    const unitRaw = (match[2] ?? "month").toLowerCase();
    const unit = unitRaw.charAt(0).toUpperCase() + unitRaw.slice(1).replace(/s$/, "");
    return { value, unit };
  }

  return { value: 24, unit: "Month" };
}

/**
 * Minimum guaranteed speed.
 * 1. POQ characteristic productMinimumGuaranteedSpeed (authoritative).
 * 2. Fallback: 80% of advertised download.
 */
function resolveMinGuaranteedSpeed(cartItem: CartItem): string {
  const fromChar = readChar(
    cartItem.product?.characteristics,
    "productMinimumGuaranteedSpeed"
  );
  if (fromChar) return String(Math.floor(parseFloat(fromChar) || 0));

  const download =
    cartItem.product?.download ??
    cartItem.speed ??
    "0";
  const val = parseFloat(String(download));
  if (!val || isNaN(val)) return "0";
  return String(Math.floor(val * 0.8));
}

/** District code: prefer explicit field, then look in `place`, then default "NS". */
function resolveDistrictCode(address: CartAddress, cartItem: CartItem): string {
  if (address.districtCode) return address.districtCode;
  const placeWithDistrict = cartItem.product?.place?.find(
    (p) => (p as Record<string, unknown>).districtCode
  ) as { districtCode?: string } | undefined;
  return placeWithDistrict?.districtCode ?? "NS";
}

/** Repair SLA sub-product code by technology (matches WP plugin). */
function getRepairSlaCode(accessTechnology: string): string {
  const tech = accessTechnology.toUpperCase();
  if (tech.includes("FTTP")) return "E0000704"; // Standard Care
  if (tech.includes("SOGEA") || tech.includes("FTTC")) return "E0000704";
  return "E0000704";
}

// ─── Step 1: RoBT address lookup ──────────────────────────────────────────────

/**
 * BT Product Orders need a RoBT site address (id starts with "R…"), not the
 * Openreach NAD id (starts with "A…"). The cart only carries the Openreach id
 * from the POQ flow, so we hit the geographicAddress endpoint with
 * addressSource=ROBT to find the matching RoBT record.
 *
 * Mirrors WP class-bt-order-manager::get_robt_address_for_place().
 *
 * Returns the RoBT id on success, or the Openreach id as a graceful fallback.
 */
async function resolveRobtAddressId(address: CartAddress): Promise<string> {
  if (!address.postcode) {
    console.warn("[BT processOrder] ⚠ Missing postcode — using Openreach id as RoBT fallback");
    return address.id;
  }

  // GET /geographicAddress?postcode=...&addressSource=ROBT
  const endpoint =
    `/common/geographicAddressManagement/v1/geographicAddress` +
    `?postcode=${encodeURIComponent(address.postcode)}&addressSource=ROBT`;

  type RobtAddress = {
    id?: string;
    streetNr?: string;
    streetName?: string;
    postcode?: string;
    uprn?: string;
    alternateIds?: Array<{ type?: string; id?: string }>;
  };

  const res = await callApi<RobtAddress[]>(endpoint, { method: "GET" });

  if (!res.success) {
    console.warn(
      "[BT processOrder] ⚠ RoBT lookup failed:",
      res.message,
      "— falling back to Openreach id"
    );
    return address.id;
  }

  const list = Array.isArray(res.data) ? res.data : [];
  if (!list.length) {
    console.warn("[BT processOrder] ⚠ No RoBT addresses returned — using Openreach id");
    return address.id;
  }

  const eqPostcode = (a: string, b: string) =>
    a.replace(/\s+/g, "").toUpperCase() === b.replace(/\s+/g, "").toUpperCase();

  // Strategy 1: exact streetNr + streetName + postcode
  if (address.streetNr && address.streetName) {
    const exact = list.find(
      (r) =>
        (r.streetNr ?? "").trim() === (address.streetNr ?? "").trim() &&
        (r.streetName ?? "").trim().toLowerCase() ===
          (address.streetName ?? "").trim().toLowerCase() &&
        eqPostcode(r.postcode ?? "", address.postcode)
    );
    if (exact?.id) {
      console.log("[BT processOrder] ✅ RoBT exact match:", exact.id);
      return exact.id;
    }
  }

  // Strategy 2: UPRN
  if (address.uprn) {
    const byUprn = list.find((r) => r.uprn && r.uprn === address.uprn);
    if (byUprn?.id) {
      console.log("[BT processOrder] ✅ RoBT matched by UPRN:", byUprn.id);
      return byUprn.id;
    }
  }

  // Strategy 3: alternateIds.OpenreachAddressId correlation
  const byAlt = list.find((r) =>
    (r.alternateIds ?? []).some(
      (a) => a.type === "OpenreachAddressId" && a.id === address.id
    )
  );
  if (byAlt?.id) {
    console.log("[BT processOrder] ✅ RoBT matched by Openreach correlation:", byAlt.id);
    return byAlt.id;
  }

  // Strategy 4: first record from the same postcode as last resort
  const samePostcode = list.find((r) => eqPostcode(r.postcode ?? "", address.postcode));
  if (samePostcode?.id) {
    console.warn("[BT processOrder] ⚠ Falling back to first RoBT in postcode:", samePostcode.id);
    return samePostcode.id;
  }

  console.warn("[BT processOrder] ⚠ No RoBT match found — using Openreach id");
  return address.id;
}

// ─── Step 2: Search appointment slots ─────────────────────────────────────────

interface SlotSearchResponse {
  availableTimeSlot?: Array<{
    id?: string;
    validFor?: { startDateTime?: string; endDateTime?: string };
  }>;
}

async function searchAppointmentSlots(params: {
  addressId: string;
  accessTechnology: string;
  startDate: string;
  productSpec: { id: string; family: string };
}): Promise<{ start: string; end: string; id?: string } | null> {
  const body = {
    relatedEntity: [
      {
        appointmentType: "Standard",
        siteVisitReason: "Standard",
        product: {
          productSpecification: { id: params.productSpec.id },
          characteristic: [
            { name: "AccessTechnology", value: params.accessTechnology },
          ],
          place: [
            {
              id: params.addressId,
              role: "install address",
              "@referredType": "btNADLocationReference",
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
    requestedTimeSlot: [{ validFor: { startDateTime: params.startDate } }],
  };

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
  if (!slots.length) {
    console.warn("[BT processOrder] ⚠ No appointment slots returned");
    return null;
  }

  const first = slots[0];
  return {
    id: first.id,
    start: first.validFor?.startDateTime ?? params.startDate,
    end: first.validFor?.endDateTime ?? params.startDate,
  };
}

// ─── Step 3: Book appointment ─────────────────────────────────────────────────

interface BookedAppointment {
  id: string;
  start: string;
  end: string;
}

async function bookAppointment(params: {
  addressId: string;
  accessTechnology: string;
  startTime: string;
  endTime: string;
  productSpec: { id: string; family: string };
}): Promise<BookedAppointment | null> {
  const body = {
    relatedEntity: [
      {
        appointmentType: "Standard",
        siteVisitReason: "Standard",
        product: {
          productSpecification: { id: params.productSpec.id },
          characteristic: [
            { name: "AccessTechnology", value: params.accessTechnology },
          ],
          place: [
            {
              id: params.addressId,
              role: "install address",
              "@referredType": "btNADLocationReference",
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
      startDateTime: params.startTime,
      endDateTime: params.endTime,
    },
  };

  const response = await callApi<{
    id?: string;
    BESAppointmentId?: string;
    validFor?: { startDateTime?: string; endDateTime?: string };
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
    id: response.data?.id ?? response.data?.BESAppointmentId ?? `APPT-${Date.now()}`,
    start: response.data?.validFor?.startDateTime ?? params.startTime,
    end: response.data?.validFor?.endDateTime ?? params.endTime,
  };
}

// ─── Step 4: Build & submit product order ─────────────────────────────────────

function buildOrderPayload(params: {
  orderId: string;
  externalId: string;
  cartItem: CartItem;
  openreachAddress: CartAddress;
  robtAddressId: string;
  districtCode: string;
  billingAddress: BillingAddress;
  appointmentId: string;
  appointmentStart: string;
  appointmentEnd: string;
  accessTechnology: string;
  productOfferingId: string;
  contractTerm: { value: number; unit: string };
  btAccount: string;
  btCug: string;
  resellerId: string;
  minGuaranteedSpeed: string;
}) {
  const {
    orderId, externalId, cartItem, openreachAddress, robtAddressId,
    districtCode, billingAddress, appointmentId, appointmentStart,
    accessTechnology, productOfferingId, contractTerm,
    btAccount, btCug, resellerId, minGuaranteedSpeed,
  } = params;

  const firstName = billingAddress.firstName;
  const lastName  = billingAddress.lastName;
  const email     = billingAddress.email;
  const phone     = billingAddress.phone;

  // ── Product characteristics (mirrors WP build_product_characteristics_v2) ──
  const productCharacteristic: ProductCharacteristic[] = [
    { name: "ATT_RT_AccessTechnology",              value: accessTechnology },
    { name: "ATT_RT_InstallType",                   value: "M" },
    { name: "ATT_RT_EndUserType",                   value: "Residential" },
    { name: "ATT_RT_TrafficWeighting",              value: "Standard" },
    { name: "ATT_RT_ContractTerm",                  value: String(contractTerm.value) },
    { name: "ATT_RT_ContractTermUnit",              value: contractTerm.unit },
    { name: "ATT_RT_ResellerID",                    value: resellerId },
    { name: "ATT_X_JOURNEYTYPE",                    value: "New Line Provide" },
    { name: "ATT_RT_ProductMinimumGuaranteedSpeed", value: minGuaranteedSpeed },
  ];

  if (accessTechnology === "FTTP") {
    productCharacteristic.push({ name: "ATT_RT_ONTType", value: "New ONT" });
  }

  // Managed install characteristics — technology-specific
  const managedInstallChars =
    accessTechnology === "FTTP"
      ? [
          { name: "ATT_RT_ECCChargeband",   value: "0" },
          { name: "ATT_RT_FTTPInstallType", value: "1 Stage" },
          { name: "ATT_RT_SiteVisitReason", value: "Standard" },
        ]
      : [
          { name: "ATT_RT_TRChargeBand",    value: "0" },
          { name: "ATT_RT_UpperCostBand",   value: "Standard" },
          { name: "ATT_RT_SiteVisitReason", value: "Standard" },
        ];

  // ── Sub-items (Repair SLA, IP, Managed install) ──
  const subItems = [
    {
      "@type": "BTProductOrderItem",
      id: `${orderId}.1`,
      action: "add",
      product: {
        "@type": "BTProductRefOrValue",
        productOffering: { id: getRepairSlaCode(accessTechnology) },
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
      { text: "PT Hazards Note",         type: "HazardNote",  "@type": "BTNote" },
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
          id: openreachAddress.id,
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
            characteristic: { contactType: "Primary Work", emailAddress: email },
          },
          {
            mediumType: "telephone",
            characteristic: { contactType: "Primary Work", phoneNumber: phone },
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
    body = await req.json();
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

  const cartItem = cart[0]; // Zoiko sells one broadband plan per checkout

  // Pick address: explicit serviceAddress wins, then cartItem.address.
  const address: CartAddress | null =
    serviceAddress ?? cartItem.address ?? null;

  if (!address?.id) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Service address with a valid Openreach id is required. " +
          "Make sure the address object from the plan-selection step " +
          "is stored in the localStorage cart.",
      },
      { status: 400 }
    );
  }

  // ── Resolve everything from the cart item ────────────────────────────────
  const productOfferingId =
    cartItem.product?.offering?.id ??
    cartItem.product?.id ??
    cartItem.name; // last-ditch fallback

  if (!productOfferingId) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Product offering id is required. Cart item must include product.offering.id, product.id, or name.",
      },
      { status: 400 }
    );
  }

  const accessTechnology   = resolveAccessTechnology(cartItem, address);
  const productSpec        = getProductSpec(accessTechnology);
  const contractTerm       = resolveContractTerm(cartItem);
  const minGuaranteedSpeed = resolveMinGuaranteedSpeed(cartItem);
  const districtCode       = resolveDistrictCode(address, cartItem);

  // ── Env config ───────────────────────────────────────────────────────────
  const btAccount  = process.env.BT_ACCOUNT_ID   ?? "";
  const btCug      = process.env.BT_CUG          ?? "CUG5025628076";
  const resellerId = process.env.BT_RESELLER_ID  ?? "ABC";
  const isSandbox  = process.env.NEXT_BT_ENDPOINT_URI?.includes("sandbox") ?? false;

  const orderId    = generateOrderId();
  const externalId = `WC-${Date.now()}-${orderId}`;
  const startDate  = new Date().toISOString();

  console.log("[BT processOrder] ========== START ==========");
  console.log("[BT processOrder] Product offering:", productOfferingId);
  console.log("[BT processOrder] Openreach addr id:", address.id);
  console.log("[BT processOrder] Postcode:", address.postcode);
  console.log("[BT processOrder] Access technology:", accessTechnology);
  console.log("[BT processOrder] Contract:", contractTerm.value, contractTerm.unit);
  console.log("[BT processOrder] District code:", districtCode);
  console.log("[BT processOrder] Min guaranteed speed:", minGuaranteedSpeed);
  console.log("[BT processOrder] Sandbox:", isSandbox);

  // ── Step 1: RoBT site address ────────────────────────────────────────────
  console.log("[BT processOrder] Step 1: resolving RoBT site address…");
  const robtAddressId = isSandbox
    ? address.id // sandbox: don't burn an API call
    : await resolveRobtAddressId(address);

  console.log("[BT processOrder] ✅ RoBT site address:", robtAddressId);

  // ── Step 2/3: Appointment ────────────────────────────────────────────────
  let appointmentId    = "";
  let appointmentStart = "";
  let appointmentEnd   = "";

  if (isSandbox) {
    console.log("[BT processOrder] 🟡 SANDBOX — using mock appointment");
    const installDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    appointmentId    = `SANDBOX-APPT-${Date.now()}`;
    appointmentStart = installDate.toISOString();
    appointmentEnd   = new Date(installDate.getTime() + 5 * 60 * 60 * 1000).toISOString();
  } else {
    console.log("[BT processOrder] Step 2: searching appointment slots…");
    const slot = await searchAppointmentSlots({
      addressId: address.id,
      accessTechnology,
      startDate,
      productSpec,
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
    console.log("[BT processOrder] ✅ Slot found:", slot.start);

    console.log("[BT processOrder] Step 3: booking appointment…");
    const booked = await bookAppointment({
      addressId: address.id,
      accessTechnology,
      startTime: slot.start,
      endTime: slot.end,
      productSpec,
    });

    if (!booked) {
      return NextResponse.json(
        { success: false, message: "Failed to book installation appointment." },
        { status: 422 }
      );
    }

    appointmentId    = booked.id;
    appointmentStart = booked.start;
    appointmentEnd   = booked.end;
    console.log("[BT processOrder] ✅ Appointment booked:", appointmentId);
  }

  // ── Step 4: Submit product order ─────────────────────────────────────────
  console.log("[BT processOrder] Step 4: submitting product order…");

  const orderPayload = buildOrderPayload({
    orderId,
    externalId,
    cartItem,
    openreachAddress: address,
    robtAddressId,
    districtCode,
    billingAddress,
    appointmentId,
    appointmentStart,
    appointmentEnd,
    accessTechnology,
    productOfferingId,
    contractTerm,
    btAccount,
    btCug,
    resellerId,
    minGuaranteedSpeed,
  });

  console.log(
    "[BT processOrder] Order payload:",
    JSON.stringify(orderPayload, null, 2)
  );

  const orderResponse = await callApi<Record<string, unknown>>(
    "/hubco/tmf/productOrderingManagement/v4/productOrder",
    {
      method: "POST",
      body: orderPayload,
      // Per BT API 9 doc, the productOrder endpoint requires an
      // `apigw-client-id` header in addition to the bearer token.
      // Without it BT returns 401 / "Invalid ApiKey" and the order
      // is never accepted. The other endpoints in this file don't
      // need this header.
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
  const data       = orderResponse.data;

  console.log("[BT processOrder] ✅ Order submitted. Status:", statusCode);
  console.log("[BT processOrder] Response:", JSON.stringify(data, null, 2));
  console.log("[BT processOrder] ========== END ==========");

  // 201 = synchronous creation, 202 = async (accepted)
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

  // Unexpected 2xx
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