import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../../pages/pages-QA-playground/basePage";

/**
 * Page Object Model for the Shadow DOM component.
 * Handles interactions with elements inside the Shadow DOM structure.
 */
export class ShadowDOMPage extends BasePage {
  readonly page: Page;
  readonly shadowDomLink: Locator;
  readonly progressBar: Locator;

  /**
   * @param page - The Playwright Page instance representing the current browser page.
   */
  constructor(page: Page) {
    super(page);
    this.page = page;
    this.shadowDomLink = page.locator('//h3[text()="Shadow DOM"]');
    this.progressBar = page.locator("progress-bar");
  }

  /**
   * Navigates to the Shadow DOM section by clicking its link.
   */
  async gotoshadowdom() {
    await this.shadowDomLink.click();
  }

  /**
   * Clicks the button within the Shadow DOM section.
   * Useful for triggering progress or state changes.
   */
  async shadowButtonClick() {
    await this.page.locator("button").click();
  }
}

/**
 * Page Object Model for the Stars Rating Widget component.
 * Manages navigation, star selection, and validation actions.
 */
export class StarsRatingPage {
  readonly page: Page;
  readonly header: Locator;
  readonly starsContainer: Locator;

  /**
   * @param page - The Playwright Page instance representing the current browser page.
   */
  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('//h3[text()="Stars Rating Widget"]');
    this.starsContainer = page.locator('//div[@class="stars"]');
  }

  /**
   * Navigates to the Stars Rating Widget section and verifies the widget is visible.
   */
  async navigate() {
    await this.header.click();
    await expect(this.starsContainer).toBeVisible();
  }

  /**
   * Clicks on a specific star in the rating widget and returns the updated page URL.
   * @param starNumber - The number of the star to click (e.g., 1–5).
   * @returns The current page URL after clicking the star.
   */
  async clickStarAndValidate(starNumber: number) {
    const star = this.page.locator(
      `//label[contains(@class,"star-${starNumber}")]`
    );
    await star.click();
    return this.page.url();
  }
}
