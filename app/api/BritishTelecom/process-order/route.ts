/**
 * POST /api/BritishTelecom/process-order
 *
 * Full BT Wholesale order submission flow:
 *   1. Search appointment slots  → POST /common/appointmentManagement/v4/searchTimeSlot
 *   2. Book appointment          → POST /common/appointmentManagement/v4/appointment
 *   3. Submit product order      → POST /hubco/tmf/productOrderingManagement/v4/productOrder
 *
 * Request body shape matches the localStorage cart item + billing details
 * that arrive from app/checkout/page.tsx via processOrderStripe().
 */

import { NextRequest, NextResponse } from "next/server";
import { callApi } from "../_lib/callApi";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CartAddress {
  id: string;           // Openreach address ID  e.g. "A15113070302"
  display: string;
  streetNr: string;
  streetName: string;
  city: string;
  postcode: string;
  districtCode: string;
  uprn: string;
  exchangeGroupCode: string;
  qualifier: string;
}

interface CartProduct {
  id: string | number;
  name: string;
  pricePerUnit: number;
  quantity: number;
  totalPrice: number;
  description: string;
  validity: string;   // e.g. "24 Months"
  speed: string;      // e.g. "0.4 Mbps"
  address: string;    // display string — we also get the full object below
}

interface BillingAddress {
  firstName: string;
  lastName: string;
  companyName: string;
  region: string;
  state: string;
  city: string;
  street: string;
  houseNumber: string;
  zip: string;
  phone: string;
  email: string;
}

interface OrderRequestBody {
  billingAddress: BillingAddress;
  shippingAddress: BillingAddress;
  coupon: { type: string; discount: string | number } | null;
  cart: CartProduct[];
  totals: { subtotal: number; discount: number; total: number };
  agreedToTerms: boolean;
  paymentMethod: string;
  createdAt: string;
  /** Full address object from localStorage, forwarded by the client */
  serviceAddress?: CartAddress;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function generateOrderId(): string {
  return String(Math.floor(Math.random() * 99999) + 1);
}

/**
 * Parse "24 Months" → { value: 24, unit: "Month" }
 * Fallback: 24 months for unrecognised strings.
 */
function parseContractTerm(validity: string): { value: number; unit: string } {
  const match = validity?.match(/^(\d+)\s*(Month|Year|Day)/i);
  if (match) {
    return { value: parseInt(match[1], 10), unit: match[2] };
  }
  return { value: 24, unit: "Month" };
}

/**
 * Derive access technology from product description / speed string.
 * For Zoiko/BT we receive the raw product name, e.g. "Zippy Essential".
 * The address qualifier ("Gold"/"Silver"/etc.) also indicates FTTP vs copper.
 */
function deriveAccessTechnology(
  productName: string,
  qualifier?: string
): string {
  const name = (productName ?? "").toUpperCase();

  if (name.includes("FTTP") || qualifier === "Gold") return "FTTP";
  if (name.includes("SOGEA") || name.includes("SOADSL")) return "SOGEA New Line";
  if (name.includes("FTTC")) return "FTTC";
  if (name.includes("ADSL")) return "ADSL";

  // Default to FTTP for new broadband lines
  return "FTTP";
}

/**
 * Return the product specification for appointment booking.
 * BB1hub for all broadband; Ethernet for GEA.
 */
function getProductSpec(accessTechnology: string) {
  if (
    accessTechnology.toLowerCase().includes("ethernet") ||
    accessTechnology.toLowerCase().includes("gea")
  ) {
    return { id: "Ethernet", family: "Ethernet" };
  }
  return { id: "BB1", family: "BB1hub" };
}

/**
 * Calculate minimum guaranteed speed (80 % of headline in Mbps).
 * Input is "0.4 Mbps" style string.
 */
function calcMinGuaranteedSpeed(speedStr: string): string {
  const val = parseFloat(speedStr ?? "0");
  if (!val || isNaN(val)) return "0";
  return String(Math.floor(val * 0.8));
}

// ─── Step 1: Search appointment slots ────────────────────────────────────────

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
    requestedTimeSlot: [
      { validFor: { startDateTime: params.startDate } },
    ],
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
    console.warn("[BT processOrder] ⚠️ No appointment slots returned");
    return null;
  }

  // Pick the first available slot
  const first = slots[0];
  return {
    id: first.id,
    start: first.validFor?.startDateTime ?? params.startDate,
    end: first.validFor?.endDateTime ?? params.startDate,
  };
}

