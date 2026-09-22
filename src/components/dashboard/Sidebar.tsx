"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import AdaptiveImage from "@/components/common/AdaptiveImage";
import { getDashboardNavItems, getPublicLinks } from "@/data/dashboardMockData";
import { Link, usePathname } from "@/i18n/navigation";
import { logout } from "@/lib/actions";
import type { Role } from "@/lib/roles";
import type { DashboardProfile } from "@/components/dashboard/DashboardShell";

interface SidebarProps {
  role: Role | null;
  profile: DashboardProfile;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ role, profile, isOpen, onClose }: SidebarProps) {
  const t = useTranslations("dashboard");
  const pathname = usePathname();

  const dashboardNavItems = getDashboardNavItems(t);
  const publicLinks = getPublicLinks(t);

  const visibleNavItems = dashboardNavItems.filter(
    (item) => role !== null && item.roles.includes(role)
  );

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
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
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
            src="/assets/logo_header.png"
            alt="Logo Grafikantin"
            width={32}
            height={32}
            className="h-8 w-auto object-contain"
          />
          <span>Grafikantin</span>
          <button
            type="button"
            aria-label={t("nav.closeMenu")}
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
          className="flex-1 overflow-y-scroll px-4 py-6 scrollbar-none [&::-webkit-scrollbar]:hidden [overflow-anchor:none]"
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
              {t("nav.more")}
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
                      {t("nav.logout")}
                    </button>
                  </form>
                </li>
              </ul>
            )}
          </div>
        </nav>
        <div className="shrink-0 border-t border-gray-100 p-4">
          <Link
            href="/dashboard/setting"
            onClick={onClose}
            className="block rounded-2xl border border-gray-100 bg-slate-50 p-3 shadow-sm transition hover:border-gray-200 hover:bg-slate-100"
          >
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="relative h-16 w-16 overflow-hidden rounded-full border border-gray-200 bg-white shadow-sm">
                <AdaptiveImage
                  src={profile.photoProfile}
                  alt={profile.fullName}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{profile.fullName}</p>
                <p className="text-xs text-gray-600">{profile.email}</p>
              </div>
            </div>
          </Link>
        </div>
      </aside>
    </>
  );
}
