import { test, expect } from '@playwright/test';

test('characters page loads', async ({ page }) => {
  await page.goto('http://localhost:3000/characters');

  // Check page heading and search input are visible
  await expect(page.getByRole('heading', { name: 'Characters' })).toBeVisible();
  await expect(page.getByPlaceholder('Search characters...')).toBeVisible();
});

test('characters search works', async ({ page }) => {
  await page.goto('http://localhost:3000/characters');

  // Wait for search input and type a character name
  await page.waitForSelector('input[placeholder="Search characters..."]');
  await page.fill('input[placeholder="Search characters..."]', 'Luke');
  await page.waitForTimeout(600);
  await expect(page.getByText('Luke Skywalker')).toBeVisible();
});

test('characters search empty state', async ({ page }) => {
  await page.goto('http://localhost:3000/characters');

  // Search for a non-existent character
  await page.waitForSelector('input[placeholder="Search characters..."]');
  await page.fill('input[placeholder="Search characters..."]', 'xyznonexistent');
  await page.waitForTimeout(600);
  await expect(page.getByText(/No characters found/)).toBeVisible();
});

test('character card navigates to detail', async ({ page }) => {
  await page.goto('http://localhost:3000/characters');

  // Wait for characters to load
  await page.waitForTimeout(2000);

  // Click first card and verify navigation to detail page
  const firstCard = page.locator('a').filter({ hasText: 'View details' }).first();
  await expect(firstCard).toBeVisible();
  await firstCard.click();
  await page.waitForURL(/detail/, { timeout: 10000 });
  await expect(page).toHaveURL(/detail/);
});

// Clears localStorage before testing to ensure a clean state
test('character favourite toggle works', async ({ page }) => {
  await page.goto('http://localhost:3000/characters');
  await page.waitForTimeout(1000);

  // Clear favourites first
  await page.evaluate(() => localStorage.removeItem('star-wars-favourites-storage'));
  await page.reload();
  await page.waitForTimeout(1000);

  // Click first favourite button
  const firstFavBtn = page.locator('button').filter({ hasText: '★' }).first();
  await expect(firstFavBtn).toBeVisible();
  await firstFavBtn.click();

  // Navigate to favourites
  await page.goto('http://localhost:3000/favourites');
  await expect(page.getByText('1 saved item')).toBeVisible();
});

// Waits 2s for all 82 characters to load before checking pagination
test('characters pagination works', async ({ page }) => {
  await page.goto('http://localhost:3000/characters');
  await page.waitForTimeout(2000);

// Check Next button and click it
const nextBtn = page.getByRole('button', { name: 'Next →' });
await expect(nextBtn).toBeVisible();
await nextBtn.click();
await page.waitForTimeout(500);

// Previous button should now be visible on page 2
const prevBtn = page.getByRole('button', { name: '← Prev' });
await expect(prevBtn).toBeVisible();
});

