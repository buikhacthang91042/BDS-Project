"use client";
import { useEffect } from "react";
import useAuthStore from "@/store/useAuthStore";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const fetchAuthUserFromToken = useAuthStore(
    (state) => state.fetchAuthUserFromToken
  );

  useEffect(() => {
    fetchAuthUserFromToken();
  }, [fetchAuthUserFromToken]);

  return <>{children}</>;
}
