"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const cache_1 = require("next/cache");
const is_browser_1 = require("../helpers/is-browser");
const constants_1 = require("./constants");
/**
 * Reads a safe environment variable from the browser or any environment
 * variable from the server (process.env).
 *
 * Usage:
 * ```ts
 * const API_URL = env('NEXT_PUBLIC_API_URL');
 * ```
 */
function env(key) {
    if ((0, is_browser_1.isBrowser)()) {
        if (!key.startsWith('NEXT_PUBLIC_')) {
            throw new Error(`Environment variable '${key}' is not public and cannot be accessed in the browser.`);
        }
        return window[constants_1.PUBLIC_ENV_KEY][key];
    }
    (0, cache_1.unstable_noStore)();
    return process.env[key];
}
exports.env = env;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NjcmlwdC9lbnYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0NBQXlEO0FBRXpELHNEQUFrRDtBQUNsRCwyQ0FBNkM7QUFFN0M7Ozs7Ozs7O0dBUUc7QUFDSCxTQUFnQixHQUFHLENBQUMsR0FBVztJQUM3QixJQUFJLElBQUEsc0JBQVMsR0FBRSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQztZQUNwQyxNQUFNLElBQUksS0FBSyxDQUNiLHlCQUF5QixHQUFHLHdEQUF3RCxDQUNyRixDQUFDO1FBQ0osQ0FBQztRQUVELE9BQU8sTUFBTSxDQUFDLDBCQUFjLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsSUFBQSx3QkFBTyxHQUFFLENBQUM7SUFFVixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsQ0FBQztBQWRELGtCQWNDIn0=