import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { Github, Linkedin, Mail, ArrowUpRight, Instagram } from "lucide-react";
import { SiDiscord } from "react-icons/si";
import { BsTelegram } from "react-icons/bs";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Contact' });

    const socialLinks = [
        { name: "Github", url: "https://github.com/Kazeku-06", icon: Github, username: "@Kazeku-06" },
        { name: "Linkedin", url: "https://www.linkedin.com/in/naufal-dzaky-7897b1388/", icon: Linkedin, username: "Naufal" },
        { name: "Discord", url: "https://discord.com/users/1070625576290877540", icon: SiDiscord, username: "nopallgtg" },
        { name: "Email", url: "mailto:tssytari@gmail.com", icon: Mail, username: "tssytari@gmail.com" },
        { name: "Instagram", url: "https://www.instagram.com/nhhdky", icon: Instagram, username: "nhhdky" },
        { name: "Telegram", url: "https://t.me/ryuuuua", icon: BsTelegram, username: "ryuuuua" }
    ];

    return (
        <div className="min-h-[100svh] w-full pt-32 pb-20 px-6 md:px-12">
            <header className="mb-20">
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
                    {t("title")}
                </h1>
                <p className="text-sm opacity-60 font-mono mt-4">
                    {t("subtitle")}
                </p>
            </header>



            <div className="max-w-full pb-8">
                {/* Grid System: Vertically stacked on mobile, expanding to more columns on larger screens */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                    {socialLinks.map((social) => {
                        const Icon = social.icon;
                        return (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                /* Make card width 100% of the grid column */
                                className="group flex flex-col justify-between p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all cursor-pointer relative overflow-hidden h-48 w-full"
                            >
                                {/* Hover Effect Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                                <div className="flex justify-between items-start z-10 w-full">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                            <Icon size={20} strokeWidth={1.5} />
                                        </div>
                                    </div>
                                    <ArrowUpRight size={24} className="opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 -translate-x-2 group-hover:translate-y-0 group-hover:translate-x-0 text-white/40" />
                                </div>

                                <div className="z-10 mt-auto">
                                    <h3 className="text-xl font-bold tracking-tight">{social.name}</h3>
                                    <p className="text-sm opacity-60 font-mono mt-1 truncate max-w-full">
                                        {social.username}
                                    </p>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}