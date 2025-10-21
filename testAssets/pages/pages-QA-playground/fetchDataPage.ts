import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

/**
 * Page Object Model for the "Fetching Data" section of QA Playground.
 * Handles interactions with the header and post cards.
 */
export class FetchDataPage extends BasePage {
  /** Locator for the "Fetching Data" header */
  readonly fetchDataHeader: Locator;

  /** Locator for the post cards on the page */
  readonly cardLocator: Locator;

  /**
   * Initializes the FetchDataPage with page locators
   * @param page Playwright Page object
   */
  constructor(page: Page) {
    super(page);
    this.fetchDataHeader = page.locator('//h3[text()="Fetching Data"]');
    this.cardLocator = page.locator(".icard");
  }

  /**
   * Clicks the "Fetching Data" header to open the section and
   * waits until at least one post card becomes visible.
   */
  async openFetchDataSection() {
    await this.fetchDataHeader.click();
    await this.cardLocator.first().waitFor({ state: "visible", timeout: 15000 });
  }

  /**
   * Returns the total number of post cards currently rendered.
   * @returns {Promise<number>} Number of cards
   */
  async getCardCount() {
    return await this.cardLocator.count();
  }
}
