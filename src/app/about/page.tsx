import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PreFooterCTA from "@/components/PreFooterCTA";
import Accordion, { AccordionItem } from "@/components/Accordion";

const executiveAccordions: AccordionItem[] = [
  {
    id: "ibadan-salon",
    question: "Ibadan Headquarters & Private Consultation Salon",
    answer:
      "Harmony Hub maintains its primary creative operations in Ibadan, Oyo State, Nigeria. We offer private styling appointments and event tastings by advance reservation for prospective celebrants, corporate hosts, and residential interior clients.",
  },
  {
    id: "artisan-network",
    question: "Vetted Artisan & Supply Network",
    answer:
      "Over 12 years of hands-on curation, we have established direct relationships with master florists, pastry chefs, fabricators, and certified kitchenware manufacturers. Every service delivered meets rigorous standards of hygiene, punctuality, and aesthetic refinement.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* 1. HERO SECTION (Figma 38:742) */}
      <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center overflow-hidden bg-[#F8F9FA]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/figma/7f58801bb0.jpg"
            alt="Harmony Hub Silk Texture"
            fill
            priority
            className="object-cover object-center opacity-85"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-20 lg:py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 max-w-2xl">
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-[72px] font-normal leading-[1.08] tracking-tight text-[#20211E]">
                A passion for <br />
                bringing <br />
                <span className="italic text-[#B96F52]">people together.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#20211E]/80 leading-relaxed max-w-xl font-normal">
                Behind Harmony Hub is a woman who believes thoughtful details can turn an ordinary moment into something unforgettable. Her love for welcoming spaces, meaningful celebrations and caring service is the spirit at the heart of the business.
              </p>

              <div className="pt-2">
                <Link
                  href="/flair-and-flavors"
                  className="inline-flex items-center justify-center bg-[#183C32] hover:bg-[#122E26] text-white px-8 py-4 rounded-xs text-[15px] font-medium tracking-wide transition shadow-sm"
                >
                  Explore what we do
                </Link>
              </div>
            </div>

            {/* Right Hero Graphic: Founder in Royal Blue Honeycomb Cutout (Transparent PNG Union-2.png) */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[480px] aspect-[1468/1514]">
                <Image
                  src="/images/uploaded/about-hero-founder.png"
                  alt="Olubunmi Folorunsho, Founder of Harmony Hub"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. "ONE IDEA CONNECTS EVERYTHING HARMONY HUB DOES" */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Dual Imagery */}
            <div className="lg:col-span-6 grid grid-cols-12 gap-4">
              <div className="col-span-8 relative aspect-[4/5] rounded-xs overflow-hidden shadow-md">
                <Image
                  src="/images/figma/cfa582782f.jpg"
                  alt="Artisanal Floral Styling"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="col-span-4 relative aspect-[3/4] self-end rounded-xs overflow-hidden shadow-md">
                <Image
                  src="/images/figma/57918bafa7.jpg"
                  alt="Celebration Cake Haute Patisserie"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Philosophy Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-widest text-[#705B38] font-semibold block">
                MORE THAN A BUSINESS
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl text-[#20211E] font-normal leading-[1.15]">
                One idea connects <br />
                everything <span className="italic text-[#B96F52]">Harmony Hub does.</span>
              </h2>

              <p className="text-xl sm:text-2xl font-serif text-[#20211E] font-medium leading-snug border-l-2 border-[#B96F52] pl-4">
                Make life easier, spaces more inviting and special occasions more enjoyable.
              </p>

              <p className="text-base text-[#4D463C] leading-relaxed font-normal">
                There is joy in watching an idea become a memorable occasion. That is why event management sits so naturally at the centre of Harmony Hub: it brings creativity, practical planning and attention to detail together in service of the moments people value.
              </p>

              <p className="text-base text-[#4D463C] leading-relaxed font-normal">
                The same care extends to furniture and decoration, where beauty and function work side by side; to catering, where good food and warm hospitality help guests feel at home; and to the products offered for everyday needs. Each part of the business reflects a practical, personal desire to help customers feel looked after.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. "THOUGHTFUL SERVICE SHOULD FEEL BEAUTIFULLY SIMPLE" (Dark Section) */}
      <section className="py-24 sm:py-32 bg-[#2D332C] text-[#FCF9F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Heading */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#B1CCC7] font-semibold block">
                WHY HARMONY HUB EXISTS
              </span>
              <h2 className="font-serif italic text-4xl sm:text-5xl lg:text-6xl text-white font-normal leading-tight">
                Thoughtful service should feel beautifully simple.
              </h2>
            </div>

            {/* Right 3 Pillars List */}
            <div className="lg:col-span-7 space-y-8">
              <p className="text-base sm:text-lg text-white/80 leading-relaxed font-light">
                Organising an event, creating a welcoming space or finding useful products should not feel unnecessarily complicated. Harmony Hub brings complementary services together so customers can move from idea to outcome with greater clarity and ease.
              </p>

              <div className="space-y-6 pt-4 border-t border-white/15">
                <div className="pb-6 border-b border-white/10">
                  <h3 className="font-serif text-2xl font-normal text-white">
                    01 <span className="font-sans font-medium text-xl ml-3">A simpler experience</span>
                  </h3>
                  <p className="text-sm text-white/70 mt-2 font-light">
                    Connected services and products in one considered destination.
                  </p>
                </div>

                <div className="pb-6 border-b border-white/10">
                  <h3 className="font-serif text-2xl font-normal text-white">
                    02 <span className="font-sans font-medium text-xl ml-3">Care in the details</span>
                  </h3>
                  <p className="text-sm text-white/70 mt-2 font-light">
                    Thoughtful presentation, clear communication and attentive service.
                  </p>
                </div>

                <div className="pb-6">
                  <h3 className="font-serif text-2xl font-normal text-white">
                    03 <span className="font-sans font-medium text-xl ml-3">Ideas brought to life</span>
                  </h3>
                  <p className="text-sm text-white/70 mt-2 font-light">
                    A creative, practical approach shaped around what each customer needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. "WHAT WE DO" (5 Asymmetric Photo Tiles with Overlays) */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-[#705B38] font-semibold block mb-2">
              THE HARMONY HUB EXPERIENCE
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#20211E] font-normal">
              What we do
            </h2>
            <p className="text-base text-[#666D65] mt-3">
              Different offerings, united by a warm and thoughtful approach.
            </p>
          </div>

          {/* 5-Item Editorial Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Tile 1: 01 Event Management (Tall Left, 6 cols) */}
            <div className="lg:col-span-6 relative h-[480px] lg:h-[600px] rounded-xs overflow-hidden group">
              <Image
                src="/images/figma/50b8b5e557.jpg"
                alt="Event Management by Harmony Hub"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent flex flex-col justify-end p-8 text-white">
                <span className="text-xs text-white/70 block mb-1">01</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium">Event Management</h3>
                <p className="text-sm text-white/80 mt-1 max-w-md font-light">
                  Thoughtful planning and calm coordination that help turn an idea into a well-organised, memorable occasion.
                </p>
                <div className="pt-4">
                  <Link href="/flair-and-flavors" className="text-xs uppercase tracking-widest font-semibold text-white/90 hover:text-white underline underline-offset-4">
                    EXPLORE SERVICES →
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column (6 cols): Tiles 2 & 3 */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              {/* Tile 2: 02 Furniture */}
              <div className="relative h-[288px] rounded-xs overflow-hidden group">
                <Image
                  src="/images/figma/2255bfba.jpg"
                  alt="Furniture & Kitchen Living"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                  <span className="text-xs text-white/70 block mb-1">02</span>
                  <h3 className="font-serif text-2xl font-medium">Furniture</h3>
                  <p className="text-xs sm:text-sm text-white/80 mt-1 font-light">
                    Furniture solutions considered for comfort, function and spaces that feel welcoming and complete.
                  </p>
                  <div className="pt-3">
                    <Link href="/contact" className="text-xs uppercase tracking-widest font-semibold text-white/90 hover:text-white underline underline-offset-4">
                      DISCUSS YOUR NEEDS →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Tile 3: 03 Catering */}
              <div className="relative h-[288px] rounded-xs overflow-hidden group">
                <Image
                  src="/images/figma/a87c966866.jpg"
                  alt="Fine Banquet Catering"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                  <span className="text-xs text-white/70 block mb-1">03</span>
                  <h3 className="font-serif text-2xl font-medium">Catering</h3>
                  <p className="text-xs sm:text-sm text-white/80 mt-1 font-light">
                    Food and hospitality brought together to help guests feel welcomed, cared for and well served.
                  </p>
                  <div className="pt-3">
                    <Link href="/flair-and-flavors" className="text-xs uppercase tracking-widest font-semibold text-white/90 hover:text-white underline underline-offset-4">
                      EXPLORE CATERING →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lower Row: Tiles 4 & 5 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
            {/* Tile 4: 04 Decoration */}
            <div className="lg:col-span-5 relative h-72 sm:h-80 rounded-xs overflow-hidden group">
              <Image
                src="/images/figma/cfa582782f.jpg"
                alt="Event Decoration & Floral Styling"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                <span className="text-xs text-white/70 block mb-1">04</span>
                <h3 className="font-serif text-2xl font-medium">Decoration</h3>
                <p className="text-xs sm:text-sm text-white/80 mt-1 font-light">
                  Cohesive styling and carefully chosen details that transform the mood and character of a space.
                </p>
                <div className="pt-3">
                  <Link href="/flair-and-flavors" className="text-xs uppercase tracking-widest font-semibold text-white/90 hover:text-white underline underline-offset-4">
                    EXPLORE STYLING →
                  </Link>
                </div>
              </div>
            </div>

            {/* Tile 5: 05 Our Products */}
            <div className="lg:col-span-7 relative h-72 sm:h-80 rounded-xs overflow-hidden group">
              <Image
                src="/images/figma/b6ad3f93.jpg"
                alt="Curated Retail Products"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                <span className="text-xs text-white/70 block mb-1">05</span>
                <h3 className="font-serif text-2xl font-medium">Our Products</h3>
                <p className="text-xs sm:text-sm text-white/80 mt-1 font-light">
                  Useful, considered products for the home, family and everyday life, gathered in one convenient place.
                </p>
                <div className="pt-3">
                  <Link href="/shop" className="text-xs uppercase tracking-widest font-semibold text-white/90 hover:text-white underline underline-offset-4">
                    SHOP PRODUCTS →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. "GUIDING EVERY CHAPTER WITH PURPOSE & GRACE" (Executive Vision) */}
      <section className="py-24 sm:py-32 bg-[#FAF8F5] border-t border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Founder Portrait in Red Suit & Sunglasses (Figma 9b887a02) */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md aspect-[4/5] rounded-xs overflow-hidden shadow-md border-4 border-white">
                <Image
                  src="/images/founder/founder-leadership.jpg"
                  alt="Olubunmi Folorunsho, Founder of Harmony Hub"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>

            {/* Right: Executive Vision & Accordions */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#705B38] font-semibold block mb-2">
                  EXECUTIVE VISION
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl text-[#20211E] font-normal leading-tight">
                  Guiding Every Chapter with <br />
                  <span className="italic text-[#B96F52]">Purpose & Grace.</span>
                </h2>
              </div>

              {/* Quote Container */}
              <div className="bg-white p-6 sm:p-8 rounded-xs border border-[#E5E5E5] space-y-4">
                <p className="font-serif italic text-lg sm:text-xl text-[#20211E] leading-relaxed">
                  &ldquo;True luxury is coherence. When your grandest celebrations and your intimate home rituals speak the very same language of refinement, life finds its harmony.&rdquo;
                </p>
                <div className="pt-2 border-t border-[#E5E5E5] flex items-center justify-between text-xs text-[#666D65]">
                  <div>
                    <span className="font-semibold text-[#20211E] block">EXECUTIVE DIRECTORATE</span>
                    <span>Harmony Hub Enterprise Group • Ibadan, Nigeria</span>
                  </div>
                  <span className="font-serif text-3xl text-[#B96F52] leading-none select-none">&rdquo;</span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#4D463C] leading-relaxed">
                Headquartered in Ibadan, Oyo State, our executive board unites veteran international hospitality architects, master confections directors, and global supply managers. Together, we administer both private celebrations and commercial product distribution under rigorous quality audits.
              </p>

              {/* Accordions */}
              <div className="pt-2">
                <Accordion items={executiveAccordions} allowMultiple />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRE-FOOTER CTA BANNER */}
      <PreFooterCTA />
    </div>
  );
}
