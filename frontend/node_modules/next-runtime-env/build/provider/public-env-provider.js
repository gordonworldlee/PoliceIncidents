"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicEnvProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const cache_1 = require("next/cache");
const get_public_env_1 = require("../helpers/get-public-env");
const env_provider_1 = require("./env-provider");
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
const PublicEnvProvider = ({ children }) => {
    (0, cache_1.unstable_noStore)(); // Opt into dynamic rendering
    // This value will be evaluated at runtime
    const publicEnv = (0, get_public_env_1.getPublicEnv)();
    return (0, jsx_runtime_1.jsx)(env_provider_1.EnvProvider, { env: publicEnv, children: children });
};
exports.PublicEnvProvider = PublicEnvProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljLWVudi1wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wcm92aWRlci9wdWJsaWMtZW52LXByb3ZpZGVyLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsc0NBQXlEO0FBR3pELDhEQUF5RDtBQUN6RCxpREFBNkM7QUFJN0M7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUNJLE1BQU0saUJBQWlCLEdBQStCLENBQUMsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFO0lBQzVFLElBQUEsd0JBQU8sR0FBRSxDQUFDLENBQUMsNkJBQTZCO0lBRXhDLDBDQUEwQztJQUMxQyxNQUFNLFNBQVMsR0FBRyxJQUFBLDZCQUFZLEdBQUUsQ0FBQztJQUVqQyxPQUFPLHVCQUFDLDBCQUFXLElBQUMsR0FBRyxFQUFFLFNBQVMsWUFBRyxRQUFRLEdBQWUsQ0FBQztBQUMvRCxDQUFDLENBQUM7QUFQVyxRQUFBLGlCQUFpQixxQkFPNUIifQ==