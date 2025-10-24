import { Page, Locator } from "@playwright/test";
import fs from "fs";
import path from "path";
const pdf = require("pdf-parse");
import { DownloadHelper } from "../../../helpers/downloadFile";

/**
 * Page Object for Dynamic Table Export feature.
 */
export default class DynamicTableExportPage {
  readonly page: Page;
  readonly downloadHelper: DownloadHelper;
  readonly dynamicTableLink: Locator;
  readonly nameInput: Locator;
  readonly categoryInput: Locator;
  readonly priceInput: Locator;
  readonly stockInput: Locator;
  readonly addRowButton: Locator;
  readonly excelExportButton: Locator;
  readonly pdfExportLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.downloadHelper = new DownloadHelper(page);

    this.dynamicTableLink = page.locator('//a[@href="/components/dynamic-table-export"]');
    this.nameInput = page.locator('//input[@placeholder="Name"]');
    this.categoryInput = page.locator('//input[@placeholder="Category"]');
    this.priceInput = page.locator('//input[@placeholder="Price"]');
    this.stockInput = page.locator('//input[@placeholder="Stock"]');
    this.addRowButton = page.locator('//button[text()="➕ Add Row"]');
    this.excelExportButton = page.locator('//button[text()="📊 Export to Excel"]');
    this.pdfExportLink = page.locator('//a[text()="📋 Export to PDF"]');
  }

  async navigate(): Promise<void> {
    await this.page.goto("https://www.playground.testingmavens.tools/components");
    await this.dynamicTableLink.click();
  }

  async addRow(name: string, category: string, price: string, stock: string): Promise<void> {
    await this.nameInput.fill(name);
    await this.categoryInput.fill(category);
    await this.priceInput.fill(price);
    await this.stockInput.fill(stock);
    await this.addRowButton.click();
  }

  /**
   * Exports the table to Excel using DownloadHelper.
   * @param fileName Name for the Excel file
   * @returns Absolute path of the saved Excel file
   */
  async exportToExcel(fileName: string = "exported_table.xlsx"): Promise<string> {
    return await this.downloadHelper.downloadFile(this.excelExportButton, fileName);
  }

  /**
   * Exports the table to PDF using DownloadHelper.
   * @param fileName Name for the PDF file
   * @returns Absolute path of the saved PDF file
   */
  async exportToPDF(fileName: string = "exported_table.pdf"): Promise<string> {
    return await this.downloadHelper.downloadFile(this.pdfExportLink, fileName);
  }

  /**
   * Extracts text content from a PDF file.
   * @param pdfPath Path to the PDF file
   * @returns Text content of the PDF
   */
  async extractPDFText(pdfPath: string): Promise<string> {
  const pdfBuffer = fs.readFileSync(pdfPath);
  const result = await pdf(pdfBuffer); // call directly, no "new"
  return result.text.replace(/\s+/g, " ").toLowerCase();
}
}
