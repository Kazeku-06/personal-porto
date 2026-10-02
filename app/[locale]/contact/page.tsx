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
      bg: "#0a0a0a",
      fg: "#FFFBF0",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/naufal-dzaky-7897b1388/",
      icon: Linkedin,
      username: "Naufal Dzaky",
      bg: "#A8D8FF",
      fg: "#0a0a0a",
    },
    {
      name: "Discord",
      url: "https://discord.com/users/1070625576290877540",
      icon: SiDiscord,
      username: "nopallgtg",
      bg: "#D4B8FF",
      fg: "#0a0a0a",
    },
    {
      name: "Email",
      url: "mailto:tssytari@gmail.com",
      icon: Mail,
      username: "tssytari@gmail.com",
      bg: "#FFE566",
      fg: "#0a0a0a",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/nhhdky",
      icon: Instagram,
      username: "@nhhdky",
      bg: "#FFB3C6",
      fg: "#0a0a0a",
    },
    {
      name: "Telegram",
      url: "https://t.me/nopallgtg",
      icon: BsTelegram,
      username: "@nopallgtg",
      bg: "#B8F5A0",
      fg: "#0a0a0a",
    },
  ];

  return (
    <div className="min-h-[100svh] w-full bg-[#FFFBF0]">

      {/* ── HERO SECTION ── */}
      <section className="relative pt-32 pb-16 px-6 md:px-16 lg:px-24 border-b-3 border-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <div className="animate-fade-up space-y-6">

            <div className="inline-flex items-center gap-3">
              <span className="border-3 border-[#0a0a0a] bg-[#FFB3C6] px-3 py-1 text-[10px] font-mono font-black tracking-[0.35em] uppercase neo-shadow-sm">
                Get in Touch
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9]">
                {t("title")}
              </h1>
              <p className="text-sm md:text-base text-[#0a0a0a]/60 font-mono max-w-lg leading-relaxed font-bold">
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
            <span className="border-3 border-[#0a0a0a] bg-[#FFE566] px-3 py-1 text-[10px] font-mono font-black tracking-[0.35em] uppercase neo-shadow-sm">
              Social Links
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {socialLinks.map((social, idx) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-card flex flex-col justify-between p-6 md:p-7 h-44 animate-fade-up group"
                  style={{
                    animationDelay: `${300 + idx * 80}ms`,
                    backgroundColor: social.bg,
                    color: social.fg,
                  }}
                >
                  {/* Top — icon + arrow */}
                  <div className="flex items-start justify-between">
                    <div
                      className="w-12 h-12 border-3 flex items-center justify-center"
                      style={{ borderColor: social.fg, backgroundColor: `${social.fg}20` }}
                    >
                      <Icon size={20} style={{ color: social.fg }} />
                    </div>

                    {/* Arrow indicator */}
                    <span
                      className="text-xl font-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200"
                      style={{ color: social.fg }}
                    >
                      ↗
                    </span>
                  </div>

                  {/* Bottom — text */}
                  <div className="space-y-1">
                    <h3
                      className="text-lg md:text-xl font-black tracking-tight"
                      style={{ color: social.fg }}
                    >
                      {social.name}
                    </h3>
                    <p
                      className="text-xs font-mono font-bold truncate opacity-70"
                      style={{ color: social.fg }}
                    >
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
      <div className="border-t-3 border-[#0a0a0a] animate-fade-up bg-[#FFFBF0]" style={{ animationDelay: '500ms' }}>
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
