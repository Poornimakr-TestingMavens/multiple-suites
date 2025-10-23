import { Locator, Page, FrameLocator } from "@playwright/test";
import { BasePage } from "../../pages/pages-QA-playground/basePage";


/**
 * Page Object for Nested Iframe section.
 * Provides locators and actions without assertions.
 */
export class ChangeableIframePage extends BasePage {
  readonly firstIframe: FrameLocator;
  readonly secondIframe: FrameLocator;
  readonly button: Locator;
  readonly infoMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.firstIframe = page.frameLocator("#frame1");
    this.secondIframe = this.firstIframe.frameLocator("#frame2");
    this.button = this.secondIframe.locator("text=Click Me");
    this.infoMessage = this.secondIframe.locator("#msg");
  }

  /** Click the button inside nested iframe */
  async clickButton(): Promise<void> {
    await this.button.scrollIntoViewIfNeeded();
    await this.button.click();
  }
}
