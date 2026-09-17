import InvoiceCard from "@/components/invoice/InvoiceCard";
import { fetchInvoice } from "@/lib/data/queries";
import { getProfile } from "@/lib/supabase/session";
import { getLocale } from "next-intl/server";

export default async function InvoicePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { kode } = await searchParams;
  const locale = await getLocale();
  const profile = await getProfile();
  const order =
    typeof kode === "string" && kode && profile
      ? await fetchInvoice(kode, profile.id, locale)
      : null;

  return (
    <div className="w-full bg-slate-50 py-8">
      <InvoiceCard order={order} />
    </div>
  );
}
