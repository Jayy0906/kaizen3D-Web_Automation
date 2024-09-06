const puppeteer = require("puppeteer");
const fs = require("fs");
const { PNG } = require("pngjs");
const path = require("path");


(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Function to create a directory if it doesn't exist
  function createDirectoryIfNotExists(directoryPath) {
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }
  }

  try {
    // Load the web app's initial page
    await page.setViewport({ width: 1550, height: 700 });
    await page.goto("http://gandivam.co.in/Showroom3D_Desktop/", {
      timeout: 30000,
    });
    console.log("Pass✅ : Website loaded");

    await page.waitForSelector("#scene-container");
    await page.waitForTimeout(1500);

    await page.click("#home_card_close_Desktop");
    await page.waitForTimeout(1000);
    console.log("Pass✅ : Welcome screen Closed");

    // Function to capture a screenshot and return its PNG object
    async function captureScreenshot(page, filename, timeout) {
      await page.waitForTimeout(timeout);
      const screenshotBuffer = await page.screenshot();
      const screenshot = PNG.sync.read(screenshotBuffer);
      if (filename) {
        fs.writeFileSync(filename, screenshotBuffer);
      }
      return screenshot;
    }

    // Furniture
    await page.click("#v-pills-Advanced-tab");
    await page.click("#Prompt_ui");
    await page.click("#v-pills-Sample-tab");
    await page.click("#load_Furniture_Desktop");
    const initialFurnitureScreenshot = await captureScreenshot(
      page,
      "C:/Users/king/OneDrive/Desktop/furniture/screenshot/Furniture-Actual.png",
      40000
    );
    console.log("Pass✅ : Furniture ss captured");

    // Lighting
    await page.click("#load_Lighting_Desktop");
    const initialLightingScreenshot = await captureScreenshot(
      page,
      "C:/Users/king/OneDrive/Desktop/furniture/screenshot/Lighting/Lighting-Actual.png",
      50000
    );
    console.log("Pass✅ : Lighting ss captured");

    // Accessories
    await page.click("#load_Accessories_Desktop");
    const initialAccessoriesScreenshot = await captureScreenshot(
      page,
      "C:/Users/king/OneDrive/Desktop/furniture/screenshot/Accessories/Accessories-Actual.png",
      18000
    );
    console.log("Pass✅ : Accessories ss captured");

    // DayLight
    await page.click("#dayLight_Desktop");
    const initialDaylightScreenshot = await captureScreenshot(
      page,
      "C:/Users/king/OneDrive/Desktop/furniture/screenshot/Daylight/Daylight-Actual.png",
      25000
    );
    console.log("Pass✅ : DayLight ss captured");

    // Close the browser
    await browser.close();
  } catch (err) {
    console.log("Fail🚫 :", err.message);
    outputStream.write(`Fail🚫 : ${err.message}\n`);
  } finally {
    await browser.close();
    outputStream.end(); // Close the output stream
  }
})();
