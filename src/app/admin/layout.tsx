import React from "react";
import AdminClientLayout from "./AdminClientLayout";

export const metadata = {
  title: "Admin Console — Harmony Hub",
  description: "Secure product and e-commerce management console for Harmony Hub.",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminClientLayout>{children}</AdminClientLayout>;
}
