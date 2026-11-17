"use client";
import { createContext, useCallback, useContext, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { upsertStandAction, deleteStandAction, type StandInput } from "@/lib/data/mutations";
import type { StandView } from "@/lib/data/views";

interface StandContextValue {
  stands: StandView[];
  addStand: (data: StandInput) => Promise<boolean>;
  updateStand: (id: number, data: StandInput) => Promise<boolean>;
  deleteStand: (id: number) => Promise<boolean>;
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
  const tError = useTranslations("dashboard.errors");
  const tToast = useTranslations("dashboard.toasts");
  const [stands, setStands] = useState<StandView[]>(initialStands);
  const [syncedInitialStands, setSyncedInitialStands] = useState(initialStands);

  if (syncedInitialStands !== initialStands) {
    setSyncedInitialStands(initialStands);
    setStands(initialStands);
  }

  const addStand = useCallback(
    async (data: StandInput) => {
      const res = await upsertStandAction(data);
      if (res.ok) {
        toast.success(tToast("standCreated"));
        router.refresh();
        return true;
      } else {
        toast.error(res.error ?? tError("saveStandFailed"));
        return false;
      }
    },
    [router, tError, tToast]
  );

  const updateStand = useCallback(
    async (id: number, data: StandInput) => {
      const res = await upsertStandAction({ ...data, id });
      if (res.ok) {
        toast.success(tToast("standUpdated"));
        router.refresh();
        return true;
      } else {
        toast.error(res.error ?? tError("saveStandFailed"));
        return false;
      }
    },
    [router, tError, tToast]
  );

  const deleteStand = useCallback(
    async (id: number) => {
      const res = await deleteStandAction(id);
      if (res.ok) {
        toast.success(tToast("standDeleted"));
        router.refresh();
        return true;
      } else {
        toast.error(res.error ?? tError("deleteStandFailed"));
        return false;
      }
    },
    [router, tError, tToast]
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
