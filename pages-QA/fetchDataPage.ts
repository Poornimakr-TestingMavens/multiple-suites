import { Page, Locator } from "@playwright/test";

/**
 * Page Object for Fetching Data page
 * Handles validation of dynamically loaded data cards.
 */
export class FetchDataPage {
  readonly page: Page;
  readonly fetchDataSection: Locator;
  readonly dataCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fetchDataSection = page.locator('//h3[text()="Fetching Data"]');
    this.dataCards = page.locator('//div[@class="icard"]');
  }

  /** Navigate to Fetching Data section */
  async navigate() {
    await this.fetchDataSection.scrollIntoViewIfNeeded();
    await this.fetchDataSection.click();
  }

  /**
   * Validate all fetched data cards
   * Ensure 100 data cards are present and visible
   */
  async validateAllCards() {
    await this.dataCards.first().waitFor({ state: "visible" });
    const count = await this.dataCards.count();
    console.log(`Fetched ${count} cards`);
    if (count !== 100) throw new Error(`Expected 100 cards, found ${count}`);
  }
}
