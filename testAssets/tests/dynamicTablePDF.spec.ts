import { test, expect,fs,path } from "../Pages/fixture";

test.describe("Dynamic table pdf download and validation", () => {
test("Add row and validate all table data in exported PDF", async ({
  pdfPage,
}) => {
  //const downloadDir = path.resolve("./.artifacts/downloads");

  let tableData: any;
  let pdfPath: any;

  // await test.step("Ensure download directory exists", async () => {
  //   if (!fs.existsSync(downloadDir)) fs.mkdirSync(downloadDir);
  // });

  await test.step("Navigate to PDF page", async () => {
    await pdfPage.navigate();
  });

  await test.step("Add a new row with specific data", async () => {
    await pdfPage.addRow("Row PDF Test", "Books", "11.99", "7");
  });

  await test.step("Get all headers and rows from the table", async () => {
    tableData = await pdfPage.getHeadersAndRows();
  });

  await test.step("Export the table data to PDF and validate the path", async () => {
    pdfPath = await pdfPage.exportToPDF();
    expect(fs.existsSync(pdfPath), "Pdf path does not exist").toBeTruthy();
  });

  await test.step("Validate all table data inside the exported PDF", async () => {
    await pdfPage.validateAllTableDataPDF(pdfPath, tableData);
  });
});
});
