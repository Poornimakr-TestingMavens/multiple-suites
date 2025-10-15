import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../pages-QA/basePage";

/**
 * Handles Screener registration and YOPmail email verification.
 */
export default class RegisterPage extends BasePage {
  private readonly yopmailPage: Page;
  private readonly getFreeAccountBtn: Locator;
  private readonly emailInput: Locator;
  private readonly confirmEmailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitBtn: Locator;
  private readonly postRegisterText: Locator;
  private readonly yopmailLoginInput: Locator;
  /**
   * @param {Page} page - Playwright Page object for Screener.
   * @param {Page} yopmailPage - Playwright Page object for YOPmail.
   */
  constructor(page: Page, yopmailPage: Page) {
    super(page);
    this.yopmailPage = yopmailPage;
    this.getFreeAccountBtn = page.locator('//a[text()="Get free account"]');
    this.emailInput = page.locator('//input[@name="email"]');
    this.confirmEmailInput = page.locator('//input[@name="email2"]');
    this.passwordInput = page.locator('//input[@name="password"]');
    this.submitBtn = page.locator('//button[@type="submit"]');
    this.postRegisterText = page.locator(
      '//p[text()="Add companies to watchlist"]'
    );
    this.yopmailLoginInput = yopmailPage.locator("#login");
  }

  /**
   * Registers a new user on Screener and checks for confirmation email in YOPmail.
   * @returns {Promise<{ found: boolean; content?: string }>} Email status and content if found.
   */
  async registerAndCheckEmail(): Promise<{ found: boolean; content?: string }> {
    const randomEmail = `testuser_${Date.now()}@yopmail.com`;
    const password = "StrongPass123!";
    const inboxName = randomEmail.split("@")[0];
    await this.page.goto("https://www.screener.in/home/");
    await this.getFreeAccountBtn.click();
    await this.emailInput.fill(randomEmail);
    await this.confirmEmailInput.fill(randomEmail);
    await this.passwordInput.fill(password);
    await this.submitBtn.click();
    await expect(this.postRegisterText).toBeVisible({ timeout: 15000 });
    await this.yopmailPage.goto("https://yopmail.com/en/");
    await this.yopmailLoginInput.fill(inboxName);
    await Promise.all([
      this.yopmailPage.waitForLoadState("domcontentloaded"),
      this.yopmailPage.keyboard.press("Enter"),
    ]);

    let foundEmail = false;
    let emailContent = "";

    for (let attempt = 0; attempt < 8; attempt++) {
      const inboxFrame = this.yopmailPage.frameLocator("#ifinbox");
      const mailItem = inboxFrame.locator('div.m:has-text("Screener")');

      if (
        await mailItem
          .first()
          .isVisible({ timeout: 1000 })
          .catch(() => false)
      ) {
        foundEmail = true;
        await mailItem.first().click();

        const mailBodyFrame = this.yopmailPage.frameLocator("#ifmail");
        await mailBodyFrame
          .locator("body")
          .waitFor({ state: "visible", timeout: 5000 });
        emailContent = await mailBodyFrame.locator("body").innerText();
        console.log(" Screener verification email received.");
        break;
      }
      const refreshSelectors = [
        "button.refresh",
        "#refresh",
        "i.fa.fa-refresh",
      ];
      let refreshed = false;
      for (const sel of refreshSelectors) {
        const element = this.yopmailPage.locator(sel);
        if (await element.isVisible().catch(() => false)) {
          await Promise.all([
            this.yopmailPage.waitForLoadState("networkidle"),
            element.click(),
          ]);
          refreshed = true;
          break;
        }
      }
      if (!refreshed) {
        await this.yopmailPage.goto(`https://yopmail.com/en/?${inboxName}`);
        await this.yopmailPage.waitForLoadState("domcontentloaded");
      }
      await this.yopmailPage
        .frameLocator("#ifinbox")
        .locator("div")
        .first()
        .waitFor({ timeout: 3000 })
        .catch(() => {});
    }
    return { found: foundEmail, content: emailContent };
  }
}
