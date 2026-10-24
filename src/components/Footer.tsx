import React from "react";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="bg-[#11120F] text-[#F7F4EC] pt-20 pb-12 overflow-hidden relative border-t border-[#222320]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Top Info & Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#222320]">
          {/* Brand & Address Column */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="font-sans text-2xl sm:text-3xl font-bold text-[#F7F4EC] tracking-tight">
              Harmony Hub
            </h3>
            <div className="text-xl sm:text-2xl text-[#F7F4EC]/90 space-y-1 font-light pt-2">
              <p>Ibadan, Oyo State</p>
              <p>Nigeria</p>
              <p className="pt-2">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-[#CD927C] transition underline underline-offset-4 decoration-[#CD927C]/50"
                >
                  {siteConfig.contact.email}
                </a>
              </p>
            </div>
            <p className="text-xs text-[#8A8884] max-w-md pt-4 leading-relaxed">
              Harmony Hub unifies bespoke event planning, royal banqueting with Flair & Flavors, fine furniture, catering, decor styling, and everyday essentials.
            </p>
          </div>

          {/* Quick Links & WhatsApp Column */}
          <div className="lg:col-span-6 flex flex-col md:items-end justify-between space-y-8">
            {/* WhatsApp Floating Contact Icon */}
            <div className="flex items-center gap-4">
              <a
                href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect on WhatsApp"
                className="w-12 h-12 rounded-full bg-[#183C32] hover:bg-[#B96F52] text-white flex items-center justify-center transition shadow-lg"
              >
                <MessageSquare className="w-6 h-6" />
              </a>
            </div>

            {/* Nav list matching Figma exact labels */}
            <nav className="flex flex-col md:items-end space-y-3">
              <Link
                href="/"
                className="font-serif text-2xl sm:text-3xl text-[#F7F4EC] hover:text-[#CD927C] transition font-medium"
              >
                Home
              </Link>
              <Link
                href="/flair-and-flavors"
                className="font-serif text-2xl sm:text-3xl text-[#F7F4EC] hover:text-[#CD927C] transition font-medium"
              >
                Flair & Flavors
              </Link>
              <Link
                href="/shop"
                className="font-serif text-2xl sm:text-3xl text-[#F7F4EC] hover:text-[#CD927C] transition font-medium"
              >
                Shop
              </Link>
              <Link
                href="/about"
                className="font-serif text-2xl sm:text-3xl text-[#F7F4EC] hover:text-[#CD927C] transition font-medium"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="font-serif text-2xl sm:text-3xl text-[#F7F4EC] hover:text-[#CD927C] transition font-medium"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>

        {/* Middle Bar: Founder Attribution and Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A8884]">
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center">
              <span className="w-4 h-2 bg-[#CD927C] block mb-0.5 rounded-[1px]"></span>
              <span className="w-4 h-2 bg-[#CD927C] block mb-0.5 rounded-[1px]"></span>
              <span className="w-4 h-2 bg-white block rounded-[1px]"></span>
            </div>
            <div>
              <span className="block text-[11px] uppercase tracking-wider text-[#8A8884]">
                Owned by
              </span>
              <span className="font-medium text-white text-base">
                {siteConfig.founder.name}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-white transition">
              About the Enterprise
            </Link>
            <span>•</span>
            <span className="text-[#8A8884]">Privacy Policy | Terms of use</span>
          </div>
        </div>

        {/* Oversized Wordmark in Anton Font */}
        <div className="mt-12 select-none pointer-events-none text-center overflow-hidden">
          <span className="font-anton text-7xl sm:text-[140px] md:text-[180px] lg:text-[230px] font-normal tracking-tight text-white leading-none whitespace-nowrap block opacity-95">
            Harmony Hub
          </span>
        </div>
      </div>
    </footer>
  );
}
