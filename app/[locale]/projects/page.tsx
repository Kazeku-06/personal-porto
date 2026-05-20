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
      url: "",
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

  const accentColors = [
    "bg-[#FFE500]",
    "bg-[#FF6B6B]",
    "bg-[#4ECDC4]",
    "bg-[#A8E6CF]",
    "bg-[#FFD93D]",
    "bg-[#C7CEEA]",
  ];

  return (
    <div className="min-h-[100svh] w-full bg-[#FFFBF0]">

      {/* ── HEADER ── */}
      <header className="sticky top-0 w-full px-6 md:px-16 lg:px-24 py-4 flex justify-between items-center z-20 bg-[#FFFBF0] border-b-3 border-black">
        <Link href="/" className="font-mono text-sm tracking-widest font-black flex items-center gap-2 hover:opacity-70 transition-opacity">
          ← NAUFAL.
        </Link>
        <span className="font-mono text-xs font-bold tracking-widest uppercase bg-[#FFE500] px-3 py-1.5 neo-box-sm">
          Projects
        </span>
      </header>

      {/* ── HERO SECTION ── */}
      <section className="px-6 md:px-16 lg:px-24 pt-16 pb-12 border-b-3 border-black">
        <div className="max-w-6xl mx-auto">
          <div className="animate-fade-up flex flex-col gap-8">

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9]">
                  {t("title")}
                </h1>
                <p className="text-sm text-black/60 font-mono max-w-md leading-relaxed font-medium">
                  {t("subtitle")}
                </p>
              </div>

              {/* Stats */}
              <div className="flex gap-4 shrink-0">
                <div className="neo-box bg-[#FFE500] px-5 py-4 flex items-center gap-3">
                  <FolderGit2 size={18} strokeWidth={2.5} />
                  <div>
                    <p className="text-2xl font-black tracking-tight">{projects.length}</p>
                    <p className="text-[10px] font-mono font-bold tracking-widest uppercase">Repos</p>
                  </div>
                </div>
                <div className="neo-box bg-[#4ECDC4] px-5 py-4 flex items-center gap-3">
                  <GitCommit size={18} strokeWidth={2.5} />
                  <div>
                    <p className="text-2xl font-black tracking-tight">{totalCommits}</p>
                    <p className="text-[10px] font-mono font-bold tracking-widest uppercase">Commits</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="border-b-3 border-black animate-fade-up" style={{ animationDelay: '150ms' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-24 py-12 space-y-6">
          <h2 className="font-mono text-xs font-black tracking-[0.35em] uppercase">
            — Tech Stack
          </h2>
          <TechStackList />
        </div>
      </section>

      {/* ── PROJECTS GRID ── */}
      <section className="animate-fade-up" style={{ animationDelay: '250ms' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-24 py-14 space-y-8">
          <h2 className="font-mono text-xs font-black tracking-[0.35em] uppercase">
            — Repositories
          </h2>

          {projects.length === 0 ? (
            <div className="neo-box bg-[#FF6B6B] p-10 text-center">
              <p className="font-mono font-bold text-sm">
                No repositories found.<br />Check token or username.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map((project, i) => (
                <div
                  key={project.id}
                  className={`neo-box ${accentColors[i % accentColors.length]} flex flex-col justify-between p-6 min-h-[260px] animate-fade-up transition-all duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#0a0a0a]`}
                  style={{ animationDelay: `${300 + i * 60}ms` }}
                >
                  {/* Top */}
                  <div className="space-y-3">
                    <h2 className="text-xl md:text-2xl font-black tracking-tighter leading-tight capitalize">
                      {project.name.replace(/-/g, " ")}
                    </h2>
                    <p className="text-xs font-mono leading-relaxed line-clamp-3 text-black/70">
                      {project.desc}
                    </p>
                  </div>

                  {/* Bottom */}
                  <div className="mt-auto pt-6 space-y-4">
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-black inline-block" />
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
                          className="flex-1 neo-btn bg-white flex items-center justify-center gap-2 py-2.5 text-[11px] font-mono font-bold hover:bg-black hover:text-white transition-colors"
                        >
                          <Github size={13} strokeWidth={2.5} /> Source
                        </a>
                      ) : null}
                      {project.homepage && (
                        <a
                          href={project.homepage.startsWith("http") ? project.homepage : `https://${project.homepage}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 neo-btn bg-black text-white flex items-center justify-center gap-2 py-2.5 text-[11px] font-mono font-bold hover:bg-[#0a0a0a] transition-colors"
                        >
                          <Globe size={13} strokeWidth={2.5} /> Demo
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
      <div className="border-t-3 border-black animate-fade-up" style={{ animationDelay: '400ms' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-24 py-6 flex items-center justify-between">
          <Link
            href="/"
            className="neo-btn bg-white px-5 py-2.5 flex items-center gap-2 text-[11px] font-mono font-bold tracking-widest uppercase hover:bg-[#FFE500] transition-colors"
          >
            ← Home
          </Link>
          <p className="text-[10px] font-mono font-bold tracking-widest">
            © {new Date().getFullYear()} NAUFAL.
          </p>
        </div>
      </div>

    </div>
  );
}
