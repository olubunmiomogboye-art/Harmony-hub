import nodemailer from "nodemailer";
import { formatNaira } from "./formatters";
import { siteConfig } from "../config/site";

export interface EmailOrderPayload {
  orderId: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    selectedVariant?: string;
  }>;
  customer: {
    fullName: string;
    phone: string;
    email?: string;
    fulfillmentMethod: "delivery" | "collection";
    deliveryAddress?: string;
    cityArea: string;
    deliveryInstructions?: string;
    orderNotes?: string;
  };
  subtotal: number;
  deliveryFee: string;
  submittedAt: string;
}

export interface EmailEnquiryPayload {
  enquiryId: string;
  customer: {
    fullName: string;
    phone: string;
    email?: string;
    organization?: string;
  };
  event: {
    eventType: string;
    preferredDate?: string;
    locationArea: string;
    guestCount?: string;
    services: string[];
    budget?: string;
    description: string;
    notes?: string;
  };
  submittedAt: string;
}

// Check if SMTP environment variables are configured
export function isSmtpConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
  );
}

// Create Nodemailer Transporter
function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
}

/**
 * Send order request notification email to business owner
 */
export async function sendOrderNotificationEmail(payload: EmailOrderPayload) {
  const recipient =
    process.env.NOTIFICATION_EMAIL_TO ||
    process.env.BUSINESS_EMAIL ||
    siteConfig.contact.email;

  const sender =
    process.env.NOTIFICATION_EMAIL_FROM ||
    `"Harmony Hub Orders" <orders@harmonyhub.ng>`;

  const itemsHtml = payload.items
    .map(
      (item) => `
      <tr style="border-bottom: 1px solid #E5E7EB;">
        <td style="padding: 12px 8px; font-weight: 500; color: #111827;">
          ${item.name}
          ${item.selectedVariant ? `<div style="font-size: 12px; color: #666D65;">Variant: ${item.selectedVariant}</div>` : ""}
        </td>
        <td style="padding: 12px 8px; text-align: center; color: #374151;">${item.quantity}</td>
        <td style="padding: 12px 8px; text-align: right; color: #374151;">${formatNaira(item.price)}</td>
        <td style="padding: 12px 8px; text-align: right; font-weight: 600; color: #111827;">${formatNaira(item.price * item.quantity)}</td>
      </tr>
    `
    )
    .join("");

  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>New Harmony Hub Order Request</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F7F4EC; margin: 0; padding: 24px; color: #242923;">
        <div style="max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #E5E7EB; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          
          <!-- Header -->
          <div style="background-color: #183C32; padding: 28px 24px; text-align: center;">
            <h1 style="color: #F7F4EC; margin: 0 0 8px 0; font-size: 24px; letter-spacing: 0.5px; font-family: Georgia, serif;">HARMONY HUB</h1>
            <p style="color: #E2D9CB; margin: 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px;">New Website Order Request</p>
          </div>

          <div style="padding: 24px;">
            <div style="background-color: #FEF3C7; border-left: 4px solid #D97706; padding: 12px 16px; margin-bottom: 24px; border-radius: 4px;">
              <p style="margin: 0; font-size: 13px; color: #92400E; font-weight: 500;">
                <strong>NOTICE:</strong> This is an initial order inquiry submitted via the website. Availability, delivery fee, and payment arrangements will be finalized directly with the customer.
              </p>
            </div>

            <!-- Customer Details -->
            <h2 style="font-size: 16px; color: #183C32; border-bottom: 2px solid #EEF1E9; padding-bottom: 8px; margin-top: 0;">CUSTOMER DETAILS</h2>
            <table style="width: 100%; font-size: 14px; margin-bottom: 24px;">
              <tr>
                <td style="padding: 6px 0; color: #666D65; width: 35%;">Order Reference:</td>
                <td style="padding: 6px 0; font-weight: 600; color: #111827;">#${payload.orderId}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #666D65;">Full Name:</td>
                <td style="padding: 6px 0; font-weight: 600; color: #111827;">${payload.customer.fullName}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #666D65;">Phone Number:</td>
                <td style="padding: 6px 0; font-weight: 600; color: #111827;">
                  <a href="tel:${payload.customer.phone}" style="color: #183C32; text-decoration: underline;">${payload.customer.phone}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #666D65;">Email Address:</td>
                <td style="padding: 6px 0; color: #111827;">${payload.customer.email || "Not provided"}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #666D65;">Date & Time:</td>
                <td style="padding: 6px 0; color: #111827;">${payload.submittedAt}</td>
              </tr>
            </table>

            <!-- Fulfilment Details -->
            <h2 style="font-size: 16px; color: #183C32; border-bottom: 2px solid #EEF1E9; padding-bottom: 8px;">FULFILMENT & DELIVERY</h2>
            <table style="width: 100%; font-size: 14px; margin-bottom: 24px;">
              <tr>
                <td style="padding: 6px 0; color: #666D65; width: 35%;">Fulfilment Method:</td>
                <td style="padding: 6px 0; font-weight: 600; color: #111827;">
                  ${payload.customer.fulfillmentMethod === "collection" ? "Pickup (Ibadan Atelier)" : "Direct Delivery"}
                </td>
              </tr>
              ${
                payload.customer.fulfillmentMethod === "delivery"
                  ? `
                <tr>
                  <td style="padding: 6px 0; color: #666D65;">Delivery Address:</td>
                  <td style="padding: 6px 0; color: #111827;">${payload.customer.deliveryAddress || "Not provided"}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #666D65;">City / Area:</td>
                  <td style="padding: 6px 0; color: #111827;">${payload.customer.cityArea}</td>
                </tr>
              `
                  : ""
              }
              <tr>
                <td style="padding: 6px 0; color: #666D65;">Delivery Instructions:</td>
                <td style="padding: 6px 0; color: #111827;">${payload.customer.deliveryInstructions || "None"}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #666D65;">Order Notes:</td>
                <td style="padding: 6px 0; color: #111827;">${payload.customer.orderNotes || "None"}</td>
              </tr>
            </table>

            <!-- Order Items -->
            <h2 style="font-size: 16px; color: #183C32; border-bottom: 2px solid #EEF1E9; padding-bottom: 8px;">ORDER ITEMS</h2>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
              <thead>
                <tr style="background-color: #F9FAFB; text-align: left; font-size: 12px; color: #666D65; text-transform: uppercase;">
                  <th style="padding: 10px 8px;">Product</th>
                  <th style="padding: 10px 8px; text-align: center;">Qty</th>
                  <th style="padding: 10px 8px; text-align: right;">Unit Price</th>
                  <th style="padding: 10px 8px; text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>

            <!-- Totals -->
            <div style="background-color: #F9FAFB; padding: 16px; border-radius: 6px; margin-bottom: 24px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px;">
                <span style="color: #666D65;">Subtotal:</span>
                <span style="font-weight: 600; color: #111827;">${formatNaira(payload.subtotal)}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px;">
                <span style="color: #666D65;">Delivery Fee:</span>
                <span style="color: #B96F52; font-weight: 500;">${payload.deliveryFee}</span>
              </div>
              <div style="display: flex; justify-content: space-between; padding-top: 8px; border-top: 1px solid #E5E7EB; font-size: 16px; font-weight: 700;">
                <span style="color: #183C32;">Estimated Total:</span>
                <span style="color: #183C32;">${formatNaira(payload.subtotal)}</span>
              </div>
            </div>

            <!-- Footer note -->
            <p style="font-size: 12px; color: #9CA3AF; text-align: center; margin: 0;">
              Harmony Hub • Ibadan, Oyo State, Nigeria • Private Concierge: +234 81 5685 1504
            </p>
          </div>
        </div>
      </body>
    </html>
  `;

  if (!isSmtpConfigured()) {
    console.warn(
      `[ORDER NOTIFICATION EMAIL - SMTP NOT CONFIGURED] Simulated delivery to ${recipient}. Full order payload logged:`,
      payload
    );
    return {
      success: true,
      delivered: false,
      status: "smtp_not_configured",
      message:
        "Order captured successfully on server. To receive inbox emails, configure SMTP_HOST, SMTP_USER, and SMTP_PASS.",
      recipient,
    };
  }

  try {
    const transporter = getTransporter();
    const info = await transporter.sendMail({
      from: sender,
      to: recipient,
      subject: `New Harmony Hub Website Order Request (#${payload.orderId}) - ${payload.customer.fullName}`,
      html: emailHtml,
    });

    console.log(`[ORDER NOTIFICATION EMAIL SENT] Message ID: ${info.messageId}`);
    return {
      success: true,
      delivered: true,
      status: "sent",
      messageId: info.messageId,
      recipient,
    };
  } catch (error: any) {
    console.error("[ORDER NOTIFICATION EMAIL ERROR]", error);
    return {
      success: false,
      delivered: false,
      status: "error",
      error: error.message || "Failed to dispatch email",
      recipient,
    };
  }
}

