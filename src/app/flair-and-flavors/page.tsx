import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
      "Yes. Flair & Flavors coordinates traditional Nigerian weddings, white weddings, milestone birthdays, anniversaries, corporate banquets, bridal showers, and private home dinners across Ibadan and neighbouring states.",
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
    <div className="bg-white">
      {/* 1. HERO SECTION (Figma 32:84) */}
      <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center overflow-hidden bg-[#F8F9FA]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/figma/7f58801bb0.jpg"
            alt="Flair & Flavors Silk Texture"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-85"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-20 lg:py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 max-w-2xl">
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-[76px] font-normal leading-[1.08] tracking-tight text-[#20211E]">
                Moments made <br />
                <span className="italic text-[#B96F52]">unforgettable.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#20211E]/80 leading-relaxed max-w-xl font-normal">
                We plan and cater gatherings that your guests will talk about long after the music stops. From delicious traditional and continental dishes to gorgeous floral styling and custom celebration cakes, we handle every detail with genuine warmth and care.
              </p>

              <div className="pt-2">
                <Link
                  href="/faqs#enquiry"
                  className="inline-flex items-center justify-center bg-[#183C32] hover:bg-[#122E26] text-white px-8 py-4 rounded-xs text-[15px] font-medium tracking-wide transition shadow-sm"
                >
                  Enquire About Your Event
                </Link>
              </div>
            </div>

            {/* Right Hero Graphic: Seaside Altar Grid (Transparent PNG Union-1.png) */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[480px] aspect-[1162/1494]">
                <Image
                  src="/images/uploaded/flair-hero-altar.png"
                  alt="Flair & Flavors Bespoke Altar and Ceremony Styling"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. "WHERE WARM HOSPITALITY MEETS CONSIDERED DESIGN" */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs uppercase tracking-widest text-[#705B38] font-semibold block mb-2">
              OUR APPROACH
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#20211E] font-normal">
              Where warm hospitality meets <br />
              <span className="italic text-[#B96F52]">considered design.</span>
            </h2>
          </div>

          {/* 4 Service Offerings Grid with Overlapping Cream Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {/* 01 Catering */}
            <div className="relative group flex flex-col sm:flex-row items-center">
              <div className="relative w-full sm:w-3/4 aspect-[4/3] rounded-xs overflow-hidden shadow-md">
                <Image
                  src="/images/figma/a87c966866.jpg"
                  alt="Flair & Flavors Banquet Catering"
                  fill
                  sizes="(max-width: 640px) 100vw, 400px"
                  loading="lazy"
                  className="object-cover"
                />
              </div>
              <div className="sm:absolute sm:right-0 sm:w-3/5 bg-[#F7F4EC] p-6 sm:p-8 rounded-xs shadow-lg border border-[#E5E5E5] mt-[-2rem] sm:mt-0 z-10 space-y-3">
                <span className="text-xs text-[#705B38] font-mono block">01</span>
                <h3 className="font-serif text-2xl font-medium text-[#20211E]">Catering</h3>
                <p className="text-xs sm:text-sm text-[#4D463C] leading-relaxed">
                  Delicious, beautifully presented food with generous portions for you and your guests.
                </p>
                <Link
                  href="/faqs#enquiry"
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#183C32] hover:text-[#B96F52] pt-2"
                >
                  <span>ENQUIRE ABOUT THIS SERVICE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* 02 Event Planning */}
            <div className="relative group flex flex-col sm:flex-row items-center">
              <div className="relative w-full sm:w-3/4 aspect-[4/3] rounded-xs overflow-hidden shadow-md">
                <Image
                  src="/images/figma/50b8b5e557.jpg"
                  alt="Wedding & Celebration Planning"
                  fill
                  sizes="(max-width: 640px) 100vw, 400px"
                  loading="lazy"
                  className="object-cover"
                />
              </div>
              <div className="sm:absolute sm:right-0 sm:w-3/5 bg-[#F7F4EC] p-6 sm:p-8 rounded-xs shadow-lg border border-[#E5E5E5] mt-[-2rem] sm:mt-0 z-10 space-y-3">
                <span className="text-xs text-[#705B38] font-mono block">02</span>
                <h3 className="font-serif text-2xl font-medium text-[#20211E]">Event Planning</h3>
                <p className="text-xs sm:text-sm text-[#4D463C] leading-relaxed">
                  Step-by-step coordination so you can enjoy your celebration without stress.
                </p>
                <Link
                  href="/faqs#enquiry"
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#183C32] hover:text-[#B96F52] pt-2"
                >
                  <span>ENQUIRE ABOUT THIS SERVICE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* 03 Decoration & Styling */}
            <div className="relative group flex flex-col sm:flex-row items-center">
              <div className="relative w-full sm:w-3/4 aspect-[4/3] rounded-xs overflow-hidden shadow-md">
                <Image
                  src="/images/figma/cfa582782f.jpg"
                  alt="Event Decoration & Floral Styling"
                  fill
                  sizes="(max-width: 640px) 100vw, 400px"
                  loading="lazy"
                  className="object-cover"
                />
              </div>
              <div className="sm:absolute sm:right-0 sm:w-3/5 bg-[#F7F4EC] p-6 sm:p-8 rounded-xs shadow-lg border border-[#E5E5E5] mt-[-2rem] sm:mt-0 z-10 space-y-3">
                <span className="text-xs text-[#705B38] font-mono block">03</span>
                <h3 className="font-serif text-2xl font-medium text-[#20211E]">Decoration & Styling</h3>
                <p className="text-xs sm:text-sm text-[#4D463C] leading-relaxed">
                  Stunning stage decor, table styling, and floral arrangements that bring your vision to life.
                </p>
                <Link
                  href="/faqs#enquiry"
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#183C32] hover:text-[#B96F52] pt-2"
                >
                  <span>ENQUIRE ABOUT THIS SERVICE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* 04 Cakes & Desserts */}
            <div className="relative group flex flex-col sm:flex-row items-center">
              <div className="relative w-full sm:w-3/4 aspect-[4/3] rounded-xs overflow-hidden shadow-md">
                <Image
                  src="/images/figma/57918bafa7.jpg"
                  alt="Custom Celebration Cakes"
                  fill
                  sizes="(max-width: 640px) 100vw, 400px"
                  loading="lazy"
                  className="object-cover"
                />
              </div>
              <div className="sm:absolute sm:right-0 sm:w-3/5 bg-[#F7F4EC] p-6 sm:p-8 rounded-xs shadow-lg border border-[#E5E5E5] mt-[-2rem] sm:mt-0 z-10 space-y-3">
                <span className="text-xs text-[#705B38] font-mono block">04</span>
                <h3 className="font-serif text-2xl font-medium text-[#20211E]">Cakes & Desserts</h3>
                <p className="text-xs sm:text-sm text-[#4D463C] leading-relaxed">
                  Delicious, artistic celebration cakes and desserts that make your event memorable.
                </p>
                <Link
                  href="/faqs#enquiry"
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#183C32] hover:text-[#B96F52] pt-2"
                >
                  <span>ENQUIRE ABOUT THIS SERVICE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. "OUR PROCESS" (Dark Charcoal Section - 32:84) */}
      <section className="py-24 sm:py-32 bg-[#2D332C] text-[#FCF9F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Title */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#B1CCC7] font-semibold block">
                WORKING TOGETHER
              </span>
              <h2 className="font-serif italic text-4xl sm:text-5xl lg:text-6xl text-white font-normal">
                OUR PROCESS
              </h2>
              <p className="text-sm sm:text-base text-white/70 max-w-sm leading-relaxed font-light">
                A simple, reliable step-by-step approach to make your celebration seamless.
              </p>
            </div>

            {/* Right Steps */}
            <div className="lg:col-span-7 space-y-6">
              <div className="grid grid-cols-12 gap-4 pb-6 border-b border-white/10 items-baseline">
                <span className="col-span-2 text-xs font-mono text-white/60">01</span>
                <h3 className="col-span-4 font-serif text-xl sm:text-2xl text-white">Consultation</h3>
                <p className="col-span-6 text-sm text-white/75 font-light">We listen to your ideas, expected guest count, venue, and budget.</p>
              </div>

              <div className="grid grid-cols-12 gap-4 pb-6 border-b border-white/10 items-baseline">
                <span className="col-span-2 text-xs font-mono text-white/60">02</span>
                <h3 className="col-span-4 font-serif text-xl sm:text-2xl text-white">Planning</h3>
                <p className="col-span-6 text-sm text-white/75 font-light">We create a clear proposal covering menus, decor options, and schedules.</p>
              </div>

              <div className="grid grid-cols-12 gap-4 pb-6 border-b border-white/10 items-baseline">
                <span className="col-span-2 text-xs font-mono text-white/60">03</span>
                <h3 className="col-span-4 font-serif text-xl sm:text-2xl text-white">Preparation</h3>
                <p className="col-span-6 text-sm text-white/75 font-light">Ingredients are sourced fresh, decorations are prepared, and timings are confirmed.</p>
              </div>

              <div className="grid grid-cols-12 gap-4 pb-6 items-baseline">
                <span className="col-span-2 text-xs font-mono text-white/60">04</span>
                <h3 className="col-span-4 font-serif text-xl sm:text-2xl text-white">Event day</h3>
                <p className="col-span-6 text-sm text-white/75 font-light">Our team arrives early, coordinates everything seamlessly, and serves your guests with warmth.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. "BEFORE WE BEGIN" (Accordions) */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#705B38] font-semibold block">
                FREQUENTLY ASKED
              </span>
              <h2 className="font-serif italic text-4xl sm:text-5xl text-[#20211E] font-normal">
                BEFORE WE BEGIN
              </h2>
            </div>

            <div className="lg:col-span-7">
              <Accordion items={BEFORE_WE_BEGIN_FAQS} allowMultiple />
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRE-FOOTER CTA BANNER */}
      <PreFooterCTA />
    </div>
  );
}
