"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Calendar,
  MapPin,
  Users,
  Briefcase,
} from "lucide-react";
import Accordion, { AccordionItem } from "@/components/Accordion";
import {
  generateEventEnquiryWhatsAppMessage,
  buildWhatsAppUrl,
  EventEnquiryDetails,
} from "@/lib/whatsapp";
import { siteConfig } from "@/config/site";
import PreFooterCTA from "@/components/PreFooterCTA";

const FAQ_ITEMS: AccordionItem[] = [
  {
    id: "services-offered",
    question: "What services does Harmony Hub offer?",
    answer:
      "Harmony Hub has two main divisions. Flair & Flavors handles event management, catering, event decoration and styling, furniture hire, and custom celebration cakes. Retail & Trading offers practical kitchenware, home essentials, baby items, women's fashion, and children's outfits.",
  },
  {
    id: "enquire-event-management",
    question: "How can I enquire about event management?",
    answer:
      "You can fill out the enquiry form on this page or message us directly on WhatsApp. We will discuss your event date, venue, guest count, menu preferences, and styling ideas to give you a clear proposal.",
  },
  {
    id: "catering-and-decor",
    question: "Can I enquire about catering and decoration separately?",
    answer:
      "Yes, absolutely. You can book us for catering only, decoration and styling only, or for our complete event management package where we coordinate everything from start to finish.",
  },
  {
    id: "how-to-purchase-products",
    question: "How do I purchase products from the shop?",
    answer:
      "Simply browse our shop, select the products, sizes, or colours you want, and click 'Proceed to Checkout'. Your order summary will be sent directly to our team on WhatsApp, where we confirm product availability and arrange your delivery.",
  },
  {
    id: "whatsapp-checkout-explained",
    question: "How does WhatsApp checkout work?",
    answer:
      "Instead of taking online card payments through the website, our checkout prepares your complete order details and sends them directly to our WhatsApp. This allows us to give you personal attention, confirm product details, and arrange the most convenient delivery for you.",
  },
  {
    id: "delivery-arrangements",
    question: "How are delivery arrangements and fees confirmed?",
    answer:
      "Delivery fees depend on your exact location in Ibadan or the state we are sending your package to. Once we receive your order on WhatsApp, we calculate the fair delivery fee with our dispatch riders and let you know immediately before you pay.",
  },
  {
    id: "how-to-contact",
    question: "How can I contact Harmony Hub?",
    answer: (
      <span>
        You can reach us by phone or WhatsApp at{" "}
        <strong className="text-[#183C32]">{siteConfig.contact.phoneDisplay}</strong>, or via
        email at{" "}
        <a
          href={`mailto:${siteConfig.contact.email}`}
          className="text-[#B96F52] underline"
        >
          {siteConfig.contact.email}
        </a>
        . Our office hours are Monday through Saturday, 08:00 – 18:00 WAT.
      </span>
    ),
  },
  {
    id: "where-based",
    question: "Where is Harmony Hub based?",
    answer:
      "We are based in Ibadan, Oyo State, Nigeria. We cater and style events across Ibadan, Lagos, and neighbouring states, and we deliver products from our shop nationwide.",
  },
  {
    id: "event-advance-notice",
    question: "How far in advance should I book event planning or decoration?",
    answer:
      "For weddings and large events, we recommend contacting us 3 to 6 months ahead so we can reserve your date and prepare properly. For smaller gatherings or birthdays, 3 to 4 weeks' notice is usually sufficient. Please note that dates are only secured once agreements and deposits are finalized.",
  },
  {
    id: "cakes-advance-notice",
    question: "How much notice is needed for custom celebration cakes?",
    answer:
      "We usually require 3 to 4 weeks' notice for custom celebration cakes. Because each cake is freshly baked and decorated to your exact theme, booking early ensures your date is available.",
  },
  {
    id: "product-refund-policy",
    question: "What is Harmony Hub's refund policy on purchased products?",
    answer:
      "We do not offer refunds on items that have been delivered in good condition and accepted by the customer. We kindly ask you to inspect your items upon delivery. If an item arrives damaged or defective, please notify us within 24 hours with photos so we can quickly resolve it or arrange an exchange.",
  },
];

