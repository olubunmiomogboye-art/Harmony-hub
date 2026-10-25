import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function PreFooterCTA() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-black">
      {/* Background Ballroom Chandelier Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/figma/6c89c79b25.jpg"
          alt="Harmony Hub Grand Celebration Setting"
          fill
          className="object-cover opacity-65"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-xl bg-[#F7F4EC] p-8 sm:p-12 rounded-xs shadow-2xl border border-[#DCDDD4]">
          <span className="text-xs uppercase tracking-widest text-[#B96F52] font-bold block mb-2">
            LET&apos;S BEGIN
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#183C32] leading-tight mb-4 font-normal">
            Have a Question or Planning{" "}
            <span className="italic text-[#B96F52]">Something Special?</span>
          </h2>
          <p className="text-sm sm:text-base text-[#666D65] leading-relaxed mb-8">
            Whether you are organising an event, looking for catering, or enquiring about our products, we would love to hear from you.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="/faqs#enquiry"
              className="inline-flex items-center justify-center bg-[#183C32] hover:bg-[#122E26] text-white px-7 py-3.5 rounded-xs text-sm font-medium tracking-wide transition shadow-sm"
            >
              Plan Your Event
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-transparent border border-[#183C32] text-[#183C32] hover:bg-[#183C32] hover:text-white px-7 py-3.5 rounded-xs text-sm font-medium tracking-wide transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
