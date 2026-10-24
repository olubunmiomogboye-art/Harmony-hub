"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  MessageSquare,
  Truck,
  Building,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Info,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatNaira } from "@/lib/formatters";
import { generateOrderWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site";

export default function CheckoutPage() {
  const { items, subtotal } = useCart();

  // Form State
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [fulfillmentMethod, setFulfillmentMethod] = useState<"delivery" | "collection">("delivery");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [cityArea, setCityArea] = useState("");
  const [deliveryInstructions, setDeliveryInstructions] = useState("");
  const [orderNotes, setOrderNotes] = useState("");

  // Submission State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [generatedWhatsAppUrl, setGeneratedWhatsAppUrl] = useState<string>("");
  const [generatedMessageText, setGeneratedMessageText] = useState<string>("");
  const [orderReference, setOrderReference] = useState<string>("");
  const [emailDelivered, setEmailDelivered] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!fullName.trim()) {
      errs.fullName = "Please enter your full name.";
    }

    if (!phone.trim()) {
      errs.phone = "Please provide your phone number.";
    } else if (phone.trim().length < 8) {
      errs.phone = "Please enter a valid phone number.";
    }

    if (fulfillmentMethod === "delivery") {
      if (!deliveryAddress.trim()) {
        errs.deliveryAddress = "Delivery address is required for dispatch.";
      }
      if (!cityArea.trim()) {
        errs.cityArea = "Please specify your city or neighborhood/area.";
      }
    }

    if (items.length === 0) {
      errs.cart = "Your shopping bag is empty. Please add products before checking out.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleContinueToWhatsApp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // 1. Build customer object
    const customer = {
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      fulfillmentMethod,
      deliveryAddress: fulfillmentMethod === "delivery" ? deliveryAddress.trim() : undefined,
      cityArea: fulfillmentMethod === "delivery" ? cityArea.trim() : "Ibadan Atelier Collection",
      deliveryInstructions: deliveryInstructions.trim() || undefined,
      orderNotes: orderNotes.trim() || undefined,
    };

    // 2. Prepare items
    const orderItems = items.map((item) => ({
      id: item.product.id,
      name: `${item.product.name}${item.selectedVariant ? ` (${item.selectedVariant})` : ""}`,
      price: item.product.price,
      quantity: item.quantity,
      selectedVariant: item.selectedVariant,
    }));

    // 3. Generate dynamic WhatsApp message and URL
    const message = generateOrderWhatsAppMessage(orderItems, customer);
    const url = buildWhatsAppUrl(message);

    setGeneratedMessageText(message);
    setGeneratedWhatsAppUrl(url);

    // 4. Open WhatsApp window immediately to prevent popup blocker
    const whatsappWindow = window.open(url, "_blank");

    try {
      // 5. Dispatch genuine backend email notification in parallel
      const response = await fetch("/api/order-notification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: orderItems,
          customer,
          subtotal,
          deliveryFee: "To be confirmed",
        }),
      });

      const data = await response.json();
      if (data.orderId) {
        setOrderReference(data.orderId);
      }
      if (data.emailResult?.delivered) {
        setEmailDelivered(true);
      }
    } catch (err: any) {
      console.error("Backend notification error:", err);
    } finally {
      setIsSubmitting(false);
      setOrderSubmitted(true);

      // If popup blocker still caught window.open, navigate directly
      if (!whatsappWindow || whatsappWindow.closed || typeof whatsappWindow.closed === "undefined") {
        window.location.href = url;
      }
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedMessageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-12">
      {/* Page Title */}
      <div className="border-b border-[#DCDDD4] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#B96F52] font-bold">
            DIRECT CONCIERGE ORDER
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#183C32] mt-1">
            Order Checkout
          </h1>
        </div>

        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#4B5563] hover:text-[#183C32] font-semibold transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Bag</span>
        </Link>
      </div>

      {items.length === 0 && !orderSubmitted ? (
        <div className="py-16 bg-white rounded-xs border border-[#DCDDD4] text-center p-8 space-y-4 max-w-lg mx-auto">
          <p className="font-serif text-xl text-[#183C32]">
            Your shopping bag is empty
          </p>
          <p className="text-sm text-[#666D65]">
            Please add products to your bag before proceeding to checkout.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-[#183C32] text-white px-6 py-2.5 rounded-xs text-xs uppercase tracking-wider font-semibold"
          >
            Browse Products
          </Link>
        </div>
      ) : orderSubmitted ? (
        /* Order Prepared / Success State */
        <div className="max-w-2xl mx-auto bg-white border border-[#DCDDD4] p-8 sm:p-12 rounded-xs shadow-md space-y-8 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#B96F52] font-bold">
              ORDER DETAILS PREPARED
            </span>
            <h2 className="font-serif text-3xl text-[#183C32]">
              Your order details are ready to send
            </h2>
            {orderReference && (
              <p className="text-xs font-mono text-[#666D65]">
                Reference: <span className="font-bold text-[#183C32]">#{orderReference}</span>
              </p>
            )}
          </div>

          {/* Primary Action Button */}
          <div className="space-y-3">
            <a
              href={generatedWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20BE5A] text-white py-4 px-8 rounded-xs text-sm uppercase tracking-widest font-bold transition shadow-md"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Send in WhatsApp</span>
              <ExternalLink className="w-4 h-4 ml-1" />
            </a>
            <p className="text-xs text-[#666D65]">
              Tapping above will open WhatsApp directly with your prefilled order message. Please press <strong>Send</strong> in WhatsApp.
            </p>
          </div>

          {/* Prefilled message preview with copy button */}
          <div className="text-left bg-[#F7F4EC] border border-[#DCDDD4] p-4 rounded-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-bold text-[#183C32]">
                Prepared WhatsApp Message:
              </span>
              <button
                type="button"
                onClick={copyToClipboard}
                className="inline-flex items-center gap-1.5 text-xs text-[#183C32] hover:text-[#B96F52] font-semibold bg-white px-2.5 py-1 rounded-xs border border-[#D1C7B7]"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>
            </div>
            <pre className="text-xs text-[#374151] whitespace-pre-wrap font-sans max-h-48 overflow-y-auto bg-white p-3 rounded-xs border border-[#DCDDD4] leading-relaxed">
              {generatedMessageText}
            </pre>
          </div>

          {/* Email Notification Status */}
          <div className="bg-[#F7F4EC] p-4 rounded-xs border border-[#DCDDD4] text-xs text-left text-[#4B5563] space-y-1.5">
            <div className="flex items-center gap-2 font-semibold text-[#183C32]">
              <Info className="w-4 h-4 text-[#B96F52]" />
              <span>Email Notification Record</span>
            </div>
            {emailDelivered ? (
              <p className="text-emerald-700">
                ✓ Order confirmation email dispatched to Harmony Hub management ({siteConfig.contact.email}).
              </p>
            ) : (
              <p>
                ✓ Order dossier #{orderReference || "HH-ORD"} logged to server records for {siteConfig.contact.email}. (To receive live email alerts, SMTP can be configured in <code className="bg-gray-100 px-1 py-0.5 rounded">.env.local</code>).
              </p>
            )}
          </div>

          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-block text-xs uppercase tracking-widest font-semibold text-[#183C32] hover:text-[#B96F52] transition underline underline-offset-4"
            >
              Back to Shop
            </Link>
          </div>
        </div>
      ) : (
        /* Standard Checkout Form & Order Summary */
        <form onSubmit={handleContinueToWhatsApp} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Form Sections */}
          <div className="lg:col-span-7 space-y-8">
            {/* Section A: Contact Details */}
            <div className="bg-white p-6 sm:p-8 rounded-xs border border-[#DCDDD4] space-y-5">
              <div className="border-b border-[#EEF1E9] pb-3">
                <span className="text-[10px] uppercase tracking-wider text-[#B96F52] font-bold">
                  SECTION A
                </span>
                <h2 className="font-serif text-xl sm:text-2xl text-[#183C32]">
                  Contact Details
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#183C32] mb-1.5">
                    Full Name <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Adebayo Adeleke"
                    className={`w-full bg-[#F7F4EC] border ${
                      errors.fullName ? "border-[#DC2626]" : "border-[#D1C7B7]"
                    } px-3.5 py-2.5 text-sm text-[#183C32] rounded-xs focus:outline-none focus:border-[#183C32] transition`}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-[#DC2626] mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#183C32] mb-1.5">
                      Phone Number <span className="text-[#DC2626]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+234 801 234 5678"
                      className={`w-full bg-[#F7F4EC] border ${
                        errors.phone ? "border-[#DC2626]" : "border-[#D1C7B7]"
                      } px-3.5 py-2.5 text-sm text-[#183C32] rounded-xs focus:outline-none focus:border-[#183C32] transition`}
                    />
                    {errors.phone && (
                      <p className="text-xs text-[#DC2626] mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#183C32] mb-1.5">
                      Email Address <span className="text-[#666D65] font-normal normal-case">(optional)</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="adebayo@example.com"
                      className="w-full bg-[#F7F4EC] border border-[#D1C7B7] px-3.5 py-2.5 text-sm text-[#183C32] rounded-xs focus:outline-none focus:border-[#183C32] transition"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section B: Delivery Information */}
            <div className="bg-white p-6 sm:p-8 rounded-xs border border-[#DCDDD4] space-y-5">
              <div className="border-b border-[#EEF1E9] pb-3">
                <span className="text-[10px] uppercase tracking-wider text-[#B96F52] font-bold">
                  SECTION B
                </span>
                <h2 className="font-serif text-xl sm:text-2xl text-[#183C32]">
                  Fulfilment & Delivery
                </h2>
              </div>

              {/* Fulfilment Selector */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFulfillmentMethod("delivery")}
                  className={`p-3.5 rounded-xs border text-left flex items-start gap-3 transition ${
                    fulfillmentMethod === "delivery"
                      ? "border-[#183C32] bg-[#EEF1E9]"
                      : "border-[#D1C7B7] bg-[#F7F4EC] opacity-75"
                  }`}
                >
                  <Truck className="w-5 h-5 text-[#B96F52] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-[#183C32]">
                      Direct Delivery
                    </span>
                    <span className="text-[11px] text-[#666D65]">
                      Dispatch in Ibadan & Nationwide
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFulfillmentMethod("collection")}
                  className={`p-3.5 rounded-xs border text-left flex items-start gap-3 transition ${
                    fulfillmentMethod === "collection"
                      ? "border-[#183C32] bg-[#EEF1E9]"
                      : "border-[#D1C7B7] bg-[#F7F4EC] opacity-75"
                  }`}
                >
                  <Building className="w-5 h-5 text-[#B96F52] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-[#183C32]">
                      Atelier Collection
                    </span>
                    <span className="text-[11px] text-[#666D65]">
                      Pickup at Ibadan Atelier
                    </span>
                  </div>
                </button>
              </div>

              {fulfillmentMethod === "delivery" ? (
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#183C32] mb-1.5">
                      Delivery Street Address <span className="text-[#DC2626]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="e.g. 14 Ring Road / Bodija / Oluyole Estate"
                      className={`w-full bg-[#F7F4EC] border ${
                        errors.deliveryAddress ? "border-[#DC2626]" : "border-[#D1C7B7]"
                      } px-3.5 py-2.5 text-sm text-[#183C32] rounded-xs focus:outline-none focus:border-[#183C32] transition`}
                    />
                    {errors.deliveryAddress && (
                      <p className="text-xs text-[#DC2626] mt-1">{errors.deliveryAddress}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#183C32] mb-1.5">
                      City / Area / State <span className="text-[#DC2626]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={cityArea}
                      onChange={(e) => setCityArea(e.target.value)}
                      placeholder="e.g. Ibadan, Oyo State (or Lagos State, Abuja, etc.)"
                      className={`w-full bg-[#F7F4EC] border ${
                        errors.cityArea ? "border-[#DC2626]" : "border-[#D1C7B7]"
                      } px-3.5 py-2.5 text-sm text-[#183C32] rounded-xs focus:outline-none focus:border-[#183C32] transition`}
                    />
                    {errors.cityArea && (
                      <p className="text-xs text-[#DC2626] mt-1">{errors.cityArea}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#183C32] mb-1.5">
                      Additional Delivery Instructions <span className="text-[#666D65] font-normal normal-case">(optional)</span>
                    </label>
                    <textarea
                      rows={2}
                      value={deliveryInstructions}
                      onChange={(e) => setDeliveryInstructions(e.target.value)}
                      placeholder="e.g. Call upon arrival at the gate, preferred afternoon delivery"
                      className="w-full bg-[#F7F4EC] border border-[#D1C7B7] px-3.5 py-2 text-sm text-[#183C32] rounded-xs focus:outline-none focus:border-[#183C32] transition"
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-[#F7F4EC] p-4 rounded-xs border border-[#DCDDD4] text-xs text-[#4B5563] space-y-1">
                  <p className="font-semibold text-[#183C32]">
                    Atelier Collection in Ibadan
                  </p>
                  <p>
                    Harmony Hub is based in <strong className="text-[#183C32]">Ibadan, Oyo State, Nigeria</strong>. Once your order is prepared, our team will provide full collection directions and timings on WhatsApp.
                  </p>
                </div>
              )}
            </div>

            {/* Section D: Additional Notes */}
            <div className="bg-white p-6 sm:p-8 rounded-xs border border-[#DCDDD4] space-y-5">
              <div className="border-b border-[#EEF1E9] pb-3">
                <span className="text-[10px] uppercase tracking-wider text-[#B96F52] font-bold">
                  SECTION D
                </span>
                <h2 className="font-serif text-xl sm:text-2xl text-[#183C32]">
                  Additional Notes
                </h2>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#183C32] mb-1.5">
                  Special Requests or Questions <span className="text-[#666D65] font-normal normal-case">(optional)</span>
                </label>
                <textarea
                  rows={3}
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="Mention any custom packaging requirements, urgency, or specific questions..."
                  className="w-full bg-[#F7F4EC] border border-[#D1C7B7] px-3.5 py-2.5 text-sm text-[#183C32] rounded-xs focus:outline-none focus:border-[#183C32] transition"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Section C (Order Summary) & Section E (Final Action) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-xs border border-[#DCDDD4] space-y-6 sticky top-28">
              <div className="border-b border-[#EEF1E9] pb-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#B96F52] font-bold">
                    SECTION C
                  </span>
                  <h2 className="font-serif text-xl text-[#183C32]">
                    Order Summary
                  </h2>
                </div>
                <Link
                  href="/cart"
                  className="text-xs text-[#B96F52] hover:underline font-medium"
                >
                  Edit bag
                </Link>
              </div>

              {/* Items List */}
              <ul className="divide-y divide-[#EEF1E9] max-h-72 overflow-y-auto pr-1">
                {items.map((item) => (
                  <li
                    key={`${item.product.id}-${item.selectedVariant || "default"}`}
                    className="py-3 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-12 h-12 bg-[#F7F4EC] rounded-xs overflow-hidden shrink-0 border border-[#DCDDD4]">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-[#183C32] truncate">
                          {item.product.name}
                        </p>
                        <p className="text-[#666D65] text-[11px]">
                          Qty: {item.quantity} × {formatNaira(item.product.price)}
                          {item.selectedVariant && ` • ${item.selectedVariant}`}
                        </p>
                      </div>
                    </div>
                    <span className="font-semibold text-[#183C32] shrink-0">
                      {formatNaira(item.product.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Cost Breakdown */}
              <div className="space-y-2.5 pt-4 border-t border-[#DCDDD4] text-xs">
                <div className="flex justify-between text-[#4B5563]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#183C32]">{formatNaira(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#4B5563]">
                  <span>Fulfilment Method</span>
                  <span className="font-medium text-[#183C32]">
                    {fulfillmentMethod === "delivery" ? "Direct Delivery" : "Atelier Collection"}
                  </span>
                </div>
                <div className="flex justify-between text-[#4B5563]">
                  <span>Delivery fee</span>
                  <span className="text-[#B96F52] font-medium">
                    To be confirmed
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#183C32] pt-3 border-t border-[#EEF1E9]">
                  <span>Estimated Total</span>
                  <span>{formatNaira(subtotal)}</span>
                </div>
              </div>

              {/* Section E: Final Action */}
              <div className="space-y-4 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2.5 bg-[#183C32] hover:bg-[#B96F52] text-white py-4 px-6 rounded-xs text-xs uppercase tracking-widest font-semibold transition shadow-md disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Preparing Order...</span>
                    </>
                  ) : (
                    <>
                      <MessageSquare className="w-4 h-4" />
                      <span>Continue to WhatsApp</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-[#666D65] text-center leading-relaxed">
                  Your order details will be prepared for WhatsApp so our team can confirm availability, delivery arrangements, and your final total.
                </p>

                <div className="pt-2 border-t border-[#EEF1E9] text-center">
                  <p className="text-[10px] uppercase tracking-wider text-[#9CA3AF]">
                    Harmony Hub Concierge • {siteConfig.contact.phoneDisplay} • Ibadan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
