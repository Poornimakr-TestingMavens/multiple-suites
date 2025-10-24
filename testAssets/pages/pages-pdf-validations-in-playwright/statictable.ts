import { Page } from "@playwright/test";
import { DownloadHelper } from "../../../helpers/downloadFile";

/**
 * Handles actions for the Static Table Export page (UI + file exports).
 */
export default class StaticTablePage {
  readonly page: Page;
  readonly componentsLink = '//a[@href="/components/static-table-export"]';
  readonly excelExportBtnLocator = '//button[text()="📊 Export to Excel"]';
  readonly pdfExportLinkLocator = '//a[text()="📋 Export to PDF"]';
  readonly tableRows = '//div[@class="overflow-x-auto"]//tbody/tr';
  readonly tableHeaders = '//div[@class="overflow-x-auto"]//thead/tr/th';
  readonly downloadHelper: DownloadHelper;

  constructor(page: Page) {
    this.page = page;
    this.downloadHelper = new DownloadHelper(page);
  }

  /**
   * Navigate to the Static Table Export page.
   */
  async goToStaticTablePage(): Promise<void> {
    await this.page.goto(
      "https://www.playground.testingmavens.tools/components/static-table-export"
    );
    await this.page.waitForURL(/.*static-table-export/);
  }

  /**
   * Extracts table headers and rows from the page.
   */
  async getTableData(): Promise<{ headers: string[]; rows: string[][] }> {
    const headers = await this.page.$$eval(this.tableHeaders, (th) =>
      th.map((el) => el.textContent?.trim() ?? "")
    );

    const rows = await this.page.$$eval(this.tableRows, (trs) =>
      trs.map((tr) =>
        Array.from(tr.querySelectorAll("td")).map((td) => td.textContent?.trim() ?? "")
      )
    );

    return { headers, rows };
  }

  /**
   * Download Excel export and return the file path.
   */
  async exportToExcel(): Promise<string> {
    return await this.downloadHelper.downloadFile(
      this.page.locator(this.excelExportBtnLocator),
      "static_employee_data.xlsx"
    );
  }

  /**
   * Download PDF export and return the file path.
   */
  async exportToPDF(): Promise<string> {
    return await this.downloadHelper.downloadFile(
      this.page.locator(this.pdfExportLinkLocator),
      "employee_data_report.pdf"
    );
  }
}
