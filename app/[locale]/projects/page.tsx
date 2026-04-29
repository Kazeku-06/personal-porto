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

  // Manual Projects (Private / Hidden Repo)
  const manualProjects = [
    {
      id: "catur jaya mandiri tour and travel",
      name: "catur jaya mandiri tour and travel",
      desc: "Website untuk Tour and Travel",
      stars: 0,
      language: "TypeScript",
      url: "", // Leave empty to disable the Source button
      homepage: "https://caturjayamandiritourandtravel.com/",
    },
  ];

  // Combine data
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

  return (
    <div className="min-h-[100svh] w-full relative overflow-hidden bg-black">

      {/* Ambient glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[55vw] h-[55vw] bg-white/[0.012] blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[35vw] h-[35vw] bg-white/[0.008] blur-[150px] rounded-full pointer-events-none" />

      {/* ── HERO SECTION ── */}
      <section className="relative pt-32 pb-16 px-6 md:px-16 lg:px-24 border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="animate-fade-up flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-white/20" />
              <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/40">
                GitHub
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9]">
                  {t("title")}
                </h1>
                <p className="text-sm text-white/50 font-mono max-w-md leading-relaxed">
                  {t("subtitle")}
                </p>
              </div>

              {/* Stats */}
              <div className="flex gap-4 shrink-0">
                <div className="flex items-center gap-3 border border-white/[0.08] rounded-2xl px-5 py-4 bg-white/[0.02]">
                  <FolderGit2 size={16} className="text-white/40" />
                  <div>
                    <p className="text-xl font-black tracking-tight">{projects.length}</p>
                    <p className="text-[10px] font-mono text-white/40 tracking-widest uppercase">Repos</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 border border-white/[0.08] rounded-2xl px-5 py-4 bg-white/[0.02]">
                  <GitCommit size={16} className="text-white/40" />
                  <div>
                    <p className="text-xl font-black tracking-tight">{totalCommits}</p>
                    <p className="text-[10px] font-mono text-white/40 tracking-widest uppercase">Commits</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="border-b border-white/[0.06] animate-fade-up" style={{ animationDelay: '200ms' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-24 py-14 space-y-8">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/40">Tech Stack</span>
            <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-white/20 to-transparent" />
          </div>
          <TechStackList />
        </div>
      </section>

      {/* ── PROJECTS GRID ── */}
      <section className="animate-fade-up" style={{ animationDelay: '300ms' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-24 py-16 space-y-10">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/40">Repositories</span>
            <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-white/20 to-transparent" />
          </div>

          {projects.length === 0 ? (
            <p className="text-white/40 py-20 text-center font-mono text-sm leading-10">
              No repositories found.<br />Check token or username.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project, i) => (
                <div
                  key={project.id}
                  className="group flex flex-col justify-between p-6 md:p-7 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.14] transition-all duration-500 relative overflow-hidden min-h-[260px] animate-fade-up"
                  style={{ animationDelay: `${400 + i * 80}ms` }}
                >
                  {/* Hover glow */}
                  <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 blur-[50px] rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none" />

                  {/* Top */}
                  <div className="space-y-3 z-10">
                    <h2 className="text-xl md:text-2xl font-black tracking-tighter text-white/75 group-hover:text-white transition-colors duration-500 capitalize leading-tight">
                      {project.name.replace(/-/g, " ")}
                    </h2>
                    <p className="text-xs text-white/45 font-mono leading-relaxed line-clamp-3 group-hover:text-white/65 transition-colors duration-500">
                      {project.desc}
                    </p>
                  </div>

                  {/* Bottom */}
                  <div className="mt-auto pt-6 space-y-4 z-10">
                    <div className="flex items-center justify-between text-[10px] font-mono text-white/35 group-hover:text-white/55 transition-colors duration-500">
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/40 inline-block" />
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
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 text-[11px] font-mono border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/20 rounded-xl transition-all duration-300"
                        >
                          <Github size={13} /> Source
                        </a>
                      ) : null}
                      {project.homepage && (
                        <a
                          href={project.homepage.startsWith("http") ? project.homepage : `https://${project.homepage}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 text-[11px] font-mono border border-white bg-white text-black font-bold hover:bg-white/90 rounded-xl transition-all duration-300"
                        >
                          <Globe size={13} /> Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER NAV ── */}
      <div className="border-t border-white/[0.06] animate-fade-up" style={{ animationDelay: '500ms' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-24 py-8 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-white/40 hover:text-white/80 transition-colors duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 19-7-7 7-7" /><path d="M19 12H5" />
            </svg>
            Home
          </Link>
          {/* Copyright */}
          <p className="text-[10px] font-mono text-white/20 tracking-widest">
            © {new Date().getFullYear()} NAUFAL.
          </p>
        </div>
      </div>

    </div>
  );
}
