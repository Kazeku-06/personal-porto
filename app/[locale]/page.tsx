"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { Link, usePathname } from "@/i18n/routing";
import { Github, Linkedin, Instagram, Command } from "lucide-react";
import { useTranslations } from "next-intl";
import { Logo } from "@/components/Logo";

export default function Home() {
  const t = useTranslations("Home");
  const pathname = usePathname();

  const textRef = useRef<HTMLHeadingElement>(null);
  const subtitleContainerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(TextPlugin);
    const subtitleText = t("subtitle");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      if (subtitleRef.current) {
        subtitleRef.current.innerText = "";
      }

      tl.from(".header-logo", {
        y: -20, opacity: 0, duration: 0.6, ease: "power3.out", clearProps: "all",
      })
        .from(".nav-link", {
          y: -20, opacity: 0, stagger: 0.08, duration: 0.5, ease: "power2.out", clearProps: "all",
        }, "-=0.4")
        .from(textRef.current, {
          y: 40, opacity: 0, duration: 0.9, ease: "power4.out", clearProps: "all",
        }, "-=0.3")
        .from(subtitleContainerRef.current, {
          y: 20, opacity: 0, duration: 0.7, ease: "power3.out", clearProps: "all",
        }, "-=0.5")
        .to(subtitleRef.current, {
          text: subtitleText, duration: 1.2, ease: "none",
        }, "-=0.2")
        .from(".cta-buttons", {
          y: 20, opacity: 0, duration: 0.6, ease: "power2.out", clearProps: "all",
        }, "-=0.7")
        .from(".stats-block", {
          y: 30, opacity: 0, duration: 0.6, ease: "power2.out", clearProps: "all",
        }, "-=0.5")
        .from(".social-icon", {
          scale: 0, opacity: 0, stagger: 0.08, duration: 0.4, ease: "back.out(1.7)", clearProps: "all",
        }, "-=0.3");
    });

    return () => ctx.revert();
  }, [t]);

  const navItems = [
    { label: t("work"), href: "/projects" as const, color: "#B8F5A0" },
    { label: t("about"), href: "/about" as const, color: "#A8D8FF" },
    { label: t("contact"), href: "/contact" as const, color: "#FFB3C6" },
  ];

  return (
    <div className="relative flex flex-col min-h-[100svh] w-full overflow-hidden bg-[#FFFBF0]">

      {/* Decorative background color blocks */}
      <div className="absolute top-0 right-0 w-[340px] h-[340px] bg-[#FFE566] border-l-3 border-b-3 border-[#0a0a0a] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[220px] h-[220px] bg-[#B8F5A0] border-r-3 border-t-3 border-[#0a0a0a] pointer-events-none z-0" />
      <div className="absolute bottom-[15%] right-[5%] w-[120px] h-[120px] bg-[#FFB3C6] border-3 border-[#0a0a0a] pointer-events-none z-0 rotate-12" />

      {/* Header */}
      <header className="absolute top-0 w-full px-6 md:px-16 lg:px-24 py-6 md:py-8 flex justify-between items-center z-20">
        <Link
          href="/"
          className="header-logo font-mono text-sm tracking-widest font-black flex items-center gap-2 hover:opacity-70 transition-opacity"
        >
          <Logo className="w-5 h-5 text-[#0a0a0a]" />
          NAUFAL.
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 border-3 border-[#0a0a0a] bg-[#FFFBF0] px-2 py-2 neo-shadow">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link relative px-5 py-2 text-[11px] font-mono tracking-[0.2em] uppercase font-black transition-all duration-150 ${
                  isActive
                    ? "bg-[#0a0a0a] text-[#FFFBF0]"
                    : "text-[#0a0a0a]/70 hover:text-[#0a0a0a]"
                }`}
                style={!isActive ? { backgroundColor: item.color } : {}}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => document.dispatchEvent(new KeyboardEvent("keydown", { key: "/", metaKey: true }))}
          className="md:hidden neo-btn bg-[#FFE566] p-2.5"
        >
          <Command size={16} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 md:px-16 lg:px-24 pt-24 pb-16 z-10">

        <div className="max-w-5xl mx-auto w-full">

          {/* Role badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-block border-3 border-[#0a0a0a] bg-[#D4B8FF] px-5 py-2 neo-shadow-sm font-mono text-xs font-black tracking-widest uppercase">
              {t("role")}
            </div>
          </div>

          {/* Main Title — split into colored sections */}
          <h1
            ref={textRef}
            className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter leading-[0.9] text-center"
          >
            <span className="inline-block bg-[#FFE566] border-3 border-[#0a0a0a] px-4 py-1 neo-shadow-sm mb-3">
              {t("title1")}
            </span>
            <br />
            <span className="italic font-serif font-medium">
              {t("title2")}
            </span>
          </h1>

          {/* Subtitle with typing effect */}
          <div ref={subtitleContainerRef} className="relative max-w-2xl mx-auto mt-8">
            <p className="invisible text-sm md:text-base leading-relaxed font-mono text-center px-4" aria-hidden="true">
              {t("subtitle")}
            </p>
            <p
              ref={subtitleRef}
              className="absolute top-0 left-0 w-full text-sm md:text-base text-[#0a0a0a]/60 leading-relaxed font-mono text-center px-4"
            />
          </div>

          {/* CTA Buttons */}
          <div className="cta-buttons flex flex-wrap items-center justify-center gap-4 mt-12">
            <Link
              href="/projects"
              className="neo-btn bg-[#0a0a0a] text-[#FFFBF0] px-8 py-3 font-mono text-sm tracking-widest uppercase"
            >
              {t("work")} →
            </Link>
            <Link
              href="/about"
              className="neo-btn bg-[#A8D8FF] text-[#0a0a0a] px-8 py-3 font-mono text-sm tracking-widest uppercase"
            >
              {t("about")}
            </Link>
            <Link
              href="/contact"
              className="neo-btn bg-[#FFB3C6] text-[#0a0a0a] px-8 py-3 font-mono text-sm tracking-widest uppercase"
            >
              {t("contact")}
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="stats-block mt-16 grid grid-cols-3 gap-0 max-w-3xl mx-auto w-full border-3 border-[#0a0a0a] neo-shadow-lg">
            {[
              { value: "2+", label: "Years Coding", color: "#FFE566" },
              { value: "∞", label: "Projects Built", color: "#B8F5A0" },
              { value: "50K", label: "Marathon Runner", color: "#FFB3C6" },
            ].map((stat, i) => (
              <div
                key={i}
                className="stat-card p-6 md:p-8 text-center border-r-3 border-[#0a0a0a] last:border-r-0"
                style={{ backgroundColor: stat.color }}
              >
                <p className="text-3xl md:text-4xl font-black tracking-tight mb-2">{stat.value}</p>
                <p className="text-[11px] font-mono font-black tracking-widest uppercase">{stat.label}</p>
              </div>
            ))}
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t-3 border-[#0a0a0a] z-10 bg-[#FFFBF0]">
        <div className="px-6 md:px-16 lg:px-24 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Socials */}
          <div className="flex items-center gap-2">
            {[
              { href: "https://github.com/Kazeku-06", icon: Github, color: "#0a0a0a", fg: "#FFFBF0" },
              { href: "https://www.linkedin.com/in/naufal-dzaky-7897b1388/", icon: Linkedin, color: "#A8D8FF", fg: "#0a0a0a" },
              { href: "https://www.instagram.com/nhhdky", icon: Instagram, color: "#FFB3C6", fg: "#0a0a0a" },
            ].map(({ href, icon: Icon, color, fg }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon neo-btn w-10 h-10 flex items-center justify-center"
                style={{ backgroundColor: color, color: fg }}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

          {/* CMD hint */}
          <button
            onClick={() => document.dispatchEvent(new KeyboardEvent("keydown", { key: "/", metaKey: true }))}
            className="neo-btn flex items-center gap-2 text-[10px] font-mono font-black tracking-widest uppercase bg-[#FFE566] px-4 py-2 cursor-pointer"
          >
            <Command size={12} />
            <span className="hidden sm:inline">CTRL + /</span>
            <span className="sm:hidden">Menu</span>
          </button>

          {/* Copyright */}
          <p className="text-[10px] font-mono font-black text-[#0a0a0a]/40 tracking-widest">
            © {new Date().getFullYear()} NAUFAL.
          </p>
        </div>
      </footer>
    </div>
  );
}
