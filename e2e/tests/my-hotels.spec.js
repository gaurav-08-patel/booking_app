import { test, expect } from "@playwright/test";
import path from "node:path";

const UI_URL = "http://localhost:5173";

test.beforeEach(async ({ page }) => {
    await page.goto(UI_URL);

    //click signin button on homepage
    await page.getByRole("link", { name: "Sign In" }).click();

    //check if we're on the sign in page
    await expect(page.getByRole("heading", { name: "SignIn" })).toBeVisible();

    //find input field by name and enter email
    await page.locator('input[name="email"]').fill("awd@awd.com");

    //find input field by name and enter password
    await page.locator('input[name="password"]').fill("awdawd");

    // click login button
    await page.getByRole("button", { name: "Login" }).click();

    //check if we are logged in
    //either the sign out button is visible or My bookings button is visible
    await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
    await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
});

test("should allow user to addHotel", async ({ page }) => {
    await page.goto(UI_URL + "/addHotel");

    await expect(
        page.getByRole("heading", { name: "Add Hotel" }),
    ).toBeVisible();
    await page.locator("input[name='name']").fill("Test Hotel");
    await page.locator("input[name='city']").fill("Test city");
    await page.locator("input[name='country']").fill("Test country");
    await page
        .locator("textarea[name='description']")
        .fill("This is test description for test hotel");
    await page.locator("input[name='pricePerNight']").fill("1000");
    await page.selectOption("select[name='starRating']", "5 Star");
    await page.getByText("Resort").click();
    await page.getByText("Free Wi-Fi").check();
    await page.getByText("Parking").check();
    await page.locator("input[name='adultCount']").fill("2");
    await page.locator("input[name='childCount']").fill("1");
    await page.setInputFiles("input[name='images']", [
        path.join(__dirname, "files", "1.png")
    ]);

    await page.getByRole("button", { name: "Save" }).click();

    //wait for response
    await page.waitForSelector("text=Hotel registered successfully.", {
        state: "visible",
        timeout: 50000,
    });

    await expect(page.getByText("Hotel registered successfully.")).toBeVisible({
        timeout: 5000,
    });
});
