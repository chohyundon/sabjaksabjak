"use client";

import { usePathname } from "next/navigation";
import React from "react";
import Header from "@/app/components/Header/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = false;

  return (
    <>
      {pathname !== "/login" ? (
        <main className="w-10/15 mx-auto">
          <Header isLogin={isLogin} />
          {children}
        </main>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
