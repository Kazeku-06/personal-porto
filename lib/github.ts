export async function getGithubProjects(username: string) {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const headers: HeadersInit = {
        Accept: "application/vnd.github.v3+json",
    };

    if (GITHUB_TOKEN) {
        headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
    }

    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
        headers,
        next: { revalidate: 3600 },
    });

    if (!res.ok) {
        console.error("Failed to fetch GitHub projects");
        return [];
    }

    return res.json();
}

export async function getTotalCommits(username: string) {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    // We use the search syntax to find total commits
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
            return 0; // Return 0 if we hit rate limits or fail
        }

        const data = await res.json();
        return data.total_count || 0;
    } catch (error) {
        return 0;
    }
}
