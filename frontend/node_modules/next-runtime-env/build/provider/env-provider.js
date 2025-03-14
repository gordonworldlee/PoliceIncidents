"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const env_context_1 = require("./env-context");
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
const EnvProvider = ({ children, env }) => {
    return (0, jsx_runtime_1.jsx)(env_context_1.EnvContext.Provider, { value: env, children: children });
};
exports.EnvProvider = EnvProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52LXByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3Byb3ZpZGVyL2Vudi1wcm92aWRlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFlBQVksQ0FBQzs7OztBQUtiLCtDQUEyQztBQU0zQzs7Ozs7Ozs7O0dBU0c7QUFDSSxNQUFNLFdBQVcsR0FBeUIsQ0FBQyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQ3JFLE9BQU8sdUJBQUMsd0JBQVUsQ0FBQyxRQUFRLElBQUMsS0FBSyxFQUFFLEdBQUcsWUFBRyxRQUFRLEdBQXVCLENBQUM7QUFDM0UsQ0FBQyxDQUFDO0FBRlcsUUFBQSxXQUFXLGVBRXRCIn0=