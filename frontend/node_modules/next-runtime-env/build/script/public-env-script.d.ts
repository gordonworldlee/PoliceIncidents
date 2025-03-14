import { type FC } from 'react';
import { type NonceConfig } from '../typings/nonce';
type PublicEnvScriptProps = {
    nonce?: string | NonceConfig;
};
/**
 * Sets the public environment variables in the browser. If an nonce is
 * available, it will be set on the script tag.
 *
 * This component is disables Next.js' caching mechanism to ensure that the
 * environment variables are always up-to-date.
 *
 * Usage:
 * ```ts
 * <head>
 *   <PublicEnvScript />
 * </head>
 * ```
 */
export declare const PublicEnvScript: FC<PublicEnvScriptProps>;
export {};
