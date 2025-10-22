import { test, expect,fs } from "../Pages/fixture";


test.describe("Static Table Export PDF Validations", () => {
  test.beforeEach(async ({ pdfPageE, page }) => {
    await test.step("Navigate to components page and go to static table page", async () => {
      await page.goto("https://www.playground.testingmavens.tools/components");
      await pdfPageE.goToStaticTablePage();
    });
  });

  test("Validate PDF contains page table data", async ({ pdfPageE }) => {
    let tableData: any;
    let pdfPath: any;

    await test.step("Get table data from page", async () => {
      tableData = await pdfPageE.getTableData();
    });

    await test.step("Download PDF of the table data", async () => {
      pdfPath = await pdfPageE.downloadPDF();
    });

    await test.step("Verify downloaded PDF file exists", async () => {
      expect(fs.existsSync(pdfPath), "Path file doesnot exist").toBeTruthy();
    });

    await test.step("Validate PDF content matches the table data", async () => {
      await pdfPageE.validatePDF(pdfPath, tableData);
    });
  });
});
