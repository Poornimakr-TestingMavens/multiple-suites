import { Page, Locator } from "@playwright/test";

export class ProductPage {
  readonly page: Page;
  readonly productImage: Locator;
  readonly shopImage: Locator;
  readonly cartImage: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productImage = page.locator("img[alt*='Sony WH-1000XM4']");
    this.shopImage = page.locator("img[alt*='Sony WH-1000XM4']");
    this.cartImage = page.locator("img.cart-item-image, img[alt*='Sony WH-1000XM4']");
    this.addToCartButton = page.getByRole("button", { name: /Add to Cart/i });
  }

  async navigateToProductPage() {
    await this.page.goto(
      "https://www.playground.testingmavens.tools/product/668c0a48b27d61c76b4f4aee",
      { waitUntil: "networkidle" }
    );
  }

  async navigateToShopPage() {
    await this.page.goto(
      "https://www.playground.testingmavens.tools/shop?page=1&categories=Headsets",
      { waitUntil: "networkidle" }
    );
  }

  async navigateToCartPage() {
    await this.page.goto("https://www.playground.testingmavens.tools/cart", {
      waitUntil: "networkidle",
    });
  }

  async addProductToCart() {
    if (await this.addToCartButton.isVisible()) {
      await this.addToCartButton.click();
      await this.page.waitForLoadState("networkidle");
    }
  }
}
