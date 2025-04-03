import { env } from "next-runtime-env";

const GITLAB_API_BASE = "https://gitlab.com/api/v4";
const PROJECT_ID = 67072062;
const GITLAB_TOKEN = env("GITLAB_ACCESS_TOKEN") as string;

export interface GitLabStats {
  commits: number;
  openIssues: number;
  closedIssues: number;
  error?: string;
}

export const fetchUserStats = async (
  username: string,
  name: string,
): Promise<GitLabStats> => {
  if (!GITLAB_TOKEN) {
    return {
      commits: 0,
      openIssues: 0,
      closedIssues: 0,
      error: "GitLab access token not configured",
    };
  }

  // await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 second delay

  try {
    const headers = {
      "PRIVATE-TOKEN": GITLAB_TOKEN,
      Accept: "application/json",
    };

    const requestOptions = {
      headers,
      next: {
        revalidate: 900, // Cache for 15 minutes
        tags: ["gitlab-stats"],
      },
    };

    /*
    fetch(
      `${GITLAB_API_BASE}/projects/${PROJECT_ID}/repository/commits?author=${name}`,
      requestOptions,
    ), */
    // Make all three requests in parallel
    const [openIssuesResponse, closedIssuesResponse] = await Promise.all([
      fetch(
        `${GITLAB_API_BASE}/projects/${PROJECT_ID}/issues?author_username=${username}&state=opened`,
        requestOptions,
      ),
      fetch(
        `${GITLAB_API_BASE}/projects/${PROJECT_ID}/issues?author_username=${username}&state=closed`,
        requestOptions,
      ),
    ]);

    // Check if any requests failed
    if (!openIssuesResponse.ok || !closedIssuesResponse.ok) {
      return {
        commits: 0,
        openIssues: 0,
        closedIssues: 0,
        error:
          `One or more GitLab API requests failed: ` +
          `openIssues(${openIssuesResponse.status}), closedIssues(${closedIssuesResponse.status})`,
      };
    }

    // For commits, use pagination to count
    let totalCommits = 0;
    let currentPage = 1;
    const perPage = 100;
    let hasMoreCommits = true;

    // Paginate through commits
    while (hasMoreCommits) {
      const commitsResponse = await fetch(
        `${GITLAB_API_BASE}/projects/${PROJECT_ID}/repository/commits?author=${name}&page=${currentPage}&per_page=${perPage}`,
        requestOptions,
      );

      if (!commitsResponse.ok) {
        return {
          commits: 0,
          openIssues: 0,
          closedIssues: 0,
          error: `GitLab commits API request failed: commits(${commitsResponse.status})`,
        };
      }

      // Parse the response to get the commits array
      const commits = await commitsResponse.json();

      // Add the number of commits on this page
      totalCommits += commits.length;

      // Check if we've reached the last page
      if (commits.length < perPage) {
        hasMoreCommits = false;
      } else {
        currentPage++;
      }
    }

    // Extract the counts directly from the headers
    return {
      commits: totalCommits,
      openIssues: parseInt(openIssuesResponse.headers.get("x-total") || "0"),
      closedIssues: parseInt(
        closedIssuesResponse.headers.get("x-total") || "0",
      ),
    };
  } catch (error) {
    console.error("GitLab API Error:", error);
    return {
      commits: 0,
      openIssues: 0,
      closedIssues: 0,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};
