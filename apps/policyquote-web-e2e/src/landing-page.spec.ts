import { expect, test } from '@playwright/test';
import { navigateToLanding } from './support/policyquote';

test.describe('PolicyQuote landing page', () => {
  test('shows the landing content and navigates to the quote form', async ({ page }) => {
    await navigateToLanding(page);

    await expect(
      page.getByRole('heading', { name: 'A clearer way to protect home' }),
    ).toBeVisible();
    await expect(page.getByTestId('why-section')).toBeVisible();
    await expect(page.getByTestId('how-it-works-section')).toBeVisible();

    await page.getByTestId('landing-cta').click();

    await expect(page).toHaveURL(/\/quote$/);
    await expect(page.getByRole('heading', { name: 'Quote', exact: true })).toBeVisible();
  });

  test('keyboard users can activate the quote CTA', async ({ page }) => {
    await navigateToLanding(page);

    await page.getByTestId('landing-cta').focus();
    await page.keyboard.press('Enter');

    await expect(page).toHaveURL(/\/quote$/);
    await expect(page.getByTestId('quote-form')).toBeVisible();
  });
});