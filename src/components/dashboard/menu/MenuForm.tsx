"use client";
import { useTranslations } from "next-intl";
import CustomSelect from "@/components/CustomSelect";
import ImageUploadField from "@/components/dashboard/ImageUploadField";

export type MenuKategori = "Makanan" | "Snack";

export interface MenuFormData {
  nama: string;
  stand: string;
  standId: number;
  kategori: MenuKategori;
  harga: number;
  stok: number;
  tersedia: boolean;
  gambarFile: File | null;
  gambarPreview: string | null;
}

export const emptyMenuForm: MenuFormData = {
  nama: "",
  stand: "",
  standId: 0,
  kategori: "Makanan",
  harga: 0,
  stok: 0,
  tersedia: true,
  gambarFile: null,
  gambarPreview: null,
};

interface MenuFormProps {
  form: MenuFormData;
  onChange: (form: MenuFormData) => void;
  stands: { id: number; nama: string }[];
}

export default function MenuForm({ form, onChange, stands }: MenuFormProps) {
  const t = useTranslations("dashboard.menus.form");

  const update = <K extends keyof MenuFormData>(key: K, value: MenuFormData[K]) => {
    onChange({ ...form, [key]: value });
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label htmlFor="menu-nama" className="block text-sm font-medium text-gray-700">
          {t("name")}
        </label>
        <input
          type="text"
          id="menu-nama"
          value={form.nama}
          onChange={(e) => update("nama", e.target.value)}
          className="mt-1 h-9 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-900 focus:border-[#e76f51] focus:outline-none"
          placeholder={t("namePlaceholder")}
        />
      </div>
      <div>
        <label htmlFor="menu-stand" className="block text-sm font-medium text-gray-700">
          {t("stand")}
        </label>
        <CustomSelect
          id="menu-stand"
          value={form.stand}
          options={stands.map((stand) => ({
            value: stand.nama,
            label: stand.nama,
          }))}
          onChange={(value) => {
            const picked = stands.find((s) => s.nama === value);
            onChange({ ...form, stand: value, standId: picked?.id ?? 0 });
          }}
          ariaLabel={t("selectStand")}
        />
      </div>
      <div>
        <label htmlFor="menu-kategori" className="block text-sm font-medium text-gray-700">
          {t("category")}
        </label>
        <CustomSelect
          id="menu-kategori"
          value={form.kategori}
          options={[
            { value: "Makanan", label: "Makanan" },
            { value: "Snack", label: "Snack" },
          ]}
          onChange={(value) => update("kategori", value as MenuKategori)}
          ariaLabel={t("selectCategory")}
        />
      </div>
      <div>
        <label htmlFor="menu-harga" className="block text-sm font-medium text-gray-700">
          {t("price")}
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
        <label htmlFor="menu-stok" className="block text-sm font-medium text-gray-700">
          {t("stock")}
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
        <label htmlFor="menu-gambar" className="block text-sm font-medium text-gray-700">
          {t("image")}
        </label>
        <ImageUploadField
          id="menu-gambar"
          preview={form.gambarPreview}
          onSelect={(file) => {
            const nextPreview = file ? URL.createObjectURL(file) : null;
            onChange({ ...form, gambarFile: file, gambarPreview: nextPreview });
          }}
        />
      </div>
      <div className="sm:col-span-2">
        <span className="block text-sm font-medium text-gray-700">{t("available")}</span>
        <div className="mt-2">
          <button
            type="button"
            role="switch"
            aria-checked={form.tersedia}
            aria-label={t("available")}
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