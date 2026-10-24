import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Heart, Compass, CheckCircle } from "lucide-react";
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
    question: "Vetted Artisan & Trusted Supply Network",
    answer:
      "Over 12 years of hands-on curation, we have established direct relationships with master florists, pastry chefs, fabricators, and certified kitchenware manufacturers. Every service delivered meets rigorous standards of hygiene, punctuality, and aesthetic refinement.",
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-24 sm:space-y-32 pb-12">
      {/* 1. HERO SECTION */}
      <section className="pt-12 sm:pt-20 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#B96F52] font-bold">
              THE HEART OF HARMONY HUB
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#183C32] font-normal leading-tight">
              A passion for bringing{" "}
              <span className="italic text-[#B96F52]">people together.</span>
            </h1>
            <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed font-light">
              Behind Harmony Hub is a woman who believes thoughtful details can turn an ordinary moment into something unforgettable. Her love for welcoming spaces, meaningful celebrations and caring service is the spirit at the heart of the business.
            </p>
            <div className="pt-2">
              <Link
                href="/flair-and-flavors"
                className="inline-flex items-center justify-center bg-[#183C32] hover:bg-[#B96F52] text-white px-8 py-3.5 rounded-xs text-xs uppercase tracking-widest font-semibold transition"
              >
                <span>Explore what we do</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-72 h-80 sm:w-96 sm:h-[420px] rounded-xs overflow-hidden shadow-xl border-4 border-white">
              <Image
                src="/images/founder/founder-main.jpg"
                alt="Olubunmi Folorunsho"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-[#183C32]/90 backdrop-blur-xs text-white p-3 rounded-xs text-center border border-white/10">
                <span className="block text-sm font-semibold">Olubunmi Folorunsho</span>
                <span className="text-[11px] text-[#E5B59C]">Founder & Creative Director</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MORE THAN A BUSINESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Collage */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="relative h-64 sm:h-80 rounded-xs overflow-hidden shadow-sm">
              <Image
                src="/images/events/cake.jpg"
                alt="Harmony Hub Event Styling"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-64 sm:h-80 rounded-xs overflow-hidden shadow-sm mt-8">
              <Image
                src="/images/events/chair-decor.jpg"
                alt="Harmony Hub Floral Decor"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Story Content */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#B96F52] font-bold">
              MORE THAN A BUSINESS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#183C32] leading-tight">
              One idea connects everything{" "}
              <span className="italic text-[#B96F52]">Harmony Hub does.</span>
            </h2>

            <div className="border-l-2 border-[#B96F52] pl-4 py-1">
              <p className="font-serif text-lg sm:text-xl text-[#183C32] italic">
                Make life easier, spaces more inviting, and special occasions more enjoyable.
              </p>
            </div>

            <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
              There is joy in watching an idea become a memorable occasion. That is why event management sits so naturally at the centre of Harmony Hub: it brings creativity, practical planning and attention to detail together in service of the moments people value.
            </p>

            <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
              The same care extends to furniture and decoration, where beauty and function work side by side; to catering, where good food and warm hospitality help guests feel at home; and to the products offered for everyday needs. Each part of the business reflects a practical, personal desire to help customers feel looked after.
            </p>
          </div>
        </div>
      </section>

      {/* 3. WHY HARMONY HUB EXISTS (Dark Section) */}
      <section className="bg-[#183C32] text-white py-24 border-y border-[#26423A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#E5B59C] font-semibold">
                WHY HARMONY HUB EXISTS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F7F4EC] leading-tight">
                Thoughtful service should feel{" "}
                <span className="italic text-[#E5B59C]">beautifully simple.</span>
              </h2>
              <p className="text-sm text-[#A0AEC0] leading-relaxed pt-2">
                Organising an event, creating a welcoming space or finding useful products should not feel unnecessarily complicated. Harmony Hub brings complementary services together so customers can move from idea to outcome with greater clarity and ease.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="border-b border-[#26423A] pb-6 space-y-2">
                <span className="text-xs font-mono text-[#E5B59C] font-bold">01</span>
                <h3 className="font-serif text-2xl text-white">A simpler experience</h3>
                <p className="text-sm text-[#A0AEC0] leading-relaxed">
                  Connected services and products in one considered destination, minimizing stress and disparate vendor headaches.
                </p>
              </div>

              <div className="border-b border-[#26423A] pb-6 space-y-2">
                <span className="text-xs font-mono text-[#E5B59C] font-bold">02</span>
                <h3 className="font-serif text-2xl text-white">Care in the details</h3>
                <p className="text-sm text-[#A0AEC0] leading-relaxed">
                  Thoughtful presentation, transparent communication, and attentive service that honors the importance of your gathering.
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono text-[#E5B59C] font-bold">03</span>
                <h3 className="font-serif text-2xl text-white">Ideas brought to life</h3>
                <p className="text-sm text-[#A0AEC0] leading-relaxed">
                  A creative, practical approach shaped around what each customer needs, with flexible tailoring and local execution in Ibadan and beyond.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE HARMONY HUB EXPERIENCE (What We Do) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#B96F52] font-bold">
            THE HARMONY HUB EXPERIENCE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#183C32]">
            What we do
          </h2>
          <p className="text-sm text-[#666D65]">
            Different offerings, united by a warm and thoughtful approach.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 01 Event Management */}
          <div className="bg-[#F7F4EC] border border-[#DCDDD4] p-8 rounded-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-mono text-[#B96F52] font-bold">01</span>
              <h3 className="font-serif text-2xl text-[#183C32]">Event Management</h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                Thoughtful planning and calm coordination that help turn an idea into a well-organised, memorable occasion.
              </p>
            </div>
            <Link
              href="/flair-and-flavors"
              className="inline-flex items-center text-xs uppercase tracking-widest font-semibold text-[#183C32] hover:text-[#B96F52] pt-4"
            >
              <span>Explore Services &rarr;</span>
            </Link>
          </div>

          {/* 02 Furniture */}
          <div className="bg-[#F7F4EC] border border-[#DCDDD4] p-8 rounded-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-mono text-[#B96F52] font-bold">02</span>
              <h3 className="font-serif text-2xl text-[#183C32]">Furniture</h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                Furniture solutions considered for comfort, function, and spaces that feel welcoming, elegant, and complete.
              </p>
            </div>
            <Link
              href="/faqs#enquiry"
              className="inline-flex items-center text-xs uppercase tracking-widest font-semibold text-[#183C32] hover:text-[#B96F52] pt-4"
            >
              <span>Discuss Your Needs &rarr;</span>
            </Link>
          </div>

          {/* 03 Catering */}
          <div className="bg-[#F7F4EC] border border-[#DCDDD4] p-8 rounded-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-mono text-[#B96F52] font-bold">03</span>
              <h3 className="font-serif text-2xl text-[#183C32]">Catering</h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                Food and hospitality brought together to help guests feel welcomed, cared for, and exceptionally well served.
              </p>
            </div>
            <Link
              href="/flair-and-flavors"
              className="inline-flex items-center text-xs uppercase tracking-widest font-semibold text-[#183C32] hover:text-[#B96F52] pt-4"
            >
              <span>Explore Catering &rarr;</span>
            </Link>
          </div>

          {/* 04 Decoration */}
          <div className="bg-[#F7F4EC] border border-[#DCDDD4] p-8 rounded-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-mono text-[#B96F52] font-bold">04</span>
              <h3 className="font-serif text-2xl text-[#183C32]">Decoration</h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                Cohesive styling and carefully chosen details that transform the mood, elegance, and character of a space.
              </p>
            </div>
            <Link
              href="/flair-and-flavors"
              className="inline-flex items-center text-xs uppercase tracking-widest font-semibold text-[#183C32] hover:text-[#B96F52] pt-4"
            >
              <span>Explore Styling &rarr;</span>
            </Link>
          </div>

          {/* 05 Our Products */}
          <div className="bg-[#F7F4EC] border border-[#DCDDD4] p-8 rounded-xs space-y-4 flex flex-col justify-between md:col-span-2">
            <div className="space-y-3">
              <span className="text-xs font-mono text-[#B96F52] font-bold">05</span>
              <h3 className="font-serif text-2xl text-[#183C32]">Our Products (Retail & Living)</h3>
              <p className="text-sm text-[#4B5563] leading-relaxed max-w-xl">
                Useful, considered products for the home, family, and everyday life, gathered in one convenient catalogue. From high-grade kitchenware to mother and baby care.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center text-xs uppercase tracking-widest font-semibold text-[#183C32] hover:text-[#B96F52] pt-4"
            >
              <span>Shop Products &rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. EXECUTIVE VISION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative h-80 sm:h-96 rounded-xs overflow-hidden shadow-md">
            <Image
              src="/images/founder/founder-red.jpg"
              alt="Olubunmi Folorunsho"
              fill
              className="object-cover"
            />
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#B96F52] font-bold">
              EXECUTIVE VISION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#183C32] leading-tight">
              Guiding Every Chapter with Purpose & Grace.
            </h2>

            <blockquote className="border-l-4 border-[#183C32] pl-4 italic font-serif text-lg text-[#183C32]">
              &ldquo;True luxury is coherence. When your grandest celebrations and your intimate home rituals speak the very same language of refinement, life finds its harmony.&rdquo;
            </blockquote>

            <p className="text-xs text-[#666D65]">
              Headquartered in Ibadan, Oyo State, Harmony Hub unites veteran hospitality coordinators, master confections directors, and verified supply partners.
            </p>

            <div className="pt-4">
              <Accordion items={executiveAccordions} defaultOpenIndex={0} />
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRE-FOOTER CTA */}
      <PreFooterCTA />
    </div>
  );
}
