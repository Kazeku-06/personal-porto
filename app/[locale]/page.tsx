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
        y: -20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        clearProps: "all",
      })
        .from(".nav-link", {
          y: -20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
          clearProps: "all",
        }, "-=0.4")
        .from(textRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power4.out",
          clearProps: "all",
        }, "-=0.3")
        .from(subtitleContainerRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          clearProps: "all",
        }, "-=0.5")
        .to(subtitleRef.current, {
          text: subtitleText,
          duration: 1.5,
          ease: "none",
        }, "-=0.2")
        .from(".cta-buttons", {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          clearProps: "all",
        }, "-=0.8")
        .from(".stat-card", {
          y: 30,
          opacity: 0,
          stagger: 0.12,
          duration: 0.6,
          ease: "power2.out",
          clearProps: "all",
        }, "-=0.5")
        .from(".social-icon", {
          scale: 0,
          opacity: 0,
          stagger: 0.08,
          duration: 0.4,
          ease: "back.out(1.7)",
          clearProps: "all",
        }, "-=0.3");
    });

    return () => ctx.revert();
  }, [t]);

  const navItems = [
    { label: t("work"), href: "/projects" as const },
    { label: t("about"), href: "/about" as const },
    { label: t("contact"), href: "/contact" as const },
  ];

  return (
    <div className="relative flex flex-col min-h-[100svh] w-full overflow-hidden bg-[#FFFBF0]">

      {/* Header */}
      <header className="sticky top-0 w-full px-6 md:px-16 lg:px-24 py-4 flex justify-between items-center z-20 bg-[#FFFBF0] border-b-3 border-black">
        <Link
          href="/"
          className="header-logo font-mono text-sm tracking-widest font-black flex items-center gap-2 hover:opacity-70 transition-opacity"
        >
          <Logo className="w-5 h-5 text-[#0a0a0a]" />
          NAUFAL.
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link px-4 py-2 text-[11px] font-mono tracking-[0.2em] uppercase font-bold transition-all duration-100 neo-btn ${
                  isActive
                    ? "bg-[#FFE500] text-black"
                    : "bg-white text-black hover:bg-[#FFE500]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => document.dispatchEvent(new KeyboardEvent("keydown", { key: "/", metaKey: true }))}
          className="md:hidden p-2.5 neo-btn bg-white"
        >
          <Command size={16} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 md:px-16 lg:px-24 py-16 z-10">

        {/* Hero Text */}
        <div className="max-w-5xl mx-auto w-full space-y-10">

          {/* Tag */}
          <div className="inline-block bg-[#FFE500] px-4 py-1.5 neo-box-sm font-mono text-xs font-bold tracking-widest uppercase">
            {t("role")}
          </div>

          {/* Main Title */}
          <h1
            ref={textRef}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {t("title1")} <br />
            <span className="italic font-medium">
              {t("title2")}
            </span>
          </h1>

          {/* Subtitle with typing effect */}
          <div ref={subtitleContainerRef} className="relative max-w-2xl">
            <p className="invisible text-sm md:text-base leading-relaxed font-mono" aria-hidden="true">
              {t("subtitle")}
            </p>
            <p
              ref={subtitleRef}
              className="absolute top-0 left-0 w-full text-sm md:text-base text-black/70 leading-relaxed font-mono"
            />
          </div>

          {/* CTA Buttons */}
          <div className="cta-buttons flex flex-wrap gap-4 pt-2">
            <Link
              href="/projects"
              className="neo-btn bg-black text-[#FFFBF0] px-8 py-3 font-mono text-sm font-bold tracking-widest uppercase"
            >
              {t("work")} →
            </Link>
            <Link
              href="/contact"
              className="neo-btn bg-[#FFE500] text-black px-8 py-3 font-mono text-sm font-bold tracking-widest uppercase"
            >
              {t("contact")}
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl pt-4">
            {[
              { value: "2+", label: "Years Coding", bg: "bg-[#FFE500]" },
              { value: "∞", label: "Projects Built", bg: "bg-[#FF6B6B]" },
              { value: "50K", label: "Marathon Runner", bg: "bg-[#4ECDC4]" },
            ].map((stat, i) => (
              <div
                key={i}
                className={`stat-card p-5 neo-box ${stat.bg} text-center`}
              >
                <p className="text-2xl md:text-3xl font-black tracking-tight mb-1">{stat.value}</p>
                <p className="text-[10px] font-mono font-bold tracking-widest uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-3 border-black z-10 bg-[#FFFBF0]">
        <div className="px-6 md:px-16 lg:px-24 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Socials */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Kazeku-06"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon w-10 h-10 neo-btn bg-white flex items-center justify-center hover:bg-[#FFE500] transition-colors"
            >
              <Github size={16} strokeWidth={2} />
            </a>
            <a
              href="https://www.linkedin.com/in/naufal-dzaky-7897b1388/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon w-10 h-10 neo-btn bg-white flex items-center justify-center hover:bg-[#FFE500] transition-colors"
            >
              <Linkedin size={16} strokeWidth={2} />
            </a>
            <a
              href="https://www.instagram.com/nhhdky"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon w-10 h-10 neo-btn bg-white flex items-center justify-center hover:bg-[#FFE500] transition-colors"
            >
              <Instagram size={16} strokeWidth={2} />
            </a>
          </div>

          {/* CMD hint */}
          <button
            onClick={() => document.dispatchEvent(new KeyboardEvent("keydown", { key: "/", metaKey: true }))}
            className="neo-btn bg-white flex items-center gap-2 text-[10px] font-mono font-bold px-4 py-2 uppercase tracking-widest cursor-pointer hover:bg-[#FFE500] transition-colors"
          >
            <Command size={12} />
            <span className="hidden sm:inline">CTRL + /</span>
            <span className="sm:hidden">Menu</span>
          </button>

          {/* Copyright */}
          <p className="text-[10px] font-mono font-bold tracking-widest">
            © {new Date().getFullYear()} NAUFAL.
          </p>
        </div>
      </footer>
    </div>
  );
}
