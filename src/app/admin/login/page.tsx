"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "Invalid email or password. Please try again.");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Network error. Please check your connection and try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF9] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-block group mb-6">
          <span className="font-serif italic text-3xl sm:text-4xl text-[#183C32] tracking-tight group-hover:text-[#705B38] transition-colors">
            Harmony Hub
          </span>
          <span className="block text-[10px] tracking-[0.25em] uppercase text-[#705B38] font-medium mt-1">
            Product Management Portal
          </span>
        </Link>
        <h2 className="text-xl font-serif text-[#20211E] font-medium">
          Owner & Administrator Sign In
        </h2>
        <p className="mt-2 text-xs text-[#8A8884] max-w-sm mx-auto">
          Manage your catalogue, stock status, pricing, and live shop products.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-sm border border-[#EBE8E0] rounded-xs sm:px-10">
          {error && (
            <div className="mb-6 p-3.5 bg-red-50 border border-red-200 rounded-xs flex items-start gap-2.5 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-xs uppercase tracking-wider text-[#705B38] font-semibold mb-1.5"
              >
                Administrator Email
              </label>
              <div className="relative rounded-xs shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8A8884]">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@harmonyhub.ng"
                  className="block w-full pl-10 pr-3 py-2.5 text-sm bg-[#FAF8F5] border border-[#E5E0D8] rounded-xs placeholder-[#B0ACA5] text-[#20211E] focus:outline-none focus:ring-1 focus:ring-[#183C32] focus:border-[#183C32] transition"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs uppercase tracking-wider text-[#705B38] font-semibold mb-1.5"
              >
                Password
              </label>
              <div className="relative rounded-xs shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8A8884]">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="block w-full pl-10 pr-3 py-2.5 text-sm bg-[#FAF8F5] border border-[#E5E0D8] rounded-xs placeholder-[#B0ACA5] text-[#20211E] focus:outline-none focus:ring-1 focus:ring-[#183C32] focus:border-[#183C32] transition"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xs shadow-xs text-xs uppercase tracking-widest font-semibold text-white bg-[#183C32] hover:bg-[#122E26] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#183C32] transition disabled:opacity-50"
              >
                {loading ? (
                  <span>Signing In...</span>
                ) : (
                  <>
                    <span>Enter Management Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-[#F0ECE1] text-center">
            <Link
              href="/shop"
              className="text-xs text-[#705B38] hover:text-[#183C32] font-medium transition inline-flex items-center gap-1.5"
            >
              <span>Return to Public Website</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-[#A09C95]">
          <ShieldCheck className="w-4 h-4 text-[#705B38]" />
          <span>Encrypted Administrator Session</span>
        </div>
      </div>
    </div>
  );
}
