import { test as base, expect } from "@playwright/test";

// Page Objects
import { DynamicTablePage } from "../pages-QA/miniWebApps";
import { VerifyAccountPage } from "../pages-QA/verifyAccount";
import { TagsInputPage } from "../pages-QA/tagsInputBox";
import { MultiDropdownPage } from "../pages-QA/multiDropdown";
import { MiscAppsPage } from "../pages-QA/miscAppsPage";
import { SortableListPage } from "../pages-QA/sortableList";
import { rightContextPage } from "../pages/righContext";
import { NewTabPage, PopUpPage, NestedIframePage } from "../pages-QA/popNewIframes";
import { ShadowDOMPage, StarsRatingPage } from "../pages-QA/shadowAndRating";

// Test Data
import superheroes from "../utils/test-data/superheroes.json";
import tagsData from "../utils/test-data/tags.json";

// Extend the base test to include page objects and test data
type MyFixtures = {
  dynamicTable: DynamicTablePage;
  verifyAccount: VerifyAccountPage;
  tagsPage: TagsInputPage;
  multiDropdown: MultiDropdownPage;
  miscApps: MiscAppsPage;
  sortableList: SortableListPage;
  rightContext: rightContextPage;
  newTab: NewTabPage;
  popup: PopUpPage;
  nestedIframe: NestedIframePage;
  shadowDOM: ShadowDOMPage;
  starsRating: StarsRatingPage;
  superheroesData: typeof superheroes;
  tagsData: typeof tagsData;
};

export const test = base.extend<MyFixtures>({
  dynamicTable: async ({ page }, use) => {
    await use(new DynamicTablePage(page));
  },

  verifyAccount: async ({ page }, use) => {
    await use(new VerifyAccountPage(page));
  },

  tagsPage: async ({ page }, use) => {
    await use(new TagsInputPage(page));
  },

  multiDropdown: async ({ page }, use) => {
    await use(new MultiDropdownPage(page));
  },

  miscApps: async ({ page }, use) => {
    await use(new MiscAppsPage(page));
  },

  sortableList: async ({ page }, use) => {
    await use(new SortableListPage(page));
  },

  rightContext: async ({ page }, use) => {
    await use(new rightContextPage(page));
  },

  newTab: async ({ page }, use) => {
    await use(new NewTabPage(page));
  },

  popup: async ({ page }, use) => {
    await use(new PopUpPage(page));
  },

  nestedIframe: async ({ page }, use) => {
    await use(new NestedIframePage(page));
  },

  shadowDOM: async ({ page }, use) => {
    await use(new ShadowDOMPage(page));
  },

  starsRating: async ({ page }, use) => {
    await use(new StarsRatingPage(page));
  },

  superheroesData: async ({}, use) => {
    await use(superheroes);
  },

  tagsData: async ({}, use) => {
    await use(tagsData);
  },
});

export { expect };
