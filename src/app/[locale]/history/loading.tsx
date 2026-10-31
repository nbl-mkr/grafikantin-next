import { getTranslations } from "next-intl/server";

export default async function HistoryLoading() {
  const t = await getTranslations("history");

  return (
    <div
      aria-busy="true"
      className="mx-auto w-full max-w-5xl bg-slate-50 px-4 py-10 pb-28 sm:px-6"
    >
      <p className="sr-only" role="status">{t("loading")}</p>
      <div className="mb-10 max-w-3xl">
        <div className="h-9 w-64 motion-safe:animate-pulse bg-slate-200" />
        <div className="mt-4 h-5 max-w-xl motion-safe:animate-pulse bg-slate-200" />
      </div>
      <div className="max-w-5xl">
        <div className="mb-4 h-7 w-28 motion-safe:animate-pulse bg-slate-200" />
        <ul className="divide-y divide-slate-200">
          {[0, 1, 2].map((item) => (
            <li
              key={item}
              className="grid grid-cols-[minmax(112px,0.36fr)_minmax(0,1fr)] gap-4 py-5 sm:grid-cols-[minmax(180px,0.38fr)_minmax(0,1fr)] sm:gap-6"
            >
              <div className="aspect-video motion-safe:animate-pulse rounded-lg bg-slate-200" />
              <div className="space-y-3">
                <div className="h-5 max-w-sm motion-safe:animate-pulse bg-slate-200" />
                <div className="h-4 max-w-xs motion-safe:animate-pulse bg-slate-200" />
                <div className="h-4 max-w-[70%] motion-safe:animate-pulse bg-slate-200" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
