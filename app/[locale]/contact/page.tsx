import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { Github, Linkedin, Mail, Instagram } from "lucide-react";
import { SiDiscord } from "react-icons/si";
import { BsTelegram } from "react-icons/bs";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });

  const socialLinks = [
    {
      name: "Github",
      url: "https://github.com/Kazeku-06",
      icon: Github,
      username: "@Kazeku-06",
      color: "from-purple-500/10 to-blue-500/10",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/naufal-dzaky-7897b1388/",
      icon: Linkedin,
      username: "Naufal Dzaky",
      color: "from-blue-500/10 to-cyan-500/10",
    },
    {
      name: "Discord",
      url: "https://discord.com/users/1070625576290877540",
      icon: SiDiscord,
      username: "nopallgtg",
      color: "from-indigo-500/10 to-purple-500/10",
    },
    {
      name: "Email",
      url: "mailto:tssytari@gmail.com",
      icon: Mail,
      username: "tssytari@gmail.com",
      color: "from-red-500/10 to-orange-500/10",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/nhhdky",
      icon: Instagram,
      username: "@nhhdky",
      color: "from-pink-500/10 to-rose-500/10",
    },
    {
      name: "Telegram",
      url: "https://t.me/ryuuuua",
      icon: BsTelegram,
      username: "@ryuuuua",
      color: "from-cyan-500/10 to-blue-500/10",
    },
  ];

  return (
    <div className="min-h-[100svh] w-full relative overflow-hidden bg-black">

      {/* Ambient glow */}
      <div className="absolute top-[-15%] right-[-10%] w-[55vw] h-[55vw] bg-white/[0.012] blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-white/[0.008] blur-[150px] rounded-full pointer-events-none" />

      {/* ── HERO SECTION ── */}
      <section className="relative pt-32 pb-16 px-6 md:px-16 lg:px-24 border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="animate-fade-up space-y-6">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-white/20" />
              <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/40">
                Get in Touch
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9]">
                {t("title")}
              </h1>
              <p className="text-sm md:text-base text-white/50 font-mono max-w-lg leading-relaxed">
                {t("subtitle")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT CARDS ── */}
      <section className="animate-fade-up" style={{ animationDelay: '200ms' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-24 py-20 space-y-10">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/40">
              Social Links
            </span>
            <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-white/20 to-transparent" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {socialLinks.map((social, idx) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between p-6 md:p-7 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.14] transition-all duration-500 relative overflow-hidden h-44 animate-fade-up"
                  style={{ animationDelay: `${300 + idx * 80}ms` }}
                >
                  {/* Hover gradient glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  {/* Top — icon */}
                  <div className="flex items-start justify-between z-10">
                    <div className="w-12 h-12 rounded-xl border border-white/[0.08] bg-white/[0.04] flex items-center justify-center group-hover:bg-white/[0.1] group-hover:border-white/20 group-hover:scale-110 transition-all duration-500">
                      <Icon size={20} strokeWidth={1.5} className="text-white/60 group-hover:text-white transition-colors duration-500" />
                    </div>

                    {/* Arrow indicator */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white/20 group-hover:text-white/80 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500"
                    >
                      <path d="M7 7h10v10" />
                      <path d="M7 17 17 7" />
                    </svg>
                  </div>

                  {/* Bottom — text */}
                  <div className="z-10 space-y-1">
                    <h3 className="text-lg md:text-xl font-bold tracking-tight text-white/75 group-hover:text-white transition-colors duration-500">
                      {social.name}
                    </h3>
                    <p className="text-xs font-mono text-white/40 group-hover:text-white/70 transition-colors duration-500 truncate">
                      {social.username}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FOOTER NAV ── */}
      <div className="border-t border-white/[0.06] animate-fade-up" style={{ animationDelay: '500ms' }}>
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
