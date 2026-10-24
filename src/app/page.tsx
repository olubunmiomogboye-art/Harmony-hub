import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { getFeaturedProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import PreFooterCTA from "@/components/PreFooterCTA";

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="space-y-24 sm:space-y-32 pb-12">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#B96F52] font-semibold bg-[#EEF1E9] px-3.5 py-1.5 rounded-full border border-[#DCDDD4]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Premier Hospitality & Curated Retail • Ibadan</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#183C32] font-normal leading-[1.1] tracking-tight">
                For the moments you host.{" "}
                <span className="italic font-normal text-[#B96F52] block mt-1">
                  And the life you live.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed max-w-xl font-light">
                From unforgettable celebrations and exceptional catering to thoughtfully selected products for everyday living, discover everything we bring together under one trusted brand.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center bg-[#183C32] hover:bg-[#B96F52] text-white px-8 py-4 rounded-xs text-sm font-medium tracking-wide transition shadow-sm group"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/flair-and-flavors"
                  className="inline-flex items-center justify-center bg-transparent border border-[#183C32] text-[#183C32] hover:bg-[#183C32] hover:text-white px-8 py-4 rounded-xs text-sm font-medium tracking-wide transition"
                >
                  Plan Your Event
                </Link>
              </div>

              {/* Little quote note */}
              <div className="pt-4 border-t border-[#DCDDD4] flex items-center gap-4 text-xs text-[#666D65]">
                <div className="relative w-12 h-12 rounded-xs overflow-hidden shrink-0 border border-[#DCDDD4]">
                  <Image
                    src="/images/products/container.jpg"
                    alt="Everyday curated living"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="italic font-serif text-sm text-[#183C32]">
                  &ldquo;Architecture in taste, drama in atmosphere, timelessness in memory.&rdquo;
                </p>
              </div>
            </div>

            {/* Right Diamond Visual Composition */}
            <div className="lg:col-span-6 relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative h-64 sm:h-80 rounded-xs overflow-hidden shadow-md">
                    <Image
                      src="/images/events/white-wedding.jpg"
                      alt="Luxury Wedding Setup"
                      fill
                      priority
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="relative h-48 sm:h-60 rounded-xs overflow-hidden shadow-md">
                    <Image
                      src="/images/events/chair-decor.jpg"
                      alt="Calla Lilly floral chair styling"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-8">
                  <div className="relative h-48 sm:h-60 rounded-xs overflow-hidden shadow-md">
                    <Image
                      src="/images/events/reception-stage.jpg"
                      alt="Bespoke Celebration Stage"
                      fill
                      priority
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="relative h-64 sm:h-80 rounded-xs overflow-hidden shadow-md">
                    <Image
                      src="/images/events/cake.jpg"
                      alt="Haute Patisserie Celebration Cake"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUOTE / VALUES BANNER */}
      <section className="bg-[#183C32] text-white py-12 border-y border-[#26423A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <p className="font-serif italic text-lg sm:text-xl text-[#EEF1E9] max-w-xl">
            &ldquo;Where warm Nigerian hospitality meets refined contemporary living.&rdquo;
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs uppercase tracking-widest text-[#E5B59C] font-semibold">
            <span>Banqueting</span>
            <span>•</span>
            <span>Scenography</span>
            <span>•</span>
            <span>Haute Patisserie</span>
            <span>•</span>
            <span>Curated Retail</span>
          </div>
        </div>
      </section>

      {/* 3. TWO DIVISIONS: FLAIR & FLAVORS + RETAIL & TRADING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#B96F52] font-bold">
            DISCOVER OUR BUSINESSES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#183C32]">
            Different needs, met with{" "}
            <span className="italic text-[#B96F52]">the same care.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#666D65] font-light max-w-xl mx-auto leading-relaxed">
            Move seamlessly between celebration services and a curated retail catalogue—each with its own focus, connected by one enterprise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Flair & Flavors */}
          <div className="bg-[#EEF1E9] rounded-xs overflow-hidden border border-[#DCDDD4] flex flex-col justify-between group">
            <div className="relative h-72 sm:h-80 w-full overflow-hidden">
              <Image
                src="/images/events/trad-wedding.jpg"
                alt="Flair & Flavors Events & Hospitality"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs px-3 py-1 text-[11px] uppercase tracking-wider font-semibold text-[#183C32]">
                01 / Events & Hospitality
              </div>
            </div>
            <div className="p-8 sm:p-10 space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#183C32]">
                  Flair & Flavors
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed mt-3">
                  From grand royal banquets and refined corporate galas to private tasting salons and bespoke celebration cakes, we transform intimate gatherings into sensory memories.
                </p>
              </div>
              <div className="pt-4">
                <Link
                  href="/flair-and-flavors"
                  className="inline-flex items-center text-xs uppercase tracking-widest font-semibold text-[#183C32] group-hover:text-[#B96F52] transition"
                >
                  <span>Discover the experience</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2: Retail & Trading */}
          <div className="bg-[#EEF1E9] rounded-xs overflow-hidden border border-[#DCDDD4] flex flex-col justify-between group">
            <div className="relative h-72 sm:h-80 w-full overflow-hidden">
              <Image
                src="/images/products/cookware-set.jpg"
                alt="Retail & Trading Curated Products"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs px-3 py-1 text-[11px] uppercase tracking-wider font-semibold text-[#183C32]">
                02 / Retail & Curated Living
              </div>
            </div>
            <div className="p-8 sm:p-10 space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#183C32]">
                  Retail & Trading
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed mt-3">
                  Thoughtfully selected products for your home, family, and personal wardrobe. Built with uncompromising durability, pure materials, and refined contemporary aesthetics.
                </p>
              </div>
              <div className="pt-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center text-xs uppercase tracking-widest font-semibold text-[#183C32] group-hover:text-[#B96F52] transition"
                >
                  <span>Browse the catalogue</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ARCHIVAL WORKS: CURATED COMMISSIONS & GALAS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#B96F52] font-bold block mb-1">
              ARCHIVAL WORKS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#183C32]">
              Curated Commissions & Galas
            </h2>
          </div>
          <Link
            href="/flair-and-flavors"
            className="inline-flex items-center text-xs uppercase tracking-widest font-semibold text-[#183C32] hover:text-[#B96F52] transition"
          >
            <span>View Full Portfolio</span>
            <ArrowRight className="w-3.5 h-3.5 ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-6 relative h-80 sm:h-96 rounded-xs overflow-hidden group">
            <Image
              src="/images/events/small-chops.jpg"
              alt="Bespoke Gourmet Catering"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
              <div className="text-white">
                <p className="text-xs uppercase tracking-widest text-[#E5B59C] font-medium">Banqueting & Small Chops</p>
                <h4 className="font-serif text-xl sm:text-2xl mt-1">Rich Nigerian Flavours & Delicate Canapés</h4>
              </div>
            </div>
          </div>

          <div className="md:col-span-6 relative h-80 sm:h-96 rounded-xs overflow-hidden group">
            <Image
              src="/images/events/fabric-backdrop.jpg"
              alt="Ethereal Fabric Wedding Backdrop"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
              <div className="text-white">
                <p className="text-xs uppercase tracking-widest text-[#E5B59C] font-medium">Scenography & Backdrops</p>
                <h4 className="font-serif text-xl sm:text-2xl mt-1">Sculptural Fabric Altars & Outdoor Stages</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED PRODUCTS: HANDPICKED FOR YOU */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#B96F52] font-bold block mb-1">
              FEATURED PRODUCTS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#183C32]">
              Handpicked for You
            </h2>
            <p className="text-sm text-[#666D65] font-light mt-1">
              Discover quality essentials selected for your home, family, and elevated lifestyle.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center text-xs uppercase tracking-widest font-semibold text-[#183C32] hover:text-[#B96F52] transition"
          >
            <span>View All Products</span>
            <ArrowRight className="w-3.5 h-3.5 ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. SERVICES OVERVIEW (FLAIR & FLAVORS) */}
      <section className="bg-[#EEF1E9] py-20 border-y border-[#DCDDD4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#B96F52] font-bold">
                FLAIR & FLAVORS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#183C32]">
                Every Occasion,{" "}
                <span className="italic text-[#B96F52]">Beautifully Considered</span>
              </h2>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                From the first idea to the final detail, we shape warm, personal gatherings with creative direction and professional care.
              </p>
              <div className="pt-2">
                <Link
                  href="/flair-and-flavors"
                  className="inline-flex items-center justify-center bg-[#183C32] hover:bg-[#B96F52] text-white px-6 py-3 rounded-xs text-xs uppercase tracking-widest font-semibold transition"
                >
                  View Our Portfolio
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Service 1 */}
              <div className="bg-white p-6 rounded-xs border border-[#DCDDD4] space-y-2">
                <span className="text-xs font-mono text-[#B96F52] font-bold">01</span>
                <h4 className="font-serif text-xl text-[#183C32]">Catering</h4>
                <p className="text-xs text-[#666D65] leading-relaxed">
                  Menus designed around the character of your gathering, from traditional celebratory dishes to contemporary banquets.
                </p>
              </div>

              {/* Service 2 */}
              <div className="bg-white p-6 rounded-xs border border-[#DCDDD4] space-y-2">
                <span className="text-xs font-mono text-[#B96F52] font-bold">02</span>
                <h4 className="font-serif text-xl text-[#183C32]">Weddings & Celebrations</h4>
                <p className="text-xs text-[#666D65] leading-relaxed">
                  Considered details and tranquil coordination for your life&apos;s most meaningful milestones.
                </p>
              </div>

              {/* Service 3 */}
              <div className="bg-white p-6 rounded-xs border border-[#DCDDD4] space-y-2">
                <span className="text-xs font-mono text-[#B96F52] font-bold">03</span>
                <h4 className="font-serif text-xl text-[#183C32]">Event Planning & Styling</h4>
                <p className="text-xs text-[#666D65] leading-relaxed">
                  Creative direction, vendor harmony, and calm execution from concept to celebration day.
                </p>
              </div>

              {/* Service 4 */}
              <div className="bg-white p-6 rounded-xs border border-[#DCDDD4] space-y-2">
                <span className="text-xs font-mono text-[#B96F52] font-bold">04</span>
                <h4 className="font-serif text-xl text-[#183C32]">Cakes & Desserts</h4>
                <p className="text-xs text-[#666D65] leading-relaxed">
                  Spectacular artisanal centerpieces and celebratory confections baked with genuine passion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FOUNDER / ABOUT PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Photos */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="relative h-80 sm:h-96 rounded-xs overflow-hidden shadow-md">
              <Image
                src="/images/founder/founder-main.jpg"
                alt="Olubunmi Folorunsho, Founder of Harmony Hub"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-[#183C32]/90 backdrop-blur-xs text-white p-3 rounded-xs text-center border border-white/10">
                <span className="block text-xl font-serif font-bold text-[#E5B59C]">12+</span>
                <span className="text-[10px] uppercase tracking-wider text-gray-300">
                  Years of Curated Living & Banquets
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="relative h-44 sm:h-48 rounded-xs overflow-hidden shadow-sm">
                <Image
                  src="/images/founder/founder-blue.jpg"
                  alt="Founder in royal blue Aso-Oke"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-44 sm:h-48 rounded-xs overflow-hidden shadow-sm">
                <Image
                  src="/images/founder/founder-red.jpg"
                  alt="Founder in red traditional attire"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#B96F52] font-bold">
              HARMONY HUB
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#183C32] leading-tight">
              More Than a Business.{" "}
              <span className="italic text-[#B96F52] block">
                A Commitment to Quality.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
              Harmony Hub was founded on the belief that life&apos;s most meaningful moments happen both around the grand celebration table and in the quiet, everyday routines of the home.
            </p>
            <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
              By unifying bespoke event hospitality with thoughtfully curated lifestyle products, we offer an enduring standard of beauty, reliability, and warmth under one trusted enterprise umbrella.
            </p>
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center justify-center bg-[#183C32] hover:bg-[#B96F52] text-white px-8 py-3.5 rounded-xs text-xs uppercase tracking-widest font-semibold transition"
              >
                <span>About the Founder</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. PRE-FOOTER CTA */}
      <PreFooterCTA />
    </div>
  );
}
