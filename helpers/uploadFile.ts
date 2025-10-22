import { Page, Locator, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

export class UploadHelper {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Uploads a file using the given locator
   * @param fileInputLocator - Locator for file input element
   * @param filePath - Path to file to upload
   * @param timeout - Timeout in ms (default: 10000)
   */
 async uploadFile(
    fileInputLocator: Locator, 
    filePath: string, 
    timeout: number = 10000
  ): Promise<void> {
    const resolvedPath = path.resolve(filePath);
    
    // Check if file exists - THIS IS WHERE FILE PATH VALIDATION HAPPENS
    try {
      if (!fs.existsSync(resolvedPath)) {
        throw new Error(`File not found: ${resolvedPath}`);
      }
    } catch (error) {
      throw new Error(`File path is invalid or inaccessible: ${resolvedPath}`);
    }

    try {
      // Wait for file input to be ready
      await expect(fileInputLocator).toBeVisible({ timeout });
      await expect(fileInputLocator).toBeEnabled({ timeout });
      
      // Upload the file - THIS IS WHERE THE ACTUAL UPLOAD HAPPENS
      await fileInputLocator.setInputFiles(resolvedPath);
      
    } catch (error) {
      if (error instanceof Error && error.message.includes('timeout')) {
        throw new Error(`Upload timed out after ${timeout}ms for file: ${resolvedPath}`);
      }
      throw new Error(`Failed to upload file: ${resolvedPath}. Error: ${error}`);
    }
  }
  /**
   * Uploads a file with additional wait after upload
   * @param fileInputLocator - Locator for file input element
   * @param filePath - Path to file to upload
   * @param waitAfterUpload - Time to wait after upload in ms (default: 1000)
   * @param timeout - Timeout in ms (default: 10000)
   */
  async uploadFileAndWait(
    fileInputLocator: Locator, 
    filePath: string, 
    waitAfterUpload: number = 1000,
    timeout: number = 10000
  ): Promise<void> {
    await this.uploadFile(fileInputLocator, filePath, timeout);
    
    // Optional wait for upload processing
    if (waitAfterUpload > 0) {
      await this.page.waitForTimeout(waitAfterUpload);
    }
  }
}