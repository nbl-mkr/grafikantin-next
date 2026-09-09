"use client";

import { Menu } from "@/data/adminMockData";

export interface MenuFormData {
  nama: string;
  stand: string;
  kategori: Menu["kategori"];
  harga: number;
  stok: number;
  terjual: number;
  tersedia: boolean;
}

export const emptyMenuForm: MenuFormData = {
  nama: "",
  stand: "",
  kategori: "Makanan",
  harga: 0,
  stok: 0,
  terjual: 0,
  tersedia: true,
};

interface MenuFormProps {
  form: MenuFormData;
  onChange: (form: MenuFormData) => void;
}

export default function MenuForm({ form, onChange }: MenuFormProps) {
  const update = <K extends keyof MenuFormData>(key: K, value: MenuFormData[K]) => {
    onChange({ ...form, [key]: value });
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label
          htmlFor="menu-nama"
          className="block text-sm font-medium text-gray-700"
        >
          Nama menu
        </label>
        <input
          type="text"
          id="menu-nama"
          value={form.nama}
          onChange={(e) => update("nama", e.target.value)}
          className="mt-1 h-9 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-900 focus:border-[#e76f51] focus:outline-none"
          placeholder="Nama menu"
        />
      </div>

      <div>
        <label
          htmlFor="menu-stand"
          className="block text-sm font-medium text-gray-700"
        >
          Stand
        </label>
        <input
          type="text"
          id="menu-stand"
          value={form.stand}
          onChange={(e) => update("stand", e.target.value)}
          className="mt-1 h-9 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-900 focus:border-[#e76f51] focus:outline-none"
          placeholder="Nama stand"
        />
      </div>

      <div>
        <label
          htmlFor="menu-kategori"
          className="block text-sm font-medium text-gray-700"
        >
          Kategori
        </label>
        <select
          id="menu-kategori"
          value={form.kategori}
          onChange={(e) => update("kategori", e.target.value as Menu["kategori"])}
          className="mt-1 h-9 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-900 focus:border-[#e76f51] focus:outline-none"
        >
          <option value="Makanan">Makanan</option>
          <option value="Minuman">Minuman</option>
          <option value="Snack">Snack</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="menu-harga"
          className="block text-sm font-medium text-gray-700"
        >
          Harga (Rp)
        </label>
        <input
          type="number"
          id="menu-harga"
          value={form.harga}
          onChange={(e) => update("harga", Number(e.target.value))}
          min={0}
          className="mt-1 h-9 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-900 focus:border-[#e76f51] focus:outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="menu-stok"
          className="block text-sm font-medium text-gray-700"
        >
          Stok
        </label>
        <input
          type="number"
          id="menu-stok"
          value={form.stok}
          onChange={(e) => update("stok", Number(e.target.value))}
          min={0}
          className="mt-1 h-9 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-900 focus:border-[#e76f51] focus:outline-none"
        />
      </div>

      <div className="sm:col-span-2">
        <span className="block text-sm font-medium text-gray-700">Tersedia</span>
        <div className="mt-2">
          <button
            type="button"
            role="switch"
            aria-checked={form.tersedia}
            aria-label="Tersedia"
            onClick={() => update("tersedia", !form.tersedia)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors ${
              form.tersedia ? "bg-[#e76f51]" : "bg-gray-200"
            }`}
          >
            <span className={`size-4 rounded-full bg-white transition-transform ${form.tersedia ? "translate-x-6" : "translate-x-1"}`} />
          </button>
        </div>
      </div>
    </div>
  );
}
