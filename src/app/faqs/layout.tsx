import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions & Event Planning",
  description:
    "Find clear answers about booking event services with Flair & Flavors, ordering products from our shop, delivery timelines, and consultation bookings.",
  alternates: {
    canonical: "/faqs",
  },
  openGraph: {
    title: "Frequently Asked Questions — Harmony Hub",
    description:
      "Everything you need to know about catering, decoration, bespoke cakes, and purchasing quality products from Harmony Hub.",
    url: "/faqs",
  },
};

export default function FaqsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
