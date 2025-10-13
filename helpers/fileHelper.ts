// helpers/fileHelper.ts
import fs from "fs";
import path from "path";
import * as XLSX from "xlsx";
import csvParser from "csv-parser";

// Use require for pdf-parse to avoid TS ESM default export error
const pdfParse = require("pdf-parse");

export class FileHelper {
  // Returns path to download folder
  static getDownloadPath(fileName: string) {
    return path.join(process.cwd(), "downloads", fileName);
  }

  // Reads PDF and returns text
  static async readPDF(fileName: string) {
    const filePath = this.getDownloadPath(fileName);
    if (!fs.existsSync(filePath)) {
      throw new Error(`PDF file not found: ${filePath}`);
    }
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer); // works with require
    return data.text;
  }

  // Reads CSV and returns array of rows
  static async readCSV(fileName: string) {
    const filePath = this.getDownloadPath(fileName);
    if (!fs.existsSync(filePath)) {
      throw new Error(`CSV file not found: ${filePath}`);
    }
    return new Promise<any[]>((resolve, reject) => {
      const results: any[] = [];
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on("data", (data) => results.push(data))
        .on("end", () => resolve(results))
        .on("error", reject);
    });
  }

  // Reads Excel and returns array of rows
  static async readExcel(fileName: string) {
    const filePath = this.getDownloadPath(fileName);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Excel file not found: ${filePath}`);
    }
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(sheet);
  }
}
