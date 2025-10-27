import { Page, Locator } from "@playwright/test";
import { CommonPage } from "./commonPage";

/**
 * Page Object Model for the "Drag and Drop" component of the Automation Demo Site.
 * Handles navigation to the Drag and Drop section and dragging images to the target area.
 */
export class DragAndDropPage extends CommonPage {
  /** Playwright Page instance */
  readonly page: Page;

  /** Locator for the "Interactions" link in the menu */
  readonly interactionsLink: Locator;

  /** Locator for the "Drag and Drop" link in the menu */
  readonly dragAndDropLink: Locator;

  /** Locator for the "Static" link in the Drag and Drop section */
  readonly staticLink: Locator;

  /** Locator for the Angular image to be dragged */
  readonly angularImg: Locator;

  /** Locator for the Mongo image to be dragged */
  readonly mongoImg: Locator;

  /** Locator for the Node image to be dragged */
  readonly nodeImg: Locator;

  /** Locator for the target drop area */
  readonly targetBox: Locator;

  /** Locator for the Angular image inside the target area after drag */
  readonly droppedAngular: Locator;

  /** Locator for the Mongo image inside the target area after drag */
  readonly droppedMongo: Locator;

  /** Locator for the Node image inside the target area after drag */
  readonly droppedNode: Locator;

  /**
   * Initializes all locators for the Drag and Drop page.
   * @param page - Playwright Page instance representing the current browser page.
   */
  constructor(page: Page) {
    super(page);
    this.page = page;
    this.interactionsLink = page.locator('//a[text()="Interactions "]');
    this.dragAndDropLink = page.locator('//a[text()="Drag and Drop "]');
    this.staticLink = page.locator('//a[text()="Static "]');
    this.angularImg = page.locator('//img[@id="angular"]');
    this.mongoImg = page.locator('//img[@id="mongo"]');
    this.nodeImg = page.locator('//img[@id="node"]');
    this.targetBox = page.locator('//div[@id="droparea"]');

    // Dropped elements inside the target box
    this.droppedAngular = this.targetBox.locator('#angular');
    this.droppedMongo = this.targetBox.locator('#mongo');
    this.droppedNode = this.targetBox.locator('#node');
  }

  /**
   * Navigates to the "Drag and Drop" section by clicking
   * the Interactions, Drag and Drop, and Static links sequentially.
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
