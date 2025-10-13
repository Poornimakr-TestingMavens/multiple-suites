import { Page, Locator, expect } from "@playwright/test";

/**
 * Page Object Model for the "Tags Input Box" component.
 * Handles navigation, adding, retrieving, and removing tags in the input box.
 */
export class TagsInputPage {
  readonly page: Page;
  readonly tagsInputLink: Locator;
  readonly inputField: Locator;
  readonly tagElements: Locator;
  readonly removeAllButton: Locator;

  /**
   * Initializes all locators for the Tags Input page.
   * @param page - The Playwright Page instance representing the current browser page.
   */
  constructor(page: Page) {
    this.page = page;
    this.tagsInputLink = page.locator('//h3[text()="Tags Input Box"]');
    this.inputField = page.locator('//input[@type="text"]');
    this.tagElements = page.locator(".tag");
    this.removeAllButton = page.locator('button:text("Remove All")');
  }

  /**
   * Navigates to the "Tags Input Box" section and verifies the input field is visible.
   */
  async navigate() {
    await this.tagsInputLink.scrollIntoViewIfNeeded();
    await this.tagsInputLink.click();
    await expect(this.inputField).toBeVisible();
  }

  /**
   * Adds a new tag to the input field if the total count is less than 10.
   * @param tag - The text of the tag to add.
   */
  async addTag(tag: string) {
    const currentCount = await this.getTagCount();
    if (currentCount >= 10) return;
    await this.inputField.fill(tag);
    await this.inputField.press("Enter");
  }

  /**
   * Returns the current number of tags in the input box.
   * @returns The total count of tags.
   */
  async getTagCount(): Promise<number> {
    return await this.tagElements.count();
  }

  /**
   * Retrieves the text of all tags currently in the input box.
   * @returns An array of tag strings.
   */
  async getAllTags(): Promise<string[]> {
    const count = await this.getTagCount();
    const tags: string[] = [];
    for (let i = 0; i < count; i++) {
      tags.push((await this.tagElements.nth(i).textContent())?.trim() ?? "");
    }
    return tags;
  }

  /**
   * Removes all tags if the "Remove All" button is visible.
   */
  async removeAllTags() {
    if (await this.removeAllButton.isVisible()) {
      await this.removeAllButton.click();
    }
  }
}
