import { type FC, type PropsWithChildren } from 'react';
type PublicEnvProviderProps = PropsWithChildren;
/**
 * Provides the public environment variables to the application. This component
 * is disables Next.js' caching mechanism to ensure that the environment
 * variables are always up-to-date.
 *
 * This component should be used in a server component.
 *
 * Usage:
 * ```ts
 * <PublicEnvProvider>
 *  <App />
 * </PublicEnvProvider>
 * ```
 */
export declare const PublicEnvProvider: FC<PublicEnvProviderProps>;
export {};
