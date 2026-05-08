// utils/beQuickStripeWebPaymentApi.ts

function getServiceAddressFromLocalStorage() {
  try {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem("cart");
    if (!stored) return null;
    const items = JSON.parse(stored);
    const first = Array.isArray(items) ? items[0] : null;
    if (first?.address?.id) return first.address;
    return null;
  } catch {
    return null;
  }
}

export async function processOrderStripe(orderData: any) {
  try {
    const serviceAddress = getServiceAddressFromLocalStorage();

    if (!serviceAddress?.id) {
      return {
        status: false,
        message: "No service address found in cart. Please go back and select your address again.",
      };
    }

    const response = await fetch("/api/BritishTelecom/process-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...orderData, serviceAddress }),
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