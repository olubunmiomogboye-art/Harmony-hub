"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ArrowRight, ShoppingBag, ArrowLeft, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatNaira } from "@/lib/formatters";
import QuantitySelector from "@/components/QuantitySelector";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, clearCart, subtotal, totalItems } =
    useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-12">
      {/* Page Header */}
      <div className="border-b border-[#DCDDD4] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#B96F52] font-bold">
            RETAIL & LIVING
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#183C32] mt-1">
            Shopping Bag
          </h1>
        </div>

        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#4B5563] hover:text-[#183C32] font-semibold transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>
      </div>

      {items.length === 0 ? (
        /* Empty State */
        <div className="py-20 bg-white rounded-xs border border-[#DCDDD4] text-center max-w-2xl mx-auto p-8 space-y-5">
          <div className="w-16 h-16 rounded-full bg-[#EEF1E9] mx-auto flex items-center justify-center text-[#A0AEC0]">
            <ShoppingBag className="w-8 h-8 stroke-1" />
          </div>
          <h2 className="font-serif text-2xl font-medium text-[#183C32]">
            Your shopping bag is empty
          </h2>
          <p className="text-sm text-[#666D65] leading-relaxed max-w-md mx-auto">
            You haven&apos;t added any items to your bag yet. Explore our curated selection of kitchenware, baby care, fashion, and lifestyle essentials.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center bg-[#183C32] hover:bg-[#B96F52] text-white px-8 py-3.5 rounded-xs text-xs uppercase tracking-widest font-semibold transition"
            >
              Browse Catalogue
            </Link>
          </div>
        </div>
      ) : (
        /* Cart Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Items Table */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-xs border border-[#DCDDD4] overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-[#DCDDD4] flex items-center justify-between bg-[#F7F4EC]">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#183C32]">
                  Items in Bag ({totalItems})
                </span>
                <button
                  onClick={clearCart}
                  className="text-xs text-[#DC2626] hover:underline"
                >
                  Clear all
                </button>
              </div>

              <ul className="divide-y divide-[#DCDDD4]">
                {items.map((item) => (
                  <li
                    key={`${item.product.id}-${item.selectedVariant || "default"}`}
                    className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    {/* Item info */}
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-[#EEF1E9] rounded-xs overflow-hidden shrink-0 border border-[#DCDDD4]">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-wider text-[#B96F52] font-bold">
                          {item.product.category}
                        </span>
                        <Link
                          href={`/shop/${item.product.id}`}
                          className="hover:text-[#B96F52] transition block"
                        >
                          <h3 className="font-serif text-base sm:text-lg font-medium text-[#183C32] line-clamp-1">
                            {item.product.name}
                          </h3>
                        </Link>
                        {item.selectedVariant && (
                          <p className="text-xs text-[#666D65]">
                            Variant: {item.selectedVariant}
                          </p>
                        )}
                        <p className="text-xs text-[#4B5563]">
                          Unit price:{" "}
                          <span className="font-semibold text-[#183C32]">
                            {formatNaira(item.product.price)}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Stepper & Total */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-[#F3F4F6]">
                      <QuantitySelector
                        quantity={item.quantity}
                        onChange={(newQty) =>
                          updateQuantity(
                            item.product.id,
                            newQty,
                            item.selectedVariant
                          )
                        }
                        max={item.product.stockCount}
                        min={1}
                      />

                      <div className="text-right min-w-[90px]">
                        <span className="block text-xs text-[#666D65] sm:hidden">
                          Total:
                        </span>
                        <span className="font-serif text-base sm:text-lg font-bold text-[#183C32]">
                          {formatNaira(item.product.price * item.quantity)}
                        </span>
                      </div>

                      <button
                        onClick={() =>
                          removeFromCart(item.product.id, item.selectedVariant)
                        }
                        aria-label="Remove item"
                        className="text-[#9CA3AF] hover:text-[#DC2626] transition p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Order Summary Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-xs border border-[#DCDDD4] p-6 space-y-6">
              <h2 className="font-serif text-xl font-medium text-[#183C32] border-b border-[#DCDDD4] pb-4">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-[#4B5563]">
                  <span>Items Subtotal</span>
                  <span className="font-semibold text-[#183C32]">
                    {formatNaira(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between text-xs text-[#666D65]">
                  <span>Delivery fee</span>
                  <span className="text-[#B96F52] font-medium text-right">
                    To be confirmed on WhatsApp
                  </span>
                </div>

                <p className="text-[11px] text-[#9CA3AF] leading-relaxed pt-1">
                  Delivery is available across Ibadan, Lagos, and nationwide. Exact dispatch rate depends on your delivery address and will be confirmed directly with our concierge team.
                </p>

                <div className="flex justify-between text-lg font-bold text-[#183C32] pt-4 border-t border-[#DCDDD4]">
                  <span>Estimated Total</span>
                  <span>{formatNaira(subtotal)}</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <Link
                  href="/checkout"
                  className="w-full flex items-center justify-center gap-2 bg-[#183C32] hover:bg-[#B96F52] text-white py-4 px-6 rounded-xs text-xs uppercase tracking-widest font-semibold transition shadow-sm"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="flex items-center justify-center gap-2 text-xs text-[#666D65] pt-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>No upfront online card payment required</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
