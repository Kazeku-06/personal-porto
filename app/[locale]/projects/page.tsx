import { Link } from "@/i18n/routing";
import {
  ArrowUpRight,
  Github,
  Globe,
  GitCommit,
  FolderGit2,
} from "lucide-react";
import { getGithubProjects, getTotalCommits } from "@/lib/github";
import { getTranslations } from "next-intl/server";
import TechStackList from "@/components/TechStackList";
export const revalidate = 3600;

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Projects" });

  let githubRepos: any = [];
  let totalCommits = 0;

  try {
    const [repos, commits] = await Promise.all([
      getGithubProjects("Kazeku-06"), // REPLACE with your username
      getTotalCommits("Kazeku-06"),
    ]);
    githubRepos = repos;
    totalCommits = commits;
  } catch (error) {
    console.error("Fetch error:", error);
  }
  const reposArray = Array.isArray(githubRepos) ? githubRepos : [];

  // Combine data
  const projects = reposArray
    .map((repo: any) => {
      return {
        id: repo.id.toString(),
        name: repo.name,
        desc: repo.description || "No description provided.",
        stars: repo.stargazers_count,
        language: repo.language || "Markdown",
        url: repo.html_url,
        homepage: repo.homepage,
      };
    })
    .filter((repo: any) => !repo.name.toLowerCase().includes("readme"));

  // Sort: by stars
  const sortedProjects = projects.sort((a: any, b: any) => {
    return b.stars - a.stars;
  });

  return (
    <div className="min-h-[100svh] w-full pt-32 pb-20 px-6 md:px-12 relative overflow-hidden">
      <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] bg-white/[0.015] blur-[150px] rounded-full pointer-events-none"></div>

      <header className="mb-16 animate-fade-up">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
              {t("title")}
            </h1>
            <p className="text-sm opacity-60 font-mono mt-4">{t("subtitle")}</p>
          </div>

          <div className="flex gap-4 text-xs font-mono uppercase tracking-widest opacity-60 mb-2">
            <div className="flex items-center gap-2 border border-white/10 rounded-full px-4 py-2 bg-white/5">
              <FolderGit2 size={14} />
              <span>{sortedProjects.length} Repositories</span>
            </div>
            <div className="flex items-center gap-2 border border-white/10 rounded-full px-4 py-2 bg-white/5">
              <GitCommit size={14} />
              <span>{totalCommits} Commits</span>
            </div>
          </div>
        </div>
      </header>

      <section className="mb-20 animate-fade-up" style={{ animationDelay: '200ms' }}>
        <h2 className="text-[10px] uppercase font-mono tracking-[0.3em] opacity-40 mb-8">
          Tech Stack
        </h2>
        <TechStackList />
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min relative z-10">
        {sortedProjects.map((project: any, i: number) => (
          <div
            key={project.id}
            className="group relative flex flex-col justify-between p-8 rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.02] to-transparent hover:bg-white/[0.05] hover:border-white/[0.15] hover:shadow-[0_0_30px_rgba(255,255,255,0.02)] transition-all duration-500 overflow-hidden h-full min-h-[340px] animate-fade-up fill-mode-both"
            style={{ animationDelay: `${300 + (i * 100)}ms` }}
          >
            {/* Hover overlay pattern */}
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white/10 blur-[60px] rounded-full opacity-0 group-hover:opacity-60 transition duration-1000 pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <div className="flex justify-between items-start z-10 w-full gap-4">
              <div className="max-w-[90%]">
                <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-4 text-white/80 group-hover:text-white transition-colors capitalize">
                  {project.name.replace(/-/g, " ")}
                </h2>
                <p className="text-xs md:text-sm opacity-60 font-mono line-clamp-2 md:line-clamp-3 leading-relaxed group-hover:opacity-80 transition-opacity duration-500">
                  {project.desc}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-6 items-start text-[10px] md:text-xs font-mono uppercase tracking-widest z-10 w-full justify-between mt-auto pt-8">
              <div className="flex gap-6 items-center opacity-50 w-full justify-between">
                <span className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FDFCF0]"></div>
                  {project.language}
                </span>
                <span>★ {project.stars}</span>
              </div>

              <div className="flex gap-3 w-full">
                <a
                  href={project.url}
                  target="_blank"
                  className="flex-1 flex items-center justify-center gap-2 py-3 border border-white/10 bg-white/5 hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
                >
                  <Github size={14} /> Source
                </a>
                {project.homepage && (
                  <a
                    href={
                      project.homepage.startsWith("http")
                        ? project.homepage
                        : `https://${project.homepage}`
                    }
                    target="_blank"
                    className="flex-1 flex items-center justify-center gap-2 py-3 border border-[#FDFCF0] bg-[#FDFCF0] text-black font-bold hover:bg-white/90 rounded-xl transition-colors cursor-pointer"
                  >
                    <Globe size={14} /> Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
        {sortedProjects.length === 0 && (
          <p className="text-white/50 col-span-full py-20 text-center font-mono text-sm leading-10">
            No repositories found.
            <br />
            Check standard token or username.
          </p>
        )}
      </div>
    </div>
  );
}
