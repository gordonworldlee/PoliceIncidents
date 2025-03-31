const { createDriver, By, until } = require("./setup");

jest.setTimeout(30000); // Increase timeout to 30 seconds

describe("Homepage and Navbar Tests", () => {
    let driver;

    beforeAll(async () => {
        driver = await createDriver();
    });

    afterAll(async () => {
        if (driver) {
            await driver.quit();
        }
    });

    test("Should load the homepage", async () => {
        await driver.get("http://localhost:3000");
        const title = await driver.getTitle();
        expect(title).toBe("JusticeWatch"); // Change this to match your actual title
    });

    test("Navbar should be visible on page load", async () => {
        await driver.get("http://localhost:3000");

        const navbar = await driver.findElement(By.id("navbar"));
        const isDisplayed = await navbar.isDisplayed();
        
        expect(isDisplayed).toBe(true);
    });

    test("Clicking 'Agencies' link should navigate to /department", async () => {
        await driver.get("http://localhost:3000");

        const agenciesLink = await driver.findElement(By.linkText("AGENCIES"));
        await agenciesLink.click();

        await driver.wait(until.urlContains("/department"), 5000); // Ensure URL updates to /departments

        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).toContain("/department");
    });

    test("Clicking 'Incidents' link should navigate to /violence", async () => {
        await driver.get("http://localhost:3000");

        const incidentsLink = await driver.findElement(By.linkText("INCIDENTS"));
        await incidentsLink.click();

        await driver.wait(until.urlContains("/violence"), 5000); // Ensure URL updates to /violence

        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).toContain("/violence");
    });

    test("Clicking 'Legislation' link should navigate to /legislation", async () => {
        await driver.get("http://localhost:3000");

        const legislationLink = await driver.findElement(By.linkText("LEGISLATION"));
        await legislationLink.click();

        await driver.wait(until.urlContains("/legislation"), 5000); // Ensure URL updates to /legislation

        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).toContain("/legislation");
    });

    test("Clicking 'About Us' link should navigate to /about", async () => {
        await driver.get("http://localhost:3000");

        const aboutUsLink = await driver.findElement(By.linkText("ABOUT US"));
        await aboutUsLink.click();

        await driver.wait(until.urlContains("/about"), 5000); // Ensure URL updates to /about

        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).toContain("/about");
    });

    // New tests for external links on the About Us page

    test("Clicking 'JusticeWatch API Documentation' link should open a new tab", async () => {
        await driver.get("http://localhost:3000/about");

        const apiDocumentationLink = await driver.findElement(By.linkText("API Documentation (Postman)"));
        const initialWindowHandles = await driver.getAllWindowHandles();
        
        await apiDocumentationLink.click();
        
        // Wait a bit to ensure the new tab has time to open
        await driver.sleep(2000); // Sleep for 2 seconds to ensure the tab opens

        const windowHandles = await driver.getAllWindowHandles();
        expect(windowHandles.length).toBe(initialWindowHandles.length + 1); // Check if new tab is opened
    });

    test("Clicking 'Mapping Police Violence Dataset' link should open a new tab", async () => {
        await driver.get("http://localhost:3000/about");

        const mappingPoliceViolenceLink = await driver.findElement(By.linkText("Mapping Police Violence Dataset"));
        const initialWindowHandles = await driver.getAllWindowHandles();
        
        await mappingPoliceViolenceLink.click();
        
        // Wait a bit to ensure the new tab has time to open
        await driver.sleep(2000); // Sleep for 2 seconds to ensure the tab opens

        const windowHandles = await driver.getAllWindowHandles();
        expect(windowHandles.length).toBe(initialWindowHandles.length + 1); // Check if new tab is opened
    });

    test("Clicking 'National Conference of State Legislatures (NCSL) Policing Legislation Database' link should open a new tab", async () => {
        await driver.get("http://localhost:3000/about");

        const civilAndCriminalJusticeLink = await driver.findElement(By.linkText("National Conference of State Legislatures (NCSL) Policing Legislation Database"));
        const initialWindowHandles = await driver.getAllWindowHandles();
        
        await civilAndCriminalJusticeLink.click();
        
        // Wait a bit to ensure the new tab has time to open
        await driver.sleep(2000); // Sleep for 2 seconds to ensure the tab opens

        const windowHandles = await driver.getAllWindowHandles();
        expect(windowHandles.length).toBe(initialWindowHandles.length + 1); // Check if new tab is opened
    });

    test("Clicking 'Police Scorecard API' link should open a new tab", async () => {
        await driver.get("http://localhost:3000/about");
    
        const policeScorecardApiLink = await driver.findElement(By.linkText("Police Scorecard API"));
        const initialWindowHandles = await driver.getAllWindowHandles();
        
        await policeScorecardApiLink.click();
        
        // Wait a bit to ensure the new tab has time to open
        await driver.sleep(2000); // Sleep for 2 seconds to ensure the tab opens

        const windowHandles = await driver.getAllWindowHandles();
        expect(windowHandles.length).toBe(initialWindowHandles.length + 1); // Check if new tab is opened
    });
});
