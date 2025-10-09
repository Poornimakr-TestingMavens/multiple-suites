import { Page, Locator, expect } from "@playwright/test";

export class TagsInputPage {
  readonly page: Page;
  readonly tagsInputLink: Locator;
  readonly inputField: Locator;
  readonly tagElements: Locator;
  readonly removeAllButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // The card to open the Tags Input Box app
    this.tagsInputLink = page.locator('//h3[text()="Tags Input Box"]');
    // The input field for adding tags
    this.inputField = page.locator('//input[@type="text"]');
    // Existing tags on the page
    this.tagElements = page.locator('.tag'); 
    // Remove all tags button
    this.removeAllButton = page.locator('button:text("Remove All")');
  }

  // Navigate to Tags Input Box app
  async navigate() {
    await this.tagsInputLink.scrollIntoViewIfNeeded();
    await this.tagsInputLink.click();
    await expect(this.inputField).toBeVisible();
  }

  // Add a tag by typing and pressing Enter
  async addTag(tag: string) {
    const currentCount = await this.getTagCount();
    if (currentCount >= 10) return; // do not allow more than 10 tags
    await this.inputField.fill(tag);
    await this.inputField.press("Enter");
  }

  // Get the number of tags currently added
  async getTagCount(): Promise<number> {
    return await this.tagElements.count();
  }

  // Get all tag texts as an array
  async getAllTags(): Promise<string[]> {
    const count = await this.getTagCount();
    const tags: string[] = [];
    for (let i = 0; i < count; i++) {
      tags.push((await this.tagElements.nth(i).textContent())?.trim() ?? "");
    }
    return tags;
  }

  // Remove all tags
  async removeAllTags() {
    if (await this.removeAllButton.isVisible()) {
      await this.removeAllButton.click();
    }
  }
}
