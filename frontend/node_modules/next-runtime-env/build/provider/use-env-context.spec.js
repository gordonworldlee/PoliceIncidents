"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("@testing-library/jest-dom");
const react_1 = require("@testing-library/react");
const env_provider_1 = require("./env-provider");
const use_env_context_1 = require("./use-env-context");
const errorSpy = jest.spyOn(console, 'error');
let processEnv;
beforeAll(() => {
    errorSpy.mockImplementation();
    processEnv = process.env;
});
afterAll(() => {
    errorSpy.mockRestore();
    process.env = processEnv;
});
describe('useEnvContext', () => {
    beforeEach(() => {
        process.env = {};
    });
    it('should retrieve env vars from the context', () => {
        const env = { NODE_ENV: 'test', API_URL: 'http://localhost:3000' };
        let contextEnv = {};
        const SomeClientComponent = () => {
            contextEnv = (0, use_env_context_1.useEnvContext)();
            return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("p", { children: ["NODE_ENV: ", contextEnv.NODE_ENV] }), (0, jsx_runtime_1.jsxs)("p", { children: ["API_URL: ", contextEnv.API_URL] })] }));
        };
        (0, react_1.render)((0, jsx_runtime_1.jsx)(env_provider_1.EnvProvider, { env: env, children: (0, jsx_runtime_1.jsx)(SomeClientComponent, {}) }));
        expect(contextEnv).toEqual(env);
    });
    it('should throw when used outside of provider', () => {
        const SomeClientComponent = () => {
            const { NODE_ENV, API_URL } = (0, use_env_context_1.useEnvContext)();
            return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("p", { children: ["NODE_ENV: ", NODE_ENV] }), (0, jsx_runtime_1.jsxs)("p", { children: ["API_URL: ", API_URL] })] }));
        };
        expect(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(SomeClientComponent, {}))).toThrow('useEnvContext must be used within a EnvProvider or PublicEnvProvider');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlLWVudi1jb250ZXh0LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJvdmlkZXIvdXNlLWVudi1jb250ZXh0LnNwZWMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUFtQztBQUVuQyxrREFBZ0Q7QUFHaEQsaURBQTZDO0FBQzdDLHVEQUFrRDtBQUVsRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztBQUU5QyxJQUFJLFVBQTZCLENBQUM7QUFFbEMsU0FBUyxDQUFDLEdBQUcsRUFBRTtJQUNiLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBRTlCLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO0FBQzNCLENBQUMsQ0FBQyxDQUFDO0FBRUgsUUFBUSxDQUFDLEdBQUcsRUFBRTtJQUNaLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUV2QixPQUFPLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQztBQUMzQixDQUFDLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO0lBQzdCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxPQUFPLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNuQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywyQ0FBMkMsRUFBRSxHQUFHLEVBQUU7UUFDbkQsTUFBTSxHQUFHLEdBQUcsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxDQUFDO1FBRW5FLElBQUksVUFBVSxHQUFlLEVBQUUsQ0FBQztRQUVoQyxNQUFNLG1CQUFtQixHQUFHLEdBQUcsRUFBRTtZQUMvQixVQUFVLEdBQUcsSUFBQSwrQkFBYSxHQUFFLENBQUM7WUFFN0IsT0FBTyxDQUNMLDZEQUNFLHdEQUFjLFVBQVUsQ0FBQyxRQUFRLElBQUssRUFDdEMsdURBQWEsVUFBVSxDQUFDLE9BQU8sSUFBSyxJQUNuQyxDQUNKLENBQUM7UUFDSixDQUFDLENBQUM7UUFFRixJQUFBLGNBQU0sRUFDSix1QkFBQywwQkFBVyxJQUFDLEdBQUcsRUFBRSxHQUFHLFlBQ25CLHVCQUFDLG1CQUFtQixLQUFHLEdBQ1gsQ0FDZixDQUFDO1FBRUYsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsQyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyw0Q0FBNEMsRUFBRSxHQUFHLEVBQUU7UUFDcEQsTUFBTSxtQkFBbUIsR0FBRyxHQUFHLEVBQUU7WUFDL0IsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsR0FBRyxJQUFBLCtCQUFhLEdBQUUsQ0FBQztZQUU5QyxPQUFPLENBQ0wsNkRBQ0Usd0RBQWMsUUFBUSxJQUFLLEVBQzNCLHVEQUFhLE9BQU8sSUFBSyxJQUN4QixDQUNKLENBQUM7UUFDSixDQUFDLENBQUM7UUFFRixNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBQSxjQUFNLEVBQUMsdUJBQUMsbUJBQW1CLEtBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUNuRCxzRUFBc0UsQ0FDdkUsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==