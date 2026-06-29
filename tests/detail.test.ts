import { test, expect } from "@playwright/test";

test("character detail page loads", async ({ page }) => {
  await page.goto("http://localhost:3000/detail?type=character&id=1");
  await expect(page.getByText("Luke Skywalker")).toBeVisible({
    timeout: 10000,
  });
  await expect(page.getByText("character", { exact: true })).toBeVisible();
});

test("film detail page loads", async ({ page }) => {
  await page.goto("http://localhost:3000/detail?type=film&id=1");
  await page.waitForTimeout(1000);
  await expect(page.getByText("A New Hope")).toBeVisible();
  await expect(page.getByText("film", { exact: true })).toBeVisible();
});

test("detail page back button works", async ({ page }) => {
  await page.goto("http://localhost:3000/characters");
  await page.waitForTimeout(1000);

  // Navigate to detail page
  const firstCard = page
    .locator("a")
    .filter({ hasText: "View details" })
    .first();
  await firstCard.click();
  await expect(page).toHaveURL(/detail/);

  // Click back button and verify navigation
  await expect(page.getByText("← Back")).toBeVisible();
  await page.getByText("← Back").click();
  await page.waitForURL("http://localhost:3000/characters");
  await expect(page).toHaveURL(/characters/);
});

// Tests save and unsave and it verifies the button state changes correctly
test("detail page favourite toggle works", async ({ page }) => {
  await page.goto("http://localhost:3000/detail?type=character&id=1");
  await page.waitForTimeout(1000);

  // Save the character
  await expect(page.getByRole("button", { name: /Save/ })).toBeVisible();
  await page.getByRole("button", { name: /Save/ }).click();
  await expect(page.getByRole("button", { name: /Saved/ })).toBeVisible();

  // Unsave the character
  await page.getByRole("button", { name: /Saved/ }).click();
  await expect(page.getByRole("button", { name: /Save/ })).toBeVisible();
});

test("character detail shows correct fields", async ({ page }) => {
  await page.goto("http://localhost:3000/detail?type=character&id=1");
  await page.waitForTimeout(1000);
  await expect(page.getByText("BIRTH YEAR")).toBeVisible();
  await expect(page.getByText("GENDER")).toBeVisible();
  await expect(page.getByText("HEIGHT")).toBeVisible();
});

test("film detail shows opening crawl", async ({ page }) => {
  await page.goto("http://localhost:3000/detail?type=film&id=1");

  // Wait for film to load then check opening crawl text
  await expect(page.getByText("A New Hope")).toBeVisible({ timeout: 10000 });
  await expect(page.getByText(/It is a period of civil war/)).toBeVisible();
});

test("404 page shows for invalid routes", async ({ page }) => {
  await page.goto("http://localhost:3000/invalid-route");

  // Check custom 404 page is shown for invalid routes
  await expect(page.getByText("Error 404")).toBeVisible();
  await expect(page.getByText("Return to Previous Galaxy")).toBeVisible();
});
