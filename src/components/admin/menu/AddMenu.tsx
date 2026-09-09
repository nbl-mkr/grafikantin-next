"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MenuForm, { MenuFormData, emptyMenuForm } from "@/components/admin/menu/MenuForm";
import { useMenus } from "@/components/admin/menu/MenuContext";

export default function AddMenu() {
  const router = useRouter();
  const { addMenu } = useMenus();
  const [form, setForm] = useState<MenuFormData>(emptyMenuForm);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nama.trim() || !form.stand.trim()) return;
    addMenu(form);
    router.push("/admin/menu");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Tambah Menu</h1>
          <p className="mt-1 text-xs text-gray-500">
            Lengkapi informasi menu baru yang akan ditambahkan.
          </p>
        </div>
        <button
          type="submit"
          form="add-menu-form"
          className="rounded-lg bg-[#e76f51] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#d55f43]"
        >
          Tambah
        </button>
      </div>

      <form
        id="add-menu-form"
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
