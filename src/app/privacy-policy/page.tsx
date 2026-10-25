import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Shield, Lock, FileText, ChevronRight, Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — Harmony Hub",
  description:
    "Learn how Harmony Hub collects, uses, and protects your personal information when you browse our website, place orders, or make event enquiries.",
};

const SECTIONS = [
  { id: "introduction", title: "1. Introduction" },
  { id: "information-we-collect", title: "2. Information We Collect" },
  { id: "order-enquiry-information", title: "3. Information Provided During Orders & Enquiries" },
  { id: "how-we-use-information", title: "4. How We Use Personal Information" },
  { id: "orders-and-delivery", title: "5. Orders, Delivery & Customer Communications" },
  { id: "whatsapp-communications", title: "6. WhatsApp Communications" },
  { id: "cookies-and-storage", title: "7. Cookies & Local Storage Technologies" },
  { id: "third-party-services", title: "8. Third-Party Services & Infrastructure" },
  { id: "security-and-retention", title: "9. Data Storage, Security & Retention" },
  { id: "information-sharing", title: "10. When Information May Be Shared" },
  { id: "privacy-rights", title: "11. Customer Privacy Rights (NDPA 2023)" },
  { id: "policy-updates", title: "12. Updates to This Privacy Policy" },
  { id: "contact-information", title: "13. Contact Information for Privacy Enquiries" },
];

