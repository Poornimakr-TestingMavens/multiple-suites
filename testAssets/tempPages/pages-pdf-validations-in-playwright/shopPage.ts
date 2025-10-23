import { Page, Locator } from "@playwright/test";

/**
 * Represents the Dynamic Table Export page (Shop Page) within the Playground site.
 * Provides actions to interact with buttons and retrieve their styles for validation.
 */
export default class ShopPage {
  /** Playwright Page instance controlling the browser. */
  readonly page: Page;

  /** Locator for the "Add Row" button. */
  readonly addRowButton: Locator;

  /** Locator for the "Export to Excel" button. */
  readonly exportExcelButton: Locator;

  /** Locator for the "Export to CSV" button. */
  readonly exportCsvButton: Locator;

  /** Locator for the "Export to PDF" link/button. */
  readonly exportPdfButton: Locator;

  /**
   * Initializes the ShopPage class and defines locators for UI elements.
   * @param {Page} page - The Playwright Page object used for browser interactions.
   */
  constructor(page: Page) {
    this.page = page;
    this.addRowButton = page.locator('//button[text()="➕ Add Row"]');
    this.exportExcelButton = page.locator('//button[text()="📊 Export to Excel"]');
    this.exportCsvButton = page.locator('//button[text()="📄 Export to CSV"]');
    this.exportPdfButton = page.locator('//a[text()="📋 Export to PDF"]');
  }

  /**
   * Navigates to the Dynamic Table Export page within the Playground app.
   * Waits for the page to fully load before continuing.
   * 
   * @async
   * @returns {Promise<void>}
   */
  async navigate(): Promise<void> {
    await this.page.goto(
      "https://www.playground.testingmavens.tools/components/dynamic-table-export"
    );
  }

  /**
   * Retrieves the computed background color of a given button or element.
   * Useful for validating UI consistency across export options.
   * 
   * @async
   * @param {Locator} locator - The Playwright Locator of the button whose color is to be checked.
   * @returns {Promise<string>} The background color in RGB or RGBA format (e.g., "rgb(255, 255, 255)").
   */
  async getButtonColor(locator: Locator): Promise<string> {
    return (
      await locator.evaluate((el) => {
        return window.getComputedStyle(el).getPropertyValue("background-color");
      })
    ).trim();
  }
}
