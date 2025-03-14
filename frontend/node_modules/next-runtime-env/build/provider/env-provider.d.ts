import { type FC, type PropsWithChildren } from 'react';
import { type ProcessEnv } from '../typings/process-env';
type EnvProviderProps = PropsWithChildren<{
    env: ProcessEnv;
}>;
/**
 * Provides the environment variables to the application.
 *
 * Usage:
 * ```ts
 * <EnvProvider env={{ NODE_ENV: 'test', API_URL: 'http://localhost:3000' }}>
 *   <App />
 * </EnvProvider>
 * ```
 */
export declare const EnvProvider: FC<EnvProviderProps>;
export {};
