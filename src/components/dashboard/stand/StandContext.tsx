"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
  const [stands, setStands] = useState<StandView[]>(initialStands);

  useEffect(() => {
    setStands(initialStands);
  }, [initialStands]);

  const addStand = useCallback(
    async (data: StandInput) => {
      const res = await upsertStandAction(data);
      if (res.ok) router.refresh();
      else alert(res.error ?? "Gagal menyimpan stand");
    },
    [router]
  );

  const updateStand = useCallback(
    async (id: number, data: StandInput) => {
      const res = await upsertStandAction({ ...data, id });
      if (res.ok) router.refresh();
      else alert(res.error ?? "Gagal menyimpan stand");
    },
    [router]
  );

  const deleteStand = useCallback(
    async (id: number) => {
      const res = await deleteStandAction(id);
      if (res.ok) router.refresh();
      else alert(res.error ?? "Gagal menghapus stand");
    },
    [router]
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
