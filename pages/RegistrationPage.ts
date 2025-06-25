import { Locator, Page } from '@playwright/test';

export class RegistrationPage {
  readonly page: Page;

  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly username: Locator;
  readonly email: Locator;
  readonly countryDropdown: Locator;
  readonly createAccountBtn: Locator;
  termsCheckbox: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstName = page.getByLabel('First Name');
    this.lastName = page.getByLabel('Last Name');
    this.username = page.getByLabel('Username');
    this.email = page.locator('input[name="emailAddress"]');
    this.countryDropdown = page.getByTestId('country');
    this.createAccountBtn = page.getByRole('button', {
      name: /Create Account/i,
    });
    this.termsCheckbox = page.locator('input[type="checkbox"][name="terms"]');
  }

  async navigateToForm() {
    await this.page.goto('https://bolt.playrealbrokerage.com/');
    await this.page.getByRole('link', { name: /Join Real/i }).click();
  }

  getErrorByText(text: string): Locator {
    return this.page.locator('.mantine-Text-root', { hasText: text });
  }

  getByRoleOption(optionText: string): Locator {
    return this.page.getByRole('option', { name: optionText });
  }

  async blurElement(locator: Locator): Promise<void> {
    await locator.evaluate((el: HTMLElement) => el.blur());
  }

  get password() {
    return this.page.getByTestId('password');
  }

  get passwordToggle() {
    return this.password.locator('..').locator('[data-icon*="eye"]').first();
  }

  get confirmPassword() {
    return this.page.getByTestId('confirmPassword');
  }

  get createAccountButton() {
    return this.page.getByRole('button', { name: /Create Account/i });
  }
}
