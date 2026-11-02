"use client";

import React, { useState } from "react";
import { Percent, Megaphone, CheckCircle2, Save, Tag } from "lucide-react";

export default function AdminPromotionsPage() {
  const [bannerActive, setBannerActive] = useState(true);
  const [bannerText, setBannerText] = useState("✨ Nationwide Delivery Across Nigeria • Fast Dispatch From Ibadan");
  const [promoCode, setPromoCode] = useState("HARMONY2026");
  const [discountPercent, setDiscountPercent] = useState("10");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">
          Promotions & Announcements
        </h1>
        <p className="text-xs text-[#64748B] mt-0.5">
          Manage promotional announcement banners, store notices, and discount campaigns.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-6">
        <form onSubmit={handleSave} className="space-y-6">
          {/* Announcement Bar Toggle */}
          <div className="flex items-start justify-between pb-6 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <Megaphone className="w-4 h-4 text-[#0F392B]" />
                Storefront Top Announcement Bar
              </h2>
              <p className="text-xs text-slate-500 mt-1 max-w-md">
                Displays a prominent announcement bar across the top of the Harmony Hub customer storefront.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={bannerActive}
                onChange={(e) => setBannerActive(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0F392B]"></div>
            </label>
          </div>

          {/* Banner Text */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Announcement Message
            </label>
            <input
              type="text"
              value={bannerText}
              onChange={(e) => setBannerText(e.target.value)}
              disabled={!bannerActive}
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3.5 py-2.5 text-xs text-slate-900 disabled:opacity-50 focus:outline-none focus:bg-white focus:border-[#0F392B]"
            />
          </div>

          {/* Promo Code */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-slate-400" />
                Featured Promo / Coupon Code
              </label>
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3.5 py-2 text-xs font-mono font-bold text-[#0F392B] focus:outline-none focus:bg-white focus:border-[#0F392B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Offer Percentage (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#0F392B]"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            {saved ? (
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                <CheckCircle2 className="w-4 h-4" />
                Changes saved successfully!
              </span>
            ) : (
              <div />
            )}

            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F392B] hover:bg-[#0b2c21] text-white text-xs font-semibold transition cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Promotion Settings</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
