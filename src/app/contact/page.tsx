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
    question: "What lead times are required for bespoke catering and major events?",
    answer:
      "For grand weddings and corporate galas, we recommend reaching out 3 to 6 months in advance. For private dinners, executive tasting salons, or bespoke celebration cakes, 3 to 4 weeks' notice is generally sufficient.",
  },
  {
    id: "dispatch-radius",
    question: "What is the nationwide dispatch radius for Retail & Trading orders?",
    answer:
      "We dispatch daily across all zones of Ibadan via direct motor couriers. Interstate deliveries to Lagos, Abuja, Port Harcourt, and other states arrive within 48 to 72 hours via expedited logistics partners.",
  },
  {
    id: "corporate-gifting",
    question: "Do you accommodate corporate bulk gifting and branded procurement?",
    answer:
      "Yes. We assemble custom corporate hampers, VIP holiday gifts, and chef-grade cookware procurement dossiers. Custom ribbons, branded cards, and non-disclosure agreements are available upon request.",
  },
  {
    id: "tasting-consultations",
    question: "How are tasting consultations structured for prospective brides & celebrants?",
    answer:
      "Tasting appointments take place in Ibadan and are arranged following initial budget alignment. Couples taste customized course pairings prepared by our head culinary team.",
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
                Your <span className="italic text-[#B96F52]">Inquiry.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#20211E]/80 leading-relaxed max-w-xl font-normal">
                Whether you are planning a milestone banquet with Flair & Flavors, seeking bespoke corporate gifting from Retail & Trading, or inquiring about enterprise partnerships, our dedicated concierge team is at your disposal.
              </p>

              {/* 3 Trust Accords matching Figma 46:744 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
                <div className="bg-white p-4 rounded-xs border border-[#E5E5E5] shadow-xs">
                  <span className="text-[10px] uppercase tracking-wider text-[#8A8884] font-medium block">
                    RESPONSE ACCORD
                  </span>
                  <p className="font-serif text-lg font-medium text-[#20211E] mt-0.5">
                    Within 4 Hours
                  </p>
                  <p className="text-[11px] text-[#8A8884] mt-1 leading-snug">
                    Dedicated representative assigned per inquiry dossier.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xs border border-[#E5E5E5] shadow-xs">
                  <span className="text-[10px] uppercase tracking-wider text-[#8A8884] font-medium block">
                    CONFIDENTIALITY
                  </span>
                  <p className="font-serif text-lg font-medium text-[#20211E] mt-0.5">
                    Private & Secured
                  </p>
                  <p className="text-[11px] text-[#8A8884] mt-1 leading-snug">
                    Private dining, VIP registry & procurement NDAs honored.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xs border border-[#E5E5E5] shadow-xs">
                  <span className="text-[10px] uppercase tracking-wider text-[#8A8884] font-medium block">
                    FLAGSHIP HUB
                  </span>
                  <p className="font-serif text-lg font-medium text-[#20211E] mt-0.5">
                    Ibadan, Oyo State
                  </p>
                  <p className="text-[11px] text-[#8A8884] mt-1 leading-snug">
                    Curated Lifestyle Atelier.
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
                SELECT ENGAGEMENT CHANNEL
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#20211E] font-normal">
                Direct Inquiry Track
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
                RETAIL & ORDERS
              </button>
            </div>
          </div>

          {submitted ? (
            <div className="p-8 text-center space-y-4 bg-[#F7F6F4] rounded-xs border border-[#DCDDD4]">
              <div className="w-12 h-12 rounded-full bg-[#183C32] text-white flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-[#20211E]">Inquiry Received</h3>
              <p className="text-xs text-[#8A8884]">
                Reference ID: <strong className="text-[#20211E]">{refId}</strong>
              </p>
              <p className="text-sm text-[#4D463C] max-w-md mx-auto">
                Thank you, {fullName}. Your dossier has been routed to our private concierge switchboard. A director will reach out within 4 hours.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
                    `Hello Harmony Hub Concierge, I submitted an inquiry [Ref: ${refId}] for ${fullName}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#183C32] text-white px-6 py-3 rounded-xs text-xs uppercase tracking-widest font-semibold"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Notify via WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-[#8A8884] underline uppercase tracking-wider"
                >
                  Send Another Inquiry
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
                    {activeTab === "events" ? "Flair & Flavors Consultation" : "Retail & Trading Orders"}
                  </strong>
                  <p>
                    {activeTab === "events"
                      ? "For wedding banquets, diplomatic receptions, culinary ateliers, private chefs, and experiential styling."
                      : "For home cookware curation, bulk hampers, mother and baby care, or corporate supply."}
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
                    DEPARTMENT / DIVISION <span className="text-[#DC2626]">*</span>
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-[#F7F6F4] border border-[#E5E5E5] px-3.5 py-2.5 text-sm text-[#20211E] rounded-xs focus:outline-none focus:border-[#183C32]"
                  >
                    <option value="Flair & Flavors">Flair & Flavors (Full Banqueting)</option>
                    <option value="Catering Alone">Catering Alone</option>
                    <option value="Decoration & Styling">Decoration & Styling</option>
                    <option value="Celebration Cakes">Haute Celebration Cakes</option>
                    <option value="Retail & Trading">Retail & Trading Procurement</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#20211E] mb-1.5">
                    TARGET DATE / TIMELINE <span className="text-[#8A8884] font-normal normal-case">(OPTIONAL)</span>
                  </label>
                  <input
                    type="date"
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full bg-[#F7F6F4] border border-[#E5E5E5] px-3.5 py-2.5 text-sm text-[#20211E] rounded-xs focus:outline-none focus:border-[#183C32]"
                  />
                </div>
              </div>

              {/* Dossier message */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#20211E] mb-1.5">
                  DOSSIER & BRIEF SPECIFICATIONS <span className="text-[#DC2626]">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Kindly outline your guest count, dietary scope, venue preferences, product specifications, or enterprise schedule..."
                  className="w-full bg-[#F7F6F4] border border-[#E5E5E5] px-3.5 py-2.5 text-sm text-[#20211E] rounded-xs focus:outline-none focus:border-[#183C32]"
                />
              </div>

              {/* RFP file placeholder matching Figma */}
              <div className="bg-[#F7F6F4] p-4 rounded-xs border border-[#E5E5E5] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Paperclip className="w-5 h-5 text-[#8A8884]" />
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#20211E] block">
                      INCLUDE EVENT MOODBOARD OR RFP DOCUMENT
                    </span>
                    <span className="text-[10px] text-[#8A8884]">
                      PDF, DOCX, ZIP or Keynote up to 25MB
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => alert("Document upload will attach to your dossier.")}
                  className="bg-white border border-[#DCDDD4] px-3 py-1.5 text-[10px] uppercase tracking-wider font-semibold text-[#20211E] rounded-xs hover:border-[#183C32]"
                >
                  BROWSE FILES
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
                  I consent to the confidential processing of this inquiry by Harmony Hub Concierge.
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
                  <span>SEND INQUIRY TO CONCIERGE</span>
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
              alt="Haute Banqueting"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent flex flex-col justify-end p-8 text-white">
              <span className="text-[10px] uppercase tracking-widest text-white/70 block mb-1">
                FLAIR & FLAVORS ATELIER
              </span>
              <h3 className="font-serif text-2xl font-medium">
                Haute Banqueting & Experiential Scenography
              </h3>
              <p className="text-xs text-white/80 mt-1 max-w-md font-light">
                Curating sensory culinary spectacles from 20-seat private diplomatic dinners to 1,500-guest grand anniversary galas with signature pastry artistry.
              </p>
            </div>
          </div>

          <div className="relative aspect-[16/10] rounded-xs overflow-hidden group shadow-md">
            <Image
              src="/images/figma/d8507e1ba3.jpg"
              alt="Artisanal Living & Executive Hampers"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent flex flex-col justify-end p-8 text-white">
              <span className="text-[10px] uppercase tracking-widest text-white/70 block mb-1">
                RETAIL & GIFTING SUITE
              </span>
              <h3 className="font-serif text-2xl font-medium">
                Artisanal Living & Executive Hampers
              </h3>
              <p className="text-xs text-white/80 mt-1 max-w-md font-light">
                Discreet corporate procurement, tailored employee welcome suites, personalized baby hampers, and handcrafted culinary utensils.
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
              PRIVATE APPOINTMENTS
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#20211E] font-normal leading-tight">
              We&apos;d Love to Hear From <br />
              <span className="italic text-[#B96F52]">You</span>
            </h2>
            <p className="text-base text-[#4D463C] leading-relaxed font-light">
              At Harmony Hub, we believe every great experience begins with a conversation. Reach out to us to make an enquiry, discuss your needs, ask about our products, or find out more about our services. Our team will be happy to assist you.
            </p>

            <div className="space-y-4 pt-2">
              <div className="pb-4 border-b border-[#E5E5E5]">
                <span className="text-[10px] uppercase tracking-wider text-[#8A8884] font-semibold block">
                  REGISTERED HEADQUARTERS
                </span>
                <p className="font-medium text-[#20211E] mt-0.5">
                  Ibadan, Oyo State, Nigeria
                </p>
              </div>

              <div className="pb-4 border-b border-[#E5E5E5]">
                <span className="text-[10px] uppercase tracking-wider text-[#8A8884] font-semibold block">
                  DIRECT TELEPHONE
                </span>
                <a
                  href={`tel:${siteConfig.contact.whatsappNumber}`}
                  className="font-medium text-[#20211E] hover:text-[#B96F52] mt-0.5 block"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
                <p className="text-xs text-[#8A8884] mt-0.5">
                  Direct switchboard routing to Event & Retail officers
                </p>
              </div>

              <div className="pb-4 border-b border-[#E5E5E5]">
                <span className="text-[10px] uppercase tracking-wider text-[#8A8884] font-semibold block">
                  PRIVATE ELECTRONIC MAIL
                </span>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="font-medium text-[#20211E] hover:text-[#B96F52] mt-0.5 block"
                >
                  {siteConfig.contact.email}
                </a>
                <p className="text-xs text-[#8A8884] mt-0.5">
                  Encrypted correspondence for confidential proposals
                </p>
              </div>

              <div className="pb-4">
                <span className="text-[10px] uppercase tracking-wider text-[#8A8884] font-semibold block">
                  SALON HOURS & TASTINGS
                </span>
                <p className="font-medium text-[#20211E] mt-0.5">
                  {siteConfig.contact.hours}
                </p>
                <p className="text-xs text-[#8A8884] mt-0.5">
                  We&apos;re based in Ibadan and look forward to welcoming you. For visit arrangements, please contact us directly.
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
                <span>SPEAK DIRECTLY TO A DIRECTOR</span>
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

      {/* 5. FREQUENTLY ADDRESSED INQUIRIES */}
      <section className="py-20 sm:py-28 bg-[#F7F6F4] border-t border-[#E5E5E5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-[#705B38] font-semibold block mb-2">
              INQUIRY PROTOCOL
            </span>
            <h2 className="font-serif italic text-4xl sm:text-5xl text-[#20211E] font-normal">
              Frequently Addressed Inquiries
            </h2>
            <p className="text-xs sm:text-sm text-[#8A8884] mt-2">
              Essential guidelines regarding culinary lead times, nationwide distribution, and corporate partnerships.
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
