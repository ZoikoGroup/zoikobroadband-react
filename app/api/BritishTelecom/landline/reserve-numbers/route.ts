/**
 * POST /api/BritishTelecom/landline/reserve-numbers
 *
 * Reserves WHC geographic directory numbers.
 * Endpoint: POST https://api.wholesale.bt.com/v1/resourceManagement/directoryNumbers/reservation
 *
 * YAML-confirmed payload (postCode mode — primary flow after address selection):
 * {
 *   customer: { id: "CUG12345678", type: "BUSINESS" },
 *   numbers: {
 *     type: "Geographic",
 *     quantity: 1,
 *     characteristics: { postCode: "NW11 7NG" }   ← standard UK postcode from address search
 *   },
 *   product: { name: "GNOME" }                      ← NOT "WHC" for postCode mode
 * }
 *
 * Response numbers come back without leading zero (e.g. 1480880098).
 * We add a leading zero on the way out so the page can display/use them normally.
 */

import { NextRequest, NextResponse } from "next/server";
import { getAccessToken } from "../../_lib/authToken";

interface ReservedNumber {
  number: string;
  status: string;
  prefix: string;
}

interface ReservationResponse {
  reservationKey?: string | number;
  reservationStatus?: "SUCCESS" | "FAILED";
  numbers?: ReservedNumber[];
  code?: string;
  message?: string;
  reason?: string;
}

export async function POST(req: NextRequest) {
  let body: {
    postCode?: string;   // standard UK postcode from address search e.g. "NW11 7NG"
    quantity?: number;   // default 5
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid JSON" }, { status: 400 });
  }

  if (!body.postCode) {
    return NextResponse.json({ success: false, message: "postCode is required" }, { status: 400 });
  }

  const cugId         = process.env.BT_CUG;
  const baseUrl       = process.env.NEXT_BT_ENDPOINT_URI;
  const apigwClientId = process.env.BT_APIGW_CLIENT_ID ?? "";

  if (!cugId)   return NextResponse.json({ success: false, message: "BT_CUG not set" }, { status: 500 });
  if (!baseUrl) return NextResponse.json({ success: false, message: "NEXT_BT_ENDPOINT_URI not set" }, { status: 500 });

  const qty = Math.max(1, Math.min(body.quantity ?? 5, 100));

  // Exact payload per YAML spec — postCode mode uses product.name "GNOME"
  const payload = {
    customer: {
      id:   cugId,
      type: "BUSINESS",
    },
    numbers: {
      type:     "Geographic",
      quantity: qty,
      characteristics: {
        postCode: body.postCode,
      },
    },
    product: {
      name: "GNOME",
    },
  };

  // Get OAuth token
  let token: string;
  try {
    token = await getAccessToken();
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err instanceof Error ? err.message : "Failed to get token" },
      { status: 500 }
    );
  }

  const trackingId =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  const url = `${baseUrl}/v1/resourceManagement/directoryNumbers/reservation`;

  console.log("[BT WHC reservation] POST", url);
  console.log("[BT WHC reservation] CUG:", cugId, "| postCode:", body.postCode);
  console.log("[BT WHC reservation] payload:", JSON.stringify(payload, null, 2));

  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization":          `Bearer ${token}`,
        "Content-Type":           "application/json",
        "Accept":                 "application/json",
        "APIGW-Tracking-Header":  trackingId,
        ...(apigwClientId && { "APIGW-Client-Id": apigwClientId }),
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err instanceof Error ? err.message : "Network error" },
      { status: 500 }
    );
  }

  const statusCode = response.status;
  let data: ReservationResponse = {};
  try {
    const text = await response.text();
    if (text) data = JSON.parse(text);
  } catch { /* ignore */ }

  console.log("[BT WHC reservation] status:", statusCode);
  console.log("[BT WHC reservation] body:", JSON.stringify(data, null, 2));

  if (statusCode >= 400) {
    const detail =
      data.message ??
      (data.code ? `code ${data.code}${data.reason ? " — " + data.reason : ""}` : "");
    return NextResponse.json(
      {
        success: false,
        message: `API returned error: ${statusCode}${detail ? " — " + detail : ""}`,
        error: data,
      },
      { status: statusCode }
    );
  }

  if (!data.reservationKey || data.reservationStatus === "FAILED") {
    return NextResponse.json(
      { success: false, message: "BT returned FAILED reservation status", details: data },
      { status: 422 }
    );
  }

  // Normalise numbers — BT returns without leading zero (e.g. 1480880098)
  // Add leading zero so they display correctly as UK numbers (01480880098)
  const numbers: ReservedNumber[] = (data.numbers ?? []).map((n) => ({
    number: String(n.number).startsWith("0") ? String(n.number) : `0${n.number}`,
    status: n.status,
    prefix: String(n.prefix),
  }));

  console.log("[BT WHC reservation] ✅ Key:", data.reservationKey, "Numbers:", numbers.map((n) => n.number));

  return NextResponse.json({
    success:           true,
    reservationKey:    String(data.reservationKey),
    reservationStatus: data.reservationStatus,
    numbers,
  });
}