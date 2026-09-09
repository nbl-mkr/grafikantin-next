"use client";

import { StandProvider } from "@/components/admin/stand/StandContext";

export default function StandProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StandProvider>{children}</StandProvider>;
}
