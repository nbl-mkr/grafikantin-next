"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { login } from "@/lib/actions";

export default function LoginForm() {
  const t = useTranslations("auth");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="h-screen w-full flex flex-col lg:flex-row overflow-hidden bg-slate-50">
      <div className="relative flex h-1/2 w-full flex-col justify-between pt-12 pb-6 px-6 sm:p-8 lg:h-full lg:w-1/2 lg:p-12 text-white overflow-hidden">
        <Image
          src="/assets/menu.jpg"
          alt="Menu Grafikantin"
          fill
          priority
          className="object-cover"
        />
        
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/30" />

        <div className="relative z-10 w-full max-w-md">
          <Link href="/" className="inline-block text-xl sm:text-2xl font-bold tracking-tight text-white">
            Grafikantin
          </Link>
        </div>

        <div className="relative z-10 w-full max-w-md">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
            {t("sideTitle")}
          </h2>
          <p className="mt-2 sm:mt-4 text-xs sm:text-sm lg:text-base text-gray-200 leading-relaxed">
            {t("sideSubtitle")}
          </p>
        </div>

        <div className="relative z-10" />
      </div>

      <div className="relative flex h-1/2 w-full flex-col justify-center items-center px-6 py-4 sm:p-8 lg:h-full lg:w-1/2 lg:p-12 bg-white overflow-y-auto">
        <div className="w-full max-w-md mx-auto">
          <div className="mb-4 sm:mb-6 lg:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              {t("loginTitle")}
            </h1>
            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600">
              {t("loginSubtitle")}
            </p>
          </div>

          <form action={login} className="space-y-3.5 sm:space-y-5">
            <div className="space-y-1 sm:space-y-1.5">
              <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-gray-700">
                {t("emailLabel")}
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("emailPlaceholder")}
                  className="w-full rounded-xl border border-gray-200 bg-white py-2.5 sm:py-3 pl-3.5 sm:pl-4 pr-10 sm:pr-11 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:border-[#62748e] focus:outline-none focus:ring-1 focus:ring-[#62748e] shadow-sm transition"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-3.5 text-gray-600">
                  <svg className="size-4 sm:size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-1 sm:space-y-1.5">
              <label htmlFor="password" className="block text-xs sm:text-sm font-semibold text-gray-700">
                {t("passwordLabel")}
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("passwordPlaceholder")}
                  className="w-full rounded-xl border border-gray-200 bg-white py-2.5 sm:py-3 pl-3.5 sm:pl-4 pr-10 sm:pr-11 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:border-[#62748e] focus:outline-none focus:ring-1 focus:ring-[#62748e] shadow-sm transition"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-3.5 text-gray-600">
                  <svg className="size-4 sm:size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#e76f51] py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white transition hover:bg-[#d55f43] shadow-sm"
            >
              {t("submit")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}