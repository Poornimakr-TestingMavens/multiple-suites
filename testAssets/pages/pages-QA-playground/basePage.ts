import { Page, Locator } from "@playwright/test";

/**
 * BasePage provides common navigation and utility actions for QA Playground site.
 */
export class BasePage {
  readonly page: Page;
  readonly changeableIframeSection: Locator;

  /**
   * Initializes the base page and locators.
   * @param page - Playwright Page instance
   */
  constructor(page: Page) {
    this.page = page;
    this.changeableIframeSection = page.locator('//h3[text()="Changeable Iframe"]');
  }

  /**
   * Opens the QA Playground site.
   */
  async openSite(): Promise<void> {
    await this.page.goto("https://qaplayground.dev/");
  }

  /**
   * Clicks on the "Changeable Iframe" section.
   */
  async goToChangeableIframe(): Promise<void> {
    await this.changeableIframeSection.click();
  }
}
