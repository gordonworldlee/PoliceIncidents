import { type FC } from 'react';
import { type NonceConfig } from '../typings/nonce';
import { type ProcessEnv } from '../typings/process-env';
type EnvScriptProps = {
    env: ProcessEnv;
    nonce?: string | NonceConfig;
};
/**
 * Sets the provided environment variables in the browser. If an nonce is
 * available, it will be set on the script tag.
 *
 * Usage:
 * ```ts
 * <head>
 *   <EnvScript env={{ NODE_ENV: 'test', API_URL: 'http://localhost:3000' }} />
 * </head>
 * ```
 */
export declare const EnvScript: FC<EnvScriptProps>;
export {};
