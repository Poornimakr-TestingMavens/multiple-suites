import { Page, Locator } from "@playwright/test";
import path from "path";

/**
 * Page Object Model for the "File Upload" component.
 * Handles navigation, file selection, upload verification, and file removal operations.
 */
export class FileUploadPage {
  readonly page: Page;
  readonly moreLink: Locator;
  readonly fileUploadLink: Locator;
  readonly fileInput: Locator;
  readonly uploadButton: Locator;
  readonly uploadedImage: Locator;
  readonly removeButton: Locator;

  /**
   * Initializes all locators for the File Upload page.
   * @param page - The Playwright Page instance representing the current browser page.
   */
  constructor(page: Page) {
    this.page = page;
    this.moreLink = page.locator('//a[text()="More"]');
    this.fileUploadLink = page.locator('//a[text()="File Upload"]');
    this.fileInput = page.locator('//*[@id="input-4"]');
    this.uploadButton = page.locator('//span[text()="Upload"]');
    this.uploadedImage = page.locator('div[id^="preview-"]:not([id*="zoom"])');
    this.removeButton = page.locator('//span[text()="Remove"]');
  }

  /**
   * Navigates to the "File Upload" section by clicking the More and File Upload links.
   */
  async navigateToFileUpload() {
    await this.moreLink.click();
    await this.fileUploadLink.click();
  }

  /**
   * Selects a file from the local testdata folder to upload.
   * @param fileName - The name of the file to upload.
   */
  async uploadFile(fileName: string) {
    const filePath = path.resolve(__dirname, "C:/Projects/playground-review/INTERN_ASSESSMENT/testAssets/testdata", fileName);
    await this.fileInput.setInputFiles(filePath);
  }

  /**
   * Checks whether the file has been selected in the input field.
   * @param fileName - The name of the file to verify.
   * @returns True if the file is selected, otherwise false.
   */
  async isFileUploaded(fileName: string): Promise<boolean> {
    const value = await this.fileInput.inputValue();
    return value.includes(fileName);
  }

  /**
   * Clicks the "Remove" button to remove the uploaded file.
   */
  async removeFile() {
    await this.removeButton.click();
  }

  /**
   * Checks whether the preview image is hidden after removal.
   * @returns True if the preview is hidden, otherwise false.
   */
  async isPreviewHidden(): Promise<boolean> {
    return await this.uploadedImage.isHidden();
  }
}
