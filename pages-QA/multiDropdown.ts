import { Page, Locator, expect } from "@playwright/test";

export class MultiDropdownPage {
  readonly page: Page;
 // readonly heading: Locator;
  readonly appLink: Locator;
  readonly dropdownIcon: Locator;
  readonly myProfile: Locator;
  readonly settings: Locator;
  readonly animals: Locator;
  readonly backFromSettings: Locator;
  readonly backFromAnimals: Locator;

  constructor(page: Page) {
    this.page = page;
    //this.heading = page.locator('//h1[text()="Multi Level Dropdown"]');
    this.appLink = page.locator('//h3[text()="Multi Level Dropdown"]');
    this.dropdownIcon = page.locator('//a[@href="#home"]//*[name()="svg" and @viewBox="0 0 320 512"]');

    this.myProfile = page.locator('//a[@href="#undefined"]');
    this.settings = page.locator('//a[text()="Settings"]');
    this.animals = page.locator('//a[@href="#animals"]');

    this.backFromSettings = page.locator('//h2[text()="My Tutorial"]');
    this.backFromAnimals = page.locator('//h2[text()="Animals"]');
  }

  async navigate() {
    await this.appLink.scrollIntoViewIfNeeded();
    await this.appLink.click();
    //await expect(this.heading).toBeVisible();
  }

  async validateMainOptions() {
    
    await expect(this.dropdownIcon).toBeVisible();

    await this.dropdownIcon.click();
    await expect(this.myProfile).toBeVisible();
    await expect(this.settings).toBeVisible();
    await expect(this.animals).toBeVisible();
  }

  async openSettingsAndValidate() {
    //await this.dropdownIcon.click();
    await this.settings.click();
    await expect(this.backFromSettings).toBeVisible();
  }

  async validateSettingsOptions() {

    for (const opt of ["HTML", "CSS", "JavaScript", "Awesome!"]) {
      await expect(this.page.locator(`//a[text()="${opt}"]`)).toBeVisible();
    }
    await this.backFromSettings.click(); // go back
   
  }

  async openAnimalsAndValidate() {
    //await this.dropdownIcon.click();
    await this.animals.click();
    await expect(this.backFromAnimals).toBeVisible();
  }

  async validateAnimalOptions() {
    for (const animal of ["Kangaroo", "Frog", "Horse", "Hedgehog"]) {
      await expect(this.page.locator(`//a[text()="${animal}"]`)).toBeVisible();
    }
    await this.backFromAnimals.click(); // go back
  }
}
