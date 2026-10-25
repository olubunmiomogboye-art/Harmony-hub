import { formatNaira } from "./formatters";
import { siteConfig } from "../config/site";

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  color?: string;
  variant?: string;
}

export interface OrderCustomerDetails {
  fullName: string;
  phone: string;
  email?: string;
  fulfillmentMethod: "delivery" | "collection";
  deliveryAddress?: string;
  cityArea: string;
  deliveryInstructions?: string;
  orderNotes?: string;
}

export interface EventEnquiryDetails {
  fullName: string;
  phone: string;
  email?: string;
  eventType: string;
  preferredDate?: string;
  locationArea: string;
  guestCount?: string;
  services: string[];
  budget?: string;
  description: string;
  notes?: string;
}

/**
 * Generates the pre-filled WhatsApp message for an order
 * EXACTLY following Part 6 instructions
 */
export function generateOrderWhatsAppMessage(
  items: OrderItem[],
  customer: OrderCustomerDetails,
  deliveryFee: string = "To be confirmed"
): string {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const itemsText = items
    .map((item, idx) => {
      let details = `${idx + 1}. ${item.name}`;
      if (item.color) details += `\nColour: ${item.color}`;
      if (item.variant) details += `\nVariant: ${item.variant}`;
      details += `\nQuantity: ${item.quantity}\nUnit price: ${formatNaira(
        item.price
      )}\nItem total: ${formatNaira(item.price * item.quantity)}`;
      return details;
    })
    .join("\n\n");

  const methodText =
    customer.fulfillmentMethod === "collection"
      ? "Collection (Pickup in Ibadan)"
      : "Direct Delivery";

  const message = `Hello Harmony Hub! I would love to place an order from your website.

CUSTOMER DETAILS

Name: ${customer.fullName}
Phone: ${customer.phone}
Email: ${customer.email?.trim() || "Not provided"}

ORDER DETAILS

${itemsText}

Subtotal: ${formatNaira(subtotal)}
Delivery fee: ${deliveryFee}
Estimated total: ${formatNaira(subtotal)}

DELIVERY DETAILS

Method: ${methodText}
Address: ${customer.deliveryAddress?.trim() || "N/A (Collection)"}
Area/City: ${customer.cityArea}
Additional instructions: ${customer.deliveryInstructions?.trim() || "None"}

Order notes: ${customer.orderNotes?.trim() || "None"}

Please confirm product availability, delivery arrangements, and the final order total.

Thank you!`;

  return message;
}

/**
 * Builds the WhatsApp URL with the generated text
 */
export function buildWhatsAppUrl(message: string, customPhone?: string): string {
  const phone = customPhone || siteConfig.contact.whatsappNumber;
  // Strip any non-digit characters
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates pre-filled WhatsApp message for event enquiry
 */
export function generateEventEnquiryWhatsAppMessage(
  details: EventEnquiryDetails
): string {
  const servicesList =
    details.services.length > 0 ? details.services.join(", ") : "General Consultation";

  return `Hello Harmony Hub! I would love to enquire about planning an event with Flair & Flavors.

CLIENT DETAILS

Name: ${details.fullName}
Phone: ${details.phone}
Email: ${details.email?.trim() || "Not provided"}

EVENT DETAILS

Event Type: ${details.eventType}
Preferred Date: ${details.preferredDate?.trim() || "Not yet decided"}
Location / Area: ${details.locationArea}
Estimated Guests: ${details.guestCount?.trim() || "To be confirmed"}
Services Required: ${servicesList}
Estimated Budget: ${details.budget?.trim() || "To discuss"}

Brief Description:
${details.description}

Additional Notes:
${details.notes?.trim() || "None"}

Please let me know your availability and how we can discuss bringing this event to life.

Thank you!`;
}
