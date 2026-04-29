"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { Link, usePathname } from "@/i18n/routing";
import { Github, Linkedin, Instagram, Command, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Logo } from "@/components/Logo";

export default function Home() {
  const t = useTranslations("Home");
  const pathname = usePathname();
  
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subtitleContainerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);

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
        duration: 0.8,
        ease: "power3.out",
        clearProps: "all",
      })
        .from(".nav-link", {
          y: -20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
          clearProps: "all",
        }, "-=0.5")
        .from(roleRef.current, {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          clearProps: "all",
        }, "-=0.3")
        .from(textRef.current, {
          y: 40,
          opacity: 0,
          duration: 1.2,
          ease: "power4.out",
          clearProps: "all",
        }, "-=0.8")
        .from(subtitleContainerRef.current, {
          y: 20,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          clearProps: "all",
        }, "-=0.6")
        .to(subtitleRef.current, {
          text: subtitleText,
          duration: 1.5,
          ease: "none",
        }, "-=0.2")
        .from(".cta-buttons", {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          clearProps: "all",
        }, "-=0.8")
        .from(".stat-card", {
          y: 30,
          opacity: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
          clearProps: "all",
        }, "-=0.6")
        .from(".social-icon", {
          scale: 0,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "back.out(1.7)",
          clearProps: "all",
        }, "-=0.4");
    });

    return () => ctx.revert();
  }, [t]);

  const navItems = [
    { label: t("work"), href: "/projects" as const },
    { label: t("about"), href: "/about" as const },
    { label: t("contact"), href: "/contact" as const },
  ];

  return (
    <div className="relative flex flex-col min-h-[100svh] w-full overflow-hidden bg-black">

      {/* Ambient Glows */}
      <div className="absolute top-[20%] left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-blue-500/[0.03] blur-[150px] rounded-full pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-[10%] right-[10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-purple-500/[0.02] blur-[150px] rounded-full pointer-events-none animate-pulse" style={{ animationDuration: '10s' }} />

      {/* Header */}
      <header className="absolute top-0 w-full px-6 md:px-16 lg:px-24 py-6 md:py-8 flex justify-between items-center z-20">
        <Link
          href="/"
          className="header-logo font-mono text-sm tracking-widest font-bold flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Logo className="w-5 h-5 text-[#FDFCF0]" />
          NAUFAL.
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.04] border border-white/[0.08] rounded-full px-2 py-2 backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link relative px-5 py-2 rounded-full text-[11px] font-mono tracking-[0.2em] uppercase transition-all duration-300 ${
                  isActive
                    ? "bg-white text-black font-bold"
                    : "text-white/50 hover:text-white hover:bg-white/[0.08]"
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
          className="md:hidden p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
        >
          <Command size={16} />
        </button>
      </header>

      {/* Main Content */}
      <main ref={heroRef} className="flex-1 flex flex-col items-center justify-center px-6 md:px-16 lg:px-24 pt-24 pb-16 z-10">
        
        {/* Hero Text */}
        <div className="max-w-5xl mx-auto text-center space-y-8">
          
          {/* Role Badge */}
          <div className="flex justify-center">
            <p
              ref={roleRef}
              className="inline-flex items-center gap-2 text-[10px] md:text-xs tracking-[0.35em] uppercase px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 font-mono"
            >
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              {t("role")}
            </p>
          </div>

          {/* Main Title */}
          <h1
            ref={textRef}
            className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter leading-[0.9]"
          >
            {t("title1")} <br />
            <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent italic font-serif font-medium">
              {t("title2")}
            </span>
          </h1>

          {/* Subtitle with typing effect */}
          <div ref={subtitleContainerRef} className="relative max-w-2xl mx-auto">
            <p className="invisible text-sm md:text-base leading-relaxed font-mono px-4" aria-hidden="true">
              {t("subtitle")}
            </p>
            <p
              ref={subtitleRef}
              className="absolute top-0 left-0 w-full text-sm md:text-base text-white/50 leading-relaxed font-mono px-4"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mt-20 grid grid-cols-3 gap-4 max-w-3xl mx-auto w-full">
          {[
            { value: "2+", label: "Years Coding" },
            { value: "∞", label: "Projects Built" },
            { value: "50K", label: "Marathon Runner" },
          ].map((stat, i) => (
            <div
              key={i}
              className="stat-card p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-500 text-center"
            >
              <p className="text-2xl md:text-3xl font-black tracking-tight mb-1">{stat.value}</p>
              <p className="text-[10px] font-mono text-white/40 tracking-widest uppercase">{stat.label}</p>
            </div>
          ))}
        </div>

      </main>

      {/* Footer */}
      <footer className="relative border-t border-white/[0.06] z-10">
        <div className="px-6 md:px-16 lg:px-24 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Socials */}
          <div className="flex items-center gap-5">
            <a 
              href="https://github.com/Kazeku-06" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 hover:scale-110 transition-all duration-300"
            >
              <Github size={16} strokeWidth={1.5} />
            </a>
            <a 
              href="https://www.linkedin.com/in/naufal-dzaky-7897b1388/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 hover:scale-110 transition-all duration-300"
            >
              <Linkedin size={16} strokeWidth={1.5} />
            </a>
            <a 
              href="https://www.instagram.com/nhhdky" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 hover:scale-110 transition-all duration-300"
            >
              <Instagram size={16} strokeWidth={1.5} />
            </a>
          </div>

          {/* CMD hint */}
          <button
            onClick={() => document.dispatchEvent(new KeyboardEvent("keydown", { key: "/", metaKey: true }))}
            className="flex items-center gap-2 text-[10px] text-white/30 hover:text-white/70 transition-colors font-mono bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:border-white/20 cursor-pointer"
          >
            <Command size={12} />
            <span className="hidden sm:inline">CTRL + /</span>
            <span className="sm:hidden">Menu</span>
          </button>

          {/* Copyright */}
          <p className="text-[10px] font-mono text-white/20 tracking-widest">
            © {new Date().getFullYear()} NAUFAL.
          </p>
        </div>
      </footer>
    </div>
  );
}
