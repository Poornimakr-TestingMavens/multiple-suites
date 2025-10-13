import { Page, FrameLocator, Locator } from "@playwright/test";

/**
 * Page Object for Changeable Iframe page
 * Handles validation of messages in two iframes.
 */
export class ChangeableIframePage {
  readonly page: Page;
  readonly iframeSection: Locator;
  readonly firstIframe: FrameLocator;
  readonly secondIframe: FrameLocator;
  readonly firstIframeText: string;
  readonly secondIframeText: string;

  constructor(page: Page) {
    this.page = page;
    this.iframeSection = page.locator('//h3[text()="Changeable Iframe"]');
    this.firstIframe = page.frameLocator('(//iframe)[1]');
    this.secondIframe = page.frameLocator('(//iframe)[2]');
    this.firstIframeText = "Registration closes in";
    this.secondIframeText = "This is the end of the journey";
  }

  /** Navigate to Changeable Iframe section */
  async navigate() {
    await this.iframeSection.scrollIntoViewIfNeeded();
    await this.iframeSection.click();
  }

  /** Validate content in the first iframe */
  async validateFirstIframe() {
    const firstMessage = this.firstIframe.locator(`//*[contains(text(),"${this.firstIframeText}")]`);
    await firstMessage.waitFor({ state: "visible" });
  }

  /** Validate content in the second iframe */
  async validateSecondIframe() {
    const secondMessage = this.secondIframe.locator(`//*[contains(text(),"${this.secondIframeText}")]`);
    await secondMessage.waitFor({ state: "visible" });
  }
}
