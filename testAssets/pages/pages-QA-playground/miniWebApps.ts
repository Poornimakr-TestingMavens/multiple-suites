import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../pages/pages-QA-playground/basePage";
/**
 * Page Object Model for the Dynamic Table component.
 * Handles interactions and data retrieval for the dynamic table page.
 */
export class DynamicTablePage extends BasePage {
  readonly page: Page;
  readonly dynamicTableLink: Locator;
  readonly superheroHeader: Locator;

  /**
   * Initializes the DynamicTablePage.
   * @param {Page} page - The Playwright Page instance used to interact with the browser.
   */
  constructor(page: Page) {
    super(page);
    this.page = page;
    this.dynamicTableLink = page.locator('//h3[text()="Dynamic Table"]');
    this.superheroHeader = page.locator("text=SUPERHERO");
  }

  /**
   * Clicks the "Dynamic Table" link to navigate to the Dynamic Table section.
   * No parameters or return values.
   */
  async clickDynamicTable(): Promise<void> {
    await this.dynamicTableLink.click();
  }

  /**
   * Retrieves the real name of a given superhero from the dynamic table.
   *
   * @param {string} superhero - The name of the superhero whose real name should be fetched.
   * @returns {Promise<string>} - The real name of the superhero as displayed in the table.
   */
  async getRealName(superhero: string): Promise<string> {
    const row = this.page.locator(`text="${superhero}" >> xpath=../../../..`);
    const realNameCell = row.locator("td").nth(2);
    const text = await realNameCell.textContent();
    return text?.trim() ?? "";
  }
}
