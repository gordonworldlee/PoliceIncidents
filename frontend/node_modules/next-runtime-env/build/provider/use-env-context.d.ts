/**
 * Returns the environment variables from the context.
 *
 * Usage:
 * ```ts
 * const { NODE_ENV, API_URL } = useEnvContext();
 * ```
 */
export declare const useEnvContext: () => import("../typings/process-env").ProcessEnv;
