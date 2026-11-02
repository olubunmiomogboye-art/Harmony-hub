"use client";

import React, { useState } from "react";
import {
  Store,
  Phone,
  Mail,
  Lock,
  CheckCircle2,
  Save,
  MapPin,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [storeName, setStoreName] = useState("Harmony Hub");
  const [storeLocation, setStoreLocation] = useState("Ibadan, Oyo State, Nigeria");
  const [whatsappNumber, setWhatsappNumber] = useState("+234 817 934 9477");
  const [contactEmail, setContactEmail] = useState("folorunsho.omogboye@gmail.com");

  // Password change state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">
          Store Settings
        </h1>
        <p className="text-xs text-[#64748B] mt-0.5">
          Update the WhatsApp phone number and contact information shown on the Harmony Hub website.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Contact Info Card */}
        <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#0F392B]" />
            WhatsApp Orders & Contact Number
          </h2>
          <p className="text-xs text-slate-500">
            This is the phone number that receives customer orders when people click "Order via WhatsApp".
          </p>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              WhatsApp Order Phone Number
            </label>
            <input
              type="text"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-2.5 text-sm font-mono font-bold text-slate-900 focus:outline-none focus:bg-white focus:border-[#0F392B]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              Order Notification Email
            </label>
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-[#0F392B]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              Store Workshop Location
            </label>
            <input
              type="text"
              value={storeLocation}
              onChange={(e) => setStoreLocation(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-[#0F392B]"
            />
          </div>
        </div>

        {/* Change Password Card */}
        <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#0F392B]" />
            Change Admin Password
          </h2>
          <p className="text-xs text-slate-500">
            If you ever need to change your admin password, you can update it here.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Current Password
              </label>
              <input
                type="password"
                placeholder="••••••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#0F392B]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                New Password
              </label>
              <input
                type="password"
                placeholder="••••••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#0F392B]"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-between pt-2">
          {saved ? (
            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
              Settings updated successfully!
            </span>
          ) : (
            <div />
          )}

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[#0F392B] hover:bg-[#0b2c21] text-white text-xs font-bold transition shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Store Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
