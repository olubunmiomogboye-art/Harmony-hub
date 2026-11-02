import React from "react";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { isAuthenticatedAdmin } from "@/lib/auth";
import AdminNavClient from "./AdminNavClient";

export const metadata = {
  title: "Admin Portal — Harmony Hub",
  description: "Secure product and catalogue management for Harmony Hub.",
  robots: "noindex, nofollow",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";

  // If this is the login page, render children directly
  // Note: we also verify inside subcomponents
  const isAuth = await isAuthenticatedAdmin();

  return (
    <div className="min-h-screen bg-[#FDFCF9] text-[#20211E] flex flex-col font-sans">
      {isAuth && <AdminNavClient />}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      {isAuth && (
        <footer className="border-t border-[#EAE6DE] bg-white py-6 text-center text-xs text-[#8A8884]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>
              Harmony Hub Admin Portal • Ibadan, Nigeria • Powered by Supabase & Next.js
            </p>
            <div className="flex items-center gap-6 text-[#705B38]">
              <Link href="/shop" target="_blank" className="hover:text-[#183C32] transition">
                View Public Shop ↗
              </Link>
              <Link href="/contact" target="_blank" className="hover:text-[#183C32] transition">
                Customer Support ↗
              </Link>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
