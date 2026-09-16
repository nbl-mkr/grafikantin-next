import { useTranslations } from "next-intl";

export default function HeroSection() {
  const t = useTranslations("about");

  return (
    <section className="relative w-full bg-[#fafafa] py-14 md:py-20 overflow-hidden">
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
          backgroundSize: '16px 16px'
        }}
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 md:gap-12 px-6 md:flex-row md:items-stretch">
        <div className="w-full text-center md:text-left md:w-8/12 flex flex-col justify-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl leading-tight">
                {t.rich("heroTitle", {
                  accent: (chunks) => (
                    <span className="italic text-[#e76f51]">{chunks}</span>
                  ),
                })}
            </h1>

            <p className="mt-3 text-base text-gray-600 leading-relaxed">
                {t("heroSubtitle")}
            </p>
        </div>

        <div className="hidden md:block w-px bg-gray-200 self-stretch my-2" />

        <div className="w-full text-center md:text-left md:w-3/12 flex flex-col justify-center whitespace-nowrap">
            <span className="block text-3xl font-extrabold text-gray-900 sm:text-4xl">
                {t("schoolName")}
            </span>
            <span className="text-sm sm:text-base font-semibold text-[#e76f51]">
                {t("tagline")}
            </span>
        </div>
      </div>
    </section>
  );
}