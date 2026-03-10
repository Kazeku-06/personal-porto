import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'About' });

    return (
        <div className="min-h-[100svh] w-full pt-32 pb-20 px-6 md:px-12 z-10 relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-white/[0.015] blur-[150px] rounded-full pointer-events-none"></div>

            <header className="mb-20 animate-fade-up">
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
                    {t("title")}
                </h1>
            </header>

            <div className="max-w-4xl space-y-28">
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
                    <div className="relative animate-scale-in" style={{ animationDelay: '200ms' }}>
                        <div className="absolute -inset-2 bg-white/20 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition duration-1000 pointer-events-none"></div>
                        <div className="group aspect-[4/5] bg-white/5 rounded-3xl border border-white/10 overflow-hidden relative flex items-center justify-center shadow-2xl shadow-black max-w-[350px] mx-auto md:mx-0">
                            <Image
                                src="/profile.jpg"
                                alt="Profile"
                                fill
                                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out flex items-end p-8">
                                <span className="text-white/80 font-mono text-sm tracking-widest uppercase translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-out">Naufal - Dev</span>
                            </div>
                        </div>
                    </div>
                    <div className="animate-fade-up flex flex-col gap-6" style={{ animationDelay: '400ms' }}>
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white/20"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" /><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" /></svg>
                        <p className="text-xl md:text-2xl md:leading-relaxed text-white/90 leading-relaxed font-serif italic">
                            {t("description")}
                        </p>
                    </div>
                </section>

                <section className="space-y-16 animate-fade-up" style={{ animationDelay: '600ms' }}>
                    <div className="flex items-center gap-4">
                        <h2 className="text-[10px] uppercase font-mono tracking-[0.3em] opacity-40">{t("experience")}</h2>
                        <div className="h-px w-full max-w-[150px] bg-gradient-to-r from-white/20 to-transparent"></div>
                    </div>

                    <div className="space-y-16 pl-4 md:pl-0 relative before:absolute before:inset-0 before:left-[1.25rem] md:before:left-1/2 before:-translate-x-px md:before:-translate-x-1/2 before:h-full before:w-px before:bg-gradient-to-b before:from-transparent before:via-white/[0.15] before:to-transparent">
                        {(t.raw("experienceList") as Array<{ title: string, company: string, period: string, description: string }>).map((exp, index) => {
                            const isInternship = exp.title.includes("Internship") || exp.title.includes("Praktik");
                            return (
                                <div key={index} className="relative flex items-start md:items-center justify-between md:justify-normal md:odd:flex-row-reverse group flex-col md:flex-row gap-8 md:gap-0 animate-fade-up" style={{ animationDelay: `${700 + (index * 150)}ms` }}>
                                    <div className="absolute left-[-0.65rem] md:left-1/2 md:-translate-x-1/2 w-10 h-10 rounded-full bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.02)] group-hover:scale-110 group-hover:border-white/30 group-hover:bg-black group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-500 z-10 top-0 md:top-auto">
                                        {isInternship ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/40 group-hover:text-white/90 transition-colors duration-500"><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/40 group-hover:text-white/90 transition-colors duration-500"><path d="M21.42 10.922a2 2 0 0 1-.019 3.138l-8.5 8.136a2 2 0 0 1-2.802 0l-8.5-8.136a2 2 0 0 1-.019-3.138l8.5-7.902a2 2 0 0 1 2.84 0l8.5 7.902ZM22 10v6" /><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" /></svg>
                                        )}
                                    </div>
                                    <div className="w-full md:w-[calc(50%-3.5rem)] ml-6 md:ml-0 p-7 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.08] hover:border-white/[0.15] group-hover:bg-white/[0.04] transition-all duration-500 relative backdrop-blur-sm">
                                        <div className="flex flex-col xl:flex-row xl:items-start justify-between mb-5 gap-3">
                                            <h3 className="text-xl font-bold tracking-tight text-white/80 group-hover:text-white transition-colors duration-500">{exp.title}</h3>
                                            <div className="flex items-center gap-2">
                                                <div className="h-px w-8 bg-white/10 hidden xl:block"></div>
                                                <span className="text-[10px] font-mono text-white/40 group-hover:text-white/70 bg-white/5 group-hover:bg-white/10 px-2.5 py-1 rounded-full w-fit whitespace-nowrap transition-colors duration-500 border border-white/5">{exp.period}</span>
                                            </div>
                                        </div>
                                        <p className="text-xs text-blue-400/60 group-hover:text-blue-400/90 font-mono tracking-widest uppercase mb-4 transition-colors duration-500">{exp.company}</p>
                                        <p className="text-sm text-white/50 leading-relaxed group-hover:text-white/80 transition-colors duration-500 font-light">{exp.description}</p>
                                    </div>
                                    <div className="hidden md:block w-[calc(50%-3.5rem)]"></div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>
        </div>
    );
}
