import { test, expect } from "../pages/fixture";

test.describe("Visual testing and ui testing on playground", () => {
  test("Validate export button colors", async ({ playgco }) => {
    await test.step("Launch the website", async () => {
      await playgco.launchWebsite();
    });

    await test.step("Get export button colors and validate their RGB values", async () => {
      const { excelColor, csvColor, pdfColor } =
        await playgco.getExportButtonColors();
      expect(excelColor).toBe("rgb(22, 163, 74)");
      expect(csvColor).toBe("rgb(37, 99, 235)");
      expect(pdfColor).toBe("rgb(220, 38, 38)");
    });
  });

  test("Validate images of a product", async ({ playgco }) => {
    await test.step("Launch the product web page", async () => {
      await playgco.LaunchProdWEb();
    });

    await test.step("Validate product image using screenshot comparison", async () => {
      await playgco.asyncValidateProd();
      await expect(playgco.prod1Img1).toHaveScreenshot("DATA/Headset.png");
    });
  });
});
