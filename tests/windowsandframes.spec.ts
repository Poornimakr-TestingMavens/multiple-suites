import { test, expect } from "@playwright/test";
import { AlertPage } from "../pages/alertPage";
import { FileDownloadPage } from "../pages/filedwnld";
import { DragAndDropPage } from "../pages/dragAndDrop";
import { FileUploadPage } from "../pages/fileUpload";
import fs from "fs";


test.describe("Automation Demo Site Tests", () => {
  let alertPage: AlertPage;
  let filePage: FileDownloadPage;
  let dragPage: DragAndDropPage;
  let uploadPage: FileUploadPage;

  test.beforeEach(async ({ page }) => {
    await page.goto("https://demo.automationtesting.in/Windows.html");

    alertPage = new AlertPage(page);
    filePage = new FileDownloadPage(page);
    dragPage = new DragAndDropPage(page);
    uploadPage = new FileUploadPage(page);
  });

  // ------------------ ALERT TESTS ------------------
  test("Verify handling of simple, confirm, and prompt alerts", async ({ page }) => {
  //  await page.goto("https://demo.automationtesting.in/Windows.html");
    await alertPage.clickOnSwitchToButton();
    await alertPage.clickOnAlertsButton();

    const alertText = await alertPage.handleAlertBox();
    expect(alertText).toBe("I am an alert box!");

    const confirmDismissText = await alertPage.handleConfirmAlert(false);
    expect(confirmDismissText).toContain("Press a Button");

    const promptAcceptText = await alertPage.handlePromptAlert("Playwright", true);
    expect(promptAcceptText).toBe("Please enter your name");

    const promptDismissText = await alertPage.handlePromptAlert("Playwright", false);
    expect(promptDismissText).toBe("Please enter your name");
  });

  // ------------------ FILE DOWNLOAD TESTS ------------------
  test("Verify that text file is generated, downloaded, and validated correctly", async ({ page }) => {
    await filePage.navigateToFileDownload();

    const sampleData = "Automation Test Data";
    await filePage.enterText(sampleData);
    await filePage.clickCreateButton();

    const filePath = await filePage.downloadFile();
    expect(filePage.fileExists(filePath)).toBeTruthy();
    expect(filePath.endsWith(".txt")).toBeTruthy();

    const content = filePage.readFile(filePath);
    expect(content.trim()).toBe(sampleData.trim());

    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  });

  // ------------------ DRAG AND DROP TESTS ------------------
  test("Verify drag and drop of Angular, Mongo, and Node images", async ({ page }) => {
    await dragPage.navigateToDragAndDrop();

    await dragPage.dragAngular();
    await dragPage.dragMongo();
    await dragPage.dragNode();

    await expect(dragPage.targetBox.locator('#angular')).toBeVisible();
    await expect(dragPage.targetBox.locator('#mongo')).toBeVisible();
    await expect(dragPage.targetBox.locator('#node')).toBeVisible();
  });

  // FILE UPLOAD TESTS 
test("Verify file upload and removal functionality", async ({ page }) => {
  const uploadPage = new FileUploadPage(page);

  // Navigate via "More" to "File Upload"
  await uploadPage.navigateToFileUpload();

  // Upload file
  const fileName = "sample.png";
  await uploadPage.uploadFile(fileName);

  // Verify file is attached successfully
  expect(await uploadPage.isFileUploaded(fileName)).toBeTruthy();

  // (Optional) Click Upload button if present
  await uploadPage.uploadButton.click();

  // Since there’s no preview, validate again that file input still has the file
  expect(await uploadPage.isFileUploaded(fileName)).toBeTruthy();

  //  Remove file — the Automation Demo Site doesn’t support this visibly,
  // but if you want to simulate clearing the input, you can reassign an empty file list
  await uploadPage.fileInput.setInputFiles([]);
  const isCleared = await uploadPage.fileInput.inputValue();
  expect(isCleared).toBe("");

  console.log("File upload and simulated removal validated successfully.");
  });
  

});
