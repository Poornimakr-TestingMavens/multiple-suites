import { Page, Locator } from "@playwright/test";

export class rightContextPage {
  readonly page: Page;
  readonly contextMenuLink: Locator;
  readonly contextArea: Locator;
  readonly messageParagraph: Locator;
  readonly shareMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.contextMenuLink = page.locator('//h3[text()="Right-Click Context Menu"]');
    this.contextArea = page.locator('#contextArea');
    this.messageParagraph = page.locator('#msg');
    this.shareMenu = page.locator('text=Share'); // hoverable submenu
  }

  async openContextMenuSection() {
    await this.contextMenuLink.click();
    await this.contextArea.waitFor({ state: "visible" });
  }

  async rightClickOnArea() {
    await this.contextArea.waitFor({ state: "visible" });
    await this.contextArea.click({ button: "right", force: true });
  }

  async clickMenuItem(itemName: string) {
    const menuItem = this.page.locator(`.menu-item >> text=${itemName}`);
    await menuItem.waitFor({ state: "visible" });
    await menuItem.click({ force: true });
  }

  async hoverMenuItem(itemName: string) {
    const menuItem = this.page.locator(`.menu-item >> text=${itemName}`);
    await menuItem.waitFor({ state: "visible" });
    await menuItem.hover();
  }

  async getMessageText() {
    return this.messageParagraph.textContent();
  }
}
