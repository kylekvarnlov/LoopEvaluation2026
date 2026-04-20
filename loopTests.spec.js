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
  await page.getByRole('button', { name: new RegExp(appName, 'i') }).click();
  await expect(page.getByText(taskName, { exact: true })).toBeVisible();
  const columnSection = page.locator(`text=${columnName}`).locator('..');
  await expect(columnSection).toContainText(taskName);
  const taskCard = columnSection.getByText(taskName, { exact: true }).locator('..');
  for(const tag of tags){
    await expect(taskCard).toContainText(tag);
  }

}

const testData = [
  {
    name: "Test Case 1",
    appName: 'Web Application',
    taskName: 'Implement user authentication',
    columnName: 'To Do',
    tags: ['Feature', 'High Priority']
  },
  {
    name: "Test Case 2",
    appName: 'Web Application',
    taskName: 'Fix navigation bug',
    columnName: 'To Do',
    tags: ['Bug']
  },
  {
    name: "Test Case 3",
    appName: 'Web Application',
    taskName: 'Design system updates',
    columnName: 'In Progress',
    tags: ['Design']
  },
  {
    name: "Test Case 4",
    appName: 'Mobile Application',
    taskName: 'Push notification system',
    columnName: 'To Do',
    tags: ['Feature']
  },
  {
    name: "Test Case 5",
    appName: 'Mobile Application',
    taskName: 'Offline mode',
    columnName: 'In Progress',
    tags: ['Feature', 'High Priority']
  },
  {
    name: "Test Case 6",
    appName: 'Mobile Application',
    taskName: 'App icon design',
    columnName: 'Done',
    tags: ['Design'] 
  }
];

for (const data of testData) {
  test(data.name, async ({ page }) => {
    await login(page);
    await verifyCardDetails(page, data.appName, data.taskName, data.columnName, data.tags);
  });
}


