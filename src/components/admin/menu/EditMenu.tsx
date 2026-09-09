"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MenuForm, { MenuFormData } from "@/components/admin/menu/MenuForm";
import { useMenus } from "@/components/admin/menu/MenuContext";

interface EditMenuProps {
  menuId: number;
}

export default function EditMenu({ menuId }: EditMenuProps) {
  const router = useRouter();
  const { menus, updateMenu } = useMenus();
  const menu = menus.find((m) => m.id === menuId);

  const [form, setForm] = useState<MenuFormData | null>(
    menu
      ? {
          nama: menu.nama,
          stand: menu.stand,
          kategori: menu.kategori,
          harga: menu.harga,
          stok: menu.stok,
          terjual: menu.terjual,
          tersedia: menu.tersedia,
        }
      : null
  );

  if (!menu || !form) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm">
        <h2 className="text-base font-semibold text-gray-900">Menu Tidak Ditemukan</h2>
        <p className="mt-2 text-sm text-gray-500">
          Menu dengan ID {menuId} tidak ada di sistem.
        </p>
        <Link
          href="/admin/menu"
          className="mt-4 inline-block rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Kembali ke Daftar Menu
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nama.trim() || !form.stand.trim()) return;
    updateMenu(menuId, form);
    router.push("/admin/menu");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Edit Menu</h1>
          <p className="mt-1 text-xs text-gray-500">
            Perbarui informasi {menu.nama}.
          </p>
        </div>
        <button
          type="submit"
          form="edit-menu-form"
          className="rounded-lg bg-[#e76f51] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#d55f43]"
        >
          Simpan
        </button>
      </div>

      <form
        id="edit-menu-form"
        onSubmit={handleSubmit}
        className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
      >
        <h2 className="text-sm font-medium text-gray-900">Informasi Menu</h2>

        <div className="mt-4">
          <MenuForm form={form} onChange={setForm} />
        </div>
      </form>

      <Link
        href="/admin/menu"
        className="inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        Kembali ke Daftar Menu
      </Link>
    </div>
  );
}
