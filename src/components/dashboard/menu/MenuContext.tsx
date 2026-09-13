"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  upsertMenuAction,
  deleteMenuAction,
  toggleMenuTersediaAction,
  type MenuInput,
} from "@/lib/data/mutations";
import type { MenuView } from "@/lib/data/views";

interface MenuContextValue {
  menus: MenuView[];
  stands: { id: number; nama: string }[];
  addMenu: (data: MenuInput) => Promise<void>;
  updateMenu: (id: number, data: MenuInput) => Promise<void>;
  deleteMenu: (id: number) => Promise<void>;
  toggleTersedia: (id: number) => Promise<void>;
}

const MenuContext = createContext<MenuContextValue | null>(null);

export function MenuProvider({
  children,
  initialMenus,
  initialStands,
}: {
  children: React.ReactNode;
  initialMenus: MenuView[];
  initialStands: { id: number; nama: string }[];
}) {
  const router = useRouter();
  const [menus, setMenus] = useState<MenuView[]>(initialMenus);

  useEffect(() => {
    setMenus(initialMenus);
  }, [initialMenus]);

  const addMenu = useCallback(
    async (data: MenuInput) => {
      const res = await upsertMenuAction(data);
      if (res.ok) router.refresh();
      else alert(res.error ?? "Gagal menyimpan menu");
    },
    [router]
  );

  const updateMenu = useCallback(
    async (id: number, data: MenuInput) => {
      const res = await upsertMenuAction({ ...data, id });
      if (res.ok) router.refresh();
      else alert(res.error ?? "Gagal menyimpan menu");
    },
    [router]
  );

  const deleteMenu = useCallback(
    async (id: number) => {
      const res = await deleteMenuAction(id);
      if (res.ok) router.refresh();
      else alert(res.error ?? "Gagal menghapus menu");
    },
    [router]
  );

  const toggleTersedia = useCallback(
    async (id: number) => {
      setMenus((prev) => prev.map((m) => (m.id === id ? { ...m, tersedia: !m.tersedia } : m)));
      const res = await toggleMenuTersediaAction(id);
      if (!res.ok) {
        setMenus((prev) => prev.map((m) => (m.id === id ? { ...m, tersedia: !m.tersedia } : m)));
        alert(res.error ?? "Gagal mengubah status");
      }
      router.refresh();
    },
    [router]
  );

  return (
    <MenuContext.Provider value={{ menus, stands: initialStands, addMenu, updateMenu, deleteMenu, toggleTersedia }}>
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
