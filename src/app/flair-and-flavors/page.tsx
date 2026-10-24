import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import PreFooterCTA from "@/components/PreFooterCTA";
import Accordion, { AccordionItem } from "@/components/Accordion";

const BEFORE_WE_BEGIN_FAQS: AccordionItem[] = [
  {
    id: "how-far-ahead",
    question: "How far ahead should I enquire?",
    answer:
      "For large weddings and galas, we recommend reaching out 3 to 6 months in advance to secure prime dates and vendor scheduling. For intimate dinners, birthday banquets, or cakes, 3 to 4 weeks' notice is generally suitable.",
  },
  {
    id: "one-service-only",
    question: "Can I book one service only?",
    answer:
      "Yes, absolutely. While we excel at turnkey celebrations integrating planning, catering, and decor, our services are fully modular. You are welcome to book catering alone, decor styling alone, or bespoke celebration cakes.",
  },
  {
    id: "event-types",
    question: "Do you cater for different event types?",
    answer:
      "Yes. Flair & Flavors coordinates traditional Nigerian weddings, white weddings, milestone anniversaries, executive galas, corporate tasting salons, bridal showers, and private residence dinners across Ibadan and Lagos State.",
  },
  {
    id: "prepare-proposal",
    question: "What helps you prepare a proposal?",
    answer:
      "Sharing your target date, venue or city preference, approximate guest count, catering style (buffet, plated, small chops), and any inspiration moodboards allows us to prepare an accurate and tailored proposal promptly.",
  },
];

