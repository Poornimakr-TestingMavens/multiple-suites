import { Page,expect,Locator } from "@playwright/test";
export class AlertPage {
    readonly page;
    readonly switchToButton: Locator;
    readonly alertsButton: Locator;
    readonly alertwithOKButton: Locator;
    readonly displayAlertBox: Locator;
    readonly alertWithOKandCancelButton: Locator;
    readonly alertWithTextBox: Locator;
    readonly confirmForOkAndCancel: Locator;
    readonly alertForTextBox: Locator;


    constructor(page: Page) {
        this.page = page;
        this.switchToButton = page.locator('//a[text()="SwitchTo"]');
        this.alertsButton = page.locator('//a[text()="Alerts"]');
        this.alertwithOKButton = page.locator('//a[text()="Alert with OK "]');
        this.displayAlertBox = page.locator('//div[@id="OKTab"]');
        this.alertWithOKandCancelButton = page.locator('//a[text()="Alert with OK & Cancel "]');
        this.alertWithTextBox = page.locator('//a[text()="Alert with Textbox "]');
        this.confirmForOkAndCancel = page.locator('//div[@id="CancelTab"]');
        this.alertForTextBox = page.locator('//div[@id="Textbox"]');




    }
    async clickOnSwitchToButton() {
        await this.switchToButton.click();
    }
    async clickOnAlertsButton() {
        await this.alertsButton.click();
    }
    async clickOnAlertwithOKButton() {
        await this.alertwithOKButton.click();
    }
  async handleAlertBox(): Promise<string> {
    return new Promise(async (resolve) => {
        this.page.once('dialog', async (dialog) => {
            const message = dialog.message();
            await dialog.accept();
            resolve(message);
        });
        await this.displayAlertBox.locator('button').click();
    });



    
}
async handleConfirmAlert(accept: boolean = true): Promise<string> {
    return new Promise(async (resolve) => {
        // First click the "Alert with OK & Cancel" link to show the button
        await this.alertWithOKandCancelButton.click();

        // Then handle the confirm dialog
        this.page.once('dialog', async (dialog) => {
            const message = dialog.message();
            if (accept) await dialog.accept();
            else await dialog.dismiss();
            resolve(message);
        });

        // Now click the actual button inside the CancelTab
        await this.confirmForOkAndCancel.locator('button').click();
    });
}
async handlePromptAlert(inputText?: string, accept: boolean = true): Promise<string> {
    return new Promise(async (resolve) => {
        await this.alertWithTextBox.click();

        this.page.once('dialog', async (dialog) => {
            const message = dialog.message();
            if (accept) await dialog.accept(inputText);
            else await dialog.dismiss();
            resolve(message);
        });

        await this.alertForTextBox.locator('button').click();
    });
}

}