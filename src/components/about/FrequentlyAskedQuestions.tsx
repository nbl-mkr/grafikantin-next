"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function FrequentlyAskedQuestions() {
  const t = useTranslations("about");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: t("q1"),
      answer: (
        <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
          {t("a1")}
        </p>
      ),
    },
    {
      question: t("q2"),
      answer: (
        <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
          {t("a2")}
        </p>
      ),
    },
    {
      question: t("q3"),
      answer: (
        <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
          {t("a3Prefix")}{" "}
          <a href="https://wa.me/62341000000" target="_blank" className="font-medium text-[#e76f51] hover:underline">
            (0341) 000000
          </a>{" "}
          {t("a3Mid")}{" "}
          <a href="mailto:kantin@smkn4malang.sch.id" className="font-medium text-[#e76f51] hover:underline">
            kantin@smkn4malang.sch.id
          </a>.
        </p>
      ),
    },
  ];

  return (
    <section className="w-full bg-[#fafafa] py-14 md:py-20 text-gray-900">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center max-w-xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#e76f51]">
            {t("faqBadge")}
          </span>
          <h2 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl tracking-tight">
            {t("faqTitle")}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            {t("faqSubtitle")}
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <div className="flow-root">
            <div className="-my-4 divide-y divide-gray-200">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <div key={faq.question} className="py-4">
                    <h3>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${index}`}
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                        className="flex w-full cursor-pointer items-center justify-between gap-1.5 text-left text-gray-900"
                      >
                        <span className="text-base font-semibold sm:text-lg">
                          {faq.question}
                        </span>
                        <svg
                          aria-hidden="true"
                          className={`size-5 shrink-0 text-[#e76f51] transition-transform duration-300 motion-reduce:transition-none ${
                            isOpen ? "-rotate-180" : ""
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </h3>

                    <div
                      id={`faq-panel-${index}`}
                      className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div
                        className={`overflow-hidden transition-opacity duration-300 motion-reduce:transition-none ${
                          isOpen ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
