import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop — Kitchenware, Baby Essentials, Outfits & Living",
  description:
    "Browse dependable kitchenware, baby essentials, adults' fashion, and children's outfits carefully selected for everyday quality living in Nigeria.",
  alternates: {
    canonical: "/shop",
  },
  openGraph: {
    title: "Shop Quality Essentials — Harmony Hub",
    description:
      "Explore kitchenware, baby items, fashion, and curated home essentials. Order seamlessly via WhatsApp with Ibadan pickup or nationwide doorstep delivery.",
    url: "/shop",
    images: [
      {
        url: "/images/uploaded/shop-hero-retail.jpg",
        width: 1200,
        height: 630,
        alt: "Harmony Hub Shop Collection",
      },
    ],
  },
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
