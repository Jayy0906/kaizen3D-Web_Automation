const puppeteer = require("puppeteer");
const fs = require("fs");
const { PNG } = require("pngjs");
const pixelmatch = require("pixelmatch");
const path = require("path");

const outputPath = "pixelmatch/output.txt";
const outputStream = fs.createWriteStream(outputPath);

// Function to create a directory if it doesn't exist
function createDirectoryIfNotExists(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }
}

// Function to get the directory path for a category
function getCategoryDirectory(category) {
  switch (category) {
    case "furniture":
      return "furniture";
    case "lighting":
      return "lighting";
    case "accessories":
      return "accessories";
    case "loungeChair":
      return "lounge-chair";
    case "bookShelf":
      return "book-shelf";
    case "daylight":
      return "daylight";
    case "theme":
      return "theme";
    case "chair":
      return "chair";
    case "table":
      return "table";
    case "advanced":
      return "advanced";
    // Add more categories
    default:
      throw new Error(`Invalid category: ${category}`);
  }
}

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    // Load the web app's initial page
    await page.setViewport({ width: 1550, height: 700 });
    await page.goto("https://viscommerce.com/showroom3d_web/", {
      timeout: 30000,
    });
    console.log("Pass✅ : Showrrom3D Demo Loaded");

    await page.waitForSelector("#scene-container");
    await page.waitForTimeout(1500);

    await page.click("#home_card_close_Desktop");
    await page.waitForTimeout(1000);
    console.log("Pass✅ : Welcome screen Closed");

    // Create an array to hold difference images
    const diffImages = [];

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
    await page.waitForTimeout(1000);
    await page.click("#Prompt_ui");
    await page.waitForTimeout(1000);
    await page.click("#v-pills-Sample-tab");
    await page.waitForTimeout(1000);
    await page.click("#load_Furniture_Desktop");
    await page.waitForTimeout(6000);
    const initialFurnitureScreenshot = await captureScreenshot(
      page,
      "pixelmatch/furniture/Furniture-Actual.png"
    );
    await page.waitForTimeout(1100);
    console.log("Pass✅ : Furniture ss captured");

    // Lighting
    await page.click("#load_Lighting_Desktop");
    await page.waitForTimeout(7000);
    const initialLightingScreenshot = await captureScreenshot(
      page,
      "pixelmatch/lighting/Lighting-Actual.png"
    );
    await page.waitForTimeout(1100);
    console.log("Pass✅ : Lighting ss captured");

    // Accessories
    await page.click("#load_Accessories_Desktop");
    await page.waitForTimeout(10000);
    // await page.click("#select_Desktop");
    const initialAccessoriesScreenshot = await captureScreenshot(
      page,
      "pixelmatch/accessories/Accessories-Actual.png"
    );
    await page.waitForTimeout(1100);
    console.log("Pass✅ : Accessories ss captured");

    // Lounge Chair
    await page.click("#load_LoungChair_Desktop");
    await page.waitForTimeout(6000);
    const initialLoungeChairScreenshot = await captureScreenshot(
      page,
      "pixelmatch/lounge-chair/LoungChair-Actual.png"
    );
    await page.waitForTimeout(1100);
    console.log("Pass✅ : LoungeChair ss captured");

    // Book Shelf
    await page.click("#shelfButton");
    await page.waitForTimeout(6000);

    // Viewpoint
    await page.click("#flush-headingFour");
    await page.waitForTimeout(1100);
    console.log("Pass✅ : Viewpoint's Button Selected");

    await page.click("#Main_View");
    await page.waitForTimeout(5000);
    console.log("Pass✅ : Main Viewpoint Selected");

    await page.click("#flush-headingFour");
    await page.waitForTimeout(1500);
    console.log("Pass✅ : Viewpoint's Button Closed");

    const initialbookShelfScreenshot = await captureScreenshot(
      page,
      "pixelmatch/book-shelf/BookShelf-Actual.png"
    );
    await page.waitForTimeout(1100);
    console.log("Pass✅ : Book Shelf ss captured");

    // Daylight
    await page.click(".LightModesImage1");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : Day Light ON");

    await page.click("#nightLight_Desktop");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : Night Light ON");

    await page.click(".LightModesImage1");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : Day Light ON");

    const initialdaylightScreenshot = await captureScreenshot(
      page,
      "pixelmatch/daylight/Daylight-Actual.png"
    );
    await page.waitForTimeout(1500);
    console.log("Pass✅ : Daylight ss captured");

    // Themes
    await page.click("#flush-headingThree");
    await page.waitForTimeout(1500);
    console.log("Pass✅ : Theme's UI Selected");

    await page.click("#Room_101", "Theme 1 Selected");
    await page.waitForTimeout(1000);
    await page.click("#Room_102", "Theme 2 Selected");
    await page.waitForTimeout(1000);
    await page.click("#Room_103", "Theme 3 Selected");
    await page.waitForTimeout(1000);
    await page.click("#Room_104", "Theme 4 Selected");
    await page.waitForTimeout(1000);
    await page.click("#Room_105", "Theme 5 Selected");
    await page.waitForTimeout(1000);
    await page.click("#Room_106", "Theme 6 Selected");
    await page.waitForTimeout(1000);
    console.log("Pass✅ : Theme 6 Selected");

    await page.click("#flush-headingThree");
    await page.waitForTimeout(1500);
    console.log("Pass✅ : Theme's UI Closed");

    const initialthemeScreenshot = await captureScreenshot(
      page,
      "pixelmatch/theme/Theme-Actual.png"
    );
    await page.waitForTimeout(1100);
    console.log("Pass✅ : Themes Added");

    // Chair
    await page.click("#v-pills-Furniture-tab");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : Clicked on Furniture Button");

    await page.click("#flush-headingFour");
    await page.waitForTimeout(1500);
    console.log("Viewpoint's Button Selected");

    await page.click("#Chair_view");
    await page.waitForTimeout(1500);
    console.log("Chair's viewpoint Selected");

    await page.click("#flush-headingFour");
    await page.waitForTimeout(1500);
    console.log("Viewpoint's Button Selected");

    // Basic
    await page.click("#Basic");
    await page.waitForTimeout(1500);
    console.log("Pass✅ : Selected Basic Chair");

    await page.click("#flush-headingSeven");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : Basic Chair's Material UI Selected");

    // Bsic Chair 2nd Material
    // Wait for the image to be present in the DOM
    await page.waitForSelector(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Chair_02_Feb_8/Chair_105.webp"]'
    );

    // Wait for the image to load completely (assuming it's lazy-loaded)
    await page.waitForFunction(
      () =>
        document.querySelector(
          'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Chair_02_Feb_8/Chair_105.webp"]'
        ).complete
    );

    // Click the image
    await page.click(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Chair_02_Feb_8/Chair_105.webp"]'
    );
    await page.waitForTimeout(2000);

    // Basic Chair 3rd Material
    // Wait for the image to be present in the DOM
    await page.waitForSelector(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Chair_02_Feb_8/Chair_106.webp"]'
    );

    // Wait for the image to load completely (assuming it's lazy-loaded)
    await page.waitForFunction(
      () =>
        document.querySelector(
          'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Chair_02_Feb_8/Chair_106.webp"]'
        ).complete
    );

    // Click the image
    await page.click(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Chair_02_Feb_8/Chair_106.webp"]'
    );
    await page.waitForTimeout(2000);

    // Basic Chair 1st Material
    // Wait for the image to be present in the DOM
    await page.waitForSelector(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Chair_02_Feb_8/Chair_104.webp"]'
    );

    // Wait for the image to load completely (assuming it's lazy-loaded)
    await page.waitForFunction(
      () =>
        document.querySelector(
          'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Chair_02_Feb_8/Chair_104.webp"]'
        ).complete
    );

    // Click the image
    await page.click(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Chair_02_Feb_8/Chair_104.webp"]'
    );
    await page.waitForTimeout(2000);

    await page.click("#flush-headingSix");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : Basic Chair's Dynamic UI Opened");

    await page.click("#Height0");
    await page.waitForTimeout(1100);
    console.log("Pass✅ : Basic Chair's Height Selected");

    await page.click("#Rotation1");
    await page.waitForTimeout(1100);
    console.log("Pass✅ : Basic Chair's Rotation Selected");

    await page.click("#Arm2");
    await page.waitForTimeout(1100);
    console.log("Pass✅ : Basic Chair's Arm Selected");

    // Advanced
    await page.click("#Advanced");
    await page.waitForTimeout(1500);
    console.log("Pass✅ : Selected Advanced Chair");

    await page.click("#flush-headingSeven");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : Advanced Chair's Material UI Selected");

    // Advanced Chair 1st Material
    // Wait for the image to be present in the DOM
    await page.waitForSelector(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Chair_03_v01/Chair_107.webp"]'
    );

    // Wait for the image to load completely (assuming it's lazy-loaded)
    await page.waitForFunction(
      () =>
        document.querySelector(
          'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Chair_03_v01/Chair_107.webp"]'
        ).complete
    );

    // Click the image
    await page.click(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Chair_03_v01/Chair_107.webp"]'
    );
    await page.waitForTimeout(2000);

    // Advanced Chair 2nd Material
    // Wait for the image to be present in the DOM
    await page.waitForSelector(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Chair_03_v01/Chair_108.webp"]'
    );

    // Wait for the image to load completely (assuming it's lazy-loaded)
    await page.waitForFunction(
      () =>
        document.querySelector(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Chair_03_v01/Chair_108.webp"]'
        ).complete
    );

    // Click the image
    await page.click(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Chair_03_v01/Chair_108.webp"]'
    );
    await page.waitForTimeout(2000);

    // Advanced Chair 3rd Material
    // Wait for the image to be present in the DOM
    await page.waitForSelector(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Chair_03_v01/Chair_109.webp"]'
    );

    // Wait for the image to load completely (assuming it's lazy-loaded)
    await page.waitForFunction(
      () =>
        document.querySelector(
          'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Chair_03_v01/Chair_109.webp"]'
        ).complete
    );

    // Click the image
    await page.click(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Chair_03_v01/Chair_109.webp"]'
    );
    await page.waitForTimeout(2000);

    await page.click("#flush-headingSix");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : Advanced Chair's Dynamic UI Opened");

    await page.click("#Height0");
    await page.waitForTimeout(1100);
    console.log("Pass✅ : Advanced Chair's Height Selected");

    // await page.click("#Back Rest1");
    // await page.waitForTimeout(1100);
    // console.log("Pass✅ : Advanced Chair's Rotation Selected");

    // await page.click("#Head Rest2");
    // await page.waitForTimeout(1100);
    // console.log("Pass✅ : Advanced Chair's Arm Selected");

    // Bucket Seat
    // Wait for the image to be present in the DOM
    await page.waitForSelector(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/thumbnails/chairs/Chair_01_v01.webp"]'
    );

    // Wait for the image to load completely (assuming it's lazy-loaded)
    await page.waitForFunction(
      () =>
        document.querySelector(
          'img[src="https://d3t7cnf9sa42u5.cloudfront.net/thumbnails/chairs/Chair_01_v01.webp"]'
        ).complete
    );

    // Click the image
    await page.click(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/thumbnails/chairs/Chair_01_v01.webp"]'
    );
    await page.waitForTimeout(2000);
    console.log("Pass✅ : Selected Bucket Chair");

    await page.click("#flush-headingSeven");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : Chair's Material UI Selected");

    // Bucket Chair 2nd Material
    // Wait for the image to be present in the DOM
    await page.waitForSelector(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Chair_01_v01/Chair_102.webp"]'
    );

    // Wait for the image to load completely (assuming it's lazy-loaded)
    await page.waitForFunction(
      () =>
        document.querySelector(
          'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Chair_01_v01/Chair_102.webp"]'
        ).complete
    );

    // Click the image
    await page.click(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Chair_01_v01/Chair_102.webp"]'
    );
    await page.waitForTimeout(1100);

    // Bucket Chair 3rd Material
    // Wait for the image to be present in the DOM
    await page.waitForSelector(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Chair_01_v01/Chair_103.webp"]'
    );

    // Wait for the image to load completely (assuming it's lazy-loaded)
    await page.waitForFunction(
      () =>
        document.querySelector(
          'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Chair_01_v01/Chair_103.webp"]'
        ).complete
    );

    // Click the image
    await page.click(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Chair_01_v01/Chair_103.webp"]'
    );
    await page.waitForTimeout(1100);

    // Bucket Chair 1st Material
    // Wait for the image to be present in the DOM
    await page.waitForSelector(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Chair_01_v01/Chair_101.webp"]'
    );

    // Wait for the image to load completely (assuming it's lazy-loaded)
    await page.waitForFunction(
      () =>
        document.querySelector(
          'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Chair_01_v01/Chair_101.webp"]'
        ).complete
    );

    // Click the image
    await page.click(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Chair_01_v01/Chair_101.webp"]'
    );
    await page.waitForTimeout(2000);

    await page.click("#flush-headingSeven");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : Basic Chair's Material UI Closed");

    await page.click("#flush-headingSix");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : Basic Chair's Dynamic UI Opened");

    await page.click("#Height0");
    await page.waitForTimeout(1100);
    console.log("Pass✅ : Basic Chair's Height Selected");

    await page.click("#Rotate1");
    await page.waitForTimeout(1100);
    console.log("Pass✅ : Basic Chair's Rotation Selected");

    // await page.click("#Back Rest2");
    // await page.waitForTimeout(1100);
    // console.log("Pass✅ : Basic Chair's Back Rest Selected");

    await page.click("#variants_show");
    await page.waitForTimeout(1100);
    console.log("Pass✅ : Basic Chair's Dynamic UI Closed");

    const initialchairScreenshot = await captureScreenshot(
      page,
      "pixelmatch/chair/Chair-Actual.png"
    );
    await page.waitForTimeout(1100);
    console.log("Pass✅ : Chair's Screenshot Captured");

    // Table
    await page.click("#v-pills-Furniture-tab");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : Clicked on Furniture Button");

    await page.click("#flush-headingFour");
    await page.waitForTimeout(1500);
    console.log("Viewpoint's Button Selected");

    await page.click("#Table_View");
    await page.waitForTimeout(1500);
    console.log("Table's viewpoint Selected");

    await page.click("#flush-headingFour");
    await page.waitForTimeout(1500);
    console.log("Viewpoint's Button Closed");

    await page.click("#Table-tab");
    await page.waitForTimeout(1500);
    console.log("Table's Button Selected");

    // Motarized Table
    await page.click("#Motarized");
    await page.waitForTimeout(1500);
    console.log("Pass✅ : Selected Motarized Table");

    await page.click("#flush-headingSeven");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : MotarizeD Table's Material UI Selected");

    // Motarized 2nd Material
    // Wait for the image to be present in the DOM
    await page.waitForSelector(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Table_Automatic_01_v01/Table_102.webp"]'
    );

    // Wait for the image to load completely (assuming it's lazy-loaded)
    await page.waitForFunction(
      () =>
        document.querySelector(
          'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Table_Automatic_01_v01/Table_102.webp"]'
        ).complete
    );

    // Click the image
    await page.click(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Table_Automatic_01_v01/Table_102.webp"]'
    );
    await page.waitForTimeout(1100);

    // Motarized Table 3rd Material
    // Wait for the image to be present in the DOM
    await page.waitForSelector(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Table_Automatic_01_v01/Table_103.webp"]'
    );

    // Wait for the image to load completely (assuming it's lazy-loaded)
    await page.waitForFunction(
      () =>
        document.querySelector(
          'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Table_Automatic_01_v01/Table_103.webp"]'
        ).complete
    );

    // Click the image
    await page.click(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Table_Automatic_01_v01/Table_103.webp"]'
    );
    await page.waitForTimeout(1100);

    // Motarized Table 1st Material
    // Wait for the image to be present in the DOM
    await page.waitForSelector(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Table_Automatic_01_v01/Table_101.webp"]'
    );

    // Wait for the image to load completely (assuming it's lazy-loaded)
    await page.waitForFunction(
      () =>
        document.querySelector(
          'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Table_Automatic_01_v01/Table_101.webp"]'
        ).complete
    );

    // Click the image
    await page.click(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Table_Automatic_01_v01/Table_101.webp"]'
    );
    await page.waitForTimeout(1100);

    await page.click("#flush-headingSix");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : Motarized Table's Dynamic UI Opened");

    await page.click("#Level_11");
    await page.waitForTimeout(1100);
    console.log("Pass✅ : Motarized Table's Height level 2 Selected");

    await page.click("#Level_22");
    await page.waitForTimeout(1100);
    console.log("Pass✅ : Motarized Table's Height level 3 Selected");

    await page.click("#Level_00");
    await page.waitForTimeout(1100);
    console.log("Pass✅ : Motarized Table's Height level 1 Selected");

    // Manual Table
    await page.click("#Manual");
    await page.waitForTimeout(1500);
    console.log("Pass✅ : Selected Manual Table");

    await page.click("#flush-headingSeven");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : Manual Table's Material UI Selected");

    // Manual 2nd Material
    // Wait for the image to be present in the DOM
    await page.waitForSelector(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Table_Manual_01_noObjects/Table_105.webp"]'
    );

    // Wait for the image to load completely (assuming it's lazy-loaded)
    await page.waitForFunction(
      () =>
        document.querySelector(
          'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Table_Manual_01_noObjects/Table_105.webp"]'
        ).complete
    );

    // Click the image
    await page.click(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Table_Manual_01_noObjects/Table_105.webp"]'
    );
    await page.waitForTimeout(2000);

    // Manual Table 3rd Material
    // Wait for the image to be present in the DOM
    await page.waitForSelector(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Table_Manual_01_noObjects/Table_106.webp"]'
    );

    // Wait for the image to load completely (assuming it's lazy-loaded)
    await page.waitForFunction(
      () =>
        document.querySelector(
          'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Table_Manual_01_noObjects/Table_106.webp"]'
        ).complete
    );

    // Click the image
    await page.click(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Table_Manual_01_noObjects/Table_106.webp"]'
    );
    await page.waitForTimeout(2000);

    // Manual Table 1st Material
    // Wait for the image to be present in the DOM
    await page.waitForSelector(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Table_Manual_01_noObjects/Table_104.webp"]'
    );

    // Wait for the image to load completely (assuming it's lazy-loaded)
    await page.waitForFunction(
      () =>
        document.querySelector(
          'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Table_Manual_01_noObjects/Table_104.webp"]'
        ).complete
    );

    // Click the image
    await page.click(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Table_Manual_01_noObjects/Table_104.webp"]'
    );
    await page.waitForTimeout(2000);

    await page.click("#flush-headingSix");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : Manual Table's Dynamic UI Opened");

    await page.click("#Level_11");
    await page.waitForTimeout(1100);
    console.log("Pass✅ : Manual Table's Height level 2 Selected");

    await page.click("#Level_22");
    await page.waitForTimeout(1100);
    console.log("Pass✅ : Manual Table's Height level 3 Selected");

    await page.click("#Level_00");
    await page.waitForTimeout(1100);
    console.log("Pass✅ : Manual Table's Height level 1 Selected");

    // Manual Table
    await page.click("#Small");
    await page.waitForTimeout(1500);
    console.log("Pass✅ : Selected Small Table");

    await page.click("#flush-headingSeven");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : Small Table's Material UI Selected");

    // Small 2nd Material
    // Wait for the image to be present in the DOM
    await page.waitForSelector(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Table_Small_01_noObjects/Table_108.webp"]'
    );

    // Wait for the image to load completely (assuming it's lazy-loaded)
    await page.waitForFunction(
      () =>
        document.querySelector(
          'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Table_Small_01_noObjects/Table_108.webp"]'
        ).complete
    );

    // Click the image
    await page.click(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Table_Small_01_noObjects/Table_108.webp"]'
    );
    await page.waitForTimeout(1100);

    // Small Table 3rd Material
    // Wait for the image to be present in the DOM
    await page.waitForSelector(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Table_Small_01_noObjects/Table_109.webp"]'
    );

    // Wait for the image to load completely (assuming it's lazy-loaded)
    await page.waitForFunction(
      () =>
        document.querySelector(
          'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Table_Small_01_noObjects/Table_109.webp"]'
        ).complete
    );

    // Click the image
    await page.click(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Table_Small_01_noObjects/Table_109.webp"]'
    );
    await page.waitForTimeout(1100);

    // Small Table 1st Material
    // Wait for the image to be present in the DOM
    await page.waitForSelector(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Table_Small_01_noObjects/Table_107.webp"]'
    );

    // Wait for the image to load completely (assuming it's lazy-loaded)
    await page.waitForFunction(
      () =>
        document.querySelector(
          'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Table_Small_01_noObjects/Table_107.webp"]'
        ).complete
    );

    // Click the image
    await page.click(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Table_Small_01_noObjects/Table_107.webp"]'
    );
    await page.waitForTimeout(1100);

    await page.click("#flush-headingSix");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : Small Table's Dynamic UI Opened");

    await page.click("#Level_11");
    await page.waitForTimeout(1100);
    console.log("Pass✅ : Small Table's Height level 2 Selected");

    await page.click("#Level_22");
    await page.waitForTimeout(1100);
    console.log("Pass✅ : Small Table's Height level 3 Selected");

    await page.click("#Level_00");
    await page.waitForTimeout(1100);
    console.log("Pass✅ : Small Table's Height level 1 Selected");

    await page.click("#variants_show");
    await page.waitForTimeout(1100);
    console.log("Pass✅ : Small Table's Dynamic UI Closed");

    const initialtableScreenshot = await captureScreenshot(
      page,
      "pixelmatch/table/Table-Actual.png"
    );
    await page.waitForTimeout(1100);
    console.log("Pass✅ : Table's Screenshot Captured");

    // Form Fill - HD Render
    await page.click("#v-pills-Render-tab");
    await page.waitForTimeout(1000);
    console.log("Pass✅ : HD Render Button Selected");

    await page.click("#exampleInputEmail1");
    await page.waitForTimeout(1000);
    console.log("Pass✅ : Clicked on Email ID Fill Box");

    await page.type("[name='email']", "jatpay12@gmail.com", { delay: 100 });

    await page.click("#Image_1K");
    await page.waitForTimeout(1000);
    console.log("Pass✅ : 1K Image selected");

    await page.click("#Export_Image");
    await page.waitForTimeout(8000);
    console.log("Pass✅ : Cliced on Export HD Image Button");

    // Lighting
    await page.click("#v-pills-Lighting-tab");
    await page.waitForTimeout(1000);
    console.log("Pass✅ : Lighting's Button Selected");

    await page.click("#nightLight_Desktop");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : Night Light ON");

    // Floor Lamp
    // Wait for the image to be present in the DOM
    await page.waitForSelector(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/thumbnails/lights/Floor_Lamp_small.webp"]'
    );

    // Wait for the image to load completely (assuming it's lazy-loaded)
    await page.waitForFunction(
      () =>
        document.querySelector(
          'img[src="https://d3t7cnf9sa42u5.cloudfront.net/thumbnails/lights/Floor_Lamp_small.webp"]'
        ).complete
    );

    // Click the image
    await page.click(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/thumbnails/lights/Floor_Lamp_small.webp"]'
    );
    await page.waitForTimeout(2000);
    console.log("Pass✅ : Added Floor Lamp");

    // Wall Lamp
    // Wait for the image to be present in the DOM
    await page.waitForSelector(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/thumbnails/lights/WallLamp.webp"]'
    );

    // Wait for the image to load completely (assuming it's lazy-loaded)
    await page.waitForFunction(
      () =>
        document.querySelector(
          'img[src="https://d3t7cnf9sa42u5.cloudfront.net/thumbnails/lights/WallLamp.webp"]'
        ).complete
    );

    // Click the image
    await page.click(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/thumbnails/lights/WallLamp.webp"]'
    );
    await page.waitForTimeout(2000);
    console.log("Pass✅ : Added Wall Lamp");

    // Advanced Lighting
    await page.click("#v-pills-Advanced-tab");
    await page.waitForTimeout(1000);
    console.log("Pass✅ : Advanced Lighting's Button Selected");

    var eleCheckbox = await page.waitForXPath("//input[@id='pitchDark']");
    await eleCheckbox.click({ clickCount: 1 });
    await page.waitForTimeout(7000);
    console.log("Pass✅ : Pitch Dark ON");

    var eleCheckbox = await page.waitForXPath("//input[@id='pitchDark']");
    await eleCheckbox.click({ clickCount: 1 });
    await page.waitForTimeout(7000);
    console.log("Pass✅ : Pitch Dark OFF");

    await page.click("#WallWasherLightactive");
    await page.waitForTimeout(1000);
    console.log("Pass✅ : Wall Washer Light OFF");

    await page.click("#WallWasherLightactive");
    await page.waitForTimeout(1000);
    console.log("Pass✅ : Wall Washer Light ON");

    // Intensity
    // await page.$eval('#Wall Washer Lightintensity input[type="range"]', (slider) => {
    //   slider.value = "0";
    //   slider.dispatchEvent(new Event("input"));
    // });
    // await page.waitForTimeout(2000);

    // await page.$eval('#Wall Washer Lightintensity input[type="range"]', (slider) => {
    //   slider.value = "1";
    //   slider.dispatchEvent(new Event("input"));
    // });
    // await page.waitForTimeout(2000);

    // await page.$eval('#Wall Washer Lightintensity input[type="range"]', (slider) => {
    //   slider.value = "2";
    //   slider.dispatchEvent(new Event("input"));
    // });
    // await page.waitForTimeout(2000);

    await page.click("#FloorLampactive");
    await page.waitForTimeout(1000);
    console.log("Pass✅ : Floor Lamp ON");

    await page.click("#FloorLampactive");
    await page.waitForTimeout(1000);
    console.log("Pass✅ : Floor Lamp OFF");

    await page.click("#WallLampactive");
    await page.waitForTimeout(1000);
    console.log("Pass✅ : Wall Lamp ON");

    await page.click("#WallLampactive");
    await page.waitForTimeout(1000);
    console.log("Pass✅ : Wall Lamp OFF");

    await page.click("#HDRI");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : HDRI ON");
    // Intensity
    await page.$eval('.slidecontainer input[type="range"]', (slider) => {
      slider.value = "0";
      slider.dispatchEvent(new Event("input"));
    });
    await page.waitForTimeout(2000);

    await page.$eval('.slidecontainer input[type="range"]', (slider) => {
      slider.value = "1";
      slider.dispatchEvent(new Event("input"));
    });
    await page.waitForTimeout(2000);

    await page.$eval('.slidecontainer input[type="range"]', (slider) => {
      slider.value = "2";
      slider.dispatchEvent(new Event("input"));
    });
    await page.waitForTimeout(2000);

    await page.click("#HDRI");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : HDRI OFF");

    await page.click("#Emissive");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : Emissive OFF");

    await page.click("#Emissive");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : Emissive ON");

    await page.click("#Shadows_NightLight1");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : NightLight's Shadow Turned ON");

    await page.click("#Shadows_NightLight1");
    await page.waitForTimeout(12000);
    console.log("Pass✅ : NightLight's Shadow Turned OFF");

    await page.click("#Shadows_Initial");
    await page.waitForTimeout(3000);
    console.log("Pass✅ : Shadow initial OFF");

    await page.click("#Shadows_Initial");
    await page.waitForTimeout(3000);
    console.log("Pass✅ : Shadow initial ON");

    await page.click("#ReflectionsMirror_C");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : Mirror Reflection ON");

    await page.click("#ReflectionsMirror_C");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : Mirror Reflection OFF");

    await page.click("#ReflectionsFloor_C");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : Floor Reflection ON");

    await page.click("#ReflectionsFloor_C");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : Floor Reflection OFF");

    await page.click("#SSAO_C");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : SSAO ON");

    await page.click("#SSAO_C");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : SSAO OFF");

    await page.click("#SAO_C");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : SAO ON");

    await page.click("#SAO_C");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : SAO OFF");

    await page.click("#FXAA_C");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : FXAA ON");

    await page.click("#FXAA_C");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : FXAA OFF");

    await page.click("#SSAA_C");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : SSAA ON");

    await page.click("#SSAA_C");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : SSAA OFF");

    await page.click("#SMAA_C");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : SMAA OFF");

    await page.click("#SMAA_C");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : SMAA ON");

    await page.click("#Stats");
    await page.waitForTimeout(1000);
    console.log("Pass✅ : Stats ON");

    await page.click("#Stats");
    await page.waitForTimeout(1000);
    console.log("Pass✅ : Stats OFF");

    await page.click("#gui_ui");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : GUI ON");

    await page.click("#gui_ui");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : GUI OFF");

    await page.click("#ssr_ui");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : SSR ON");

    await page.click("#ssr_ui");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : SSR OFF");

    await page.click("#bloomPass");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : Bloom OFF");

    await page.click("#bloomPass");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : Bloom ON");

    await page.click("#Prompt_ui");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : Prompt OFF");

    await page.click("#Prompt_ui");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : Prompt ON");

    var eleCheckbox = await page.waitForXPath("//input[@id='pitchDark']");
    await eleCheckbox.click({ clickCount: 1 });
    await page.waitForTimeout(7000);
    console.log("Pass✅ : Pitch Dark selected");

    await page.click("#v-pills-Doors-tab");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : Doors/Windows Button Selected");

    // Blinds
    await page.click("#flush-headingFour");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : Viewpoint's Button Selected");

    await page.click("#Blinds_View");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : Chair's Viewpoint Selected");

    await page.click("#Blinds_Horizontal");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : Horizontal Blind Selected");

    await page.click("#flush-headingSeven");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : Blind's Material UI Selected");

    // Horizontal Blind's 2nd Material
    // Wait for the image to be present in the DOM
    await page.waitForSelector(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Blinds_03_v01_draco/Blind_102.webp"]'
    );

    // Wait for the image to load completely (assuming it's lazy-loaded)
    await page.waitForFunction(
      () =>
        document.querySelector(
          'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Blinds_03_v01_draco/Blind_102.webp"]'
        ).complete
    );

    // Click the image
    await page.click(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Blinds_03_v01_draco/Blind_102.webp"]'
    );
    await page.waitForTimeout(1100);

    // Horizontal Blind's 3rd Material
    // Wait for the image to be present in the DOM
    await page.waitForSelector(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Blinds_03_v01_draco/Blind_103.webp"]'
    );

    // Wait for the image to load completely (assuming it's lazy-loaded)
    await page.waitForFunction(
      () =>
        document.querySelector(
          'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Blinds_03_v01_draco/Blind_103.webp"]'
        ).complete
    );

    // Click the image
    await page.click(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Blinds_03_v01_draco/Blind_103.webp"]'
    );
    await page.waitForTimeout(1100);

    // Horizontal Blind's 1st Material
    // Wait for the image to be present in the DOM
    await page.waitForSelector(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Blinds_03_v01_draco/Blind_101.webp"]'
    );

    // Wait for the image to load completely (assuming it's lazy-loaded)
    await page.waitForFunction(
      () =>
        document.querySelector(
          'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Blinds_03_v01_draco/Blind_101.webp"]'
        ).complete
    );

    // Click the image
    await page.click(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Blinds_03_v01_draco/Blind_101.webp"]'
    );
    await page.waitForTimeout(1100);

    await page.click("#flush-headingSix");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : Blind's Dynamic UI Selected");

    await page.click("#Close0");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : Blind Closed");

    // await page.click("#Half");
    // await page.waitForTimeout(2000);
    // console.log("Pass✅ : Blind Half Opened");

    await page.click("#Open2");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : Blind Opened");

    // Vertical Blind
    await page.click("#Blinds_Vertical");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : Vertical Blind Selected");

    await page.click("#flush-headingSeven");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : Blind's Dynamic UI Selected");

    // Vertical Blind's 2nd Material
    // Wait for the image to be present in the DOM
    await page.waitForSelector(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Blinds_01_v01_draco/Blind_105.webp"]'
    );

    // Wait for the image to load completely (assuming it's lazy-loaded)
    await page.waitForFunction(
      () =>
        document.querySelector(
          'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Blinds_01_v01_draco/Blind_105.webp"]'
        ).complete
    );

    // Click the image
    await page.click(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Blinds_01_v01_draco/Blind_105.webp"]'
    );
    await page.waitForTimeout(1100);

    // Vertical Blind's 3rd Material
    // Wait for the image to be present in the DOM
    await page.waitForSelector(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Blinds_01_v01_draco/Blind_106.webp"]'
    );

    // Wait for the image to load completely (assuming it's lazy-loaded)
    await page.waitForFunction(
      () =>
        document.querySelector(
          'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Blinds_01_v01_draco/Blind_106.webp"]'
        ).complete
    );

    // Click the image
    await page.click(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Blinds_01_v01_draco/Blind_106.webp"]'
    );
    await page.waitForTimeout(1100);

    // Vertical Blind's 1st Material
    // Wait for the image to be present in the DOM
    await page.waitForSelector(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Blinds_01_v01_draco/Blind_104.webp"]'
    );

    // Wait for the image to load completely (assuming it's lazy-loaded)
    await page.waitForFunction(
      () =>
        document.querySelector(
          'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Blinds_01_v01_draco/Blind_104.webp"]'
        ).complete
    );

    // Click the image
    await page.click(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Blinds_01_v01_draco/Blind_104.webp"]'
    );
    await page.waitForTimeout(1100);

    await page.click("#flush-headingSix");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : Blind's Dynamic UI Selected");

    await page.click("#Close1");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : Blind Closed");

    // await page.click("#Half Open2");
    // await page.waitForTimeout(2000);
    // console.log("Pass✅ : Blind Half Opened");

    await page.click("#Open0");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : Blind Opened");

    // RollUp Blind
    await page.click("#Blinds_RollUp");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : RollUp Blind Selected");

    await page.click("#flush-headingSeven");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : Blind's Dynamic UI Selected");

    // Rollup Blind's 2nd Material
    // Wait for the image to be present in the DOM
    await page.waitForSelector(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Blinds_02_v01_draco/Blind_108.webp"]'
    );

    // Wait for the image to load completely (assuming it's lazy-loaded)
    await page.waitForFunction(
      () =>
        document.querySelector(
          'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Blinds_02_v01_draco/Blind_108.webp"]'
        ).complete
    );

    // Click the image
    await page.click(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Blinds_02_v01_draco/Blind_108.webp"]'
    );
    await page.waitForTimeout(1100);

    // Rollup Blind's 3rd Material
    // Wait for the image to be present in the DOM
    await page.waitForSelector(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Blinds_02_v01_draco/Blind_109.webp"]'
    );

    // Wait for the image to load completely (assuming it's lazy-loaded)
    await page.waitForFunction(
      () =>
        document.querySelector(
          'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Blinds_02_v01_draco/Blind_109.webp"]'
        ).complete
    );

    // Click the image
    await page.click(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Blinds_02_v01_draco/Blind_109.webp"]'
    );
    await page.waitForTimeout(1100);

    // Rollup Blind's 1st Material
    // Wait for the image to be present in the DOM
    await page.waitForSelector(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Blinds_02_v01_draco/Blind_107.webp"]'
    );

    // Wait for the image to load completely (assuming it's lazy-loaded)
    await page.waitForFunction(
      () =>
        document.querySelector(
          'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Blinds_02_v01_draco/Blind_107.webp"]'
        ).complete
    );

    // Click the image
    await page.click(
      'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Blinds_02_v01_draco/Blind_107.webp"]'
    );
    await page.waitForTimeout(1100);

    await page.click("#flush-headingSix");
    await page.waitForTimeout(2000);
    console.log("Pass✅ : Blind's Dynamic UI Selected");

    // await page.click("#Roll Down1");
    // await page.waitForTimeout(2000);
    // console.log("Pass✅ : Blind Closed");

    // await page.click("#Half Open0");
    // await page.waitForTimeout(2000);
    // console.log("Pass✅ : Blind Half Opened");

    // await page.click("#Roll Up2");
    // await page.waitForTimeout(2000);
    // console.log("Pass✅ : Blind Opened");

    const initialAdvancedScreenshot = await captureScreenshot(
      page,
      "pixelmatch/advanced/Advanced-Actual.png"
    );
    await page.waitForTimeout(1100);
    console.log("Pass✅ : Advanced ss captured");

    // Close the browser
    await browser.close();

    // Load expected images for each category
    const categoryData = [
      {
        name: "furniture",
        expectedImagePath: "Furniture-Expected.png",
        initialScreenshot: initialFurnitureScreenshot,
      },
      {
        name: "lighting",
        expectedImagePath: "Lighting-Expected.png",
        initialScreenshot: initialLightingScreenshot,
      },
      {
        name: "accessories",
        expectedImagePath: "Accessories-Expected.png",
        initialScreenshot: initialAccessoriesScreenshot,
      },
      {
        name: "loungeChair",
        expectedImagePath: "LoungeChair-Expected.png",
        initialScreenshot: initialLoungeChairScreenshot,
      },
      {
        name: "bookShelf",
        expectedImagePath: "BookShelf-Expected.png",
        initialScreenshot: initialbookShelfScreenshot,
      },
      {
        name: "daylight",
        expectedImagePath: "Daylight-Expected.png",
        initialScreenshot: initialdaylightScreenshot,
      },
      {
        name: "theme",
        expectedImagePath: "Theme-Expected.png",
        initialScreenshot: initialthemeScreenshot,
      },
      {
        name: "chair",
        expectedImagePath: "Chair-Expected.png",
        initialScreenshot: initialchairScreenshot,
      },
      {
        name: "table",
        expectedImagePath: "Table-Expected.png",
        initialScreenshot: initialtableScreenshot,
      },
      {
        name: "advanced",
        expectedImagePath: "Advanced-Expected.png",
        initialScreenshot: initialAdvancedScreenshot,
      },

      // Add more categories as needed
    ];

    for (const category of categoryData) {
      const expectedImagePath = path.join(
        "pixelmatch",
        getCategoryDirectory(category.name),
        category.expectedImagePath
      );
      const expectedImage = PNG.sync.read(fs.readFileSync(expectedImagePath));
      const diffImage = new PNG({
        width: category.initialScreenshot.width,
        height: category.initialScreenshot.height,
      });
      const numDiffPixels = pixelmatch(
        expectedImage.data,
        category.initialScreenshot.data,
        diffImage.data,
        category.initialScreenshot.width,
        category.initialScreenshot.height,
        { threshold: 0.1 }
      );
      diffImages.push({ name: category.name, diff: diffImage });

      const totalPixels = expectedImage.width * expectedImage.height;
      const diffPercentage = (numDiffPixels / totalPixels) * 100;
      console.log(
        `${category.name} Difference Percentage: ${diffPercentage.toFixed(2)}%`
      );
      outputStream.write(
        `${category.name} Difference Percentage: ${diffPercentage.toFixed(
          2
        )}%\n`
      );

      const diffImagePath = path.join(
        "pixelmatch",
        getCategoryDirectory(category.name),
        `desktop-${category.name}-diff.png`
      );
      fs.writeFileSync(diffImagePath, PNG.sync.write(diffImage));
    }
  } catch (err) {
    console.log("Fail🚫 :", err.message);
    outputStream.write(`Fail🚫 : ${err.message}\n`);
  } finally {
    await browser.close();
    outputStream.end(); // Close the output stream
  }
})();
