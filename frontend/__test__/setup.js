const { Builder, By, until, Key } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function createDriver() {
  try {
    // Configure Chrome options for headless execution
    const options = new chrome.Options();
    
    // Essential headless configuration
    options.addArguments('--headless=new');  // Using the newer headless implementation
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    
    // Additional useful options for CI environments
    options.addArguments('--disable-gpu');
    options.addArguments('--window-size=1920,1080');
    options.addArguments('--disable-extensions');
    
    // Additional options to improve stability
    options.addArguments('--disable-popup-blocking');
    options.addArguments('--disable-notifications');
    options.addArguments('--ignore-certificate-errors');
    options.addArguments('--remote-allow-origins=*');  // Helps with Chrome 111+ compatibility issues
    
    // Optional: Set page load strategy to eager for better performance
    const prefs = {
      'profile.default_content_setting_values.notifications': 2
    };
    options.setUserPreferences(prefs);
    
    // Create and return the WebDriver with the configured options
    const driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
    
    // Set default timeouts
    await driver.manage().setTimeouts({
      implicit: 10000,       // Wait up to 10 seconds when finding elements
      pageLoad: 30000,       // Wait up to 30 seconds for page loads
      script: 30000          // Wait up to 30 seconds for scripts to execute
    });
    
    return driver;
  } catch (error) {
    console.error("Error creating WebDriver:", error);
    throw error;
  }
}

// Helper functions to make tests more robust
async function waitAndClick(driver, locator, timeout = 10000) {
  const element = await driver.wait(until.elementLocated(locator), timeout);
  await driver.wait(until.elementIsVisible(element), timeout);
  await driver.executeScript("arguments[0].scrollIntoView(true);", element);
  await element.click();
  return element;
}

async function waitAndFindElement(driver, locator, timeout = 10000) {
  const element = await driver.wait(until.elementLocated(locator), timeout);
  return element;
}

module.exports = { 
  createDriver, 
  By, 
  until, 
  Key,
  waitAndClick,
  waitAndFindElement
};