import { Page, expect, Locator } from "@playwright/test";
import fs from "fs";
import path from "path";
import { PdfReader } from "pdfreader";
import {DownloadHelper} from "../../../helpers/downloadFile";

export default class DynamicTableExportPDFPage {
  readonly page: Page;
  readonly nameInp: Locator;
  readonly categoryInp: Locator;
  readonly priceInp: Locator;
  readonly stockInp: Locator;
  readonly addButton: Locator;
  readonly pdfButton: Locator;
  readonly tableHeaders: Locator;
  readonly tableRows: Locator; // UPDATED to save downloads inside .artifacts folder at project root

  //downloadDir = path.resolve(process.cwd(), ".artifacts/downloads");
  private downloadHelper: DownloadHelper;
  /**
   * Initializes locators and ensures the download directory exists.
   *
   * @param {Page} page - Playwright Page object used for browser interactions.
   */

  constructor(page: Page) {
    this.page = page;
    this.nameInp = page.locator('//input[@placeholder="Name"]');
    this.categoryInp = page.locator('//input[@placeholder="Category"]');
    this.priceInp = page.locator('//input[@placeholder="Price"]');
    this.stockInp = page.locator('//input[@placeholder="Stock"]');
    this.addButton = page.locator('//button[contains(text(), "Add Row")]');
    this.pdfButton = page.locator('//a[text()="📋 Export to PDF"]');
    this.tableHeaders = page.locator(
      '//div[@class="overflow-x-auto"]//thead/tr/th'
    );
    this.tableRows = page.locator('//div[@class="overflow-x-auto"]//tbody/tr');

    this.downloadHelper = new DownloadHelper(page);
  }
  /**
   * Navigates to the Dynamic Table Export page inside the Playground Components section.
   *
   * @returns {Promise<void>}
   */

  async navigate() {
    await this.page.goto(
      "https://www.playground.testingmavens.tools/components"
    );
    await this.page
      .locator('//a[@href="/components/dynamic-table-export"]')
      .click();
    await expect(this.page, "Loaded url is not correct").toHaveURL(
      /.*dynamic-table-export/
    );
  }
  /**
   * Adds a new row to the dynamic table.
   *
   * @param {string} name - The name of the item to add.
   * @param {string} category - The category of the item.
   * @param {string} price - The price of the item. Non-numeric characters will be removed before filling.
   * @param {string} stock - The available stock quantity.
   * @returns {Promise<void>}
   */

  async addRow(name: string, category: string, price: string, stock: string) {
    await this.nameInp.fill(name);
    await this.categoryInp.fill(category);
    const numericPrice = price.replace(/[^0-9.]/g, ""); // Only numeric values allowed
    await this.priceInp.fill(numericPrice);
    await this.stockInp.fill(stock);
    await this.addButton.click();
  }
  /**
   * Extracts all table headers and rows currently rendered on the page.
   *
   * @returns {Promise<{ headers: string[], rows: string[][] }>}
   * Structured table data with headers and row arrays.
   */

  async getHeadersAndRows() {
    const headers = await this.page.$$eval(
      '//div[@class="overflow-x-auto"]//thead/tr/th',
      (hs) => hs.map((el) => el.textContent?.trim() || "")
    );
    const rows = await this.page.$$eval(
      '//div[@class="overflow-x-auto"]//tbody/tr',
      (trs) =>
        trs.map((tr) =>
          Array.from(tr.querySelectorAll("td")).map(
            (td) => td.textContent?.trim() || ""
          )
        )
    );
    return { headers, rows };
  }
  /**
   * Exports the table data to a downloadable PDF file.
   *
   * @returns {Promise<string>}
   * The file path where the PDF was saved.
   */

    async exportToPDF(timeout: number = 30000): Promise<string> {
    return await this.downloadHelper.downloadFile(
      this.pdfButton, 
      "dynamic_table_export.pdf",
      timeout
    );
  }

  /**
   * Reads and extracts text from the provided PDF file using PdfReader.
   *
   * @param {string} pdfPath - Path to the exported PDF file.
   * @returns {Promise<string>}
   * Extracted text content of the PDF file.
   */

  async extractPdfText(pdfPath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const results: string[] = [];
      new PdfReader().parseFileItems(pdfPath, (err, item) => {
        if (err) return reject(err);
        if (!item) return resolve(results.join(" "));
        if (item.text) results.push(item.text.trim());
      });
    });
  }
  /**
   * Validates that all table headers and cell values match the text content of the exported PDF.
   *
   * @param {string} pdfPath - Path to the saved PDF file for validation.
   * @param {{ headers: string[], rows: string[][] }} tableData - Table data extracted from the webpage.
   *
   * @throws {Error} If any table cell or header (excluding "Actions") is not found in the PDF text.
   * @returns {Promise<void>}
   */

  async validateAllTableDataPDF(
    pdfPath: string,
    tableData: { headers: string[]; rows: string[][] }
  ) {
    if (!fs.existsSync(pdfPath))
      throw new Error(`PDF file not found at path: ${pdfPath}`);
    const pdfText = await this.extractPdfText(pdfPath);
    const normPdf = pdfText
      .replace(/[\$,]/g, "")
      .replace(/\s+/g, "")
      .toLowerCase(); // Skip "Actions" column as it is not part of PDF exports

    const excludedHeaders = ["actions"]; // Validate table headers

    for (const header of tableData.headers) {
      const normHeader = header
        .replace(/[\$,]/g, "")
        .replace(/\s+/g, "")
        .toLowerCase();
      if (excludedHeaders.includes(normHeader)) continue;
      if (!normPdf.includes(normHeader)) {
        throw new Error(`Header "${header}" not found in PDF`);
      }
    } // Validate row cell values

    for (const row of tableData.rows) {
      for (const cell of row.slice(0, -1)) {
        // Excluding “Actions” cell
        const normCell = cell
          .replace(/[\$,]/g, "")
          .replace(/\s+/g, "")
          .toLowerCase();
        if (!normPdf.includes(normCell)) {
          throw new Error(`Cell value "${cell}" not found in PDF`);
        }
      }
    }
  }
}
