import { NextRequest, NextResponse } from "next/server";
import { callApi } from "../_lib/callApi";

export async function POST(req: NextRequest) {
  try {
    const { address_id, district_code } = await req.json();

    if (!address_id) {
      return NextResponse.json({
        success: false,
        message: "address_id is required",
      });
    }

    const requestBody = {
      "@type": "btProductOfferingQualification",
      instantSyncQualification: true,
      productOfferingQualificationItem: [
        {
          id: "74",
          action: "add",
          product: {
            "@type": "Product",
            productOffering: {
              id: "BroadbandOne",
              "@referredType": "btProductOfferingFamily",
            },
            place: [
              {
                id: address_id,
                districtId: district_code || "NS",
                role: "install address",
                "@referredType": "btNADLocationReference",
              },
            ],
          },
          "@type": "btProductOfferingQualificationItem",
        },
      ],
      provideAlternative: true,
      provideOnlyAvailable: true,
      provideUnavailabilityReason: false,
      relatedParty: [
        {
          id: process.env.BT_CUG || "CUG5025628076",
          role: "BtCug",
          "@type": "BTRelatedParty",
          "@referredType": "Customer",
        },
      ],
    };

    const response = await callApi<any>(
      "/hubco/tmf/productOfferingQualification/v4/productOfferingQualification",
      {
        method: "POST",
        body: requestBody,
      }
    );

    if (!response.success) {
      return NextResponse.json({
        success: false,
        message: response.message,
        error: response.body,
      });
    }

    return NextResponse.json({
      success: true,
      productOfferingQualificationItem:
        response.data?.productOfferingQualificationItem || [],
    });

  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: err.message || "Server error",
    });
  }
}