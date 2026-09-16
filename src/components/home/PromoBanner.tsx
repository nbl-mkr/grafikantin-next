import { getTranslations } from "next-intl/server";

export default async function PromoBanner() {
  const t = await getTranslations("promo");
  return (
    <section className="relative w-full overflow-hidden bg-[#fafafa] border-t border-b border-gray-100 py-8 text-black">
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
          backgroundSize: '16px 16px'
        }}
      />

      <div className="relative mx-auto flex max-w-[75vw] flex-col items-center justify-between gap-6 p-12 md:flex-row">
        <div className="w-full text-center md:w-auto md:text-left">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            {t("titleFirst")} <br className="hidden sm:block" />
            <span className="italic">{t("titleSecond")}</span>
          </h2>
        </div>

        <div className="w-full text-center md:w-auto md:text-left">
          <p className="text-2xl md:text-3xl italic leading-snug">
            {t("taglineFirst")} <br className="hidden sm:block" />
            {t("taglineSecond")}
          </p>
        </div>

        <div className="w-full text-center md:w-auto md:text-right">
          <a
            href="/order"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#e76f51] px-5 py-2.5 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#d55f43] active:scale-[0.98]"
          >
            <span>{t("cta")}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
