import { test, expect, Page, Locator } from "@playwright/test";
import { NEW_TAB_PAGE_URL, NEW_TAB_PAGE_HEADER } from "../utils/urls";

class NewTabPage {
  readonly page: Page;
  readonly header: Locator;
  readonly openLink: Locator;
  readonly newPageUrl = NEW_TAB_PAGE_URL;
  readonly newPageHeaderText = NEW_TAB_PAGE_HEADER;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('//h3[text()="New Tab"]');
    this.openLink = page.locator('//a[text()="Open New Tab"]');
  }

  async navigate() {
    await this.header.click();
    return this.openLink;
  }

  async openNewTab() {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.openLink.click(),
    ]);
    await newPage.waitForLoadState();
    return newPage;
  }

  getNewPageHeaderLocator(newPage: Page) {
    return newPage.locator(`//h1[text()="${this.newPageHeaderText}"]`);
  }
}
//  Page Object for Pop-Up Window
class PopUpPage {
  readonly page: Page;
  readonly header: Locator;
  readonly infoText: Locator;
  readonly openLink: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('//h3[text()="Pop-Up Window"]');
    this.infoText = page.locator('//p[@id="info"]');
    this.openLink = page.locator('//a[text()="Open"]');
    this.submitButton = page.locator('//button[text()="Submit"]');
  }

  async navigate() {
    await this.header.click();
    await expect(this.infoText).toBeVisible();
  }

  async handlePopUp() {
  const [popup] = await Promise.all([
    this.page.context().waitForEvent('page'),
    this.openLink.click(),
  ]);

  await popup.waitForLoadState();
  await expect(popup.locator('//button[text()="Submit"]')).toBeVisible();

  // Listen for the popup close after clicking submit
  const popupClosed = popup.waitForEvent('close');
  await popup.locator('//button[text()="Submit"]').click();
  await popupClosed; // wait until popup actually closes
}
}

// Page Object for Nested Iframe
class NestedIframePage {
  readonly page: Page;
  readonly header: Locator;
  readonly iframeOuter = "#frame1";
  readonly iframeInner = "#frame2";
  readonly buttonLocator = "text=Click Me";
  readonly messageLocator = "#msg";

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('//h3[text()="Nested Iframe"]');
  }

  async navigate() {
    await this.header.click();
  }

  async clickButtonAndGetMessageLocator() {
    const button = this.page.frameLocator(this.iframeOuter)
                            .frameLocator(this.iframeInner)
                            .locator(this.buttonLocator);
    await button.click();
    return this.page.frameLocator(this.iframeOuter)
                    .frameLocator(this.iframeInner)
                    .locator(this.messageLocator);
  }
}

export { NewTabPage, PopUpPage, NestedIframePage };