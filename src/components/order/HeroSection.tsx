export default function HeroSection() {
    return (
        <div className="bg-slate-50 py-12">
        <div
            className="mx-auto flex max-w-[85vw] flex-col items-start justify-between gap-6 py-8 md:flex-row md:items-center">

            <div className="w-full md:w-7/12">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-[40px] leading-tight">
                    MAU MAKAN APA HARI INI
                </h1>
                <div className="mt-2 inline-block w-fit border-b-2 border-[#3333cc] pb-3">
                    <p className="text-xl text-gray-500 md:text-[30px] leading-snug">
                        Cari stand dan makanan favoritmu
                    </p>
                </div>
            </div>

            <div className="w-full text-left md:w-auto md:text-right">
                <a href="#cards"
                    className="inline-block rounded-xl bg-[rgb(51,51,204)] px-6 py-2.5 text-base font-semibold text-white transition hover:bg-[rgb(43,43,173)] active:scale-95">
                    Pesan Di Sini
                </a>
            </div>

        </div>
    </div>
    );
}