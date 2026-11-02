"use client";

import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Package,
  ExternalLink,
  LogOut,
  Layers,
  Sparkles,
} from "lucide-react";

export default function AdminNavClient() {
  const router = useRouter();
  const pathname = usePathname();

  // If on login page, don't show navigation
  if (pathname === "/admin/login") {
    return null;
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EAE6DE] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Portal Badge */}
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-baseline gap-2 group">
              <span className="font-serif italic text-2xl sm:text-3xl text-[#183C32] tracking-tight group-hover:text-[#705B38] transition-colors">
                Harmony Hub
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-[#F5F2EB] text-[#705B38] border border-[#E5E0D8]">
                <Sparkles className="w-2.5 h-2.5" />
                <span>Admin Portal</span>
              </span>
            </Link>
          </div>

          {/* Navigation Links & Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/admin"
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xs text-xs uppercase tracking-wider font-semibold transition ${
                pathname === "/admin"
                  ? "bg-[#183C32] text-white"
                  : "text-[#5A5854] hover:text-[#183C32] hover:bg-[#F5F2EB]"
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>Products</span>
            </Link>

            <Link
              href="/shop"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xs text-xs uppercase tracking-wider font-semibold text-[#705B38] hover:text-[#183C32] hover:bg-[#F5F2EB] transition border border-[#EBE8E0]"
            >
              <span>Live Shop</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xs text-xs uppercase tracking-wider font-semibold text-red-700 hover:text-red-900 hover:bg-red-50 transition border border-transparent"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
