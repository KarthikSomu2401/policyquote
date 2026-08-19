import { expect, test } from '@playwright/test';
import {
  completeQuoteForm,
  expectQuoteResult,
  expectRequiredFieldErrors,
  mockPendingQuote,
  mockQuoteError,
  mockQuoteSuccess,
  navigateToQuote,
} from './support/policyquote';

test.describe('PolicyQuote quote form', () => {
  test('shows validation errors for required fields', async ({ page }) => {
    await navigateToQuote(page);

    await page.getByTestId('get-quote-button').click();

    await expectRequiredFieldErrors(page);
    await expect(page.getByTestId('customer-name-error')).toBeVisible();
  });

  test('submits with the keyboard and shows the quote result', async ({ page }) => {
    await mockQuoteSuccess(page);
    await navigateToQuote(page);
    await completeQuoteForm(page);

    await page.getByTestId('get-quote-button').focus();
    await page.keyboard.press('Enter');

    await expectQuoteResult(page);
    await expect(page.getByTestId('quote-result')).toBeVisible();
  });

  test('shows the premium, risk band and applied factors after submission', async ({ page }) => {
    await mockQuoteSuccess(page);
    await navigateToQuote(page);
    await completeQuoteForm(page);
    await page.getByTestId('get-quote-button').click();

    await expectQuoteResult(page);
    await expect(page.getByTestId('annual-premium')).toHaveText('£360.00');
  });

  test('shows a loading state while the quote request is pending', async ({ page }) => {
    await mockPendingQuote(page);
    await navigateToQuote(page);
    await completeQuoteForm(page);
    await page.getByTestId('get-quote-button').click();

    await expect(page.getByTestId('quote-loading')).toBeVisible();
    await expectQuoteResult(page);
  });

  test('shows an accessible error state when the API fails', async ({ page }) => {
    await mockQuoteError(page);
    await navigateToQuote(page);
    await completeQuoteForm(page);
    await page.getByTestId('get-quote-button').click();

    await expect(page.getByTestId('quote-error')).toHaveText(
      'Unable to retrieve a quote. Please try again.',
    );
  });
});