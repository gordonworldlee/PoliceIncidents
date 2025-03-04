import { cache } from "react";
import { env } from "next-runtime-env";

const GITLAB_API_BASE = env("GITLAB_BASE_URL") as string;
const PROJECT_ID = env("GITLAB_PROJECT_ID") as string;
const GITLAB_TOKEN = env("GITLAB_ACCESS_TOKEN") as string;

export interface GitLabStats {
  commits: number;
  openIssues: number;
  closedIssues: number;
  error?: string;
}

interface GitLabApiResponse<T> {
  data: T | null;
  error?: string;
}

interface GitLabCommit {
  id: string;
  short_id: string;
  title: string;
  author_name: string;
  created_at: string;
}

interface GitLabIssue {
  id: number;
  iid: number;
  title: string;
  state: string;
  created_at: string;
}

// Helper function to make API calls with error handling
async function fetchGitLabApi<T>(url: string): Promise<GitLabApiResponse<T>> {
  if (!GITLAB_TOKEN) {
    return {
      data: null,
      error: "GitLab access token not configured",
    };
  }

  try {
    const headers = {
      "PRIVATE-TOKEN": GITLAB_TOKEN,
      Accept: "application/json",
    };

    const response = await fetch(url, {
      headers,
      next: {
        revalidate: 900, // Cache for 15 minutes
        tags: ["gitlab-stats"], // Add cache tag for manual revalidation if needed
      },
    });

    if (!response.ok) {
      throw new Error(`GitLab API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("GitLab API Error:", error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

export const fetchUserStats = cache(
  async (username: string, name: string): Promise<GitLabStats> => {
    // await new Promise((resolve) => setTimeout(resolve, 20000)); // 2 second delay
    const [commitsResponse, openIssuesResponse, closedIssuesResponse] =
      await Promise.all([
        fetchGitLabApi<GitLabCommit[]>(
          `${GITLAB_API_BASE}/projects/${PROJECT_ID}/repository/commits?author=${name}`,
        ),
        fetchGitLabApi<GitLabIssue[]>(
          `${GITLAB_API_BASE}/projects/${PROJECT_ID}/issues?author_username=${username}&state=opened`,
        ),
        fetchGitLabApi<GitLabIssue[]>(
          `${GITLAB_API_BASE}/projects/${PROJECT_ID}/issues?author_username=${username}&state=closed`,
        ),
      ]);

    // If any request failed, return error with the specific error message
    if (
      commitsResponse.error ||
      openIssuesResponse.error ||
      closedIssuesResponse.error
    ) {
      return {
        commits: 0,
        openIssues: 0,
        closedIssues: 0,
        error:
          commitsResponse.error ||
          openIssuesResponse.error ||
          closedIssuesResponse.error,
      };
    }

    // If any of the data is null (which shouldn't happen if no error), return zeroes
    if (
      !commitsResponse.data ||
      !openIssuesResponse.data ||
      !closedIssuesResponse.data
    ) {
      return {
        commits: 0,
        openIssues: 0,
        closedIssues: 0,
        error: "Failed to fetch complete GitLab statistics",
      };
    }

    return {
      commits: commitsResponse.data.length,
      openIssues: openIssuesResponse.data.length,
      closedIssues: closedIssuesResponse.data.length,
    };
  },
);
