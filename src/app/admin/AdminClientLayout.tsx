"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";

export default function AdminClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";
  const [checking, setChecking] = useState(!isLoginPage);

  useEffect(() => {
    if (isLoginPage) return;

    let isMounted = true;
    async function verifyAuth() {
      try {
        const res = await fetch("/api/admin/auth");
        const data = await res.json();
        if (!data.authenticated) {
          router.replace(`/admin/login?next=${encodeURIComponent(pathname)}`);
        } else {
          if (isMounted) setChecking(false);
        }
      } catch {
        router.replace("/admin/login");
      }
    }
    verifyAuth();
    return () => {
      isMounted = false;
    };
  }, [pathname, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#0F392B] border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-xs text-slate-500 font-medium tracking-wide">
          Verifying security credentials...
        </p>
      </div>
    );
  }

  return <AdminShell>{children}</AdminShell>;
}
