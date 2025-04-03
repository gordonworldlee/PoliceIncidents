// apifetch.ts
// import { env } from "next-runtime-env";

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
  let apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.warn(
      "NEXT_PUBLIC_API_URL is not defined in environment variables, setting default value to https://justicewatch.me/api",
    );
    apiUrl = "https://justicewatch.me/api";
  }

  const url = apiUrl + path;
  console.log("Fetching: " + url);
  return fetch(url, options);
}
