import { test, expect } from "../pages-QA/fixtures";
import {
  BASE_URL,
  NEW_TAB_PAGE_URL,
  NEW_TAB_PAGE_HEADER,
  STARS_RATING_PAGE_URL,
  
  VERIFY_ACCOUNT_CODE_POSITIVE,
  VERIFY_ACCOUNT_CODE_NEGATIVE
} from "../utils/urls";

test.describe("Mini Web Apps - Verify different elements on the website", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test("Dynamic Table: Verify all superheroes real names", async ({ dynamicTable, superheroesData }) => {
    await dynamicTable.clickDynamicTable();
    await expect(dynamicTable.superheroHeader).toBeVisible();

    for (const hero of superheroesData) {
      const cleanedName = hero.superhero.split("\n")[0].trim();
      const actualName = await dynamicTable.getRealName(cleanedName);
      expect(actualName).toBe(hero.realName);
    }
  });

  // Verify Account Tests
  test("Verify Account: Positive", async ({ verifyAccount }) => {
    await verifyAccount.navigate();
    await verifyAccount.enterCode(VERIFY_ACCOUNT_CODE_POSITIVE);
    await expect(verifyAccount.successMessage).toBeVisible();
  });

  test("Verify Account: Negative", async ({ verifyAccount }) => {
    await verifyAccount.navigate();
    await verifyAccount.enterCode(VERIFY_ACCOUNT_CODE_NEGATIVE);
    await expect(verifyAccount.successMessage).not.toBeVisible();
    await expect(verifyAccount.heading).toBeVisible();
  });

  // Tags Input Box Test
  test("Tags Input Box: Add tags and validate max 10", async ({ tagsPage, tagsData }) => {
    await tagsPage.navigate();

    const tagsToAdd = tagsData.tags;
    for (let i = 0; i < tagsToAdd.length; i++) {
      if (await tagsPage.getTagCount() >= 10) break;
      await tagsPage.addTag(tagsToAdd[i]);
    }

    const addedTags = await tagsPage.getAllTags();
    expect(addedTags.length).toBeLessThanOrEqual(10);

    for (const tag of addedTags) {
      expect(tagsToAdd).toContain(tag);
    }
  });

  // Multi Level Dropdown Test
  test("Multi Level Dropdown: Validate navigation and submenus", async ({ multiDropdown }) => {
    await multiDropdown.navigate();
    await expect(multiDropdown.dropdownIcon).toBeVisible();
    await multiDropdown.validateMainOptions();
    await multiDropdown.openSettingsAndValidate();
    await multiDropdown.validateSettingsOptions();
    await multiDropdown.openAnimalsAndValidate();
    await multiDropdown.validateAnimalOptions();
    await expect(multiDropdown.dropdownIcon).toBeVisible();
  });

  // New Tab Test
  test("New Tab: Open and validate new page", async ({ newTab }) => {
    const openLink = await newTab.navigate();
    await expect(openLink).toBeVisible(); // only expect here

    const newPage = await newTab.openNewTab();
    const headerLocator = newTab.getNewPageHeaderLocator(newPage);

    await expect(headerLocator).toBeVisible();
    const headerText = await headerLocator.textContent();

    expect(newPage.url()).toBe(NEW_TAB_PAGE_URL);
    expect(headerText).toBe(NEW_TAB_PAGE_HEADER);
  });

  // Pop-Up Window Test
  test("Pop-Up Window: Open, submit and validate", async ({ popup }) => {
    await popup.navigate();
    await popup.handlePopUp();
    await expect(popup.infoText).toBeVisible();
  });

  // Nested Iframe Test
  test("Nested Iframe: Click link and validate message", async ({ nestedIframe }) => {
    await nestedIframe.navigate();

    const messageLocator = await nestedIframe.clickButtonAndGetMessageLocator();
    await expect(messageLocator).toBeVisible(); // expect only in test
  });

  // Shadow DOM Test
  test('Shadow DOM: Click Boost button and assert progress is 95%', async ({ shadowDOM }) => {
  // Navigate to Shadow DOM section
  await shadowDOM.gotoshadowdom();

  // Click the Boost button
  await shadowDOM.shadowButtonClick();

  // Validate progress bar has 95%
  await expect(shadowDOM.progressBar).toHaveAttribute('percent', '95', { timeout: 9000 });
});

  // Stars Rating Widget Test
  test("Stars Rating Widget: Click each star and validate URL", async ({ starsRating }) => {
    await starsRating.navigate();
    for (let i = 1; i <= 5; i++) {
      const url = await starsRating.clickStarAndValidate(i);
      expect(url).toBe(STARS_RATING_PAGE_URL);
    }
  });

  // Covered Elements Test
  test("Covered Elements: Validate text and fugitive link", async ({ miscApps }) => {
    await miscApps.openCoveredElements();
    await expect(miscApps.instructionText).toBeVisible();
    await miscApps.fugitiveLink.scrollIntoViewIfNeeded();
    await expect(miscApps.fugitiveLink).toBeVisible();
  });

  // Onboarding Modal Test
  test("Onboarding Modal: Verify welcome text and modal title", async ({ miscApps }) => {
    await miscApps.openOnboardingModal();
    await expect(miscApps.welcomeText).toBeVisible();
    await expect(miscApps.modalTitle).toBeVisible();
  });

  // Sortable List Test
  test("Sortable List: Stepwise sorting until all are right", async ({ sortableList }) => {
    await sortableList.navigate();

    const totalItems = await sortableList.countItems();
    let sortedIndex = 0;

    while (true) {
      const items = await sortableList.getAllItemsClasses();
      sortedIndex = items.findIndex(item => !item.className?.includes("right"));
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
      expect(item.className).toContain("right");
    }
  });

  // Right-Click Context Menu Test
  test("Right-Click Context Menu: Validate all interactions", async ({ rightContext }) => {
    await rightContext.openContextMenuSection();

    const mainMenuItems = ["Preview", "Get Link", "Rename", "Delete", "Settings"];
    const shareSubMenuItems = ["Twitter", "Instagram", "Dribble", "Telegram"];

    for (const item of mainMenuItems) {
      await rightContext.rightClickOnArea();
      await rightContext.clickMenuItem(item);
      const msg = await rightContext.getMessageText();
      expect(msg).toContain(item);
    }

    for (const item of shareSubMenuItems) {
      await rightContext.rightClickOnArea();
      await rightContext.hoverMenuItem("Share");
      await rightContext.clickMenuItem(item);
      const msg = await rightContext.getMessageText();
      expect(msg).toContain(item);
    }
  });

});
