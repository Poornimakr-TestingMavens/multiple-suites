import { Page, Locator, expect } from "@playwright/test";

/**
 * Page Object Model for the "Verify Your Account" section.
 * Handles navigation to the verify account page, entering verification codes, and checking success messages.
 */
export class VerifyAccountPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly codeFields: Locator;
  readonly successMessage: Locator;
  readonly verifyAccountCard: Locator;

  /**
   * Initializes all locators for the Verify Account page.
   * @param page - The Playwright Page instance representing the current browser page.
   */
  constructor(page: Page) {
    this.page = page;
    this.heading = page.locator('h2:text("Verify Your Account")');
    this.codeFields = page.locator(".code"); 
    this.successMessage = page.locator('//small[text()="Success"]');
    this.verifyAccountCard = page.locator('//h3[text()="Verify Your Account"]');
  }

  /**
   * Navigates to the "Verify Your Account" section.
   * Scrolls into view, clicks the section card, and waits for the heading to be visible.
   */
  async navigate() {
    await expect(this.verifyAccountCard).toBeVisible({ timeout: 10000 });
    await this.verifyAccountCard.scrollIntoViewIfNeeded();
    await this.verifyAccountCard.click();
    await expect(this.heading).toBeVisible();
  }

  /**
   * Enters a verification code digit by digit into the input fields.
   * @param code - The verification code as a string.
   */
  async enterCode(code: string) {
    const digits = code.split("");

    for (let i = 0; i < digits.length; i++) {
      const field = this.codeFields.nth(i);
      await field.click({ force: true }); 
      await field.type(digits[i], { delay: 100 });
      await expect(field).toHaveValue(digits[i], { timeout: 5000 });
    }
  }

  /**
   * Verifies that the success message is not visible on the page.
   */
  async verifySuccessNotVisible() {
    await expect(this.successMessage).not.toBeVisible();
  }
}
