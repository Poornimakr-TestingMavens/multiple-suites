import { Page, Locator } from "@playwright/test";

/**
 * Page Object Model for the "Drag and Drop" component.
 * Handles navigation to the Drag and Drop section and dragging images to the target area.
 */
export class DragAndDropPage {
  readonly page: Page;
  readonly interactionsLink: Locator;
  readonly dragAndDropLink: Locator;
  readonly staticLink: Locator;
  readonly angularImg: Locator;
  readonly mongoImg: Locator;
  readonly nodeImg: Locator;
  readonly targetBox: Locator;

  /**
   * Initializes all locators for the Drag and Drop page.
   * @param page - The Playwright Page instance representing the current browser page.
   */
  constructor(page: Page) {
    this.page = page;
    this.interactionsLink = page.locator('//a[text()="Interactions "]');
    this.dragAndDropLink = page.locator('//a[text()="Drag and Drop "]');
    this.staticLink = page.locator('//a[text()="Static "]');
    this.angularImg = page.locator('//img[@id="angular"]');
    this.mongoImg = page.locator('//img[@id="mongo"]');
    this.nodeImg = page.locator('//img[@id="node"]');
    this.targetBox = page.locator('//div[@id="droparea"]');
  }

  /**
   * Navigates to the "Drag and Drop" section by clicking the Interactions, Drag and Drop, and Static links.
   */
  async navigateToDragAndDrop() {
    await this.interactionsLink.click();
    await this.dragAndDropLink.click();
    await this.staticLink.click();
  }

  /**
   * Drags the Angular image to the target drop area.
   */
  async dragAngular() {
    await this.angularImg.dragTo(this.targetBox);
  }

  /**
   * Drags the Mongo image to the target drop area.
   */
  async dragMongo() {
    await this.mongoImg.dragTo(this.targetBox);
  }

  /**
   * Drags the Node image to the target drop area.
   */
  async dragNode() {
    await this.nodeImg.dragTo(this.targetBox);
  }
}
