import { test, fs } from "../Pages/fixture";


test.describe("Static Table Export Excel Validations", () => {
  test.beforeEach(async ({ page, staticTablePage }) => {
    await test.step("Navigate to components page and go to static table page", async () => {
      await page.goto("https://www.playground.testingmavens.tools/components");
      await staticTablePage.goToStaticTablePage();
    });
  });

  test("Validate Excel contains page table data", async ({
    staticTablePage,
  }) => {
    let tableData: any;
    let excelPath: any;

    await test.step("Get table data from page", async () => {
      tableData = await staticTablePage.getTableData();
    });

    await test.step("Download Excel file of the table data", async () => {
      excelPath = await staticTablePage.downloadExcel();
    });

    await test.step("Verify that the downloaded Excel file exists", async () => {
      if (!fs.existsSync(excelPath)) {
        throw new Error(`Excel file not found at path: ${excelPath}`);
      }
    });

    await test.step("Validate the Excel content matches the table data", async () => {
      await staticTablePage.validateExcel(excelPath, tableData);
    });
  });
});
