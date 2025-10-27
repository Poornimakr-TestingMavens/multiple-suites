import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "../../pages/pages-QA-playground/basePage";

export default class Playgcolour extends BasePage {
  readonly page: Page;
  readonly prod1: Locator;
  readonly prod1Img1: Locator;

  /**
   * Initializes the Playgcolour class with page and locators.
   *
   * @param {Page} page - Playwright Page instance used to control browser actions.
   */
  constructor(page: Page) {
    super(page);
    this.page = page;
    // Locator for the specific product header
    this.prod1 = this.page.locator('//h2[text()="SteelSeries Arctis 9"]');
    // Locator for the product image element (headset)
    this.prod1Img1 = this.page.locator(
      'img[alt*="SteelSeries Arctis 9"], img[src*="headset7.webp"]'
    );
  }

  /**
   * Launches the static table export component page on the Playground website.
   *
   * @returns {Promise<void>} - Navigates to the Static Table Export page.
   */
  async launchWebsite() {
    await this.page.goto(
      "https://www.playground.testingmavens.tools/components/static-table-export"
    );
  }

  /**
   * Fetches background colors of export buttons (Excel, CSV, and PDF)
   * from the static table export page for visual UI validation.
   *
   * @returns {Promise<{ excelColor: string, csvColor: string, pdfColor: string }>}
   * Returns an object containing the RGB values of Excel, CSV, and PDF export buttons.
   */
  async getExportButtonColors() {
    const excelButton = this.page.locator(
      '//button[contains(text(), "Export to Excel")]'
    );
    const csvButton = this.page.locator(
      '//button[contains(text(), "Export to CSV")]'
    );
    const pdfButton = this.page.locator(
      '//a[contains(text(), "Export to PDF")]'
    );

    const excelColor = await excelButton.evaluate(
      (el) => getComputedStyle(el).backgroundColor
    );
    const csvColor = await csvButton.evaluate(
      (el) => getComputedStyle(el).backgroundColor
    );
    const pdfColor = await pdfButton.evaluate(
      (el) => getComputedStyle(el).backgroundColor
    );

    return { excelColor, csvColor, pdfColor };
  }

  /**
   * Launches the product shop page for the category 'Headsets'.
   *
   * @returns {Promise<void>} - Navigates to the Playground shop headset listing page.
   */
  async LaunchProdWEb() {
    await this.page.goto(
      "https://www.playground.testingmavens.tools/shop?categories=Headsets&page=1"
    );
  }

  /**
   * Clicks on the product image of "SteelSeries Arctis 9" to validate its visibility and navigability.
   * Typically used for visual validation or navigation testing.
   *
   * @returns {Promise<void>}
   */
  async asyncValidateProd() {
    await this.prod1Img1.click();
  }
}
