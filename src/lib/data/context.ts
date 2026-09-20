import { createClient } from "@/lib/supabase/server";
import { cache } from "react";
import { getProfile } from "@/lib/supabase/session";
import type { DashboardContext } from "@/lib/data/types";

export const getDashboardContext = cache(async function getDashboardContext(): Promise<DashboardContext | null> {
  const profile = await getProfile();
  if (!profile) return null;

  let standId: number | null = null;
  if (profile.role === "penjual") {
    const supabase = await createClient();
    const { data } = await supabase
      .from("stands")
      .select("id")
      .eq("id_penjual", profile.id)
      .limit(1)
      .maybeSingle();
    standId = data?.id ?? null;
  }

  return { role: profile.role, userId: profile.id, standId };
});