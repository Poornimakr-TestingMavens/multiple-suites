import { Page, Locator } from "@playwright/test";
import fs from "fs";
import path from "path";

export class DownloadHelper {
  private page: Page;
  private downloadDir: string;

  constructor(page: Page) {
    this.page = page;
    this.downloadDir = path.resolve(process.cwd(), ".artifacts/downloads");
    this.ensureDownloadDir();
  }

  private ensureDownloadDir() {
    if (!fs.existsSync(this.downloadDir)) {
      fs.mkdirSync(this.downloadDir, { recursive: true });
    }
  }

  /**
   * Downloads a file by clicking the given locator
   * @param clickLocator - Locator to trigger download
   * @param fileName - Name to save the file as
   * @param timeout - Timeout in ms (default: 30000)
   * @returns Absolute path to downloaded file
   */
  async downloadFile(
    clickLocator: Locator, 
    fileName: string, 
    timeout: number = 30000
  ): Promise<string> {
    const filePath = path.join(this.downloadDir, fileName);
    
    try {
      const [download] = await Promise.all([
        this.page.waitForEvent("download", { timeout }),
        clickLocator.click(),
      ]);
      
      await download.saveAs(filePath);
      
      // Verify file was actually saved
      if (!fs.existsSync(filePath)) {
        throw new Error(`Downloaded file not found at: ${filePath}`);
      }
      
      return filePath;
    } catch (error) {
      if (error instanceof Error && error.message.includes('timeout')) {
        throw new Error(`Download timed out after ${timeout}ms for file: ${fileName}`);
      }
      throw new Error(`Download failed for file: ${fileName}. Error: ${error}`);
    }
  }

  /**
   * Downloads a file using suggested filename from download event
   * @param clickLocator - Locator to trigger download
   * @param timeout - Timeout in ms (default: 30000)
   * @returns Absolute path to downloaded file
   */
  async downloadFileWithSuggestedName(
    clickLocator: Locator, 
    timeout: number = 30000
  ): Promise<string> {
    try {
      const [download] = await Promise.all([
        this.page.waitForEvent("download", { timeout }),
        clickLocator.click(),
      ]);
      
      const fileName = await download.suggestedFilename();
      const filePath = path.join(this.downloadDir, fileName);
      
      await download.saveAs(filePath);
      
      // Verify file was actually saved
      if (!fs.existsSync(filePath)) {
        throw new Error(`Downloaded file not found at: ${filePath}`);
      }
      
      return filePath;
    } catch (error) {
      if (error instanceof Error && error.message.includes('timeout')) {
        throw new Error(`Download timed out after ${timeout}ms`);
      }
      throw new Error(`Download failed. Error: ${error}`);
    }
  }
}