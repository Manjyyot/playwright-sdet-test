import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';

test.describe('Password Field - Validations', () => {
  test('should validate required, strength rules, and toggle visibility', async ({
    page,
  }) => {
    const r = new RegistrationPage(page);
    await r.navigateToForm();

    // ---------- PASSWORD FIELD ----------

    // Placeholder check
    await expect(r.password).toHaveAttribute(
      'placeholder',
      'Please enter your password',
    );

    // Empty input
    await r.password.fill('');
    await r.blurElement(r.password);
    await expect(r.getErrorByText('Password is required')).toBeVisible();

    // < 12 characters
    await r.password.fill('A1@a');
    await r.blurElement(r.password);
    await expect(
      r.getErrorByText('Password must have a minimum of 12 characters'),
    ).toBeVisible();

    // No lowercase
    await r.password.fill('PASSWORD123!');
    await r.blurElement(r.password);
    await expect(
      r.getErrorByText('Password must contain at least 1 lower-case character'),
    ).toBeVisible();

    // No uppercase
    await r.password.fill('password123!');
    await r.blurElement(r.password);
    await expect(
      r.getErrorByText('Password must contain at least 1 upper-case character'),
    ).toBeVisible();

    // No digit
    await r.password.fill('Password!@#');
    await r.blurElement(r.password);
    await expect(
      r.getErrorByText('Password must contain at least 1 digit'),
    ).toBeVisible();

    // No symbol
    await r.password.fill('Password123');
    await r.blurElement(r.password);
    await expect(
      r.getErrorByText('Password must contain at least 1 symbol'),
    ).toBeVisible();

    // Valid password
    await r.password.fill('StrongPass1!');
    await r.blurElement(r.password);
    await expect(r.getErrorByText('Password is required')).toBeHidden();
    await expect(
      r.getErrorByText('Password must have a minimum of 12 characters'),
    ).toBeHidden();
    await expect(
      r.getErrorByText('Password must contain at least 1 lower-case character'),
    ).toBeHidden();
    await expect(
      r.getErrorByText('Password must contain at least 1 upper-case character'),
    ).toBeHidden();
    await expect(
      r.getErrorByText('Password must contain at least 1 digit'),
    ).toBeHidden();
    await expect(
      r.getErrorByText('Password must contain at least 1 symbol'),
    ).toBeHidden();

    // Toggle visibility
    await expect(r.password).toHaveAttribute('type', 'password');
    await r.passwordToggle.first().click();
    await expect(r.password).toHaveAttribute('type', 'text');
    await r.passwordToggle.first().click();
    await expect(r.password).toHaveAttribute('type', 'password');
  });

  test('should validate confirm password logic and toggle visibility', async ({
    page,
  }) => {
    const r = new RegistrationPage(page);
    await r.navigateToForm();

    // ---------- CONFIRM PASSWORD FIELD ----------

    // Placeholder check
    await expect(r.confirmPassword).toHaveAttribute(
      'placeholder',
      'Please re-enter your password',
    );

    // Empty input
    await r.confirmPassword.fill('');
    await r.blurElement(r.confirmPassword);
    await expect(
      r.getErrorByText('Please re-enter your password'),
    ).toBeVisible();

    // Mismatched passwords
    await r.password.fill('StrongPass1!');
    await r.confirmPassword.fill('WrongPass1!');
    await r.blurElement(r.confirmPassword);
    await r.termsCheckbox.check();
    await r.createAccountButton.click();
    await page.evaluate(() => window.scrollTo(0, 0));
    const pwdMismatchError = r.getErrorByText('Passwords do not match');
    await expect(pwdMismatchError).toBeVisible();

    // Matching passwords
    await r.confirmPassword.fill('StrongPass1!');
    await r.blurElement(r.confirmPassword);
    await expect(r.getErrorByText('Passwords do not match')).toBeHidden();
    await expect(
      r.getErrorByText('Please re-enter your password'),
    ).toBeHidden();

    // Toggle visibility for confirm password
    await expect(r.confirmPassword).toHaveAttribute('type', 'password');
    await r.passwordToggle.nth(1).click(); // show
    await expect(r.confirmPassword).toHaveAttribute('type', 'text');
    await r.passwordToggle.nth(1).click(); // hide
    await expect(r.confirmPassword).toHaveAttribute('type', 'password');
  });
});
