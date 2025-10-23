import { Page, expect, Locator } from "@playwright/test";
import { SrvRecord } from "dns";
import path from "path";
import fs from "fs";
import { UploadHelper } from "../../../helpers/uploadFile";
export default class Playground {
  // Page reference
  readonly page: Page;
  private uploadHelper: UploadHelper;
  // Locators for Dynamic Table
  readonly mainHead: Locator;
  readonly dynamicTableLink: Locator;
  readonly spidermanName: Locator;
  readonly spideRealName: Locator;
  // Locators for Verify Account
  readonly verifyAccLink: Locator;
  readonly verifyHead: Locator;
  readonly successMsg: Locator;
  // Locators for Tags Input Box
  readonly tagsInput: Locator;
  readonly tagsHead: Locator;
  readonly inp: Locator;
  readonly countP: Locator;
  readonly remov: (word: string) => Locator;
  // Locators for New Tab
  readonly newTab: Locator;
  readonly openTabB: Locator;
  readonly newTabHead: Locator;
  // Locators for Pop-up
  readonly popUpTab: Locator;
  readonly popUp: Locator;
  readonly popedUpB: Locator;
  readonly popMesage: Locator;
  // Locators for Nested Iframe
  readonly iframeLink: Locator;
  readonly iframeClickB: Locator;
  readonly iframeVal: Locator;
  // Locators for Navigation Menu
  readonly navigationMenuLink: Locator;
  readonly homeLink: Locator;
  readonly aboutLink: Locator;
  readonly blogLink: Locator;
  readonly portfolio: Locator;
  readonly contact: Locator;
  readonly validationHead: Locator;
  readonly goBack: Locator;
  // Locators for Covered Elements
  readonly goToCoveredEle: Locator;
  readonly coveredHeadVal: Locator;
  readonly coveredButton: Locator;
  // Locators for Hover Image
  readonly hoverImageLink: Locator;
  readonly hoverImage: Locator;
  readonly hoverPrice: Locator;
  // Locators for File Upload
  readonly fileUploadLink: Locator;
  readonly fileUpld: Locator;
  readonly fileUpldVal: Locator;
  // Locators for Budget Tracker
  readonly budgetTrackerLink: Locator;
  readonly newEntryButton: Locator;
  readonly rowForEntry: (id: string) => Locator;
  // Locators for Right-Click Context Menu
  readonly rightClickContentLink: Locator;
  readonly contextContent: (menu: string) => Locator;
  readonly contextVal: Locator;
  // Locators for Shadow DOM
  readonly shadowDomLink: Locator;
  readonly progressBar: Locator;
  // Locators for Slider
  readonly ratingSlider: Locator;
  readonly sliderVal: Locator;
  // Locator for Download File
  readonly downloadFileLink: Locator;
  private readonly sliderInput: Locator;
  private readonly sendFeedbackButton: Locator;
  readonly feedBack: Locator;
  readonly fileButton: Locator;
  readonly modalHeading: Locator;
  readonly closeIcon: Locator;
  readonly welcomeMessage: Locator;
  readonly fetchData: Locator;
  readonly cardLocator: Locator;
  readonly redirectHeader: Locator;
  readonly redirectLink: Locator;
  readonly messageLocators: Locator[];
  readonly goBackButton: Locator;
  constructor(page: Page) {
    this.page = page;
    this.uploadHelper = new UploadHelper(page);

    // Dynamic Table locators
    this.mainHead = page.locator('//span[text()="QA Playground"]');
    this.dynamicTableLink = page.locator('//h3[text()="Dynamic Table"]');
    this.spidermanName = page.locator('//div[text()="Spider-Man"]');
    this.spideRealName = page.locator(
      '//div[text()="Spider-Man"]/ancestor::tr//span[contains(@class,"text-white-900")]'
    );

    // Verify Account locators
    this.verifyAccLink = page.locator('//h3[text()="Verify Your Account"]');
    this.verifyHead = page.locator('//h2[text()="Verify Your Account"]');
    this.successMsg = page.locator('//small[text()="Success"]');

    // Tags Input Box locators
    this.tagsInput = page.locator('//h3[text()="Tags Input Box"]');
    this.tagsHead = page.locator('//h2[text()="Tags"]');
    this.inp = page.locator("//input");
    this.countP = page.locator("//p/span");
    this.remov = (word: string) =>
      page.locator(`//li[normalize-space(text())='${word}']/i`);

    // New Tab locators
    this.newTab = page.locator('//h3[text()="New Tab"]');
    this.openTabB = page.locator('//a[text()="Open New Tab"]');
    this.newTabHead = page.locator('//h1[text()="Welcome to the new page!"]');

    // Pop-Up locators
    this.popUpTab = page.locator('//h3[text()="Pop-Up Window"]');
    this.popUp = page.locator('//a[text()="Open"]');
    this.popedUpB = page.locator('//button[text()="Submit"]');
    this.popMesage = page.locator('//p[@id="info"]');

    // Nested Iframe locators
    this.iframeLink = page.locator('//h3[text()="Nested Iframe"]');
    this.iframeClickB = page.locator('//a[text()="Click Me"]');
    this.iframeVal = page
      .frameLocator("#frame1")
      .frameLocator("#frame2")
      .locator("#msg");

    // Navigation Menu locators
    this.navigationMenuLink = page.locator('//h3[text()="Navigation Menu"]');
    this.homeLink = page.locator('//a[text()="Home"]');
    this.aboutLink = page.locator('//a[text()="About"]');
    this.blogLink = page.locator('//a[text()="Blog"]');
    this.portfolio = page.locator('//a[text()="Portfolio"]');
    this.contact = page.locator('//a[text()="Contact"]');
    this.validationHead = page.locator('//h1[@id="title"]');
    this.goBack = page.locator('//a[text()="Go Back"]');

    // Covered Elements locators
    this.goToCoveredEle = page.locator('//h3[text()="Covered Elements"]');
    this.coveredHeadVal = page.locator('//div[@class="wrapper"]/p');
    this.coveredButton = page.locator('//div[@class="wrapper"]/a');

    // Hover Image locators
    this.hoverImageLink = page.locator('//h3[text()="Mouse Hover"]');
    this.hoverImage = page.locator('//img[@class="poster"]');
    this.hoverPrice = page.locator('//p[@class="current-price"]');

    // File Upload locators
    this.fileUploadLink = page.locator('//h3[text()="Upload File"]');
    this.fileUpld = page.locator('//i[@class="fas fa-upload"]');
    this.fileUpldVal = page.locator('//p[@id="num-of-files"]');

    // Budget Tracker locators
    this.budgetTrackerLink = page.locator('//h3[text()="Budget Tracker"]');
    this.newEntryButton = page.locator('//button[text()="New Entry"]');
    this.rowForEntry = (id: string) =>
      page.locator(`//table[@class="budget-tracker"]/tbody/tr[${id}]`);

    // Right-Click Context Menu locators
    this.rightClickContentLink = page.locator(
      '//h3[text()="Right-Click Context Menu"]'
    );
    this.contextContent = (menu: string) =>
      page.locator(`//span[text()="${menu}"]`);
    this.contextVal = page.locator('//p[@id="msg"]');

    // Shadow DOM locators
    this.shadowDomLink = page.locator('//h3[text()="Shadow DOM"]');
    this.progressBar = page.locator("progress-bar");

    // Slider locators
    this.ratingSlider = page.locator('//h3[text()="Rating Range Slider"]');
    this.sliderVal = page.locator('//p[@id="ty-msg"]');

    // Download File locator
    this.downloadFileLink = page.locator('//h3[text()="Download File"]');

    // Slider input and feedback button
    this.sendFeedbackButton = page.locator('//button[@id="feedback"]');
    this.sliderInput = page.locator('//input[@type="range"]');

    this.feedBack = page.locator("#feedback");
    this.fileButton = this.page.locator("//a[@id='file']");

    this.modalHeading = page.locator('//h3[text()="Onboarding Modal Popup"]');
    this.closeIcon = page.locator('//i[@class="fas fa-bars"]');
    this.welcomeMessage = page.locator("div.title", {
      hasText: "Welcome Peter Parker!",
    });
    this.fetchData = page.locator('//h3[text()="Fetching Data"]');
    this.cardLocator = page.locator(".icard");

    // Locator for the "Redirect Chain" header
    this.redirectHeader = page.locator('//h3[text()="Redirect Chain"]');

    // Locator for the redirect link
    this.redirectLink = page.locator('//a[@id="redirect"]');

    // Array of locators for messages displayed sequentially on each page
    this.messageLocators = [
      page.locator('//p[text()="Welcome to Second Page"]'),
      page.locator('//p[text()="Welcome to Third Page"]'),
      page.locator('//p[text()="Welcome to Fourth Page"]'),
      page.locator('//p[text()="Welcome to Fifth Page"]'),
      page.locator('//p[text()="Welcome to Sixth Page"]'),
      page.locator('//p[text()="Welcome to the Last Page"]'),
    ];

    // Locator for the "Go Back" button on the last page
    this.goBackButton = page.locator('//a[text()="Go Back"]');
  }

