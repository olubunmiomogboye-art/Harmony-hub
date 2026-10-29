import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import Toast from "@/components/Toast";

export const metadata: Metadata = {
  title: "Harmony Hub — Event Management, Catering, Decor & Quality Home Essentials",
  description:
    "Based in Ibadan, Nigeria. Harmony Hub offers delicious catering, event planning and decor with Flair & Flavors, alongside quality kitchenware and essentials for your home.",
  keywords: [
    "Harmony Hub",
    "Flair & Flavors",
    "Event Management Ibadan",
    "Catering Ibadan",
    "Decoration Ibadan",
    "Furniture Ibadan",
    "Olubunmi Folorunsho",
    "Wedding Planning Nigeria",
    "Kitchenware",
    "Baby Products",
  ],
  authors: [{ name: "Olubunmi Folorunsho" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#20211E] antialiased">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <Toast />
        </CartProvider>
      </body>
    </html>
  );
}
