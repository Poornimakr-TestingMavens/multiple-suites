import { test, expect } from "../pages/pages-QA-playground/fixtures";

test.describe("Sony WH-1000XM4 Image Consistency Validation", () => {
  test("Validate Sony WH-1000XM4 image across Product, Shop, and Cart pages", async ({
    productPage,
  }) => {

    await test.step("Validate Product Page image", async () => {
      await productPage.navigateToProductPage();

      await expect(
        productPage.productImage,
        "Product Page: Sony WH-1000XM4 image not visible."
      ).toBeVisible();

      await expect(
        productPage.productImage,
        "Product Page: Sony WH-1000XM4 image does not match baseline screenshot."
      ).toHaveScreenshot("wh1000xm4-product.png", {
        maxDiffPixelRatio: 0.05,
      });
    });

    await test.step("Validate Shop Page image", async () => {
      await productPage.navigateToShopPage();

      await expect(
        productPage.shopImage,
        "Shop Page: Sony WH-1000XM4 image not visible."
      ).toBeVisible();

      await expect(
        productPage.shopImage,
        "Shop Page: Sony WH-1000XM4 image does not match baseline screenshot."
      ).toHaveScreenshot("wh1000xm4-shop.png", {
        maxDiffPixelRatio: 0.05,
      });
    });

    await test.step("Validate Cart Page image", async () => {
      await productPage.addProductToCart();
      await productPage.navigateToCartPage();

      await expect(
        productPage.cartImage,
        "Cart Page: Sony WH-1000XM4 image not visible or failed to load."
      ).toBeVisible();

      await expect(
        productPage.cartImage,
        "Cart Page: Sony WH-1000XM4 image does not match baseline screenshot."
      ).toHaveScreenshot("wh1000xm4-cart.png", {
        maxDiffPixelRatio: 0.05,
      });
    });
  });
});
