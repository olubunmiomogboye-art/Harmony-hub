"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  Layers,
  Boxes,
  ShoppingBag,
  Users,
  Percent,
  Star,
  BarChart3,
  Settings,
  LogOut,
  Search,
  Bell,
  Menu,
  X,
  ExternalLink,
  ChevronDown,
  Store,
  ShieldCheck,
} from "lucide-react";

interface AdminShellProps {
  children: React.ReactNode;
}

export default function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");

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
    {
      group: "MAIN NAVIGATION",
      items: [
        { label: "Overview", href: "/admin", icon: LayoutDashboard },
        { label: "Products", href: "/admin/products", icon: Package },
        { label: "Add Product", href: "/admin/products/new", icon: PlusCircle },
        { label: "Categories", href: "/admin/categories", icon: Layers },
        { label: "Inventory", href: "/admin/inventory", icon: Boxes },
        { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
        { label: "Customers", href: "/admin/customers", icon: Users },
      ],
    },
    {
      group: "MANAGEMENT",
      items: [
        { label: "Promotions", href: "/admin/promotions", icon: Percent },
        { label: "Reviews", href: "/admin/reviews", icon: Star },
        { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
      ],
    },
    {
      group: "ACCOUNT",
      items: [
        { label: "Settings", href: "/admin/settings", icon: Settings },
      ],
    },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#0F172A] flex">
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-[#E2E8F0] shrink-0 sticky top-0 h-screen select-none z-30">
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-[#E2E8F0]">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-[#0F392B] flex items-center justify-center text-white font-serif font-bold text-lg shadow-sm">
              H
            </div>
            <div>
              <span className="font-semibold text-sm tracking-tight text-[#0F172A] block leading-tight">
                Harmony Hub
              </span>
              <span className="text-[11px] text-[#64748B] font-medium block">
                Admin Console
              </span>
            </div>
          </Link>
          <div className="text-[10px] font-semibold uppercase tracking-wider bg-[#F1F5F9] text-[#475569] px-2 py-0.5 rounded">
            v2.0
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
          {navItems.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8] mb-2">
                {group.group}
              </p>
              {group.items.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
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
          ))}

          {/* Logout in account list */}
          <div className="pt-1">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-[#DC2626] hover:bg-[#FEF2F2] transition text-left"
            >
              <LogOut className="w-4 h-4 text-[#DC2626]" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Bottom Profile card */}
        <div className="p-4 border-t border-[#E2E8F0] bg-[#FCFCFD]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#E2E8F0] border border-[#CBD5E1] flex items-center justify-center font-semibold text-xs text-[#334155]">
              OF
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[#0F172A] truncate">
                Olubunmi Folorunsho
              </p>
              <p className="text-[11px] text-[#64748B] truncate">
                admin@harmonyhub.ng
              </p>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500" title="Online" />
          </div>
        </div>
      </aside>

      {/* MOBILE SIDEBAR OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-72 bg-white flex flex-col h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            <div className="h-16 flex items-center justify-between px-6 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#0F392B] flex items-center justify-center text-white font-serif font-bold text-lg">
                  H
                </div>
                <div>
                  <span className="font-semibold text-sm tracking-tight text-[#0F172A]">
                    Harmony Hub
                  </span>
                  <span className="text-[11px] text-[#64748B] block">
                    Admin Console
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

            <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
              {navItems.map((group, gIdx) => (
                <div key={gIdx} className="space-y-1">
                  <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8] mb-2">
                    {group.group}
                  </p>
                  {group.items.map((item) => {
                    const active = isActive(item.href);
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
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
              ))}

              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOP BAR */}
        <header className="h-16 bg-white border-b border-[#E2E8F0] sticky top-0 z-20 px-4 sm:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 max-w-lg">
            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Global Search Input */}
            <div className="relative w-full max-w-md hidden sm:block">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products, orders, categories..."
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && globalSearch.trim()) {
                    router.push(`/admin/products?q=${encodeURIComponent(globalSearch.trim())}`);
                  }
                }}
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg pl-9 pr-4 py-1.5 text-xs text-[#0F172A] placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0F392B] focus:ring-1 focus:ring-[#0F392B] transition"
              />
            </div>
          </div>

          {/* Top Bar Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* View Public Store Shortcut */}
            <Link
              href="/shop"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#0F392B] bg-[#ECFDF5] hover:bg-[#D1FAE5] border border-[#A7F3D0] rounded-lg transition"
              title="Open customer storefront in a new tab"
            >
              <Store className="w-3.5 h-3.5" />
              <span className="hidden md:inline">View Public Store</span>
              <ExternalLink className="w-3 h-3 text-[#059669]" />
            </Link>

            <div className="h-5 w-[1px] bg-slate-200 hidden sm:block" />

            {/* Notification Bell */}
            <Link
              href="/admin/orders"
              className="relative p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
            </Link>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-slate-100 transition"
              >
                <div className="w-8 h-8 rounded-full bg-[#0F392B] text-white flex items-center justify-center font-semibold text-xs shadow-xs">
                  OF
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-xs font-semibold text-slate-800 leading-tight">
                    Olubunmi Folorunsho
                  </p>
                  <p className="text-[10px] text-slate-500 font-medium">
                    Store Owner
                  </p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {userDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setUserDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-50 text-xs animate-in fade-in-50 zoom-in-95 duration-100">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="font-semibold text-slate-900">Signed in as</p>
                      <p className="text-slate-500 truncate">admin@harmonyhub.ng</p>
                    </div>
                    <Link
                      href="/admin/settings"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50 transition"
                    >
                      <Settings className="w-3.5 h-3.5 text-slate-400" />
                      <span>Store Settings</span>
                    </Link>
                    <Link
                      href="/shop"
                      target="_blank"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50 transition"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                      <span>Open Customer Shop</span>
                    </Link>
                    <div className="border-t border-slate-100 my-1" />
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 transition text-left"
                    >
                      <LogOut className="w-3.5 h-3.5 text-red-500" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
