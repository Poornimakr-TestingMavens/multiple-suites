import { expect, Locator } from "@playwright/test";
import { Page } from "@playwright/test";
import * as fs from "fs";

export default class DynamicTableExportPage {
  readonly page: Page;
  readonly nameInp: Locator;
  readonly categoryInp: Locator;
  readonly priceInp: Locator;
  readonly stockInp: Locator;
  readonly addButton: Locator;
  readonly excelButton: Locator;
  constructor(page: Page) {
    this.page = page;
    this.nameInp = page.locator('//input[@placeholder="Name"]');
    this.categoryInp = page.locator('//input[@placeholder="Category"]');
    this.priceInp = page.locator('//input[@placeholder="Price"]');
    this.stockInp = page.locator('//input[@placeholder="Stock"]');
    this.addButton = page.locator('//button[text()="➕ Add Row"]');
    this.excelButton = page.locator('//button[text()="📊 Export to Excel"]');
  }

  /**
   * Navigates to the Dynamic Table Export component page.
   * @returns {Promise<void>} Resolves after navigation completes.
   */
  async navigate() {
    await this.page.goto(
      "https://www.playground.testingmavens.tools/components"
    );
    await this.page
      .locator('//a[@href="/components/dynamic-table-export"]')
      .click();
  }

  /**
   * Adds a new row to the dynamic table.
   * @param {string} name - The name value to enter.
   * @param {string} category - The category value to enter.
   * @param {string} price - The price value to enter.
   * @param {string} stock - The stock value to enter.
   * @returns {Promise<void>} Resolves after the row is added.
   */
  async addRow(name: string, category: string, price: string, stock: string) {
    await this.nameInp.fill(name);
    await this.categoryInp.fill(category);
    await this.priceInp.fill(price);
    await this.stockInp.fill(stock);
    await this.addButton.click();
  }

  /**
   * Exports the table data to an Excel file and saves it to the specified path.
   * @param {string} savePath - The file path where the Excel file will be saved.
   * @returns {Promise<void>} Resolves after the file is downloaded and saved.
   */
  async exportToExcel(savePath: string) {
    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      this.excelButton.click(),
    ]);
    const filePath = `${savePath}/exported_table.xlsx`;
    await download.saveAs(filePath);
  }
}
