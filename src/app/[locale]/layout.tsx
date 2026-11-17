import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routing, type AppLocale } from "@/i18n/routing";
import LayoutWrapper from "@/components/LayoutWrapper";
import { Toaster } from "@/components/ui/sonner";
import { getProfile } from "@/lib/supabase/session";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as AppLocale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const profile = await getProfile();
  const initialUser = profile ? { id: profile.id, email: profile.email } : null;
  const initialPhoto = profile?.foto ?? null;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LayoutWrapper initialUser={initialUser} initialPhoto={initialPhoto}>
        {children}
      </LayoutWrapper>
      <Toaster />
    </NextIntlClientProvider>
  );
}
