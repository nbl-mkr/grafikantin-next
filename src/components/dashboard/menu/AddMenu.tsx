"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import MenuForm, { MenuFormData, emptyMenuForm } from "@/components/dashboard/menu/MenuForm";
import { useMenus } from "@/components/dashboard/menu/MenuContext";

export default function AddMenu() {
  const t = useTranslations("dashboard.menus");
  const tCommon = useTranslations("dashboard.common");
  const router = useRouter();
  const { addMenu, stands } = useMenus();
  const [form, setForm] = useState<MenuFormData>(emptyMenuForm);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nama.trim() || !form.standId) return;
    await addMenu({
      nama: form.nama,
      standId: form.standId,
      kategori: form.kategori,
      harga: form.harga,
      stok: form.stok,
      tersedia: form.tersedia,
      gambar: form.gambarFile,
    });
    router.push("/dashboard/menu");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-gray-900">{t("addTitle")}</h1>
          <p className="mt-1 text-xs text-gray-600">{t("addSubtitle")}</p>
        </div>
        <button
          type="submit"
          form="add-menu-form"
          className="rounded-lg bg-[#e76f51] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#d55f43]"
        >
          {tCommon("add")}
        </button>
      </div>
      <form
        id="add-menu-form"
        onSubmit={handleSubmit}
        className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
      >
        <h2 className="text-sm font-medium text-gray-900">{t("addSectionTitle")}</h2>
        <div className="mt-4">
          <MenuForm form={form} onChange={setForm} stands={stands} />
        </div>
      </form>
      <Link
        href="/dashboard/menu"
        className="inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        {tCommon("backToMenu")}
      </Link>
    </div>
  );
}