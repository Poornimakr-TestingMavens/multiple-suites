import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../pages/pages-QA-playground/basePage";

/**
 * Page Object Model for the "Sortable List" component.
 * Handles interactions with the list items, including drag-and-drop and order validation.
 */
export class SortableListPage extends BasePage {
  readonly page: Page;
  readonly header: Locator;
  readonly peopleList: Locator;
  readonly checkButton: Locator;
  readonly title: Locator;

  /**
   * Initializes all locators for the Sortable List page.
   * @param page - The Playwright Page instance representing the current browser page.
   */
  constructor(page: Page) {
    super(page);
    this.page = page;
    this.header = page.locator('//h3[text()="Sortable List"]');
    this.peopleList = page.locator("#draggable-list li");
    this.checkButton = page.locator("#check");
    this.title = page.locator('//h1[text()="10 Richest People"]');
  }

  /**
   * Navigates to the "Sortable List" section by clicking the header.
   */
  async navigate() {
    await this.header.click();
  }

  /**
   * Clicks the "Check Order" button to validate the order of the list items.
   * Waits briefly to allow the UI to update.
   */
  async clickCheckOrder() {
    await this.checkButton.click();
    await this.page.waitForTimeout(200);
  }

  /**
   * Retrieves the names and CSS classes of all list items.
   * @returns An array of objects with `name` and `className` for each list item.
   */
  async getAllItemsClasses() {
    const items = await this.peopleList.elementHandles();
    const results = [];
    for (const item of items) {
      const name = await item.$eval(".person-name", (el) =>
        el.textContent?.trim()
      );
      const className = await item.getAttribute("class");
      results.push({ name, className });
    }
    return results;
  }

  /**
   * Drags a list item from a source index to a target index.
   * @param sourceIndex - The index of the item to drag.
   * @param targetIndex - The index of the target location.
   */
  async dragItem(sourceIndex: number, targetIndex: number) {
    if (sourceIndex === targetIndex) return;
    const sourceItem = this.peopleList.nth(sourceIndex);
    const targetItem = this.peopleList.nth(targetIndex);
    await sourceItem.dragTo(targetItem, { force: true });
    await this.page.waitForTimeout(150);
  }

  /**
   * Counts the number of items in the sortable list.
   * @returns The total number of list items.
   */
  async countItems() {
    return await this.peopleList.count();
  }
}
