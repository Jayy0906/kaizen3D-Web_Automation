const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false }); // ({` headless: "new" `})
  const page = await browser.newPage();

  try {
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto("https://viscommerce.com/showroom3d_web/", {
      timeout: 25000,
    });
    console.log("Pass✅ : Website loaded");

    await initializePage(page);

    // sample Room
    await handleElement(
      page,
      "#home_card_close_Desktop",
      "welcome screen Closed",
      2000
    );
    await handleElement(
      page,
      "#load_Furniture_Desktop",
      "Furniture Loaded",
      6000
    );
    await handleElement(
      page,
      "#load_Lighting_Desktop",
      "Lighting Loaded",
      6000
    );
    await handleElement(
      page,
      "#load_Accessories_Desktop",
      "Accessories Loaded",
      12000
    );

    //     // // Day / Night Toggle
    await handleElement(page, ".LightModesImage1", "Day Light ON", 2200);
    await handleElement(page, "#nightLight_Desktop", "Night Light ON", 2000);

    // Themes
    await handleElement(
      page,
      "#flush-headingThree",
      "Theme's UI Selected",
      1500
    );
    await handleElement(page, "#Room_101", "Theme 1 Selected", 1200);
    await handleElement(page, "#Room_102", "Theme 2 Selected", 1200);
    await handleElement(page, "#Room_103", "Theme 3 Selected", 1200);
    await handleElement(page, "#Room_104", "Theme 4 Selected", 1200);
    await handleElement(page, "#Room_105", "Theme 5 Selected", 1200);
    await handleElement(page, "#Room_106", "Theme 6 Selected", 1200);

    // Chair
    await handleElement(
      page,
      "#v-pills-Furniture-tab",
      "Clicked on Furniture Button",
      3000
    );

    await handleCheckboxSelection(
      page,
      "//input[@id='Bucket Seat']",
      "Selected Bucket Seat Chair",
      1500
    );

    await handleElement(
      page,
      "#flush-headingFour",
      "Viewpoint's Button Selected",
      1000
    );

    const valueToClick = "5";
    await page.click(`input[type="radio"][value="${valueToClick}"]`);
    await page.waitForTimeout(5000);

    // Click at specific coordinates (x, y)
    const x = 753; // replace with your desired x-coordinate
    const y = 758; // replace with your desired y-coordinate

    await page.mouse.click(x, y);
    await page.waitForTimeout(2000); // Wait for 2 seconds after clicking
    console.log('Pass✅ : Clicked at coordinates', x, y);

    await handleElement(
      page,
      "#flush-headingSeven",
      "Chair's Material UI Selected",
      1000
    );

    // chair 2
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

    //chair3
    // // Wait for the image to be present in the DOM
    // await page.waitForSelector(
    //   'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Chair_01_v01/Chair_103.webp"]'
    // );

    // // Wait for the image to load completely (assuming it's lazy-loaded)
    // await page.waitForFunction(
    //   () =>
    //     document.querySelector(
    //       'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Chair_01_v01/Chair_103.webp"]'
    //     ).complete
    // );

    // // Click the image
    // await page.click(
    //   'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Chair_01_v01/Chair_103.webp"]'
    // );

    //chair1
    // // Wait for the image to be present in the DOM
    // await page.waitForSelector(
    //   'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Chair_01_v01/Chair_101.webp"]'
    // );

    // // Wait for the image to load completely (assuming it's lazy-loaded)
    // await page.waitForFunction(
    //   () =>
    //     document.querySelector(
    //       'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Chair_01_v01/Chair_101.webp"]'
    //     ).complete
    // );

    // // Click the image
    // await page.click(
    //   'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Chair_01_v01/Chair_101.webp"]'
    // );

    // await page.click('label[for="MahoganyDarkWood_BrownLeather"]', {
    //   delay: 2000,
    // });
    // await page.click('label[for="ConiferWood_OrangeLeather"]', { delay: 2000 });
    // await page.click('label[for="MahoganyDarkWood_BrownLeather"]', {
    //   delay: 2000,
    // });

    // await handleElement(page, "#flush-headingSix", "Chair's UI Selected", 1000);
    // await handleElement(page, "#Height0", "height", 2000);
    // await handleElement(page, "#Rotate1", "rotate", 2000);
    // await handleElement(page, "#Back Rest2", "backrest", 2000);
    // const valueToClick1 = "0";
    // await page.click(`input[type="radio"][value="${valueToClick1}"]`);
    // await page.waitForTimeout(5000);

    // await handleElement(page, "#v-pills-spin-tab", "360 spin", 6000);
    // await handleElement(page, ".close", "close 360 spin tab", 1000);

    // Table
    await handleElement(page, "#Table-tab", "Table's Button Selected", 1000);
    await handleCheckboxSelection(
      page,
      "//input[@id='Manual']",
      "Manual Table Selected",
      3000
    );
    await handleElement(
      page,
      "#flush-headingFour",
      "Viewpoint's Button Selected",
      1000
    );

    // const valueToClick2 = '3';
    // await page.click(`input[type="radio"][value="${valueToClick2}"]`);
    // await page.waitForTimeout(5000);

    // const valueToClick2 = '3';
    // const selector = `input[type="radio"][value="${valueToClick2}"]`;
    // await page.waitForSelector(selector, { visible: true });
    // await page.waitForTimeout(5000);
    // await page.click(selector);

    await handleElement(
      page,
      "#flush-headingSeven",
      "Table's Material UI Selected",
      1000
    );

    //table1
    // Wait for the image to be present in the DOM
  //   await page.waitForSelector(
  //     'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Table_Automatic_01_v01/Table_102.webp'
  //   );

  //   // Wait for the image to load completely (assuming it's lazy-loaded)
  //   await page.waitForFunction(
  //     () =>
  //       document.querySelector(
  //         "https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Table_Automatic_01_v01/Table_102.webp"
  //       ).complete
  //   );

  //   // Click the image
  //   await page.click(
  //     "https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Table_Automatic_01_v01/Table_102.webp"
  //   );

  //   //table2
  //   // Wait for the image to be present in the DOM
  //   await page.waitForSelector(
  //     'img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Table_Automatic_01_v01/Table_103.webp'
  //   );

  //   // Wait for the image to load completely (assuming it's lazy-loaded)
  //   await page.waitForFunction(
  //     () =>
  //       document.querySelector(
  //         "https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Table_Automatic_01_v01/Table_103.webp"
  //       ).complete
  //   );

  //   // Click the image
  //   await page.click(
  //     "https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Table_Automatic_01_v01/Table_103.webp"
  //   );

  //   //table3
  //   // Wait for the image to be present in the DOM
  // await page.waitForSelector('img[src="https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Table_Automatic_01_v01/Table_101.webp');

  // // Wait for the image to load completely (assuming it's lazy-loaded)
  // await page.waitForFunction(() => document.querySelector('https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Table_Automatic_01_v01/Table_101.webp').complete);

  // // Click the image
  // await page.click('https://d3t7cnf9sa42u5.cloudfront.net/variantsThumbnails/Table_Automatic_01_v01/Table_101.webp');

    // await page.click('label[for="Walnut_Wood"]', { delay: 2000 });
    // await page.click('label[for="Pine_Wood"]', { delay: 2000 });
    // await page.click('label[for="Red_Pearwood"]', { delay: 2000 });
    await handleElement(
      page,
      "#flush-headingSix",
      "Table's Dynamics UI Selected",
      1000
    );
    await handleCheckboxSelection(
      page,
      "//input[@id='Level_11']",
      "Table's Height Increased to Level 1",
      3000
    );
    await handleCheckboxSelection(
      page,
      "//input[@id='Level_22']",
      "Table's Height Increased to Level 2",
      3000
    );
    await handleCheckboxSelection(
      page,
      "//input[@id='Level_00']",
      "Table's Height Increased to Level 0",
      3000
    );

    //     const valueToClick3 = '0';
    // await page.click(`input[type="radio"][value="${valueToClick3}"]`);
    // await page.waitForTimeout(5000);

    // Form Fill - HD Render
    // await page.click("#v-pills-Render-tab");
    // await page.waitForTimeout(1000);
    //   console.log("Pass✅ : HD Render Button Selected");

    //   await page.click("#exampleInputEmail1");
    // await page.waitForTimeout(1000);
    //   console.log("Pass✅ : Clicked on Email ID");

    //   await page.type("[name='email']", "jatpay12@gmail.com", {delay: 100});

    //   await page.click("#Image_4K");
    // await page.waitForTimeout(1000);
    //   console.log("Pass✅ : 4K Image selected");

    //   await page.click("#Export_Image");
    // await page.waitForTimeout(8000);
    //   console.log("Pass✅ : Export HD image");

    // Lighting
    await handleElement(
      page,
      "#v-pills-Lighting-tab",
      "Lighting's Button Selected",
      1000
    );
    // var eleCheckbox = await page.waitForXPath("//input[@id='Floor1']");
    // await eleCheckbox.click({ clickCount: 1 });
    // await page.waitForTimeout(10000);
    // console.log("Pass✅ : Floor Light selected");

    // var eleCheckbox = await page.waitForXPath("//input[@id='Wall']");
    // await eleCheckbox.click({ clickCount: 1 });
    // await page.waitForTimeout(10000);
    // console.log("Pass✅ : Wall Light selected");

    await handleElement(
      page,
      "#v-pills-Advanced-tab",
      "Advanced Button Selected",
      1000
    );
    var eleCheckbox = await page.waitForXPath("//input[@id='pitchDark']");
    await eleCheckbox.click({ clickCount: 1 });
    await page.waitForTimeout(2000);
    console.log("Pass✅ : Pitch Dark selected");

    // var eleCheckbox = await page.waitForXPath("//input[@id='ceilingLight']");
    // await eleCheckbox.click({ clickCount: 1 });
    // await page.waitForTimeout(2000);
    // console.log("Pass✅ : Ceiling Light selected");

    // Intensity
    // await page.$eval(
    //   'input[type="range"][data-type="ceilingLight"]',
    //   (slider) => {
    //     slider.value = "1";
    //     slider.dispatchEvent(new Event("input"));
    //   }
    // );
    // await page.waitForTimeout(2000);

    // await page.$eval(
    //   'input[type="range"][data-type="ceilingLight"]',
    //   (slider) => {
    //     slider.value = "5";
    //     slider.dispatchEvent(new Event("input"));
    //   }
    // );
    // await page.waitForTimeout(2000);

    // await page.$eval(
    //   'input[type="range"][data-type="ceilingLight"]',
    //   (slider) => {
    //     slider.value = "10";
    //     slider.dispatchEvent(new Event("input"));
    //   }
    // );
    // await page.waitForTimeout(2000);

    // var eleCheckbox = await page.waitForXPath("//input[@id='desktopLight']");
    // await eleCheckbox.click({ clickCount: 1 });
    // await page.waitForTimeout(2000);
    // console.log("Pass✅ : Desktop Light selected");

    // Intensity
    // await page.$eval(
    //   'input[type="range"][data-type="desktopLight"]',
    //   (slider) => {
    //     slider.value = "1";
    //     slider.dispatchEvent(new Event("input"));
    //   }
    // );
    // await page.waitForTimeout(2000);

    // await page.$eval(
    //   'input[type="range"][data-type="desktopLight"]',
    //   (slider) => {
    //     slider.value = "5";
    //     slider.dispatchEvent(new Event("input"));
    //   }
    // );
    // await page.waitForTimeout(2000);

    // await page.$eval(
    //   'input[type="range"][data-type="desktopLight"]',
    //   (slider) => {
    //     slider.value = "10";
    //     slider.dispatchEvent(new Event("input"));
    //   }
    // );
    // await page.waitForTimeout(2000);

    // var eleCheckbox = await page.waitForXPath("//input[@id='wallWasherLight']");
    // await eleCheckbox.click({ clickCount: 1 });
    // await page.waitForTimeout(2000);
    // console.log("Pass✅ : Wall Washer Light selected");

    // Intensity
    // await page.$eval(
    //   'input[type="range"][data-type="wallWasherLight"]',
    //   (slider) => {
    //     slider.value = "1";
    //     slider.dispatchEvent(new Event("input"));
    //   }
    // );
    // await page.waitForTimeout(2000);

    // await page.$eval(
    //   'input[type="range"][data-type="wallWasherLight"]',
    //   (slider) => {
    //     slider.value = "5";
    //     slider.dispatchEvent(new Event("input"));
    //   }
    // );
    // await page.waitForTimeout(2000);

    // await page.$eval(
    //   'input[type="range"][data-type="wallWasherLight"]',
    //   (slider) => {
    //     slider.value = "10";
    //     slider.dispatchEvent(new Event("input"));
    //   }
    // );
    // await page.waitForTimeout(2000);

    // var eleCheckbox = await page.waitForXPath("//input[@id='sunLight']");
    // await eleCheckbox.click({ clickCount: 1 });
    // await page.waitForTimeout(2000);
    // console.log("Pass✅ : Sun Light selected");

    // Intensity
    // await page.$eval('input[type="range"][data-type="sunLight"]', (slider) => {
    //   slider.value = "1";
    //   slider.dispatchEvent(new Event("input"));
    // });
    // await page.waitForTimeout(2000);

    // await page.$eval('input[type="range"][data-type="sunLight"]', (slider) => {
    //   slider.value = "5";
    //   slider.dispatchEvent(new Event("input"));
    // });
    // await page.waitForTimeout(2000);

    // await page.$eval('input[type="range"][data-type="sunLight"]', (slider) => {
    //   slider.value = "10";
    //   slider.dispatchEvent(new Event("input"));
    // });
    // await page.waitForTimeout(2000);

    // ambientLight
    // var eleCheckbox = await page.waitForXPath("//input[@id='ambientLight']");
    // await eleCheckbox.click({ clickCount: 1 });
    // await page.waitForTimeout(2000);
    // console.log("Pass✅ : Ambient Light selected");

    // Intensity
    // await page.$eval(
    //   'input[type="range"][data-type="ambientLight"]',
    //   (slider) => {
    //     slider.value = "1";
    //     slider.dispatchEvent(new Event("input"));
    //   }
    // );
    // await page.waitForTimeout(2000);

    // await page.$eval(
    //   'input[type="range"][data-type="ambientLight"]',
    //   (slider) => {
    //     slider.value = "5";
    //     slider.dispatchEvent(new Event("input"));
    //   }
    // );
    // await page.waitForTimeout(2000);

    // await page.$eval(
    //   'input[type="range"][data-type="ambientLight"]',
    //   (slider) => {
    //     slider.value = "10";
    //     slider.dispatchEvent(new Event("input"));
    //   }
    // );
    // await page.waitForTimeout(2000);

    // var eleCheckbox = await page.waitForXPath("//input[@id='ceilingLight']");
    // await eleCheckbox.click({ clickCount: 1 });
    // await page.waitForTimeout(2000);
    // console.log("Pass✅ : Ceiling Light selected");

    // var eleCheckbox = await page.waitForXPath("//input[@id='floor_lamp']");
    // await eleCheckbox.click({ clickCount: 1 });
    // await page.waitForTimeout(10000);
    // console.log("Pass✅ : Floor Light ON");

    // Intensity
    // await page.$eval('input[type="range"].slider_class', (slider) => {
    //   slider.value = "0";
    //   slider.dispatchEvent(new Event("input"));
    // });
    // await page.waitForTimeout(2000);

    // await page.$eval('input[type="range"].slider_class', (slider) => {
    //   slider.value = "1";
    //   slider.dispatchEvent(new Event("input"));
    // });
    // await page.waitForTimeout(2000);

    // await page.$eval('input[type="range"].slider_class', (slider) => {
    //   slider.value = "2";
    //   slider.dispatchEvent(new Event("input"));
    // });
    // await page.waitForTimeout(2000);

    // var eleCheckbox = await page.waitForXPath("//input[@id='floor_lamp']");
    // await eleCheckbox.click({ clickCount: 1 });
    // await page.waitForTimeout(1000);
    // console.log("Pass✅ : Floor Light OFF");

    // var eleCheckbox = await page.waitForXPath("//input[@id='wall_lamp']");
    // await eleCheckbox.click({ clickCount: 1 });
    // await page.waitForTimeout(10000);
    // console.log("Pass✅ : Wall Light ON");

    // Intensity
    // const initialValue = '2';

    //   await page.evaluate((value) => {
    //     const slider = document.querySelector('.slidecontainer1 input[type="range"]');
    //     slider.value = value;
    //     slider.dispatchEvent(new Event('input'));
    //   }, initialValue);
    //   await page.waitForTimeout(2000);

    // const initialValue1 = '2';

    // await page.evaluate((value) => {
    //   const slider = document.querySelector('.slidecontainer1 input[type="range"]');
    //   slider.value = value;
    //   slider.dispatchEvent(new Event('input'));
    // }, initialValue1);
    //   await page.waitForTimeout(2000);

    //   const initialValue2 = '2';

    // await page.evaluate((value) => {
    //   const slider = document.querySelector('.slidecontainer1 input[type="range"]');
    //   slider.value = value;
    //   slider.dispatchEvent(new Event('input'));
    // }, initialValue2);
    //     await page.waitForTimeout(2000);

    // var eleCheckbox = await page.waitForXPath("//input[@id='wall_lamp']");
    // await eleCheckbox.click({ clickCount: 1 });
    // await page.waitForTimeout(1000);
    // console.log("Pass✅ : Wall Light OFF");

    await handleElement(page, "#Stats", "Stats ON", 1000);

    await handleElement(page, "#HDRI", "HDRI ON", 2000);
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
    await handleElement(page, "#HDRI", "HDRI OFF", 2000);

    await handleElement(page, "#Emissive", "Emissive OFF", 2000);
    await handleElement(page, "#Emissive", "Emissive ON", 2000);
    await handleElement(
      page,
      "#Shadows_NightLight1",
      "NightLight's Shadow Turned ON",
      13000
    );
    await handleElement(
      page,
      "#Shadows_NightLight1",
      "NightLight's Shadow Turned OFF",
      1000
    );
    await handleElement(page, "#Shadows_Initial", "Shadow initial OFF", 3000);
    await handleElement(page, "#Shadows_Initial", "Shadow initial ON", 3000);

    // Day / Night Toggle
    await handleElement(page, ".LightModesImage1", "Day Light ON", 3000);

    // Window
    await handleElement(
      page,
      "#v-pills-Doors-tab",
      "Doors/Windows Button Selected",
      1000
    );
    // await handleCheckboxSelection(
    //   page,
    //   "//input[@id='Horizontal']",
    //   "Horizontal Blind Selected",
    //   3000
    // );
    await handleElement(
      page,
      "#flush-headingFour",
      "Viewpoint's Button Selected",
      1000
    );
    await handleElement(
      page,
      "#flush-headingSeven",
      "Material UI Selected",
      1000
    );
    // await page.click('label[for="Wooden Texture Blinds"]', { delay: 2000 });
    // await page.click('label[for="Grey Blinds"]', { delay: 2000 });
    // await page.click('label[for="Translucent Blinds"]', { delay: 2000 });
    await handleElement(
      page,
      "#flush-headingSix",
      "Dynamic's UI Selected",
      1000
    );
    // await handleCheckboxSelection(
    //   page,
    //   "//input[@id='Close2']",
    //   "Open Window",
    //   3000
    // );
    // await handleCheckboxSelection(
    //   page,
    //   "//input[@id='Close1']",
    //   "Half Open Window",
    //   3000
    // );
    // await handleCheckboxSelection(
    //   page,
    //   "//input[@id='Close0']",
    //   "Close Window",
    //   3000
    // );
  } catch (err) {
    console.log("Fail🚫 :", err.message);
  } finally {
    await browser.close();
  }
})();

async function initializePage(page) {
  await page.setViewport({ width: 1920, height: 1080 });
  await page.waitForSelector("#scene-container");
  await page.waitForTimeout(1000);
}

async function handleElement(page, selector, successMessage, timeout) {
  try {
    await page.waitForSelector(selector);
    await page.click(selector);
    await page.waitForTimeout(timeout);
    console.log("Pass✅ :", successMessage);
  } catch (err) {
    throw new Error("Fail🚫 : " + err.message);
  }
}

async function handleCheckboxSelection(
  page,
  xpathSelector,
  successMessage,
  timeout
) {
  try {
    const eleCheckbox = await page.waitForXPath(xpathSelector);
    await eleCheckbox.click({ clickCount: 1 });
    await page.waitForTimeout(timeout);
    console.log("Pass✅ :", successMessage);
  } catch (err) {
    throw new Error("Fail🚫 : " + err.message);
  }
}
