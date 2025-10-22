import { test, expect } from "../pages/pages-QA-playground/fixtures";

test.describe("Mini Web Apps - Verify different elements on the website", () => {
  test.beforeEach(async ({ page, BASE_URL }) => {
    await page.goto(BASE_URL);
  });
  test("Dynamic Table: Verify all superheroes real names", async ({
    dynamicTable,
    superheroesData,
  }) => {
    await test.step("Open Dynamic Table section", async () => {
      await dynamicTable.clickDynamicTable();
    });

    await test.step("Verify superhero header is visible", async () => {
      await expect(
        dynamicTable.superheroHeader,
        "Expected superhero header to be visible"
      ).toBeVisible();
    });

    await test.step("Verify each superhero’s real name", async () => {
      for (const hero of superheroesData) {
        const cleanedName = hero.superhero.split("\n")[0].trim();
        const actualName = await dynamicTable.getRealName(cleanedName);
        expect(actualName, "Expected to display the real name").toBe(
          hero.realName
        );
      }
    });
  });
  test("Verify Account: Positive", async ({
    verifyAccount,
    VERIFY_ACCOUNT_CODE_POSITIVE,
  }) => {
    await test.step("Navigate to Verify Account page", async () => {
      await verifyAccount.navigate();
    });

    await test.step("Enter valid verification code", async () => {
      await verifyAccount.enterCode(VERIFY_ACCOUNT_CODE_POSITIVE);
    });

    await test.step("Validate success message visibility", async () => {
      await expect(
        verifyAccount.successMessage,
        "Expected success message to be visible for positive verification"
      ).toBeVisible();
    });
  });

  test("Verify Account: Negative", async ({
    verifyAccount,
    VERIFY_ACCOUNT_CODE_NEGATIVE,
  }) => {
    await test.step("Navigate to Verify Account page", async () => {
      await verifyAccount.navigate();
    });

    await test.step("Enter invalid verification code", async () => {
      await verifyAccount.enterCode(VERIFY_ACCOUNT_CODE_NEGATIVE);
    });

    await test.step("Validate success message NOT visible", async () => {
      await expect(
        verifyAccount.successMessage,
        "Expected success message NOT to be visible for negative verification"
      ).not.toBeVisible();
    });

    await test.step("Validate heading visible after failed verification", async () => {
      await expect(
        verifyAccount.heading,
        "Expected heading to be visible after failed verification"
      ).toBeVisible();
    });
  });

  test("Tags Input Box: Add tags and validate max 10", async ({
    tagsPage,
    tagsData,
  }) => {
    await test.step("Navigate to Tags Input Box page", async () => {
      await tagsPage.navigate();
    });

    await test.step("Add up to 10 tags", async () => {
      const tagsToAdd = tagsData.tags;
      for (let i = 0; i < tagsToAdd.length; i++) {
        if ((await tagsPage.getTagCount()) >= 10) break;
        await tagsPage.addTag(tagsToAdd[i]);
      }
    });

    await test.step("Validate tag count and names", async () => {
      const addedTags = await tagsPage.getAllTags();
      expect(
        addedTags.length,
        "Expected tags count to be less than or equal to 10"
      ).toBeLessThanOrEqual(10);
      for (const tag of addedTags) {
        expect(
          tagsData.tags,
          `Expected tagsToAdd array to contain tag: ${tag}`
        ).toContain(tag);
      }
    });
  });

  test("Multi Level Dropdown: Validate navigation and submenus", async ({
    multiDropdown,
  }) => {
    await test.step("Navigate to Multi Level Dropdown page", async () => {
      await multiDropdown.navigate();
    });

    await test.step("Verify dropdown icon visibility", async () => {
      await expect(
        multiDropdown.dropdownIcon,
        "Expected dropdown icon to be visible initially"
      ).toBeVisible();
    });

    await test.step("Validate main options", async () => {
      await multiDropdown.validateMainOptions();
    });

    await test.step("Open Settings and validate options", async () => {
      await multiDropdown.openSettingsAndValidate();
      await multiDropdown.validateSettingsOptions();
    });

    await test.step("Open Animals and validate options", async () => {
      await multiDropdown.openAnimalsAndValidate();
      await multiDropdown.validateAnimalOptions();
    });

    await test.step("Verify dropdown icon visible after validation", async () => {
      await expect(
        multiDropdown.dropdownIcon,
        "Expected dropdown icon to be visible after validations"
      ).toBeVisible();
    });
  });

  test("New Tab: Open and validate new page", async ({
    newTab,
    NEW_TAB_PAGE_URL,
    NEW_TAB_PAGE_HEADER,
  }) => {
    const openLink = await test.step("Navigate to New Tab page", async () => {
      return await newTab.navigate();
    });

    await test.step("Validate Open Link visibility", async () => {
      await expect(openLink, "Expected open link to be visible").toBeVisible();
    });

    const newPage = await test.step("Open new tab and get reference", async () => {
      return await newTab.openNewTab();
    });

    await test.step("Validate header in new page", async () => {
      const headerLocator = newTab.getNewPageHeaderLocator(newPage);
      await expect(
        headerLocator,
        "Expected header locator to be visible on new page"
      ).toBeVisible();
      const headerText = await headerLocator.textContent();

      expect(
        newPage.url(),
        "Expected new page URL to match NEW_TAB_PAGE_URL"
      ).toBe(NEW_TAB_PAGE_URL);
      expect(
        headerText,
        "Expected header text to match NEW_TAB_PAGE_HEADER"
      ).toBe(NEW_TAB_PAGE_HEADER);
    });
  });

  test("Pop-Up Window: Open, submit and validate", async ({ popup }) => {
    await test.step("Navigate to Pop-Up Window section", async () => {
      await popup.navigate();
    });

    await test.step("Handle pop-up window", async () => {
      await popup.handlePopUp();
    });

    await test.step("Validate info text visibility", async () => {
      await expect(
        popup.infoText,
        "Expected info text to be visible after handling popup"
      ).toBeVisible();
    });
  });

  test("Nested Iframe: Click link and validate message", async ({
    nestedIframe,
  }) => {
    await test.step("Navigate to Nested Iframe section", async () => {
      await nestedIframe.navigate();
    });

    await test.step("Click button and validate message in iframe", async () => {
      const messageLocator = await nestedIframe.clickButtonAndGetMessageLocator();
      await expect(
        messageLocator,
        "Expected message locator to be visible in nested iframe"
      ).toBeVisible();
    });
  });

  test("Shadow DOM: Click Boost button and assert progress is 95%", async ({
    shadowDOM,
  }) => {
    await test.step("Navigate to Shadow DOM page", async () => {
      await shadowDOM.gotoshadowdom();
    });

    await test.step("Click Boost button and validate progress", async () => {
      await shadowDOM.shadowButtonClick();
      await expect(
        shadowDOM.progressBar,
        "Expected progress bar to have percent attribute of 95"
      ).toHaveAttribute("percent", "95", { timeout: 9000 });
    });
  });

  test("Stars Rating Widget: Click each star and validate URL", async ({
    starsRating,
    STARS_RATING_PAGE_URL,
  }) => {
    await test.step("Navigate to Stars Rating page", async () => {
      await starsRating.navigate();
    });

    await test.step("Click each star and validate URL", async () => {
      for (let i = 1; i <= 5; i++) {
        const url = await starsRating.clickStarAndValidate(i);
        expect(
          url,
          `Expected URL to match STARS_RATING_PAGE_URL for star ${i}`
        ).toBe(STARS_RATING_PAGE_URL);
      }
    });
  });

  test("Covered Elements: Validate text and fugitive link", async ({
    miscApps,
  }) => {
    await test.step("Open Covered Elements section", async () => {
      await miscApps.openCoveredElements();
    });

    await test.step("Verify instruction text visibility", async () => {
      await expect(
        miscApps.instructionText,
        "Expected instruction text to be visible"
      ).toBeVisible();
    });

    await test.step("Scroll and validate fugitive link", async () => {
      await miscApps.fugitiveLink.scrollIntoViewIfNeeded();
      await expect(
        miscApps.fugitiveLink,
        "Expected fugitive link to be visible after scrolling"
      ).toBeVisible();
    });
  });

  test("Onboarding Modal: Verify welcome text and modal title", async ({
    miscApps,
  }) => {
    await test.step("Open Onboarding Modal", async () => {
      await miscApps.openOnboardingModal();
    });

    await test.step("Validate welcome text and modal title", async () => {
      await expect(
        miscApps.welcomeText,
        "Expected welcome text to be visible in onboarding modal"
      ).toBeVisible();
      await expect(
        miscApps.modalTitle,
        "Expected modal title to be visible in onboarding modal"
      ).toBeVisible();
    });
  });

  test("Sortable List: Stepwise sorting until all are right", async ({
    sortableList,
  }) => {
    await test.step("Navigate to Sortable List page", async () => {
      await sortableList.navigate();
    });

    await test.step("Perform stepwise sorting until all items are right", async () => {
      const totalItems = await sortableList.countItems();
      let sortedIndex = 0;

      while (true) {
        const items = await sortableList.getAllItemsClasses();
        sortedIndex = items.findIndex(
          (item) => !item.className?.includes("right")
        );
        if (sortedIndex === -1) break;

        for (let i = sortedIndex; i < totalItems; i++) {
          for (let j = i + 1; j < totalItems; j++) {
            const currentItems = await sortableList.getAllItemsClasses();
            if (currentItems[i].name! > currentItems[j].name!) {
              await sortableList.dragItem(j, i);
              await sortableList.clickCheckOrder();
            }
          }
        }
      }
    });

    await test.step("Validate all items sorted correctly", async () => {
      const finalItems = await sortableList.getAllItemsClasses();
      for (const item of finalItems) {
        expect(
          item.className,
          `Expected item class to contain 'right' for ${item.name}`
        ).toContain("right");
      }
    });
  });

  test("Fetch Data: Verify posts are rendered", async ({ fetchData }) => {
    await test.step("Open Fetch Data section", async () => {
      await fetchData.openFetchDataSection();
    });

    await test.step("Validate number of posts rendered", async () => {
      const totalCards = await fetchData.getCardCount();
      expect(
        totalCards,
        "Expected at least one post card to be rendered"
      ).toBeGreaterThan(0);
    });
  });
  test.only("Upload image file and verify filename", async ({ fileUploadForQaPlayground }) => {
  await test.step("Open QA Playground site", async () => {
    await fileUploadForQaPlayground.openSite();
  });

  await test.step("Go to Upload File section", async () => {
    await fileUploadForQaPlayground.goToUploadFile();
  });

  await test.step("Verify 'No File Selected' message", async () => {
    await fileUploadForQaPlayground.expectNoFileSelected();
  });

  await test.step("Upload file and verify filename", async () => {
    const uploadedFile = await fileUploadForQaPlayground.uploadFileAndReturnLocator();
    await expect(uploadedFile, "Uploaded file not visible").toBeVisible();
  });
});

});