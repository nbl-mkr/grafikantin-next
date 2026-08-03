export default function FrequentlyAskedQuestions() {
  return (
    <section className="w-full bg-[#fafafa] py-14 md:py-20 text-gray-900">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center max-w-xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#3333cc]">
            Pertanyaan Umum
          </span>
          <h2 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Segala informasi operasional dan bantuan seputar layanan Grafikantin
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <div className="flow-root">
            <div className="-my-4 divide-y divide-gray-200">
              <details className="group py-4 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
                  <h3 className="text-base font-semibold sm:text-lg">
                    Di mana lokasi fisik Grafikantin berada?
                  </h3>
                  <svg
                    aria-hidden="true"
                    className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180 text-[#3333cc]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>

                <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
                  Kantin fisik Grafikantin berlokasi di area dalam SMK Negeri 4 Malang, tepatnya di Area Timur (Dekat Gerbang Samping Sekolah).
                </p>
              </details>

              <details className="group py-4 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
                  <h3 className="text-base font-semibold sm:text-lg">
                    Kapan hari & jam operasional layanan kantin?
                  </h3>
                  <svg
                    aria-hidden="true"
                    className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180 text-[#3333cc]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>

                <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
                  Layanan pemesanan dan pengambilan makanan beroperasi setiap hari Senin hingga Jumat pukul 09.20 - 13.00 WIB mengikuti jam istirahat sekolah.
                </p>
              </details>

              <details className="group py-4 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
                  <h3 className="text-base font-semibold sm:text-lg">
                    Bagaimana cara menghubungi pihak layanan Grafikantin?
                  </h3>
                  <svg
                    aria-hidden="true"
                    className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180 text-[#3333cc]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>

                <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
                  Kamu bisa menghubungi kami via WhatsApp di{" "}
                  <a href="https://wa.me/62341000000" target="_blank" className="font-medium text-[#3333cc] hover:underline">
                    (0341) 000000
                  </a>{" "}
                  atau mengirimkan pesan ke email resmi kami di{" "}
                  <a href="mailto:kantin@smkn4malang.sch.id" className="font-medium text-[#3333cc] hover:underline">
                    kantin@smkn4malang.sch.id
                  </a>.
                </p>
              </details>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}