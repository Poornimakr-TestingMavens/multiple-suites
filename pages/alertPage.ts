import { Page, expect, Locator } from "@playwright/test";

/**
 * Page Object Model for handling various types of alerts on the Alerts page.
 * Supports alert with OK, alert with OK & Cancel, and prompt alerts.
 */
export class AlertPage {
  readonly page: Page;
  readonly switchToButton: Locator;
  readonly alertsButton: Locator;
  readonly alertwithOKButton: Locator;
  readonly displayAlertBox: Locator;
  readonly alertWithOKandCancelButton: Locator;
  readonly alertWithTextBox: Locator;
  readonly confirmForOkAndCancel: Locator;
  readonly alertForTextBox: Locator;

  /**
   * Initializes all locators for the Alerts page.
   * @param page - The Playwright Page instance representing the current browser page.
   */
  constructor(page: Page) {
    this.page = page;
    this.switchToButton = page.locator('//a[text()="SwitchTo"]');
    this.alertsButton = page.locator('//a[text()="Alerts"]');
    this.alertwithOKButton = page.locator('//a[text()="Alert with OK "]');
    this.displayAlertBox = page.locator('//div[@id="OKTab"]');
    this.alertWithOKandCancelButton = page.locator(
      '//a[text()="Alert with OK & Cancel "]'
    );
    this.alertWithTextBox = page.locator('//a[text()="Alert with Textbox "]');
    this.confirmForOkAndCancel = page.locator('//div[@id="CancelTab"]');
    this.alertForTextBox = page.locator('//div[@id="Textbox"]');
  }

  /**
   * Clicks the "SwitchTo" button to navigate to the Alerts section.
   */
  async clickOnSwitchToButton() {
    await this.switchToButton.click();
  }

  /**
   * Clicks the "Alerts" button to display alert options.
   */
  async clickOnAlertsButton() {
    await this.alertsButton.click();
  }

  /**
   * Clicks the "Alert with OK" button to trigger a simple alert.
   */
  async clickOnAlertwithOKButton() {
    await this.alertwithOKButton.click();
  }

  /**
   * Handles a simple alert with OK button.
   * Waits for the dialog, accepts it, and returns the alert message.
   * @returns The message text displayed in the alert dialog.
   */
  async handleAlertBox(): Promise<string> {
    return new Promise(async (resolve) => {
      this.page.once("dialog", async (dialog) => {
        const message = dialog.message();
        await dialog.accept();
        resolve(message);
      });
      await this.displayAlertBox.locator("button").click();
    });
  }

  /**
   * Handles a confirmation alert with OK & Cancel options.
   * Waits for the dialog, either accepts or dismisses it based on the parameter, and returns the message.
   * @param accept - Whether to accept (true) or dismiss (false) the alert. Default is true.
   * @returns The message text displayed in the confirmation dialog.
   */
  async handleConfirmAlert(accept: boolean = true): Promise<string> {
    return new Promise(async (resolve) => {
      await this.alertWithOKandCancelButton.click();
      this.page.once("dialog", async (dialog) => {
        const message = dialog.message();
        if (accept) await dialog.accept();
        else await dialog.dismiss();
        resolve(message);
      });
      await this.confirmForOkAndCancel.locator("button").click();
    });
  }

  /**
   * Handles a prompt alert with a text input box.
   * Waits for the dialog, optionally enters text and either accepts or dismisses it, then returns the message.
   * @param inputText - The text to input into the prompt. Optional.
   * @param accept - Whether to accept (true) or dismiss (false) the prompt. Default is true.
   * @returns The message text displayed in the prompt alert dialog.
   */
  async handlePromptAlert(
    inputText?: string,
    accept: boolean = true
  ): Promise<string> {
    return new Promise(async (resolve) => {
      await this.alertWithTextBox.click();

      this.page.once("dialog", async (dialog) => {
        const message = dialog.message();
        if (accept) await dialog.accept(inputText);
        else await dialog.dismiss();
        resolve(message);
      });

      await this.alertForTextBox.locator("button").click();
    });
  }
}
