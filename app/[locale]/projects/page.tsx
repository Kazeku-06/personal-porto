import { Link } from "@/i18n/routing";
import { Github, Globe, GitCommit, FolderGit2 } from "lucide-react";
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

  let githubRepos: any[] = [];
  let totalCommits = 0;

  try {
    const [repos, commits] = await Promise.all([
      getGithubProjects("Kazeku-06"),
      getTotalCommits("Kazeku-06"),
    ]);
    githubRepos = repos;
    totalCommits = commits;
  } catch (error) {
    console.error("Fetch error:", error);
  }

  const reposArray = Array.isArray(githubRepos) ? githubRepos : [];

  const manualProjects = [
    {
      id: "catur jaya mandiri tour and travel",
      name: "catur jaya mandiri tour and travel",
      desc: "Website untuk Tour and Travel",
      stars: 0,
      language: "TypeScript",
      url: "",
      homepage: "https://caturjayamandiritourandtravel.com/",
    },
  ];

  const projects = [
    ...manualProjects,
    ...reposArray
      .map((repo: any) => ({
        id: repo.id.toString(),
        name: repo.name,
        desc: repo.description || "No description provided.",
        stars: repo.stargazers_count,
        language: repo.language || "Markdown",
        url: repo.html_url,
        homepage: repo.homepage,
      }))
      .filter((repo) => !repo.name.toLowerCase().includes("readme")),
  ].sort((a: any, b: any) => b.stars - a.stars);

  // Full background colors for cards — bold neobrutalism
  const cardColors = [
    "#FFE566",
    "#B8F5A0",
    "#FFB3C6",
    "#A8D8FF",
    "#FFD4A8",
    "#D4B8FF",
    "#FFFBF0",
  ];

  return (
    <div className="min-h-[100svh] w-full bg-[#FFFBF0]">

      {/* ── HERO SECTION ── */}
      <section className="relative pt-32 pb-0 px-6 md:px-16 lg:px-24 border-b-3 border-[#0a0a0a] bg-[#FFE566]">
        <div className="max-w-6xl mx-auto">
          <div className="animate-fade-up flex flex-col gap-6 pb-16">

            <div className="inline-flex items-center gap-3">
              <span className="border-3 border-[#0a0a0a] bg-[#0a0a0a] text-[#FFFBF0] px-3 py-1 text-[10px] font-mono font-black tracking-[0.35em] uppercase neo-shadow-sm">
                GitHub
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9]">
                  {t("title")}
                </h1>
                <p className="text-sm text-[#0a0a0a]/70 font-mono max-w-md leading-relaxed font-bold">
                  {t("subtitle")}
                </p>
              </div>

              {/* Stats */}
              <div className="flex gap-4 shrink-0">
                <div className="neo-card flex items-center gap-3 px-5 py-4 bg-[#0a0a0a] text-[#FFFBF0]">
                  <FolderGit2 size={18} />
                  <div>
                    <p className="text-xl font-black tracking-tight">{projects.length}</p>
                    <p className="text-[10px] font-mono font-bold text-[#FFFBF0]/60 tracking-widest uppercase">Repos</p>
                  </div>
                </div>
                <div className="neo-card flex items-center gap-3 px-5 py-4 bg-[#B8F5A0]">
                  <GitCommit size={18} className="text-[#0a0a0a]" />
                  <div>
                    <p className="text-xl font-black tracking-tight">{totalCommits}</p>
                    <p className="text-[10px] font-mono font-bold text-[#0a0a0a]/60 tracking-widest uppercase">Commits</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="border-b-3 border-[#0a0a0a] animate-fade-up bg-[#FFB3C6]" style={{ animationDelay: '200ms' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-24 py-14 space-y-8">
          <div className="flex items-center gap-4">
            <span className="border-3 border-[#0a0a0a] bg-[#0a0a0a] text-[#FFFBF0] px-3 py-1 text-[10px] font-mono font-black tracking-[0.35em] uppercase neo-shadow-sm">
              Tech Stack
            </span>
          </div>
          <TechStackList />
        </div>
      </section>

      {/* ── PROJECTS GRID ── */}
      <section className="animate-fade-up" style={{ animationDelay: '300ms' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-24 py-16 space-y-10">
          <div className="flex items-center gap-4">
            <span className="border-3 border-[#0a0a0a] bg-[#D4B8FF] px-3 py-1 text-[10px] font-mono font-black tracking-[0.35em] uppercase neo-shadow-sm">
              Repositories
            </span>
          </div>

          {projects.length === 0 ? (
            <div className="neo-card bg-[#FFE566] p-12 text-center">
              <p className="text-[#0a0a0a] font-mono font-bold text-sm">
                No repositories found.<br />Check token or username.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map((project, i) => {
                const bg = cardColors[i % cardColors.length];
                const isDark = bg === "#0a0a0a";
                return (
                  <div
                    key={project.id}
                    className="neo-card flex flex-col justify-between p-6 md:p-7 min-h-[260px] animate-fade-up"
                    style={{
                      animationDelay: `${400 + i * 80}ms`,
                      backgroundColor: bg,
                    }}
                  >
                    {/* Top */}
                    <div className="space-y-3">
                      <h2 className="text-xl md:text-2xl font-black tracking-tighter capitalize leading-tight">
                        {project.name.replace(/-/g, " ")}
                      </h2>
                      <p className="text-xs text-[#0a0a0a]/65 font-mono leading-relaxed line-clamp-3">
                        {project.desc}
                      </p>
                    </div>

                    {/* Bottom */}
                    <div className="mt-auto pt-6 space-y-4">
                      <div className="flex items-center justify-between text-[10px] font-mono font-black text-[#0a0a0a]/60">
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-[#0a0a0a] inline-block" />
                          {project.language}
                        </span>
                        <span>★ {project.stars}</span>
                      </div>

                      <div className="flex gap-2">
                        {project.url ? (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="neo-btn flex-1 flex items-center justify-center gap-2 py-2.5 text-[11px] font-mono bg-[#0a0a0a] text-[#FFFBF0]"
                          >
                            <Github size={13} /> Source
                          </a>
                        ) : null}
                        {project.homepage && (
                          <a
                            href={project.homepage.startsWith("http") ? project.homepage : `https://${project.homepage}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="neo-btn flex-1 flex items-center justify-center gap-2 py-2.5 text-[11px] font-mono bg-[#FFFBF0] text-[#0a0a0a]"
                          >
                            <Globe size={13} /> Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER NAV ── */}
      <div className="border-t-3 border-[#0a0a0a] animate-fade-up bg-[#FFFBF0]" style={{ animationDelay: '500ms' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-24 py-8 flex items-center justify-between">
          <Link
            href="/"
            className="neo-btn flex items-center gap-2 text-[10px] font-mono font-black tracking-widest uppercase bg-[#FFFBF0] text-[#0a0a0a] px-4 py-2"
          >
            ← Home
          </Link>
          <p className="text-[10px] font-mono font-bold text-[#0a0a0a]/40 tracking-widest">
            © {new Date().getFullYear()} NAUFAL.
          </p>
        </div>
      </div>

    </div>
  );
}