export default function PrivacyPolicyPage() {
  const lastUpdated = "October 25, 2026";

  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner */}
      <section className="bg-[#FAF9F6] border-b border-[#E5E5E5] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-[1px] bg-[#B96F52]" />
              <span className="text-xs uppercase tracking-widest text-[#B96F52] font-semibold">
                LEGAL & DATA PRIVACY
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#20211E] font-normal leading-tight">
              Privacy Policy
            </h1>
            <p className="text-sm sm:text-base text-[#666D65] leading-relaxed">
              At Harmony Hub, your privacy and trust are paramount. This policy clearly outlines what personal information we collect, why we collect it, how it is handled, and your rights under applicable Nigerian data protection law.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#8A8884]">
              <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xs border border-[#E5E5E5]">
                <Shield className="w-3.5 h-3.5 text-[#183C32]" />
                Effective Date: {lastUpdated}
              </span>
              <span>•</span>
              <span>Jurisdiction: Federal Republic of Nigeria</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout with Sticky Navigation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Table of Contents Sidebar */}
          <aside className="lg:col-span-4 sticky top-28 hidden lg:block">
            <div className="bg-[#F7F6F4] p-6 rounded-xs border border-[#E5E5E5] space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#E5E5E5]">
                <FileText className="w-4 h-4 text-[#B96F52]" />
                <h2 className="text-xs uppercase tracking-wider font-bold text-[#20211E]">
                  Contents & Navigation
                </h2>
              </div>
              <nav className="space-y-1.5 text-xs">
                {SECTIONS.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="block py-1.5 text-[#666D65] hover:text-[#183C32] hover:font-medium transition line-clamp-1"
                  >
                    {sec.title}
                  </a>
                ))}
              </nav>

              <div className="pt-4 border-t border-[#E5E5E5] text-[11px] text-[#8A8884] space-y-1">
                <p>Need immediate clarification?</p>
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#183C32] font-semibold hover:underline"
                >
                  Message Concierge Desk <ChevronRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </aside>

          {/* Right Policy Content */}
          <div className="lg:col-span-8 space-y-14 text-[#20211E]">
            {/* Section 1 */}
            <section id="introduction" className="space-y-4 scroll-mt-28">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#20211E] font-normal border-b border-[#E5E5E5] pb-3">
                1. Introduction
              </h2>
              <div className="text-[15px] sm:text-base text-[#4D463C] leading-relaxed space-y-3 font-light">
                <p>
                  Harmony Hub (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) operates the website{" "}
                  <strong>harmony-hub-six-theta.vercel.app</strong> and provides bespoke event management, catering, floral and decor styling, celebration confections through our <strong>Flair &amp; Flavors</strong> atelier, and curated cookware, fashion, and living essentials through our <strong>Retail &amp; Trading</strong> suite.
                </p>
                <p>
                  We are committed to processing your personal data lawfully, fairly, and transparently, in alignment with the provisions of the <strong>Nigeria Data Protection Act 2023 (NDPA 2023)</strong> and applicable consumer protection standards. This Privacy Policy informs you about how we handle personal data when you visit our website, submit event enquiries, build a shopping bag, or communicate with our concierge team.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section id="information-we-collect" className="space-y-4 scroll-mt-28">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#20211E] font-normal border-b border-[#E5E5E5] pb-3">
                2. Information We Collect
              </h2>
              <div className="text-[15px] sm:text-base text-[#4D463C] leading-relaxed space-y-3 font-light">
                <p>
                  We believe in quiet luxury and data minimization: we only collect personal information that is strictly necessary to deliver exceptional customer service, arrange courier deliveries, or coordinate bespoke event commissions.
                </p>
                <p>We do not collect unnecessary personal details, nor do we purchase or profile customer data from commercial data brokers.</p>
              </div>
            </section>

            {/* Section 3 */}
            <section id="order-enquiry-information" className="space-y-4 scroll-mt-28">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#20211E] font-normal border-b border-[#E5E5E5] pb-3">
                3. Information Customers Provide When Placing Orders or Making Enquiries
              </h2>
              <div className="text-[15px] sm:text-base text-[#4D463C] leading-relaxed space-y-3 font-light">
                <p>When you interact with our forms or request assistance, you may provide:</p>
                <ul className="list-disc pl-6 space-y-2 text-[#4D463C]">
                  <li>
                    <strong>Product Orders:</strong> Full name, telephone number (for call and WhatsApp dispatch updates), physical delivery address, city, state, delivery preference (Ibadan courier, Lagos courier, or nationwide delivery), and any specific order or colour notes.
                  </li>
                  <li>
                    <strong>Event Enquiries &amp; Consultations:</strong> Full name, email address, telephone number, celebration or event category, estimated guest count, planned event date, proposed venue city/location, service tier requirements (catering, decor, planning, furniture, or cakes), and personal vision details.
                  </li>
                  <li>
                    <strong>Direct Inquiries:</strong> Any correspondence, questions, or product inquiries sent via email or WhatsApp to our direct switchboard.
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 4 */}
            <section id="how-we-use-information" className="space-y-4 scroll-mt-28">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#20211E] font-normal border-b border-[#E5E5E5] pb-3">
                4. How We Use Personal Information
              </h2>
              <div className="text-[15px] sm:text-base text-[#4D463C] leading-relaxed space-y-3 font-light">
                <p>We use your personal information strictly for legitimate commercial and customer care purposes:</p>
                <ul className="list-disc pl-6 space-y-2 text-[#4D463C]">
                  <li>To process, assemble, and dispatch retail product orders to your designated address.</li>
                  <li>To verify stock availability, confirm product colour variations, and communicate exact dispatch logistics.</li>
                  <li>To review event dossiers, assess calendar availability for Flair &amp; Flavors commissions, and formulate tailored proposals.</li>
                  <li>To send internal email notifications to our operations team to prevent unaddressed customer requests.</li>
                  <li>To respond promptly to customer questions, feedback, or post-delivery product assistance.</li>
                </ul>
              </div>
            </section>

            {/* Section 5 */}
            <section id="orders-and-delivery" className="space-y-4 scroll-mt-28">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#20211E] font-normal border-b border-[#E5E5E5] pb-3">
                5. Orders, Delivery Information, and Customer Communications
              </h2>
              <div className="text-[15px] sm:text-base text-[#4D463C] leading-relaxed space-y-3 font-light">
                <p>
                  To deliver your purchased goods safely, your recipient name, destination address, and telephone number are shared with verified white-glove courier partners operating within Ibadan, Lagos, or inter-state haulage. Couriers are instructed to use this information solely for transit delivery and customer arrival contact.
                </p>
                <div className="bg-[#F7F6F4] p-5 rounded-xs border-l-4 border-[#B96F52] text-sm text-[#4D463C] space-y-1">
                  <p className="font-medium text-[#20211E]">Delivery Notification Protocol</p>
                  <p className="font-light">
                    Couriers will contact you directly via phone call or SMS upon arrival at your specified delivery address. Please ensure an authorized recipient is available to inspect the consignment.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section id="whatsapp-communications" className="space-y-4 scroll-mt-28">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#20211E] font-normal border-b border-[#E5E5E5] pb-3">
                6. WhatsApp Communications When Continuing an Order Through WhatsApp
              </h2>
              <div className="text-[15px] sm:text-base text-[#4D463C] leading-relaxed space-y-3 font-light">
                <p>
                  Harmony Hub integrates direct WhatsApp click-to-chat capabilities to provide personal, conversational customer care. When you tap <em>&ldquo;Continue to WhatsApp&rdquo;</em> from our checkout or enquiry forms, our website pre-populates a structured message with your requested items, delivery address, or event details.
                </p>
                <p>
                  Once you transition to WhatsApp, your communication is transmitted through WhatsApp (operated by Meta Platforms, Inc.) and is subject to WhatsApp&rsquo;s own Terms of Service and Privacy Policy, including their end-to-end encryption standards. Harmony Hub only retains the chat history within our verified business switchboard for the duration necessary to fulfill your order and provide warranty or customer support.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section id="cookies-and-storage" className="space-y-4 scroll-mt-28">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#20211E] font-normal border-b border-[#E5E5E5] pb-3">
                7. Cookies and Similar Technologies
              </h2>
              <div className="text-[15px] sm:text-base text-[#4D463C] leading-relaxed space-y-3 font-light">
                <p>
                  We respect your digital environment. <strong>Harmony Hub does not use invasive third-party tracking cookies, behavioural advertising pixels, or cross-site tracking scripts.</strong>
                </p>
                <p>Our website utilizes strictly functional browser storage mechanisms:</p>
                <ul className="list-disc pl-6 space-y-2 text-[#4D463C]">
                  <li>
                    <strong>Local Storage (<code>harmony_hub_cart</code>):</strong> We store your active shopping bag items and selected product colours locally in your own browser so that your selections are preserved while you browse between pages. This information stays on your device and is not sent to external advertising networks.
                  </li>
                  <li>
                    <strong>Essential Session State:</strong> Standard technical headers and server session cookies necessary for website security, routing, and reliable load performance.
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 8 */}
            <section id="third-party-services" className="space-y-4 scroll-mt-28">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#20211E] font-normal border-b border-[#E5E5E5] pb-3">
                8. Third-Party Services and Service Providers
              </h2>
              <div className="text-[15px] sm:text-base text-[#4D463C] leading-relaxed space-y-3 font-light">
                <p>To deliver a fast, reliable website experience, we engage reputable technical providers:</p>
                <ul className="list-disc pl-6 space-y-2 text-[#4D463C]">
                  <li>
                    <strong>Vercel, Inc.:</strong> Our web hosting infrastructure provider. Vercel processes server requests and static assets securely at the network edge.
                  </li>
                  <li>
                    <strong>Nodemailer / Email Dispatch:</strong> Serverless endpoints dispatch order and consultation notification alerts directly to our official business inbox (<code>{siteConfig.contact.email}</code>).
                  </li>
                  <li>
                    <strong>WhatsApp (Meta Platforms):</strong> Enables direct click-to-chat messaging between you and our concierge team.
                  </li>
                </ul>
                <p>We do not sell, rent, or trade your personal information to third parties for commercial marketing.</p>
              </div>
            </section>

            {/* Section 9 */}
            <section id="security-and-retention" className="space-y-4 scroll-mt-28">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#20211E] font-normal border-b border-[#E5E5E5] pb-3">
                9. Data Storage, Security, and Retention
              </h2>
              <div className="text-[15px] sm:text-base text-[#4D463C] leading-relaxed space-y-3 font-light">
                <p>
                  We maintain industry-standard physical, electronic, and organizational safeguards to protect customer data from unauthorized access, accidental alteration, disclosure, or destruction. All web traffic is strictly encrypted using Transport Layer Security (HTTPS/TLS).
                </p>
                <p>
                  We retain personal order and consultation records only as long as necessary to complete fulfilment, resolve warranty questions, satisfy statutory accounting requirements in Nigeria, or fulfill legitimate commercial needs. When data is no longer needed, it is deleted or anonymized securely.
                </p>
              </div>
            </section>

            {/* Section 10 */}
            <section id="information-sharing" className="space-y-4 scroll-mt-28">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#20211E] font-normal border-b border-[#E5E5E5] pb-3">
                10. When Information May Be Shared
              </h2>
              <div className="text-[15px] sm:text-base text-[#4D463C] leading-relaxed space-y-3 font-light">
                <p>Your information will only be shared in the following limited circumstances:</p>
                <ul className="list-disc pl-6 space-y-2 text-[#4D463C]">
                  <li>With trusted courier dispatch partners strictly to transport and hand over your ordered products.</li>
                  <li>With key culinary and floral specialists within our team where essential to coordinate your booked banquet.</li>
                  <li>When required by enforceable legal process, court subpoena, or authorized statutory body under Nigerian law.</li>
                  <li>To protect the safety, rights, and property of Harmony Hub, our clients, or the general public against fraud or security threats.</li>
                </ul>
              </div>
            </section>

            {/* Section 11 */}
            <section id="privacy-rights" className="space-y-4 scroll-mt-28">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#20211E] font-normal border-b border-[#E5E5E5] pb-3">
                11. Customer Privacy Rights (NDPA 2023)
              </h2>
              <div className="text-[15px] sm:text-base text-[#4D463C] leading-relaxed space-y-3 font-light">
                <p>
                  In accordance with the <strong>Nigeria Data Protection Act 2023</strong>, you have rights regarding your personal information, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[#4D463C]">
                  <li><strong>Right of Access:</strong> You may request confirmation of whether we hold personal data concerning you and obtain a copy.</li>
                  <li><strong>Right to Rectification:</strong> You may request the correction of inaccurate or incomplete personal records.</li>
                  <li><strong>Right to Erasure:</strong> You may request the deletion of your personal data where there is no legal requirement for retention.</li>
                  <li><strong>Right to Object:</strong> You have the right to object at any time to the processing of your data for direct communication.</li>
                </ul>
                <p>To exercise any of these rights, contact us directly via the verified contact channels below.</p>
              </div>
            </section>

            {/* Section 12 */}
            <section id="policy-updates" className="space-y-4 scroll-mt-28">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#20211E] font-normal border-b border-[#E5E5E5] pb-3">
                12. Updates to This Privacy Policy
              </h2>
              <div className="text-[15px] sm:text-base text-[#4D463C] leading-relaxed space-y-3 font-light">
                <p>
                  We may periodically review and update this Privacy Policy to reflect enhancements in our operational practices, new statutory regulations, or updated website functionality.
                </p>
                <p>
                  Any revisions will be posted directly to this page with an updated &ldquo;Effective Date&rdquo;. We encourage visitors to review this page periodically to stay informed about our data stewardship.
                </p>
              </div>
            </section>

            {/* Section 13 */}
            <section id="contact-information" className="space-y-4 scroll-mt-28">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#20211E] font-normal border-b border-[#E5E5E5] pb-3">
                13. Contact Information for Privacy Enquiries
              </h2>
              <div className="text-[15px] sm:text-base text-[#4D463C] leading-relaxed space-y-4 font-light">
                <p>If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact our concierge desk directly:</p>

                <div className="bg-[#FAF9F6] p-6 rounded-xs border border-[#E5E5E5] space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#B96F52] shrink-0 mt-1" />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#8A8884] font-semibold">Registered Headquarters</p>
                      <p className="text-sm font-medium text-[#20211E]">Harmony Hub — {siteConfig.contact.locationDisplay}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-2 border-t border-[#E5E5E5]">
                    <Phone className="w-4 h-4 text-[#B96F52] shrink-0 mt-1" />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#8A8884] font-semibold">Telephone &amp; WhatsApp Switchboard</p>
                      <a
                        href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}
                        className="text-sm font-medium text-[#183C32] hover:underline"
                      >
                        {siteConfig.contact.phoneDisplay}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-2 border-t border-[#E5E5E5]">
                    <Mail className="w-4 h-4 text-[#B96F52] shrink-0 mt-1" />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#8A8884] font-semibold">Electronic Mail</p>
                      <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="text-sm font-medium text-[#B96F52] hover:underline"
                      >
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-4">
                  <Link
                    href="/terms-of-use"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#183C32] hover:text-[#B96F52] underline underline-offset-4"
                  >
                    View Terms of Use →
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#666D65] hover:text-[#183C32]"
                  >
                    Contact Concierge Desk
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
