import { Page, Locator } from "@playwright/test";
import path from "path";

export class FileUploadPage {
    readonly page: Page;
    readonly moreLink: Locator;
    readonly fileUploadLink: Locator;
    readonly fileInput: Locator;
    readonly uploadButton: Locator;
    readonly uploadedImage: Locator;
    readonly removeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.moreLink = page.locator('//a[text()="More"]');
        this.fileUploadLink = page.locator('//a[text()="File Upload"]');
        this.fileInput = page.locator('//*[@id="input-4"]'); // file input
        this.uploadButton = page.locator('//span[text()="Upload"]');
        this.uploadedImage = page.locator('div[id^="preview-"]:not([id*="zoom"])');
 // dynamic selector
        this.removeButton = page.locator('//span[text()="Remove"]');
    }

    // Navigate via "More" → "File Upload"
    async navigateToFileUpload() {
        await this.moreLink.click();
        await this.fileUploadLink.click();
    }

    // Upload a file from testdata folder
   async uploadFile(fileName: string) {
  const filePath = path.resolve(__dirname, "../testdata", fileName);
  await this.fileInput.setInputFiles(filePath);
  console.log("File selected successfully.");
}

async isFileUploaded(fileName: string): Promise<boolean> {
  const value = await this.fileInput.inputValue();
  return value.includes(fileName);
}
    // Remove uploaded file
    async removeFile() {
        await this.removeButton.click();
    }

    // Verify if preview is removed
    async isPreviewHidden(): Promise<boolean> {
        return await this.uploadedImage.isHidden();
    }
}
