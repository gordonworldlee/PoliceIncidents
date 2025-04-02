// apifetch.ts
import { env } from "next-runtime-env";

/**
 * A fetch wrapper that automatically prepends the API URL from environment variables
 * @param path The API path to append to the base URL
 * @param options Optional fetch options
 * @returns The fetch response
 */
export function fetchApi(
  path: string,
  options?: RequestInit,
): Promise<Response> {
  let apiUrl = env("NEXT_PUBLIC_API_URL");

  if (!apiUrl) {
    console.warn("NEXT_PUBLIC_API_URL is not defined in environment variables");
    apiUrl = "http://localhost:5002/api";
  }

  const url = apiUrl + path;
  console.log("FETCHING " + url);
  return fetch(url, options);
}
