//import { SHADOW_DOM_PAGE_URL, SHADOW_DOM_EXPECTED_PROGRESS } from "../utils/urls";
import { Page, Locator, expect } from "@playwright/test";


export class ShadowDOMPage {
  readonly page: Page;
  readonly shadowDomLink: Locator;
  readonly progressBar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shadowDomLink = page.locator('//h3[text()="Shadow DOM"]');
    this.progressBar = page.locator('progress-bar');
  }

  async gotoshadowdom() {
    await this.shadowDomLink.click();
  }

  async shadowButtonClick() {
    await this.page.locator('button').click();
  }
}
// Stars Rating Widget Page Object
export class StarsRatingPage {
  readonly page: Page;
  readonly header: Locator;
  readonly starsContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('//h3[text()="Stars Rating Widget"]');
    this.starsContainer = page.locator('//div[@class="stars"]');
  }

  async navigate() {
    await this.header.click();
    await expect(this.starsContainer).toBeVisible();
  }

  async clickStarAndValidate(starNumber: number) {
    const star = this.page.locator(`//label[contains(@class,"star-${starNumber}")]`);
    await star.click();
    return this.page.url();
  }
}
