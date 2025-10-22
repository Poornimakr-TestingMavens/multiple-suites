import { Locator, Page, expect } from "@playwright/test";
import fs from "fs";
import path from "path";
import { PdfReader } from "pdfreader";
import { UploadHelper } from "../../../helpers/uploadFile";
import { DownloadHelper } from "../../../helpers/downloadFile";

/**
 * CustomTask class automates various user interactions
 * such as file download, upload, and drag-and-drop actions
 * on the Automation Demo site (https://demo.automationtesting.in).
 */
export default class CustomTask {
  readonly page: Page;
  private uploadHelper: UploadHelper;
  private downloadHelper: DownloadHelper;

  // Locators for different UI elements across pages
  readonly moreLink: Locator;
  readonly downloadPage: Locator;
  readonly downloadPageHeading: Locator;
  readonly textBoxTxt: Locator;
  readonly generateButton: Locator;
  readonly downloadFil: Locator;
  readonly mainHead: Locator;
  readonly uploadPage: Locator;
  readonly uploadInput: Locator;
  readonly removeButton: Locator;
  readonly uploadButton: Locator;
  readonly browseFile: Locator;
  readonly interactionLink: Locator;
  readonly staticLink: Locator;
  readonly dragAndDrop: Locator;
  readonly dragIm1: Locator;
  readonly dragIm2: Locator;
  readonly dragIm3: Locator;
  readonly dropArea: Locator;
  readonly checkDrop: Locator;
  readonly dynamicLink: Locator;
  readonly downloadButton: Locator;
  readonly angularImage: Locator;
  readonly mongoImage: Locator;
  readonly nodeImage: Locator;
  readonly staticPage: Locator;

  /**
   * Constructor initializes all page locators.
   * @param {Page} page - Playwright Page object.
   */
  constructor(page: Page) {
    this.page = page;
    this.uploadHelper = new UploadHelper(page);
    this.downloadHelper = new DownloadHelper(page);
    // Menu and navigation elements
    this.moreLink = page.locator('//a[text()="More"]');
    this.downloadPage = page.locator('//a[text()="File Download"]');
    this.downloadPageHeading = page.locator('//h2[text()="File Download Demo for Automation"]');
    this.textBoxTxt = page.locator('//textarea[@id="textbox"]');
    this.generateButton = page.locator('//button[@id="createTxt"]');
    this.downloadFil = page.locator('//a[@id="link-to-download"]');
    this.mainHead = page.locator('//h1[text()="Automation Demo Site "]');

    // Upload page
    this.uploadPage = page.locator('//a[text()="File Upload"]');
    this.uploadInput = page.locator('//input[@id="input-4"]');
    this.removeButton = page.locator('//span[text()="Remove"]');
    this.uploadButton = page.locator('//span[text()="Upload"]');
    this.browseFile = page.locator('//span[text()="Browse …"]');

    // Interaction and drag-and-drop
    this.interactionLink = page.locator('//a[text()="Interactions "]');
    this.staticLink = page.locator('//a[text()="Static "]');
    this.dragAndDrop = page.locator('//a[text()="Drag and Drop "]');
    this.dragIm1 = page.locator('//img[@id="angular"]');
    this.dragIm2 = page.locator('//img[@id="mongo"]');
    this.dragIm3 = page.locator('//img[@id="node"]');
    this.dropArea = page.locator('//div[@id="droparea"]');
    this.checkDrop = page.locator('//div[@id="droparea"]');
    this.dynamicLink = page.locator('//a[text()="Dynamic "]');
    this.downloadButton = page.locator("#link-to-download");

    // Images for drag-and-drop validation
    this.angularImage = page.locator('//img[@id="angular"]');
    this.mongoImage = page.locator('//img[@id="mongo"]');
    this.nodeImage = page.locator('//img[@id="node"]');
    this.staticPage = page.locator('//a[text()="Static "]');
  }

