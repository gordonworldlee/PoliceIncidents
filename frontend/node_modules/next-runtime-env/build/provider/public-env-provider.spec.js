"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("@testing-library/jest-dom");
const react_1 = require("@testing-library/react");
const public_env_provider_1 = require("./public-env-provider");
const use_env_context_1 = require("./use-env-context");
let processEnv;
beforeAll(() => {
    processEnv = process.env;
});
afterAll(() => {
    process.env = processEnv;
});
describe('PublicEnvProvider', () => {
    beforeEach(() => {
        process.env = {};
    });
    it("should make the public env available to it's children", () => {
        process.env = {
            NEXT_PUBLIC_FOO: 'foo-value',
        };
        const SomeClientComponent = () => {
            const { NEXT_PUBLIC_FOO } = (0, use_env_context_1.useEnvContext)();
            return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("p", { children: ["NEXT_PUBLIC_FOO: ", NEXT_PUBLIC_FOO] }) }));
        };
        const { getByText } = (0, react_1.render)((0, jsx_runtime_1.jsx)(public_env_provider_1.PublicEnvProvider, { children: (0, jsx_runtime_1.jsx)(SomeClientComponent, {}) }));
        expect(getByText(/^NEXT_PUBLIC_FOO:/).textContent).toBe('NEXT_PUBLIC_FOO: foo-value');
    });
    it("should not make private env available to it's children", () => {
        process.env = {
            BAR: 'bar-value',
        };
        const SomeClientComponent = () => {
            const { BAR } = (0, use_env_context_1.useEnvContext)();
            return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("p", { children: ["BAR: ", BAR] }) }));
        };
        const { getByText } = (0, react_1.render)((0, jsx_runtime_1.jsx)(public_env_provider_1.PublicEnvProvider, { children: (0, jsx_runtime_1.jsx)(SomeClientComponent, {}) }));
        expect(getByText(/^BAR:/).textContent).toBe('BAR: ');
    });
    it("should only make public env available to it's children", () => {
        process.env = {
            NEXT_PUBLIC_FOO: 'foo-value',
            BAR: 'bar-value',
        };
        const SomeClientComponent = () => {
            const { NEXT_PUBLIC_FOO, BAR } = (0, use_env_context_1.useEnvContext)();
            return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("p", { children: ["NEXT_PUBLIC_FOO: ", NEXT_PUBLIC_FOO] }), (0, jsx_runtime_1.jsxs)("p", { children: ["BAR: ", BAR] })] }));
        };
        const { getByText } = (0, react_1.render)((0, jsx_runtime_1.jsx)(public_env_provider_1.PublicEnvProvider, { children: (0, jsx_runtime_1.jsx)(SomeClientComponent, {}) }));
        expect(getByText(/^NEXT_PUBLIC_FOO:/).textContent).toBe('NEXT_PUBLIC_FOO: foo-value');
        expect(getByText(/^BAR:/).textContent).toBe('BAR: ');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljLWVudi1wcm92aWRlci5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3Byb3ZpZGVyL3B1YmxpYy1lbnYtcHJvdmlkZXIuc3BlYy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQW1DO0FBRW5DLGtEQUFnRDtBQUVoRCwrREFBMEQ7QUFDMUQsdURBQWtEO0FBRWxELElBQUksVUFBNkIsQ0FBQztBQUVsQyxTQUFTLENBQUMsR0FBRyxFQUFFO0lBQ2IsVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFDM0IsQ0FBQyxDQUFDLENBQUM7QUFFSCxRQUFRLENBQUMsR0FBRyxFQUFFO0lBQ1osT0FBTyxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUM7QUFDM0IsQ0FBQyxDQUFDLENBQUM7QUFFSCxRQUFRLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxFQUFFO0lBQ2pDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxPQUFPLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNuQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyx1REFBdUQsRUFBRSxHQUFHLEVBQUU7UUFDL0QsT0FBTyxDQUFDLEdBQUcsR0FBRztZQUNaLGVBQWUsRUFBRSxXQUFXO1NBQzdCLENBQUM7UUFFRixNQUFNLG1CQUFtQixHQUFHLEdBQUcsRUFBRTtZQUMvQixNQUFNLEVBQUUsZUFBZSxFQUFFLEdBQUcsSUFBQSwrQkFBYSxHQUFFLENBQUM7WUFFNUMsT0FBTyxDQUNMLDJEQUNFLCtEQUFxQixlQUFlLElBQUssR0FDeEMsQ0FDSixDQUFDO1FBQ0osQ0FBQyxDQUFDO1FBRUYsTUFBTSxFQUFFLFNBQVMsRUFBRSxHQUFHLElBQUEsY0FBTSxFQUMxQix1QkFBQyx1Q0FBaUIsY0FDaEIsdUJBQUMsbUJBQW1CLEtBQUcsR0FDTCxDQUNyQixDQUFDO1FBRUYsTUFBTSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FDckQsNEJBQTRCLENBQzdCLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyx3REFBd0QsRUFBRSxHQUFHLEVBQUU7UUFDaEUsT0FBTyxDQUFDLEdBQUcsR0FBRztZQUNaLEdBQUcsRUFBRSxXQUFXO1NBQ2pCLENBQUM7UUFFRixNQUFNLG1CQUFtQixHQUFHLEdBQUcsRUFBRTtZQUMvQixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBQSwrQkFBYSxHQUFFLENBQUM7WUFFaEMsT0FBTyxDQUNMLDJEQUNFLG1EQUFTLEdBQUcsSUFBSyxHQUNoQixDQUNKLENBQUM7UUFDSixDQUFDLENBQUM7UUFFRixNQUFNLEVBQUUsU0FBUyxFQUFFLEdBQUcsSUFBQSxjQUFNLEVBQzFCLHVCQUFDLHVDQUFpQixjQUNoQix1QkFBQyxtQkFBbUIsS0FBRyxHQUNMLENBQ3JCLENBQUM7UUFFRixNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2RCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyx3REFBd0QsRUFBRSxHQUFHLEVBQUU7UUFDaEUsT0FBTyxDQUFDLEdBQUcsR0FBRztZQUNaLGVBQWUsRUFBRSxXQUFXO1lBQzVCLEdBQUcsRUFBRSxXQUFXO1NBQ2pCLENBQUM7UUFFRixNQUFNLG1CQUFtQixHQUFHLEdBQUcsRUFBRTtZQUMvQixNQUFNLEVBQUUsZUFBZSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUEsK0JBQWEsR0FBRSxDQUFDO1lBRWpELE9BQU8sQ0FDTCw2REFDRSwrREFBcUIsZUFBZSxJQUFLLEVBQ3pDLG1EQUFTLEdBQUcsSUFBSyxJQUNoQixDQUNKLENBQUM7UUFDSixDQUFDLENBQUM7UUFFRixNQUFNLEVBQUUsU0FBUyxFQUFFLEdBQUcsSUFBQSxjQUFNLEVBQzFCLHVCQUFDLHVDQUFpQixjQUNoQix1QkFBQyxtQkFBbUIsS0FBRyxHQUNMLENBQ3JCLENBQUM7UUFFRixNQUFNLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUNyRCw0QkFBNEIsQ0FDN0IsQ0FBQztRQUNGLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZELENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==