"use client";
import { createContext, useCallback, useContext, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  upsertMenuAction,
  upsertMenuCategoryAction,
  deleteMenuAction,
  deleteMenuCategoryAction,
  setMenuCategoryActiveAction,
  toggleMenuTersediaAction,
  type MenuInput,
  type MenuCategoryInput,
} from "@/lib/data/mutations";
import type { MenuView } from "@/lib/data/views";
import type { MenuCategoryRow } from "@/lib/data/types";

interface MenuContextValue {
  menus: MenuView[];
  stands: { id: number; nama: string }[];
  categories: MenuCategoryRow[];
  canManageCategories: boolean;
  addMenu: (data: MenuInput) => Promise<boolean>;
  updateMenu: (id: number, data: MenuInput) => Promise<boolean>;
  deleteMenu: (id: number) => Promise<boolean>;
  toggleTersedia: (id: number) => Promise<boolean>;
  addCategory: (data: MenuCategoryInput) => Promise<boolean>;
  updateCategory: (data: MenuCategoryInput & { id: number }) => Promise<boolean>;
  setCategoryActive: (id: number, isActive: boolean) => Promise<boolean>;
  deleteCategory: (id: number) => Promise<boolean>;
}

const MenuContext = createContext<MenuContextValue | null>(null);

export function MenuProvider({
  children,
  initialMenus,
  initialStands,
  initialCategories,
  canManageCategories,
}: {
  children: React.ReactNode;
  initialMenus: MenuView[];
  initialStands: { id: number; nama: string }[];
  initialCategories: MenuCategoryRow[];
  canManageCategories: boolean;
}) {
  const router = useRouter();
  const tError = useTranslations("dashboard.errors");
  const tToast = useTranslations("dashboard.toasts");
  const [menus, setMenus] = useState<MenuView[]>(initialMenus);
  const [syncedInitialMenus, setSyncedInitialMenus] = useState(initialMenus);
  const [categories, setCategories] = useState(initialCategories);
  const [syncedInitialCategories, setSyncedInitialCategories] = useState(initialCategories);

  if (syncedInitialMenus !== initialMenus) {
    setSyncedInitialMenus(initialMenus);
    setMenus(initialMenus);
  }

  if (syncedInitialCategories !== initialCategories) {
    setSyncedInitialCategories(initialCategories);
    setCategories(initialCategories);
  }

  const addMenu = useCallback(
    async (data: MenuInput) => {
      const res = await upsertMenuAction(data);
      if (res.ok) {
        toast.success(tToast("menuCreated"));
        router.refresh();
        return true;
      } else {
        toast.error(
          res.errorKey === "chooseCategory"
            ? tError("chooseCategory")
            : res.error ?? tError("saveMenuFailed")
        );
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
        toast.error(
          res.errorKey === "chooseCategory"
            ? tError("chooseCategory")
            : res.error ?? tError("saveMenuFailed")
        );
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

  const addCategory = useCallback(
    async (data: MenuCategoryInput) => {
      const res = await upsertMenuCategoryAction(data);
      if (res.ok) {
        toast.success(tToast("categoryCreated"));
        router.refresh();
        return true;
      }
      const message =
        res.errorKey === "categoryNameRequired"
          ? tError("categoryNameRequired")
          : res.errorKey === "categoryAlreadyExists"
            ? tError("categoryAlreadyExists")
            : res.error ?? tError("saveCategoryFailed");
      toast.error(message);
      return false;
    },
    [router, tError, tToast]
  );

  const updateCategory = useCallback(
    async (data: MenuCategoryInput & { id: number }) => {
      const res = await upsertMenuCategoryAction(data);
      if (res.ok) {
        toast.success(tToast("categoryUpdated"));
        router.refresh();
        return true;
      }
      const message =
        res.errorKey === "categoryNameRequired"
          ? tError("categoryNameRequired")
          : res.errorKey === "categoryAlreadyExists"
            ? tError("categoryAlreadyExists")
            : res.errorKey === "categoryNotFound"
              ? tError("categoryNotFound")
              : res.error ?? tError("saveCategoryFailed");
      toast.error(message);
      return false;
    },
    [router, tError, tToast]
  );

  const setCategoryActive = useCallback(
    async (id: number, isActive: boolean) => {
      const res = await setMenuCategoryActiveAction(id, isActive);
      if (res.ok) {
        toast.success(tToast(isActive ? "categoryActivated" : "categoryDeactivated"));
        router.refresh();
        return true;
      }
      const message =
        res.errorKey === "categoryInUse"
          ? tError("categoryInUse")
          : res.errorKey === "categoryNotFound"
            ? tError("categoryNotFound")
            : res.error ?? tError("categoryStatusFailed");
      toast.error(message);
      return false;
    },
    [router, tError, tToast]
  );

  const deleteCategory = useCallback(
    async (id: number) => {
      const res = await deleteMenuCategoryAction(id);
      if (res.ok) {
        toast.success(tToast("categoryDeleted"));
        router.refresh();
        return true;
      }
      const message =
        res.errorKey === "categoryInUse"
          ? tError("categoryInUse")
          : res.errorKey === "categoryNotFound"
            ? tError("categoryNotFound")
            : res.errorKey === "notAllowed"
              ? tError("notAllowed")
              : res.error ?? tError("deleteCategoryFailed");
      toast.error(message);
      return false;
    },
    [router, tError, tToast]
  );

  return (
    <MenuContext.Provider
      value={{
        menus,
        stands: initialStands,
        categories,
        canManageCategories,
        addMenu,
        updateMenu,
        deleteMenu,
        toggleTersedia,
        addCategory,
        updateCategory,
        setCategoryActive,
        deleteCategory,
      }}
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