  /** Launch QA Playground website */
  async launchWebsite() {
    await this.page.goto("https://qaplayground.dev/#apps");
  }

  /** Navigate to Dynamic Table section */
  async moveToDynamicTable() {
    await this.dynamicTableLink.click();
  }

  /**
   * Verify superhero name is NOT expected (Negative test)
   * @param {string} expectedName - The name that should not match the actual superhero name.
   */
  async verifyIncorrectSuperheroName(expectedName: string) {
    const actualName = await this.spideRealName.textContent();
    expect(actualName?.trim(),"Super hero real name doesnot match").not.toBe(expectedName);
  }

  /** Verify superhero name is NOT empty */
  async verifySuperheroNameIsEmpty() {
    const actualName = await this.spideRealName.textContent();
    expect(actualName?.trim(),"Super hero name is empty").not.toBe("");
  }

  /**
   * Verify superhero name does NOT contain specific substring
   * @param {string} wrongPart - Substring that should not appear in the name.
   */
  async verifyPartialSuperheroName(wrongPart: string) {
    const actualName = await this.spideRealName.textContent();
    expect(actualName?.includes(wrongPart),"super hero name is not displayed").toBeFalsy();
  }

  /** Verify superhero name does NOT contain numbers */
  async verifySuperheroNameNoNumbers() {
    const actualName = await this.spideRealName.textContent();
    const regex = /\d/;
    expect(regex.test(actualName || ""),"Super hero name is number").toBeFalsy();
  }

