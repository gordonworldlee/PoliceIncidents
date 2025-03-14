"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvScript = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
// XXX: Blocked by https://github.com/vercel/next.js/pull/58129
// import { headers } from 'next/headers';
const script_1 = __importDefault(require("next/script"));
const constants_1 = require("./constants");
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
const EnvScript = ({ env, nonce }) => {
    let nonceString;
    // XXX: Blocked by https://github.com/vercel/next.js/pull/58129
    // if (typeof nonce === 'object' && nonce !== null) {
    //   // It's strongly recommended to set a nonce on your script tags.
    //   nonceString = headers().get(nonce.headerKey) ?? undefined;
    // }
    if (typeof nonce === 'string') {
        nonceString = nonce;
    }
    return ((0, jsx_runtime_1.jsx)(script_1.default, { strategy: "beforeInteractive", nonce: nonceString, dangerouslySetInnerHTML: {
            __html: `window['${constants_1.PUBLIC_ENV_KEY}'] = ${JSON.stringify(env)}`,
        } }));
};
exports.EnvScript = EnvScript;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52LXNjcmlwdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHQvZW52LXNjcmlwdC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLCtEQUErRDtBQUMvRCwwQ0FBMEM7QUFDMUMseURBQWlDO0FBS2pDLDJDQUE2QztBQU83Qzs7Ozs7Ozs7OztHQVVHO0FBQ0ksTUFBTSxTQUFTLEdBQXVCLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRTtJQUM5RCxJQUFJLFdBQStCLENBQUM7SUFFcEMsK0RBQStEO0lBQy9ELHFEQUFxRDtJQUNyRCxxRUFBcUU7SUFDckUsK0RBQStEO0lBQy9ELElBQUk7SUFFSixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRSxDQUFDO1FBQzlCLFdBQVcsR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVELE9BQU8sQ0FDTCx1QkFBQyxnQkFBTSxJQUNMLFFBQVEsRUFBQyxtQkFBbUIsRUFDNUIsS0FBSyxFQUFFLFdBQVcsRUFDbEIsdUJBQXVCLEVBQUU7WUFDdkIsTUFBTSxFQUFFLFdBQVcsMEJBQWMsUUFBUSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1NBQy9ELEdBQ0QsQ0FDSCxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBdEJXLFFBQUEsU0FBUyxhQXNCcEIifQ==