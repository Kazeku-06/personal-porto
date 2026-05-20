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

const COLORS = [
    "bg-[#FFE500]",
    "bg-[#4ECDC4]",
    "bg-[#FF6B6B]",
    "bg-[#A8E6CF]",
    "bg-[#FFD93D]",
    "bg-[#C7CEEA]",
    "bg-white",
];

export default function TechStackList() {
    const [showAll, setShowAll] = useState(false);

    const fullStack = [
        { name: "Next.js",        icon: SiNextdotjs   },
        { name: "React",          icon: SiReact        },
        { name: "TypeScript",     icon: SiTypescript   },
        { name: "JavaScript",     icon: SiJavascript   },
        { name: "HTML",           icon: SiHtml5        },
        { name: "CSS",            icon: SiCss          },
        { name: "Tailwind CSS",   icon: SiTailwindcss  },
        { name: "GSAP",           icon: SiGreensock    },
        { name: "Prisma",         icon: SiPrisma       },
        { name: "PostgreSQL",     icon: SiPostgresql   },
        { name: "Node.js",        icon: SiNodedotjs    },
        { name: "Framer Motion",  icon: SiFramer       },
        { name: "Shadcn UI",      icon: SiShadcnui     },
        { name: "Laravel",        icon: SiLaravel      },
        { name: "MySQL",          icon: SiMysql        },
        { name: "PHP",            icon: SiPhp          },
        { name: "Rust",           icon: SiRust         },
        { name: "Python",         icon: SiPython       },
        { name: "Vue.js",         icon: SiVuedotjs     },
        { name: "C#",             icon: SiSharp        },
        { name: "Git",            icon: SiGit          },
        { name: "GitHub",         icon: SiGithub       },
        { name: "Flask",          icon: SiFlask        },
        { name: "Dart",           icon: SiDart         },
        { name: "Bootstrap",      icon: SiBootstrap    },
        { name: "Docker",         icon: SiDocker       },
        { name: "Laragon",        icon: SiLaragon      },
        { name: "Postman",        icon: SiPostman      },
        { name: "Livewire",       icon: SiLivewire     },
        { name: "Figma",          icon: SiFigma        },
    ];

    const INITIAL_COUNT = 12;
    const visible = showAll ? fullStack : fullStack.slice(0, INITIAL_COUNT);

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
                {visible.map((tech, index) => {
                    const bg = COLORS[index % COLORS.length];
                    const Icon = tech.icon;
                    return (
                        <span
                            key={tech.name}
                            className={`
                                inline-flex items-center gap-2 px-4 py-2
                                ${bg}
                                border-2 border-black
                                shadow-[3px_3px_0px_#0a0a0a]
                                font-mono text-xs font-bold
                                cursor-default
                                transition-all duration-100
                                hover:shadow-[1px_1px_0px_#0a0a0a]
                                hover:translate-x-[2px] hover:translate-y-[2px]
                            `}
                        >
                            <Icon className="w-3.5 h-3.5 shrink-0" />
                            {tech.name}
                        </span>
                    );
                })}

                {/* Show more / less toggle */}
                {!showAll && fullStack.length > INITIAL_COUNT && (
                    <button
                        onClick={() => setShowAll(true)}
                        className="
                            inline-flex items-center gap-1 px-4 py-2
                            bg-black text-[#FFFBF0]
                            border-2 border-black
                            shadow-[3px_3px_0px_#555]
                            font-mono text-xs font-bold
                            cursor-pointer
                            transition-all duration-100
                            hover:shadow-[1px_1px_0px_#555]
                            hover:translate-x-[2px] hover:translate-y-[2px]
                        "
                    >
                        +{fullStack.length - INITIAL_COUNT} more
                    </button>
                )}

                {showAll && (
                    <button
                        onClick={() => setShowAll(false)}
                        className="
                            inline-flex items-center gap-1 px-4 py-2
                            bg-black text-[#FFFBF0]
                            border-2 border-black
                            shadow-[3px_3px_0px_#555]
                            font-mono text-xs font-bold
                            cursor-pointer
                            transition-all duration-100
                            hover:shadow-[1px_1px_0px_#555]
                            hover:translate-x-[2px] hover:translate-y-[2px]
                        "
                    >
                        Show less ↑
                    </button>
                )}
            </div>
        </div>
    );
}
