"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { formatNaira } from "@/lib/formatters";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

const getBadgeStyle = (category: string, badge?: string) => {
  const cat = (badge || category).toLowerCase();
  if (cat.includes("kitchen") || cat.includes("cookware") || cat.includes("utensil")) {
    return "bg-[#DC2626] text-white";
  }
  if (cat.includes("baby")) {
    return "bg-[#2563EB] text-white";
  }
  if (cat.includes("women") || cat.includes("fashion") || cat.includes("dress")) {
    return "bg-[#DB2777] text-white";
  }
  if (cat.includes("child") || cat.includes("skirt") || cat.includes("outfit")) {
    return "bg-[#65A30D] text-white";
  }
  return "bg-[#183C32] text-white";
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const badgeLabel = product.badge || product.category;

  return (
    <div className="group flex flex-col bg-white border border-[#E5E5E5] hover:border-[#183C32] rounded-xs overflow-hidden transition-all duration-300 hover:shadow-md">
      {/* Product Image Link */}
      <Link
        href={`/shop/${product.id}`}
        className="relative aspect-square w-full bg-[#F9F9F8] overflow-hidden block"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <span
          className={`absolute top-2.5 left-2.5 text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-[2px] ${getBadgeStyle(
            product.category,
            product.badge
          )}`}
        >
          {badgeLabel}
        </span>
      </Link>

      {/* Product Info (Matching Figma 13:82) */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-[#8A8884] font-medium block">
            {product.category}
          </span>

          <Link href={`/shop/${product.id}`} className="block group-hover:text-[#B96F52] transition">
            <h3 className="font-sans text-sm sm:text-[15px] font-bold text-[#20211E] line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {product.subtitle ? (
            <p className="text-xs text-[#8A8884] line-clamp-1">{product.subtitle}</p>
          ) : (
            <p className="text-xs text-[#8A8884] line-clamp-1">{product.shortDescription}</p>
          )}

          <div className="font-sans text-base sm:text-lg font-bold text-[#20211E] pt-1">
            {formatNaira(product.price)}
          </div>
        </div>

        {/* Action Button: ADD TO CART */}
        <button
          onClick={() => addToCart(product, 1)}
          aria-label={`Add ${product.name} to bag`}
          className="w-full py-2.5 text-[11px] uppercase tracking-widest font-semibold text-[#20211E] hover:text-white border border-[#DCDDD4] hover:border-[#183C32] hover:bg-[#183C32] rounded-xs transition bg-white"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}
