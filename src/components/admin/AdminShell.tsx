"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  Layers,
  Settings,
  LogOut,
  Search,
  Menu,
  X,
  ExternalLink,
  Store,
} from "lucide-react";

interface AdminShellProps {
  children: React.ReactNode;
}

export default function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      console.error("Logout error:", e);
    }
  };

  const navItems = [
    { label: "Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Products", href: "/admin/products", icon: Package },
    { label: "Add Product", href: "/admin/products/new", icon: PlusCircle },
    { label: "Categories", href: "/admin/categories", icon: Layers },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    if (href === "/admin/products") return pathname === "/admin/products";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#0F172A] flex">
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-[#E2E8F0] shrink-0 sticky top-0 h-screen select-none z-30">
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-[#E2E8F0]">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#0F392B] flex items-center justify-center text-white font-serif font-bold text-lg shadow-sm">
              H
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-[#0F172A] block leading-tight">
                Harmony Hub
              </span>
              <span className="text-[11px] text-[#64748B] font-medium block">
                Store Admin
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? "bg-[#0F392B] text-white shadow-xs font-semibold"
                    : "text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A]"
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${active ? "text-white" : "text-[#64748B]"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-[#E2E8F0] bg-[#FCFCFD] space-y-2">
          <Link
            href="/shop"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-[#0F392B] bg-[#ECFDF5] hover:bg-[#D1FAE5] border border-[#A7F3D0] transition"
          >
            <span className="flex items-center gap-2">
              <Store className="w-3.5 h-3.5" />
              <span>View Website</span>
            </span>
            <ExternalLink className="w-3 h-3 text-[#059669]" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-red-600 hover:bg-red-50 transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* MOBILE SIDEBAR */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-72 bg-white flex flex-col h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            <div className="h-16 flex items-center justify-between px-6 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#0F392B] flex items-center justify-center text-white font-serif font-bold text-lg">
                  H
                </div>
                <div>
                  <span className="font-bold text-sm tracking-tight text-[#0F172A]">
                    Harmony Hub
                  </span>
                  <span className="text-[11px] text-[#64748B] block">
                    Store Admin
                  </span>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5">
              {navItems.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                      active
                        ? "bg-[#0F392B] text-white font-semibold"
                        : "text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A]"
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${active ? "text-white" : "text-[#64748B]"}`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="p-4 border-t border-slate-100 space-y-2">
              <Link
                href="/shop"
                target="_blank"
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-[#0F392B] bg-[#ECFDF5]"
              >
                <span>View Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-red-600 hover:bg-red-50 transition"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOP BAR */}
        <header className="h-16 bg-white border-b border-[#E2E8F0] sticky top-0 z-20 px-4 sm:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="relative w-full hidden sm:block">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchQuery.trim()) {
                    router.push(`/admin/products?q=${encodeURIComponent(searchQuery.trim())}`);
                  }
                }}
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-9 pr-4 py-2 text-xs text-[#0F172A] placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0F392B] transition"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/shop"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#0F392B] bg-[#ECFDF5] hover:bg-[#D1FAE5] border border-[#A7F3D0] rounded-lg transition"
            >
              <Store className="w-3.5 h-3.5" />
              <span>View Website</span>
              <ExternalLink className="w-3 h-3 text-[#059669]" />
            </Link>

            <div className="h-5 w-[1px] bg-slate-200 hidden sm:block" />

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#0F392B] text-white flex items-center justify-center font-bold text-xs">
                OF
              </div>
              <span className="hidden md:block text-xs font-semibold text-slate-800">
                Olubunmi Folorunsho
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="p-1.5 text-slate-400 hover:text-red-600 transition"
              title="Log Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
