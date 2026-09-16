"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import AdaptiveImage from "@/components/common/AdaptiveImage";
import { dashboardNavItems, publicLinks } from "@/data/dashboardMockData";
import { logout } from "@/lib/actions";
import { updateProfileAction } from "@/lib/data/profile";
import type { Role } from "@/lib/roles";
import type { DashboardProfile } from "@/components/dashboard/DashboardShell";

interface SidebarProps {
  role: Role | null;
  profile: DashboardProfile;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ role, profile, isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const visibleNavItems = dashboardNavItems.filter(
    (item) => role !== null && item.roles.includes(role)
  );
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isLainnyaOpen, setIsLainnyaOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    if (nav.scrollTop !== 0) {
      nav.scrollTop = 0;
    }
  }, [isLainnyaOpen]);

  useEffect(() => {
    if (!isProfileModalOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsProfileModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isProfileModalOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const [fullName, setFullName] = useState(profile.fullName);
  const [email, setEmail] = useState(profile.email);
  const [photoProfile, setPhotoProfile] = useState(profile.photoProfile);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [savingProfile, setSavingProfile] = useState(false);
  const profileFileInputRef = useRef<HTMLInputElement>(null);

  const [prevProfile, setPrevProfile] = useState(profile);
  if (prevProfile !== profile) {
    setPrevProfile(profile);
    setFullName(profile.fullName);
    setEmail(profile.email);
    setPhotoProfile(profile.photoProfile);
    setPhotoFile(null);
  }

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

  const closeProfileModal = () => setIsProfileModalOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (savingProfile) return;
    setSavingProfile(true);
    const res = await updateProfileAction({
      username: fullName,
      email,
      fotoFile: photoFile,
    });
    setSavingProfile(false);
    if (!res.ok) {
      alert(res.error ?? "Gagal menyimpan perubahan");
      return;
    }
    setPhotoFile(null);
    if (profileFileInputRef.current) profileFileInputRef.current.value = "";
    router.refresh();
    closeProfileModal();
  };

  return (
    <>
      {/* Overlay mobile */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-100 bg-white transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16.25 shrink-0 items-center gap-2 border-b border-gray-100 px-4 text-gray-900 text-lg sm:px-6 lg:px-8">
          <Image
            src="/assets/logo.png"
            alt="Logo Grafikantin"
            width={32}
            height={32}
            className="h-8 w-auto object-contain"
          />
          <span>Grafikantin</span>
          <button
            type="button"
            aria-label="Tutup menu"
            onClick={onClose}
            className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-50 hover:text-gray-700 lg:hidden"
          >
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav
          ref={navRef}
          className="flex-1 overflow-y-scroll px-4 py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [overflow-anchor:none]"
        >
          <ul className="space-y-1">
            {visibleNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-gray-50 text-[#e76f51]"
                        : "text-gray-600 hover:bg-gray-50 hover:text-[#e76f51]"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 border-t border-gray-100 pt-4">
            <button
              type="button"
              onClick={() => setIsLainnyaOpen(!isLainnyaOpen)}
              aria-expanded={isLainnyaOpen}
              aria-controls="sidebar-lainnya"
              className="flex w-full cursor-pointer items-center justify-between rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-600 transition hover:text-[#e76f51]"
            >
              Lainnya
              <svg
                aria-hidden="true"
                className={`size-4 shrink-0 transition-transform duration-300 ${isLainnyaOpen ? "rotate-180" : ""}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

              {isLainnyaOpen && (
                <ul id="sidebar-lainnya" className="space-y-1 pt-2">
                  {publicLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className={`block rounded-xl px-4 py-2.5 text-sm transition ${
                            isActive
                              ? "bg-gray-50 font-semibold text-[#e76f51]"
                              : "text-gray-600 hover:bg-gray-50 hover:text-[#e76f51]"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                  <li className="pt-2 border-t border-gray-100">
                    <form action={logout}>
                      <button
                        type="submit"
                        onClick={onClose}
                        className="block w-full rounded-xl px-4 py-2.5 text-left text-sm text-[#e76f51] transition hover:bg-gray-50"
                      >
                        Logout
                      </button>
                    </form>
                  </li>
                </ul>
              )}
          </div>
        </nav>

        <div className="shrink-0 border-t border-gray-100 p-4">
          <div className="rounded-2xl border border-gray-100 bg-slate-50 p-3 shadow-sm">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="relative h-16 w-16 overflow-hidden rounded-full border border-gray-200 bg-white shadow-sm">
                <AdaptiveImage
                  src={photoProfile}
                  alt={fullName}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{fullName}</p>
                <p className="text-xs text-gray-600">{email}</p>
              </div>
            </div>
          </div>
        </div>

        {isProfileModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={closeProfileModal}
          >
            <div
              className="mx-4 w-full max-w-2xl rounded-2xl bg-white p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <h1 className="text-xl font-bold text-gray-900">Profil</h1>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Tutup profil"
                      onClick={closeProfileModal}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-50 hover:text-gray-700"
                    >
                      ✕
                    </button>
                    <button
                      type="submit"
                      form="profile-form"
                      disabled={savingProfile}
                      className="rounded-lg bg-[#e76f51] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#d55f43] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {savingProfile ? "Menyimpan..." : "Simpan Perubahan"}
                    </button>
                  </div>
                </div>

                <form
                  id="profile-form"
                  onSubmit={handleSubmit}
                  className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
                >
                  <h2 className="text-sm font-medium text-gray-900">Profil</h2>

                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2 flex flex-col items-center justify-center gap-4">
                      <label htmlFor="sidebar-photo-profile-upload" className="cursor-pointer">
                        <div className="relative h-32 w-32 overflow-hidden rounded-full border border-gray-200">
                          <AdaptiveImage
                            src={photoProfile}
                            alt="Foto Profil"
                            fill
                            sizes="128px"
                            className="object-cover"
                          />
                        </div>
                      </label>
                      <span className="text-sm font-medium text-gray-900">{fullName}</span>
                      <input
                        type="file"
                        id="sidebar-photo-profile-upload"
                        ref={profileFileInputRef}
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="sidebar-full-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nama
                      </label>
                      <input
                        type="text"
                        id="sidebar-full-name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="mt-1 h-9 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="sidebar-email-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Alamat Email
                      </label>
                      <input
                        type="email"
                        id="sidebar-email-address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 h-9 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
