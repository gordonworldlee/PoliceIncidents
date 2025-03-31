const { Builder, By, until } = require("selenium-webdriver");

async function createDriver() {
    try {
        let driver = await new Builder().forBrowser("chrome").build();
        return driver;
    } catch (error) {
        console.error("Error creating WebDriver:", error);
        throw error;
    }
}

module.exports = { createDriver, By, until };
