"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("@testing-library/jest-dom");
const react_1 = require("@testing-library/react");
const env_provider_1 = require("./env-provider");
const use_env_context_1 = require("./use-env-context");
let processEnv;
beforeAll(() => {
    processEnv = process.env;
});
afterAll(() => {
    process.env = processEnv;
});
describe('EnvProvider', () => {
    beforeEach(() => {
        process.env = {};
    });
    it("should make the env available to it's children", () => {
        const env = { NODE_ENV: 'test', API_URL: 'http://localhost:3000' };
        const SomeClientComponent = () => {
            const { NODE_ENV, API_URL } = (0, use_env_context_1.useEnvContext)();
            return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("p", { children: ["NODE_ENV: ", NODE_ENV] }), (0, jsx_runtime_1.jsxs)("p", { children: ["API_URL: ", API_URL] })] }));
        };
        const { getByText } = (0, react_1.render)((0, jsx_runtime_1.jsx)(env_provider_1.EnvProvider, { env: env, children: (0, jsx_runtime_1.jsx)(SomeClientComponent, {}) }));
        expect(getByText(/^NODE_ENV:/).textContent).toBe('NODE_ENV: test');
        expect(getByText(/^API_URL:/).textContent).toBe('API_URL: http://localhost:3000');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52LXByb3ZpZGVyLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJvdmlkZXIvZW52LXByb3ZpZGVyLnNwZWMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUFtQztBQUVuQyxrREFBZ0Q7QUFFaEQsaURBQTZDO0FBQzdDLHVEQUFrRDtBQUVsRCxJQUFJLFVBQTZCLENBQUM7QUFFbEMsU0FBUyxDQUFDLEdBQUcsRUFBRTtJQUNiLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO0FBQzNCLENBQUMsQ0FBQyxDQUFDO0FBRUgsUUFBUSxDQUFDLEdBQUcsRUFBRTtJQUNaLE9BQU8sQ0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDO0FBQzNCLENBQUMsQ0FBQyxDQUFDO0FBRUgsUUFBUSxDQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUU7SUFDM0IsVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLE9BQU8sQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBQ25CLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGdEQUFnRCxFQUFFLEdBQUcsRUFBRTtRQUN4RCxNQUFNLEdBQUcsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLENBQUM7UUFFbkUsTUFBTSxtQkFBbUIsR0FBRyxHQUFHLEVBQUU7WUFDL0IsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsR0FBRyxJQUFBLCtCQUFhLEdBQUUsQ0FBQztZQUU5QyxPQUFPLENBQ0wsNkRBQ0Usd0RBQWMsUUFBUSxJQUFLLEVBQzNCLHVEQUFhLE9BQU8sSUFBSyxJQUN4QixDQUNKLENBQUM7UUFDSixDQUFDLENBQUM7UUFFRixNQUFNLEVBQUUsU0FBUyxFQUFFLEdBQUcsSUFBQSxjQUFNLEVBQzFCLHVCQUFDLDBCQUFXLElBQUMsR0FBRyxFQUFFLEdBQUcsWUFDbkIsdUJBQUMsbUJBQW1CLEtBQUcsR0FDWCxDQUNmLENBQUM7UUFFRixNQUFNLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ25FLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUM3QyxnQ0FBZ0MsQ0FDakMsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==