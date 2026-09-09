"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { Menu, menusData } from "@/data/adminMockData";

interface MenuContextValue {
  menus: Menu[];
  addMenu: (data: Omit<Menu, "id">) => void;
  updateMenu: (id: number, data: Omit<Menu, "id">) => void;
  deleteMenu: (id: number) => void;
  toggleTersedia: (id: number) => void;
}

const MenuContext = createContext<MenuContextValue | null>(null);

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [menus, setMenus] = useState<Menu[]>(menusData);

  const addMenu = useCallback((data: Omit<Menu, "id">) => {
    setMenus((prev) => {
      const newId = Math.max(...prev.map((m) => m.id), 0) + 1;
      return [...prev, { id: newId, ...data }];
    });
  }, []);

  const updateMenu = useCallback((id: number, data: Omit<Menu, "id">) => {
    setMenus((prev) => prev.map((m) => (m.id === id ? { ...m, ...data } : m)));
  }, []);

  const deleteMenu = useCallback((id: number) => {
    setMenus((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const toggleTersedia = useCallback((id: number) => {
    setMenus((prev) => prev.map((m) => (m.id === id ? { ...m, tersedia: !m.tersedia } : m)));
  }, []);

  return (
    <MenuContext.Provider value={{ menus, addMenu, updateMenu, deleteMenu, toggleTersedia }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenus() {
  const ctx = useContext(MenuContext);
  if (!ctx) {
    throw new Error("useMenus harus dipakai di dalam MenuProvider");
  }
  return ctx;
}