const AVAILABLE_SERVICES = [
  "Event Management",
  "Decoration & Styling",
  "Catering & Banqueting",
  "Furniture Hire",
  "Cakes & Desserts",
  "Other Requirements",
];

export default function FaqsAndEnquiryPage() {
  // Form State
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [eventType, setEventType] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [locationArea, setLocationArea] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");

  // Status State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [enquiryRef, setEnquiryRef] = useState<string>("");
  const [statusMessage, setStatusMessage] = useState<string>("");

  const handleServiceToggle = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!fullName.trim()) errs.fullName = "Please enter your full name.";
    if (!phone.trim()) errs.phone = "Please enter your phone number.";
    if (!eventType.trim()) errs.eventType = "Please specify the event type.";
    if (!locationArea.trim())
      errs.locationArea = "Please specify the preferred area or city.";
    if (selectedServices.length === 0)
      errs.services = "Please select at least one required service.";
    if (!description.trim())
      errs.description = "Please provide a brief description of the event.";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const getFormDetails = (): EventEnquiryDetails => ({
    fullName: fullName.trim(),
    phone: phone.trim(),
    email: email.trim() || undefined,
    eventType: eventType.trim(),
    preferredDate: preferredDate.trim() || undefined,
    locationArea: locationArea.trim(),
    guestCount: guestCount.trim() || undefined,
    services: selectedServices,
    budget: budget.trim() || undefined,
    description: description.trim(),
    notes: notes.trim() || undefined,
  });

  // Action 1: Submit Enquiry via Backend Email
  const handleSubmitEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const details = getFormDetails();
      const response = await fetch("/api/enquiry-notification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            fullName: details.fullName,
            phone: details.phone,
            email: details.email,
          },
          event: {
            eventType: details.eventType,
            preferredDate: details.preferredDate,
            locationArea: details.locationArea,
            guestCount: details.guestCount,
            services: details.services,
            budget: details.budget,
            description: details.description,
            notes: details.notes,
          },
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setEnquiryRef(data.enquiryId || "");
        setStatusMessage(
          data.message || "Your enquiry has been received by our event directors."
        );
        setSubmitSuccess(true);
      } else {
        alert(data.error || "Failed to submit enquiry. Please try again.");
      }
    } catch (err: any) {
      console.error("Enquiry submission error:", err);
      alert("Network error submitting enquiry. You can also enquire on WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Action 2: Enquire directly on WhatsApp
  const handleEnquireOnWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const details = getFormDetails();
    const message = generateEventEnquiryWhatsAppMessage(details);
    const url = buildWhatsAppUrl(message);

    // Also trigger email notification in background so team has both
    fetch("/api/enquiry-notification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer: {
          fullName: details.fullName,
          phone: details.phone,
          email: details.email,
        },
        event: {
          eventType: details.eventType,
          preferredDate: details.preferredDate,
          locationArea: details.locationArea,
          guestCount: details.guestCount,
          services: details.services,
          budget: details.budget,
          description: details.description,
          notes: details.notes,
        },
      }),
    }).catch((e) => console.log("Background email trigger error:", e));

    window.open(url, "_blank");
  };

  return (
    <div className="bg-white space-y-24 sm:space-y-32 pb-12">
      {/* 1. HERO BANNER */}
      <section className="relative min-h-[360px] flex items-center overflow-hidden bg-[#F8F9FA] border-b border-[#E5E5E5]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/figma/7f58801bb0.jpg"
            alt="Harmony Hub Silk Texture"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-85"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-16 text-center max-w-3xl space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#B96F52] font-semibold">
            HELP & ENQUIRIES
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#20211E] leading-tight font-normal">
            Frequently Asked Questions &{" "}
            <span className="italic text-[#B96F52]">Event Enquiry</span>
          </h1>
          <p className="text-base sm:text-lg text-[#20211E]/80 font-normal max-w-xl mx-auto leading-relaxed">
            Helpful answers about our services, booking lead times, order deliveries, and how we can work together on your upcoming celebration.
          </p>
        </div>
      </section>

      {/* 2. FREQUENTLY ASKED QUESTIONS ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#B96F52] font-bold">
            QUESTIONS & ANSWERS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#183C32]">
            Frequently Asked Questions
          </h2>
        </div>

        <Accordion items={FAQ_ITEMS} defaultOpenIndex={0} />
      </section>

      {/* 3. EVENT ENQUIRY SECTION */}
      <section id="enquiry" className="max-w-5xl mx-auto px-4 sm:px-8 scroll-mt-24">
        <div className="bg-white rounded-xs border border-[#DCDDD4] p-8 sm:p-14 shadow-sm space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#B96F52] font-bold">
              FLAIR & FLAVORS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#183C32]">
              Let&apos;s Plan Your Event
            </h2>
            <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed font-light">
              Tell us a little about your upcoming event, and our team will get in touch to discuss your ideas, requirements, and how we can help bring them to life.
            </p>
          </div>

          {submitSuccess ? (
            /* Success confirmation */
            <div className="bg-[#F7F4EC] border border-[#DCDDD4] p-8 rounded-xs text-center space-y-4 max-w-xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl text-[#183C32]">
                Enquiry Successfully Received
              </h3>
              {enquiryRef && (
                <p className="text-xs font-mono text-[#666D65]">
                  Reference: <span className="font-bold text-[#183C32]">#{enquiryRef}</span>
                </p>
              )}
              <p className="text-sm text-[#4B5563] leading-relaxed">
                Thank you, {fullName}. We have received your event details in Ibadan and will be in touch with you shortly to discuss next steps.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="bg-[#183C32] text-white px-6 py-2.5 rounded-xs text-xs uppercase tracking-wider font-semibold"
                >
                  Submit Another Enquiry
                </button>
                <Link
                  href="/"
                  className="border border-[#183C32] text-[#183C32] px-6 py-2.5 rounded-xs text-xs uppercase tracking-wider font-semibold"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          ) : (
            /* Main Form */
            <form onSubmit={handleSubmitEnquiry} className="space-y-8">
              {/* Client Contact Details */}
              <div className="space-y-4">
                <h3 className="text-xs uppercase tracking-widest font-bold text-[#183C32] border-b border-[#EEF1E9] pb-2">
                  1. Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#183C32] mb-1.5">
                      Full Name <span className="text-[#DC2626]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Olubunmi Adeleke"
                      className={`w-full bg-[#F7F4EC] border ${
                        errors.fullName ? "border-[#DC2626]" : "border-[#D1C7B7]"
                      } px-3.5 py-2.5 text-sm text-[#183C32] rounded-xs focus:outline-none focus:border-[#183C32]`}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-[#DC2626] mt-1">{errors.fullName}</p>
                    )}
                  </div>

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
                      } px-3.5 py-2.5 text-sm text-[#183C32] rounded-xs focus:outline-none focus:border-[#183C32]`}
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
                      placeholder="client@example.com"
                      className="w-full bg-[#F7F4EC] border border-[#D1C7B7] px-3.5 py-2.5 text-sm text-[#183C32] rounded-xs focus:outline-none focus:border-[#183C32]"
                    />
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div className="space-y-4">
                <h3 className="text-xs uppercase tracking-widest font-bold text-[#183C32] border-b border-[#EEF1E9] pb-2">
                  2. Event Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#183C32] mb-1.5">
                      Event Type <span className="text-[#DC2626]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      placeholder="e.g. Wedding, Birthday, Gala"
                      className={`w-full bg-[#F7F4EC] border ${
                        errors.eventType ? "border-[#DC2626]" : "border-[#D1C7B7]"
                      } px-3.5 py-2.5 text-sm text-[#183C32] rounded-xs focus:outline-none focus:border-[#183C32]`}
                    />
                    {errors.eventType && (
                      <p className="text-xs text-[#DC2626] mt-1">{errors.eventType}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#183C32] mb-1.5">
                      Preferred Date <span className="text-[#666D65] font-normal normal-case">(if known)</span>
                    </label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full bg-[#F7F4EC] border border-[#D1C7B7] px-3.5 py-2.5 text-sm text-[#183C32] rounded-xs focus:outline-none focus:border-[#183C32]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#183C32] mb-1.5">
                      Location / Area <span className="text-[#DC2626]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={locationArea}
                      onChange={(e) => setLocationArea(e.target.value)}
                      placeholder="e.g. Bodija, Ibadan or Lagos"
                      className={`w-full bg-[#F7F4EC] border ${
                        errors.locationArea ? "border-[#DC2626]" : "border-[#D1C7B7]"
                      } px-3.5 py-2.5 text-sm text-[#183C32] rounded-xs focus:outline-none focus:border-[#183C32]`}
                    />
                    {errors.locationArea && (
                      <p className="text-xs text-[#DC2626] mt-1">{errors.locationArea}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#183C32] mb-1.5">
                      Estimated Guests <span className="text-[#666D65] font-normal normal-case">(if known)</span>
                    </label>
                    <input
                      type="text"
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      placeholder="e.g. 150 - 200 guests"
                      className="w-full bg-[#F7F4EC] border border-[#D1C7B7] px-3.5 py-2.5 text-sm text-[#183C32] rounded-xs focus:outline-none focus:border-[#183C32]"
                    />
                  </div>
                </div>
              </div>

              {/* Services Required Checkboxes */}
              <div className="space-y-3">
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#183C32]">
                  3. Services Required <span className="text-[#DC2626]">*</span> (Select all that apply)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {AVAILABLE_SERVICES.map((service) => {
                    const isChecked = selectedServices.includes(service);
                    return (
                      <label
                        key={service}
                        className={`flex items-center gap-3 p-3 rounded-xs border text-xs font-medium cursor-pointer transition ${
                          isChecked
                            ? "bg-[#183C32] text-white border-[#183C32]"
                            : "bg-[#F7F4EC] text-[#374151] border-[#D1C7B7] hover:border-[#183C32]"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleServiceToggle(service)}
                          className="rounded-xs text-[#183C32] focus:ring-0"
                        />
                        <span>{service}</span>
                      </label>
                    );
                  })}
                </div>
                {errors.services && (
                  <p className="text-xs text-[#DC2626] mt-1">{errors.services}</p>
                )}
              </div>

              {/* Description & Notes */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs uppercase tracking-wider font-semibold text-[#183C32]">
                      4. Brief Description of the Event <span className="text-[#DC2626]">*</span>
                    </label>
                    <span className="text-[11px] text-[#666D65]">
                      Themes, color palettes, special moments
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tell us what you envision for this celebration, desired ambiance, dietary preferences, or milestones to mark..."
                    className={`w-full bg-[#F7F4EC] border ${
                      errors.description ? "border-[#DC2626]" : "border-[#D1C7B7]"
                    } px-3.5 py-2.5 text-sm text-[#183C32] rounded-xs focus:outline-none focus:border-[#183C32]`}
                  />
                  {errors.description && (
                    <p className="text-xs text-[#DC2626] mt-1">{errors.description}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#183C32] mb-1.5">
                      Estimated Budget <span className="text-[#666D65] font-normal normal-case">(if known / flexible)</span>
                    </label>
                    <input
                      type="text"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      placeholder="e.g. ₦2,500,000 / Flexible"
                      className="w-full bg-[#F7F4EC] border border-[#D1C7B7] px-3.5 py-2.5 text-sm text-[#183C32] rounded-xs focus:outline-none focus:border-[#183C32]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#183C32] mb-1.5">
                      Additional Requirements or Notes <span className="text-[#666D65] font-normal normal-case">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any specific requests or constraints"
                      className="w-full bg-[#F7F4EC] border border-[#D1C7B7] px-3.5 py-2.5 text-sm text-[#183C32] rounded-xs focus:outline-none focus:border-[#183C32]"
                    />
                  </div>
                </div>
              </div>

              {/* DUAL ACTIONS: Submit Enquiry + Enquire on WhatsApp */}
              <div className="pt-6 border-t border-[#DCDDD4] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#183C32] hover:bg-[#B96F52] text-white py-4 px-6 rounded-xs text-xs uppercase tracking-widest font-semibold transition shadow-sm disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Enquiry</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleEnquireOnWhatsApp}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BE5A] text-white py-4 px-6 rounded-xs text-xs uppercase tracking-widest font-semibold transition shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Enquire on WhatsApp</span>
                </button>
              </div>

              <p className="text-[11px] text-[#666D65] text-center">
                Submitting this form sends your details directly to the Harmony Hub team. If you choose WhatsApp, your message will open ready to send.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* 4. PRE-FOOTER CTA */}
      <PreFooterCTA />
    </div>
  );
}
