/**
 * Reads a safe environment variable from the browser or any environment
 * variable from the server (process.env).
 *
 * Usage:
 * ```ts
 * const API_URL = env('NEXT_PUBLIC_API_URL');
 * ```
 */
export declare function env(key: string): string | undefined;
