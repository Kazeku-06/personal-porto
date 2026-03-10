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
        <div className="min-h-[100svh] w-full pt-32 pb-20 px-6 md:px-12 relative overflow-hidden">
            {/* Ambient Backgound Glow */}
            <div className="absolute top-[0%] left-[20%] w-[50vw] h-[50vw] bg-white/[0.015] blur-[150px] rounded-full pointer-events-none"></div>

            <header className="mb-20 animate-fade-up">
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
                    {t("title")}
                </h1>
                <p className="text-sm opacity-60 font-mono mt-4">
                    {t("subtitle")}
                </p>
            </header>



            <div className="max-w-full pb-8">
                {/* Grid System: Vertically stacked on mobile, expanding to more columns on larger screens */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full relative z-10">
                    {socialLinks.map((social, idx) => {
                        const Icon = social.icon;
                        return (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                /* Make card width 100% of the grid column */
                                className="group flex flex-col justify-between p-6 md:p-8 rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.02] to-transparent hover:bg-white/[0.05] hover:border-white/[0.15] hover:shadow-[0_0_30px_rgba(255,255,255,0.03)] transition-all duration-500 cursor-pointer relative overflow-hidden h-40 md:h-48 w-full animate-fade-up fill-mode-both"
                                style={{ animationDelay: `${200 + (idx * 100)}ms` }}
                            >
                                {/* Hover Effect Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none duration-700"></div>
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition duration-1000 pointer-events-none"></div>

                                <div className="flex justify-between items-start z-10 w-full">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full border border-white/5 bg-white/5 flex items-center justify-center group-hover:bg-white/10 group-hover:scale-110 transition-all duration-500">
                                            <Icon size={20} strokeWidth={1.5} className="text-white/80 group-hover:text-white transition-colors duration-500" />
                                        </div>
                                    </div>
                                    <ArrowUpRight size={24} className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 -translate-x-4 group-hover:translate-y-0 group-hover:translate-x-0 text-white/40 group-hover:text-white group-hover:rotate-45" />
                                </div>

                                <div className="z-10 mt-auto">
                                    <h3 className="text-xl font-bold tracking-tight text-white/80 group-hover:text-white transition-colors duration-500">{social.name}</h3>
                                    <p className="text-sm opacity-50 font-mono mt-1 w-full overflow-hidden text-ellipsis group-hover:opacity-80 transition-opacity duration-500">
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