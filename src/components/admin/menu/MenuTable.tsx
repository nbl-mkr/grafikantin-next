"use client";

import { useState } from "react";
import { Menu, menusData } from "@/data/adminMockData";

const kategoriStyles: Record<string, string> = {
  Makanan: "bg-blue-50 text-blue-600",
  Minuman: "bg-cyan-50 text-cyan-600",
  Snack: "bg-amber-50 text-amber-600",
};

type ModalMode = "add" | "edit" | null;

const emptyForm: Omit<Menu, "id"> = {
  nama: "",
  stand: "",
  kategori: "Makanan",
  harga: 0,
  stok: 0,
  terjual: 0,
  tersedia: true,
};

export default function MenuTable() {
  const [menus, setMenus] = useState<Menu[]>(menusData);
  const [searchTerm, setSearchTerm] = useState("");
  const [kategoriFilter, setKategoriFilter] = useState<"all" | "Makanan" | "Minuman" | "Snack">("all");
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [form, setForm] = useState<Omit<Menu, "id">>(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState<Menu | null>(null);

  const filtered = menus.filter((m) => {
    const matchSearch =
      m.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.stand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchKategori = kategoriFilter === "all" || m.kategori === kategoriFilter;
    return matchSearch && matchKategori;
  });

  const openAdd = () => {
    setForm(emptyForm);
    setSelectedMenu(null);
    setModalMode("add");
  };

  const openEdit = (menu: Menu) => {
    setSelectedMenu(menu);
    setForm({ nama: menu.nama, stand: menu.stand, kategori: menu.kategori, harga: menu.harga, stok: menu.stok, terjual: menu.terjual, tersedia: menu.tersedia });
    setModalMode("edit");
  };

  const closeModal = () => {
    setModalMode(null);
    setSelectedMenu(null);
    setForm(emptyForm);
  };

  const handleSave = () => {
    if (!form.nama.trim() || !form.stand.trim()) return;
    if (modalMode === "add") {
      const newId = Math.max(...menus.map((m) => m.id), 0) + 1;
      setMenus((prev) => [...prev, { id: newId, ...form }]);
    } else if (modalMode === "edit" && selectedMenu) {
      setMenus((prev) => prev.map((m) => (m.id === selectedMenu.id ? { ...m, ...form } : m)));
    }
    closeModal();
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setMenus((prev) => prev.filter((m) => m.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const toggleTersedia = (menu: Menu) => {
    setMenus((prev) => prev.map((m) => (m.id === menu.id ? { ...m, tersedia: !m.tersedia } : m)));
  };

  return (
    <>
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-sm font-medium text-gray-900">Semua Menu</h2>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Cari menu atau stand..."
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
              {(["all", "Makanan", "Minuman", "Snack"] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setKategoriFilter(f)}
                  className={`h-full rounded-sm px-2.5 flex items-center justify-center transition-colors ${
                    kategoriFilter === f ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:text-gray-900"
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
              + Tambah Menu
            </button>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100 text-sm">
            <thead>
              <tr className="text-left font-medium text-gray-500">
                <th className="px-4 py-3 whitespace-nowrap">Nama Menu</th>
                <th className="px-4 py-3 whitespace-nowrap">Stand</th>
                <th className="px-4 py-3 whitespace-nowrap">Kategori</th>
                <th className="px-4 py-3 whitespace-nowrap text-right">Harga</th>
                <th className="px-4 py-3 whitespace-nowrap text-center">Stok</th>
                <th className="px-4 py-3 whitespace-nowrap text-center">Terjual</th>
                <th className="px-4 py-3 whitespace-nowrap text-center">Tersedia</th>
                <th className="px-4 py-3 whitespace-nowrap text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length > 0 ? (
                filtered.map((menu) => (
                  <tr key={menu.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">{menu.nama}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-600">{menu.stand}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${kategoriStyles[menu.kategori] || "bg-gray-100 text-gray-600"}`}>
                        {menu.kategori}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-gray-600">
                      Rp {menu.harga.toLocaleString("id-ID")}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center text-gray-600">{menu.stok}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-center text-gray-600">{menu.terjual}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-center">
                      <button
                        type="button"
                        role="switch"
                        aria-checked={menu.tersedia}
                        onClick={() => toggleTersedia(menu)}
                        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors ${
                          menu.tersedia ? "bg-[#e76f51]" : "bg-gray-200"
                        }`}
                      >
                        <span className={`size-3.5 rounded-full bg-white transition-transform ${menu.tersedia ? "translate-x-4.5" : "translate-x-0.5"}`} />
                      </button>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(menu)}
                          className="rounded-md px-2.5 py-1 text-xs font-medium text-emerald-600 border border-emerald-200 hover:bg-emerald-50 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(menu)}
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
                  <td className="px-4 py-6 text-center text-gray-500" colSpan={8}>
                    Tidak ada menu yang sesuai dengan pencarian.
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
              {modalMode === "add" ? "Tambah Menu Baru" : "Edit Menu"}
            </h3>

            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Nama Menu</label>
                <input
                  type="text"
                  value={form.nama}
                  onChange={(e) => setForm((f) => ({ ...f, nama: e.target.value }))}
                  className="h-9 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-900 focus:border-[#e76f51] focus:outline-none"
                  placeholder="Nama menu"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Stand</label>
                <input
                  type="text"
                  value={form.stand}
                  onChange={(e) => setForm((f) => ({ ...f, stand: e.target.value }))}
                  className="h-9 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-900 focus:border-[#e76f51] focus:outline-none"
                  placeholder="Nama stand"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Kategori</label>
                  <select
                    value={form.kategori}
                    onChange={(e) => setForm((f) => ({ ...f, kategori: e.target.value as Menu["kategori"] }))}
                    className="h-9 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-900 focus:border-[#e76f51] focus:outline-none"
                  >
                    <option value="Makanan">Makanan</option>
                    <option value="Minuman">Minuman</option>
                    <option value="Snack">Snack</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Harga (Rp)</label>
                  <input
                    type="number"
                    value={form.harga}
                    onChange={(e) => setForm((f) => ({ ...f, harga: Number(e.target.value) }))}
                    className="h-9 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-900 focus:border-[#e76f51] focus:outline-none"
                    min={0}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Stok</label>
                  <input
                    type="number"
                    value={form.stok}
                    onChange={(e) => setForm((f) => ({ ...f, stok: Number(e.target.value) }))}
                    className="h-9 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-900 focus:border-[#e76f51] focus:outline-none"
                    min={0}
                  />
                </div>
                <div className="flex flex-col justify-end pb-1">
                  <label className="block text-xs font-medium text-gray-700 mb-2">Tersedia</label>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={form.tersedia}
                    onClick={() => setForm((f) => ({ ...f, tersedia: !f.tersedia }))}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors ${
                      form.tersedia ? "bg-[#e76f51]" : "bg-gray-200"
                    }`}
                  >
                    <span className={`size-4 rounded-full bg-white transition-transform ${form.tersedia ? "translate-x-6" : "translate-x-1"}`} />
                  </button>
                </div>
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
            <h3 className="text-base font-semibold text-gray-900">Hapus Menu</h3>
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
