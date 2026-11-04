import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us & Concierge",
  description:
    "Get in touch with Harmony Hub in Ibadan, Nigeria. Reach out for event consultations, catering tastings, product enquiries, or customer support.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Harmony Hub — Ibadan, Nigeria",
    description:
      "Schedule a consultation for event planning, book a tasting session, or enquire about product delivery across Nigeria.",
    url: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
