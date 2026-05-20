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

    const expColors = ["#FFE566", "#B8F5A0", "#A8D8FF", "#FFB3C6"];

    return (
        <div className="min-h-[100svh] w-full bg-[#FFFBF0]">

            {/* ── HERO SECTION ── */}
            <section className="relative pt-32 pb-20 px-6 md:px-16 lg:px-24 border-b-3 border-[#0a0a0a]">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left — text */}
                    <div className="flex flex-col gap-8 animate-fade-up">
                        <div className="inline-flex items-center gap-3">
                            <span className="border-3 border-[#0a0a0a] bg-[#FFE566] px-3 py-1 text-[10px] font-mono font-black tracking-[0.35em] uppercase neo-shadow-sm">
                                {t("title")}
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9]">
                            Naufal<br />
                            <span className="font-serif font-medium italic">Dzaky.</span>
                        </h1>

                        <p className="text-base md:text-lg text-[#0a0a0a]/70 leading-relaxed max-w-md font-mono">
                            {t("description")}
                        </p>

                        <div className="flex items-center gap-4 pt-2">
                            <Link
                                href="/contact"
                                className="neo-btn bg-[#0a0a0a] text-[#FFFBF0] px-6 py-3 font-mono text-xs tracking-widest uppercase"
                            >
                                Say Hello
                            </Link>
                            <Link
                                href="/projects"
                                className="neo-btn bg-[#FFE566] text-[#0a0a0a] px-6 py-3 font-mono text-xs tracking-widest uppercase"
                            >
                                My Work
                            </Link>
                        </div>
                    </div>

                    {/* Right — photo */}
                    <div className="relative animate-scale-in flex justify-center lg:justify-end" style={{ animationDelay: '300ms' }}>
                        <div className="relative group">
                            {/* Offset shadow block */}
                            <div className="absolute top-3 left-3 w-full h-full bg-[#0a0a0a] z-0" />

                            <div className="relative w-[280px] md:w-[340px] aspect-[3/4] overflow-hidden border-3 border-[#0a0a0a] z-10">
                                <Image
                                    src="/profile.jpg"
                                    alt="Naufal Dzaky"
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                                />
                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                                {/* Badge */}
                                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2">
                                    <span className="text-[10px] font-mono font-black tracking-widest uppercase text-[#0a0a0a] bg-[#FFE566] border-2 border-[#0a0a0a] px-3 py-1.5">
                                        Backend Dev
                                    </span>
                                    <span className="text-[10px] font-mono font-black text-[#0a0a0a] bg-[#B8F5A0] border-2 border-[#0a0a0a] px-3 py-1.5">
                                        Malang, ID
                                    </span>
                                </div>
                            </div>

                            {/* Floating stat cards */}
                            <div className="absolute -right-6 top-8 neo-card bg-[#FFE566] px-5 py-4 z-20 animate-fade-up" style={{ animationDelay: '600ms' }}>
                                <p className="text-2xl font-black tracking-tight">2+</p>
                                <p className="text-[10px] font-mono font-bold text-[#0a0a0a]/60 tracking-widest uppercase mt-0.5">Years Coding</p>
                            </div>

                            <div className="absolute -left-6 bottom-16 neo-card bg-[#FFB3C6] px-5 py-4 z-20 animate-fade-up" style={{ animationDelay: '750ms' }}>
                                <p className="text-2xl font-black tracking-tight">50K</p>
                                <p className="text-[10px] font-mono font-bold text-[#0a0a0a]/60 tracking-widest uppercase mt-0.5">Marathon Runner</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── STATS BAR ── */}
            <section className="border-b-3 border-[#0a0a0a] animate-fade-up" style={{ animationDelay: '400ms' }}>
                <div className="max-w-6xl mx-auto  py-0 grid grid-cols-2 md:grid-cols-4">
                    {[
                        { value: "SMKN 6", label: "School", sub: "Malang", bg: "#FFE566" },
                        { value: "RPL", label: "Major", sub: "Software Engineering", bg: "#B8F5A0" },
                        { value: "2024", label: "Started", sub: "Vocational", bg: "#A8D8FF" },
                        { value: "∞", label: "Bugs", sub: "Fixed (allegedly)", bg: "#FFB3C6" },
                    ].map((stat, i) => (
                        <div
                            key={i}
                            className="flex flex-col gap-1 p-8 border-r-3 border-[#0a0a0a] last:border-r-0"
                            style={{ backgroundColor: stat.bg }}
                        >
                            <p className="text-2xl md:text-3xl font-black tracking-tight">{stat.value}</p>
                            <p className="text-[10px] font-mono font-black tracking-widest uppercase">{stat.label}</p>
                            <p className="text-xs font-mono font-bold text-[#0a0a0a]/70">{stat.sub}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── TECH STACK ── */}
            <section className="border-b-3 border-[#0a0a0a] animate-fade-up" style={{ animationDelay: '500ms' }}>
                <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-24 py-16 space-y-8">
                    <div className="flex items-center justify-center gap-4">
                        <span className="border-3 border-[#0a0a0a] bg-[#D4B8FF] px-3 py-1 text-[10px] font-mono font-black tracking-[0.35em] uppercase neo-shadow-sm">
                            Tech Stack
                        </span>
                    </div>
                    <TechStackList />
                </div>
            </section>

            {/* ── TIMELINE ── */}
            <section className="animate-fade-up" style={{ animationDelay: '600ms' }}>
                <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-24 py-20 space-y-14">

                    <div className="flex items-center gap-4">
                        <span className="border-3 border-[#0a0a0a] bg-[#FFE566] px-3 py-1 text-[10px] font-mono font-black tracking-[0.35em] uppercase neo-shadow-sm">
                            {t("experience")}
                        </span>
                    </div>

                    <div className="space-y-4">
                        {experienceList.map((exp, index) => {
                            const isInternship = exp.title.includes("Internship") || exp.title.includes("Praktik");
                            return (
                                <div
                                    key={index}
                                    className="neo-card flex flex-col md:flex-row md:items-start gap-6 p-6 md:p-8 animate-fade-up"
                                    style={{
                                        animationDelay: `${700 + index * 120}ms`,
                                        backgroundColor: expColors[index % expColors.length],
                                    }}
                                >
                                    {/* Icon */}
                                    <div className="w-12 h-12 border-3 border-[#0a0a0a] bg-[#FFFBF0] flex items-center justify-center shrink-0">
                                        {isInternship ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M21.42 10.922a2 2 0 0 1-.019 3.138l-8.5 8.136a2 2 0 0 1-2.802 0l-8.5-8.136a2 2 0 0 1-.019-3.138l8.5-7.902a2 2 0 0 1 2.84 0l8.5 7.902ZM22 10v6" />
                                                <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
                                            </svg>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 flex-1 min-w-0">
                                        <div className="space-y-2 min-w-0">
                                            <h3 className="text-base md:text-lg font-black tracking-tight">
                                                {exp.title}
                                            </h3>
                                            <p className="text-[11px] font-mono font-black tracking-widest uppercase opacity-70">
                                                {exp.company}
                                            </p>
                                            <p className="text-sm leading-relaxed font-mono opacity-80">
                                                {exp.description}
                                            </p>
                                        </div>

                                        <span className="shrink-0 text-[10px] font-mono font-black border-3 border-[#0a0a0a] bg-[#FFFBF0] px-3 py-1.5 self-start neo-shadow-sm">
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
            <div className="border-t-3 border-[#0a0a0a] animate-fade-up bg-[#FFFBF0]" style={{ animationDelay: '900ms' }}>
                <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-24 py-8 flex items-center justify-between">
                    <Link
                        href="/"
                        className="neo-btn flex items-center gap-2 text-[10px] font-mono font-black tracking-widest uppercase bg-[#FFFBF0] px-4 py-2"
                    >
                        ← {t("back")}
                    </Link>
                    <p className="text-[10px] font-mono font-bold text-[#0a0a0a]/40 tracking-widest">
                        © {new Date().getFullYear()} NAUFAL.
                    </p>
                </div>
            </div>

        </div>
    );
}
