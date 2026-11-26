"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useMenus } from "@/components/dashboard/menu/MenuContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { MenuCategoryRow } from "@/lib/data/types";

export default function MenuCategoryManager() {
  const t = useTranslations("dashboard.menus.categories");
  const locale = useLocale();
  const {
    categories,
    canManageCategories,
    addCategory,
    updateCategory,
    setCategoryActive,
    deleteCategory,
  } = useMenus();
  const [namaId, setNamaId] = useState("");
  const [namaEn, setNamaEn] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editNamaId, setEditNamaId] = useState("");
  const [editNamaEn, setEditNamaEn] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<MenuCategoryRow | null>(null);
  const [pending, setPending] = useState(false);

  if (!canManageCategories) return null;

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    try {
      const success = await addCategory({ namaId, namaEn });
      if (success) {
        setNamaId("");
        setNamaEn("");
      }
    } finally {
      setPending(false);
    }
  };

  const startEditing = (categoryId: number, currentNamaId: string, currentNamaEn: string) => {
    setEditingId(categoryId);
    setEditNamaId(currentNamaId);
    setEditNamaEn(currentNamaEn);
  };

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>, id: number) => {
    event.preventDefault();
    setPending(true);
    try {
      const success = await updateCategory({ id, namaId: editNamaId, namaEn: editNamaEn });
      if (success) setEditingId(null);
    } finally {
      setPending(false);
    }
  };

  const handleToggleActive = async (id: number, isActive: boolean) => {
    setPending(true);
    try {
      await setCategoryActive(id, !isActive);
    } finally {
      setPending(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setPending(true);
    try {
      const success = await deleteCategory(deleteTarget.id);
      if (success) setDeleteTarget(null);
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <section
        aria-labelledby="menu-category-title"
        className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
      >
      <div>
        <h2 id="menu-category-title" className="text-sm font-medium text-gray-900">
          {t("title")}
        </h2>
        <p className="mt-1 text-xs text-gray-600">{t("description")}</p>
      </div>

      <form
        onSubmit={handleCreate}
        className="mt-5 grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] sm:items-end sm:gap-4"
      >
        <label className="text-xs font-medium text-gray-700">
          {t("nameId")}
          <input
            required
            value={namaId}
            onChange={(event) => setNamaId(event.target.value)}
            className="mt-1 h-9 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-900 focus:border-[#e76f51] focus:outline-none"
          />
        </label>
        <label className="text-xs font-medium text-gray-700">
          {t("nameEn")}
          <input
            required
            value={namaEn}
            onChange={(event) => setNamaEn(event.target.value)}
            className="mt-1 h-9 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-900 focus:border-[#e76f51] focus:outline-none"
          />
        </label>
        <div className="flex items-end">
          <button
            type="submit"
            disabled={pending}
            className="h-9 shrink-0 rounded-lg bg-[#e76f51] px-4 text-sm font-medium text-white transition hover:bg-[#d55f43] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {t("add")}
          </button>
        </div>
      </form>

      <ul className="mt-5 divide-y divide-gray-100 border-t border-gray-100">
        {categories.map((category) => {
          const isEditing = editingId === category.id;
          const displayName = locale === "en" ? category.nama_en : category.nama_id;

          return (
            <li key={category.id} className="py-4">
              {isEditing ? (
                <form
                  onSubmit={(event) => handleUpdate(event, category.id)}
                  className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]"
                >
                  <label className="text-xs font-medium text-gray-700">
                    {t("nameId")}
                    <input
                      required
                      value={editNamaId}
                      onChange={(event) => setEditNamaId(event.target.value)}
                      className="mt-1 h-9 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-900 focus:border-[#e76f51] focus:outline-none"
                    />
                  </label>
                  <label className="text-xs font-medium text-gray-700">
                    {t("nameEn")}
                    <input
                      required
                      value={editNamaEn}
                      onChange={(event) => setEditNamaEn(event.target.value)}
                      className="mt-1 h-9 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-900 focus:border-[#e76f51] focus:outline-none"
                    />
                  </label>
                  <div className="flex items-end gap-2">
                    <button
                      type="submit"
                      disabled={pending}
                      className="h-9 rounded-md bg-[#e76f51] px-3 text-xs font-semibold text-white transition hover:bg-[#d55f43] disabled:opacity-60"
                    >
                      {t("save")}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      disabled={pending}
                      className="h-9 rounded-md border border-gray-200 px-3 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-60"
                    >
                      {t("cancel")}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900">{displayName}</p>
                    <p className="mt-0.5 text-xs text-gray-600">
                      {category.nama_id} · {category.nama_en}
                    </p>
                    <span
                      className={`mt-2 inline-flex text-xs font-medium ${
                        category.is_active ? "text-emerald-700" : "text-gray-500"
                      }`}
                    >
                      {category.is_active ? t("active") : t("inactive")}
                    </span>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        startEditing(category.id, category.nama_id, category.nama_en)
                      }
                      disabled={pending}
                      className="h-8 rounded-md border border-gray-200 px-3 text-xs font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
                    >
                      {t("edit")}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleToggleActive(category.id, category.is_active)}
                      disabled={pending}
                      className="h-8 rounded-md border border-gray-200 px-3 text-xs font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
                    >
                      {category.is_active ? t("deactivate") : t("activate")}
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(category)}
                      disabled={pending}
                      className="h-8 rounded-md border border-red-200 px-3 text-xs font-medium text-red-600 transition hover:border-red-300 hover:bg-red-50 disabled:opacity-60"
                    >
                      {t("delete")}
                    </button>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
      </section>
      <AlertDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open && !pending) setDeleteTarget(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {deleteTarget
                ? t("deleteTitle", {
                    name: locale === "en" ? deleteTarget.nama_en : deleteTarget.nama_id,
                  })
                : ""}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget
                ? t("deleteDescription", {
                    name: locale === "en" ? deleteTarget.nama_en : deleteTarget.nama_id,
                  })
                : ""}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={pending}>{t("cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={pending}>
              {t("delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
