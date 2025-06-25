import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';

test.describe('Email Field - Validation Cases', () => {
  test('should show required, invalid format, and already taken error messages', async ({
    page,
  }) => {
    const r = new RegistrationPage(page);
    await r.navigateToForm();

    // Wait until form is visible
    await expect(r.createAccountBtn).toBeVisible();

    // ---- Case 1: Empty email ----
    await r.email.fill('');
    await r.blurElement(r.email);
    await expect(r.getErrorByText('Email is required')).toBeVisible();

    // ---- Case 2: Invalid format ----
    await r.email.fill('notanemail');
    await r.blurElement(r.email);
    await expect(r.getErrorByText('Invalid email address')).toBeVisible();

    // ---- Case 3: Valid but already taken ----
    await r.email.fill('manjyotsinghchaudhary@gmail.com');

    // Fill other required fields minimally to reach submit
    await r.firstName.fill('Manjyot');
    await r.lastName.fill('Singh');
    await r.username.fill('manjyotQA999');
    await r.createAccountBtn.click();

    // Wait for the server-side error
    const takenError = r.getErrorByText('Email is already taken');
    await expect(takenError).toBeVisible();
  });
});
