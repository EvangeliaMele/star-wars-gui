import { test, expect } from '@playwright/test';

test('films page loads', async ({ page }) => {
  await page.goto('http://localhost:3000/films');
  await expect(page.getByRole('heading', { name: 'Films' })).toBeVisible();
  await expect(page.getByPlaceholder('Search films...')).toBeVisible();
});

test('films search works', async ({ page }) => {
  await page.goto('http://localhost:3000/films');

   // Wait for search input and type a film title
  await page.waitForSelector('input[placeholder="Search films..."]');
  await page.fill('input[placeholder="Search films..."]', 'Hope');
  await page.waitForTimeout(600);
  await expect(page.getByText('A New Hope')).toBeVisible();
});

test('films search empty state', async ({ page }) => {
  await page.goto('http://localhost:3000/films');

  // Search for a non-existent film
  await page.waitForSelector('input[placeholder="Search films..."]');
  await page.fill('input[placeholder="Search films..."]', 'xyznonexistent');
  await page.waitForTimeout(600);
  await expect(page.getByText(/No films found/)).toBeVisible();
});

test('film card navigates to detail', async ({ page }) => {
  await page.goto('http://localhost:3000/films');

  // Wait for films to load
  await page.waitForTimeout(1000);

  // Click first card and verify navigation to detail page
  const firstCard = page.locator('a').filter({ hasText: 'View details' }).first();
  await expect(firstCard).toBeVisible();
  await firstCard.click();
  await expect(page).toHaveURL(/detail/);
});

test('film episode badge is visible', async ({ page }) => {
  await page.goto('http://localhost:3000/films');
  await page.waitForTimeout(1000);
  await expect(page.getByText('Episode 4', { exact: true })).toBeVisible();
});

test('film favourite toggle works', async ({ page }) => {
  await page.goto('http://localhost:3000/films');
  await page.waitForTimeout(1000);

  // Clear favourites first
  await page.evaluate(() => localStorage.removeItem('star-wars-favourites-storage'));
  await page.reload();
  await page.waitForTimeout(1000);

  // Click first favourite button
  const firstFavBtn = page.locator('button').filter({ hasText: '★' }).first();
  await expect(firstFavBtn).toBeVisible();
  await firstFavBtn.click();

  // Navigate to favourites and verify item was saved
  await page.goto('http://localhost:3000/favourites');
  await expect(page.getByText(/saved item/)).toBeVisible();
});
