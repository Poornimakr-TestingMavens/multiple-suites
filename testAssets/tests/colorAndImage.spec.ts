import { test, expect } from "../pages/pages-QA-playground/fixtures";

test.describe("Dynamic Table Export - Button Color Validations", () => {
  test.only("Verify button colors", async ({ shopPage, testData }) => {
    const colorMap = testData.dynamicTable.buttonColors;

    await test.step("Navigate to Dynamic Table Export page", async () => {
      await shopPage.navigate();
    });

    await test.step('Verify "Add Row" button color', async () => {
      const color = await shopPage.getButtonColor(shopPage.addRowButton);
      expect(
        color,
        `"Add Row" button color mismatch: expected ${colorMap.addRow}, but found ${color}`
      ).toBe(colorMap.addRow);
    });

    await test.step('Verify "Export to Excel" button color', async () => {
      const color = await shopPage.getButtonColor(shopPage.exportExcelButton);
      expect(
        color,
        `"Export to Excel" button color mismatch: expected ${colorMap.exportExcel}, but found ${color}`
      ).toBe(colorMap.exportExcel);
    });

    await test.step('Verify "Export to CSV" button color', async () => {
      const color = await shopPage.getButtonColor(shopPage.exportCsvButton);
      expect(
        color,
        `"Export to CSV" button color mismatch: expected ${colorMap.exportCsv}, but found ${color}`
      ).toBe(colorMap.exportCsv);
    });

    await test.step('Verify "Export to PDF" button color', async () => {
      const color = await shopPage.getButtonColor(shopPage.exportPdfButton);
      expect(
        color,
        `"Export to PDF" button color mismatch: expected ${colorMap.exportPdf}, but found ${color}`
      ).toBe(colorMap.exportPdf);
    });
  });
});
