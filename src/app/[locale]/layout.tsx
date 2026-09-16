import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import LayoutWrapper from "@/components/LayoutWrapper";
import { createClient } from "@/lib/supabase/server";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
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

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let initialUser: { id: string; email?: string | null } | null = null;
  let initialPhoto: string | null = null;

  if (user) {
    initialUser = { id: user.id, email: user.email };
    const { data: profile } = await supabase
      .from("users")
      .select("foto")
      .eq("id", user.id)
      .single();
    if (profile?.foto) initialPhoto = profile.foto;
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LayoutWrapper initialUser={initialUser} initialPhoto={initialPhoto}>
        {children}
      </LayoutWrapper>
    </NextIntlClientProvider>
  );
}
