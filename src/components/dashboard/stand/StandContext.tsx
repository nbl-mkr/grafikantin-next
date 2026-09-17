"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { upsertStandAction, deleteStandAction, type StandInput } from "@/lib/data/mutations";
import type { StandView } from "@/lib/data/views";

interface StandContextValue {
  stands: StandView[];
  addStand: (data: StandInput) => Promise<void>;
  updateStand: (id: number, data: StandInput) => Promise<void>;
  deleteStand: (id: number) => Promise<void>;
}

const StandContext = createContext<StandContextValue | null>(null);

export function StandProvider({
  children,
  initialStands,
}: {
  children: React.ReactNode;
  initialStands: StandView[];
}) {
  const router = useRouter();
  const t = useTranslations("dashboard.errors");
  const [stands, setStands] = useState<StandView[]>(initialStands);

  useEffect(() => {
    setStands(initialStands);
  }, [initialStands]);

  const addStand = useCallback(
    async (data: StandInput) => {
      const res = await upsertStandAction(data);
      if (res.ok) router.refresh();
      else alert(res.error ?? t("saveStandFailed"));
    },
    [router, t]
  );

  const updateStand = useCallback(
    async (id: number, data: StandInput) => {
      const res = await upsertStandAction({ ...data, id });
      if (res.ok) router.refresh();
      else alert(res.error ?? t("saveStandFailed"));
    },
    [router, t]
  );

  const deleteStand = useCallback(
    async (id: number) => {
      const res = await deleteStandAction(id);
      if (res.ok) router.refresh();
      else alert(res.error ?? t("deleteStandFailed"));
    },
    [router, t]
  );

  return (
    <StandContext.Provider value={{ stands, addStand, updateStand, deleteStand }}>
      {children}
    </StandContext.Provider>
  );
}

export function useStands() {
  const ctx = useContext(StandContext);
  if (!ctx) {
    throw new Error("useStands harus dipakai di dalam StandProvider");
  }
  return ctx;
}