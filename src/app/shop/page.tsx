"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Search, SlidersHorizontal, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { getAllProducts, CATEGORIES } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import PreFooterCTA from "@/components/PreFooterCTA";

export default function ShopPage() {
  const allProducts = useMemo(() => getAllProducts(), []);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high" | "name">("featured");

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((product) => {
        const matchesCategory =
          selectedCategory === "all" || product.categorySlug === selectedCategory;

        const matchesSearch =
          searchQuery.trim() === "" ||
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "name") return a.name.localeCompare(b.name);
        // default featured
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
  }, [allProducts, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="space-y-16 sm:space-y-24 pb-12">
      {/* 1. SHOP HERO BANNER */}
      <section className="bg-[#F7F4EC] pt-12 sm:pt-16 pb-12 border-b border-[#DCDDD4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#B96F52] font-bold">
                RETAIL & CURATED LIVING
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#183C32] leading-tight">
                Curated Essentials for{" "}
                <span className="italic text-[#B96F52]">Elevated Living</span>
              </h1>
              <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed max-w-xl font-light">
                Discover enduring chef-grade kitchenware, delicate mother & baby formulations, structured leathercraft, and artisanal footwear thoughtfully assembled under our quiet luxury standard.
              </p>
            </div>

            <div className="lg:col-span-5 grid grid-cols-3 gap-3">
              <div className="relative aspect-3/4 rounded-xs overflow-hidden shadow-sm">
                <Image
                  src="/images/products/container.jpg"
                  alt="Kitchenware"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-3/4 rounded-xs overflow-hidden shadow-sm">
                <Image
                  src="/images/products/camel-bag.jpg"
                  alt="Leathercraft"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-3/4 rounded-xs overflow-hidden shadow-sm">
                <Image
                  src="/images/products/baby-romper.jpg"
                  alt="Mother & Baby"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATALOGUE CONTROLS & PRODUCT GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="space-y-6">
          {/* Header & Search */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#DCDDD4]">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#666D65] font-semibold block mb-1">
                PRODUCT CATALOGUE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#183C32]">
                Browse the collection
              </h2>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#D1C7B7] pl-10 pr-4 py-2.5 text-sm text-[#183C32] placeholder-[#9CA3AF] rounded-xs focus:outline-none focus:border-[#183C32] transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#9CA3AF] hover:text-[#183C32]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Filter Pills & Sort Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Category pills */}
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-xs text-xs font-semibold tracking-wider transition uppercase ${
                      isActive
                        ? "bg-[#183C32] text-white shadow-xs"
                        : "bg-white text-[#4B5563] border border-[#DCDDD4] hover:border-[#183C32] hover:text-[#183C32]"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#666D65]" />
              <span className="text-[#666D65]">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort products"
                className="bg-white border border-[#D1C7B7] text-[#183C32] font-medium py-1.5 px-3 rounded-xs focus:outline-none focus:border-[#183C32]"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Product Name (A - Z)</option>
              </select>
            </div>
          </div>

          {/* Catalog Disclaimer Notice */}
          <div className="bg-[#F7F4EC] border border-[#DCDDD4] p-3 rounded-xs text-xs text-[#666D65] italic">
            Catalogue images, product names, pricing and availability are sample placeholders. When real inventory is updated, all listings, bag items, and WhatsApp orders synchronize automatically.
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xs border border-[#DCDDD4] space-y-4">
              <p className="font-serif text-2xl text-[#183C32]">
                No matching products found
              </p>
              <p className="text-sm text-[#666D65] max-w-sm mx-auto">
                Try searching for different terms or reset your active filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="bg-[#183C32] text-white px-6 py-2.5 rounded-xs text-xs uppercase tracking-wider font-semibold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. TRUST PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-[#DCDDD4]">
          <div className="bg-white p-6 rounded-xs border border-[#DCDDD4] flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#EEF1E9] flex items-center justify-center shrink-0 text-[#B96F52]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif text-lg font-semibold text-[#183C32]">
                Ethically Sourced Materials
              </h4>
              <p className="text-xs text-[#666D65] leading-relaxed">
                Every kitchenware alloy, dermatological extract, and certified leather adheres to audited quality standards.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xs border border-[#DCDDD4] flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#EEF1E9] flex items-center justify-center shrink-0 text-[#B96F52]">
              <Truck className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif text-lg font-semibold text-[#183C32]">
                Direct Ibadan & Nationwide
              </h4>
              <p className="text-xs text-[#666D65] leading-relaxed">
                Expedited door-to-door courier dispatch across Ibadan, Lagos, and throughout Nigeria.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xs border border-[#DCDDD4] flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#EEF1E9] flex items-center justify-center shrink-0 text-[#B96F52]">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif text-lg font-semibold text-[#183C32]">
                Seamless Concierge Support
              </h4>
              <p className="text-xs text-[#666D65] leading-relaxed">
                Dedicated personal assistance on sizing, cookware maintenance, and orders from our concierge team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRE-FOOTER CTA */}
      <PreFooterCTA />
    </div>
  );
}
