"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  Sparkles,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import PreFooterCTA from "@/components/PreFooterCTA";

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<"events" | "retail">("events");

  // Form State
  const [fullName, setFullName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
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
            eventType: activeTab === "events" ? "Flair & Flavors Consultation" : "Retail & Wholesale Procurement",
            locationArea: "Ibadan / Nationwide",
            preferredDate: timeline.trim() || undefined,
            services: [activeTab === "events" ? "Event Consultation" : "Retail Order Inquiry"],
            description: message.trim(),
          },
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setRefId(data.enquiryId || "");
        setSubmitted(true);
      } else {
        alert(data.error || "Failed to submit. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Submission error. Please connect directly via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-24 sm:space-y-32 pb-12">
      {/* 1. HERO SECTION */}
      <section className="bg-[#F7F4EC] pt-12 sm:pt-16 pb-12 border-b border-[#DCDDD4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#B96F52] font-bold">
                PRIVATE CONCIERGE & APPOINTMENTS
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#183C32] leading-tight">
                We Welcome Your{" "}
                <span className="italic text-[#B96F52]">Inquiry.</span>
              </h1>
              <p className="text-base sm:text-lg text-[#4B5563] font-light max-w-xl leading-relaxed">
                Whether you are planning a milestone banquet with Flair & Flavors, seeking bespoke corporate gifting from Retail & Trading, or inquiring about enterprise partnerships, our dedicated concierge team is at your disposal.
              </p>
            </div>

            <div className="lg:col-span-5 relative h-64 sm:h-72 rounded-xs overflow-hidden shadow-md">
              <Image
                src="/images/events/venue-overview.jpg"
                alt="Harmony Hub Event Venue"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* 3 Trust Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-10 mt-8 border-t border-[#DCDDD4]">
            <div className="bg-white p-5 rounded-xs border border-[#DCDDD4]">
              <span className="text-[10px] uppercase tracking-wider text-[#B96F52] font-bold block mb-1">
                RESPONSE ACCORD
              </span>
              <h3 className="font-serif text-lg font-semibold text-[#183C32]">
                Within 4 Hours
              </h3>
              <p className="text-xs text-[#666D65] mt-1">
                Dedicated representative assigned per inquiry dossier.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xs border border-[#DCDDD4]">
              <span className="text-[10px] uppercase tracking-wider text-[#B96F52] font-bold block mb-1">
                CONFIDENTIALITY
              </span>
              <h3 className="font-serif text-lg font-semibold text-[#183C32]">
                Private & Secured
              </h3>
              <p className="text-xs text-[#666D65] mt-1">
                Private dining, VIP registry & procurement NDAs honored.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xs border border-[#DCDDD4]">
              <span className="text-[10px] uppercase tracking-wider text-[#B96F52] font-bold block mb-1">
                FLAGSHIP HUB
              </span>
              <h3 className="font-serif text-lg font-semibold text-[#183C32]">
                Ibadan, Oyo State
              </h3>
              <p className="text-xs text-[#666D65] mt-1">
                Curated Lifestyle Atelier & Celebration Studio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DIRECT INQUIRY TRACK & FORM */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-xs border border-[#DCDDD4] p-8 sm:p-12 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DCDDD4] pb-6">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#B96F52] font-bold block mb-1">
                SELECT ENGAGEMENT CHANNEL
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#183C32]">
                Direct Inquiry Track
              </h2>
            </div>

            <div className="inline-flex p-1 bg-[#F7F4EC] border border-[#DCDDD4] rounded-xs text-xs font-semibold uppercase tracking-wider">
              <button
                type="button"
                onClick={() => setActiveTab("events")}
                className={`px-4 py-2 rounded-xs transition ${
                  activeTab === "events"
                    ? "bg-[#183C32] text-white"
                    : "text-[#666D65] hover:text-[#183C32]"
                }`}
              >
                Flair & Flavors (Events)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("retail")}
                className={`px-4 py-2 rounded-xs transition ${
                  activeTab === "retail"
                    ? "bg-[#183C32] text-white"
                    : "text-[#666D65] hover:text-[#183C32]"
                }`}
              >
                Retail & Orders
              </button>
            </div>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl text-[#183C32]">
                Inquiry Successfully Logged
              </h3>
              {refId && (
                <p className="text-xs font-mono text-[#666D65]">
                  Dossier Ref: <span className="font-bold text-[#183C32]">#{refId}</span>
                </p>
              )}
              <p className="text-sm text-[#4B5563] max-w-md mx-auto leading-relaxed">
                Thank you, {fullName}. Your inquiry has been forwarded to Harmony Hub&apos;s executive concierge. We will contact you via {telephone} shortly.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-[#183C32] text-white px-6 py-2.5 rounded-xs text-xs uppercase tracking-wider font-semibold"
                >
                  Send Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-[#F7F4EC] p-4 rounded-xs border border-[#DCDDD4] text-xs text-[#4B5563]">
                {activeTab === "events" ? (
                  <p>
                    <strong className="text-[#183C32]">Flair & Flavors Consultation:</strong> For wedding banquets, diplomatic receptions, culinary ateliers, and experiential styling.
                  </p>
                ) : (
                  <p>
                    <strong className="text-[#183C32]">Retail & Trading Orders:</strong> For home cookware curation, bulk hampers, mother and baby care, or corporate supply.
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    className="w-full bg-[#F7F4EC] border border-[#D1C7B7] px-3.5 py-2.5 text-sm text-[#183C32] rounded-xs focus:outline-none focus:border-[#183C32]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#183C32] mb-1.5">
                    Corporate / Organization <span className="text-[#666D65] font-normal normal-case">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. Althorne Holdings"
                    className="w-full bg-[#F7F4EC] border border-[#D1C7B7] px-3.5 py-2.5 text-sm text-[#183C32] rounded-xs focus:outline-none focus:border-[#183C32]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#183C32] mb-1.5">
                    Email Address <span className="text-[#666D65] font-normal normal-case">(optional)</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="adebayo@company.ng"
                    className="w-full bg-[#F7F4EC] border border-[#D1C7B7] px-3.5 py-2.5 text-sm text-[#183C32] rounded-xs focus:outline-none focus:border-[#183C32]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#183C32] mb-1.5">
                    Direct Telephone <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    placeholder="+234 801 234 5678"
                    className="w-full bg-[#F7F4EC] border border-[#D1C7B7] px-3.5 py-2.5 text-sm text-[#183C32] rounded-xs focus:outline-none focus:border-[#183C32]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#183C32] mb-1.5">
                  Target Date / Timeline <span className="text-[#666D65] font-normal normal-case">(optional)</span>
                </label>
                <input
                  type="date"
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full bg-[#F7F4EC] border border-[#D1C7B7] px-3.5 py-2.5 text-sm text-[#183C32] rounded-xs focus:outline-none focus:border-[#183C32]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#183C32] mb-1.5">
                  Dossier & Brief Specifications <span className="text-[#DC2626]">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Kindly outline your guest count, dietary scope, venue preferences, product specifications, or enterprise schedule..."
                  className="w-full bg-[#F7F4EC] border border-[#D1C7B7] px-3.5 py-2.5 text-sm text-[#183C32] rounded-xs focus:outline-none focus:border-[#183C32]"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="consent"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="rounded-xs text-[#183C32] focus:ring-0"
                />
                <label htmlFor="consent" className="text-xs text-[#666D65] cursor-pointer">
                  I consent to the confidential processing of this inquiry by Harmony Hub Concierge.
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#183C32] hover:bg-[#B96F52] text-white px-8 py-3.5 rounded-xs text-xs uppercase tracking-widest font-semibold transition shadow-sm disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Dossier...</span>
                  </>
                ) : (
                  <span>Send Inquiry to Concierge</span>
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 3. CONTACT CHANNELS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#B96F52] font-bold">
              PRIVATE APPOINTMENTS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#183C32] leading-tight">
              We&apos;d Love to Hear From You
            </h2>
            <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
              At Harmony Hub, we believe every great experience begins with a conversation. Reach out to us to make an enquiry, discuss your needs, ask about our products, or find out more about our services. Our team will be happy to assist you.
            </p>

            <div className="bg-white p-6 rounded-xs border border-[#DCDDD4] space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#B96F52] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#666D65] font-semibold block">
                    Registered Headquarters
                  </span>
                  <p className="font-medium text-[#183C32]">
                    {siteConfig.contact.locationDisplay}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-[#EEF1E9]">
                <Phone className="w-5 h-5 text-[#B96F52] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#666D65] font-semibold block">
                    Direct Telephone & Concierge
                  </span>
                  <a
                    href={`tel:${siteConfig.contact.whatsappNumber}`}
                    className="font-medium text-[#183C32] hover:text-[#B96F52]"
                  >
                    {siteConfig.contact.phoneDisplay}
                  </a>
                  <p className="text-xs text-[#666D65]">
                    Direct switchboard routing to Event & Retail officers
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-[#EEF1E9]">
                <Mail className="w-5 h-5 text-[#B96F52] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#666D65] font-semibold block">
                    Private Electronic Mail
                  </span>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="font-medium text-[#183C32] hover:text-[#B96F52]"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-[#EEF1E9]">
                <Clock className="w-5 h-5 text-[#B96F52] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#666D65] font-semibold block">
                    Salon Hours & Tastings
                  </span>
                  <p className="font-medium text-[#183C32]">
                    {siteConfig.contact.hours}
                  </p>
                  <p className="text-xs text-[#666D65]">
                    We&apos;re based in Ibadan and look forward to welcoming you. For visit arrangements, please contact us directly.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#183C32] hover:bg-[#B96F52] text-white px-8 py-3.5 rounded-xs text-xs uppercase tracking-widest font-semibold transition shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Speak Directly to a Director</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 relative h-80 sm:h-96 rounded-xs overflow-hidden shadow-md">
            <Image
              src="/images/events/white-wedding.jpg"
              alt="Floral styling in Ibadan"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 4. PRE-FOOTER CTA */}
      <PreFooterCTA />
    </div>
  );
}
