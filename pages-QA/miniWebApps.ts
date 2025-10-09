import { Page, Locator } from "@playwright/test";

export class DynamicTablePage {
  readonly page: Page;
  readonly dynamicTableLink: Locator;
  readonly superheroHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dynamicTableLink = page.locator('//h3[text()="Dynamic Table"]');
    this.superheroHeader = page.locator("text=SUPERHERO");
  }

  // Click on Dynamic Table link from base page
  async clickDynamicTable() {
    await this.dynamicTableLink.click();
  }

  // Return the real name of the superhero
  async getRealName(superhero: string): Promise<string> {
    const row = this.page.locator(`text="${superhero}" >> xpath=../../../..`);
    const realNameCell = row.locator("td").nth(2);
    const text = await realNameCell.textContent();
    return text?.trim() ?? "";
  }
}
