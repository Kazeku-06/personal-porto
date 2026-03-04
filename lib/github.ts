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
