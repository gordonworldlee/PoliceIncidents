"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("@testing-library/jest-dom");
const react_1 = require("@testing-library/react");
const public_env_script_1 = require("./public-env-script");
jest.mock('next/script', () => 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
({ children, ...props }) => (0, jsx_runtime_1.jsx)("script", { ...props, children: children }));
beforeEach(() => {
    process.env = {};
});
afterEach(() => {
    process.env = {};
});
describe('PublicEnvScript', () => {
    it('should set a public env in the script', async () => {
        process.env = {
            NEXT_PUBLIC_FOO: 'foo-value',
        };
        (0, react_1.render)((0, jsx_runtime_1.jsx)(public_env_script_1.PublicEnvScript, {}));
        expect(document.querySelector('script')?.textContent).toBe(`window['__ENV'] = {"NEXT_PUBLIC_FOO":"foo-value"}`);
    });
    it('should not set a private env in the script', () => {
        process.env = {
            NEXT_PUBLIC_FOO: 'foo-value',
            BAR: 'bar-value',
        };
        (0, react_1.render)((0, jsx_runtime_1.jsx)(public_env_script_1.PublicEnvScript, {}));
        expect(document.querySelector('script')?.textContent).toBe(`window['__ENV'] = {"NEXT_PUBLIC_FOO":"foo-value"}`);
    });
    it('should only set public env in the script', () => {
        process.env = {
            NEXT_PUBLIC_FOO: 'foo-value',
            BAR: 'bar-value',
        };
        (0, react_1.render)((0, jsx_runtime_1.jsx)(public_env_script_1.PublicEnvScript, {}));
        expect(document.querySelector('script')?.textContent).toBe(`window['__ENV'] = {"NEXT_PUBLIC_FOO":"foo-value"}`);
    });
    it("should set a nonce when it's available", () => {
        process.env = {
            NEXT_PUBLIC_FOO: 'foo-value',
            BAR: 'bar-value',
        };
        (0, react_1.render)((0, jsx_runtime_1.jsx)(public_env_script_1.PublicEnvScript, { nonce: "test-nonce-xyz" }));
        expect(document.querySelector('script')).toHaveAttribute('nonce');
    });
    it("should not set a nonce when it's not available", () => {
        process.env = {
            NEXT_PUBLIC_FOO: 'foo-value',
            BAR: 'bar-value',
        };
        (0, react_1.render)((0, jsx_runtime_1.jsx)(public_env_script_1.PublicEnvScript, {}));
        expect(document.querySelector('script')).not.toHaveAttribute('nonce');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljLWVudi1zY3JpcHQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHQvcHVibGljLWVudi1zY3JpcHQuc3BlYy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQW1DO0FBRW5DLGtEQUFnRDtBQUVoRCwyREFBc0Q7QUFFdEQsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsR0FBRyxFQUFFO0FBQzVCLDhEQUE4RDtBQUM5RCxDQUFDLEVBQUUsUUFBUSxFQUFFLEdBQUcsS0FBSyxFQUFPLEVBQUUsRUFBRSxDQUFDLHNDQUFZLEtBQUssWUFBRyxRQUFRLEdBQVUsQ0FDeEUsQ0FBQztBQUVGLFVBQVUsQ0FBQyxHQUFHLEVBQUU7SUFDZCxPQUFPLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztBQUNuQixDQUFDLENBQUMsQ0FBQztBQUVILFNBQVMsQ0FBQyxHQUFHLEVBQUU7SUFDYixPQUFPLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztBQUNuQixDQUFDLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLEVBQUU7SUFDL0IsRUFBRSxDQUFDLHVDQUF1QyxFQUFFLEtBQUssSUFBSSxFQUFFO1FBQ3JELE9BQU8sQ0FBQyxHQUFHLEdBQUc7WUFDWixlQUFlLEVBQUUsV0FBVztTQUM3QixDQUFDO1FBRUYsSUFBQSxjQUFNLEVBQUMsdUJBQUMsbUNBQWUsS0FBRyxDQUFDLENBQUM7UUFFNUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUN4RCxtREFBbUQsQ0FDcEQsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDRDQUE0QyxFQUFFLEdBQUcsRUFBRTtRQUNwRCxPQUFPLENBQUMsR0FBRyxHQUFHO1lBQ1osZUFBZSxFQUFFLFdBQVc7WUFDNUIsR0FBRyxFQUFFLFdBQVc7U0FDakIsQ0FBQztRQUVGLElBQUEsY0FBTSxFQUFDLHVCQUFDLG1DQUFlLEtBQUcsQ0FBQyxDQUFDO1FBRTVCLE1BQU0sQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FDeEQsbURBQW1ELENBQ3BELENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywwQ0FBMEMsRUFBRSxHQUFHLEVBQUU7UUFDbEQsT0FBTyxDQUFDLEdBQUcsR0FBRztZQUNaLGVBQWUsRUFBRSxXQUFXO1lBQzVCLEdBQUcsRUFBRSxXQUFXO1NBQ2pCLENBQUM7UUFFRixJQUFBLGNBQU0sRUFBQyx1QkFBQyxtQ0FBZSxLQUFHLENBQUMsQ0FBQztRQUU1QixNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQ3hELG1EQUFtRCxDQUNwRCxDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsd0NBQXdDLEVBQUUsR0FBRyxFQUFFO1FBQ2hELE9BQU8sQ0FBQyxHQUFHLEdBQUc7WUFDWixlQUFlLEVBQUUsV0FBVztZQUM1QixHQUFHLEVBQUUsV0FBVztTQUNqQixDQUFDO1FBRUYsSUFBQSxjQUFNLEVBQUMsdUJBQUMsbUNBQWUsSUFBQyxLQUFLLEVBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO1FBRW5ELE1BQU0sQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3BFLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGdEQUFnRCxFQUFFLEdBQUcsRUFBRTtRQUN4RCxPQUFPLENBQUMsR0FBRyxHQUFHO1lBQ1osZUFBZSxFQUFFLFdBQVc7WUFDNUIsR0FBRyxFQUFFLFdBQVc7U0FDakIsQ0FBQztRQUVGLElBQUEsY0FBTSxFQUFDLHVCQUFDLG1DQUFlLEtBQUcsQ0FBQyxDQUFDO1FBRTVCLE1BQU0sQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN4RSxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=