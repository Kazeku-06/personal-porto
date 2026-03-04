"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { Github, Linkedin, Twitter, Command } from "lucide-react";

export default function Home() {
  const textRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Typing or reveal animation
      tl.from(textRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.2,
      })
        .from(
          roleRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
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
          },
          "-=0.5"
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative flex flex-col h-[100svh] w-full overflow-hidden">
      {/* Navigation */}
      <header className="absolute top-0 w-full p-6 md:p-10 flex justify-between items-center z-10">
        <Link href="/" className="nav-item font-mono text-sm tracking-widest font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FDFCF0] animate-pulse"></span>
          NAUFAL.
        </Link>

        <nav className="flex gap-6 md:gap-10 text-xs md:text-sm font-medium tracking-widest uppercase">
          <Link href="/projects" className="nav-item hover:opacity-70 transition-opacity">
            Work
          </Link>
          <Link href="/about" className="nav-item hover:opacity-70 transition-opacity">
            About
          </Link>
          <button className="nav-item hover:opacity-70 transition-opacity font-mono">
            ID
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 z-10">
        <p ref={roleRef} className="text-[10px] md:text-xs tracking-[0.4em] uppercase mb-6 md:mb-8 opacity-60">
          Fullstack Developer & Designer
        </p>
        <h1
          ref={textRef}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 lg:mb-8 leading-[0.9]"
        >
          Building Digital <br />
          <span className="opacity-90 italic font-serif font-medium">Experience.</span>
        </h1>
        <p
          ref={subtitleRef}
          className="max-w-md text-xs md:text-sm opacity-50 leading-relaxed font-mono mt-4"
        >
          High-end minimalist interactive portfolio <br className="hidden md:block" /> powered by modern architecture.
        </p>
      </main>

      {/* Footer / Socials / Cmd Palette Hint */}
      <footer className="absolute bottom-0 w-full p-6 md:p-10 flex flex-col md:flex-row justify-between items-center md:items-end gap-6 z-10">
        <div className="flex gap-8">
          <a href="#" className="social-icon hover:opacity-80 hover:scale-110 transition-all">
            <Github size={20} strokeWidth={1.5} />
          </a>
          <a href="#" className="social-icon hover:opacity-80 hover:scale-110 transition-all">
            <Linkedin size={20} strokeWidth={1.5} />
          </a>
          <a href="#" className="social-icon hover:opacity-80 hover:scale-110 transition-all">
            <Twitter size={20} strokeWidth={1.5} />
          </a>
        </div>

        <button className="cmd-prompt flex items-center gap-3 text-[10px] md:text-xs opacity-40 hover:opacity-100 transition-opacity font-mono bg-white/5 px-4 py-2 rounded-full border border-white/10">
          <Command size={14} />
          <span>Press CMD + K</span>
        </button>
      </footer>
    </div>
  );
}