/**
 * Send event planning enquiry notification email to business owner
 */
export async function sendEnquiryNotificationEmail(payload: EmailEnquiryPayload) {
  const recipient =
    process.env.NOTIFICATION_EMAIL_TO ||
    process.env.BUSINESS_EMAIL ||
    siteConfig.contact.email;

  const sender =
    process.env.NOTIFICATION_EMAIL_FROM ||
    `"Harmony Hub Events" <events@harmonyhub.ng>`;

  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>New Harmony Hub Event Enquiry</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F7F4EC; margin: 0; padding: 24px; color: #242923;">
        <div style="max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #E5E7EB; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          
          <div style="background-color: #183C32; padding: 28px 24px; text-align: center;">
            <h1 style="color: #F7F4EC; margin: 0 0 8px 0; font-size: 24px; letter-spacing: 0.5px; font-family: Georgia, serif;">FLAIR & FLAVORS</h1>
            <p style="color: #E2D9CB; margin: 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px;">New Event & Hospitality Enquiry</p>
          </div>

          <div style="padding: 24px;">
            <h2 style="font-size: 16px; color: #183C32; border-bottom: 2px solid #EEF1E9; padding-bottom: 8px; margin-top: 0;">CLIENT CONTACT</h2>
            <table style="width: 100%; font-size: 14px; margin-bottom: 24px;">
              <tr>
                <td style="padding: 6px 0; color: #666D65; width: 35%;">Enquiry Reference:</td>
                <td style="padding: 6px 0; font-weight: 600; color: #111827;">#${payload.enquiryId}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #666D65;">Full Name:</td>
                <td style="padding: 6px 0; font-weight: 600; color: #111827;">${payload.customer.fullName}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #666D65;">Phone Number:</td>
                <td style="padding: 6px 0; font-weight: 600; color: #111827;">
                  <a href="tel:${payload.customer.phone}" style="color: #183C32; text-decoration: underline;">${payload.customer.phone}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #666D65;">Email Address:</td>
                <td style="padding: 6px 0; color: #111827;">${payload.customer.email || "Not provided"}</td>
              </tr>
              ${
                payload.customer.organization
                  ? `
                <tr>
                  <td style="padding: 6px 0; color: #666D65;">Organization:</td>
                  <td style="padding: 6px 0; color: #111827;">${payload.customer.organization}</td>
                </tr>
              `
                  : ""
              }
              <tr>
                <td style="padding: 6px 0; color: #666D65;">Date Submitted:</td>
                <td style="padding: 6px 0; color: #111827;">${payload.submittedAt}</td>
              </tr>
            </table>

            <h2 style="font-size: 16px; color: #183C32; border-bottom: 2px solid #EEF1E9; padding-bottom: 8px;">EVENT DETAILS</h2>
            <table style="width: 100%; font-size: 14px; margin-bottom: 24px;">
              <tr>
                <td style="padding: 6px 0; color: #666D65; width: 35%;">Event Type:</td>
                <td style="padding: 6px 0; font-weight: 600; color: #111827;">${payload.event.eventType}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #666D65;">Preferred Date:</td>
                <td style="padding: 6px 0; color: #111827;">${payload.event.preferredDate || "Not yet finalized"}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #666D65;">Location / Area:</td>
                <td style="padding: 6px 0; color: #111827;">${payload.event.locationArea}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #666D65;">Estimated Guests:</td>
                <td style="padding: 6px 0; color: #111827;">${payload.event.guestCount || "To be discussed"}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #666D65;">Services Selected:</td>
                <td style="padding: 6px 0; font-weight: 600; color: #B96F52;">${payload.event.services.join(", ")}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #666D65;">Estimated Budget:</td>
                <td style="padding: 6px 0; color: #111827;">${payload.event.budget || "Flexible / To discuss"}</td>
              </tr>
            </table>

            <h2 style="font-size: 16px; color: #183C32; border-bottom: 2px solid #EEF1E9; padding-bottom: 8px;">DESCRIPTION & SPECIFICATIONS</h2>
            <div style="background-color: #F9FAFB; padding: 14px; border-radius: 6px; font-size: 14px; line-height: 1.5; color: #374151; margin-bottom: 16px;">
              ${payload.event.description}
            </div>

            ${
              payload.event.notes
                ? `
              <h3 style="font-size: 14px; color: #183C32; margin-bottom: 6px;">Additional Notes:</h3>
              <div style="background-color: #F9FAFB; padding: 14px; border-radius: 6px; font-size: 14px; line-height: 1.5; color: #374151; margin-bottom: 20px;">
                ${payload.event.notes}
              </div>
            `
                : ""
            }

            <p style="font-size: 12px; color: #9CA3AF; text-align: center; margin-top: 24px;">
              Harmony Hub • Ibadan, Oyo State, Nigeria • Direct Concierge: +234 81 5685 1504
            </p>
          </div>
        </div>
      </body>
    </html>
  `;

  if (!isSmtpConfigured()) {
    console.warn(
      `[EVENT ENQUIRY EMAIL - SMTP NOT CONFIGURED] Simulated delivery to ${recipient}. Full enquiry payload logged:`,
      payload
    );
    return {
      success: true,
      delivered: false,
      status: "smtp_not_configured",
      message:
        "Enquiry captured successfully on server. To receive inbox emails, configure SMTP_HOST, SMTP_USER, and SMTP_PASS.",
      recipient,
    };
  }

  try {
    const transporter = getTransporter();
    const info = await transporter.sendMail({
      from: sender,
      to: recipient,
      subject: `New Harmony Hub Event Enquiry (#${payload.enquiryId}) - ${payload.customer.fullName} (${payload.event.eventType})`,
      html: emailHtml,
    });

    console.log(`[EVENT ENQUIRY EMAIL SENT] Message ID: ${info.messageId}`);
    return {
      success: true,
      delivered: true,
      status: "sent",
      messageId: info.messageId,
      recipient,
    };
  } catch (error: any) {
    console.error("[EVENT ENQUIRY EMAIL ERROR]", error);
    return {
      success: false,
      delivered: false,
      status: "error",
      error: error.message || "Failed to dispatch email",
      recipient,
    };
  }
}
