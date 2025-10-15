import { Page } from "@playwright/test";
import fs from "fs";
import * as XLSX from "xlsx";
import { PDFParse } from "pdf-parse";
import path from "path";

/**
 * Handles actions for the Static Table Export page.
 */
export default class StaticTablePage {
  readonly page: Page;
  readonly projectDir: string;
  readonly componentsLink = '//a[@href="/components/static-table-export"]';
  readonly excelExportBtn = '//button[text()="📊 Export to Excel"]';
  readonly pdfExportLink = '//a[text()="📋 Export to PDF"]';
  readonly tableRows = '//div[@class="overflow-x-auto"]//tbody/tr';
  readonly tableHeaders = '//div[@class="overflow-x-auto"]//thead/tr/th';

  /**
   * @param {Page} page - Playwright page object.
   */
  constructor(page: Page) {
    this.page = page;
    // Use __dirname directly (no path.resolve)
    this.projectDir = path.join(__dirname, "..");
  }

  /**
   * Navigates to the Static Table Export page.
   * @returns {Promise<void>}
   */
  async goToStaticTablePage(): Promise<void> {
    await this.page.goto("https://www.playground.testingmavens.tools/components/static-table-export");
    await this.page.waitForURL(/.*static-table-export/);
  }

  /**
   * Extracts table headers and rows from the page.
   * @returns {Promise<{ headers: string[]; rows: string[][] }>} Table data from the page.
   */
  async getTableData(): Promise<{ headers: string[]; rows: string[][] }> {
    const headers = await this.page.$$eval(this.tableHeaders, th =>
      th.map(el => el.textContent?.trim())
    );
    const rows = await this.page.$$eval(this.tableRows, trs =>
      trs.map(tr =>
        Array.from(tr.querySelectorAll("td")).map(td => td.textContent?.trim())
      )
    );
    return { headers, rows };
  }

  /**
   * Downloads the Excel export file.
   * @returns {Promise<string>} Path of the downloaded Excel file.
   */
  async downloadExcel(): Promise<string> {
    const downloadFileName = "static_employee_data.xlsx";
    const downloadPath = path.join(this.projectDir, downloadFileName);

    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      this.page.click(this.excelExportBtn),
    ]);
    await download.saveAs(downloadPath);

    return downloadPath;
  }

  /**
   * Parses the downloaded Excel file and returns extracted data.
   * @param {string} pathToExcel - Path to the downloaded Excel file.
   * @returns {Promise<{ headers: string[]; rows: string[][] }>} Parsed Excel data.
   */
  async parseExcel(pathToExcel: string): Promise<{ headers: string[]; rows: string[][] }> {
    const workbook = XLSX.readFile(pathToExcel);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const excelJson: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    const headers = (excelJson[0] as string[]).map(h => h.toLowerCase().trim());
    const rows = excelJson.slice(1).map(row =>
      row.map((cell, idx) => {
        if (idx === 0) return String(cell);
        if (idx === 5) return `$${Number(cell).toLocaleString()}`;
        return String(cell);
      })
    );

    return { headers, rows };
  }

  /**
   * Downloads the PDF export file.
   * @returns {Promise<string>} Path of the downloaded PDF file.
   */
  async downloadPDF(): Promise<string> {
    const pdfFileName = "employee_data_report.pdf";
    const pdfPath = path.join(this.projectDir, pdfFileName);

    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      this.page.click(this.pdfExportLink),
    ]);
    await download.saveAs(pdfPath);

    return pdfPath;
  }

  /**
   * Extracts and returns text content from the downloaded PDF.
   * @param {string} pdfPath - Path to the downloaded PDF file.
   * @returns {Promise<string>} Extracted PDF text.
   */
  async extractPDFText(pdfPath: string): Promise<string> {
    const pdfBuffer = fs.readFileSync(pdfPath);
    const parser = new PDFParse({ data: pdfBuffer });
    const result = await parser.getText();
    await parser.destroy();
    return result.text.replace(/\s+/g, " ").trim();
  }
}
