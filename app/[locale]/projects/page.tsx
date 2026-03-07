import { Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";
import { getGithubProjects } from "@/lib/github";
import { getTranslations } from "next-intl/server";

export const revalidate = 3600;

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Projects' });

    let githubRepos: any = [];

    try {
        const repos = await getGithubProjects("Kazeku-06"); // REPLACE with your username
        githubRepos = repos;
    } catch (error) {
        console.error("Fetch error:", error);
    }
    const reposArray = Array.isArray(githubRepos) ? githubRepos : [];

    // Combine data
    const projects = reposArray.map((repo: any) => {
        return {
            id: repo.id.toString(),
            name: repo.name,
            desc: repo.description || "No description provided.",
            stars: repo.stargazers_count,
            language: repo.language || "Markdown",
            url: repo.html_url
        };
    }).filter((repo: any) => !repo.name.toLowerCase().includes("readme"));

    // Sort: by stars
    const sortedProjects = projects.sort((a: any, b: any) => {
        return b.stars - a.stars;
    });

    return (
        <div className="min-h-[100svh] w-full pt-32 pb-20 px-6 md:px-12 z-10 relative">
            <header className="mb-16">
                <Link href="/" className="text-xs font-mono opacity-50 hover:opacity-100 transition-opacity uppercase tracking-widest mb-4 inline-block">
                    ← {t("back")}
                </Link>
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
                    {t("title")}
                </h1>
                <p className="text-sm opacity-60 font-mono mt-4">
                    {t("subtitle")}
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
                {sortedProjects.map((project, i) => (
                    <Link
                        key={project.id}
                        href={project.url}
                        target="_blank"
                        className={`group relative flex flex-col justify-between p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all overflow-hidden`}
                    >
                        {/* Hover overlay pattern */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                        <div className="flex justify-between items-start z-10">
                            <div className="max-w-[80%]">
                                <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-4 group-hover:text-white transition-colors capitalize">{project.name.replace(/-/g, ' ')}</h2>
                                <p className="text-xs md:text-sm opacity-60 font-mono line-clamp-2 md:line-clamp-3 leading-relaxed">{project.desc}</p>
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
                {sortedProjects.length === 0 && (
                    <p className="text-white/50 col-span-full py-20 text-center font-mono text-sm leading-10">
                        No repositories found.<br />Check standard token or username.
                    </p>
                )}
            </div>
        </div>
    );
}
