import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from "lucide-react";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Contact' });

    const socialLinks = [
        { name: "Github", url: "https://github.com/Kazeku-06", icon: Github, username: "@Kazeku-06" },
        { name: "Linkedin", url: "#", icon: Linkedin, username: "Naufal" },
        { name: "Twitter / X", url: "#", icon: Twitter, username: "@naufal" },
        { name: "Email", url: "mailto:hello@example.com", icon: Mail, username: "hello@naufal.dev" },
    ];

    return (
        <div className="min-h-[100svh] w-full pt-32 pb-20 px-6 md:px-12 z-10 relative">
            <header className="mb-20">
                <Link href="/" className="text-xs font-mono opacity-50 hover:opacity-100 transition-opacity uppercase tracking-widest mb-4 inline-block">
                    ← {t("back")}
                </Link>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
                    {t("title")}
                </h1>
                <p className="text-sm opacity-60 font-mono mt-4">
                    {t("subtitle")}
                </p>
            </header>

            <div className="max-w-4xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
                    {socialLinks.map((social) => {
                        const Icon = social.icon;
                        return (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-col justify-between p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all cursor-pointer relative overflow-hidden h-48"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                                <div className="flex justify-between items-start z-10 w-full">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                            <Icon size={20} strokeWidth={1.5} />
                                        </div>
                                    </div>
                                    <ArrowUpRight size={24} className="opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 -translate-x-2 group-hover:translate-y-0 group-hover:translate-x-0" />
                                </div>
                                <div className="z-10 mt-auto">
                                    <h3 className="text-xl font-bold tracking-tight">{social.name}</h3>
                                    <p className="text-sm opacity-60 font-mono mt-1">{social.username}</p>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
