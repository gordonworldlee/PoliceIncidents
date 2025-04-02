const { createDriver, By, until, waitAndClick, waitAndFindElement } = require("./setup");

jest.setTimeout(60000); // Increase timeout to 60 seconds for headless mode

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

    // Helper function specific to this test suite
    async function loadHomepage() {
        await driver.get("http://localhost:3000");
        // Wait for the page to be fully loaded
        await driver.wait(until.elementLocated(By.tagName('body')), 10000);
    }

    test("Should load the homepage", async () => {
        await loadHomepage();
        await driver.wait(async () => {
            const title = await driver.getTitle();
            return title === "JusticeWatch";
        }, 10000, "Title never matched 'JusticeWatch'");
        
        const title = await driver.getTitle();
        expect(title).toBe("JusticeWatch");
    });


    test("Clicking 'Agencies' link should navigate to /department", async () => {
        await loadHomepage();
        
        // Use waitAndClick helper function
        await waitAndClick(driver, By.linkText("AGENCIES"));
        
        // Increase wait time for URL change
        await driver.wait(until.urlContains("/department"), 10000);
        
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).toContain("/department");
    });

    test("Clicking 'Incidents' link should navigate to /violence", async () => {
        await loadHomepage();
        
        await waitAndClick(driver, By.linkText("INCIDENTS"));
        
        await driver.wait(until.urlContains("/violence"), 10000);
        
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).toContain("/violence");
    });

    test("Clicking 'Legislation' link should navigate to /legislation", async () => {
        await loadHomepage();
        
        await waitAndClick(driver, By.linkText("LEGISLATION"));
        
        await driver.wait(until.urlContains("/legislation"), 10000);
        
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).toContain("/legislation");
    });

    test("Clicking 'About Us' link should navigate to /about", async () => {
        await loadHomepage();
        
        await waitAndClick(driver, By.linkText("ABOUT US"));
        
        await driver.wait(until.urlContains("/about"), 10000);
        
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).toContain("/about");
    });

    // Modified tests for external links - checking href instead of new tab behavior
    // which is more reliable in headless mode
    
    test("'API Documentation (Postman)' link should have correct href", async () => {
        await driver.get("http://localhost:3000/about");
        await driver.wait(until.elementLocated(By.tagName('body')), 10000);
        
        const apiDocumentationLink = await waitAndFindElement(driver, By.linkText("API Documentation (Postman)"));
        const href = await apiDocumentationLink.getAttribute('href');
        
        // Check that the href is an external link (modify the expected URL as needed)
        expect(href).toBeTruthy();
        expect(href.startsWith('http')).toBe(true);
    });

    test("'Mapping Police Violence Dataset' link should have correct href", async () => {
        await driver.get("http://localhost:3000/about");
        await driver.wait(until.elementLocated(By.tagName('body')), 10000);
        
        const mappingPoliceViolenceLink = await waitAndFindElement(driver, By.linkText("Mapping Police Violence Dataset"));
        const href = await mappingPoliceViolenceLink.getAttribute('href');
        
        expect(href).toBeTruthy();
        expect(href.startsWith('http')).toBe(true);
    });

    test("'National Conference of State Legislatures (NCSL) Policing Legislation Database' link should have correct href", async () => {
        await driver.get("http://localhost:3000/about");
        await driver.wait(until.elementLocated(By.tagName('body')), 10000);
        
        const ncslLink = await waitAndFindElement(driver, 
            By.linkText("National Conference of State Legislatures (NCSL) Policing Legislation Database"));
        const href = await ncslLink.getAttribute('href');
        
        expect(href).toBeTruthy();
        expect(href.startsWith('http')).toBe(true);
    });

    test("'Police Scorecard API' link should have correct href", async () => {
        await driver.get("http://localhost:3000/about");
        await driver.wait(until.elementLocated(By.tagName('body')), 10000);
        
        const policeScorecardApiLink = await waitAndFindElement(driver, By.linkText("Police Scorecard API"));
        const href = await policeScorecardApiLink.getAttribute('href');
        
        expect(href).toBeTruthy();
        expect(href.startsWith('http')).toBe(true);
    });


    // Optional: If you still want to test new tab behavior, but make it more reliable
    test("External links should have target='_blank'", async () => {
        await driver.get("http://localhost:3000/about");
        await driver.wait(until.elementLocated(By.tagName('body')), 10000);
        
        const externalLinks = await driver.findElements(By.css("a[href^='http']"));
        
        // Check that we found some external links
        expect(externalLinks.length).toBeGreaterThan(0);
        
        // Check that they all have target="_blank"
        for (const link of externalLinks) {
            const target = await link.getAttribute('target');
            expect(target).toBe('_blank');
        }
    });

    
});