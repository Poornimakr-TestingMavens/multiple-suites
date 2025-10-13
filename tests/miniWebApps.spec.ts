import { test, expect } from "../pages-QA/fixtures";
import {
  BASE_URL,
  NEW_TAB_PAGE_URL,
  NEW_TAB_PAGE_HEADER,
  STARS_RATING_PAGE_URL,
  VERIFY_ACCOUNT_CODE_POSITIVE,
  VERIFY_ACCOUNT_CODE_NEGATIVE,
} from "../utils/urls";

test.describe("Mini Web Apps - Verify different elements on the website", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test("Dynamic Table: Verify all superheroes real names", async ({
    dynamicTable,
    superheroesData,
  }) => {
    await dynamicTable.clickDynamicTable();
    await expect(dynamicTable.superheroHeader, "Expected superhero header to be visible").toBeVisible();

    for (const hero of superheroesData) {
      const cleanedName = hero.superhero.split("\n")[0].trim();
      const actualName = await dynamicTable.getRealName(cleanedName);
      expect(actualName, "Expected to display the real name").toBe(hero.realName);
    }
  });

  // Verify Account Tests
  test("Verify Account: Positive", async ({ verifyAccount }) => {
    await verifyAccount.navigate();
    await verifyAccount.enterCode(VERIFY_ACCOUNT_CODE_POSITIVE);
    await expect(verifyAccount.successMessage, "Expected success message to be visible for positive verification").toBeVisible();
  });

  test("Verify Account: Negative", async ({ verifyAccount }) => {
    await verifyAccount.navigate();
    await verifyAccount.enterCode(VERIFY_ACCOUNT_CODE_NEGATIVE);
    await expect(verifyAccount.successMessage, "Expected success message NOT to be visible for negative verification").not.toBeVisible();
    await expect(verifyAccount.heading, "Expected heading to be visible after failed verification").toBeVisible();
  });

  // Tags Input Box Test
  test("Tags Input Box: Add tags and validate max 10", async ({
    tagsPage,
    tagsData,
  }) => {
    await tagsPage.navigate();

    const tagsToAdd = tagsData.tags;
    for (let i = 0; i < tagsToAdd.length; i++) {
      if ((await tagsPage.getTagCount()) >= 10) break;
      await tagsPage.addTag(tagsToAdd[i]);
    }

    const addedTags = await tagsPage.getAllTags();
    expect(addedTags.length, "Expected tags count to be less than or equal to 10").toBeLessThanOrEqual(10);

    for (const tag of addedTags) {
      expect(tagsToAdd, `Expected tagsToAdd array to contain tag: ${tag}`).toContain(tag);
    }
  });

  // Multi Level Dropdown Test
  test("Multi Level Dropdown: Validate navigation and submenus", async ({
    multiDropdown,
  }) => {
    await multiDropdown.navigate();
    await expect(multiDropdown.dropdownIcon, "Expected dropdown icon to be visible initially").toBeVisible();
    await multiDropdown.validateMainOptions();
    await multiDropdown.openSettingsAndValidate();
    await multiDropdown.validateSettingsOptions();
    await multiDropdown.openAnimalsAndValidate();
    await multiDropdown.validateAnimalOptions();
    await expect(multiDropdown.dropdownIcon, "Expected dropdown icon to be visible after validations").toBeVisible();
  });

  // New Tab Test
  test("New Tab: Open and validate new page", async ({ newTab }) => {
    const openLink = await newTab.navigate();
    await expect(openLink, "Expected open link to be visible").toBeVisible(); // only expect here

    const newPage = await newTab.openNewTab();
    const headerLocator = newTab.getNewPageHeaderLocator(newPage);

    await expect(headerLocator, "Expected header locator to be visible on new page").toBeVisible();
    const headerText = await headerLocator.textContent();

    expect(newPage.url(), "Expected new page URL to match NEW_TAB_PAGE_URL").toBe(NEW_TAB_PAGE_URL);
    expect(headerText, "Expected header text to match NEW_TAB_PAGE_HEADER").toBe(NEW_TAB_PAGE_HEADER);
  });

  // Pop-Up Window Test
  test("Pop-Up Window: Open, submit and validate", async ({ popup }) => {
    await popup.navigate();
    await popup.handlePopUp();
    await expect(popup.infoText, "Expected info text to be visible after handling popup").toBeVisible();
  });

  // Nested Iframe Test
  test("Nested Iframe: Click link and validate message", async ({
    nestedIframe,
  }) => {
    await nestedIframe.navigate();

    const messageLocator = await nestedIframe.clickButtonAndGetMessageLocator();
    await expect(messageLocator, "Expected message locator to be visible in nested iframe").toBeVisible(); // expect only in test
  });

  // Shadow DOM Test
  test("Shadow DOM: Click Boost button and assert progress is 95%", async ({
    shadowDOM,
  }) => {
    // Navigate to Shadow DOM section
    await shadowDOM.gotoshadowdom();

    // Click the Boost button
    await shadowDOM.shadowButtonClick();

    // Validate progress bar has 95%
    await expect(shadowDOM.progressBar, "Expected progress bar to have percent attribute of 95").toHaveAttribute("percent", "95", {
      timeout: 9000,
    });
  });

  // Stars Rating Widget Test
  test("Stars Rating Widget: Click each star and validate URL", async ({
    starsRating,
  }) => {
    await starsRating.navigate();
    for (let i = 1; i <= 5; i++) {
      const url = await starsRating.clickStarAndValidate(i);
      expect(url, `Expected URL to match STARS_RATING_PAGE_URL for star ${i}`).toBe(STARS_RATING_PAGE_URL);
    }
  });

  // Covered Elements Test
  test("Covered Elements: Validate text and fugitive link", async ({
    miscApps,
  }) => {
    await miscApps.openCoveredElements();
    await expect(miscApps.instructionText, "Expected instruction text to be visible").toBeVisible();
    await miscApps.fugitiveLink.scrollIntoViewIfNeeded();
    await expect(miscApps.fugitiveLink, "Expected fugitive link to be visible after scrolling").toBeVisible();
  });

  test("Onboarding Modal: Verify welcome text and modal title", async ({
    miscApps,
  }) => {
    await miscApps.openOnboardingModal();
    await expect(miscApps.welcomeText, "Expected welcome text to be visible in onboarding modal").toBeVisible();
    await expect(miscApps.modalTitle, "Expected modal title to be visible in onboarding modal").toBeVisible();
  });

  test("Sortable List: Stepwise sorting until all are right", async ({
    sortableList,
  }) => {
    await sortableList.navigate();

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

    const finalItems = await sortableList.getAllItemsClasses();
    for (const item of finalItems) {
      expect(item.className, `Expected item class to contain 'right' for ${item.name}`).toContain("right");
    }
  });

  test("Right-Click Context Menu: Validate all interactions", async ({ rightContext, tagsData }) => {
    await rightContext.openContextMenuSection();

    const mainMenuItems = tagsData.rightContext.mainMenu;
    const shareSubMenuItems = tagsData.rightContext.shareSubMenu;

    // Validate main menu items
    for (const item of mainMenuItems) {
      await rightContext.rightClickOnArea();
      await rightContext.clickMenuItem(item);
      const msg = await rightContext.getMessageText();
      expect(
        msg?.includes(item),
        `Expected message to contain main menu item "${item}", but got "${msg}"`
      ).toBe(true);
    }

    // Validate share submenu items
    for (const item of shareSubMenuItems) {
      await rightContext.rightClickOnArea();
      await rightContext.hoverMenuItem("Share");
      await rightContext.clickMenuItem(item);
      const msg = await rightContext.getMessageText();
      expect(
        msg?.includes(item),
        `Expected message to contain share submenu item "${item}", but got "${msg}"`
      ).toBe(true);
    }
  });

  
});
