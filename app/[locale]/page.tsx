"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "@/i18n/routing";
import { Github, Linkedin, Twitter, Command } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Home");
  const textRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(textRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.2,
        clearProps: "all"
      })
        .from(
          roleRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            clearProps: "all"
          },
          "-=0.8"
        )
        .from(
          subtitleRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            clearProps: "all"
          },
          "-=0.6"
        )
        .from(
          ".nav-item, .social-icon, .cmd-prompt",
          {
            y: 10,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power2.out",
            clearProps: "all"
          },
          "-=0.5"
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative flex flex-col h-[100svh] w-full overflow-hidden">
      <header className="absolute top-0 w-full p-6 md:p-10 flex justify-between items-center z-10">
        <Link href="/" className="nav-item font-mono text-sm tracking-widest font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FDFCF0] animate-pulse"></span>
          NAUFAL.
        </Link>
        <nav className="flex gap-6 md:gap-10 text-xs md:text-sm font-medium tracking-widest uppercase relative z-50">
          <Link href="/projects" className="nav-item hover:opacity-70 transition-opacity cursor-pointer">
            {t("work")}
          </Link>
          <Link href="/about" className="nav-item hover:opacity-70 transition-opacity cursor-pointer">
            {t("about")}
          </Link>
          <Link href="/contact" className="nav-item hover:opacity-70 transition-opacity cursor-pointer">
            {t("contact")}
          </Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 z-10">
        <p ref={roleRef} className="text-[10px] md:text-xs tracking-[0.4em] uppercase mb-6 md:mb-8 opacity-60">
          {t("role")}
        </p>
        <h1
          ref={textRef}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 lg:mb-8 leading-[0.9]"
        >
          {t("title1")} <br />
          <span className="opacity-90 italic font-serif font-medium">{t("title2")}</span>
        </h1>
        <p
          ref={subtitleRef}
          className="max-w-md text-xs md:text-sm opacity-50 leading-relaxed font-mono mt-4"
        >
          {t("subtitle")}
        </p>
      </main>

      <footer className="absolute bottom-6 md:bottom-10 right-6 md:right-10 flex items-center gap-6 z-10 border-none md:flex-row flex-col">
        <div className="flex gap-8 order-2 md:order-1 relative z-50">
          <a href="https://github.com/Kazeku-06" target="_blank" className="social-icon hover:opacity-80 hover:scale-110 transition-all cursor-pointer inline-block">
            <Github size={20} strokeWidth={1.5} className="pointer-events-none" />
          </a>
          <a href="#" className="social-icon hover:opacity-80 hover:scale-110 transition-all cursor-pointer inline-block">
            <Linkedin size={20} strokeWidth={1.5} className="pointer-events-none" />
          </a>
          <a href="#" className="social-icon hover:opacity-80 hover:scale-110 transition-all cursor-pointer inline-block">
            <Twitter size={20} strokeWidth={1.5} className="pointer-events-none" />
          </a>
        </div>

        <div
          className="cmd-prompt flex items-center gap-3 text-[10px] md:text-xs opacity-40 hover:opacity-100 transition-opacity font-mono bg-white/5 px-4 py-2 rounded-full border border-white/10 order-1 md:order-2 cursor-pointer"
          onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
        >
          <Command size={14} />
          <span>CTRL + K</span>
        </div>
      </footer>
    </div>
  );
}
