"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { updateProfileAction } from "@/lib/data/profile";

interface SettingsFormProps {
  initialFullName: string;
  initialEmail: string;
  initialPhotoProfile: string;
}

export default function SettingsForm({
  initialFullName,
  initialEmail,
  initialPhotoProfile,
}: SettingsFormProps) {
  const t = useTranslations("dashboard.settings");
  const tCommon = useTranslations("dashboard.common");
  const tErrors = useTranslations("dashboard.errors");
  const router = useRouter();

  const [fullName, setFullName] = useState(initialFullName);
  const [email, setEmail] = useState(initialEmail);
  const [photoProfile, setPhotoProfile] = useState(initialPhotoProfile);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [productUpdates, setProductUpdates] = useState(false);
  const [weeklySummary, setWeeklySummary] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoProfile(reader.result as string);
      };
      reader.readAsDataURL(file);
      setPhotoFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    setSavedMessage("");
    const res = await updateProfileAction({
      username: fullName,
      email,
      fotoFile: photoFile,
    });
    setSaving(false);
    if (!res.ok) {
      alert(res.error ?? tErrors("saveProfileFailed"));
      return;
    }
    setPhotoFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setSavedMessage(tCommon("saved"));
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900">{t("title")}</h1>
        <div className="flex items-center gap-3">
          {savedMessage && (
            <span className="text-sm font-semibold text-gray-600">{savedMessage}</span>
          )}
          <button
            type="submit"
            form="account-settings-form"
            disabled={saving}
            className="rounded-lg bg-[#e76f51] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#d55f43] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? tCommon("saving") : tCommon("saveChanges")}
          </button>
        </div>
      </div>
      <form
        id="account-settings-form"
        onSubmit={handleSubmit}
        className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
      >
        <h2 className="text-sm font-medium text-gray-900">{t("profile")}</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2 flex flex-col items-center justify-center gap-4">
            <label htmlFor="photo-profile-upload" className="cursor-pointer">
              <div className="relative h-32 w-32 overflow-hidden rounded-full border border-gray-200">
                <img
                  src={photoProfile}
                  alt={t("photoAlt")}
                  className="h-full w-full object-cover"
                />
              </div>
            </label>
            <span className="text-sm font-medium text-gray-900">{fullName}</span>
            <input
              type="file"
              id="photo-profile-upload"
              ref={fileInputRef}
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </div>
          <div>
            <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">
              {t("name")}
            </label>
            <input
              type="text"
              id="full-name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 h-9 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
              {t("email")}
            </label>
            <input
              type="email"
              id="email-address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 h-9 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>
      </form>
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-medium text-gray-900">{t("notifications")}</h2>
        <ul className="mt-4 divide-y divide-gray-100">
          <li className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
            <div>
              <p className="text-sm font-medium text-gray-900">{t("emailNotifications")}</p>
              <p className="text-xs text-gray-600">{t("emailNotificationsDesc")}</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={emailNotifications}
              onClick={() => setEmailNotifications(!emailNotifications)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors ${
                emailNotifications ? "bg-[#e76f51]" : "bg-gray-200"
              }`}
            >
              <span className={`size-4 rounded-full bg-white transition-transform ${emailNotifications ? "translate-x-6" : "translate-x-1"}`} />
            </button>
          </li>
          <li className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
            <div>
              <p className="text-sm font-medium text-gray-900">{t("productUpdates")}</p>
              <p className="text-xs text-gray-600">{t("productUpdatesDesc")}</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={productUpdates}
              onClick={() => setProductUpdates(!productUpdates)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors ${
                productUpdates ? "bg-[#e76f51]" : "bg-gray-200"
              }`}
            >
              <span className={`size-4 rounded-full bg-white transition-transform ${productUpdates ? "translate-x-6" : "translate-x-1"}`} />
            </button>
          </li>
          <li className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
            <div>
              <p className="text-sm font-medium text-gray-900">{t("weeklySummary")}</p>
              <p className="text-xs text-gray-600">{t("weeklySummaryDesc")}</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={weeklySummary}
              onClick={() => setWeeklySummary(!weeklySummary)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors ${
                weeklySummary ? "bg-[#e76f51]" : "bg-gray-200"
              }`}
            >
              <span className={`size-4 rounded-full bg-white transition-transform ${weeklySummary ? "translate-x-6" : "translate-x-1"}`} />
            </button>
          </li>
        </ul>
      </div>
      <div className="rounded-2xl border border-red-100 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-medium text-gray-900">{t("dangerZone")}</h2>
        <p className="mt-2 text-sm text-gray-600">{t("dangerBody")}</p>
        <button
          type="button"
          className="mt-4 inline-block rounded-md border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          {t("deleteAccount")}
        </button>
      </div>
    </div>
  );
}