export default function FlairAndFlavorsPage() {
  return (
    <div className="space-y-24 sm:space-y-32 pb-12">
      {/* 1. HERO SECTION */}
      <section className="bg-[#F7F4EC] pt-12 sm:pt-20 pb-16 border-b border-[#DCDDD4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-widest text-[#B96F52] font-bold">
                EVENTS & HOSPITALITY ATELIER
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#183C32] font-normal leading-tight">
                Moments made{" "}
                <span className="italic text-[#B96F52]">unforgettable.</span>
              </h1>
              <p className="text-base sm:text-lg text-[#4B5563] font-light leading-relaxed max-w-xl">
                We create gatherings with soul: beautifully presented food, thoughtful details, and a calm, coordinated experience from beginning to end. Every celebration starts with listening.
              </p>
              <div className="pt-2">
                <Link
                  href="/faqs#enquiry"
                  className="inline-flex items-center justify-center bg-[#183C32] hover:bg-[#B96F52] text-white px-8 py-3.5 rounded-xs text-xs uppercase tracking-widest font-semibold transition shadow-sm"
                >
                  <span>Begin your enquiry</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>

            {/* Right Photo Showcase */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-64 sm:h-72 rounded-xs overflow-hidden shadow-md">
                  <Image
                    src="/images/events/fabric-backdrop.jpg"
                    alt="Outdoor Stage Backdrop"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
                <div className="relative h-44 sm:h-52 rounded-xs overflow-hidden shadow-md">
                  <Image
                    src="/images/events/small-chops.jpg"
                    alt="Canapés and Catering"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <div className="relative h-44 sm:h-52 rounded-xs overflow-hidden shadow-md">
                  <Image
                    src="/images/events/cake.jpg"
                    alt="Artisanal Cake"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-64 sm:h-72 rounded-xs overflow-hidden shadow-md">
                  <Image
                    src="/images/events/white-wedding.jpg"
                    alt="White Wedding Coordination"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OUR APPROACH: 4 CORE SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#B96F52] font-bold">
            OUR APPROACH
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#183C32]">
            Where warm hospitality meets{" "}
            <span className="italic text-[#B96F52]">considered design.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Service 1: Catering */}
          <div className="bg-[#F7F4EC] border border-[#DCDDD4] rounded-xs overflow-hidden group">
            <div className="relative h-64 sm:h-72 w-full">
              <Image
                src="/images/events/small-chops.jpg"
                alt="Banqueting and Catering"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-8 space-y-3">
              <span className="text-xs font-mono text-[#B96F52] font-bold">01</span>
              <h3 className="font-serif text-2xl text-[#183C32]">Catering</h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                Menus and presentation shaped around your event. Rich traditional Nigerian celebratory courses, gourmet small chops, and bespoke plated service.
              </p>
              <div className="pt-2">
                <Link
                  href="/faqs#enquiry"
                  className="inline-flex items-center text-xs uppercase tracking-widest font-semibold text-[#183C32] group-hover:text-[#B96F52] transition"
                >
                  <span>Enquire about this service &rarr;</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Service 2: Event Planning */}
          <div className="bg-[#F7F4EC] border border-[#DCDDD4] rounded-xs overflow-hidden group">
            <div className="relative h-64 sm:h-72 w-full">
              <Image
                src="/images/events/venue-overview.jpg"
                alt="Event Coordination"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-8 space-y-3">
              <span className="text-xs font-mono text-[#B96F52] font-bold">02</span>
              <h3 className="font-serif text-2xl text-[#183C32]">Event Planning</h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                Clear coordination from first conversation to the final guest. We handle vendor synchronisation, venue scheduling, and day-of calm execution.
              </p>
              <div className="pt-2">
                <Link
                  href="/faqs#enquiry"
                  className="inline-flex items-center text-xs uppercase tracking-widest font-semibold text-[#183C32] group-hover:text-[#B96F52] transition"
                >
                  <span>Enquire about this service &rarr;</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Service 3: Decoration & Styling */}
          <div className="bg-[#F7F4EC] border border-[#DCDDD4] rounded-xs overflow-hidden group">
            <div className="relative h-64 sm:h-72 w-full">
              <Image
                src="/images/events/chair-decor.jpg"
                alt="Floral Decor & Scenography"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-8 space-y-3">
              <span className="text-xs font-mono text-[#B96F52] font-bold">03</span>
              <h3 className="font-serif text-2xl text-[#183C32]">Decoration & Styling</h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                Layered details, fresh botanicals, ambient illumination, and bespoke backdrops designed with a distinctive artistic perspective.
              </p>
              <div className="pt-2">
                <Link
                  href="/faqs#enquiry"
                  className="inline-flex items-center text-xs uppercase tracking-widest font-semibold text-[#183C32] group-hover:text-[#B96F52] transition"
                >
                  <span>Enquire about this service &rarr;</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Service 4: Cakes & Desserts */}
          <div className="bg-[#F7F4EC] border border-[#DCDDD4] rounded-xs overflow-hidden group">
            <div className="relative h-64 sm:h-72 w-full">
              <Image
                src="/images/events/cake.jpg"
                alt="Artisanal Celebration Cakes"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-8 space-y-3">
              <span className="text-xs font-mono text-[#B96F52] font-bold">04</span>
              <h3 className="font-serif text-2xl text-[#183C32]">Cakes & Desserts</h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                Celebratory sweets designed to delight both palate and aesthetic. Custom tiered wedding cakes, delicate macarons, and dessert tables.
              </p>
              <div className="pt-2">
                <Link
                  href="/faqs#enquiry"
                  className="inline-flex items-center text-xs uppercase tracking-widest font-semibold text-[#183C32] group-hover:text-[#B96F52] transition"
                >
                  <span>Enquire about this service &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR PROCESS (Dark Section) */}
      <section className="bg-[#183C32] text-white py-24 border-y border-[#26423A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#E5B59C] font-semibold">
                WORKING TOGETHER
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F7F4EC]">
                Our Process
              </h2>
              <p className="text-sm text-[#A0AEC0] leading-relaxed pt-2">
                A considered framework, tailored to the actual needs of your event. From initial concept dialogue to seamless celebration day.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="border-b border-[#26423A] pb-6 flex items-start justify-between gap-6">
                <div>
                  <span className="text-xs font-mono text-[#E5B59C] font-bold block mb-1">01</span>
                  <h3 className="font-serif text-2xl text-white">Consultation</h3>
                </div>
                <p className="text-sm text-[#A0AEC0] max-w-md">
                  Tell us about the occasion, priorities, guest scope, and practical details.
                </p>
              </div>

              <div className="border-b border-[#26423A] pb-6 flex items-start justify-between gap-6">
                <div>
                  <span className="text-xs font-mono text-[#E5B59C] font-bold block mb-1">02</span>
                  <h3 className="font-serif text-2xl text-white">Planning</h3>
                </div>
                <p className="text-sm text-[#A0AEC0] max-w-md">
                  We shape an agreed proposal, scope, tasting schedule, and aesthetic timeline.
                </p>
              </div>

              <div className="border-b border-[#26423A] pb-6 flex items-start justify-between gap-6">
                <div>
                  <span className="text-xs font-mono text-[#E5B59C] font-bold block mb-1">03</span>
                  <h3 className="font-serif text-2xl text-white">Preparation</h3>
                </div>
                <p className="text-sm text-[#A0AEC0] max-w-md">
                  Menus, floral sourcing, styling assets, and logistics are carefully readied.
                </p>
              </div>

              <div className="flex items-start justify-between gap-6">
                <div>
                  <span className="text-xs font-mono text-[#E5B59C] font-bold block mb-1">04</span>
                  <h3 className="font-serif text-2xl text-white">Event Day</h3>
                </div>
                <p className="text-sm text-[#A0AEC0] max-w-md">
                  Our team delivers the confirmed plan with attentive care and calm precision.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BEFORE WE BEGIN FAQS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#B96F52] font-bold">
            FREQUENTLY ASKED
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#183C32]">
            Before We Begin
          </h2>
        </div>

        <Accordion items={BEFORE_WE_BEGIN_FAQS} defaultOpenIndex={0} />
      </section>

      {/* 5. PRE-FOOTER CTA */}
      <PreFooterCTA />
    </div>
  );
}
