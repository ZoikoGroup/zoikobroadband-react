// utils/stripeWebPaymentApi.ts
//
// Forwards the localStorage cart (with the full BT POQ-enriched `product`
// object and matched `zoikoPlan`) to /api/BritishTelecom/process-order.
//
// NOTE: BeQuick has been removed. All ordering now goes through BT.

/** Read the raw cart from localStorage (returns [] on the server or on error). */
function readRawCart(): unknown[] {
  try {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("cart");
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** Pull the address out of the first cart item — used as `serviceAddress`. */
function getServiceAddressFromLocalStorage(): Record<string, unknown> | null {
  const items = readRawCart();
  const first = items[0] as { address?: { id?: string } } | undefined;
  if (first?.address?.id) return first.address as Record<string, unknown>;
  return null;
}

export async function processOrderStripe(orderData: any) {
  try {
    const serviceAddress = getServiceAddressFromLocalStorage();

    if (!serviceAddress?.id) {
      return {
        status: false,
        message:
          "No service address found in cart. Please go back and select your address again.",
      };
    }

    // Forward the FULL raw cart item (with product + zoikoPlan) — the BT
    // route needs those fields to build a correct product order.
    const rawCart = readRawCart();

    const response = await fetch("/api/BritishTelecom/process-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...orderData,
        // override the normalised cart with the raw localStorage one so the
        // server can read product.characteristics / product.offering / zoikoPlan
        cart: rawCart.length ? rawCart : orderData.cart,
        serviceAddress,
      }),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok || !result?.success) {
      return {
        status: false,
        message: result?.message ?? "BT order processing failed.",
      };
    }

    return {
      status: true,
      data: {
        btOrderId:        result.btOrderId,
        externalId:       result.externalId,
        appointmentId:    result.appointmentId,
        appointmentStart: result.appointmentStart,
        appointmentEnd:   result.appointmentEnd,
        btStatus:         result.status,
        btData:           result.data,
        // fields Django needs
        billingAddress:   orderData.billingAddress,
        shippingAddress:  orderData.shippingAddress,
        cart:             orderData.cart,
        totals:           orderData.totals,
        coupon:           orderData.coupon,
        paymentMethod:    orderData.paymentMethod,
        createdAt:        orderData.createdAt,
        agreedToTerms:    orderData.agreedToTerms,
        serviceAddress,
      },
    };
  } catch (err: any) {
    return { status: false, message: err?.message ?? "Unexpected error" };
  }
}