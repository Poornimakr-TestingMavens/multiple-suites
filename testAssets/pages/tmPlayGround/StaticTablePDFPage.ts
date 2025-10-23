import { Page, expect } from "@playwright/test";
import fs from "fs";
import path from "path";
import { PdfReader } from "pdfreader";
import { DownloadHelper } from "../../../helpers/downloadFile";

export default class StaticTablePDFPage {
  readonly page: Page;
  private downloadHelper: DownloadHelper;
 // downloadDir = path.resolve(process.cwd(), ".artifacts/pgdownloads");
  exportPdfButton = '//a[text()="📋 Export to PDF"]';
  tableHeaders = '//div[@class="overflow-x-auto"]//thead/tr/th';
  tableRows = '//div[@class="overflow-x-auto"]//tbody/tr';

  /**
   * Initializes the page and ensures the download directory exists.
   * @param {Page} page - The Playwright Page instance.
   */
  constructor(page: Page) {
    this.page = page;
    this.downloadHelper = new DownloadHelper(page);
  }

  /**
   * Navigates to the static table export component page.
   * @returns {Promise<void>}
   */
  async goToStaticTablePage() {
    await this.page.click('//a[@href="/components/static-table-export"]');
    await expect(this.page, "Wrong url is displayed").toHaveURL(
      /.*static-table-export/
    );
  }

  /**
   * Extracts table headers and row data from the page.
   * @returns {Promise<{ headers: string[], rows: string[][] }>} An object containing arrays of headers and rows.
   */
  async getTableData() {
    const headers = await this.page.$$eval(this.tableHeaders, (ths) =>
      ths.map((el) => el.textContent?.trim() || "")
    );
    const rows = await this.page.$$eval(this.tableRows, (trs) =>
      trs.map((tr) =>
        Array.from(tr.querySelectorAll("td")).map(
          (td) => td.textContent?.trim() || ""
        )
      )
    );
    return { headers, rows };
  }

  /**
   * Downloads the exported PDF file and returns its file path.
   * @returns {Promise<string>} The path to the saved PDF file.
   */
async downloadPDF(): Promise<string> {
    return await this.downloadHelper.downloadFile(
      this.page.locator(this.exportPdfButton),
      "static_employee_data.pdf"
    );
  }

  /**
   * Extracts text content from a PDF file.
   * @param {string} pdfPath - The file path of the PDF to extract text from.
   * @returns {Promise<string>} The extracted text from the PDF.
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
   * Validates that the exported PDF contains all headers and row cell values from the table data.
   * @param {string} pathToPDF - The file path of the PDF to validate.
   * @param {{ headers: string[]; rows: string[][] }} tableData - The table data with headers and cells.
   * @throws Will throw an error if headers or any cell values are missing in the PDF text.
   * @returns {Promise<void>}
   */
  async validatePDF(
    pathToPDF: string,
    tableData: { headers: string[]; rows: string[][] }
  ) {
    if (!fs.existsSync(pathToPDF)) {
      throw new Error(`PDF file not found at path: ${pathToPDF}`);
    }
    const pdfText = await this.extractPdfText(pathToPDF);
    // Normalize for robust matching
    const normPdf = pdfText
      .replace(/[\$,]/g, "")
      .replace(/\s+/g, "")
      .toLowerCase();

    for (const header of tableData.headers) {
      const normHeader = header
        .replace(/[\$,]/g, "")
        .replace(/\s+/g, "")
        .toLowerCase();
      if (!normPdf.includes(normHeader)) {
        throw new Error(`Header "${header}" not found in PDF`);
      }
    }
    for (const row of tableData.rows) {
      for (const cell of row) {
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
