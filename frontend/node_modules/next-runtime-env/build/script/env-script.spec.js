"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("@testing-library/jest-dom");
const react_1 = require("@testing-library/react");
const env_script_1 = require("./env-script");
jest.mock('next/script', () => 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
({ children, ...props }) => (0, jsx_runtime_1.jsx)("script", { ...props, children: children }));
beforeEach(() => {
    process.env = {};
});
afterEach(() => {
    process.env = {};
});
describe('EnvScript', () => {
    it('should set the env in the script', () => {
        const env = { NODE_ENV: 'test', API_URL: 'http://localhost:3000' };
        (0, react_1.render)((0, jsx_runtime_1.jsx)(env_script_1.EnvScript, { env: env }));
        expect(document.querySelector('script')?.textContent).toBe(`window['__ENV'] = ${JSON.stringify(env)}`);
    });
    it("should set a nonce when it's available", () => {
        const env = { NODE_ENV: 'test', API_URL: 'http://localhost:3000' };
        const nonce = 'test-nonce-xyz';
        (0, react_1.render)((0, jsx_runtime_1.jsx)(env_script_1.EnvScript, { env: env, nonce: nonce }));
        expect(document.querySelector('script')).toHaveAttribute('nonce', nonce);
    });
    it("should not set a nonce when it's not available", () => {
        const env = { NODE_ENV: 'test', API_URL: 'http://localhost:3000' };
        (0, react_1.render)((0, jsx_runtime_1.jsx)(env_script_1.EnvScript, { env: env }));
        expect(document.querySelector('script')).not.toHaveAttribute('nonce');
    });
    it.todo('should get the nonce from the headers when the headerKey is provided');
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52LXNjcmlwdC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NjcmlwdC9lbnYtc2NyaXB0LnNwZWMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUFtQztBQUVuQyxrREFBZ0Q7QUFFaEQsNkNBQXlDO0FBRXpDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEdBQUcsRUFBRTtBQUM1Qiw4REFBOEQ7QUFDOUQsQ0FBQyxFQUFFLFFBQVEsRUFBRSxHQUFHLEtBQUssRUFBTyxFQUFFLEVBQUUsQ0FBQyxzQ0FBWSxLQUFLLFlBQUcsUUFBUSxHQUFVLENBQ3hFLENBQUM7QUFFRixVQUFVLENBQUMsR0FBRyxFQUFFO0lBQ2QsT0FBTyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7QUFDbkIsQ0FBQyxDQUFDLENBQUM7QUFFSCxTQUFTLENBQUMsR0FBRyxFQUFFO0lBQ2IsT0FBTyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7QUFDbkIsQ0FBQyxDQUFDLENBQUM7QUFFSCxRQUFRLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRTtJQUN6QixFQUFFLENBQUMsa0NBQWtDLEVBQUUsR0FBRyxFQUFFO1FBQzFDLE1BQU0sR0FBRyxHQUFHLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsQ0FBQztRQUVuRSxJQUFBLGNBQU0sRUFBQyx1QkFBQyxzQkFBUyxJQUFDLEdBQUcsRUFBRSxHQUFHLEdBQUksQ0FBQyxDQUFDO1FBRWhDLE1BQU0sQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FDeEQscUJBQXFCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FDM0MsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHdDQUF3QyxFQUFFLEdBQUcsRUFBRTtRQUNoRCxNQUFNLEdBQUcsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLENBQUM7UUFDbkUsTUFBTSxLQUFLLEdBQUcsZ0JBQWdCLENBQUM7UUFFL0IsSUFBQSxjQUFNLEVBQUMsdUJBQUMsc0JBQVMsSUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEdBQUksQ0FBQyxDQUFDO1FBRTlDLE1BQU0sQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMzRSxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxnREFBZ0QsRUFBRSxHQUFHLEVBQUU7UUFDeEQsTUFBTSxHQUFHLEdBQUcsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxDQUFDO1FBRW5FLElBQUEsY0FBTSxFQUFDLHVCQUFDLHNCQUFTLElBQUMsR0FBRyxFQUFFLEdBQUcsR0FBSSxDQUFDLENBQUM7UUFFaEMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3hFLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLElBQUksQ0FDTCxzRUFBc0UsQ0FDdkUsQ0FBQztBQUNKLENBQUMsQ0FBQyxDQUFDIn0=