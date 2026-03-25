"use client";

import { useState } from "react";
import {
    SiNextdotjs,
    SiReact,
    SiTypescript,
    SiTailwindcss,
    SiGreensock,
    SiPrisma,
    SiPostgresql,
    SiNodedotjs,
    SiFramer,
    SiShadcnui,
    SiLaravel,
    SiPhp,
    SiMysql,
    SiRust,
    SiPython,
    SiVuedotjs,
    SiSharp,
    SiJavascript,
    SiHtml5,
    SiCss,
    SiFlask,
    SiGit,
    SiGithub,
    SiDart,
    SiBootstrap,
    SiDocker,
    SiLaragon,
    SiPostman,
    SiLivewire,
    SiFigma,
} from "react-icons/si";

export default function TechStackList() {
    const [showAll, setShowAll] = useState(false);

    const fullStack = [
        { name: "Next.js", icon: SiNextdotjs },
        { name: "React", icon: SiReact },
        { name: "TypeScript", icon: SiTypescript },
        { name: "JavaScript", icon: SiJavascript },
        { name: "HTML", icon: SiHtml5 },
        { name: "CSS", icon: SiCss },
        { name: "Tailwind CSS", icon: SiTailwindcss },
        { name: "GSAP", icon: SiGreensock },
        { name: "Prisma", icon: SiPrisma },
        { name: "PostgreSQL", icon: SiPostgresql },
        { name: "Node.js", icon: SiNodedotjs },
        { name: "Framer Motion", icon: SiFramer },
        { name: "Shadcn UI", icon: SiShadcnui },
        { name: "Laravel", icon: SiLaravel },
        { name: "MySQL", icon: SiMysql },
        { name: "PHP", icon: SiPhp },
        { name: "Rust", icon: SiRust },
        { name: "Python", icon: SiPython },
        { name: "Vue.js", icon: SiVuedotjs },
        { name: "C#", icon: SiSharp },
        { name: "Git", icon: SiGit },
        { name: "GitHub", icon: SiGithub },
        { name: "Flask", icon: SiFlask },
        { name: "Dart", icon: SiDart },
        { name: "Boostrap", icon: SiBootstrap },
        { name: "Docker", icon: SiDocker },
        { name: "Laragon", icon: SiLaragon },
        { name: "Postman", icon: SiPostman },
        { name: "Livewire", icon: SiLivewire },
        { name: "Figma", icon: SiFigma },
    ];

    const initialMobileCount = 3; // Number of items to show initially on mobile

    return (
        <div className="flex flex-wrap gap-4 md:gap-5">
            {fullStack.map((tech, index) => {
                const isHiddenOnMobile = !showAll && index >= initialMobileCount;
                return (
                    <span
                        key={tech.name}
                        onClick={() => {
                            if (showAll) setShowAll(false);
                        }}
                        className={`items-center gap-2 md:gap-3 px-4 py-2 md:px-6 md:py-4 rounded-full border border-white/5 bg-white/[0.03] text-[11px] md:text-base font-mono opacity-80 hover:opacity-100 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:scale-105 transition-all duration-300 cursor-pointer ${isHiddenOnMobile ? "hidden md:flex" : "flex"}`}
                    >
                        <tech.icon className="w-4 h-4 md:w-6 md:h-6 group-hover:text-white transition-colors" />
                        {tech.name}
                    </span>
                );
            })}

            {!showAll && fullStack.length > initialMobileCount && (
                <button
                    onClick={() => setShowAll(true)}
                    className="md:hidden flex items-center justify-center px-6 py-3 rounded-full border border-white/10 bg-white/5 text-sm font-mono opacity-80 hover:opacity-100 hover:bg-white/10 transition-all cursor-pointer"
                >
                    <span className="tracking-widest">...</span>
                </button>
            )}
        </div>
    );
}
