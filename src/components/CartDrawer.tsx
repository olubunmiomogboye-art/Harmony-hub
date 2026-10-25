"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatNaira } from "@/lib/formatters";

export default function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeFromCart,
    subtotal,
    totalItems,
  } = useCart();

  // Prevent background scrolling when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDrawerOpen]);

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F7F4EC] border-l border-[#DCDDD4] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-[#DCDDD4] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#183C32]" />
              <h2 className="font-serif text-xl font-medium text-[#183C32]">
                Shopping Bag
              </h2>
              <span className="text-xs bg-[#EEF1E9] text-[#183C32] font-semibold px-2 py-0.5 rounded-full border border-[#DCDDD4]">
                {totalItems}
              </span>
            </div>
            <button
              onClick={closeDrawer}
              aria-label="Close bag"
              className="p-2 text-[#666D65] hover:text-[#183C32] rounded-full hover:bg-[#EEF1E9] transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Contents */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#EEF1E9] flex items-center justify-center text-[#A0AEC0]">
                  <ShoppingBag className="w-8 h-8 stroke-1" />
                </div>
                <h3 className="font-serif text-lg font-medium text-[#183C32]">
                  Your bag is currently empty
                </h3>
                <p className="text-sm text-[#666D65] max-w-xs">
                  Explore our curated catalogue of kitchenware, mother & baby care, and lifestyle essentials.
                </p>
                <Link
                  href="/shop"
                  onClick={closeDrawer}
                  className="inline-flex items-center justify-center bg-[#183C32] hover:bg-[#B96F52] text-white px-6 py-2.5 rounded-sm text-sm font-medium tracking-wide transition mt-2"
                >
                  Browse Collection
                </Link>
              </div>
            ) : (
              <ul className="divide-y divide-[#DCDDD4]">
                {items.map((item) => (
                  <li
                    key={`${item.product.id}-${item.selectedVariant || "default"}-${item.selectedColor || "default"}`}
                    className="py-4 flex gap-4"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-20 h-20 shrink-0 bg-[#EEF1E9] rounded-sm overflow-hidden border border-[#DCDDD4]">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-medium text-[#183C32] line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() =>
                              removeFromCart(
                                item.product.id,
                                item.selectedVariant,
                                item.selectedColor
                              )
                            }
                            aria-label="Remove item"
                            className="text-[#9CA3AF] hover:text-[#DC2626] transition p-0.5"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {item.selectedColor && (
                          <p className="text-xs text-[#20211E] font-medium mt-0.5 flex items-center gap-1">
                            <span>Colour:</span>
                            <span className="font-semibold">{item.selectedColor}</span>
                          </p>
                        )}

                        {item.selectedVariant && (
                          <p className="text-xs text-[#666D65] mt-0.5">
                            Variant: {item.selectedVariant}
                          </p>
                        )}

                        <p className="text-xs text-[#B96F52] font-semibold mt-1">
                          {formatNaira(item.product.price)}
                        </p>
                      </div>

                      {/* Quantity Stepper & Line Item Total */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-[#D1C7B7] rounded-sm bg-white">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity - 1,
                                item.selectedVariant,
                                item.selectedColor
                              )
                            }
                            aria-label="Decrease quantity"
                            className="p-1.5 text-[#4B5563] hover:text-[#183C32] transition"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2.5 text-xs font-semibold text-[#183C32]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity + 1,
                                item.selectedVariant,
                                item.selectedColor
                              )
                            }
                            aria-label="Increase quantity"
                            className="p-1.5 text-[#4B5563] hover:text-[#183C32] transition"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="text-xs font-bold text-[#183C32]">
                          {formatNaira(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer Summary & Checkout CTA */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#DCDDD4] bg-white space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-[#4B5563]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#183C32]">
                    {formatNaira(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-[#666D65]">
                  <span>Delivery fee</span>
                  <span className="text-[#B96F52] font-medium">
                    To be confirmed on WhatsApp
                  </span>
                </div>
                <p className="text-[11px] text-[#9CA3AF] leading-relaxed pt-1">
                  Delivery charges are calculated based on your address in Ibadan or nationwide destination.
                </p>
                <div className="flex justify-between text-base font-bold text-[#183C32] pt-2 border-t border-[#F3F4F6]">
                  <span>Estimated Total</span>
                  <span>{formatNaira(subtotal)}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <Link
                  href="/checkout"
                  onClick={closeDrawer}
                  className="w-full flex items-center justify-center gap-2 bg-[#183C32] hover:bg-[#B96F52] text-white py-3.5 px-4 rounded-sm text-sm font-medium tracking-wide transition shadow-sm"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/cart"
                  onClick={closeDrawer}
                  className="w-full flex items-center justify-center text-xs text-[#4B5563] hover:text-[#183C32] py-2 transition"
                >
                  View Full Bag Details
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
