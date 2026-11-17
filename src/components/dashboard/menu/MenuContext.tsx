"use client";
import { createContext, useCallback, useContext, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
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
  addMenu: (data: MenuInput) => Promise<boolean>;
  updateMenu: (id: number, data: MenuInput) => Promise<boolean>;
  deleteMenu: (id: number) => Promise<boolean>;
  toggleTersedia: (id: number) => Promise<boolean>;
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
  const tError = useTranslations("dashboard.errors");
  const tToast = useTranslations("dashboard.toasts");
  const [menus, setMenus] = useState<MenuView[]>(initialMenus);
  const [syncedInitialMenus, setSyncedInitialMenus] = useState(initialMenus);

  if (syncedInitialMenus !== initialMenus) {
    setSyncedInitialMenus(initialMenus);
    setMenus(initialMenus);
  }

  const addMenu = useCallback(
    async (data: MenuInput) => {
      const res = await upsertMenuAction(data);
      if (res.ok) {
        toast.success(tToast("menuCreated"));
        router.refresh();
        return true;
      } else {
        toast.error(res.error ?? tError("saveMenuFailed"));
        return false;
      }
    },
    [router, tError, tToast]
  );

  const updateMenu = useCallback(
    async (id: number, data: MenuInput) => {
      const res = await upsertMenuAction({ ...data, id });
      if (res.ok) {
        toast.success(tToast("menuUpdated"));
        router.refresh();
        return true;
      } else {
        toast.error(res.error ?? tError("saveMenuFailed"));
        return false;
      }
    },
    [router, tError, tToast]
  );

  const deleteMenu = useCallback(
    async (id: number) => {
      const res = await deleteMenuAction(id);
      if (res.ok) {
        toast.success(tToast("menuDeleted"));
        router.refresh();
        return true;
      } else {
        toast.error(res.error ?? tError("deleteMenuFailed"));
        return false;
      }
    },
    [router, tError, tToast]
  );

  const toggleTersedia = useCallback(
    async (id: number) => {
      setMenus((prev) =>
        prev.map((m) => (m.id === id ? { ...m, tersedia: !m.tersedia } : m))
      );
      const res = await toggleMenuTersediaAction(id);
      if (!res.ok) {
        setMenus((prev) =>
          prev.map((m) => (m.id === id ? { ...m, tersedia: !m.tersedia } : m))
        );
        toast.error(res.error ?? tError("toggleStatusFailed"));
        return false;
      }
      toast.success(tToast("menuStatusUpdated"));
      router.refresh();
      return true;
    },
    [router, tError, tToast]
  );

  return (
    <MenuContext.Provider
      value={{ menus, stands: initialStands, addMenu, updateMenu, deleteMenu, toggleTersedia }}
    >
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
