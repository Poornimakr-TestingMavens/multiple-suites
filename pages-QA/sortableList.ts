import { Page, Locator } from "@playwright/test";

export class SortableListPage {
  readonly page: Page;
  readonly header: Locator;
  readonly peopleList: Locator;
  readonly checkButton: Locator;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('//h3[text()="Sortable List"]');
    this.peopleList = page.locator('#draggable-list li');
    this.checkButton = page.locator('#check');
    this.title = page.locator('//h1[text()="10 Richest People"]');
  }

  async navigate() {
    await this.header.click();
  }

  async clickCheckOrder() {
    await this.checkButton.click();
    await this.page.waitForTimeout(200); // minimal UI update wait
  }

  async getAllItemsClasses() {
    const items = await this.peopleList.elementHandles();
    const results = [];
    for (const item of items) {
      const name = await item.$eval('.person-name', el => el.textContent?.trim());
      const className = await item.getAttribute('class');
      results.push({ name, className });
    }
    return results;
  }

  async dragItem(sourceIndex: number, targetIndex: number) {
    if (sourceIndex === targetIndex) return;
    const sourceItem = this.peopleList.nth(sourceIndex);
    const targetItem = this.peopleList.nth(targetIndex);
    await sourceItem.dragTo(targetItem, { force: true });
    await this.page.waitForTimeout(150);
  }

  async countItems() {
    return await this.peopleList.count();
  }
}
