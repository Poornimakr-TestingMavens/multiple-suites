import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../pages/pages-QA-playground/basePage";
/**
 * Page Object Model for the "Right-Click Context Menu" section.
 * Handles navigation, right-click actions, and menu item selection.
 */
export class RightContextPage extends BasePage {
  /** Locator for the "Right-Click Context Menu" header */
  readonly rightclickcontentLink: Locator;

  /** Locator for context menu items by text */
  readonly contextcontent: (menu: string) => Locator;

  /** Locator for the result message after menu click */
  readonly contextVal: Locator;

  /**
   * Initializes the RightContextPage with page locators.
   * @param page Playwright Page object
   */
  constructor(page: Page) {
    super(page);
    this.rightclickcontentLink = page.locator(
      '//h3[text()="Right-Click Context Menu"]'
    );
    this.contextcontent = (menu: string) =>
      page.locator(`//span[text()="${menu}"]`);
    this.contextVal = page.locator('//p[@id="msg"]');
  }

  /** Navigate to the Right-Click Context Menu section */
  async navtorightcontext() {
    await this.rightclickcontentLink.click();
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Perform a right-click and immediately click a menu item.
   * This prevents the menu from closing.
   * @param menu The menu item text to click
   */
  async rightClickAndSelectMenu(menu: string) {
    // Perform right-click at the specific coordinates
    await this.page.mouse.click(964, 258, { button: "right" });
    
    // Immediately click the menu item without waiting
    // (the menu stays open only briefly)
    await this.contextcontent(menu).click({ timeout: 2000 });
  }

  /**
   * Gets the current message text from the result area
   * @returns The trimmed message text or null
   */
  async getResultMessage(): Promise<string | null> {
    return await this.contextVal.textContent();
  }
}
