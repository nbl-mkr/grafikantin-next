"use client";

import { useState } from "react";

export default function SettingsForm() {
  const [fullName, setFullName] = useState("Nabil Makarim");
  const [email, setEmail] = useState("n481lmaka@gmail.com");
  const [teamName, setTeamName] = useState("Grafikantin");
  const [photoProfile, setPhotoProfile] = useState("/assets/photo_profile.jpg");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [productUpdates, setProductUpdates] = useState(false);
  const [weeklySummary, setWeeklySummary] = useState(true);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoProfile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900">Pengaturan</h1>
        <button
          type="submit"
          form="account-settings-form"
          className="rounded-lg bg-[#e76f51] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#d55f43]"
        >
          Simpan perubahan
        </button>
      </div>

      <form
        id="account-settings-form"
        onSubmit={handleSubmit}
        className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
      >
        <h2 className="text-sm font-medium text-gray-900">Profil</h2>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2 flex flex-col items-center justify-center gap-4">
            <label htmlFor="photo-profile-upload" className="cursor-pointer">
              <div className="relative h-32 w-32 overflow-hidden rounded-full border border-gray-200">
                <img
                  src={photoProfile}
                  alt="Foto Profil"
                  className="h-full w-full object-cover"
                />
              </div>
            </label>
            <span className="text-sm font-medium text-gray-900">{fullName}</span>
            <input
              type="file"
              id="photo-profile-upload"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </div>

          <div>
            <label
              htmlFor="full-name"
              className="block text-sm font-medium text-gray-700"
            >
              Nama lengkap
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
            <label
              htmlFor="email-address"
              className="block text-sm font-medium text-gray-700"
            >
              Alamat email
            </label>
            <input
              type="email"
              id="email-address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 h-9 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="team-name"
              className="block text-sm font-medium text-gray-700"
            >
              Nama tim
            </label>
            <input
              type="text"
              id="team-name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="mt-1 h-9 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>
      </form>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-medium text-gray-900">Notifikasi</h2>

        <ul className="mt-4 divide-y divide-gray-100">
          <li className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
            <div>
              <p className="text-sm font-medium text-gray-900">
                Notifikasi email
              </p>
              <p className="text-xs text-gray-500">
                Dapatkan notifikasi saat pelanggan membuat pesanan.
              </p>
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
              <span
                className={`size-4 rounded-full bg-white transition-transform ${
                  emailNotifications ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </li>

          <li className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
            <div>
              <p className="text-sm font-medium text-gray-900">
                Pembaruan produk
              </p>
              <p className="text-xs text-gray-500">
                Email berkala mengenai fitur-fitur baru.
              </p>
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
              <span
                className={`size-4 rounded-full bg-white transition-transform ${
                  productUpdates ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </li>

          <li className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
            <div>
              <p className="text-sm font-medium text-gray-900">
                Ringkasan mingguan
              </p>
              <p className="text-xs text-gray-500">
                Ringkasan pendapatan dan pesanan setiap hari Senin.
              </p>
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
              <span
                className={`size-4 rounded-full bg-white transition-transform ${
                  weeklySummary ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </li>
        </ul>
      </div>

      <div className="rounded-2xl border border-red-100 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-medium text-gray-900">Zona berbahaya</h2>

        <p className="mt-2 text-sm text-gray-500">
          Menghapus tim Anda akan menghapus semua pelanggan, pesanan, dan riwayat pembayaran.
          Tindakan ini tidak dapat dibatalkan.
        </p>

        <button
          type="button"
          className="mt-4 inline-block rounded-md border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          Hapus tim
        </button>
      </div>
    </div>
  );
}