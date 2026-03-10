export async function getGithubProjects(username: string) {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const headers: HeadersInit = {
        Accept: "application/vnd.github.v3+json",
    };

    if (GITHUB_TOKEN) {
        headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
    }

    try {

        const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
            headers,
            next: { revalidate: 3600 },
        });

        if (!res.ok) {
            console.error("Failed to fetch GitHub projects");
            return [];
        }

        const ownedRepos = await res.json();

        // 2. Find repositories user has contributed to via commit search
        const commitsRes = await fetch(`https://api.github.com/search/commits?q=author:${username}&per_page=100`, {
            headers: {
                ...headers,
                Accept: "application/vnd.github.cloak-preview+json",
            },
            next: { revalidate: 3600 },
        });

        let contributedRepos = [];

        if (commitsRes.ok) {
            const commitsData = await commitsRes.json();


            const contributedRepoNames = [
                ...new Set(
                    (commitsData.items || [])
                        .map((item: any) => item.repository.full_name)
                        .filter((fullName: string) => !fullName.toLowerCase().startsWith(`${username.toLowerCase()}/`))
                )
            ] as string[];


            const contributedRepoPromises = contributedRepoNames.map(async (fullName: string) => {
                const repoRes = await fetch(`https://api.github.com/repos/${fullName}`, {
                    headers,
                    next: { revalidate: 3600 },
                });
                if (repoRes.ok) {
                    return repoRes.json();
                }
                return null;
            });

            const resolvedRepos = await Promise.all(contributedRepoPromises);
            contributedRepos = resolvedRepos.filter(repo => repo !== null);
        }


        const allRepos = [...ownedRepos, ...contributedRepos];
        const uniqueRepos = Array.from(new Map(allRepos.map(repo => [repo.id, repo])).values());

        return uniqueRepos;

    } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
    }
}

export async function getTotalCommits(username: string) {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const headers: HeadersInit = {
        Accept: "application/vnd.github.cloak-preview+json",
    };

    if (GITHUB_TOKEN) {
        headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
    }

    try {
        const res = await fetch(`https://api.github.com/search/commits?q=author:${username}`, {
            headers,
            next: { revalidate: 3600 },
        });

        if (!res.ok) {
            return 0;
        }

        const data = await res.json();
        return data.total_count || 0;
    } catch (error) {
        return 0;
    }
}