  /** Navigate to Verify Account section */
  async moveToVerifyAcc() {
    await this.verifyAccLink.click();
  }

  /**
   * Enter code in Verify Account input fields
   * @param {string} number - The digit to enter in all verification fields.
   */
  async enterDataNine(number: string) {
    const codeFields = this.page.locator(".code");
    for (let index = 0; index < (await codeFields.count()); index++) {
      await codeFields.nth(index).fill(number);
      await expect(codeFields.nth(index),"Nine is not entered").toHaveValue(number);
    }
    await this.page.keyboard.press("Enter");
  }

  /** Navigate to Tags Input Box section */
  async moveToTags() {
    await this.tagsInput.click();
  }

  /** Enter multiple tags */
  async enterTags() {
    // Get the path to the JSON file
    const tagsFilePath = path.join(__dirname, "../DATA/tags.json");

    // Read and parse the JSON file
    const jsonData = JSON.parse(fs.readFileSync(tagsFilePath, "utf-8"));
    const newTags: string[] = jsonData.tags;

    // Fill and enter tags from JSON
    for (let index = 0; index < newTags.length; index++) {
      await this.inp.fill(newTags[index]);
      await this.inp.click();
      await this.page.keyboard.press("Enter");
    }
  }

  /**
   * Remove a specific tag
   * @param {string} word - The tag name to remove.
   */
  async removeTag(word: string) {
    await this.remov(word).click();
  }

  /** Navigate to New Tab section */
  async navToNewTab() {
    await this.newTab.click();
  }

  /** Open new tab */
  async clickOnNewTab() {
    await this.openTabB.click();
  }

  /** Navigate to Pop-Up section */
  async navGateToPop() {
    await this.popUpTab.click();
  }

  /** Open pop-up window */
  async getPopUp() {
    await this.popUp.click();
  }

  /** Submit pop-up */
  async popedUpSubmit() {
    const [popup] = await Promise.all([
      await this.page.waitForEvent("popup"),
      await this.page.locator("#login").click(),
    ]);
    await popup.locator("button").click();
  }

  /** Navigate to Nested Iframe section */
  async goToIframe() {
    await this.iframeLink.click();
  }

  /** Click button inside nested iframe */
  async clickIframeB() {
    const button = this.page
      .frameLocator("#frame1")
      .frameLocator("#frame2")
      .locator("text=Click Me");
    await button.click();
  }

  /** Navigate to Navigation Menu section */
  async gotoNavigationMenu() {
    await this.navigationMenuLink.click();
  }

  /** Go to About link */
  async gotoAbout() {
    await this.aboutLink.click();
  }

  /** Go to Blog link */
  async gotoBlog() {
    await this.blogLink.click();
  }

  /** Go to Contact link */
  async gotoContact() {
    await this.contact.click();
  }

  /** Go to Portfolio link */
  async gotoPortfolio() {
    await this.portfolio.click();
  }

  /** Go back from navigation menu */
  async goBackNav() {
    await this.goBack.click();
  }

  /** Navigate to Covered Elements section */
  async navToCoveredPage() {
    await this.goToCoveredEle.click();
  }

  /** Click the covered button */
  async coveredButtonClick() {
    await this.coveredButton.click();
  }

  /** Navigate to Hover Image section */
  async gotoHoverImage() {
    await this.hoverImageLink.click();
  }

  /** Hover over image */
  async hoverOverImage() {
    await this.hoverImage.hover();
  }

