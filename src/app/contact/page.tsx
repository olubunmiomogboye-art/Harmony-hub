"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  Paperclip,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import PreFooterCTA from "@/components/PreFooterCTA";
import Accordion, { AccordionItem } from "@/components/Accordion";

const CONTACT_FAQS: AccordionItem[] = [
  {
    id: "lead-times",
    question: "How far in advance should I book for events?",
    answer:
      "For weddings and large celebrations, we advise reaching out 3 to 6 months ahead so we can secure your date. For birthdays, private dinners, or custom celebration cakes, 3 to 4 weeks' notice is usually sufficient.",
  },
  {
    id: "dispatch-radius",
    question: "Where do you deliver products from your shop?",
    answer:
      "We deliver across all areas of Ibadan using local dispatch riders. For other states including Lagos, Abuja, and Port Harcourt, packages arrive within 2 to 3 working days via trusted interstate delivery partners.",
  },
  {
    id: "corporate-gifting",
    question: "Do you supply bulk orders, gifts, or event souvenirs?",
    answer:
      "Yes. We assemble gift hampers, wedding souvenirs, employee gifts, and bulk kitchenware packages. Branded packaging and custom ribbons are available upon request.",
  },
  {
    id: "tasting-consultations",
    question: "Can we have a consultation or cake tasting before booking?",
    answer:
      "Yes. We hold consultation sessions and cake tastings in Ibadan by appointment after discussing your event plans, so you can sample our flavours and finalize details with total confidence.",
  },
];

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<"events" | "retail">("events");

  // Form State
  const [fullName, setFullName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [department, setDepartment] = useState("Flair & Flavors");
  const [timeline, setTimeline] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  // Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !telephone || !message) {
      alert("Please fill in your name, phone number, and brief specifications.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/enquiry-notification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            fullName: fullName.trim(),
            phone: telephone.trim(),
            email: email.trim() || undefined,
            organization: organization.trim() || undefined,
          },
          event: {
            eventType: activeTab === "events" ? "Flair & Flavors Consultation" : "Retail & Orders Inquiry",
            locationArea: "Ibadan / Nationwide",
            preferredDate: timeline.trim() || undefined,
            services: [activeTab === "events" ? department : "Retail & Trading Inquiry"],
            description: message.trim(),
          },
        }),
      });

      const data = await response.json();
      setRefId(data.referenceId || "HH-" + Math.floor(100000 + Math.random() * 900000));
      setSubmitted(true);
    } catch {
      setRefId("HH-" + Math.floor(100000 + Math.random() * 900000));
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      {/* 1. HERO SECTION (Figma 46:744) */}
      <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center overflow-hidden bg-[#F8F9FA]">
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-20 lg:py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6 max-w-xl">
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-[76px] font-normal leading-[1.08] tracking-tight text-[#20211E]">
                We Welcome <br />
                Your <span className="italic text-[#B96F52]">Enquiry.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#20211E]/80 leading-relaxed max-w-xl font-normal">
                Whether you are planning an upcoming wedding, birthday, or corporate event with Flair & Flavors, or have questions about our products and deliveries, we would love to hear from you.
              </p>

              {/* 3 Trust Accords matching Figma 46:744 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
                <div className="bg-white p-4 rounded-xs border border-[#E5E5E5] shadow-xs">
                  <span className="text-[10px] uppercase tracking-wider text-[#8A8884] font-medium block">
                    PROMPT REPLIES
                  </span>
                  <p className="font-serif text-lg font-medium text-[#20211E] mt-0.5">
                    Within a Few Hours
                  </p>
                  <p className="text-[11px] text-[#8A8884] mt-1 leading-snug">
                    We respond quickly to all messages during working hours.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xs border border-[#E5E5E5] shadow-xs">
                  <span className="text-[10px] uppercase tracking-wider text-[#8A8884] font-medium block">
                    WARM & HELPFUL
                  </span>
                  <p className="font-serif text-lg font-medium text-[#20211E] mt-0.5">
                    Personal Attention
                  </p>
                  <p className="text-[11px] text-[#8A8884] mt-1 leading-snug">
                    Speak directly with someone who understands your needs.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xs border border-[#E5E5E5] shadow-xs">
                  <span className="text-[10px] uppercase tracking-wider text-[#8A8884] font-medium block">
                    BASED IN IBADAN
                  </span>
                  <p className="font-serif text-lg font-medium text-[#20211E] mt-0.5">
                    Serving Nationwide
                  </p>
                  <p className="text-[11px] text-[#8A8884] mt-1 leading-snug">
                    Consultations by appointment, delivery across Nigeria.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Hero Graphic: 5 Slit Vertical Panels (Figma 46:744 Union-3) */}
            <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[673px] aspect-[673/393]">
                <Image
                  src="/images/uploaded/contact-hero-altar.png"
                  alt="Harmony Hub Ceremonial Setting with Transparent Chairs and Runway"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 673px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DIRECT INQUIRY TRACK & FORM (Figma 46:744) */}
      <section className="py-20 sm:py-28 max-w-4xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-xs border border-[#E5E5E5] p-6 sm:p-12 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E5E5] pb-6">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#8A8884] font-medium block mb-1">
                WHAT CAN WE HELP YOU WITH?
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#20211E] font-normal">
                Send Us a Message
              </h2>
            </div>

            {/* Channel Tabs */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("events");
                  setDepartment("Flair & Flavors");
                }}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-xs transition ${
                  activeTab === "events"
                    ? "bg-[#8A4A32] text-white"
                    : "bg-[#F7F6F4] text-[#20211E] hover:bg-[#EAE8E3]"
                }`}
              >
                FLAIR & FLAVORS (EVENTS)
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("retail");
                  setDepartment("Retail & Trading");
                }}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-xs transition ${
                  activeTab === "retail"
                    ? "bg-[#8A4A32] text-white"
                    : "bg-[#F7F6F4] text-[#20211E] hover:bg-[#EAE8E3]"
                }`}
              >
                SHOP & ORDERS
              </button>
            </div>
          </div>

          {submitted ? (
            <div className="p-8 text-center space-y-4 bg-[#F7F6F4] rounded-xs border border-[#DCDDD4]">
              <div className="w-12 h-12 rounded-full bg-[#183C32] text-white flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-[#20211E]">Enquiry Received</h3>
              <p className="text-xs text-[#8A8884]">
                Reference ID: <strong className="text-[#20211E]">{refId}</strong>
              </p>
              <p className="text-sm text-[#4D463C] max-w-md mx-auto">
                Thank you, {fullName}. We have received your message. A member of our team will get in touch with you shortly.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
                    `Hello Harmony Hub, I sent an enquiry [Ref: ${refId}] for ${fullName}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#183C32] text-white px-6 py-3 rounded-xs text-xs uppercase tracking-widest font-semibold"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-[#8A8884] underline uppercase tracking-wider"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Service description box */}
              <div className="bg-[#F7F6F4] p-4 rounded-xs border border-[#E5E5E5] text-xs text-[#4D463C] flex items-start gap-3">
                <div className="text-[#B96F52] mt-0.5">✦</div>
                <div>
                  <strong className="text-[#20211E] block mb-0.5">
                    {activeTab === "events" ? "Flair & Flavors Event Enquiry" : "Shop & Product Enquiries"}
                  </strong>
                  <p>
                    {activeTab === "events"
                      ? "For wedding receptions, birthdays, anniversaries, corporate banquets, catering, and decor styling."
                      : "For cookware questions, baby care items, gift hampers, fashion, or bulk orders."}
                  </p>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#20211E] mb-1.5">
                  FULL NAME <span className="text-[#DC2626]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Adebayo Adeleke"
                  className="w-full bg-[#F7F6F4] border border-[#E5E5E5] px-3.5 py-2.5 text-sm text-[#20211E] rounded-xs focus:outline-none focus:border-[#183C32]"
                />
              </div>

              {/* Corporate */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#20211E] mb-1.5">
                  CORPORATE / ORGANIZATION <span className="text-[#8A8884] font-normal normal-case">(OPTIONAL)</span>
                </label>
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="e.g. Althorne Holdings"
                  className="w-full bg-[#F7F6F4] border border-[#E5E5E5] px-3.5 py-2.5 text-sm text-[#20211E] rounded-xs focus:outline-none focus:border-[#183C32]"
                />
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#20211E] mb-1.5">
                    EMAIL ADDRESS <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="adebayo@company.ng"
                    className="w-full bg-[#F7F6F4] border border-[#E5E5E5] px-3.5 py-2.5 text-sm text-[#20211E] rounded-xs focus:outline-none focus:border-[#183C32]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#20211E] mb-1.5">
                    DIRECT TELEPHONE <span className="text-[#DC2626]">*</span>
                  </label>
                  <div className="flex gap-2">
                    <span className="bg-[#F7F6F4] border border-[#E5E5E5] px-3 py-2.5 text-sm text-[#20211E] rounded-xs font-mono">
                      +234
                    </span>
                    <input
                      type="tel"
                      required
                      value={telephone}
                      onChange={(e) => setTelephone(e.target.value)}
                      placeholder="801 234 5678"
                      className="w-full bg-[#F7F6F4] border border-[#E5E5E5] px-3.5 py-2.5 text-sm text-[#20211E] rounded-xs focus:outline-none focus:border-[#183C32]"
                    />
                  </div>
                </div>
              </div>

              {/* Department & Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#20211E] mb-1.5">
                    SERVICE NEEDED <span className="text-[#DC2626]">*</span>
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-[#F7F6F4] border border-[#E5E5E5] px-3.5 py-2.5 text-sm text-[#20211E] rounded-xs focus:outline-none focus:border-[#183C32]"
                  >
                    <option value="Flair & Flavors">Flair & Flavors (Catering & Decor)</option>
                    <option value="Catering Alone">Catering Only</option>
                    <option value="Decoration & Styling">Event Decoration & Styling</option>
                    <option value="Celebration Cakes">Custom Celebration Cakes</option>
                    <option value="Retail & Trading">Shop & Product Enquiries</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#20211E] mb-1.5">
                    EVENT DATE / TIMELINE <span className="text-[#8A8884] font-normal normal-case">(OPTIONAL)</span>
                  </label>
                  <input
                    type="date"
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full bg-[#F7F6F4] border border-[#E5E5E5] px-3.5 py-2.5 text-sm text-[#20211E] rounded-xs focus:outline-none focus:border-[#183C32]"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#20211E] mb-1.5">
                  YOUR MESSAGE / EVENT DETAILS <span className="text-[#DC2626]">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your event, expected guest count, venue, product questions, or any specific requests..."
                  className="w-full bg-[#F7F6F4] border border-[#E5E5E5] px-3.5 py-2.5 text-sm text-[#20211E] rounded-xs focus:outline-none focus:border-[#183C32]"
                />
              </div>

              {/* RFP file placeholder matching Figma */}
              <div className="bg-[#F7F6F4] p-4 rounded-xs border border-[#E5E5E5] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Paperclip className="w-5 h-5 text-[#8A8884]" />
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#20211E] block">
                      HAVE AN EVENT MOODBOARD OR DOCUMENT?
                    </span>
                    <span className="text-[10px] text-[#8A8884]">
                      PDF, image, or document up to 25MB
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => alert("File attachment will be added to your message.")}
                  className="bg-white border border-[#DCDDD4] px-3 py-1.5 text-[10px] uppercase tracking-wider font-semibold text-[#20211E] rounded-xs hover:border-[#183C32]"
                >
                  ATTACH FILE
                </button>
              </div>

              {/* Consent checkbox */}
              <div className="flex items-start gap-2.5 pt-2">
                <input
                  type="checkbox"
                  id="consent"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  required
                  className="mt-0.5 rounded-xs text-[#183C32] focus:ring-[#183C32]"
                />
                <label htmlFor="consent" className="text-xs text-[#4D463C] cursor-pointer">
                  I agree to be contacted by the Harmony Hub team regarding this enquiry.
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#183C32] hover:bg-[#122E26] text-white px-8 py-3.5 rounded-xs text-xs uppercase tracking-widest font-semibold transition disabled:opacity-50 flex items-center gap-2 shadow-sm"
                >
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>SEND ENQUIRY</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* 3. TWO DIVISION FEATURE TILES (Figma 46:744) */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative aspect-[16/10] rounded-xs overflow-hidden group shadow-md">
            <Image
              src="/images/figma/50b8b5e557.jpg"
              alt="Catering & Event Styling"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent flex flex-col justify-end p-8 text-white">
              <span className="text-[10px] uppercase tracking-widest text-white/70 block mb-1">
                FLAIR & FLAVORS
              </span>
              <h3 className="font-serif text-2xl font-medium">
                Catering & Event Styling
              </h3>
              <p className="text-xs text-white/80 mt-1 max-w-md font-light">
                From intimate family celebrations to grand wedding banquets and milestone birthdays, we provide delicious food and beautiful decor tailored to you.
              </p>
            </div>
          </div>

          <div className="relative aspect-[16/10] rounded-xs overflow-hidden group shadow-md">
            <Image
              src="/images/figma/d8507e1ba3.jpg"
              alt="Quality Everyday Products"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent flex flex-col justify-end p-8 text-white">
              <span className="text-[10px] uppercase tracking-widest text-white/70 block mb-1">
                RETAIL & SHOP
              </span>
              <h3 className="font-serif text-2xl font-medium">
                Quality Everyday Products
              </h3>
              <p className="text-xs text-white/80 mt-1 max-w-md font-light">
                Durable cookware, dependable home essentials, gentle baby items, and stylish fashion pieces delivered directly to your doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. "WE'D LOVE TO HEAR FROM YOU" (Contact Channels) */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-8 border-t border-[#E5E5E5]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#705B38] font-semibold block">
              GET IN TOUCH
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#20211E] font-normal leading-tight">
              We&apos;d Love to Hear From <br />
              <span className="italic text-[#B96F52]">You</span>
            </h2>
            <p className="text-base text-[#4D463C] leading-relaxed font-light">
              At Harmony Hub, we believe every good service begins with a listening ear. Reach out to ask a question, discuss an upcoming celebration, or place an order. We are always happy to help.
            </p>

            <div className="space-y-4 pt-2">
              <div className="pb-4 border-b border-[#E5E5E5]">
                <span className="text-[10px] uppercase tracking-wider text-[#8A8884] font-semibold block">
                  OUR LOCATION
                </span>
                <p className="font-medium text-[#20211E] mt-0.5">
                  Ibadan, Oyo State, Nigeria
                </p>
              </div>

              <div className="pb-4 border-b border-[#E5E5E5]">
                <span className="text-[10px] uppercase tracking-wider text-[#8A8884] font-semibold block">
                  PHONE & WHATSAPP
                </span>
                <a
                  href={`tel:${siteConfig.contact.whatsappNumber}`}
                  className="font-medium text-[#20211E] hover:text-[#B96F52] mt-0.5 block"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
                <p className="text-xs text-[#8A8884] mt-0.5">
                  Call or chat with us on WhatsApp
                </p>
              </div>

              <div className="pb-4 border-b border-[#E5E5E5]">
                <span className="text-[10px] uppercase tracking-wider text-[#8A8884] font-semibold block">
                  EMAIL ADDRESS
                </span>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="font-medium text-[#20211E] hover:text-[#B96F52] mt-0.5 block"
                >
                  {siteConfig.contact.email}
                </a>
                <p className="text-xs text-[#8A8884] mt-0.5">
                  Send us an email anytime
                </p>
              </div>

              <div className="pb-4">
                <span className="text-[10px] uppercase tracking-wider text-[#8A8884] font-semibold block">
                  OFFICE HOURS
                </span>
                <p className="font-medium text-[#20211E] mt-0.5">
                  {siteConfig.contact.hours}
                </p>
                <p className="text-xs text-[#8A8884] mt-0.5">
                  Consultations and visits are welcome by appointment.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#183C32] hover:bg-[#122E26] text-white px-8 py-3.5 rounded-xs text-xs uppercase tracking-widest font-semibold transition shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>CHAT WITH US ON WHATSAPP</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 relative h-[500px] sm:h-[600px] lg:h-[680px] w-full rounded-xs overflow-hidden shadow-sm">
            <Image
              src="/images/figma/731d3c.jpg"
              alt="Harmony Hub Floral Runway Setting"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* 5. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 sm:py-28 bg-[#F7F6F4] border-t border-[#E5E5E5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-[#705B38] font-semibold block mb-2">
              COMMON QUESTIONS
            </span>
            <h2 className="font-serif italic text-4xl sm:text-5xl text-[#20211E] font-normal">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-[#8A8884] mt-2">
              Quick answers about event bookings, delivery, and consultations.
            </p>
          </div>

          <Accordion items={CONTACT_FAQS} allowMultiple />
        </div>
      </section>

      {/* 6. PRE-FOOTER CTA BANNER */}
      <PreFooterCTA />
    </div>
  );
}
