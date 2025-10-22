import { Page, Locator, expect, BrowserContext } from "@playwright/test";

export default class ScreenerTask {
  readonly page: Page;
  readonly registerPage: Locator;
  readonly emailReg: Locator;
  readonly email2: Locator;
  readonly password: Locator;
  readonly regButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.registerPage = page.locator('//a[text()="Get free account"]');
    this.emailReg = page.locator('//input[@name="email"]');
    this.email2 = page.locator('//input[@name="email2"]');
    this.password = page.locator('//input[@name="password"]');
    this.regButton = page.locator('//button[text()="Create account"]');
  }

  /**
   * Launches the Screener.in homepage.
   * @returns {Promise<void>} Resolves when the homepage is fully loaded.
   */
  async launchWebsite() {
    await this.page.goto("https://www.screener.in/");
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Navigates from the homepage to the registration page.
   * @returns {Promise<void>} Resolves when the registration page is loaded.
   */
  async gotoRegistration() {
    await this.registerPage.click();
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Fills out the registration form using a Yopmail email and password, then submits it.
   * @param {string} yopEmail - The Yopmail email address to use for registration (e.g., "example@yopmail.com").
   * @param {string} password - The password to register with.
   * @returns {Promise<void>} Resolves after the registration form is submitted.
   */
  async register(yopEmail: string, password: string) {
    await this.emailReg.fill(yopEmail);
    await this.email2.fill(yopEmail);
    await this.password.fill(password);
    await this.regButton.click();

    // wait to allow email to be sent
    await this.page.waitForTimeout(5000);
  }

  /**
   * Opens Yopmail, locates the Screener.in verification email, extracts the activation link, and verifies the account.
   * @param {BrowserContext} context - The Playwright browser context used to open new pages.
   * @param {string} yopEmail - The Yopmail email address used during registration.
   * @returns {Promise<void>} Resolves after the verification link is opened and activation is confirmed.
   * @throws {Error} If no verification link is found in the Yopmail email.
   */
  async verifyEmailFromYopmail(context: BrowserContext, yopEmail: string) {
    const emailName = yopEmail.split("@")[0];
    const yopTab = await context.newPage();

    // Go to Yopmail and open inbox
    await yopTab.goto("https://yopmail.com/en/");
    await yopTab.fill("#login", emailName);
    await yopTab.keyboard.press("Enter");
    await yopTab.waitForTimeout(4000);

    // Wait for inbox frame and email from Screener
    const inboxFrame = yopTab.frameLocator("#ifinbox");
    await inboxFrame
      .locator('//span[contains(text(),"Screener.in")]')
      .first()
      .waitFor({ timeout: 20000 });
    await inboxFrame
      .locator('//span[contains(text(),"Screener.in")]')
      .first()
      .click();

    // Switch to email content iframe
    const mailFrame = yopTab.frameLocator("#ifmail");
    const verifyLinkLocator = mailFrame.locator(
      'a[href*="screener.in/activate"]'
    );

    await verifyLinkLocator.waitFor({ state: "visible", timeout: 20000 });
    const verifyLink = await verifyLinkLocator.getAttribute("href");

    if (!verifyLink) {
      throw new Error("Verification link not found in Yopmail email.");
    }

    // Open the verification link in new tab
    const verifyTab = await context.newPage();
    await verifyTab.goto(verifyLink);
    await verifyTab.waitForLoadState("domcontentloaded");

    // Validate success (you can tweak this depending on Screener’s confirmation message)
    await expect(verifyTab.locator("body")).toContainText(
      ["verified", "activated"],
      { timeout: 10000 }
    );
  }
}
