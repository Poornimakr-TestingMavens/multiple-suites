import { Page, Locator } from "@playwright/test";

/**
 * Represents the Product Page and related pages (Shop, Cart)
 * for performing image consistency and cart operations.
 */
export class ProductPage {
  /** Playwright Page instance. */
  readonly page: Page;

  /** Locator for the product image on the Product page. */
  readonly productImage: Locator;

  /** Locator for the product image on the Shop page. */
  readonly shopImage: Locator;

  /** Locator for the product image on the Cart page. */
  readonly cartImage: Locator;

  /** Locator for the "Add to Cart" button. */
  readonly addToCartButton: Locator;

  /**
   * Initializes the ProductPage class with locators.
   * @param {Page} page - The Playwright Page object.
   */
  constructor(page: Page) {
    this.page = page;
    this.productImage = page.locator("img[alt*='Sony WH-1000XM4']");
    this.shopImage = page.locator("img[alt*='Sony WH-1000XM4']");
    this.cartImage = page.locator("img.cart-item-image, img[alt*='Sony WH-1000XM4']");
    this.addToCartButton = page.getByRole("button", { name: /Add to Cart/i });
  }

  /**
   * Navigates directly to the product details page.
   * Waits until the network is idle before proceeding.
   * 
   * @async
   * @returns {Promise<void>}
   */
  async navigateToProductPage(): Promise<void> {
    await this.page.goto(
      "https://www.playground.testingmavens.tools/product/668c0a48b27d61c76b4f4aee",
      { waitUntil: "networkidle" }
    );
  }

  /**
   * Navigates to the Shop page filtered by "Headsets" category.
   * Waits until all network requests have finished.
   * 
   * @async
   * @returns {Promise<void>}
   */
  async navigateToShopPage(): Promise<void> {
    await this.page.goto(
      "https://www.playground.testingmavens.tools/shop?page=1&categories=Headsets",
      { waitUntil: "networkidle" }
    );
  }

  /**
   * Navigates to the Cart page.
   * Waits until the network is idle to ensure all items are loaded.
   * 
   * @async
   * @returns {Promise<void>}
   */
  async navigateToCartPage(): Promise<void> {
    await this.page.goto("https://www.playground.testingmavens.tools/cart", {
      waitUntil: "networkidle",
    });
  }

  /**
   * Adds the Sony WH-1000XM4 product to the cart.
   * Performs a visibility check before clicking the button.
   * Waits for all network requests to finish after adding.
   * 
   * @async
   * @returns {Promise<void>}
   */
  async addProductToCart(): Promise<void> {
    if (await this.addToCartButton.isVisible()) {
      await this.addToCartButton.click();
      await this.page.waitForLoadState("networkidle");
    }
  }
}
