import { Page, Locator } from '@playwright/test';

export default class ShopPage {
  readonly page: Page;
  readonly addRowButton: Locator;
  readonly exportExcelButton: Locator;
  readonly exportCsvButton: Locator;
  readonly exportPdfButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addRowButton = page.locator('//button[text()="➕ Add Row"]');
    this.exportExcelButton = page.locator('//button[text()="📊 Export to Excel"]');
    this.exportCsvButton = page.locator('//button[text()="📄 Export to CSV"]');
    this.exportPdfButton = page.locator('//a[text()="📋 Export to PDF"]');
  }

  async navigate() {
    await this.page.goto('https://www.playground.testingmavens.tools/components/dynamic-table-export');
  }

  async getButtonColor(locator: Locator) {
    return (await locator.evaluate((el) => {
      return window.getComputedStyle(el).getPropertyValue('background-color');
    })).trim();
  }
}
