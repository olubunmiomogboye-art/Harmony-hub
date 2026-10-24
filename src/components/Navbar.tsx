"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, Phone, MessageSquare } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { siteConfig } from "@/config/site";

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems, openDrawer } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F7F6F4]/98 backdrop-blur-md border-b border-[#E5E5E5]">
      {/* Top Announcement Bar */}
      <div className="bg-[#11120F] text-[#F8F3E9] text-[11px] sm:text-xs py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4 tracking-wider">
          <p className="font-normal uppercase text-center sm:text-left text-[#F8F3E9] text-[11px] sm:text-[12px] tracking-wide">
            TWO DIVISIONS. ONE STANDARD OF THOUGHTFUL SERVICE.
          </p>
          <div className="flex items-center gap-4 text-[11px] sm:text-[12px] text-[#A8B5A0]">
            <span className="text-[#F8F3E9]">NGN (₦)</span>
            <span className="hidden sm:inline opacity-40">|</span>
            <a
              href={`tel:${siteConfig.contact.whatsappNumber}`}
              className="hover:text-white transition flex items-center gap-1.5"
            >
              <Phone className="w-3 h-3 text-[#CD927C]" />
              <span>PRIVATE CONCIERGE: {siteConfig.contact.conciergeDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 sm:h-[88px] flex items-center justify-between">
        {/* Logo - STRICT REQUIREMENT: DM Serif Display Bold */}
        <Link href="/" className="group flex items-center gap-2">
          <span className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#183C32] group-hover:text-[#B96F52] transition">
            Harmony Hub
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-[15px] tracking-normal font-medium">
          {siteConfig.navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 text-[15px] transition-colors ${
                  isActive
                    ? "text-[#183C32] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#183C32]"
                    : "text-[#20211E] hover:text-[#183C32]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Shopping Bag + Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          {/* Quick WhatsApp button on desktop */}
          <a
            href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-2 text-xs uppercase tracking-wider text-[#183C32] border border-[#DCDDD4] hover:border-[#183C32] hover:bg-[#183C32] hover:text-[#FFFFFF] px-3.5 py-2 rounded-xs transition"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Concierge</span>
          </a>

          {/* Shopping Bag Button */}
          <button
            onClick={openDrawer}
            aria-label="View shopping bag"
            className="relative p-2 text-[#183C32] hover:text-[#B96F52] transition flex items-center gap-1.5 focus:outline-none"
          >
            <ShoppingBag className="w-6 h-6 stroke-[1.5]" />
            <span className="text-xs font-semibold text-white bg-[#A9482B] px-2 py-0.5 rounded-full min-w-[20px] text-center shadow-xs">
              {totalItems}
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 text-[#183C32] focus:outline-none"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F7F4EC] border-b border-[#DCDDD4] px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-4 text-base font-medium">
            {siteConfig.navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 text-lg ${
                    isActive
                      ? "text-[#183C32] font-semibold border-l-2 border-[#183C32] pl-3"
                      : "text-[#666D65] hover:text-[#183C32]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="pt-4 border-t border-[#DCDDD4] space-y-3">
            <a
              href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#183C32] text-[#F7F4EC] py-3 rounded-xs text-sm font-medium tracking-wide"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat with Concierge</span>
            </a>
            <p className="text-xs text-center text-[#666D65]">
              Based in Ibadan, Oyo State, Nigeria
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
