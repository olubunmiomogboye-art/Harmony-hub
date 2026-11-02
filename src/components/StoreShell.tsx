"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import Toast from "@/components/Toast";

interface StoreShellProps {
  children: React.ReactNode;
}

/**
 * StoreShell isolates the public-facing storefront navigation and footer
 * from the private admin dashboard.
 * 
 * If the current route is within /admin, the public Navbar, Footer, CartDrawer,
 * and storefront chrome are completely omitted.
 */
export default function StoreShell({ children }: StoreShellProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] text-[#1E293B] antialiased">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#20211E] antialiased">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
      <Toast />
    </div>
  );
}
