import { test, expect } from "@playwright/test";

test("favourites page loads", async ({ page }) => {
  await page.goto("http://localhost:3000/favourites");
  await expect(page.getByRole("heading", { name: "Favourites" })).toBeVisible();
});

test("favourites empty state shows", async ({ page }) => {
  await page.goto("http://localhost:3000/favourites");

  // Clear localStorage first
  await page.evaluate(() =>
    localStorage.removeItem("star-wars-favourites-storage"),
  );
  await page.reload();
  await expect(page.getByText("Your galaxy feels empty...")).toBeVisible();
});

// Adds a favourite from characters page then verifies it appears in favourites
test("favourites shows saved items", async ({ page }) => {
  // Clear first
  await page.goto("http://localhost:3000/characters");
  await page.evaluate(() =>
    localStorage.removeItem("star-wars-favourites-storage"),
  );
  await page.reload();
  await page.waitForTimeout(1000);

  // Add a favourite
  const firstFavBtn = page.locator("button").filter({ hasText: "★" }).first();
  await firstFavBtn.click();

  // Go to favourites
  await page.goto("http://localhost:3000/favourites");
  await expect(page.getByText("1 saved item")).toBeVisible();
});

test("favourite can be removed", async ({ page }) => {
  // Clear favourite first
  await page.goto("http://localhost:3000/characters");
  await page.evaluate(() =>
    localStorage.removeItem("star-wars-favourites-storage"),
  );
  await page.reload();
  await page.waitForTimeout(1000);

  // Add a favourite from characters page
  const firstFavBtn = page.locator("button").filter({ hasText: "★" }).first();
  await firstFavBtn.click();

  // Go to favourites and verify it was saved
  await page.goto("http://localhost:3000/favourites");
  await expect(page.getByText("1 saved item")).toBeVisible();

  // Remove the favourite
  const removeBtn = page.locator("button").filter({ hasText: "★" }).first();
  await removeBtn.click();

  // Verify empty state is shown
  await expect(page.getByText("Your galaxy feels empty...")).toBeVisible();
});
