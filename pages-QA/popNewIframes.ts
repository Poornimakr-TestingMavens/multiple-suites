import { test, expect, Page, Locator } from "@playwright/test";
import { NEW_TAB_PAGE_URL, NEW_TAB_PAGE_HEADER } from "../utils/urls";

/**
 * Page Object Model for handling the "New Tab" page and related actions.
 */
class NewTabPage {
  readonly page: Page;
  readonly header: Locator;
  readonly openLink: Locator;
  readonly newPageUrl = NEW_TAB_PAGE_URL;
  readonly newPageHeaderText = NEW_TAB_PAGE_HEADER;

  /**
   * Initializes locators and test data for the New Tab page.
   * @param page Playwright Page instance representing the current browser context.
   */
  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('//h3[text()="New Tab"]');
    this.openLink = page.locator('//a[text()="Open New Tab"]');
  }

  /**
   * Navigates to the New Tab section and returns the locator for the "Open New Tab" link.
   * @returns Locator for the "Open New Tab" link.
   */
  async navigate() {
    await this.header.click();
    return this.openLink;
  }

  /**
   * Opens a new browser tab by clicking the "Open New Tab" link and waits for it to load.
   * @returns The newly opened Playwright Page instance.
   */
  async openNewTab() {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent("page"),
      this.openLink.click(),
    ]);
    await newPage.waitForLoadState();
    return newPage;
  }

  /**
   * Gets the header locator for the newly opened tab.
   * This is defined as a method because the locator belongs to a different Page instance.
   * @param newPage The newly opened Playwright Page instance.
   * @returns Locator for the header element on the new tab page.
   */
  getNewPageHeaderLocator(newPage: Page) {
    return newPage.locator(`//h1[text()="${this.newPageHeaderText}"]`);
  }
}

/**
 * Page Object Model for handling the "Pop-Up Window" page and its interactions.
 */
class PopUpPage {
  readonly page: Page;
  readonly header: Locator;
  readonly infoText: Locator;
  readonly openLink: Locator;
  readonly submitButton: Locator;

  /**
   * Initializes locators for the Pop-Up Window page.
   * @param page Playwright Page instance representing the current browser context.
   */
  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('//h3[text()="Pop-Up Window"]');
    this.infoText = page.locator('//p[@id="info"]');
    this.openLink = page.locator('//a[text()="Open"]');
    this.submitButton = page.locator('//button[text()="Submit"]');
  }

  /**
   * Navigates to the Pop-Up Window section and verifies the presence of info text.
   */
  async navigate() {
    await this.header.click();
    await expect(this.infoText).toBeVisible();
  }

  /**
   * Handles opening and closing of the pop-up window.
   * Waits for the pop-up to appear, interacts with it, and ensures it closes properly.
   */
  async handlePopUp() {
    const [popup] = await Promise.all([
      this.page.context().waitForEvent("page"),
      this.openLink.click(),
    ]);

    await popup.waitForLoadState();
    await expect(popup.locator('//button[text()="Submit"]')).toBeVisible();

    const popupClosed = popup.waitForEvent("close");
    await popup.locator('//button[text()="Submit"]').click();
    await popupClosed; // Wait until popup actually closes
  }
}

/**
 * Page Object Model for handling the "Nested Iframe" page and interactions within iframes.
 */
class NestedIframePage {
  readonly page: Page;
  readonly header: Locator;
  readonly iframeOuter = "#frame1";
  readonly iframeInner = "#frame2";
  readonly buttonLocator = "text=Click Me";
  readonly messageLocator = "#msg";

  /**
   * Initializes locators for the Nested Iframe page.
   * @param page Playwright Page instance representing the current browser context.
   */
  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('//h3[text()="Nested Iframe"]');
  }

  /**
   * Navigates to the Nested Iframe section.
   */
  async navigate() {
    await this.header.click();
  }

  /**
   * Clicks the button inside nested iframes and returns the locator for the resulting message.
   * @returns Locator for the message element displayed after clicking the button.
   */
  async clickButtonAndGetMessageLocator() {
    const button = this.page
      .frameLocator(this.iframeOuter)
      .frameLocator(this.iframeInner)
      .locator(this.buttonLocator);

    await button.click();

    return this.page
      .frameLocator(this.iframeOuter)
      .frameLocator(this.iframeInner)
      .locator(this.messageLocator);
  }
}

export { NewTabPage, PopUpPage, NestedIframePage };
