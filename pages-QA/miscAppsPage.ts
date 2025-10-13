import { Page, Locator } from "@playwright/test";

/**
 * Page Object Model for the Miscellaneous Apps page.
 * Contains locators and reusable methods to interact with:
 * - Covered Elements
 * - Onboarding Modal Popup
 * - Right-Click Context Menu
 */
export class MiscAppsPage {
  readonly page: Page;

  readonly coveredElementsLink: Locator;
  readonly instructionText: Locator;
  readonly fugitiveLink: Locator;

  readonly onboardingLink: Locator;
  readonly welcomeText: Locator;
  readonly menuButton: Locator;
  readonly modalTitle: Locator;

  readonly contextMenuLink: Locator;
  readonly messageParagraph: Locator;
  readonly contextArea: Locator;
  readonly previewOption: Locator;
  readonly shareOption: Locator;
  readonly twitterOption: Locator;

  /**
   * Initializes the MiscAppsPage with all locators defined for its sections.
   * @param {Page} page - The Playwright Page instance used for browser interactions.
   */
  constructor(page: Page) {
    this.page = page;

    // Covered Elements
    this.coveredElementsLink = page.locator('//h3[text()="Covered Elements"]');
    this.instructionText = page.locator('//p[text()="Click the button below"]');
    this.fugitiveLink = page.locator('//a[@id="fugitive"]');

    this.onboardingLink = page.locator('//h3[text()="Onboarding Modal Popup"]');
    this.welcomeText = page.locator('//a[text()="Welcome on board!"]');
    this.menuButton = page.locator('//label[@class="menu-btn"]');
    this.modalTitle = page.locator('//div[@class="title"]');

    this.contextMenuLink = page.locator('//h3[text()="Right-Click Context Menu"]');
    this.messageParagraph = page.locator('//p[@id="msg"]');
    this.contextArea = page.locator("#contextArea");
    this.previewOption = page.locator('//span[text()="Preview"]');
    this.shareOption = page.locator('//span[text()="Share"]');
    this.twitterOption = page.locator('//span[text()="Twitter"]');
  }

  /**
   * Opens the "Covered Elements" section of the Misc Apps page.
   *
   * Steps performed:
   * 1. Clicks the "Covered Elements" link.
   * 2. Waits briefly for the page section to load.
   *
   * @returns {Promise<void>} Resolves when the section is opened.
   */
  async openCoveredElements(): Promise<void> {
    await this.coveredElementsLink.click();
    await this.page.waitForTimeout(500);
  }

  /**
   * Opens the "Onboarding Modal Popup" section and triggers the modal view.
   *
   * Steps performed:
   * 1. Clicks the "Onboarding Modal Popup" link.
   * 2. Waits briefly to ensure the modal elements load.
   * 3. Clicks the menu button to reveal the onboarding modal.
   *
   * @returns {Promise<void>} Resolves once the modal is visible.
   */
  async openOnboardingModal(): Promise<void> {
    await this.onboardingLink.click();
    await this.page.waitForTimeout(500);
    await this.menuButton.click();
  }
}
