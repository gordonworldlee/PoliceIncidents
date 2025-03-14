"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicEnvScript = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const cache_1 = require("next/cache");
const get_public_env_1 = require("../helpers/get-public-env");
const env_script_1 = require("./env-script");
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
const PublicEnvScript = ({ nonce }) => {
    (0, cache_1.unstable_noStore)(); // Opt into dynamic rendering
    // This value will be evaluated at runtime
    const publicEnv = (0, get_public_env_1.getPublicEnv)();
    return (0, jsx_runtime_1.jsx)(env_script_1.EnvScript, { env: publicEnv, nonce: nonce });
};
exports.PublicEnvScript = PublicEnvScript;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljLWVudi1zY3JpcHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2NyaXB0L3B1YmxpYy1lbnYtc2NyaXB0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsc0NBQXlEO0FBR3pELDhEQUF5RDtBQUV6RCw2Q0FBeUM7QUFNekM7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUNJLE1BQU0sZUFBZSxHQUE2QixDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRTtJQUNyRSxJQUFBLHdCQUFPLEdBQUUsQ0FBQyxDQUFDLDZCQUE2QjtJQUV4QywwQ0FBMEM7SUFDMUMsTUFBTSxTQUFTLEdBQUcsSUFBQSw2QkFBWSxHQUFFLENBQUM7SUFFakMsT0FBTyx1QkFBQyxzQkFBUyxJQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEtBQUssR0FBSSxDQUFDO0FBQ3JELENBQUMsQ0FBQztBQVBXLFFBQUEsZUFBZSxtQkFPMUIifQ==