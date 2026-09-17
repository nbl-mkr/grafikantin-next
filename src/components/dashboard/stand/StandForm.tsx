"use client";
import { useTranslations } from "next-intl";
import CustomSelect from "@/components/CustomSelect";

export interface StandFormData {
  nama: string;
  pemilik: string;
  telepon: string;
  status: "Buka" | "Tutup";
}

export const emptyStandForm: StandFormData = {
  nama: "",
  pemilik: "",
  telepon: "",
  status: "Buka",
};

interface StandFormProps {
  form: StandFormData;
  onChange: (form: StandFormData) => void;
}

export default function StandForm({ form, onChange }: StandFormProps) {
  const t = useTranslations("dashboard.stands.form");
  const tEnum = useTranslations("dashboard.enums.standStatus");

  const update = <K extends keyof StandFormData>(key: K, value: StandFormData[K]) => {
    onChange({ ...form, [key]: value });
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label htmlFor="stand-nama" className="block text-sm font-medium text-gray-700">
          {t("name")}
        </label>
        <input
          type="text"
          id="stand-nama"
          value={form.nama}
          onChange={(e) => update("nama", e.target.value)}
          className="mt-1 h-9 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-900 focus:border-[#e76f51] focus:outline-none"
          placeholder={t("namePlaceholder")}
        />
      </div>
      <div>
        <label htmlFor="stand-pemilik" className="block text-sm font-medium text-gray-700">
          {t("owner")}
        </label>
        <input
          type="text"
          id="stand-pemilik"
          value={form.pemilik}
          onChange={(e) => update("pemilik", e.target.value)}
          className="mt-1 h-9 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-900 focus:border-[#e76f51] focus:outline-none"
          placeholder={t("ownerPlaceholder")}
        />
      </div>
      <div>
        <label htmlFor="stand-telepon" className="block text-sm font-medium text-gray-700">
          {t("phone")}
        </label>
        <input
          type="text"
          id="stand-telepon"
          value={form.telepon}
          onChange={(e) => update("telepon", e.target.value)}
          className="mt-1 h-9 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-900 focus:border-[#e76f51] focus:outline-none"
          placeholder={t("phonePlaceholder")}
        />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="stand-status" className="block text-sm font-medium text-gray-700">
          {t("status")}
        </label>
        <CustomSelect
          id="stand-status"
          value={form.status}
          options={[
            { value: "Buka", label: tEnum("Buka") },
            { value: "Tutup", label: tEnum("Tutup") },
          ]}
          onChange={(value) => update("status", value as "Buka" | "Tutup")}
          ariaLabel={t("selectStatus")}
        />
      </div>
    </div>
  );
}