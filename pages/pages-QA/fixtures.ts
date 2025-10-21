import { test as base, expect } from "@playwright/test";
import { DynamicTablePage } from "./miniWebApps";
import { VerifyAccountPage } from "./verifyAccount";
import { TagsInputPage } from "./tagsInputBox";
import { MultiDropdownPage } from "./multiDropdown";
import { MiscAppsPage } from "./miscAppsPage";
import { SortableListPage } from "./sortableList";
import { RightContextPage } from "./righContext";
import { NewTabPage, PopUpPage, NestedIframePage } from "./popNewIframes";
import { ShadowDOMPage, StarsRatingPage } from "./shadowAndRating";
import { RedirectChainPage } from "./redirectChainPage";
import { FetchDataPage } from "./fetchDataPage";
import { BasePage } from "./basePage";
import RegisterPage from "../pages-pdf/emailValidation";
import DynamicTableExportPage from "../pages-pdf/dynamicTable";
import StaticTablePage from "../pages-pdf/statictable";
import { AlertPage } from "../alertPage";
import { FileDownloadPage } from "../fileDwnld";
import { DragAndDropPage } from "../dragAndDrop";
import { FileUploadPage } from "../fileUpload";
import { ProductPage } from "../pages-pdf/productPage";

import ShopPage from "../pages-pdf/shopPage";
import * as fs from "fs";
import * as path from "path";
import * as XLSX from "xlsx";
import superheroes from "../../utils/test-data/superheroes.json";
import tagsData from "../../utils/test-data/tags.json";
import testData from "../../utils/test-data/testData.json" assert { type: "json" };
type MyFixtures = {
  // --- Web Apps ---
  basePage: BasePage;
  dynamicTable: DynamicTablePage;
  verifyAccount: VerifyAccountPage;
  tagsPage: TagsInputPage;
  multiDropdown: MultiDropdownPage;
  miscApps: MiscAppsPage;
  sortableList: SortableListPage;
  rightContext: RightContextPage;
  newTab: NewTabPage;
  popup: PopUpPage;
  nestedIframe: NestedIframePage;
  shadowDOM: ShadowDOMPage;
  starsRating: StarsRatingPage;
  redirectChain: RedirectChainPage;
  fetchData: FetchDataPage;

  // --- PDF Pages ---
  registerPage: RegisterPage;
  dynamicTableExport: DynamicTableExportPage;
  staticTablePage: StaticTablePage;
    // --- PDF Pages ---

  shopPage: ShopPage;
  productPage: ProductPage;



  // --- Windows & Frames ---
  alertPage: AlertPage;
  fileDownloadPage: FileDownloadPage;
  dragAndDropPage: DragAndDropPage;
  fileUploadPage: FileUploadPage;

  // --- Utils & Data ---
  fs: typeof fs;
  path: typeof path;
  XLSX: typeof XLSX;
  superheroesData: typeof superheroes;
  tagsData: typeof tagsData;
  testData: typeof testData;
  // --- URLs & Constants ---
  BASE_URL: string;
  NEW_TAB_PAGE_URL: string;
  NEW_TAB_PAGE_HEADER: string;
  STARS_RATING_PAGE_URL: string;
  SHADOW_DOM_PAGE_URL: string;
  SHADOW_DOM_EXPECTED_PROGRESS: string;
  VERIFY_ACCOUNT_CODE_POSITIVE: string;
  VERIFY_ACCOUNT_CODE_NEGATIVE: string;
};

export const test = base.extend<MyFixtures>({
  // --- Web Apps ---
  basePage: async ({ page }, use) => await use(new BasePage(page)),
  dynamicTable: async ({ page }, use) => await use(new DynamicTablePage(page)),
  verifyAccount: async ({ page }, use) => await use(new VerifyAccountPage(page)),
  tagsPage: async ({ page }, use) => await use(new TagsInputPage(page)),
  multiDropdown: async ({ page }, use) => await use(new MultiDropdownPage(page)),
  miscApps: async ({ page }, use) => await use(new MiscAppsPage(page)),
  sortableList: async ({ page }, use) => await use(new SortableListPage(page)),
  rightContext: async ({ page }, use) => await use(new RightContextPage(page)),
  newTab: async ({ page }, use) => await use(new NewTabPage(page)),
  popup: async ({ page }, use) => await use(new PopUpPage(page)),
  nestedIframe: async ({ page }, use) => await use(new NestedIframePage(page)),
  shadowDOM: async ({ page }, use) => await use(new ShadowDOMPage(page)),
  starsRating: async ({ page }, use) => await use(new StarsRatingPage(page)),
  redirectChain: async ({ page }, use) => await use(new RedirectChainPage(page)),
  fetchData: async ({ page }, use) => await use(new FetchDataPage(page)),

  // --- PDF Pages ---
  registerPage: async ({ page, context }, use) => {
    const yopmailPage = await context.newPage();
    await use(new RegisterPage(page, yopmailPage));
  },
  dynamicTableExport: async ({ page }, use) => await use(new DynamicTableExportPage(page)),
  staticTablePage: async ({ page }, use) => await use(new StaticTablePage(page)),

  // --- Windows & Frames ---
  alertPage: async ({ page }, use) => await use(new AlertPage(page)),
  fileDownloadPage: async ({ page }, use) => await use(new FileDownloadPage(page)),
  dragAndDropPage: async ({ page }, use) => await use(new DragAndDropPage(page)),
  fileUploadPage: async ({ page }, use) => await use(new FileUploadPage(page)),

  // --- Utilities & Data ---
  fs: async ({}, use) => await use(fs),
  path: async ({}, use) => await use(path),
  XLSX: async ({}, use) => await use(XLSX),
  superheroesData: async ({}, use) => await use(superheroes),
  tagsData: async ({}, use) => await use(tagsData),
  testData: async ({}, use) => await use(testData),
   // --- URLs & Constants ---
  BASE_URL: async ({}, use) => await use("https://qaplayground.dev"),
  NEW_TAB_PAGE_URL: async ({ BASE_URL }, use) => await use(`${BASE_URL}/apps/new-tab/new-page`),
  NEW_TAB_PAGE_HEADER: async ({}, use) => await use("Welcome to the new page!"),
  STARS_RATING_PAGE_URL: async ({ BASE_URL }, use) => await use(`${BASE_URL}/apps/rating/`),
  SHADOW_DOM_PAGE_URL: async ({ BASE_URL }, use) => await use(`${BASE_URL}/apps/shadow-dom/`),
  SHADOW_DOM_EXPECTED_PROGRESS: async ({}, use) => await use("95"),
  VERIFY_ACCOUNT_CODE_POSITIVE: async ({}, use) => await use("999999"),
  VERIFY_ACCOUNT_CODE_NEGATIVE: async ({}, use) => await use("111111"),
  shopPage: async ({ page }, use) => await use(new ShopPage(page)),
  productPage: async ({ page }, use) => await use(new ProductPage(page)),
});

export { expect };
