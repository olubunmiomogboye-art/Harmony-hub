import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import StoreShell from "@/components/StoreShell";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Harmony Hub — Event Management, Catering, Decor & Quality Home Essentials",
    template: "%s | Harmony Hub",
  },
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
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "Harmony Hub — Event Management, Catering, Decor & Quality Home Essentials",
    description:
      "Based in Ibadan, Nigeria. Harmony Hub offers delicious catering, event planning and decor with Flair & Flavors, alongside quality kitchenware and essentials for your home.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1024,
        height: 511,
        alt: "Harmony Hub — For the moments you host. And the life you live.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harmony Hub — Event Management, Catering, Decor & Quality Home Essentials",
    description:
      "Based in Ibadan, Nigeria. Harmony Hub offers delicious catering, event planning and decor with Flair & Flavors, alongside quality kitchenware and essentials for your home.",
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
      <body className="min-h-screen bg-[#FFFFFF] antialiased">
        <CartProvider>
          <StoreShell>{children}</StoreShell>
        </CartProvider>
      </body>
    </html>
  );
}
