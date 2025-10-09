import { Page, Locator, expect } from "@playwright/test";

export class VerifyAccountPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly codeFields: Locator;
  readonly successMessage: Locator;
  readonly verifyAccountCard: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.locator('h2:text("Verify Your Account")');
    this.codeFields = page.locator(".code"); // All 6 input boxes
    this.successMessage = page.locator('//small[text()="Success"]');
    this.verifyAccountCard = page.locator('//h3[text()="Verify Your Account"]');
  }

  // Navigate to the Verify Account app from the main page
async navigate() {
  await expect(this.verifyAccountCard).toBeVisible({ timeout: 10000 });

  // Scroll into view before clicking (for hidden/offscreen cards)
  await this.verifyAccountCard.scrollIntoViewIfNeeded();

  await this.verifyAccountCard.click();
  await expect(this.heading).toBeVisible();
}


  // Fill the 6-digit code in the input fields
  async enterCode(code: string) {
  const digits = code.split("");

  for (let i = 0; i < digits.length; i++) {
    const field = this.codeFields.nth(i);

    // Type instead of fill
    await field.click({ force: true }); // ensure focused
    await field.type(digits[i], { delay: 100 });

    // Wait until value is updated
    await expect(field).toHaveValue(digits[i], { timeout: 5000 });
  }
}



  // Validate success message does NOT appear
  async verifySuccessNotVisible() {
    await expect(this.successMessage).not.toBeVisible();
  }
}
