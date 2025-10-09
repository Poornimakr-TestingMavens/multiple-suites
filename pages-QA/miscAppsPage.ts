import { Page, Locator } from "@playwright/test";

export class MiscAppsPage {
  readonly page: Page;

  // Covered Elements
  readonly coveredElementsLink: Locator;
  readonly instructionText: Locator;
  readonly fugitiveLink: Locator;

  // Onboarding Modal Popup
  readonly onboardingLink: Locator;
  readonly welcomeText: Locator;
  readonly menuButton: Locator;
  readonly modalTitle: Locator;

  // Right-Click Context Menu
  readonly contextMenuLink: Locator;
  readonly messageParagraph: Locator;
  readonly contextArea: Locator;
  readonly previewOption: Locator;
  readonly shareOption: Locator;
  readonly twitterOption: Locator;

  constructor(page: Page) {
    this.page = page;

    // Covered Elements
    this.coveredElementsLink = page.locator('//h3[text()="Covered Elements"]');
    this.instructionText = page.locator('//p[text()="Click the button below"]');
    this.fugitiveLink = page.locator('//a[@id="fugitive"]');

    // Onboarding Modal Popup
    this.onboardingLink = page.locator('//h3[text()="Onboarding Modal Popup"]');
    this.welcomeText = page.locator('//a[text()="Welcome on board!"]');
    this.menuButton = page.locator('//label[@class="menu-btn"]');
    this.modalTitle = page.locator('//div[@class="title"]');

    // Right-Click Context Menu
    this.contextMenuLink = page.locator('//h3[text()="Right-Click Context Menu"]');
    this.messageParagraph = page.locator('//p[@id="msg"]');
    this.contextArea = page.locator('#contextArea');
    this.previewOption = page.locator('//span[text()="Preview"]');
    this.shareOption = page.locator('//span[text()="Share"]');
    this.twitterOption = page.locator('//span[text()="Twitter"]');
  }

  async openCoveredElements() {
    await this.coveredElementsLink.click();
    await this.page.waitForTimeout(500);
  }

  async openOnboardingModal() {
    await this.onboardingLink.click();
    await this.page.waitForTimeout(500);
    await this.menuButton.click();
  }

  
}
