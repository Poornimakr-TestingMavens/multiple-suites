import { test, expect } from "../pages/pages-QA-playground/fixtures";

test.describe("Automation Demo Site Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://demo.automationtesting.in/Windows.html");
  });

  test("Automation Demo Site Combined Flow", async ({
    page,
    alertPage,
    fileDownloadPage,
    dragAndDropPage,
    fileUploadPage,
    fs,
  }) => {
    await test.step("Verify handling of simple, confirm, and prompt alerts", async () => {
      await alertPage.clickOnSwitchToButton();
      await alertPage.clickOnAlertsButton();

      const alertText = await alertPage.handleAlertBox();
      expect(alertText, "Expected alert box text to be 'I am an alert box!'").toBe("I am an alert box!");

      const confirmDismissText = await alertPage.handleConfirmAlert(false);
      expect(confirmDismissText, "Expected confirm alert dismiss message to contain 'Press a Button'").toContain("Press a Button");

      const promptAcceptText = await alertPage.handlePromptAlert("Playwright", true);
      expect(promptAcceptText, "Expected prompt alert accept message to be 'Please enter your name'").toBe("Please enter your name");

      const promptDismissText = await alertPage.handlePromptAlert("Playwright", false);
      expect(promptDismissText, "Expected prompt alert dismiss message to be 'Please enter your name'").toBe("Please enter your name");
    });

    await test.step("Verify that text file is generated, downloaded, and validated correctly", async () => {
      await fileDownloadPage.navigateToFileDownload();
      const sampleData = "Automation Test Data";
      await fileDownloadPage.enterText(sampleData);
      await fileDownloadPage.clickCreateButton();

      const filePath = await fileDownloadPage.downloadFile();
      expect(fileDownloadPage.fileExists(filePath), `Expected file to exist at path: ${filePath}`).toBeTruthy();
      expect(filePath.endsWith(".txt"), `Expected downloaded file to have '.txt' extension, got: ${filePath}`).toBeTruthy();

      const content = fileDownloadPage.readFile(filePath);
      expect(content.trim(), "Expected file content to match sample data").toBe(sampleData.trim());

      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    });

    await test.step("Verify drag and drop of Angular, Mongo, and Node images", async () => {
      await dragAndDropPage.navigateToDragAndDrop();
      await dragAndDropPage.dragAngular();
      await dragAndDropPage.dragMongo();
      await dragAndDropPage.dragNode();

      await expect(dragAndDropPage.droppedAngular, "Expected Angular image to be visible after drag").toBeVisible();
      await expect(dragAndDropPage.droppedMongo, "Expected Mongo image to be visible after drag").toBeVisible();
      await expect(dragAndDropPage.droppedNode, "Expected Node image to be visible after drag").toBeVisible();
    });

    await test.step("Verify file upload and removal functionality", async () => {
      await fileUploadPage.navigateToFileUpload();
      const fileName = "sample.png";
      await fileUploadPage.uploadFile(fileName);
      expect(await fileUploadPage.isFileUploaded(fileName), `Expected file '${fileName}' to be uploaded`).toBeTruthy();

      await fileUploadPage.uploadButton.click();
      expect(await fileUploadPage.isFileUploaded(fileName), `Expected file '${fileName}' to remain uploaded after clicking upload button`).toBeTruthy();

      await fileUploadPage.fileInput.setInputFiles([]);
      const isCleared = await fileUploadPage.fileInput.inputValue();
      expect(isCleared, "Expected file input to be cleared after removing files").toBe("");

      console.log("File upload and simulated removal validated successfully.");
    });
  });
});
