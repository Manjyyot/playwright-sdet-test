import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';

test.describe('Country Field - Dropdown Validations', () => {
  test('should validate country selection and dropdown options', async ({
    page,
  }) => {
    const r = new RegistrationPage(page);
    await r.navigateToForm();

    // Case 1: Leave country empty → click "Create Account"
    await r.createAccountBtn.click(); // this triggers required error
    await expect(r.getErrorByText('Please select a country')).toBeVisible();

    // Case 2: Open dropdown and check options
    await r.countryDropdown.click();
    await expect(r.getByRoleOption('United States')).toBeVisible();
    await expect(r.getByRoleOption('Canada')).toBeVisible();

    // Case 3: Select "Canada" and verify input value
    await r.getByRoleOption('Canada').click();
    await expect(r.countryDropdown).toHaveValue('Canada');
    await r.page.locator('body').click();
    await expect(r.getErrorByText('Please select a country')).toBeHidden();
  });
});
