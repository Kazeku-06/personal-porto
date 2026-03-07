import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'About' });

    return (
        <div className="min-h-[100svh] w-full pt-32 pb-20 px-6 md:px-12 z-10 relative">
            <header className="mb-20">
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
                    {t("title")}
                </h1>
            </header>

            <div className="max-w-4xl space-y-20">
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="aspect-[4/5] bg-white/5 rounded-2xl border border-white/10 overflow-hidden relative flex items-center justify-center">
                        <Image
                            src="/profile.jpg"
                            alt="Profile"
                            fill
                            className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                        />
                    </div>
                    <p className="text-lg md:text-xl md:leading-relaxed opacity-80 leading-relaxed font-serif italic">
                        {t("description")}
                    </p>
                </section>

                <section className="space-y-12">
                    <h2 className="text-[10px] uppercase font-mono tracking-[0.3em] opacity-40">{t("experience")}</h2>

                    <div className="space-y-12 pl-6 md:pl-8 border-l border-white/10 relative">
                        <div className="relative group hover:opacity-100 transition-opacity opacity-80">
                            <div className="absolute w-3 h-3 bg-[#FDFCF0] rounded-full -left-[31px] md:-left-[39px] top-1 transition-transform group-hover:scale-125"></div>
                            <h3 className="text-lg font-bold tracking-tight mb-1">Senior Frontend Engineer</h3>
                            <p className="text-xs opacity-50 font-mono mb-4 tracking-widest uppercase">Tech Corp | 2022 - Present</p>
                            <p className="text-sm opacity-80 leading-relaxed">Leading front-end architecture and ensuring optimal user experience across various web apps. Building design systems and optimizing web vitals.</p>
                        </div>

                        <div className="relative group hover:opacity-100 transition-opacity opacity-80">
                            <div className="absolute w-3 h-3 bg-white/20 rounded-full -left-[31px] md:-left-[39px] top-1 transition-transform group-hover:scale-125"></div>
                            <h3 className="text-lg font-bold tracking-tight mb-1">Fullstack Developer</h3>
                            <p className="text-xs opacity-50 font-mono mb-4 tracking-widest uppercase">Agency XYZ | 2020 - 2022</p>
                            <p className="text-sm opacity-80 leading-relaxed">Developed end-to-end client proje\cts. Integrated headless CMS and multiple third-party APIs with a focus on high-fidelity designs.</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
