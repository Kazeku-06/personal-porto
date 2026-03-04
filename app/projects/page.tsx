import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const revalidate = 3600;

export default async function ProjectsPage() {
    // Mock fetchGithub and fetchDatabase for now
    const dummyProjects = [
        {
            id: "1",
            githubRepoId: 101,
            slug: "dark-aesthetic-portfolio",
            name: "dark-aesthetic-portfolio",
            desc_en: "High-end minimalist interactive portfolio powered by modern fullstack architecture. Features smooth scrolling, GSAP animations, and Prisma ORM.",
            stars: 120,
            language: "TypeScript",
            isPinned: true,
        },
        {
            id: "2",
            githubRepoId: 102,
            slug: "nexus-engine",
            name: "nexus-engine",
            desc_en: "Real-time rendering engine built with WebGL. Features custom shaders and high-performance physics calculations.",
            stars: 84,
            language: "JavaScript",
            isPinned: false,
        },
        {
            id: "3",
            githubRepoId: 103,
            slug: "rust-cli-tools",
            name: "rust-cli-tools",
            desc_en: "A collection of blazingly fast command line utilities for developers.",
            stars: 210,
            language: "Rust",
            isPinned: false,
        },
    ];

    return (
        <div className="min-h-[100svh] w-full pt-32 pb-20 px-6 md:px-12 z-10 relative">
            <header className="mb-16">
                <Link href="/" className="text-xs font-mono opacity-50 hover:opacity-100 transition-opacity uppercase tracking-widest mb-4 inline-block">
                    ← Back
                </Link>
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
                    Selected Work
                </h1>
                <p className="text-sm opacity-60 font-mono mt-4">
                    A collection of digital products and experiments.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
                {dummyProjects.map((project, i) => (
                    <Link
                        key={project.id}
                        href={`https://github.com/naufal/${project.name}`}
                        target="_blank"
                        className={`group relative flex flex-col justify-between p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all overflow-hidden ${project.isPinned ? "md:col-span-2 auto-rows-[400px]" : ""}`}
                    >
                        {/* Hover overlay pattern */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                        <div className="flex justify-between items-start z-10">
                            <div className="max-w-[80%]">
                                <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-4 group-hover:text-white transition-colors">{project.name}</h2>
                                <p className="text-xs md:text-sm opacity-60 font-mono line-clamp-2 md:line-clamp-3 leading-relaxed">{project.desc_en}</p>
                            </div>
                            <ArrowUpRight size={24} className="opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 -translate-x-2 group-hover:translate-y-0 group-hover:translate-x-0" />
                        </div>

                        <div className="flex gap-6 items-center text-[10px] md:text-xs font-mono opacity-50 uppercase tracking-widest z-10 w-full justify-between mt-auto">
                            <span className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#FDFCF0]"></div>
                                {project.language}
                            </span>
                            <span>★ {project.stars}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
