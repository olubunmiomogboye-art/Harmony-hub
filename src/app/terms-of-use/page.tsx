import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Shield, FileCheck, AlertCircle, Clock, ChevronRight, Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Use — Harmony Hub",
  description:
    "Review the terms, conditions, ordering protocols, advance notice expectations, and inspection policies governing Harmony Hub and Flair & Flavors services.",
};

const SECTIONS = [
  { id: "introduction", title: "1. Introduction & Acceptance" },
  { id: "about-harmony-hub", title: "2. About Harmony Hub & Service Divisions" },
  { id: "products-and-pricing", title: "3. Product Descriptions, Availability & Pricing" },
  { id: "placing-orders", title: "4. Placing Orders & Order Confirmation" },
  { id: "colours-and-variations", title: "5. Product Colours & Natural Variations" },
  { id: "delivery-arrangements", title: "6. Delivery Arrangements & Customer Obligations" },
  { id: "inspection-obligation", title: "7. Mandatory Inspection of Delivered Products" },
  { id: "refund-policy", title: "8. No-Refund Policy & Damaged/Incorrect Items" },
  { id: "event-bookings", title: "9. Event Planning & Decoration (3–6 Months Notice)" },
  { id: "cake-orders", title: "10. Celebration Cakes & Time-Sensitive Orders (3–4 Weeks Notice)" },
  { id: "appointments-consultations", title: "11. Appointments & Consultations" },
  { id: "cancellations-deposits", title: "12. Cancellations, Rescheduling & Booking Payments" },
  { id: "acceptable-use", title: "13. Customer Responsibilities & Acceptable Use" },
  { id: "intellectual-property", title: "14. Intellectual Property & Brand Content" },
  { id: "third-party-platforms", title: "15. Third-Party Platforms & WhatsApp Usage" },
  { id: "limitation-of-liability", title: "16. Limitation of Liability" },
  { id: "changes-to-terms", title: "17. Changes to These Terms" },
  { id: "contact-complaints", title: "18. Contact Information for Questions & Complaints" },
];