// ─── Step 2: Book appointment ─────────────────────────────────────────────────

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
      startDateTime: params.startTime,
      endDateTime: params.endTime,
    },
  };

  const response = await callApi<{ id?: string; validFor?: { startDateTime?: string } }>(
    "/common/appointmentManagement/v4/appointment",
    {
      method: "POST",
      body,
      headers: { productFamily: params.productSpec.family },
    }
  );

  if (!response.success) {
    console.error("[BT processOrder] ❌ Appointment booking failed:", response.message);
    return null;
  }

  return {
    id: response.data?.id ?? `APPT-${Date.now()}`,
    start: params.startTime,
    end: params.endTime,
  };
}

// ─── Step 3: Build and submit product order ───────────────────────────────────

function buildOrderPayload(params: {
  orderId: string;
  externalId: string;
  product: CartProduct;
  address: CartAddress;
  billingAddress: BillingAddress;
  appointmentId: string;
  appointmentStart: string;
  accessTechnology: string;
  productOfferingId: string;
  contractTerm: { value: number; unit: string };
  btAccount: string;
  btCug: string;
  resellerId: string;
  minGuaranteedSpeed: string;
}) {
  const {
    orderId, externalId, product, address, billingAddress,
    appointmentId, appointmentStart, accessTechnology,
    productOfferingId, contractTerm, btAccount, btCug,
    resellerId, minGuaranteedSpeed,
  } = params;

  const firstName = billingAddress.firstName;
  const lastName = billingAddress.lastName;
  const email = billingAddress.email;
  const phone = billingAddress.phone;

  // ── Product characteristics ──
  const productCharacteristic: Array<{ name: string; value: string }> = [
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

  // FTTP-specific characteristic
  if (accessTechnology === "FTTP") {
    productCharacteristic.push({ name: "ATT_RT_ONTType", value: "New ONT" });
  }

  // ── Managed install characteristics (technology-specific) ──
  const isFttp = accessTechnology === "FTTP";
  const managedInstallChars = isFttp
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

  // ── Sub-items ──
  const subItems = [
    // Repair SLA
    {
      "@type": "BTProductOrderItem",
      id: `${orderId}.1`,
      action: "add",
      product: {
        "@type": "BTProductRefOrValue",
        productOffering: { id: "E0000704" }, // Standard Care SLA
      },
    },
    // IP Address
    {
      "@type": "BTProductOrderItem",
      id: `${orderId}.2`,
      action: "add",
      product: {
        "@type": "BTProductRefOrValue",
        productOffering: { id: "E0000703" },
      },
    },
    // Managed Install
    {
      "@type": "BTProductOrderItem",
      id: `${orderId}.3`,
      action: "add",
      product: {
        "@type": "BTProductRefOrValue",
        productOffering: { id: "E0000153" },
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
        {
          "@type": "btRelatedPlaceRefOrValue",
          id: address.id,          // RoBT / Openreach address ID
          role: "SiteAddress",
        },
        {
          "@type": "btRelatedPlaceRefOrValue",
          id: address.id,
          role: "OpenreachAddress",
          address: { districtCode: address.districtCode },
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
              characteristic: { contactType: "Primary Work", emailAddress: email },
            },
            {
              mediumType: "telephone",
              characteristic: { contactType: "Primary Work", phoneNumber: phone },
            },
          ],
        },
      ],
    },
    productOrderItem: subItems,
  };

  // ── Top-level order ──
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

  // ── Validate minimum required data ──────────────────────────────────────
  if (!billingAddress?.email || !billingAddress?.firstName) {
    return NextResponse.json(
      { success: false, message: "billingAddress with firstName and email is required" },
      { status: 400 }
    );
  }

  if (!cart?.length) {
    return NextResponse.json(
      { success: false, message: "cart must contain at least one item" },
      { status: 400 }
    );
  }

  // Use the first cart item (Zoiko sells one broadband plan per checkout)
  const product = cart[0];

  // ── Resolve service address ──────────────────────────────────────────────
  // Priority: dedicated serviceAddress field → cart item's address field (parsed)
  const address: CartAddress | null = serviceAddress ?? null;

  if (!address?.id) {
    return NextResponse.json(
      {
        success: false,
        message:
          "serviceAddress with a valid Openreach address id is required. " +
          "Ensure the address object from the plan-selection step is forwarded.",
      },
      { status: 400 }
    );
  }

  // ── Environment config ───────────────────────────────────────────────────
  const btAccount  = process.env.BT_ACCOUNT_ID  ?? "";
  const btCug      = process.env.BT_CUG         ?? "CUG5025628076";
  const resellerId = process.env.BT_RESELLER_ID ?? "ABC";
  const isSandbox  = process.env.NEXT_BT_ENDPOINT_URI?.includes("sandbox");

  // ── Derive technology & product offering ─────────────────────────────────
  const accessTechnology   = deriveAccessTechnology(product.name, address.qualifier);
  const productSpec        = getProductSpec(accessTechnology);
  const productOfferingId  = product.name; // Zoiko bt_plan_name == BT productOffering.id
  const contractTerm       = parseContractTerm(product.validity ?? "");
  const minGuaranteedSpeed = calcMinGuaranteedSpeed(product.speed ?? "");
  const orderId            = generateOrderId();
  const externalId         = `WC-${Date.now()}-${orderId}`;
  const startDate          = new Date().toISOString();

  console.log("[BT processOrder] ========== START ==========");
  console.log("[BT processOrder] Product:", product.name);
  console.log("[BT processOrder] Address ID:", address.id);
  console.log("[BT processOrder] Technology:", accessTechnology);
  console.log("[BT processOrder] Contract:", contractTerm.value, contractTerm.unit);
  console.log("[BT processOrder] Sandbox:", isSandbox);

  // ── SANDBOX: skip real appointment, use mock ─────────────────────────────
  let appointmentId    = "";
  let appointmentStart = "";
  let appointmentEnd   = "";

  if (isSandbox) {
    console.log("[BT processOrder] 🟡 SANDBOX — using mock appointment");
    appointmentId    = `SANDBOX-APPT-${Date.now()}`;
    appointmentStart = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    appointmentEnd   = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000).toISOString();
  } else {
    // ── Step 1: Search slots ───────────────────────────────────────────────
    console.log("[BT processOrder] Step 1: searching appointment slots…");

    const slot = await searchAppointmentSlots({
      addressId: address.id,
      accessTechnology,
      startDate,
      productSpec,
    });

    if (!slot) {
      return NextResponse.json(
        { success: false, message: "No appointment slots available for the selected address and technology." },
        { status: 422 }
      );
    }

    console.log("[BT processOrder] ✅ Slot found:", slot.start);

    // ── Step 2: Book appointment ───────────────────────────────────────────
    console.log("[BT processOrder] Step 2: booking appointment…");

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

  // ── Step 3: Submit product order ──────────────────────────────────────────
  console.log("[BT processOrder] Step 3: submitting product order…");

  const orderPayload = buildOrderPayload({
    orderId,
    externalId,
    product,
    address,
    billingAddress,
    appointmentId,
    appointmentStart,
    accessTechnology,
    productOfferingId,
    contractTerm,
    btAccount,
    btCug,
    resellerId,
    minGuaranteedSpeed,
  });

  console.log("[BT processOrder] Order payload:", JSON.stringify(orderPayload, null, 2));

  const orderResponse = await callApi<Record<string, unknown>>(
    "/hubco/tmf/productOrderingManagement/v4/productOrder",
    {
      method: "POST",
      body: orderPayload,
      headers: { productFamily: productSpec.family },
    }
  );

  if (!orderResponse.success) {
    console.error("[BT processOrder] ❌ Order submission failed:", orderResponse.message);
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
    const btOrderId = statusCode === 201
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
    data,
  });
}