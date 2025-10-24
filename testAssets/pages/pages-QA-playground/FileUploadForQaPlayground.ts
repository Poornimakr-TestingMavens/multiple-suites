import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../../pages/pages-QA-playground/basePage";

/**
 * Page Object for handling File Upload operations in QA Playground.
 */
export class FileUploadForQaPlayground extends BasePage {
  readonly filePath: string;
  readonly selectFileButton: Locator;
  readonly fileInput: Locator;
  readonly noFileSelectedMessage: Locator;
  readonly fileSelectedMessage: Locator;

  /**
   * Initializes locators and file path for upload
   * @param page - Playwright Page instance
   */
  constructor(page: Page) {
    super(page);

    // Relative path, no path.resolve
    this.filePath = "testAssets/testdata/sample.png";

    this.selectFileButton = page.locator('label.btn-green-outline[for="file-input"]');
    this.fileInput = page.locator('input#file-input[type="file"]');
    this.noFileSelectedMessage = page.locator('//p[text()="No File Selected"]');
    this.fileSelectedMessage = page.locator('//p[text()="1 File Selected"]');
  }

  /**
   * Uploads a file and returns the "1 File Selected" locator
   */
  async uploadFileAndReturnLocator(): Promise<Locator> {
    await this.fileInput.setInputFiles(this.filePath);

    // Confirm the file input has exactly 1 file
    const fileCount = await this.fileInput.evaluate(
      (input: HTMLInputElement) => input.files?.length || 0
    );
    await expect(fileCount, "Expected one file to be selected in the input field").toBe(1);

    // Confirm the uploaded file name
    const fileName = await this.fileInput.evaluate(
      (input: HTMLInputElement) => input.files?.[0]?.name
    );
    await expect(fileName, "Expected uploaded file name to be 'sample.png'").toBe("sample.png");

    return this.fileSelectedMessage;
  }

  /**
   * Verifies that the "No File Selected" message is visible.
   */
  async expectNoFileSelected(): Promise<void> {
    await expect(this.noFileSelectedMessage, "Expected 'No File Selected' message before upload").toBeVisible();
  }

  /**
   * Opens the QA Playground site.
   */
  async openSite(): Promise<void> {
    await super.openSite();
  }

  /**
   * Navigates to the Upload File section.
   */
  async goToUploadFile(): Promise<void> {
    await super.goToUploadFile();
    await expect(this.selectFileButton, "Expected 'Select Image File' button to be visible").toBeVisible();
  }
}
