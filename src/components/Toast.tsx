"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Check, X, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatNaira } from "@/lib/formatters";

export default function Toast() {
  const { lastAddedItem, clearLastAddedItem, openDrawer } = useCart();

  useEffect(() => {
    if (lastAddedItem) {
      const timer = setTimeout(() => {
        clearLastAddedItem();
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [lastAddedItem, clearLastAddedItem]);

  if (!lastAddedItem) return null;

  return (
    <aside
      aria-label="Shopping bag notification"
      className="fixed bottom-6 right-4 sm:right-8 z-50 max-w-sm w-full bg-[#183C32] text-white p-4 rounded-sm shadow-2xl border border-[#26423A] animate-in slide-in-from-bottom-5 duration-300"
    >
      <div className="flex items-start gap-3">
        {/* Check icon badge */}
        <div className="w-8 h-8 rounded-full bg-[#B96F52] flex items-center justify-center shrink-0">
          <Check className="w-4 h-4 text-white stroke-[2.5]" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-xs uppercase tracking-wider text-[#A0AEC0] font-semibold">
            Added to your bag
          </p>
          <div className="flex items-center gap-2 mt-1">
            <div className="relative w-9 h-9 rounded-xs overflow-hidden shrink-0 border border-white/10 bg-white/5">
              <Image
                src={lastAddedItem.product.image}
                alt={lastAddedItem.product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-medium text-white truncate">
                {lastAddedItem.product.name}
              </h4>
              <p className="text-xs text-[#E2E8F0]">
                Qty: {lastAddedItem.quantity} •{" "}
                <span className="text-[#E5B59C] font-semibold">
                  {formatNaira(lastAddedItem.product.price * lastAddedItem.quantity)}
                </span>
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 mt-3 pt-2 border-t border-white/10">
            <button
              onClick={() => {
                clearLastAddedItem();
                openDrawer();
              }}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#E5B59C] hover:text-white transition"
            >
              <span>View Bag</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-white/20">•</span>
            <button
              onClick={clearLastAddedItem}
              className="text-xs text-[#A0AEC0] hover:text-white transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={clearLastAddedItem}
          aria-label="Dismiss notification"
          className="text-[#9CA3AF] hover:text-white transition p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
