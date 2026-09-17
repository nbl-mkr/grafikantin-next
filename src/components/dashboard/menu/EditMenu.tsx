"use client";
import { Link, useRouter } from "@/i18n/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import MenuForm, { MenuFormData } from "@/components/dashboard/menu/MenuForm";
import { useMenus } from "@/components/dashboard/menu/MenuContext";

interface EditMenuProps {
  menuId: number;
}

export default function EditMenu({ menuId }: EditMenuProps) {
  const t = useTranslations("dashboard.menus");
  const tCommon = useTranslations("dashboard.common");
  const router = useRouter();
  const { menus, stands, updateMenu } = useMenus();
  const menu = menus.find((m) => m.id === menuId);

  const [form, setForm] = useState<MenuFormData | null>(
    menu
      ? {
          nama: menu.nama,
          stand: menu.stand,
          standId: menu.standId,
          kategori: menu.kategori,
          harga: menu.harga,
          stok: menu.stok,
          tersedia: menu.tersedia,
          gambarFile: null,
          gambarPreview: menu.gambar,
        }
      : null
  );

  if (!menu || !form) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm">
        <h2 className="text-base font-semibold text-gray-900">{tCommon("menuNotFoundTitle")}</h2>
        <p className="mt-2 text-sm text-gray-600">
          {tCommon("menuNotFoundBody", { id: menuId })}
        </p>
        <Link
          href="/dashboard/menu"
          className="mt-4 inline-block rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          {tCommon("backToMenu")}
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nama.trim() || !form.standId) return;
    await updateMenu(menuId, {
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
          <h1 className="text-xl font-bold text-gray-900">{t("editTitle")}</h1>
          <p className="mt-1 text-xs text-gray-600">{t("editSubtitle", { name: menu.nama })}</p>
        </div>
        <button
          type="submit"
          form="edit-menu-form"
          className="rounded-lg bg-[#e76f51] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#d55f43]"
        >
          {tCommon("save")}
        </button>
      </div>
      <form
        id="edit-menu-form"
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