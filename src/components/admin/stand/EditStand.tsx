"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import StandForm, { StandFormData } from "@/components/admin/stand/StandForm";
import { useStands } from "@/components/admin/stand/StandContext";

interface EditStandProps {
  standId: number;
}

export default function EditStand({ standId }: EditStandProps) {
  const router = useRouter();
  const { stands, updateStand } = useStands();
  const stand = stands.find((s) => s.id === standId);

  const [form, setForm] = useState<StandFormData | null>(
    stand
      ? {
          nama: stand.nama,
          pemilik: stand.pemilik,
          telepon: stand.telepon,
          status: stand.status,
          totalMenu: stand.totalMenu,
          pendapatan: stand.pendapatan,
        }
      : null
  );

  if (!stand || !form) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm">
        <h2 className="text-base font-semibold text-gray-900">Stand Tidak Ditemukan</h2>
        <p className="mt-2 text-sm text-gray-500">
          Stand dengan ID {standId} tidak ada di sistem.
        </p>
        <Link
          href="/admin/stand"
          className="mt-4 inline-block rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Kembali ke Daftar Stand
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nama.trim() || !form.pemilik.trim()) return;
    updateStand(standId, form);
    router.push("/admin/stand");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Edit Stand</h1>
          <p className="mt-1 text-xs text-gray-500">
            Perbarui informasi {stand.nama}.
          </p>
        </div>
        <button
          type="submit"
          form="edit-stand-form"
          className="rounded-lg bg-[#e76f51] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#d55f43]"
        >
          Simpan
        </button>
      </div>

      <form
        id="edit-stand-form"
        onSubmit={handleSubmit}
        className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
      >
        <h2 className="text-sm font-medium text-gray-900">Informasi Stand</h2>

        <div className="mt-4">
          <StandForm form={form} onChange={setForm} />
        </div>
      </form>

      <Link
        href="/admin/stand"
        className="inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        Kembali ke Daftar Stand
      </Link>
    </div>
  );
}
