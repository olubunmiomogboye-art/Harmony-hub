import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, ShoppingBag } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#F8F9FA] px-4 py-16">
      <div className="max-w-md w-full bg-white border border-[#DCDDD4] p-8 sm:p-10 rounded-xs text-center space-y-6 shadow-sm">
        <span className="text-xs uppercase tracking-widest text-[#B96F52] font-bold block">
          404 — PAGE NOT FOUND
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl text-[#183C32] font-medium leading-tight">
          Looking for Something Special?
        </h1>

        <p className="text-sm text-[#666D65] leading-relaxed">
          The page or product you are looking for may have been moved, renamed, or is currently unavailable.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#183C32] hover:bg-[#122E26] text-white px-5 py-3 rounded-xs text-xs uppercase tracking-wider font-semibold transition"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>

          <Link
            href="/shop"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent border border-[#183C32] text-[#183C32] hover:bg-[#183C32] hover:text-white px-5 py-3 rounded-xs text-xs uppercase tracking-wider font-semibold transition"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Browse Shop</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