export default function TermsOfUsePage() {
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
                LEGAL AGREEMENT & GUIDELINES
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#20211E] font-normal leading-tight">
              Terms of Use
            </h1>
            <p className="text-sm sm:text-base text-[#666D65] leading-relaxed">
              These Terms of Use govern your access to our website, retail purchases, event commissions, and communication with Harmony Hub. Please read them carefully before browsing or placing an order.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#8A8884]">
              <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xs border border-[#E5E5E5]">
                <FileCheck className="w-3.5 h-3.5 text-[#183C32]" />
                Effective Date: {lastUpdated}
              </span>
              <span>•</span>
              <span>Governing Law: Federal Republic of Nigeria</span>
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
                <Shield className="w-4 h-4 text-[#B96F52]" />
                <h2 className="text-xs uppercase tracking-wider font-bold text-[#20211E]">
                  Terms Navigation
                </h2>
              </div>
              <nav className="space-y-1.5 text-xs max-h-[60vh] overflow-y-auto pr-1">
                {SECTIONS.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="block py-1 text-[#666D65] hover:text-[#183C32] hover:font-medium transition line-clamp-1"
                  >
                    {sec.title}
                  </a>
                ))}
              </nav>

              <div className="pt-4 border-t border-[#E5E5E5] text-[11px] text-[#8A8884] space-y-1">
                <p>Have a question regarding our terms?</p>
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#183C32] font-semibold hover:underline"
                >
                  Contact Concierge Switchboard <ChevronRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </aside>

          {/* Right Terms Content */}
          <div className="lg:col-span-8 space-y-14 text-[#20211E]">
            {/* Section 1 */}
            <section id="introduction" className="space-y-4 scroll-mt-28">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#20211E] font-normal border-b border-[#E5E5E5] pb-3">
                1. Introduction and Acceptance of the Terms
              </h2>
              <div className="text-[15px] sm:text-base text-[#4D463C] leading-relaxed space-y-3 font-light">
                <p>
                  Welcome to <strong>Harmony Hub</strong>. By visiting our website, submitting an order dossier, inquiring about banquet catering or decor styling, or booking services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use and our accompanying Privacy Policy.
                </p>
                <p>
                  If you do not agree with any portion of these terms, please refrain from using the website or engaging our services.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section id="about-harmony-hub" className="space-y-4 scroll-mt-28">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#20211E] font-normal border-b border-[#E5E5E5] pb-3">
                2. About Harmony Hub and Its Product &amp; Service Categories
              </h2>
              <div className="text-[15px] sm:text-base text-[#4D463C] leading-relaxed space-y-3 font-light">
                <p>Harmony Hub is based in Ibadan, Oyo State, Nigeria, and operates two primary divisions:</p>
                <ul className="list-disc pl-6 space-y-2 text-[#4D463C]">
                  <li>
                    <strong>Flair &amp; Flavors:</strong> Curating full-scale event management, royal banquet catering, venue scenography and floral styling, luxury furniture hire, and bespoke celebratory confections.
                  </li>
                  <li>
                    <strong>Retail &amp; Trading:</strong> Offering chef-grade non-stick cookware and utensils, mother and baby care formulations, curated leather goods, structured dresses, and children&rsquo;s apparel.
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section id="products-and-pricing" className="space-y-4 scroll-mt-28">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#20211E] font-normal border-b border-[#E5E5E5] pb-3">
                3. Product Descriptions, Images, Availability, and Pricing
              </h2>
              <div className="text-[15px] sm:text-base text-[#4D463C] leading-relaxed space-y-3 font-light">
                <p>
                  We make every effort to display the specifications, compositions, and prices of our products as accurately as possible. However:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[#4D463C]">
                  <li>All prices are quoted in Nigerian Naira (NGN) and are subject to verification before dispatch.</li>
                  <li>Product availability is subject to physical inventory. If an ordered item is out of stock, our team will inform you promptly and offer a suitable alternative or cancellation.</li>
                  <li>We reserve the right to correct any typographical errors, inaccuracies, or omissions regarding product details or pricing without prior notice.</li>
                </ul>
              </div>
            </section>

            {/* Section 4 */}
            <section id="placing-orders" className="space-y-4 scroll-mt-28">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#20211E] font-normal border-b border-[#E5E5E5] pb-3">
                4. Placing Orders and Order Confirmation
              </h2>
              <div className="text-[15px] sm:text-base text-[#4D463C] leading-relaxed space-y-3 font-light">
                <p>
                  When you complete our online checkout, the website prepares an order summary and facilitates a direct connection with our concierge switchboard on WhatsApp.
                </p>
                <p>
                  <strong>Important:</strong> Submitting an order on the website does not constitute a completed sale or binding contract. An order is formally confirmed only when our team verifies product stock, confirms any colour preferences, verifies delivery dispatch fees, and receives payment confirmation through our approved business accounts.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section id="colours-and-variations" className="space-y-4 scroll-mt-28">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#20211E] font-normal border-b border-[#E5E5E5] pb-3">
                5. Product Colours and Variations
              </h2>
              <div className="text-[15px] sm:text-base text-[#4D463C] leading-relaxed space-y-3 font-light">
                <p>
                  Certain products offer multiple colour options (e.g. cookware sets, leather handbags, children&rsquo;s garments). Where colour options exist, customers must select their preferred colour during ordering.
                </p>
                <p>
                  While we strive to display colours accurately, actual colours may vary slightly due to individual device display calibrations, screen brightness, and studio photography lighting. Subtle natural variations in handcrafted leather, textile dye lots, or artisanal finishes are normal and inherent to authentic production.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section id="delivery-arrangements" className="space-y-4 scroll-mt-28">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#20211E] font-normal border-b border-[#E5E5E5] pb-3">
                6. Delivery Arrangements and Customer Responsibilities
              </h2>
              <div className="text-[15px] sm:text-base text-[#4D463C] leading-relaxed space-y-3 font-light">
                <p>
                  We coordinate direct dispatch across Ibadan, Lagos State, and nationwide through verified courier partners:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[#4D463C]">
                  <li><strong>Delivery Fees:</strong> Courier fees depend on your delivery location and parcel weight. These are confirmed with you directly prior to dispatch and are payable as agreed.</li>
                  <li><strong>Customer Responsibilities:</strong> You are responsible for providing complete, accurate delivery coordinates, landmarks, and a reachable telephone number.</li>
                  <li><strong>Recipient Availability:</strong> You or an authorized adult representative must be physically present at the delivery location to receive and inspect the consignment.</li>
                </ul>
              </div>
            </section>

            {/* Section 7 - Mandatory Inspection */}
            <section id="inspection-obligation" className="space-y-4 scroll-mt-28">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#20211E] font-normal border-b border-[#E5E5E5] pb-3">
                7. Mandatory Inspection of Delivered Products
              </h2>
              <div className="text-[15px] sm:text-base text-[#4D463C] leading-relaxed space-y-4 font-light">
                <p>
                  Because we take pride in pristine presentation and quality, <strong>customers are strictly required to inspect all delivered goods immediately upon arrival</strong> in the presence of the courier dispatch personnel.
                </p>

                <div className="bg-[#FAF9F6] p-6 rounded-xs border-l-4 border-[#183C32] space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#183C32]" />
                    <h3 className="font-serif text-lg font-medium text-[#20211E]">The Delivery Inspection Accord</h3>
                  </div>
                  <p className="text-sm text-[#4D463C] leading-relaxed font-light">
                    Check that the outer package is intact, the product matches the ordered item and colour, and that no visible physical transit defects or omissions are present. Once an item is inspected and accepted, delivery is formally acknowledged as successfully fulfilled in good condition.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 8 - Clear No-Refund Policy */}
            <section id="refund-policy" className="space-y-4 scroll-mt-28">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#20211E] font-normal border-b border-[#E5E5E5] pb-3">
                8. Returns, Refunds, and Damaged or Incorrect Items
              </h2>
              <div className="text-[15px] sm:text-base text-[#4D463C] leading-relaxed space-y-4 font-light">
                <div className="bg-[#F7F4EC] p-6 rounded-xs border-l-4 border-[#B96F52] space-y-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-[#B96F52]" />
                    <h3 className="font-serif text-lg font-medium text-[#20211E]">No-Refund Policy</h3>
                  </div>
                  <p className="text-sm text-[#4D463C] leading-relaxed font-light">
                    <strong>Harmony Hub does not offer refunds for products that have been delivered in good condition and inspected by the customer.</strong> Because our items include sensitive cookware alloys, baby hygiene formulations, and personal wearable items, sales of accepted, defect-free items are final.
                  </p>
                </div>

                <p>
                  <strong>Exceptions &amp; Damaged / Incorrect Items:</strong> Our no-refund policy is exercised fairly and does not limit your statutory rights under applicable Nigerian consumer protection legislation, including the Federal Competition and Consumer Protection Act 2018.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[#4D463C]">
                  <li>If an item is damaged during transit, defective upon arrival, or different from what was ordered, you must notify our concierge desk <strong>promptly within 24 hours of delivery</strong>.</li>
                  <li>Please retain all original packaging and provide clear photographs or video evidence showing the defect or discrepancy.</li>
                  <li>Harmony Hub will promptly review the complaint and address it in accordance with applicable law and the circumstances—including providing a replacement or appropriate remediation where a genuine defect or error is verified.</li>
                </ul>
              </div>
            </section>

            {/* Section 9 - Advance Notice: Event Bookings */}
            <section id="event-bookings" className="space-y-4 scroll-mt-28">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#20211E] font-normal border-b border-[#E5E5E5] pb-3">
                9. Event Decoration and Event Planning Bookings (3–6 Months Notice)
              </h2>
              <div className="text-[15px] sm:text-base text-[#4D463C] leading-relaxed space-y-4 font-light">
                <div className="bg-[#FAF9F6] p-6 rounded-xs border-l-4 border-[#183C32] space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#183C32]" />
                    <h3 className="font-serif text-lg font-medium text-[#20211E]">Advance Notice Expectation: 3 to 6 Months</h3>
                  </div>
                  <p className="text-sm text-[#4D463C] leading-relaxed font-light">
                    For full event management, bespoke floral scenography, and comprehensive banquet decoration, customers are advised to contact Harmony Hub approximately <strong>3 to 6 months before the event date</strong>.
                  </p>
                </div>

                <p>
                  Advance notice is essential to allow our creative directors and logistical coordinators sufficient time for conceptualization, floral importing, custom fabrication, and diary reservations.
                </p>
                <p>
                  <strong>Non-Automatic Booking:</strong> Submitting an event enquiry form on this website does not secure a booking or reserve an event date. An event booking is confirmed only when our team reviews calendar availability, issues a formal commission agreement, and receives the agreed commitment payment.
                </p>
              </div>
            </section>

            {/* Section 10 - Advance Notice: Birthday Cakes */}
            <section id="cake-orders" className="space-y-4 scroll-mt-28">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#20211E] font-normal border-b border-[#E5E5E5] pb-3">
                10. Cake Orders and Time-Sensitive Requests (3–4 Weeks Notice)
              </h2>
              <div className="text-[15px] sm:text-base text-[#4D463C] leading-relaxed space-y-4 font-light">
                <div className="bg-[#FAF9F6] p-6 rounded-xs border-l-4 border-[#B96F52] space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#B96F52]" />
                    <h3 className="font-serif text-lg font-medium text-[#20211E]">Advance Notice Expectation: 3 to 4 Weeks</h3>
                  </div>
                  <p className="text-sm text-[#4D463C] leading-relaxed font-light">
                    For custom birthday cakes, wedding centrepieces, and delicate celebration confections, customers should provide approximately <strong>3 to 4 weeks&rsquo; advance notice</strong>.
                  </p>
                </div>

                <p>
                  Because our celebration cakes are bespoke culinary commissions crafted by our patisserie team, baking and design slots are strictly limited per weekend. Availability and theme specifications must be confirmed directly with Harmony Hub.
                </p>
              </div>
            </section>

            {/* Section 11 - Appointments & Consultations */}
            <section id="appointments-consultations" className="space-y-4 scroll-mt-28">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#20211E] font-normal border-b border-[#E5E5E5] pb-3">
                11. Appointments, Consultations, and Booking Confirmation
              </h2>
              <div className="text-[15px] sm:text-base text-[#4D463C] leading-relaxed space-y-3 font-light">
                <p>
                  Clients wishing to schedule in-person consultations, design viewings, or banquet menu tastings at our atelier in Ibadan must request an appointment in advance.
                </p>
                <p>
                  Appointments are subject to director availability and are valid only upon written confirmation from our concierge desk. We warmly welcome clients and ensure every session is given undivided creative attention.
                </p>
              </div>
            </section>

            {/* Section 12 - Cancellations & Deposits */}
            <section id="cancellations-deposits" className="space-y-4 scroll-mt-28">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#20211E] font-normal border-b border-[#E5E5E5] pb-3">
                12. Cancellations, Rescheduling, Deposits, and Booking Payments
              </h2>
              <div className="text-[15px] sm:text-base text-[#4D463C] leading-relaxed space-y-3 font-light">
                <p>
                  Specific commercial terms—including required commitment deposits, interim progress schedules, and cancellation or rescheduling provisions—are defined within the individual service contract issued for each event or bespoke commission.
                </p>
                <p>
                  Because event dates are reserved exclusively and perishable food stocks or custom floral arrangements are procured specifically for your celebration, deposits and milestone payments become non-refundable once committed to third-party artisans and calendar lockouts. Detailed terms will be provided in your tailored proposal for review prior to payment.
                </p>
              </div>
            </section>

            {/* Section 13 - Customer Responsibilities */}
            <section id="acceptable-use" className="space-y-4 scroll-mt-28">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#20211E] font-normal border-b border-[#E5E5E5] pb-3">
                13. Customer Responsibilities and Acceptable Website Use
              </h2>
              <div className="text-[15px] sm:text-base text-[#4D463C] leading-relaxed space-y-3 font-light">
                <p>When accessing or using our website, you agree not to:</p>
                <ul className="list-disc pl-6 space-y-2 text-[#4D463C]">
                  <li>Provide false, deceptive, or fraudulent contact information or impersonate another person.</li>
                  <li>Interfere with, disrupt, or compromise the technical integrity or security of the website or network servers.</li>
                  <li>Use automated scrapers, data-mining tools, or bots without explicit prior authorization.</li>
                  <li>Transmit harmful code, spam, or unsolicited promotional materials through our contact or enquiry forms.</li>
                </ul>
              </div>
            </section>

            {/* Section 14 - Intellectual Property */}
            <section id="intellectual-property" className="space-y-4 scroll-mt-28">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#20211E] font-normal border-b border-[#E5E5E5] pb-3">
                14. Intellectual Property and Website Content
              </h2>
              <div className="text-[15px] sm:text-base text-[#4D463C] leading-relaxed space-y-3 font-light">
                <p>
                  All content published on this website—including photography, design layouts, written descriptions, logos, brand marks, and software code—is the proprietary property of <strong>Harmony Hub</strong> and founder <strong>Olubunmi Folorunsho</strong>, protected under Nigerian and international copyright, trademark, and intellectual property laws.
                </p>
                <p>
                  No material from this website may be reproduced, distributed, republished, displayed, or commercially exploited without our express prior written permission.
                </p>
              </div>
            </section>

            {/* Section 15 - Third-Party Platforms */}
            <section id="third-party-platforms" className="space-y-4 scroll-mt-28">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#20211E] font-normal border-b border-[#E5E5E5] pb-3">
                15. Third-Party Platforms, Including WhatsApp
              </h2>
              <div className="text-[15px] sm:text-base text-[#4D463C] leading-relaxed space-y-3 font-light">
                <p>
                  Our website includes links to third-party platforms, notably WhatsApp (Meta Platforms, Inc.) for conversational order handling and inquiries.
                </p>
                <p>
                  We do not control or assume responsibility for the availability, network uptime, or terms of third-party platforms. Your use of external platforms is governed by their respective terms of service and security policies.
                </p>
              </div>
            </section>

            {/* Section 16 - Limitation of Liability */}
            <section id="limitation-of-liability" className="space-y-4 scroll-mt-28">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#20211E] font-normal border-b border-[#E5E5E5] pb-3">
                16. Limitations of Liability
              </h2>
              <div className="text-[15px] sm:text-base text-[#4D463C] leading-relaxed space-y-3 font-light">
                <p>
                  To the maximum extent permitted by applicable Nigerian law, Harmony Hub and its directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your access to or inability to use this website, delay in communications, or courier transit disruptions beyond our reasonable control.
                </p>
                <p>
                  Nothing in these terms limits or excludes liability that cannot be excluded under applicable consumer protection legislation in Nigeria.
                </p>
              </div>
            </section>

            {/* Section 17 - Changes to the Terms */}
            <section id="changes-to-terms" className="space-y-4 scroll-mt-28">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#20211E] font-normal border-b border-[#E5E5E5] pb-3">
                17. Changes to These Terms
              </h2>
              <div className="text-[15px] sm:text-base text-[#4D463C] leading-relaxed space-y-3 font-light">
                <p>
                  We reserve the right to modify these Terms of Use at any time. Any changes will take effect immediately upon being posted on this page with an updated &ldquo;Effective Date&rdquo;.
                </p>
                <p>
                  Your continued use of the website or engagement of our services after any revisions signifies your acceptance of the updated terms.
                </p>
              </div>
            </section>

            {/* Section 18 - Contact Information */}
            <section id="contact-complaints" className="space-y-4 scroll-mt-28">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#20211E] font-normal border-b border-[#E5E5E5] pb-3">
                18. Contact Information for Questions or Complaints
              </h2>
              <div className="text-[15px] sm:text-base text-[#4D463C] leading-relaxed space-y-4 font-light">
                <p>
                  If you have any questions regarding these Terms of Use, need assistance with an order, or wish to report a product discrepancy, please contact our concierge team promptly:
                </p>

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
                      <p className="text-xs uppercase tracking-wider text-[#8A8884] font-semibold">Concierge Switchboard &amp; WhatsApp</p>
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
                      <p className="text-xs uppercase tracking-wider text-[#8A8884] font-semibold">Direct Electronic Mail</p>
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
                    href="/privacy-policy"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#183C32] hover:text-[#B96F52] underline underline-offset-4"
                  >
                    View Privacy Policy →
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
