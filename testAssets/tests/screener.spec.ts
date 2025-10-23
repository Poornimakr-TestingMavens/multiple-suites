import { test, expect } from "../pages/fixture";
import user1 from "../testdata/user.json";

test.describe("Validate through email if the user is registered", () => {
  test("Register and verify email on Screener.in using YOPmail", async ({
    context,
    scre,
  }) => {
    const yopEmail = user1.user1[0].User;
    const password = user1.user1[0].Password;

    await test.step("Launch Screener.in website and navigate to registration page", async () => {
      await scre.launchWebsite();
      await scre.gotoRegistration();
    });

    await test.step("Register user with provided email and password", async () => {
      await scre.register(yopEmail, password);
    });

    await test.step("Verify registration email received on YOPmail", async () => {
      await scre.verifyEmailFromYopmail(context, yopEmail);
    });
  });
});