  /** Navigate to File Upload section */
  async fileUploadNavigation() {
    await this.fileUploadLink.click();
  }

  async fileUploading(filePath: string) {
  const fileInputLocator = this.page.locator("#file-input");
  await this.uploadHelper.uploadFile(fileInputLocator, filePath);
  
  const firstImageCaption = this.page.locator(
    "#images >> figure >> nth=0 >> figcaption"
  );
  await expect(firstImageCaption, "File name not info.txt").toHaveText("info.txt");
}

  /** Navigate to Budget Tracker section */
  async navigateToBudgetTracker() {
    await this.budgetTrackerLink.click();
  }

  /** Add a new entry */
  async addNewEntry() {
    await this.newEntryButton.click();
  }

  /** Navigate to Right-Click Context Menu section */
  async navToRightContext() {
    await this.rightClickContentLink.click();
    //await this.contextVal.waitFor({ state: 'visible', timeout: 10000 });
     await this.page.waitForLoadState("networkidle");
   
  }

  /** Perform right click */
  async rightClick() {
    await this.page.mouse.click(964, 258, { button: "right" });
   
  }

  /**
   * Click on context menu item
   * @param {string} menu - The menu item to click.
   */
  async menuItemClick(menu: string) {
    await this.contextContent(menu).click();
  }

  /**
   * Hover on context menu item
   * @param {string} menu - The menu item to hover.
   */
  async menuItemHover(menu: string) {
    await this.contextContent(menu).hover();
  }

  /** Navigate to Shadow DOM section */
  async goToShadowDom() {
    await this.shadowDomLink.click();
  }

  /** Click button inside Shadow DOM */
  async shadowButtonClick() {
    await this.page.locator("button").click();
  }

  /** Navigate to Slider section */
  async navigateToSlider() {
    await this.ratingSlider.click();
  }

  /** Move slider until feedback button appears and click feedback */
  async moveSliderUntilFeedbackVisible() {
    for (let value = 0; value <= 100; value++) {
      await this.sliderInput.evaluate((el, val) => {
        const input = el as HTMLInputElement;
        input.value = val.toString();
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));
      }, value);

      if (await this.sendFeedbackButton.isVisible()) {
        break;
      }
    }
    await this.feedBack.click();
  }

  /** Navigate to Download File section */
  async navToDownloadFile() {
    await this.downloadFileLink.click();
  }

  /** Download file and validate */
  async downloadFile() {
    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      this.fileButton.click(),
    ]);

   const filePath = path.resolve(
    process.cwd(),
    ".artifacts/downloads",
    await download.suggestedFilename()
  );
    await download.saveAs(filePath);
    expect(fs.existsSync(filePath), "file name to be true").toBeTruthy();
    expect(path.extname(filePath), "Expect file to be pdf").toBe(".pdf");
  }

  /**
   * Opens the Modal Popup section and closes the popup via the close icon.
   */
  async openModalPopupSection(): Promise<void> {
    await this.modalHeading.click();
    await this.closeIcon.click();
  }

  /**
   * Opens the Fetch data section.
   */
  async launchFetchWebsite() {
    await this.page.goto("https://qaplayground.dev/apps/fetch/", {
      waitUntil: "networkidle",
    });
  }

  /**
   * Waits for the "Fetch Data" page to finish loading its API data and render post cards.
   * It safely handles timing issues where the `/posts` API might load
   * before the wait starts, preventing Playwright timeouts or page-close errors.
   *
   * @async
   * @returns {Promise<number>} The total number of post cards rendered on the page.
   */
  async openFetchData() {
    // Ensure the page network is idle first (most fetch requests are done)
    await this.page.waitForLoadState("networkidle");

    // Safely capture the /posts API response if it happens again
    let postsResponse;
    try {
      postsResponse = await this.page.waitForResponse(
        (resp) => resp.url().includes("/posts") && resp.ok(),
        { timeout: 10000 } // prevent hanging forever
      );
    } catch (e) {
      console.warn(
        "⚠️ /posts API was likely already loaded before wait started."
      );
    }

    // Wait until at least one card becomes visible
    await this.cardLocator
      .first()
      .waitFor({ state: "visible", timeout: 15000 });

    // (Optional) if postsResponse exists, validate JSON
    if (postsResponse) {
      const posts = await postsResponse.json();
      expect(posts.length, "Posts length should be > 0").toBeGreaterThan(0);
    }

    // Return the total cards count
    return await this.cardLocator.count();
  }

  async clickHeader(): Promise<void> {
    await this.redirectHeader.click();
  }

  async clickRedirectLink(): Promise<void> {
    await this.redirectLink.click();
 
  }
}
