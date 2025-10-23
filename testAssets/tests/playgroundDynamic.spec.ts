import { test, expect,fs,path,XLSX} from "../pages/fixture";


test.describe("Dynamic table excel download and validation", () => {
test("Add row and validate all table data in exported excel", async ({
  tablePage,
}) => {
  const downloadDir = path.resolve("./.artifacts/downloads");

  await test.step("Ensure download directory exists", async () => {
    if (!fs.existsSync(downloadDir)) fs.mkdirSync(downloadDir);
  });

  await test.step("Navigate to the table page", async () => {
    await tablePage.navigate();
  });

  const rowData = {
    name: "New Item",
    category: "Electronics",
    price: "1200",
    stock: "10",
  };

  await test.step("Add a new row with specific data", async () => {
    await tablePage.addRow(
      rowData.name,
      rowData.category,
      rowData.price,
      rowData.stock
    );
  });

  await test.step("Export table data to Excel", async () => {
    await tablePage.exportToExcel(downloadDir);
  });

  const exportedFile = path.join(downloadDir, "exported_table.xlsx");

  await test.step("Verify the exported Excel file exists", async () => {
    expect(
      fs.existsSync(exportedFile),
      "Exported file is not found"
    ).toBeTruthy();
  });

  await test.step("Read Excel content and verify added row exists", async () => {
    const workbook = XLSX.readFile(exportedFile);
    const sheetName = workbook.SheetNames[0];
    const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const addedRow = sheet.find(
      (row: any) =>
        row.name?.toLowerCase() === rowData.name.toLowerCase() &&
        row.category?.toLowerCase() === rowData.category.toLowerCase() &&
        String(row.price) === rowData.price &&
        String(row.stock) === rowData.stock
    );
    expect(
      addedRow,
      "Expected added row to appear in Excel export"
    ).toBeTruthy();
  });
});
});