   /**
   * Launches the Automation Demo website.
   * Navigates directly to the Static page for interactions.
   */
  async launchWebsite() {
    await this.page.goto("https://demo.automationtesting.in/Static.html");
  }

  /**
   * Navigates to the "More" section on the site.
   */
  async gotoMorePage() {
    await this.moreLink.click();
  }

  /**
   * Navigates to the "File Download" page.
   */
  async navigateToDownloadPage() {
    await this.downloadPage.click();
  }

  /**
   * Enters sample text into the file download textbox.
   * Used for generating downloadable text content.
   */
  async enterDataInTextBox() {
    await this.textBoxTxt.fill("Hi i am Batman");
    await this.page.keyboard.press("Enter");
  }

  /**
   * Clicks the generate button to create a downloadable file link.
   */
  async generateDownLink() {
    await this.generateButton.click();
  }

  /**
   * Downloads the generated text file and validates its content.
   * Ensures that:
   * - File is downloaded successfully
   * - File extension is `.txt`
   * - File contains expected content
   */
  async downloadFile() {
    const filePath = await this.downloadHelper.downloadFileWithSuggestedName(
      this.downloadButton,
      30000 // 30 second timeout
    );
    
    // Import fs for validation
    const fs = await import("fs");
    
    // Validate file properties
    expect(fs.existsSync(filePath)).toBeTruthy();
    expect(path.extname(filePath)).toBe(".txt");
    
    // Validate file content
    const fileContent = fs.readFileSync(filePath, "utf-8").trim();
    expect(fileContent, "Name is not Batman").toBe("Hi i am Batman");
    
    return filePath;
  }

  /**
   * Navigates to the File Upload page.
   */
  async navigateToUploadPage() {
    await this.uploadPage.click();
  }

  /**
   * Uploads a file (`info.txt`) from the local test data directory.
   * Maintains backward compatibility with existing tests.
   */
  async uploadFile(path: any) {
    const filePath = path;
    await this.uploadHelper.uploadFile(
      this.uploadInput,
      filePath,
      10000
    );
  }

  /**
   * Uploads any file with custom path (new method for flexibility)
   * @param filePath - Path to the file to upload
   * @param timeout - Upload timeout in ms
   */
  async uploadCustomFile(filePath: string, timeout: number = 10000) {
    await this.uploadHelper.uploadFile(
      this.uploadInput,
      filePath,
      timeout
    );
  }

  /**
   * Removes an uploaded file using the "Remove" button.
   */
  async removeFile() {
    await this.removeButton.click();
  }

  /**
   * Submits the uploaded file by clicking the "Upload" button.
   */
  async submitUpload() {
    await this.uploadButton.click();
  }

  /**
   * Navigates to the "Interactions" menu section.
   */
  async navigateToInteraction() {
    await this.interactionLink.click();
  }

  /**
   * Navigates to the "Static" drag-and-drop page.
   */
  async navigateToStatic() {
    await this.staticLink.click();
  }

  /**
   * Opens the "Drag and Drop" section.
   */
  async gotoDragAndDrop() {
    await this.dragAndDrop.click();
  }

  /**
   * Performs static drag-and-drop operation:
   * Drags Angular, Mongo, and Node images into the drop area.
   */
  async staticDragAndDrop() {
    const loc = this.dropArea;
    await this.angularImage.dragTo(loc);
    await this.mongoImage.dragTo(loc);
    await this.nodeImage.dragTo(loc);
  }

  /**
   * Navigates to the dynamic drag-and-drop page via hover action over "Static" menu.
   */
  async navigateToDynamic() {
    await this.staticPage.hover();
    await this.dynamicLink.click();
  }

  /**
   * Performs dynamic drag-and-drop:
   * Drags Angular, Mongo, and Node images dynamically into the drop area.
   */
  async dynamicDragAndDrop() {
    const loc = this.dropArea;
    await this.angularImage.dragTo(loc);
    await this.mongoImage.dragTo(loc);
    await this.nodeImage.dragTo(loc);
  }

}
