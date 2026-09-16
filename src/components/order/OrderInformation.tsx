import { getTranslations } from "next-intl/server";

export default async function OrderInformation() {
  const t = await getTranslations("order");
  return (
    <div className="w-full bg-slate-50 py-12 md:py-16 text-gray-900 border-y border-gray-200/60">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-10 px-6 md:flex-row md:items-stretch">
        
        <div className="w-full text-left md:w-6/12 flex flex-col justify-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#e76f51] mb-2">
            {t("infoBadge")}
          </span>
          <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {t("infoTitle")}
          </h3>
          <p className="mt-3 text-base text-gray-600 leading-relaxed">
            {t("infoBody")}
          </p>
        </div>

        <div className="hidden md:block w-px bg-gray-200 self-stretch my-2" />

        <div className="w-full text-left md:w-5/12 flex flex-col justify-center">
          <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            {t("importantTitle")}
          </h4>

          <ul className="space-y-2.5 text-sm text-gray-600 leading-relaxed">
            <li className="flex items-start gap-2.5">
              <span className="text-[#e76f51] font-bold">•</span>
              <span>{t("important1")}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#e76f51] font-bold">•</span>
              <span>{t("important2")}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#e76f51] font-bold">•</span>
              <span>{t("important3")}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
