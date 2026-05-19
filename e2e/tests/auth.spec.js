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

test("should allow users to register", async ({ page }) => {
    const testEmail =  `test_${new Date().getTime()}@gmail.com`;
    await page.goto(UI_URL);

    //click  signin button on homepage
    await page.getByRole("link", { name: "Sign In" }).click();
    //click register button
    await page.getByRole("link", { name: "Register here" }).click();

    //verify that we are on register page
    await expect(
        page.getByRole("heading", { name: "Create an Account" }),
    ).toBeVisible();

    //fill in the form 
    await page.locator("input[name='firstName']").fill("John");
    await page.locator("input[name='lastName']").fill("Doe");
    await page.locator("input[name='email']").fill(testEmail);
    await page.locator("input[name='password']").fill("awdawd");
    await page.locator("input[name='confirmPassword']").fill("awdawd");

    //click on register button
    await page.getByRole("button", { name: "Create Account" }).click();

    //check if we have registered or not
    //toast will appear if we are registered saying "User Registered Successfully"
    await expect(page.getByText("User registered successfully.")).toBeVisible();
    // await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
    // await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
});
