import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import TechStackList from "@/components/TechStackList";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'About' });

    const experienceList = t.raw("experienceList") as Array<{
        title: string;
        company: string;
        period: string;
        description: string;
    }>;

    return (
        <div className="min-h-[100svh] w-full relative overflow-hidden bg-black">

            {/* Ambient glows */}
            <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-white/[0.012] blur-[180px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-white/[0.008] blur-[150px] rounded-full pointer-events-none" />

            {/* ── HERO SECTION ── */}
            <section className="relative pt-32 pb-20 px-6 md:px-16 lg:px-24 border-b border-white/[0.06]">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left — text */}
                    <div className="flex flex-col gap-8 animate-fade-up">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-10 bg-white/20" />
                            <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/40">
                                {t("title")}
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9]">
                            Naufal<br />
                            <span className="font-serif font-medium italic text-white/60">Dzaky.</span>
                        </h1>

                        <p className="text-base md:text-lg text-white/60 leading-relaxed max-w-md font-light">
                            {t("description")}
                        </p>

                        <div className="flex items-center gap-4 pt-2">
                            <Link
                                href="/contact"
                                className="px-6 py-3 rounded-full bg-white text-black text-xs font-mono tracking-widest uppercase hover:bg-white/90 transition-colors duration-300"
                            >
                                Say Hello
                            </Link>
                            <Link
                                href="/projects"
                                className="px-6 py-3 rounded-full border border-white/10 text-xs font-mono tracking-widest uppercase text-white/60 hover:text-white hover:border-white/30 transition-all duration-300"
                            >
                                My Work
                            </Link>
                        </div>
                    </div>

                    {/* Right — photo */}
                    <div className="relative animate-scale-in flex justify-center lg:justify-end" style={{ animationDelay: '300ms' }}>
                        <div className="relative group">
                            {/* Glow behind photo */}
                            <div className="absolute -inset-4 bg-white/[0.04] blur-[60px] rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

                            <div className="relative w-[280px] md:w-[340px] aspect-[3/4] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl shadow-black">
                                <Image
                                    src="/profile.jpg"
                                    alt="Naufal Dzaky"
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                                />
                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                                {/* Badge */}
                                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                                    <span className="text-[10px] font-mono tracking-widest uppercase text-white/70 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                                        Backend Dev
                                    </span>
                                    <span className="text-[10px] font-mono text-white/50 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                                        Malang, ID
                                    </span>
                                </div>
                            </div>

                            {/* Floating stat card */}
                            <div className="absolute -right-4 top-8 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-4 shadow-xl animate-fade-up" style={{ animationDelay: '600ms' }}>
                                <p className="text-2xl font-black tracking-tight">2+</p>
                                <p className="text-[10px] font-mono text-white/40 tracking-widest uppercase mt-0.5">Years Coding</p>
                            </div>

                            <div className="absolute -left-4 bottom-16 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-4 shadow-xl animate-fade-up" style={{ animationDelay: '750ms' }}>
                                <p className="text-2xl font-black tracking-tight">50K</p>
                                <p className="text-[10px] font-mono text-white/40 tracking-widest uppercase mt-0.5">Marathon Runner</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── STATS BAR ── */}
            <section className="border-b border-white/[0.06] animate-fade-up" style={{ animationDelay: '400ms' }}>
                <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-24 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { value: "SMKN 6", label: "School", sub: "Malang" },
                        { value: "RPL", label: "Major", sub: "Software Engineering" },
                        { value: "2024", label: "Started", sub: "Vocational" },
                        { value: "∞", label: "Bugs", sub: "Fixed (allegedly)" },
                    ].map((stat, i) => (
                        <div key={i} className="flex flex-col gap-1">
                            <p className="text-2xl md:text-3xl font-black tracking-tight">{stat.value}</p>
                            <p className="text-[10px] font-mono text-white/40 tracking-widest uppercase">{stat.label}</p>
                            <p className="text-xs text-white/30 font-light">{stat.sub}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── TECH STACK ── */}
            <section className="border-b border-white/[0.06] animate-fade-up" style={{ animationDelay: '500ms' }}>
                <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-24 py-16 space-y-8">
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/40">Tech Stack</span>
                        <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-white/20 to-transparent" />
                    </div>
                    <TechStackList />
                </div>
            </section>

            {/* ── TIMELINE ── */}
            <section className="animate-fade-up" style={{ animationDelay: '600ms' }}>
                <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-24 py-20 space-y-14">

                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/40">{t("experience")}</span>
                        <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-white/20 to-transparent" />
                    </div>

                    <div className="space-y-4">
                        {experienceList.map((exp, index) => {
                            const isInternship = exp.title.includes("Internship") || exp.title.includes("Praktik");
                            return (
                                <div
                                    key={index}
                                    className="group grid grid-cols-[auto_1fr] gap-6 md:gap-10 items-start p-6 md:p-8 rounded-2xl border border-white/[0.06] hover:border-white/[0.14] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 animate-fade-up"
                                    style={{ animationDelay: `${700 + index * 120}ms` }}
                                >
                                    {/* Icon */}
                                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 group-hover:border-white/20 group-hover:bg-white/[0.08] transition-all duration-500 mt-0.5">
                                        {isInternship ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/40 group-hover:text-white/80 transition-colors duration-500">
                                                <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/40 group-hover:text-white/80 transition-colors duration-500">
                                                <path d="M21.42 10.922a2 2 0 0 1-.019 3.138l-8.5 8.136a2 2 0 0 1-2.802 0l-8.5-8.136a2 2 0 0 1-.019-3.138l8.5-7.902a2 2 0 0 1 2.84 0l8.5 7.902ZM22 10v6" />
                                                <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
                                            </svg>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 min-w-0">
                                        <div className="space-y-2 min-w-0">
                                            <h3 className="text-base md:text-lg font-bold tracking-tight text-white/80 group-hover:text-white transition-colors duration-500">
                                                {exp.title}
                                            </h3>
                                            <p className="text-[11px] font-mono text-blue-400/60 group-hover:text-blue-400/90 tracking-widest uppercase transition-colors duration-500">
                                                {exp.company}
                                            </p>
                                            <p className="text-sm text-white/45 leading-relaxed group-hover:text-white/70 transition-colors duration-500 font-light">
                                                {exp.description}
                                            </p>
                                        </div>

                                        <span className="shrink-0 text-[10px] font-mono text-white/35 group-hover:text-white/60 bg-white/[0.04] group-hover:bg-white/[0.08] px-3 py-1.5 rounded-full border border-white/[0.06] transition-all duration-500 self-start">
                                            {exp.period}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── FOOTER NAV ── */}
            <div className="border-t border-white/[0.06] animate-fade-up" style={{ animationDelay: '900ms' }}>
                <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-24 py-8 flex items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-white/40 hover:text-white/80 transition-colors duration-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m12 19-7-7 7-7" /><path d="M19 12H5" />
                        </svg>
                        {t("back")}
                    </Link>
                    {/* Copyright */}
          <p className="text-[10px] font-mono text-white/20 tracking-widest">
            © {new Date().getFullYear()} NAUFAL.
          </p>
                </div>
            </div>

        </div>
    );
}
