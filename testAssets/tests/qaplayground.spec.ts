import { test, expect } from "../pages/fixture";
import menuData from "../testData/menuData.json";

test.describe("QA PLAYGROUND SITE DEMO FUNCTIONALITIES", () => {
  test("Identifying superhero name and checking if the real name is same as expected", async ({
    playg,
  }) => {
    await test.step("Launch the website and verify main heading", async () => {
      await playg.launchWebsite();
      await expect(
        playg.mainHead,
        "Main heading should be visible"
      ).toBeVisible();
    });

    await test.step("Navigate to dynamic table and verify Spiderman real name", async () => {
      await playg.moveToDynamicTable();
      await expect(
        playg.spideRealName,
        "Expected name to be Peter Parker"
      ).toHaveText("Peter Parker");
    });
  });

  test("Check superhero name is NOT Batman for spiderman", async ({
    playg,
  }) => {
    await test.step("Launch the website and navigate to dynamic table", async () => {
      await playg.launchWebsite();
      await playg.moveToDynamicTable();
    });

    await test.step("Verify superhero name is NOT Batman", async () => {
      await playg.verifyIncorrectSuperheroName("Batman");
    });
  });

  test("Check superhero name is NOT empty in the table", async ({ playg }) => {
    await test.step("Launch the website and navigate to dynamic table", async () => {
      await playg.launchWebsite();
      await playg.moveToDynamicTable();
    });

    await test.step("Verify superhero name is not empty", async () => {
      await playg.verifySuperheroNameIsEmpty();
    });
  });

  test('Check superhero name in the table does NOT contain "man"', async ({
    playg,
  }) => {
    await test.step("Launch the website and navigate to dynamic table", async () => {
      await playg.launchWebsite();
      await playg.moveToDynamicTable();
    });

    await test.step('Verify superhero name does not contain "man"', async () => {
      await playg.verifyPartialSuperheroName("man");
    });
  });

  test("Check superhero name in the table does NOT contain numbers", async ({
    playg,
  }) => {
    await test.step("Launch the website and navigate to dynamic table", async () => {
      await playg.launchWebsite();
      await playg.moveToDynamicTable();
    });

    await test.step("Verify superhero name contains no numbers", async () => {
      await playg.verifySuperheroNameNoNumbers();
    });
  });

  test("Verify account by entering the digit nine in the input filed and validate success message is displayed", async ({
    playg,
  }) => {
    await test.step("Launch website and move to verify account page", async () => {
      await playg.launchWebsite();
      await playg.moveToVerifyAcc();
      await expect(
        playg.verifyHead,
        "Verification heading should be visible"
      ).toBeVisible();
    });

    await test.step('Enter digit "9" and verify success message', async () => {
      await playg.enterDataNine("9");
      await expect(
        playg.successMsg,
        "Success message should be displayed after entering 9"
      ).toBeVisible();
    });
  });

  test("Verify account by entering the wrong digit  in the input filed and validate success message is not displayed", async ({
    playg,
  }) => {
    await test.step("Launch website and move to verify account page", async () => {
      await playg.launchWebsite();
      await playg.moveToVerifyAcc();
      await expect(
        playg.verifyHead,
        "Verification heading should be visible"
      ).toBeVisible();
    });

    await test.step("Enter wrong digit and verify success message is not displayed", async () => {
      await playg.enterDataNine("8");
      await expect(
        playg.successMsg,
        "Success message should NOT be displayed after wrong input"
      ).not.toBeVisible();
    });
  });

  test("Add and remove tags and verify remaining tags count is displayed", async ({
    playg,
  }) => {
    await test.step("Launch website and navigate to tags section", async () => {
      await playg.launchWebsite();
      await playg.moveToTags();
      await expect(
        playg.tagsHead,
        "Tags heading should be visible"
      ).toBeVisible();
    });

    await test.step("Enter tags and verify initial remaining count", async () => {
      await playg.enterTags();
      await expect(
        playg.countP,
        "Remaining tags count should be zero initially"
      ).toHaveText("0");
    });

    await test.step('Remove "python" tag and verify remaining count', async () => {
      await playg.removeTag("python");
      await expect(
        playg.countP,
        "Remaining tags count should be one after removing"
      ).toHaveText("1");
    });
  });

  test("Open new tab by clicking on the button and verify a message is the displayed in the new page", async ({
    playg,
  }) => {
    await test.step("Launch website, navigate and click to open new tab", async () => {
      await playg.launchWebsite();
      await playg.navToNewTab();
      await playg.clickOnNewTab();
    });

    await test.step("Verify heading is visible in new tab", async () => {
      await expect(
        playg.newTabHead,
        "Heading in new tab should be visible"
      ).toBeVisible();
    });
  });

  test("Open pop-up and click on the button in it and verify a message is the displayedon the main window", async ({
    playg,
  }) => {
    await test.step("Launch website and trigger popup", async () => {
      await playg.launchWebsite();
      await playg.navGateToPop();
      await playg.getPopUp();
      await expect(
        playg.popMesage,
        "Popup message should be visible"
      ).toHaveText("Click to open pop-up");
    });

    await test.step("Click button in popup and verify message changes", async () => {
      await playg.popedUpSubmit();
      await expect(
        playg.popMesage,
        "Popup message should change after button click"
      ).toHaveText("Button Clicked");
    });
  });

  test("Click on the button in the iframe that is in another iframe and verify success message is displayed", async ({
    playg,
  }) => {
    await test.step("Launch website and navigate to nested iframe", async () => {
      await playg.launchWebsite();
      await playg.goToIframe();
    });

    await test.step("Click button inside nested iframe and verify success message", async () => {
      await playg.clickIframeB();
      await expect(
        playg.iframeVal,
        "Iframe success message should be visible"
      ).toBeVisible();
    });
  });

  test("Open each link in the navigaion window and assert the pages content", async ({
    playg,
  }) => {
    await test.step("Launch website and go to navigation menu", async () => {
      await playg.launchWebsite();
      await playg.gotoNavigationMenu();
    });

    await test.step("Verify Home page link and content", async () => {
      await expect(
        playg.homeLink,
        "Home link text should be correct"
      ).toHaveText("Home");
    });

    await test.step("Go to About page and verify heading", async () => {
      await playg.gotoAbout();
      await expect(
        playg.validationHead,
        "About page heading should be visible"
      ).toHaveText("Welcome to the About Page");
      await playg.goBackNav();
    });

    await test.step("Go to Blog page and verify heading", async () => {
      await playg.gotoBlog();
      await expect(
        playg.validationHead,
        "Blog page heading should be visible"
      ).toHaveText("Welcome to the Blog Page");
      await playg.goBackNav();
    });

    await test.step("Go to Portfolio page and verify heading", async () => {
      await playg.gotoPortfolio();
      await expect(
        playg.validationHead,
        "Portfolio page heading should be visible"
      ).toHaveText("Welcome to the Portfolio Page");
      await playg.goBackNav();
    });

    await test.step("Go to Contact page and verify heading", async () => {
      await playg.gotoContact();
      await expect(
        playg.validationHead,
        "Contact page heading should be visible"
      ).toHaveText("Welcome to the Contact Page");
    });
  });

  test("Click on the hidden button and verify hidden message is displayed", async ({
    playg,
  }) => {
    await test.step("Launch website and navigate to covered page", async () => {
      await playg.launchWebsite();
      await playg.navToCoveredPage();
      await expect(
        playg.coveredHeadVal,
        "Covered page heading should be visible"
      ).toHaveText("Click the button below");
    });

    await test.step("Click hidden button and verify mission accomplished text", async () => {
      await playg.coveredButtonClick();
      await expect(
        playg.coveredHeadVal,
        "Mission accomplished text should appear"
      ).toHaveText("Mission accomplished");
    });
  });

  test("Put mouse pointer on an image and verify movie price is displayed", async ({
    playg,
  }) => {
    await test.step("Launch website and navigate to hover image", async () => {
      await playg.launchWebsite();
      await playg.gotoHoverImage();
    });

    await test.step("Hover over image and verify movie price displayed", async () => {
      await playg.hoverOverImage();
      await expect(
        playg.hoverPrice,
        "Movie price should appear after hover"
      ).toHaveText("$24.96");
    });
  });

  test("Upload an image file and verify the file name is displayed", async ({
  playg,
}) => {
  await test.step("Launch website and navigate to file upload section", async () => {
    await playg.launchWebsite();
    await playg.fileUploadNavigation();
  });

  await test.step("Upload file and verify uploaded file count", async () => {
    const filePath = "testAssets/testData/downloadtxt/info.txt";
    await playg.fileUploading(filePath);
    await expect(
      playg.fileUpldVal,
      "Uploaded file count should be displayed"
    ).toContainText("1");
  });
});
  test("Click on each menu and sub-menu item and assert the message displayed", async ({
    playg,
  }) => {
    await test.step("Launch website and navigate to right click context menu", async () => {
      await playg.launchWebsite();
      await playg.navToRightContext();
    });

    const menuItems = menuData.menuItems;
    const subMenuItems = menuData.subMenuItems;

    for (let index = 0; index < menuItems.length; index++) {
      await test.step(`Right click and click menu item: ${menuItems[index]}`, async () => {
        await playg.rightClick();
        await playg.menuItemClick(menuItems[index]);
        await expect(
          playg.contextVal,
          `Menu item ${menuItems[index]} should be clicked`
        ).toHaveText("Menu item " + menuItems[index] + " clicked");
      });
    }

    for (let index = 0; index < subMenuItems.length; index++) {
      await test.step(`Right click, hover Share and click submenu item: ${subMenuItems[index]}`, async () => {
        await playg.rightClick();
        await playg.menuItemHover("Share");
        await playg.menuItemClick(subMenuItems[index]);
        await expect(
          playg.contextVal,
          `Submenu item ${subMenuItems[index]} should be clicked`
        ).toHaveText("Menu item " + subMenuItems[index] + " clicked");
      });
    }
  });

  test("Click on the button and assert that progress is on the 95 percent", async ({
    playg,
  }) => {
    await test.step("Launch website, navigate and click shadow DOM button", async () => {
      await playg.launchWebsite();
      await playg.goToShadowDom();
      await playg.shadowButtonClick();
    });

    await test.step("Verify progress bar percent is 95", async () => {
      await expect(
        playg.progressBar,
        "Progress bar percent attribute should be 95"
      ).toHaveAttribute("percent", "95", {
        timeout: 9000,
      });
    });
  });

  test("Set slider value to 50 and submit feedback by clicking on the button", async ({
    playg,
  }) => {
    await test.step("Launch website and navigate to slider", async () => {
      await playg.launchWebsite();
      await playg.navigateToSlider();
    });

    await test.step("Move slider until feedback message is visible and verify", async () => {
      await playg.moveSliderUntilFeedbackVisible();
      await expect(
        playg.sliderVal,
        "Feedback message should appear after slider set to 50"
      ).toHaveText("Thank you for your feedback!");
    });
  });

  test("Download a file and assert the files name and size", async ({
    playg,
  }) => {
    await test.step("Launch website, navigate to download page and download file", async () => {
      await playg.launchWebsite();
      await playg.navToDownloadFile();
      await playg.downloadFile();
    });
  });

  test("Close modal popup if displayed and assert welcome message", async ({
    playg,
  }) => {
    await test.step("Open modal popup section and verify welcome message", async () => {
      await playg.openModalPopupSection();
      await expect(
        playg.welcomeMessage,
        'Modal popup welcome message "Welcome Peter Parker!" is not visible.'
      ).toBeVisible();
    });
  });

  test("Wait until API data is fetched and then assert loaded posts", async ({
    playg,
  }) => {
    await test.step("Launch fetch website and open fetch data section", async () => {
      await playg.launchFetchWebsite();
      const cardCount = await playg.openFetchData();
      await expect(cardCount, "Count not greater than 90").toBeGreaterThan(90);
    });
  });

  test("Verify redirect chain messages and go back button", async ({
    playg,
  }) => {
    await test.step("Trigger redirect chain", async () => {
      await playg.clickHeader();
      await playg.clickRedirectLink();
    });

    await test.step("Wait for go back button and verify visibility", async () => {
      await playg.goBackButton.waitFor({ state: "visible", timeout: 10000 });
      await expect(
        playg.goBackButton,
        'Redirect chain failed: "Go Back" button not visible'
      ).toBeVisible();
    });
  });
});
