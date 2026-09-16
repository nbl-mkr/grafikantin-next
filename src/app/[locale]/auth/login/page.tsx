import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import LoginForm from "@/components/forms/LoginForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("loginTitle"),
    description: t("loginDescription"),
  };
}

export default function LoginPage() {
  return <LoginForm />;
}
