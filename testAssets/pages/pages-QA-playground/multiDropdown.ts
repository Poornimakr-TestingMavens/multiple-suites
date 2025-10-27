import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../../pages/pages-QA-playground/basePage";

/**
 * Page Object Model for the Multi-Level Dropdown application.
 * Handles navigation, validation, and interaction with dropdown menus and their nested options.
 */
export class MultiDropdownPage extends BasePage {
  readonly page: Page;
  readonly appLink: Locator;
  readonly dropdownIcon: Locator;
  readonly myProfile: Locator;
  readonly settings: Locator;
  readonly animals: Locator;
  readonly backFromSettings: Locator;
  readonly backFromAnimals: Locator;

  /**
   * Initializes all locators required for interacting with the Multi-Level Dropdown page.
   * @param {Page} page - The Playwright Page instance used to control the browser.
   */
  constructor(page: Page) {
    super(page);
    this.page = page;
    this.appLink = page.locator('//h3[text()="Multi Level Dropdown"]');
    this.dropdownIcon = page.locator(
      '//a[@href="#home"]//*[name()="svg" and @viewBox="0 0 320 512"]'
    );
    this.myProfile = page.locator('//a[@href="#undefined"]');
    this.settings = page.locator('//a[text()="Settings"]');
    this.animals = page.locator('//a[@href="#animals"]');
    this.backFromSettings = page.locator('//h2[text()="My Tutorial"]');
    this.backFromAnimals = page.locator('//h2[text()="Animals"]');
  }

  /**
   * Navigates to the Multi-Level Dropdown section on the page.
   *
   * @returns {Promise<void>} Resolves when navigation is complete.
   */
  async navigate(): Promise<void> {
    await this.appLink.scrollIntoViewIfNeeded();
    await this.appLink.click();
  }

  /**
   * Validates that the main dropdown options (My Profile, Settings, Animals) are visible.
   * Expands the dropdown before performing checks.
   *
   * @returns {Promise<void>} Resolves after verifying the main menu items.
   */
  async validateMainOptions(): Promise<void> {
    await expect(this.dropdownIcon).toBeVisible();
    await this.dropdownIcon.click();
    await expect(this.myProfile).toBeVisible();
    await expect(this.settings).toBeVisible();
    await expect(this.animals).toBeVisible();
  }

  /**
   * Opens the Settings submenu and validates that the settings page is displayed.
   *
   * @returns {Promise<void>} Resolves when the Settings page title is visible.
   */
  async openSettingsAndValidate(): Promise<void> {
    await this.settings.click();
    await expect(this.backFromSettings).toBeVisible();
  }

  /**
   * Validates the available options under the Settings submenu and navigates back.
   *
   * @returns {Promise<void>} Resolves after verifying all Settings options and returning to the main menu.
   */
  async validateSettingsOptions(): Promise<void> {
    for (const opt of ["HTML", "CSS", "JavaScript", "Awesome!"]) {
      await expect(this.page.locator(`//a[text()="${opt}"]`)).toBeVisible();
    }
    await this.backFromSettings.click();
  }

  /**
   * Opens the Animals submenu and validates that the Animals page is displayed.
   *
   * @returns {Promise<void>} Resolves when the Animals page title is visible.
   */
  async openAnimalsAndValidate(): Promise<void> {
    await this.animals.click();
    await expect(this.backFromAnimals).toBeVisible();
  }

  /**
   * Validates the available animal options under the Animals submenu and navigates back.
   *
   * @returns {Promise<void>} Resolves after verifying all animal options and returning to the main menu.
   */
  async validateAnimalOptions(): Promise<void> {
    for (const animal of ["Kangaroo", "Frog", "Horse", "Hedgehog"]) {
      await expect(this.page.locator(`//a[text()="${animal}"]`)).toBeVisible();
    }
    await this.backFromAnimals.click();
  }
}
