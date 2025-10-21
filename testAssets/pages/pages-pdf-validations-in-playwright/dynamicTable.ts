import { Page, Locator } from "@playwright/test";
import fs from "fs";
import path from "path";
import { PDFParse } from "pdf-parse";

/**
 * Page Object for Dynamic Table Export feature.
 */
export default class DynamicTableExportPage {
  readonly page: Page;
  readonly dynamicTableLink: Locator;
  readonly nameInput: Locator;
  readonly categoryInput: Locator;
  readonly priceInput: Locator;
  readonly stockInput: Locator;
  readonly addRowButton: Locator;
  readonly excelExportButton: Locator;
  readonly pdfExportLink: Locator;

  /**
   * @param {Page} page - Playwright page object.
   */
  constructor(page: Page) {
    this.page = page;
    this.dynamicTableLink = page.locator('//a[@href="/components/dynamic-table-export"]');
    this.nameInput = page.locator('//input[@placeholder="Name"]');
    this.categoryInput = page.locator('//input[@placeholder="Category"]');
    this.priceInput = page.locator('//input[@placeholder="Price"]');
    this.stockInput = page.locator('//input[@placeholder="Stock"]');
    this.addRowButton = page.locator('//button[text()="➕ Add Row"]');
    this.excelExportButton = page.locator('//button[text()="📊 Export to Excel"]');
    this.pdfExportLink = page.locator('//a[text()="📋 Export to PDF"]');
  }

  /**
   * Navigates to the Dynamic Table Export page.
   * @returns {Promise<void>}
   */
  async navigate(): Promise<void> {
    await this.page.goto("https://www.playground.testingmavens.tools/components");
    await this.dynamicTableLink.click();
  }

  /**
   * Adds a new row to the table.
   * @param {string} name - Product name.
   * @param {string} category - Product category.
   * @param {string} price - Product price.
   * @param {string} stock - Product stock quantity.
   * @returns {Promise<void>}
   */
  async addRow(name: string, category: string, price: string, stock: string): Promise<void> {
    await this.nameInput.fill(name);
    await this.categoryInput.fill(category);
    await this.priceInput.fill(price);
    await this.stockInput.fill(stock);
    await this.addRowButton.click();
  }

  /**
   * Exports the table to Excel and saves the file.
   * @param {string} savePath - Directory to save the exported Excel.
   * @returns {Promise<string>} Path of the saved Excel file.
   */
  async exportToExcel(savePath: string): Promise<string> {
    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      this.excelExportButton.click()
    ]);
    const filePath = path.join(savePath, "exported_table.xlsx");
    await download.saveAs(filePath);
    return filePath;
  }

  /**
   * Exports the table to PDF and saves the file.
   * @param {string} savePath - Directory to save the exported PDF.
   * @returns {Promise<string>} Path of the saved PDF file.
   */
  async exportToPDF(savePath: string): Promise<string> {
    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      this.pdfExportLink.click()
    ]);
    const filePath = path.join(savePath, "exported_table.pdf");
    await download.saveAs(filePath);
    return filePath;
  }

  /**
   * Extracts and returns the text content from a PDF file.
   * @param {string} pdfPath - Path of the exported PDF.
   * @returns {Promise<string>} Text content of the PDF.
   */
  async extractPDFText(pdfPath: string): Promise<string> {
    const pdfBuffer = fs.readFileSync(pdfPath);
    const parser = new PDFParse({ data: pdfBuffer });
    const result = await parser.getText();
    await parser.destroy();
    return result.text.replace(/\s+/g, " ").toLowerCase();
  }
}
