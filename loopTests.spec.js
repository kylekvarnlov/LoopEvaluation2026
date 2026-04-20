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

const testData = [
  ['Web Application', 'Implement user authentication', 'To Do', ['Feature', 'High Priority']], //test case 1
  ['Web Application', 'Fix navigation bug', 'To Do', ['Bug']], //test case 2
  ['Web Application', 'Design system updates', 'In Progress', ['Design']], //test case 3
  ['Mobile Application', 'Push notification system', 'To Do', ['Feature']], //test case 4
  ['Mobile Application', 'Offline mode', 'In Progress', ['Feature', 'High Priority']], //test case 5
  ['Mobile Application', 'App icon design', 'Done', ['Design']] //test case 6
];

for (let i = 0; i < testData.length; i++) {
  const [appName, taskName, columnName, tags] = testData[i];
  test(`Test Case ${i + 1}`, async ({ page }) => {
    await login(page);
    await verifyCardDetails(page, appName, taskName, columnName, tags);
  });
}


