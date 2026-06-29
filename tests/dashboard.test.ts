import { test, expect } from '@playwright/test';

// Helper to dismiss welcome modal via localStorage before page loads
async function dismissWelcomeModal(page: import('@playwright/test').Page) {
  await page.addInitScript(() => {
    localStorage.setItem('hasSeenWelcome', 'true');
  });
}

test('navbar is visible', async ({ page }) => {
  await dismissWelcomeModal(page);
  await page.goto('http://localhost:3000/dashboard');

  // Check navbar visibility
  await expect(page.getByRole('navigation')).toBeVisible();

  // Check logo
  await expect(page.getByAltText('Star Wars')).toBeVisible();

  // Check nav links
  await expect(page.getByRole('link', { name: 'Dashboard', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Characters', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Films', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Favourites', exact: true })).toBeVisible();
});

// Tests all nav links navigate to the correct pages
test('navbar navigation works', async ({ page }) => {
  await dismissWelcomeModal(page);
  await page.goto('http://localhost:3000/dashboard');
  await page.getByRole('link', { name: 'Characters', exact: true }).click();
  await page.waitForURL('http://localhost:3000/characters');
  await expect(page).toHaveURL(/characters/);
  await page.getByRole('link', { name: 'Films', exact: true }).click();
  await page.waitForURL('http://localhost:3000/films');
  await expect(page).toHaveURL(/films/);
  await page.getByRole('link', { name: 'Dashboard', exact: true }).click();
  await page.waitForURL('http://localhost:3000/dashboard');
  await expect(page).toHaveURL(/dashboard/);
});

test('hero section is visible', async ({ page }) => {
  await dismissWelcomeModal(page);
  await page.goto('http://localhost:3000/dashboard');

  // Check hero text and main heading are visible
  await expect(page.getByText('Welcome to the')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('stats cards are visible', async ({ page }) => {
  await dismissWelcomeModal(page);
  await page.goto('http://localhost:3000/dashboard');

  // Check all three stats cards are visible
  await expect(page.getByRole('link', { name: /Characters Heroes/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /Films The complete/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /Favourites Your personally/ })).toBeVisible();
});

test('stats cards navigate correctly', async ({ page }) => {
  await dismissWelcomeModal(page);
  await page.goto('http://localhost:3000/dashboard');

  // Click Characters card
  await page.getByRole('link', { name: /Characters Heroes/ }).click();
  await page.waitForURL('http://localhost:3000/characters');
  await expect(page).toHaveURL(/characters/);
  await dismissWelcomeModal(page);
  await page.goto('http://localhost:3000/dashboard');

  // Click Films card
  await page.getByRole('link', { name: /Films The complete/ }).click();
  await page.waitForURL('http://localhost:3000/films');
  await expect(page).toHaveURL(/films/);
});

test('footer is visible', async ({ page }) => {
  await dismissWelcomeModal(page);
  await page.goto('http://localhost:3000/dashboard');
  await expect(page.getByRole('contentinfo')).toBeVisible();
  await expect(page.getByText('Powered by SWAPI')).toBeVisible();
});

