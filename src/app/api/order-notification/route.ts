import { NextRequest, NextResponse } from "next/server";
import { sendOrderNotificationEmail, EmailOrderPayload } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, customer, subtotal, deliveryFee } = body;

    // Server-side validation
    if (!customer || !customer.fullName?.trim() || !customer.phone?.trim()) {
      return NextResponse.json(
        { error: "Customer name and phone number are required." },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Order items cannot be empty." },
        { status: 400 }
      );
    }

    if (customer.fulfillmentMethod === "delivery" && !customer.deliveryAddress?.trim()) {
      return NextResponse.json(
        { error: "Delivery address is required when delivery is selected." },
        { status: 400 }
      );
    }

    if (!customer.cityArea?.trim()) {
      return NextResponse.json(
        { error: "City or area is required." },
        { status: 400 }
      );
    }

    const orderId = `HH-ORD-${Date.now().toString().slice(-6)}`;
    const submittedAt = new Date().toLocaleString("en-NG", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Africa/Lagos",
    });

    const payload: EmailOrderPayload = {
      orderId,
      items,
      customer,
      subtotal: Number(subtotal) || 0,
      deliveryFee: deliveryFee || "To be confirmed",
      submittedAt,
    };

    const result = await sendOrderNotificationEmail(payload);

    return NextResponse.json({
      success: true,
      orderId,
      emailResult: result,
      message: result.delivered
        ? "Order request email sent to business owner."
        : "Order request recorded on server.",
    });
  } catch (error: any) {
    console.error("Order notification API error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
