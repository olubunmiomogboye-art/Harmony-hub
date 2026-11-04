import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Checkout",
  description: "Complete your order with convenient doorstep delivery or Ibadan pickup via WhatsApp.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
