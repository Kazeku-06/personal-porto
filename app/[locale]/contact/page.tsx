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
      bg: "bg-[#C7CEEA]",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/naufal-dzaky-7897b1388/",
      icon: Linkedin,
      username: "Naufal Dzaky",
      bg: "bg-[#4ECDC4]",
    },
    {
      name: "Discord",
      url: "https://discord.com/users/1070625576290877540",
      icon: SiDiscord,
      username: "nopallgtg",
      bg: "bg-[#A8E6CF]",
    },
    {
      name: "Email",
      url: "mailto:tssytari@gmail.com",
      icon: Mail,
      username: "tssytari@gmail.com",
      bg: "bg-[#FF6B6B]",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/nhhdky",
      icon: Instagram,
      username: "@nhhdky",
      bg: "bg-[#FFD93D]",
    },
    {
      name: "Telegram",
      url: "https://t.me/ryuuuua",
      icon: BsTelegram,
      username: "@ryuuuua",
      bg: "bg-[#FFE500]",
    },
  ];

  return (
    <div className="min-h-[100svh] w-full bg-[#FFFBF0]">

      {/* ── HEADER ── */}
      <header className="sticky top-0 w-full px-6 md:px-16 lg:px-24 py-4 flex justify-between items-center z-20 bg-[#FFFBF0] border-b-3 border-black">
        <Link href="/" className="font-mono text-sm tracking-widest font-black flex items-center gap-2 hover:opacity-70 transition-opacity">
          ← NAUFAL.
        </Link>
        <span className="font-mono text-xs font-bold tracking-widest uppercase bg-[#FF6B6B] px-3 py-1.5 neo-box-sm">
          Contact
        </span>
      </header>

      {/* ── HERO SECTION ── */}
      <section className="px-6 md:px-16 lg:px-24 pt-16 pb-12 border-b-3 border-black">
        <div className="max-w-6xl mx-auto">
          <div className="animate-fade-up space-y-6">

            <div className="inline-block bg-[#FF6B6B] px-4 py-1.5 neo-box-sm font-mono text-xs font-bold tracking-widest uppercase">
              Get in Touch
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9]">
              {t("title")}
            </h1>
            <p className="text-sm md:text-base text-black/60 font-mono max-w-lg leading-relaxed font-medium">
              {t("subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* ── CONTACT CARDS ── */}
      <section className="animate-fade-up" style={{ animationDelay: '150ms' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-24 py-14 space-y-8">
          <h2 className="font-mono text-xs font-black tracking-[0.35em] uppercase">
            — Social Links
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {socialLinks.map((social, idx) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`neo-box ${social.bg} flex flex-col justify-between p-6 h-44 animate-fade-up transition-all duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#0a0a0a]`}
                  style={{ animationDelay: `${200 + idx * 70}ms` }}
                >
                  {/* Top — icon + arrow */}
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 neo-box-sm bg-white flex items-center justify-center">
                      <Icon size={20} strokeWidth={2} />
                    </div>
                    <span className="font-mono text-lg font-black">↗</span>
                  </div>

                  {/* Bottom — text */}
                  <div className="space-y-0.5">
                    <h3 className="text-lg md:text-xl font-black tracking-tight">
                      {social.name}
                    </h3>
                    <p className="text-xs font-mono font-bold text-black/60 truncate">
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
      <div className="border-t-3 border-black animate-fade-up" style={{ animationDelay: '400ms' }}>
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
