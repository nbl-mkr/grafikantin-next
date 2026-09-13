"use client";

import { StandProvider } from "@/components/dashboard/stand/StandContext";
import type { StandView } from "@/lib/data/views";

export default function StandProviderWrapper({
  children,
  initialStands,
}: {
  children: React.ReactNode;
  initialStands: StandView[];
}) {
  return <StandProvider initialStands={initialStands}>{children}</StandProvider>;
}
