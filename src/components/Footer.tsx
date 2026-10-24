import React from "react";
import Link from "next/link";
import { MessageSquare, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="bg-[#10241E] text-[#F7F4EC] pt-20 pb-12 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#23493E]">
          {/* Brand & Address Column */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#F7F4EC] tracking-tight">
              Harmony Hub
            </h3>
            <div className="text-sm text-[#A8B5A0] space-y-2 pt-2">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#B96F52] shrink-0" />
                <span>{siteConfig.contact.locationDisplay}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#B96F52] shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-white transition underline underline-offset-4 decoration-[#B96F52]/50"
                >
                  {siteConfig.contact.email}
                </a>
              </p>
            </div>
            <p className="text-xs text-[#A8B5A0]/80 max-w-md pt-2 leading-relaxed">
              Harmony Hub unifies bespoke event planning, royal banqueting, curated furniture, catering, decor styling, and everyday essentials under one trusted luxury standard.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-6 flex flex-col md:items-end justify-between space-y-6">
            {/* WhatsApp Floating Contact Icon */}
            <div className="flex items-center gap-4">
              <span className="text-xs uppercase tracking-widest text-[#A8B5A0] font-medium">
                Connect Directly
              </span>
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

            {/* Nav list */}
            <nav className="flex flex-col md:items-end space-y-3">
              {siteConfig.navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-serif text-xl sm:text-2xl text-[#F7F4EC]/90 hover:text-[#B96F52] transition"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/faqs"
                className="font-serif text-xl sm:text-2xl text-[#F7F4EC]/90 hover:text-[#B96F52] transition"
              >
                FAQs & Event Planning
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Bar: Founder Attribution and Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A8B5A0]">
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center">
              <span className="w-5 h-2.5 bg-[#B96F52] block mb-0.5 rounded-[1px]"></span>
              <span className="w-5 h-2.5 bg-[#183C32] block rounded-[1px]"></span>
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-[#A8B5A0]">
                Owned by
              </span>
              <span className="font-medium text-white text-sm">
                {siteConfig.founder.name}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-white transition">
              About the Enterprise
            </Link>
            <span>•</span>
            <span className="text-[#A8B5A0]/60">Privacy Policy & Terms</span>
          </div>
        </div>

        {/* Watermark Logo */}
        <div className="mt-12 select-none pointer-events-none opacity-[0.05] text-center">
          <span className="font-serif text-7xl sm:text-[140px] md:text-[180px] lg:text-[230px] font-bold tracking-tight text-white leading-none whitespace-nowrap block">
            Harmony Hub
          </span>
        </div>
      </div>
    </footer>
  );
}
