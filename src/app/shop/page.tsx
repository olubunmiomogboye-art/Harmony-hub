"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { Search, Shield, Truck, RefreshCw, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { PRODUCTS, Product, CATEGORIES } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import PreFooterCTA from "@/components/PreFooterCTA";

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [categories, setCategories] = useState<{ id: string; label: string }[]>(CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [loading, setLoading] = useState(false);

  // Pagination State
  const [pageSize, setPageSize] = useState<number>(20);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Synchronize with backend database API
  useEffect(() => {
    let isMounted = true;
    async function loadLiveProducts() {
      try {
        setLoading(true);
        const [prodRes, catRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/categories")
        ]);

        if (prodRes.ok) {
          const data = await prodRes.json();
          if (isMounted && data.success && Array.isArray(data.data)) {
            setProducts(data.data);
          }
        }

        if (catRes.ok) {
          const catData = await catRes.json();
          if (isMounted && catData.success && Array.isArray(catData.data)) {
            const dynamicCats = [
              { id: "all", label: "All" },
              ...catData.data.map((c: any) => ({ id: c.slug, label: c.name })),
            ];
            setCategories(dynamicCats);
          }
        }
      } catch (e) {
        console.warn("Could not fetch live products, using cached seed:", e);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadLiveProducts();
    return () => {
      isMounted = false;
    };
  }, []);


  // Reset pagination to first page when filters or options change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, sortBy, pageSize]);

  const filteredProducts = useMemo(() => {
    return products.filter((product: Product) => {
      // Must be published for public shop
      if (product.isPublished === false) return false;

      // Category match
      const matchesCategory =
        selectedCategory === "all" || product.categorySlug === selectedCategory;

      // Search match
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        product.name.toLowerCase().includes(q) ||
        (product.subtitle && product.subtitle.toLowerCase().includes(q)) ||
        (product.shortDescription && product.shortDescription.toLowerCase().includes(q)) ||
        product.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        case "newest":
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });
  }, [products, selectedCategory, searchQuery, sortBy]);

  const totalProducts = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalProducts / pageSize));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const paginatedProducts = useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, safeCurrentPage, pageSize]);

  const startIdx = totalProducts === 0 ? 0 : (safeCurrentPage - 1) * pageSize + 1;
  const endIdx = Math.min(safeCurrentPage * pageSize, totalProducts);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    const catalogEl = document.getElementById("catalog");
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="bg-white">
      {/* 1. HERO SECTION (Figma 32:815) */}
      <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center overflow-hidden bg-[#F8F9FA]">
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
                Quality Essentials for <br />
                <span className="italic text-[#B96F52]">Your Home & Family</span>
              </h1>

              <p className="text-base sm:text-lg text-[#20211E]/80 leading-relaxed max-w-xl font-normal">
                Explore our collection of durable cookware, practical kitchen utensils, gentle baby items, and stylish fashion pieces—carefully selected to serve you reliably every single day.
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
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xs text-xs uppercase tracking-wider font-semibold transition ${
                  selectedCategory === cat.id
                    ? "bg-[#183C32] text-white"
                    : "bg-[#F7F6F4] text-[#20211E] hover:bg-[#EAE8E3] border border-[#E5E5E5]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-[#8A8884]">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#705B38]" />
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#F7F6F4] border border-[#E5E5E5] px-3 py-1.5 rounded-xs text-xs font-medium text-[#20211E] focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Count Indicator & Page Size Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#8A8884] mb-8 pb-3 border-b border-[#F0ECE1]">
          <div className="flex items-center gap-3">
            <span>
              Showing{" "}
              <strong className="text-[#20211E]">
                {totalProducts === 0 ? "0" : `${startIdx}–${endIdx}`}
              </strong>{" "}
              of <strong className="text-[#20211E]">{totalProducts}</strong> products
            </span>
            {loading && (
              <span className="flex items-center gap-1.5 text-[11px] text-[#705B38]">
                <RefreshCw className="w-3 h-3 animate-spin" />
                <span>Updating...</span>
              </span>
            )}
          </div>

          {/* Page Size Option (20 or 30 per page) */}
          <div className="flex items-center gap-2">
            <span className="text-[#8A8884] text-[11px] uppercase tracking-wider font-semibold">
              Per page:
            </span>
            <div className="inline-flex rounded-xs border border-[#E5E5E5] bg-white p-0.5">
              <button
                type="button"
                onClick={() => setPageSize(20)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-[2px] transition ${
                  pageSize === 20
                    ? "bg-[#183C32] text-white shadow-xs"
                    : "text-[#666D65] hover:text-[#20211E]"
                }`}
              >
                20
              </button>
              <button
                type="button"
                onClick={() => setPageSize(30)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-[2px] transition ${
                  pageSize === 30
                    ? "bg-[#183C32] text-white shadow-xs"
                    : "text-[#666D65] hover:text-[#20211E]"
                }`}
              >
                30
              </button>
            </div>
          </div>
        </div>

        {/* 4-Column Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Numbered Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#F0ECE1]">
            <p className="text-xs text-[#8A8884]">
              Page <strong className="text-[#20211E]">{safeCurrentPage}</strong> of{" "}
              <strong className="text-[#20211E]">{totalPages}</strong>
            </p>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handlePageChange(safeCurrentPage - 1)}
                disabled={safeCurrentPage === 1}
                aria-label="Previous page"
                className={`flex items-center gap-1 px-3 py-2 rounded-xs border text-xs font-semibold transition ${
                  safeCurrentPage === 1
                    ? "border-[#E5E5E5] text-gray-300 bg-gray-50 cursor-not-allowed"
                    : "border-[#E5E5E5] text-[#20211E] bg-white hover:border-[#183C32] hover:text-[#183C32] cursor-pointer"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              {/* Numbered page buttons */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-9 h-9 rounded-xs border text-xs font-semibold transition flex items-center justify-center cursor-pointer ${
                    safeCurrentPage === pageNum
                      ? "bg-[#183C32] text-white border-[#183C32] shadow-xs"
                      : "border-[#E5E5E5] text-[#20211E] bg-white hover:border-[#183C32] hover:text-[#183C32]"
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                type="button"
                onClick={() => handlePageChange(safeCurrentPage + 1)}
                disabled={safeCurrentPage === totalPages}
                aria-label="Next page"
                className={`flex items-center gap-1 px-3 py-2 rounded-xs border text-xs font-semibold transition ${
                  safeCurrentPage === totalPages
                    ? "border-[#E5E5E5] text-gray-300 bg-gray-50 cursor-not-allowed"
                    : "border-[#E5E5E5] text-[#20211E] bg-white hover:border-[#183C32] hover:text-[#183C32] cursor-pointer"
                }`}
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-24 bg-[#F7F6F4] rounded-xs border border-dashed border-[#DCDDD4]">
            <p className="font-serif text-2xl text-[#20211E]">No products found</p>
            <p className="text-sm text-[#8A8884] mt-2">
              Try adjusting your search criteria or selecting another category.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
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
                Dependable Quality
              </h3>
              <p className="text-xs sm:text-sm text-[#666D65] leading-relaxed">
                We carefully inspect and select every item we stock, ensuring durable materials, safe use for your family, and honest value for your money.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xs border border-[#E5E5E5] space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#F7F4EC] flex items-center justify-center text-[#B96F52]">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#20211E]">
                Delivery in Ibadan & Nationwide
              </h3>
              <p className="text-xs sm:text-sm text-[#666D65] leading-relaxed">
                Reliable doorstep delivery across Ibadan, Lagos, and every state in Nigeria. We keep you informed until your order arrives safely.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xs border border-[#E5E5E5] space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#F7F4EC] flex items-center justify-center text-[#B96F52]">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#20211E]">
                Attentive Customer Care
              </h3>
              <p className="text-xs sm:text-sm text-[#666D65] leading-relaxed">
                Have questions about sizes, colours, or how to use a product? We are just a WhatsApp message away to help you make the right choice.
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
