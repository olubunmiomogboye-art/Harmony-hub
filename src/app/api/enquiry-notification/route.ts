import { NextRequest, NextResponse } from "next/server";
import { sendEnquiryNotificationEmail, EmailEnquiryPayload } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customer, event } = body;

    // Server-side validation
    if (!customer || !customer.fullName?.trim() || !customer.phone?.trim()) {
      return NextResponse.json(
        { error: "Full name and phone number are required." },
        { status: 400 }
      );
    }

    if (!event || !event.eventType?.trim()) {
      return NextResponse.json(
        { error: "Event type is required." },
        { status: 400 }
      );
    }

    if (!event.locationArea?.trim()) {
      return NextResponse.json(
        { error: "Event location or area is required." },
        { status: 400 }
      );
    }

    if (!event.services || !Array.isArray(event.services) || event.services.length === 0) {
      return NextResponse.json(
        { error: "Please select at least one required service." },
        { status: 400 }
      );
    }

    if (!event.description?.trim()) {
      return NextResponse.json(
        { error: "Please provide a brief description of your event." },
        { status: 400 }
      );
    }

    const enquiryId = `HH-EVT-${Date.now().toString().slice(-6)}`;
    const submittedAt = new Date().toLocaleString("en-NG", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Africa/Lagos",
    });

    const payload: EmailEnquiryPayload = {
      enquiryId,
      customer,
      event,
      submittedAt,
    };

    const result = await sendEnquiryNotificationEmail(payload);

    return NextResponse.json({
      success: true,
      enquiryId,
      emailResult: result,
      message: result.delivered
        ? "Event enquiry email sent to Harmony Hub."
        : "Event enquiry recorded on server.",
    });
  } catch (error: any) {
    console.error("Enquiry notification API error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
