"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { Stand, standsData } from "@/data/adminMockData";

interface StandContextValue {
  stands: Stand[];
  addStand: (data: Omit<Stand, "id">) => void;
  updateStand: (id: number, data: Omit<Stand, "id">) => void;
  deleteStand: (id: number) => void;
}

const StandContext = createContext<StandContextValue | null>(null);

export function StandProvider({ children }: { children: React.ReactNode }) {
  const [stands, setStands] = useState<Stand[]>(standsData);

  const addStand = useCallback((data: Omit<Stand, "id">) => {
    setStands((prev) => {
      const newId = Math.max(...prev.map((s) => s.id), 0) + 1;
      return [...prev, { id: newId, ...data }];
    });
  }, []);

  const updateStand = useCallback((id: number, data: Omit<Stand, "id">) => {
    setStands((prev) => prev.map((s) => (s.id === id ? { ...s, ...data } : s)));
  }, []);

  const deleteStand = useCallback((id: number) => {
    setStands((prev) => prev.filter((s) => s.id !== id));
  }, []);

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
