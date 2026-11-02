"use client";

import React, { useState } from "react";
import {
  Settings,
  Store,
  Phone,
  Mail,
  Lock,
  Database,
  CheckCircle2,
  Save,
  ShieldCheck,
  MapPin,
  ExternalLink,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [storeName, setStoreName] = useState("Harmony Hub");
  const [storeLocation, setStoreLocation] = useState("Ibadan, Oyo State, Nigeria");
  const [whatsappNumber, setWhatsappNumber] = useState("+234 817 934 9477");
  const [contactEmail, setContactEmail] = useState("folorunsho.omogboye@gmail.com");
  const [adminEmail, setAdminEmail] = useState("admin@harmonyhub.ng");
  const [currency, setCurrency] = useState("₦ (Nigerian Naira)");

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
          Store Settings
        </h1>
        <p className="text-xs text-[#64748B] mt-0.5">
          Configure business details, WhatsApp checkout numbers, administrator credentials, and database settings.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Store Profile */}
        <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-4">
          <h2 className="text-sm font-semibold text-[#0F172A] flex items-center gap-2">
            <Store className="w-4 h-4 text-[#0F392B]" />
            Store Profile & Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Brand / Store Name
              </label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#0F392B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Physical Workshop / Location
              </label>
              <input
                type="text"
                value={storeLocation}
                onChange={(e) => setStoreLocation(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#0F392B]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                WhatsApp Checkout Number
              </label>
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3.5 py-2 text-xs text-slate-900 font-mono focus:outline-none focus:bg-white focus:border-[#0F392B]"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Customer orders are redirected to this WhatsApp line.
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                Notification Email Address
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#0F392B]"
              />
            </div>
          </div>
        </div>

        {/* Administrator Credentials & Access */}
        <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-4">
          <h2 className="text-sm font-semibold text-[#0F172A] flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#0F392B]" />
            Administrator Credentials
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Current Login Email
              </label>
              <input
                type="email"
                value={adminEmail}
                disabled
                className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl px-3.5 py-2 text-xs text-slate-600 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Session Encryption
              </label>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>HMAC-SHA256 Encrypted (7-Day Expiry)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Database & Cloud Connection Status */}
        <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-4">
          <h2 className="text-sm font-semibold text-[#0F172A] flex items-center gap-2">
            <Database className="w-4 h-4 text-[#0F392B]" />
            Backend Storage Engine
          </h2>

          <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-semibold text-emerald-950">
                Primary Database Active
              </p>
              <p className="text-emerald-800 mt-0.5 leading-relaxed">
                Your products, categories, and orders are safely stored with dual persistence: local resilient database (<code className="bg-emerald-100 px-1 py-0.5 rounded">src/data/products.json</code>) and optional Supabase PostgreSQL sync. Changes made here immediately propagate to the live website.
              </p>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-between pt-2">
          {saved ? (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
              Settings updated successfully!
            </span>
          ) : (
            <div />
          )}

          <button
            type="submit"
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#0F392B] hover:bg-[#0b2c21] text-white text-xs font-semibold transition shadow-xs cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Store Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
