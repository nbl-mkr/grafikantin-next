"use client";

import { useState } from "react";
import { Stand, standsData } from "@/data/adminMockData";

const statusStyles: Record<string, string> = {
  Buka: "bg-emerald-50 text-emerald-600",
  Tutup: "bg-red-50 text-red-600",
};

type ModalMode = "add" | "edit" | null;

const emptyForm: Omit<Stand, "id"> = {
  nama: "",
  pemilik: "",
  telepon: "",
  status: "Buka",
  totalMenu: 0,
  pendapatan: 0,
};

export default function StandTable() {
  const [stands, setStands] = useState<Stand[]>(standsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "Buka" | "Tutup">("all");
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selectedStand, setSelectedStand] = useState<Stand | null>(null);
  const [form, setForm] = useState<Omit<Stand, "id">>(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState<Stand | null>(null);

  const filtered = stands.filter((s) => {
    const matchSearch =
      s.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.pemilik.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === "all" || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const openAdd = () => {
    setForm(emptyForm);
    setSelectedStand(null);
    setModalMode("add");
  };

  const openEdit = (stand: Stand) => {
    setSelectedStand(stand);
    setForm({ nama: stand.nama, pemilik: stand.pemilik, telepon: stand.telepon, status: stand.status, totalMenu: stand.totalMenu, pendapatan: stand.pendapatan });
    setModalMode("edit");
  };

  const closeModal = () => {
    setModalMode(null);
    setSelectedStand(null);
    setForm(emptyForm);
  };

  const handleSave = () => {
    if (!form.nama.trim() || !form.pemilik.trim()) return;
    if (modalMode === "add") {
      const newId = Math.max(...stands.map((s) => s.id), 0) + 1;
      setStands((prev) => [...prev, { id: newId, ...form }]);
    } else if (modalMode === "edit" && selectedStand) {
      setStands((prev) => prev.map((s) => (s.id === selectedStand.id ? { ...s, ...form } : s)));
    }
    closeModal();
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setStands((prev) => prev.filter((s) => s.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <>
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-sm font-medium text-gray-900">Semua Stand</h2>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Cari stand..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9 w-full rounded-md border border-gray-200 pl-3 pr-9 text-sm text-gray-900 focus:border-[#e76f51] focus:outline-none sm:w-56"
              />
              <span className="pointer-events-none absolute inset-y-0 right-0 grid w-8 place-content-center text-gray-400">
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </span>
            </div>

            <div className="inline-flex h-9 items-center rounded-md border border-gray-200 p-1 text-xs font-medium">
              {(["all", "Buka", "Tutup"] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setStatusFilter(f)}
                  className={`h-full rounded-sm px-2.5 flex items-center justify-center transition-colors ${
                    statusFilter === f ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {f === "all" ? "Semua" : f}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={openAdd}
              className="h-9 rounded-lg bg-[#e76f51] px-4 text-sm font-medium text-white transition hover:bg-[#d55f43] whitespace-nowrap"
            >
              + Tambah Stand
            </button>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100 text-sm">
            <thead>
              <tr className="text-left font-medium text-gray-500">
                <th className="px-4 py-3 whitespace-nowrap">Nama Stand</th>
                <th className="px-4 py-3 whitespace-nowrap">Pemilik</th>
                <th className="px-4 py-3 whitespace-nowrap">Telepon</th>
                <th className="px-4 py-3 whitespace-nowrap">Status</th>
                <th className="px-4 py-3 whitespace-nowrap text-center">Total Menu</th>
                <th className="px-4 py-3 whitespace-nowrap text-right">Pendapatan</th>
                <th className="px-4 py-3 whitespace-nowrap text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length > 0 ? (
                filtered.map((stand) => (
                  <tr key={stand.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">{stand.nama}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-600">{stand.pemilik}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-500">{stand.telepon}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyles[stand.status] || "bg-gray-100 text-gray-600"}`}>
                        {stand.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center text-gray-600">{stand.totalMenu}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-gray-600">
                      Rp {stand.pendapatan.toLocaleString("id-ID")}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(stand)}
                          className="rounded-md px-2.5 py-1 text-xs font-medium text-emerald-600 border border-emerald-200 hover:bg-emerald-50 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(stand)}
                          className="rounded-md px-2.5 py-1 text-xs font-medium text-red-600 border border-red-200 hover:bg-red-50 transition-colors"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-6 text-center text-gray-500" colSpan={7}>
                    Tidak ada stand yang sesuai dengan pencarian.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-base font-semibold text-gray-900">
              {modalMode === "add" ? "Tambah Stand Baru" : "Edit Stand"}
            </h3>

            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Nama Stand</label>
                <input
                  type="text"
                  value={form.nama}
                  onChange={(e) => setForm((f) => ({ ...f, nama: e.target.value }))}
                  className="h-9 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-900 focus:border-[#e76f51] focus:outline-none"
                  placeholder="Nama stand"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Pemilik</label>
                <input
                  type="text"
                  value={form.pemilik}
                  onChange={(e) => setForm((f) => ({ ...f, pemilik: e.target.value }))}
                  className="h-9 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-900 focus:border-[#e76f51] focus:outline-none"
                  placeholder="Nama pemilik"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Telepon</label>
                <input
                  type="text"
                  value={form.telepon}
                  onChange={(e) => setForm((f) => ({ ...f, telepon: e.target.value }))}
                  className="h-9 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-900 focus:border-[#e76f51] focus:outline-none"
                  placeholder="Nomor telepon"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as "Buka" | "Tutup" }))}
                  className="h-9 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-900 focus:border-[#e76f51] focus:outline-none"
                >
                  <option value="Buka">Buka</option>
                  <option value="Tutup">Tutup</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="rounded-lg bg-[#e76f51] px-4 py-2 text-sm font-medium text-white hover:bg-[#d55f43] transition-colors"
              >
                {modalMode === "add" ? "Tambah" : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-base font-semibold text-gray-900">Hapus Stand</h3>
            <p className="mt-2 text-sm text-gray-500">
              Apakah kamu yakin ingin menghapus <strong>{deleteTarget.nama}</strong>? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 transition-colors"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
