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

    const expColors = ["bg-[#FFE500]", "bg-[#4ECDC4]", "bg-[#FF6B6B]", "bg-[#A8E6CF]"];

    return (
        <div className="min-h-[100svh] w-full bg-[#FFFBF0]">

            {/* ── HEADER ── */}
            <header className="sticky top-0 w-full px-6 md:px-16 lg:px-24 py-4 flex justify-between items-center z-20 bg-[#FFFBF0] border-b-3 border-black">
                <Link href="/" className="font-mono text-sm tracking-widest font-black flex items-center gap-2 hover:opacity-70 transition-opacity">
                    ← NAUFAL.
                </Link>
                <span className="font-mono text-xs font-bold tracking-widest uppercase bg-[#4ECDC4] px-3 py-1.5 neo-box-sm">
                    About
                </span>
            </header>

            {/* ── HERO SECTION ── */}
            <section className="px-6 md:px-16 lg:px-24 pt-16 pb-16 border-b-3 border-black">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left — text */}
                    <div className="flex flex-col gap-8 animate-fade-up">

                        <div className="inline-block bg-[#4ECDC4] px-4 py-1.5 neo-box-sm font-mono text-xs font-bold tracking-widest uppercase self-start">
                            {t("title")}
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9]">
                            Naufal<br />
                            <span className="font-serif font-medium italic">Dzaky.</span>
                        </h1>

                        <p className="text-base md:text-lg text-black/70 leading-relaxed max-w-md font-medium">
                            {t("description")}
                        </p>

                        <div className="flex items-center gap-4 pt-2">
                            <Link
                                href="/contact"
                                className="neo-btn bg-black text-[#FFFBF0] px-6 py-3 font-mono text-xs font-bold tracking-widest uppercase"
                            >
                                Say Hello
                            </Link>
                            <Link
                                href="/projects"
                                className="neo-btn bg-[#FFE500] text-black px-6 py-3 font-mono text-xs font-bold tracking-widest uppercase"
                            >
                                My Work
                            </Link>
                        </div>
                    </div>

                    {/* Right — photo */}
                    <div className="relative animate-scale-in flex justify-center lg:justify-end" style={{ animationDelay: '200ms' }}>
                        <div className="relative">
                            {/* Photo frame */}
                            <div className="neo-box-lg bg-[#FFE500] p-2 w-fit">
                                <div className="relative w-[260px] md:w-[320px] aspect-[3/4] overflow-hidden border-3 border-black">
                                    <Image
                                        src="/profile.jpg"
                                        alt="Naufal Dzaky"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            {/* Floating stat cards */}
                            <div className="absolute -right-6 top-6 neo-box bg-white px-5 py-4 animate-fade-up" style={{ animationDelay: '500ms' }}>
                                <p className="text-2xl font-black tracking-tight">2+</p>
                                <p className="text-[10px] font-mono font-bold tracking-widest uppercase mt-0.5">Years Coding</p>
                            </div>

                            <div className="absolute -left-6 bottom-12 neo-box bg-[#4ECDC4] px-5 py-4 animate-fade-up" style={{ animationDelay: '650ms' }}>
                                <p className="text-2xl font-black tracking-tight">50K</p>
                                <p className="text-[10px] font-mono font-bold tracking-widest uppercase mt-0.5">Marathon Runner</p>
                            </div>

                            {/* Badge */}
                            <div className="absolute bottom-4 right-4 neo-box-sm bg-[#FF6B6B] px-3 py-1.5">
                                <span className="text-[10px] font-mono font-bold tracking-widest uppercase">
                                    Backend Dev · Malang, ID
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── STATS BAR ── */}
            <section className="border-b-3 border-black animate-fade-up" style={{ animationDelay: '300ms' }}>
                <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-24 py-0 grid grid-cols-2 md:grid-cols-4">
                    {[
                        { value: "SMKN 6", label: "School", sub: "Malang", bg: "bg-[#FFE500]" },
                        { value: "RPL", label: "Major", sub: "Software Engineering", bg: "bg-[#4ECDC4]" },
                        { value: "2024", label: "Started", sub: "Vocational", bg: "bg-[#A8E6CF]" },
                        { value: "∞", label: "Bugs", sub: "Fixed (allegedly)", bg: "bg-[#FF6B6B]" },
                    ].map((stat, i) => (
                        <div key={i} className={`${stat.bg} flex flex-col gap-1 p-8 border-r-3 border-b-3 border-black last:border-r-0 md:border-b-0`}>
                            <p className="text-2xl md:text-3xl font-black tracking-tight">{stat.value}</p>
                            <p className="text-[10px] font-mono font-bold tracking-widest uppercase">{stat.label}</p>
                            <p className="text-xs text-black/60 font-medium">{stat.sub}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── TECH STACK ── */}
            <section className="border-b-3 border-black animate-fade-up" style={{ animationDelay: '400ms' }}>
                <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-24 py-12 space-y-6">
                    <h2 className="font-mono text-xs font-black tracking-[0.35em] uppercase">
                        — Tech Stack
                    </h2>
                    <TechStackList />
                </div>
            </section>

            {/* ── TIMELINE ── */}
            <section className="animate-fade-up" style={{ animationDelay: '500ms' }}>
                <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-24 py-14 space-y-10">

                    <h2 className="font-mono text-xs font-black tracking-[0.35em] uppercase">
                        — {t("experience")}
                    </h2>

                    <div className="space-y-4">
                        {experienceList.map((exp, index) => (
                            <div
                                key={index}
                                className={`neo-box ${expColors[index % expColors.length]} p-6 md:p-8 animate-fade-up transition-all duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#0a0a0a]`}
                                style={{ animationDelay: `${600 + index * 100}ms` }}
                            >
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                    <div className="space-y-2">
                                        <h3 className="text-base md:text-lg font-black tracking-tight">
                                            {exp.title}
                                        </h3>
                                        <p className="text-[11px] font-mono font-bold tracking-widest uppercase">
                                            {exp.company}
                                        </p>
                                        <p className="text-sm text-black/70 leading-relaxed font-medium">
                                            {exp.description}
                                        </p>
                                    </div>

                                    <span className="shrink-0 text-[10px] font-mono font-bold neo-box-sm bg-white px-3 py-1.5 self-start whitespace-nowrap">
                                        {exp.period}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FOOTER NAV ── */}
            <div className="border-t-3 border-black animate-fade-up" style={{ animationDelay: '800ms' }}>
                <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-24 py-6 flex items-center justify-between">
                    <Link
                        href="/"
                        className="neo-btn bg-white px-5 py-2.5 flex items-center gap-2 text-[11px] font-mono font-bold tracking-widest uppercase hover:bg-[#FFE500] transition-colors"
                    >
                        ← {t("back")}
                    </Link>
                    <p className="text-[10px] font-mono font-bold tracking-widest">
                        © {new Date().getFullYear()} NAUFAL.
                    </p>
                </div>
            </div>

        </div>
    );
}
