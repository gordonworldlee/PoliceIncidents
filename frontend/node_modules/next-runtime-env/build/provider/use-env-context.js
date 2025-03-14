"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEnvContext = void 0;
const react_1 = require("react");
const env_context_1 = require("./env-context");
/**
 * Returns the environment variables from the context.
 *
 * Usage:
 * ```ts
 * const { NODE_ENV, API_URL } = useEnvContext();
 * ```
 */
const useEnvContext = () => {
    const context = (0, react_1.useContext)(env_context_1.EnvContext);
    if (!context) {
        throw new Error('useEnvContext must be used within a EnvProvider or PublicEnvProvider');
    }
    return context;
};
exports.useEnvContext = useEnvContext;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlLWVudi1jb250ZXh0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3Byb3ZpZGVyL3VzZS1lbnYtY29udGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsWUFBWSxDQUFDOzs7QUFFYixpQ0FBbUM7QUFFbkMsK0NBQTJDO0FBRTNDOzs7Ozs7O0dBT0c7QUFDSSxNQUFNLGFBQWEsR0FBRyxHQUFHLEVBQUU7SUFDaEMsTUFBTSxPQUFPLEdBQUcsSUFBQSxrQkFBVSxFQUFDLHdCQUFVLENBQUMsQ0FBQztJQUV2QyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDYixNQUFNLElBQUksS0FBSyxDQUNiLHNFQUFzRSxDQUN2RSxDQUFDO0lBQ0osQ0FBQztJQUVELE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUMsQ0FBQztBQVZXLFFBQUEsYUFBYSxpQkFVeEIifQ==