"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBrowser = void 0;
const constants_1 = require("../script/constants");
/**
 * Checks if the code is running in the browser.
 */
function isBrowser() {
    // eslint-disable-next-line no-underscore-dangle
    return Boolean(typeof window !== 'undefined' && window[constants_1.PUBLIC_ENV_KEY]);
}
exports.isBrowser = isBrowser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2lzLWJyb3dzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbURBQXFEO0FBRXJEOztHQUVHO0FBQ0gsU0FBZ0IsU0FBUztJQUN2QixnREFBZ0Q7SUFDaEQsT0FBTyxPQUFPLENBQUMsT0FBTyxNQUFNLEtBQUssV0FBVyxJQUFJLE1BQU0sQ0FBQywwQkFBYyxDQUFDLENBQUMsQ0FBQztBQUMxRSxDQUFDO0FBSEQsOEJBR0MifQ==