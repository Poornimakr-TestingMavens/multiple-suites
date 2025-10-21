import { Page, Locator } from "@playwright/test";
import redirectData from "../../testdata/test-data-for-playground/redirectChain.json";

/**
 * Page Object for Redirect Chain page
 * Uses test data for all dynamic values (no hardcoded strings)
 */
export class RedirectChainPage {
  readonly page: Page;
  readonly redirectSection: Locator;
  readonly startChainButton: Locator;
  readonly goBackButton: Locator;
  readonly lastPageMessage: Locator;
  readonly redirectPages: string[];
  readonly lastPageText: string;

  constructor(page: Page) {
    this.page = page;
    this.redirectPages = redirectData.redirectPages;
    this.lastPageText = redirectData.lastPageText;

    this.redirectSection = page.locator(`//h3[text()="${redirectData.redirectSectionText}"]`);
    this.startChainButton = page.locator(`//a[text()="${redirectData.startLinkText}"]`);
    this.goBackButton = page.locator(`//a[text()="${redirectData.goBackText}"]`);
    this.lastPageMessage = page.locator(`//h2[contains(text(),"${this.lastPageText}")]`);
  }

  /** Navigate to the Redirect Chain section */
  async navigate() {
    await this.redirectSection.scrollIntoViewIfNeeded();
    await this.redirectSection.click();
  }

  /** Start the redirection process */
  async startRedirection() {
    await this.startChainButton.click();
  }

  /**
   * Validate all redirect pages dynamically from test data
   */
  async validateAllRedirectPages() {
    for (const slug of this.redirectPages) {
      await this.page.waitForURL(new RegExp(`${slug}`), { timeout: 10000 });
      console.log(`✅ Redirected to ${slug} page`);
    }

    // Validate final page message
    await this.lastPageMessage.waitFor({ state: "visible", timeout: 5000 });
  }

  /** Go back and validate we returned to start */
  async goBackToStart() {
    await this.goBackButton.click();
    await this.startChainButton.waitFor({ state: "visible", timeout: 5000 });
  }
}
