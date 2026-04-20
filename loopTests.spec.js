// @ts-check
import { test, expect } from '@playwright/test';

async function login(page){
  await page.goto('https://animated-gingersnap-8cf7f2.netlify.app/');

  // Fill in the username and password fields.
  await page.locator('input[type="text"]').fill('admin');
  await page.locator('input[type="password"]').fill('password123');
  await page.locator('button[type="submit"]').click();

  await expect(page.getByRole('button', { name: /Web Application/i })).toBeVisible();
}

async function verifyCardDetails(page, appName, taskName, columnName, tags){
  await page.getByRole('button', { name: appName }).click();
  await expect(page.getByText(taskName, { exact: true })).toBeVisible();
  const columnSection = page.locator(`text=${columnName}`).locator('..');
  await expect(columnSection).toContainText(taskName);
 
  const taskCard = page.getByText(taskName, { exact: true }).locator('..');
  for(const tag of tags){
    await expect(taskCard).toContainText(tag);
  }

}



test('Test Case 1', async ({ page }) => {
await login(page);
await page.getByRole('button', { name: /Web Application/i }).click();
await expect(page.getByText('Implement user authentication', { exact: true })).toBeVisible();
await verifyCardDetails(page, 'Web Application', 'Implement user authentication', 'To Do', ['Feature', 'High Priority']);
});

test('Test Case 2', async ({ page }) => {
await login(page);
await page.getByRole('button', { name: /Web Application/i }).click();
await expect(page.getByText('Fix navigation bug', { exact: true })).toBeVisible();
await verifyCardDetails(page, 'Web Application', 'Fix navigation bug', 'To Do', ['Bug']);
});

test('Test Case 3', async ({ page }) => {
await login(page);
await page.getByRole('button', { name: /Web Application/i }).click();
await expect(page.getByText('Design system updates', { exact: true })).toBeVisible();
await verifyCardDetails(page, 'Web Application', 'Design system updates', 'In Progress', ['Design']);
});

test('Test Case 4', async ({ page }) => {
await login(page);
await page.getByRole('button', { name: /Mobile Application/i }).click();
await expect(page.getByText('Push notification system', { exact: true })).toBeVisible();
await verifyCardDetails(page, 'Mobile Application', 'Push notification system', 'To Do', ['Feature']);
});

test('Test Case 5', async ({ page }) => {
await login(page);
await page.getByRole('button', { name: /Mobile Application/i }).click();
await expect(page.getByText('Offline mode', { exact: true })).toBeVisible();
await verifyCardDetails(page, 'Mobile Application', 'Offline mode', 'In Progress', ['Feature', 'High Priority']);
});

test('Test Case 6', async ({ page }) => {
await login(page);
await page.getByRole('button', { name: /Mobile Application/i }).click();
await expect(page.getByText('App icon design', { exact: true })).toBeVisible();
await verifyCardDetails(page, 'Mobile Application', 'App icon design', 'Done', ['Design']);
});


