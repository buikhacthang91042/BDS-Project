"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header/Header";

export default function ClientHeader() {
  const pathname = usePathname();
  if (pathname === "/authen" || pathname === "/register") {
    return null;
  }
  return <Header />;
}
