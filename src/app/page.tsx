import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import PreFooterCTA from "@/components/PreFooterCTA";

export default function HomePage() {
  const featuredProducts = getFeaturedProducts().slice(0, 4);

  return (
    <div className="bg-white">
      {/* 1. HERO SECTION (Frame 32 - 32:750) */}
      <section className="relative min-h-[750px] lg:min-h-[850px] flex items-center overflow-hidden bg-[#F8F9FA]">
        {/* Background Fabric Drapery */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/figma/7f58801bb0.jpg"
            alt="Harmony Hub Silk Texture"
            fill
            priority
            className="object-cover object-right lg:object-center opacity-90"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-20 lg:py-28 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8 max-w-2xl">
              <h1 className="font-display text-5xl sm:text-6xl lg:text-[76px] font-normal leading-[1.08] tracking-tight text-[#20211E]">
                For the moments <br />
                you host. <br />
                <span className="font-serif italic font-normal text-[#B96F52]">
                  And the life you live.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#20211E]/80 leading-relaxed max-w-xl font-normal">
                From unforgettable celebrations and exceptional catering to thoughtfully selected products for everyday living, discover everything we bring together under one trusted brand.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  href="/flair-and-flavors"
                  className="inline-flex items-center justify-center bg-[#183C32] hover:bg-[#122E26] text-white px-8 py-4 rounded-xs text-[15px] font-medium tracking-wide transition shadow-sm"
                >
                  Explore flair and Flavors
                </Link>
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center bg-transparent border border-[#CD927C] text-[#20211E] hover:bg-[#183C32] hover:text-white hover:border-[#183C32] px-8 py-4 rounded-xs text-[15px] font-medium tracking-wide transition"
                >
                  Shop Products
                </Link>
              </div>
            </div>

            {/* Right Hero Graphic: Altar / Diamond Marquee Collage */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[500px] aspect-[1294/1634]">
                <Image
                  src="/images/uploaded/marquee-diamond-grid.png"
                  alt="Harmony Hub Luxury Celebration"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PHILOSOPHY MARQUEE (Frame 12 - 32:464) */}
      <section className="bg-[#383D36] text-[#FCF9F3] py-14 border-y border-[#484D46]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <p className="font-serif italic text-2xl sm:text-[26px] font-medium max-w-2xl text-[#FCF9F3] leading-snug">
            &ldquo;Architecture in taste, drama in atmosphere, timelessness in memory.&rdquo;
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-widest font-semibold text-[#B1CCC7]">
            <span>BANQUETING</span>
            <span className="text-white/40">•</span>
            <span>SCENOGRAPHY</span>
            <span className="text-white/40">•</span>
            <span>HAUTE PATISSERIE</span>
          </div>
        </div>
      </section>

      {/* 3. TWO DIVISIONS: “Different Needs, Met with the Same Care” (32:482 & 32:489) */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-16 text-center">
          <span className="text-xs uppercase tracking-widest text-[#141414] font-medium block mb-3">
            DISCOVER OUR BUSINESSES
          </span>
          <h2 className="font-serif italic text-4xl sm:text-5xl lg:text-[58px] text-[#20211E] font-medium leading-[1.12] max-w-4xl mx-auto">
            Different needs, met with the same care.
          </h2>
          <p className="text-base sm:text-lg text-[#20211E]/75 max-w-2xl mx-auto mt-4 leading-relaxed">
            Move seamlessly between celebration services and a curated retail catalogue—each with its own character, both guided by the same standard of thoughtful quality.
          </p>
        </div>

        {/* The Two Division Columns (Edge-to-Edge Architectural Split) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Division 1: Flair & Flavors */}
            <article className="flex flex-col bg-[#F2E2DC] overflow-hidden rounded-xs border border-[#E8D4CD]">
              <div className="relative aspect-[16/11] w-full bg-[#E5D2CB] overflow-hidden">
                <Image
                  src="/images/figma/b7b0629d6b.jpg"
                  alt="Flair & Flavors Banquet Dinner"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8 sm:p-12 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <span className="text-xs uppercase tracking-widest text-[#20211E]/70 font-medium block">
                    01 / EVENTS & HOSPITALITY
                  </span>
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0">
                      <Image
                        src="/images/ff-logo-transparent.png"
                        alt="Flair & Flavors Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="font-serif italic text-4xl sm:text-5xl lg:text-[52px] text-[#20211E] font-semibold leading-tight">
                      Flair <span className="text-[#B96F52]">&</span> Flavors
                    </h3>
                  </div>
                  <p className="text-base text-[#20211E]/80 leading-relaxed font-light">
                    From grand royal banquets and refined corporate galas to private tasting salons and bespoke celebration cakes, we transform intimate gatherings into sensory memories.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#E8D4CD]">
                  <Link
                    href="/flair-and-flavors"
                    className="inline-flex items-center gap-2 text-sm uppercase tracking-wider font-semibold text-[#20211E] hover:text-[#B96F52] underline underline-offset-8 decoration-[#B96F52]/60 transition"
                  >
                    <span>Discover the experience</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>

            {/* Division 2: Retail & Trading */}
            <article className="flex flex-col bg-[#F3F3EF] overflow-hidden rounded-xs border border-[#E2E2DC]">
              <div className="relative aspect-[16/11] w-full bg-[#CBD3CA] overflow-hidden">
                <Image
                  src="/images/figma/d8507e1ba3.jpg"
                  alt="Harmony Hub Curated Kitchenware & Cookware"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8 sm:p-12 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <span className="text-xs uppercase tracking-widest text-[#20211E]/70 font-medium block">
                    02 / CURATED LIVING & RETAIL
                  </span>
                  <h3 className="font-serif italic text-4xl sm:text-5xl lg:text-[52px] text-[#20211E] font-semibold leading-tight">
                    Retail <span className="text-[#B96F52]">&</span> Trading
                  </h3>
                  <p className="text-base text-[#20211E]/80 leading-relaxed font-light">
                    Thoughtfully selected products for your home, family, and personal wardrobe. Built with uncompromising durability, pure materials, and refined contemporary aesthetics.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#E2E2DC]">
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 text-sm uppercase tracking-wider font-semibold text-[#20211E] hover:text-[#B96F52] underline underline-offset-8 decoration-[#B96F52]/60 transition"
                  >
                    <span>Discover the collection</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 4. CURATED COMMISSIONS & GALAS (Asymmetric Editorial Masonry - 32:531) */}
      <section className="py-24 sm:py-32 bg-white border-t border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="mb-12">
            <span className="text-xs uppercase tracking-widest text-[#666D65] font-medium block mb-2">
              ARCHIVAL WORKS
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#20211E] font-normal">
              Curated Commissions <span className="italic text-[#B96F52]">&</span> Galas
            </h2>
          </div>

          {/* Asymmetric Gallery Grid with Square Corners (NO generic rounded cards!) */}
          <div className="space-y-6">
            {/* Top Row: Wide Left (Chafing dishes) + Tall Right (Calla Lily chairs) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 relative h-[360px] sm:h-[480px] lg:h-[540px] bg-[#EBE8E2] overflow-hidden">
                <Image
                  src="/images/figma/9593098a0f.jpg"
                  alt="Banqueting Chafing Dishes Buffet"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="lg:col-span-5 relative h-[360px] sm:h-[480px] lg:h-[540px] bg-[#EBE8E2] overflow-hidden">
                <Image
                  src="/images/figma/3e617fc5a6.jpg"
                  alt="Calla Lilly Chair Tie Floral Styling"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Bottom Row: Square Left (Black room cake) + Wide Right (Traditional reception) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5 relative h-[360px] sm:h-[440px] bg-[#EBE8E2] overflow-hidden">
                <Image
                  src="/images/figma/d2d65e47ba.jpg"
                  alt="Modern Dining Room with Celebration Cake"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="lg:col-span-7 relative h-[360px] sm:h-[440px] bg-[#EBE8E2] overflow-hidden">
                <Image
                  src="/images/figma/57b43e392b.jpg"
                  alt="Traditional Nigerian Wedding Banquet Marquee"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED PRODUCTS: “Handpicked for You” (Section C - 32:551) */}
      <section className="py-24 sm:py-32 bg-white border-t border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#666D65] font-medium block mb-2">
                CURATED COLLECTION
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl text-[#20211E] font-normal">
                Handpicked for You
              </h2>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-wider font-semibold text-[#183C32] hover:text-[#B96F52] transition group"
            >
              <span>View full shop</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 4-Column Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. “EVERY OCCASION, BEAUTIFULLY CONSIDERED” (Section 32:570) */}
      <section className="py-24 sm:py-32 bg-[#F7F6F4] border-t border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Sticky Editorial Column */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
              <span className="text-xs uppercase tracking-widest text-[#514F4D] font-medium block">
                FLAIR & FLAVORS
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-[54px] text-[#141414] font-normal leading-[1.1]">
                Every Occasion, <br />
                <span className="italic text-[#B96F52]">Beautifully Considered</span>
              </h2>
              <p className="font-manrope text-base text-[#8A8884] leading-relaxed font-normal">
                From the first idea to the final detail, we shape warm, personal gatherings with creative direction and professional care.
              </p>
              <div className="pt-4">
                <Link
                  href="/flair-and-flavors"
                  className="inline-flex items-center justify-center bg-[#183C32] hover:bg-[#122E26] text-white px-8 py-3.5 rounded-xs text-[15px] font-medium tracking-wide transition shadow-sm w-full sm:w-auto"
                >
                  View Our Portfolio
                </Link>
              </div>
            </div>

            {/* Right Photo Tiles (with bottom dark gradient overlay & white text) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Row 1: Tile 1 (wider) + Tile 2 (narrower) */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
                <div className="sm:col-span-7 relative h-72 sm:h-96 rounded-xs overflow-hidden group">
                  <Image
                    src="/images/figma/a87c966866.jpg"
                    alt="Catering by Flair & Flavors"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                    <span className="text-xs text-white/70 block mb-1">01</span>
                    <h3 className="font-serif text-2xl font-medium">Catering</h3>
                    <p className="text-xs sm:text-sm text-white/85 mt-1 font-light">
                      Menus designed around the character of your gathering.
                    </p>
                  </div>
                </div>

                <div className="sm:col-span-5 relative h-72 sm:h-96 rounded-xs overflow-hidden group">
                  <Image
                    src="/images/figma/50b8b5e557.jpg"
                    alt="Weddings & Celebrations"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                    <span className="text-xs text-white/70 block mb-1">02</span>
                    <h3 className="font-serif text-2xl font-medium">Weddings & Celebrations</h3>
                    <p className="text-xs sm:text-sm text-white/85 mt-1 font-light">
                      Considered details for meaningful moments.
                    </p>
                  </div>
                </div>
              </div>

              {/* Row 2: Tile 3 (narrower) + Tile 4 (wider) */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
                <div className="sm:col-span-5 relative h-72 sm:h-96 rounded-xs overflow-hidden group">
                  <Image
                    src="/images/figma/cfa582782f.jpg"
                    alt="Event Planning & Styling"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                    <span className="text-xs text-white/70 block mb-1">03</span>
                    <h3 className="font-serif text-2xl font-medium">Event Planning & Styling</h3>
                    <p className="text-xs sm:text-sm text-white/85 mt-1 font-light">
                      Creative direction and calm coordination.
                    </p>
                  </div>
                </div>

                <div className="sm:col-span-7 relative h-72 sm:h-96 rounded-xs overflow-hidden group">
                  <Image
                    src="/images/figma/57918bafa7.jpg"
                    alt="Cakes & Desserts Haute Patisserie"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                    <span className="text-xs text-white/70 block mb-1">04</span>
                    <h3 className="font-serif text-2xl font-medium">Cakes & Desserts</h3>
                    <p className="text-xs sm:text-sm text-white/85 mt-1 font-light">
                      Beautiful centrepieces and celebratory treats.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BRAND STORY: “More Than a Business. A Commitment to Quality.” (Section F - 32:620) */}
      <section className="py-24 sm:py-32 bg-white border-t border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Visual Story Collage */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-12 gap-4 items-center">
                {/* Main Large Founder Portrait */}
                <div className="col-span-8 relative aspect-[4/5] rounded-xs overflow-hidden shadow-lg">
                  <Image
                    src="/images/figma/4b8972c023.jpg"
                    alt="Olubunmi Folorunsho, Founder of Harmony Hub"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-[#B96F52] text-white p-3 sm:p-4 rounded-xs shadow-md">
                    <span className="font-serif text-2xl font-bold block leading-none">12+</span>
                    <span className="text-[10px] uppercase tracking-wider font-medium leading-tight block mt-1">
                      Years of Curated <br /> Living & Banquets
                    </span>
                  </div>
                </div>

                {/* Two Stacked Secondary Portraits */}
                <div className="col-span-4 space-y-4">
                  <div className="relative aspect-[4/5] rounded-xs overflow-hidden shadow-md">
                    <Image
                      src="/images/figma/313b95e940.jpg"
                      alt="Olubunmi Folorunsho in Royal Blue"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-[4/5] rounded-xs overflow-hidden shadow-md">
                    <Image
                      src="/images/figma/279ad1ad40.jpg"
                      alt="Olubunmi Folorunsho Standing"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Narrative Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#705B38]" />
                <span className="text-xs uppercase tracking-widest text-[#705B38] font-semibold">
                  HARMONY HUB
                </span>
              </div>

              <h2 className="font-serif text-4xl sm:text-5xl text-[#1C1C18] font-normal leading-[1.15]">
                More Than a Business. <br />
                <span className="italic text-[#705B38]">A Commitment</span> to Quality.
              </h2>

              <p className="text-base text-[#4D463C] leading-relaxed font-normal">
                Harmony Hub & Flair & Flavors was founded on the belief that life&apos;s most meaningful moments happen both around the grand celebration table and in the quiet, everyday routines of the home.
              </p>

              <p className="text-base text-[#4D463C] leading-relaxed font-normal">
                By unifying bespoke event hospitality with thoughtfully curated lifestyle products, we offer an enduring standard of beauty, reliability, and warmth under one trusted enterprise umbrella. Whether styling an unforgettable celebration or stocking your home with reliable craftware, our dedication to refinement remains absolute.
              </p>

              <div className="pt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 bg-[#12332D] hover:bg-[#183C32] text-white px-8 py-4 rounded-xs text-xs uppercase tracking-widest font-semibold transition shadow-sm group"
                >
                  <span>ABOUT THE FOUNDER</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. PRE-FOOTER CTA BANNER (ContactBanner - 32:654) */}
      <PreFooterCTA />
    </div>
  );
}
