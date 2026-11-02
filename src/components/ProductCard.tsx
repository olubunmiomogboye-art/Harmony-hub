"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { formatNaira } from "@/lib/formatters";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

const getBadgeStyle = (category: string, badge?: string) => {
  if (badge) {
    if (badge.toLowerCase().includes("bestseller")) return "bg-[#183C32] text-white";
    if (badge.toLowerCase().includes("popular")) return "bg-[#705B38] text-white";
    if (badge.toLowerCase().includes("exclusive")) return "bg-[#4C1C17] text-white";
    if (badge.toLowerCase().includes("essential")) return "bg-[#2563EB] text-white";
  }

  const cat = category.toLowerCase();
  if (cat.includes("kitchen")) {
    return "bg-[#DC2626] text-white";
  }
  if (cat.includes("baby")) {
    return "bg-[#2563EB] text-white";
  }
  if (cat.includes("adult")) {
    return "bg-[#705B38] text-white";
  }
  if (cat.includes("children")) {
    return "bg-[#65A30D] text-white";
  }
  return "bg-[#183C32] text-white";
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const badgeLabel = product.badge || product.category;
  const isOutOfStock = !product.inStock;

  return (
    <div
      className={`group flex flex-col bg-white border rounded-xs overflow-hidden transition-all duration-300 hover:shadow-md ${
        isOutOfStock
          ? "border-[#E5E5E5] opacity-85"
          : "border-[#E5E5E5] hover:border-[#183C32]"
      }`}
    >
      {/* Product Image Link */}
      <Link
        href={`/shop/${product.id}`}
        className="relative aspect-square w-full bg-[#F9F9F8] overflow-hidden block"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          unoptimized={product.image?.startsWith("data:") || product.image?.startsWith("blob:") ? true : undefined}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
          loading="lazy"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Category Badge */}
        <span
          className={`absolute top-2.5 left-2.5 text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-[2px] ${getBadgeStyle(
            product.category,
            product.badge
          )}`}
        >
          {badgeLabel}
        </span>

        {/* Out of Stock Overlay Badge */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/35 flex items-center justify-center p-2">
            <span className="bg-red-700/90 text-white text-[10px] sm:text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-xs shadow-md">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* Product Info */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-[#8A8884] font-medium block">
            {product.category}
          </span>

          <Link href={`/shop/${product.id}`} className="block group-hover:text-[#705B38] transition">
            <h3 className="font-sans text-sm sm:text-[15px] font-bold text-[#20211E] line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {product.subtitle ? (
            <p className="text-xs text-[#8A8884] line-clamp-1">{product.subtitle}</p>
          ) : (
            <p className="text-xs text-[#8A8884] line-clamp-1">{product.shortDescription}</p>
          )}

          {/* Sizes preview if present */}
          {product.sizes && product.sizes.length > 0 && (
            <p className="text-[10px] text-[#705B38] line-clamp-1">
              Sizes: {product.sizes.join(", ")}
            </p>
          )}

          {/* Price & Color dots */}
          <div className="font-sans text-base sm:text-lg font-bold text-[#20211E] pt-1 flex items-center justify-between">
            <span>{formatNaira(product.price)}</span>
            {product.colors && product.colors.length > 0 && (
              <div className="flex items-center gap-1" title={product.colors.map(c => c.name).join(", ")}>
                {product.colors.slice(0, 4).map((c) => (
                  <span
                    key={c.name}
                    className="w-2.5 h-2.5 rounded-full border border-black/15 shrink-0"
                    style={{ backgroundColor: c.hex || "#DCDDD4" }}
                  />
                ))}
                {product.colors.length > 4 && (
                  <span className="text-[9px] text-[#8A8884]">+{product.colors.length - 4}</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action Button: ADD TO CART / OUT OF STOCK */}
        {isOutOfStock ? (
          <button
            disabled
            className="w-full py-2.5 text-[11px] uppercase tracking-widest font-semibold text-gray-400 bg-gray-100 border border-gray-200 rounded-xs cursor-not-allowed"
          >
            Out of Stock
          </button>
        ) : (product.colors && product.colors.length > 0) || (product.sizes && product.sizes.length > 1) ? (
          <Link
            href={`/shop/${product.id}`}
            className="w-full py-2.5 text-center text-[11px] uppercase tracking-widest font-semibold text-[#20211E] hover:text-white border border-[#DCDDD4] hover:border-[#183C32] hover:bg-[#183C32] rounded-xs transition bg-white block"
          >
            Select Options
          </Link>
        ) : (
          <button
            onClick={() => addToCart(product, 1)}
            aria-label={`Add ${product.name} to bag`}
            className="w-full py-2.5 text-[11px] uppercase tracking-widest font-semibold text-[#20211E] hover:text-white border border-[#DCDDD4] hover:border-[#183C32] hover:bg-[#183C32] rounded-xs transition bg-white"
          >
            ADD TO CART
          </button>
        )}
      </div>
    </div>
  );
}
