import { test, expect } from "../pages/fixture";

test.describe("File download, upload and drag drop functionalities", () => {
  test("Download a txt file from the site and validating the contents inside the file match", async ({
    custom,
  }) => {
    await test.step("Launch the website", async () => {
      await custom.launchWebsite();
      await expect(custom.mainHead).toBeVisible();
    });

    await test.step("Navigate to the Download page", async () => {
      await custom.gotoMorePage();
      await custom.navigateToDownloadPage();
    });

    await test.step("Verify download page heading is visible", async () => {
      await expect(
        custom.downloadPageHeading,
        "expected download page header is not visible"
      ).toBeVisible();
    });

    await test.step("Enter data and generate download  file", async () => {
      await custom.enterDataInTextBox();
      await custom.generateDownLink();
    });

    await test.step("Verify download link is visible and download the file", async () => {
      await expect(
        custom.downloadFil,
        "Download is not displayed"
      ).toBeVisible();
      await custom.downloadFile();
    });
  });

  test("upload, remove and upload a file and verify the status", async ({
    custom,
  }) => {
    const filePath = "testAssets/testData/info.txt";
    await test.step("Launch the website and navigate to Upload page", async () => {
      await custom.launchWebsite();
      await expect(custom.mainHead).toBeVisible();
      await custom.gotoMorePage();
      await custom.navigateToUploadPage();
    });

    await test.step("Upload a file", async () => {
      
      await custom.uploadFile(filePath);
    });

    await test.step("Remove uploaded file and verify input is empty", async () => {
      await custom.removeFile();
      await expect(
        custom.uploadInput,
        "The file input is expected to have no file"
      ).toHaveText("");
    });

    await test.step("Upload file again and submit upload", async () => {
     
      await custom.uploadFile(filePath);
      await custom.submitUpload();
    });
  });

  test("Static Drag and drop image and verify the image is added", async ({
    custom,
  }) => {
    await test.step("Launch website and navigate to Static Drag and Drop page", async () => {
      await custom.launchWebsite();
      await custom.navigateToInteraction();
      await custom.gotoDragAndDrop();
      await custom.navigateToStatic();
    });

    await test.step("Perform static drag and drop action", async () => {
      await custom.staticDragAndDrop();
    });

    await test.step("Verify dragged image is displayed", async () => {
      const html = await custom.checkDrop.innerHTML();
      expect(html, "Expected to display dragged image ").toContain("<img");
    });
  });

  test("Dynamic Drag and drop image and verify the image is added", async ({
    custom,
  }) => {
    await test.step("Launch website and navigate to Dynamic Drag and Drop page", async () => {
      await custom.launchWebsite();
      await custom.navigateToInteraction();
      await custom.gotoDragAndDrop();
      await custom.navigateToDynamic();
    });

    await test.step("Perform dynamic drag and drop action", async () => {
      await custom.dynamicDragAndDrop();
    });

    await test.step("Verify drag and dropped image is displayed", async () => {
      const html = await custom.checkDrop.innerHTML();
      expect(html, "Expected to display the drag and dropped image").toContain(
        "<img"
      );
    });
  });
});
