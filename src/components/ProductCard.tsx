"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Product } from "@/data/products";
import { formatNaira } from "@/lib/formatters";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="group flex flex-col bg-white border border-[#DCDDD4] hover:border-[#183C32] rounded-xs overflow-hidden transition-all duration-300 hover:shadow-md">
      {/* Product Image Link */}
      <Link
        href={`/shop/${product.id}`}
        className="relative aspect-square w-full bg-[#EEF1E9] overflow-hidden block"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-[#183C32] text-[#F7F4EC] text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-xs">
            {product.badge}
          </span>
        )}
      </Link>

      {/* Product Info */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#B96F52] font-semibold mb-1">
            <span>{product.category}</span>
            {product.subtitle && (
              <span className="text-[#666D65] font-normal normal-case">
                {product.subtitle}
              </span>
            )}
          </div>

          <Link href={`/shop/${product.id}`} className="block group-hover:text-[#B96F52] transition">
            <h3 className="font-serif text-base sm:text-lg font-medium text-[#183C32] line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-[#666D65] line-clamp-2 mt-1.5 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Pricing and Action */}
        <div className="pt-2 border-t border-[#EEF1E9] flex items-center justify-between">
          <div className="font-serif text-lg font-bold text-[#183C32]">
            {formatNaira(product.price)}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            aria-label={`Add ${product.name} to bag`}
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#183C32] hover:text-[#F7F4EC] border border-[#DCDDD4] hover:border-[#183C32] px-3 py-1.5 rounded-xs transition bg-[#F7F4EC] hover:bg-[#183C32]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>
    </div>
  );
}
