import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';

test.describe('First Name Field - All Validations', () => {
  test('should validate required, min length, and alphanumeric for First Name', async ({
    page,
  }) => {
    const r = new RegistrationPage(page);
    await r.navigateToForm();

    await r.firstName.fill('');
    await r.blurElement(r.firstName);
    await expect(r.getErrorByText('First name is required')).toBeVisible();

    await r.firstName.fill('A');
    await r.blurElement(r.firstName);
    await expect(
      r.getErrorByText('Must be at least 2 characters'),
    ).toBeVisible();

    await r.firstName.fill('meee]');
    await r.blurElement(r.firstName);
    await expect(
      r.getErrorByText('Please enter a valid first name'),
    ).toBeVisible();

    await r.firstName.fill('Jane1');
    await r.blurElement(r.firstName);
    await expect(
      r.getErrorByText('Please enter a valid first name'),
    ).toHaveCount(0);
  });
});

test.describe('Last Name Field - All Validations', () => {
  test('should validate required, min length, and alphanumeric for Last Name', async ({
    page,
  }) => {
    const r = new RegistrationPage(page);
    await r.navigateToForm();

    await r.lastName.fill('');
    await r.blurElement(r.lastName);
    await expect(r.getErrorByText('Last name is required')).toBeVisible();

    await r.lastName.fill('D');
    await r.blurElement(r.lastName);
    await expect(
      r.getErrorByText('Must be at least 2 characters'),
    ).toBeVisible();

    await r.lastName.fill('pop0ll//');
    await r.blurElement(r.lastName);
    await expect(
      r.getErrorByText('Please enter a valid last name'),
    ).toBeVisible();

    await r.lastName.fill('Doe99');
    await r.blurElement(r.lastName);
    await expect(
      r.getErrorByText('Please enter a valid last name'),
    ).toHaveCount(0);
  });
});

test.describe('Username Field - All Validations', () => {
  test('should validate required, min length, alphanumeric, and already taken username', async ({
    page,
  }) => {
    const r = new RegistrationPage(page);
    await r.navigateToForm();

    // Case 1: Required
    await r.username.fill('');
    await r.blurElement(r.username);
    await expect(r.getErrorByText('Username is required')).toBeVisible();

    // Case 2: Min Length
    await r.username.fill('p');
    await r.blurElement(r.username);
    await expect(
      r.getErrorByText('Username must be at least 2 characters'),
    ).toBeVisible();

    // Case 3: Invalid Characters
    await r.username.fill('poiuh0=');
    await r.blurElement(r.username);
    await expect(
      r.getErrorByText('Username can only have letters and numbers'),
    ).toBeVisible();

    // Case 4: Valid but already taken
    await r.username.fill('mmm');
    await r.blurElement(r.username);
    await expect(r.getErrorByText('Username is already taken')).toBeVisible();

    // Case 5: Valid and Available
    await r.username.fill('manjyot777');
    await r.blurElement(r.username);
    await expect(r.getErrorByText('Username is already taken')).toHaveCount(0);
    await expect(
      r.getErrorByText('Username can only have letters and numbers'),
    ).toHaveCount(0);
  });
});
