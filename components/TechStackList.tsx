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

const tagColors = [
    "#FFE566",
    "#B8F5A0",
    "#A8D8FF",
    "#FFB3C6",
    "#D4B8FF",
    "#FFD4A8",
];

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
        { name: "Bootstrap", icon: SiBootstrap },
        { name: "Docker", icon: SiDocker },
        { name: "Laragon", icon: SiLaragon },
        { name: "Postman", icon: SiPostman },
        { name: "Livewire", icon: SiLivewire },
        { name: "Figma", icon: SiFigma },
    ];

    const initialMobileCount = 3;

    return (
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {fullStack.map((tech, index) => {
                const isHiddenOnMobile = !showAll && index >= initialMobileCount;
                const color = tagColors[index % tagColors.length];
                return (
                    <span
                        key={tech.name}
                        onClick={() => { if (showAll) setShowAll(false); }}
                        className={`items-center gap-2 px-4 py-2 border-3 border-[#0a0a0a] text-[11px] md:text-sm font-mono font-black cursor-pointer transition-all duration-100 ${isHiddenOnMobile ? "hidden md:flex" : "flex"}`}
                        style={{
                            backgroundColor: color,
                            boxShadow: "3px 3px 0px #0a0a0a",
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.transform = "translate(2px, 2px)";
                            (e.currentTarget as HTMLElement).style.boxShadow = "1px 1px 0px #0a0a0a";
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.transform = "translate(0, 0)";
                            (e.currentTarget as HTMLElement).style.boxShadow = "3px 3px 0px #0a0a0a";
                        }}
                    >
                        <tech.icon className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
                        {tech.name}
                    </span>
                );
            })}

            {!showAll && fullStack.length > initialMobileCount && (
                <button
                    onClick={() => setShowAll(true)}
                    className="md:hidden flex items-center justify-center px-6 py-2 border-3 border-[#0a0a0a] bg-[#0a0a0a] text-[#FFFBF0] text-sm font-mono font-black cursor-pointer"
                    style={{ boxShadow: "3px 3px 0px #555" }}
                >
                    <span className="tracking-widest">+ more</span>
                </button>
            )}
        </div>
    );
}
