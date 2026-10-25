"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Search, Shield, Truck, RefreshCw } from "lucide-react";
import { PRODUCTS, Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import PreFooterCTA from "@/components/PreFooterCTA";

const CATEGORIES: { label: string; value: string }[] = [
  { label: "All", value: "All" },
  { label: "Kitchen Utensils", value: "Kitchenware" },
  { label: "Baby things", value: "Mother & Baby" },
  { label: "Womens' Fashion", value: "Fashion & Lifestyle" },
  { label: "Childrens' outfits", value: "Children" },
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product: Product) => {
      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory ||
        (selectedCategory === "Children" &&
          (product.category.includes("Child") || product.name.includes("Skirt") || product.name.includes("Kid")));

      const matchesSearch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="bg-white">
      {/* 1. HERO SECTION (Figma 32:815) */}
      <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center overflow-hidden bg-[#F8F9FA]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/figma/7f58801bb0.jpg"
            alt="Harmony Hub Curated Living"
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
                Curated Essentials for <br />
                <span className="italic text-[#B96F52]">Elevated Living</span>
              </h1>

              <p className="text-base sm:text-lg text-[#20211E]/80 leading-relaxed max-w-xl font-normal">
                Discover enduring chef-grade kitchenware, delicate mother & baby formulations, structured leathercraft, and artisanal footwear thoughtfully assembled under our quiet luxury standard.
              </p>

              <div className="pt-2">
                <a
                  href="#catalog"
                  className="inline-flex items-center justify-center bg-[#183C32] hover:bg-[#122E26] text-white px-8 py-4 rounded-xs text-[15px] font-medium tracking-wide transition shadow-sm"
                >
                  Browse Categories
                </a>
              </div>
            </div>

            {/* Right Hero Graphic: Hexagon Retail Cutout */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[480px] aspect-[1222/1563]">
                <Image
                  src="/images/uploaded/shop-hero-retail.png"
                  alt="Harmony Hub Retail Collection - Fashion, Baby, Kitchenware"
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

      {/* 2. PRODUCT CATALOGUE SECTION */}
      <section id="catalog" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E5E5E5]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-[1px] bg-[#B96F52]" />
              <span className="text-xs uppercase tracking-widest text-[#B96F52] font-semibold">
                PRODUCT CATALOGUE
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#20211E] font-normal">
              Browse the collection
            </h2>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#8A8884] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F7F6F4] border border-[#E5E5E5] pl-10 pr-4 py-2.5 text-sm text-[#20211E] rounded-xs focus:outline-none focus:border-[#183C32] transition"
            />
          </div>
        </div>

        {/* Filter Pills and Sort Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-6">
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-xs text-xs uppercase tracking-wider font-semibold transition ${
                  selectedCategory === cat.value
                    ? "bg-[#183C32] text-white"
                    : "bg-[#F7F6F4] text-[#20211E] hover:bg-[#EAE8E3] border border-[#E5E5E5]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-[#8A8884]">
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#F7F6F4] border border-[#E5E5E5] px-3 py-1.5 rounded-xs text-xs font-medium text-[#20211E] focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Placeholder disclaimer note matching Figma */}
        <p className="text-xs text-[#8A8884] italic mb-8">
          Catalogue images, product names, pricing and availability are sample placeholders only.
        </p>

        {/* 4-Column Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-24 bg-[#F7F6F4] rounded-xs border border-dashed border-[#DCDDD4]">
            <p className="font-serif text-2xl text-[#20211E]">No products found</p>
            <p className="text-sm text-[#8A8884] mt-2">
              Try adjusting your search criteria or selecting another category.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 text-xs uppercase tracking-wider font-semibold text-[#183C32] underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* 3. THREE TRUST PILLARS (Figma 32:815) */}
      <section className="py-16 bg-[#F7F6F4] border-t border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 sm:p-8 rounded-xs border border-[#E5E5E5] space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#F7F4EC] flex items-center justify-center text-[#B96F52]">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#20211E]">
                Ethically Sourced Materials
              </h3>
              <p className="text-xs sm:text-sm text-[#666D65] leading-relaxed">
                Every kitchenware alloy, dermatological extract, and certified leather skin adheres to audited non-toxic production standards.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xs border border-[#E5E5E5] space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#F7F4EC] flex items-center justify-center text-[#B96F52]">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#20211E]">
                Direct Lagos & Nationwide
              </h3>
              <p className="text-xs sm:text-sm text-[#666D65] leading-relaxed">
                Expedited white-glove courier dispatch across Ibadan, Lagos State, and nationwide with real-time order tracking.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xs border border-[#E5E5E5] space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#F7F4EC] flex items-center justify-center text-[#B96F52]">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#20211E]">
                Seamless Concierge Exchanges
              </h3>
              <p className="text-xs sm:text-sm text-[#666D65] leading-relaxed">
                7-day direct sizing replacements for footwear and personal assistance on cookware maintenance from our studio team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRE-FOOTER CTA BANNER */}
      <PreFooterCTA />
    </div>
  );
}
