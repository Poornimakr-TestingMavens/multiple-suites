import { Page, Locator } from "@playwright/test";
import path from "path";
import fs from "fs";

export class FileDownloadPage {
    readonly page: Page;
    readonly moreLink: Locator;
    readonly fileDownloadLink: Locator;
    readonly textBox: Locator;
    readonly createBtn: Locator;
    readonly downloadLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.moreLink = page.locator('//a[text()="More"]');
        this.fileDownloadLink = page.locator('//a[text()="File Download"]');
        this.textBox = page.locator("#textbox");
        this.createBtn = page.locator("#createTxt");
        this.downloadLink = page.locator("#link-to-download");
    }

    // Navigate via More → File Download
    async navigateToFileDownload() {
        await this.moreLink.click();
        await this.fileDownloadLink.click();
    }

    // Enter text and press Enter
    async enterText(data: string) {
        await this.textBox.fill(data);
        await this.textBox.press('Enter');
    }

    // Click create file button safely
    async clickCreateButton() {
        await this.createBtn.waitFor({ state: "visible" });
        await this.createBtn.click();
    }

    // Click download and return file path
    async downloadFile(): Promise<string> {
        const [download] = await Promise.all([
            this.page.waitForEvent("download"),
            this.downloadLink.click(),
        ]);

        const filePath = path.resolve(
            __dirname,
            "..",
            "testdata",
            await download.suggestedFilename()
        );

        await download.saveAs(filePath);
        return filePath;
    }

    // Read file content
    readFile(filePath: string): string {
        return fs.readFileSync(filePath, "utf-8");
    }

    // Verify file exists
    fileExists(filePath: string): boolean {
        return fs.existsSync(filePath);
    }
}
