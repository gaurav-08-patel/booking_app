// @ts-check
import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173";


test("should allow users to sign in", async ({ page }) => {
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
