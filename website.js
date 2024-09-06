const puppeteer = require('puppeteer');
const fs = require('fs');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch');
const path = require('path');

const outputPath = 'C:/Users/king/OneDrive/Desktop/furniture/pixelmatch/output.txt';
const outputStream = fs.createWriteStream(outputPath);

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
    await page.goto("https://viscommerce.com", { timeout: 4000 });
    console.log("Pass✅ : Website loaded");

    await page.waitForSelector(".grid");
    await page.waitForTimeout(1500);

    await page.click(".grid");
    await page.waitForTimeout(1000);
    console.log("Pass✅ : Clicked on Demo Button");
  
    // const Screenshot = await captureScreenshot(page, 'C:/Users/king/OneDrive/Desktop/furniture/website/Demo-Button.png', 2000);
    // console.log("Pass✅ : Demo Page ss captured");

    await page.click(".w-[50px]");
    await page.waitForTimeout(6000);
    console.log("Pass✅ : Clicked on Showroom3D Demo Button");

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

// Function to get the directory path for a category
function getCategoryDirectory(category) {
  switch (category) {
    case 'furniture':
      return 'C:/Users/king/OneDrive/Desktop/furniture/website';
    default:
      throw new Error(`Invalid category: ${category}`);
  }
}