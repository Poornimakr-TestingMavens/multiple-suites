import { Page, Locator } from "@playwright/test";

export class DragAndDropPage {
    readonly page: Page;
    readonly interactionsLink: Locator;
    readonly dragAndDropLink: Locator;
    readonly staticLink: Locator;
    readonly angularImg: Locator;
    readonly mongoImg: Locator;
    readonly nodeImg: Locator;
    readonly targetBox: Locator;

    constructor(page: Page) {
        this.page = page;
        this.interactionsLink = page.locator('//a[text()="Interactions "]');
        this.dragAndDropLink = page.locator('//a[text()="Drag and Drop "]');
        this.staticLink = page.locator('//a[text()="Static "]');
        this.angularImg = page.locator('//img[@id="angular"]');
        this.mongoImg = page.locator('//img[@id="mongo"]');
        this.nodeImg = page.locator('//img[@id="node"]');
        this.targetBox = page.locator('//div[@id="droparea"]'); // Target drop area
    }

    async navigateToDragAndDrop() {
        await this.interactionsLink.click();
        await this.dragAndDropLink.click();
        await this.staticLink.click();
    }

    async dragAngular() {
        await this.angularImg.dragTo(this.targetBox);
    }

    async dragMongo() {
        await this.mongoImg.dragTo(this.targetBox);
    }

    async dragNode() {
        await this.nodeImg.dragTo(this.targetBox);
    }
}
