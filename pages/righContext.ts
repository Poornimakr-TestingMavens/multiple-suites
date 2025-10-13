import { Page, Locator } from "@playwright/test";

/**
 * Page Object Model for the "Right-Click Context Menu" component.
 * Handles navigation, right-click actions, menu interactions, and message retrieval.
 */
export class rightContextPage {
  readonly page: Page;
  readonly contextMenuLink: Locator;
  readonly contextArea: Locator;
  readonly messageParagraph: Locator;
  readonly shareMenu: Locator;

  /**
   * Initializes all locators for the Right-Click Context Menu page.
   * @param page - The Playwright Page instance representing the current browser page.
   */
  constructor(page: Page) {
    this.page = page;
    this.contextMenuLink = page.locator(
      '//h3[text()="Right-Click Context Menu"]'
    );
    this.contextArea = page.locator("#contextArea");
    this.messageParagraph = page.locator("#msg");
    this.shareMenu = page.locator("text=Share");
  }

  /**
   * Opens the Right-Click Context Menu section by clicking the section header.
   * Waits for the context area to become visible.
   */
  async openContextMenuSection() {
    await this.contextMenuLink.click();
    await this.contextArea.waitFor({ state: "visible" });
  }

  /**
   * Performs a right-click action on the context area.
   */
  async rightClickOnArea() {
    await this.contextArea.waitFor({ state: "visible" });
    await this.contextArea.click({ button: "right", force: true });
  }

  /**
   * Clicks a menu item in the context menu by its name.
   * @param itemName - The visible text of the menu item to click.
   */
  async clickMenuItem(itemName: string) {
    const menuItem = this.page.locator(`.menu-item >> text=${itemName}`);
    await menuItem.waitFor({ state: "visible" });
    await menuItem.click({ force: true });
  }

  /**
   * Hovers over a menu item in the context menu by its name.
   * @param itemName - The visible text of the menu item to hover.
   */
  async hoverMenuItem(itemName: string) {
    const menuItem = this.page.locator(`.menu-item >> text=${itemName}`);
    await menuItem.waitFor({ state: "visible" });
    await menuItem.hover();
  }

  /**
   * Retrieves the message text displayed after interacting with the context menu.
   * @returns The message text content as a string, or null if not found.
   */
  async getMessageText() {
    return this.messageParagraph.textContent();
  }
}
