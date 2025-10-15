import { test, expect } from "../pages/pages-QA/fixtures";

test.describe("Playground + Screener Validations", () => {
  test("Register on Screener.in and verify email content", async ({
    registerPage,
    testData,
  }) => {
    const { found, content } = await registerPage.registerAndCheckEmail();
    expect(found, "Expected registration email to be found").toBeTruthy();
    for (const text of testData.screener.expectedTexts) {
      expect(content, `Expected email content to include "${text}"`).toContain(
        text
      );
    }
  });
  test("Add row and verify in exported Excel and PDF", async ({
    dynamicTableExport,
    fs,
    XLSX,
    testData,
  }) => {
    const downloadDir = testData.downloadDir;
    await dynamicTableExport.navigate();
    const rowData = testData.dynamicTable.newRow;
    await dynamicTableExport.addRow(
      rowData.name,
      rowData.category,
      rowData.price,
      rowData.stock
    );
    const exportedExcel = await dynamicTableExport.exportToExcel(downloadDir);
    expect(
      fs.existsSync(exportedExcel),
      "Excel file should exist"
    ).toBeTruthy();

    const workbook = XLSX.readFile(exportedExcel);
    const sheet = XLSX.utils.sheet_to_json(
      workbook.Sheets[workbook.SheetNames[0]]
    );
    const addedRow = sheet.find(
      (row: any) =>
        row.name?.toLowerCase() === rowData.name.toLowerCase() &&
        row.category?.toLowerCase() === rowData.category.toLowerCase() &&
        String(row.price) === rowData.price &&
        String(row.stock) === rowData.stock
    );
    expect(addedRow, "Added row should appear in Excel export").toBeTruthy();
    const exportedPDF = await dynamicTableExport.exportToPDF(downloadDir);
    expect(fs.existsSync(exportedPDF), "PDF file should exist").toBeTruthy();

    const pdfText = await dynamicTableExport.extractPDFText(exportedPDF);
    for (const value of Object.values(rowData)) {
      expect(pdfText, `Expected PDF content to include "${value}"`).toContain(
        value.toLowerCase()
      );
    }
  });

  test.only("Validate Static Table Export - Excel and PDF", async ({
    staticTablePage,
    testData,
  }) => {
    await staticTablePage.goToStaticTablePage();
    const tableData = await staticTablePage.getTableData();

    if (testData.staticTable.validateExcel) {
      const excelPath = await staticTablePage.downloadExcel();
      const excelData = await staticTablePage.parseExcel(excelPath);

      expect(excelData.headers).toEqual(
        tableData.headers.map((h) => h.toLowerCase().trim())
      );
      expect(excelData.rows).toEqual(tableData.rows);
    }
    if (testData.staticTable.validatePDF) {
      const pdfPath = await staticTablePage.downloadPDF();
      const pdfText = await staticTablePage.extractPDFText(pdfPath);
      const expectedText = testData.staticTable.expectedPDFText
        .replace(/\s+/g, " ")
        .trim();

      expect(
        pdfText,
        "PDF content should include expected employee data"
      ).toContain(expectedText);
    }
  });
});
