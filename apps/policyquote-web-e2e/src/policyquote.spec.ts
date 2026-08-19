import { expect, Page, test } from '@playwright/test';

const quoteRequest = {
  customerName: 'Alex Smith',
  age: 42,
  propertyType: 'House',
  propertyValue: 350000,
  postcode: 'AB1 2CD',
  previousClaims: 0,
};

const quoteResponse = {
  customerName: 'Alex Smith',
  annualPremium: 360,
  riskScore: 45,
  appliedFactors: [
    {
      id: 'property_type_flat',
      description: 'Flat - higher shared risk',
      points: 10,
    },
    {
      id: 'postcode_flood_zone',
      description: 'Postcode starts with EX - flood zone risk',
      points: 15,
    },
  ],
};

async function fillQuoteForm(page: Page): Promise<void> {
  await page.getByTestId('customer-name-input').fill(quoteRequest.customerName);
  await page.getByTestId('age-input').fill(String(quoteRequest.age));
  await page.getByTestId('property-type-select').selectOption(quoteRequest.propertyType);
  await page.getByTestId('property-value-input').fill(String(quoteRequest.propertyValue));
  await page.getByTestId('postcode-input').fill(quoteRequest.postcode);
  await page.getByTestId('previous-claims-input').fill(String(quoteRequest.previousClaims));
}

async function mockQuoteSuccess(page: Page): Promise<void> {
  await page.route('**/policy/quote', async (route) => {
    await route.fulfill({
      contentType: 'application/json',
      status: 200,
      body: JSON.stringify(quoteResponse),
    });
  });
}

test.describe('PolicyQuote landing and quote flow', () => {
  test('landing CTA navigates to the quote form', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'A clearer way to protect home' })).toBeVisible();
    await page.getByRole('button', { name: 'Enquire Quote' }).click();

    await expect(page).toHaveURL(/\/quote$/);
    await expect(page.getByRole('heading', { name: 'Quote', exact: true })).toBeVisible();
  });

  test('required fields show accessible validation messages', async ({ page }) => {
    await page.goto('/quote');

    await page.getByRole('button', { name: 'Get quote' }).click();

    await expect(page.getByText('Customer name is required.')).toBeVisible();
    await expect(page.getByText('Age is required.')).toBeVisible();
    await expect(page.getByText('Property type is required.')).toBeVisible();
    await expect(page.getByText('Property value is required.')).toBeVisible();
    await expect(page.getByText('Postcode is required.')).toBeVisible();
    await expect(page.getByText('Previous claims is required.')).toBeVisible();
    await expect(page.getByLabel('Customer name')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.getByLabel('Customer name')).toHaveAttribute('aria-describedby', 'customerName-error');
  });

  test('keyboard users can activate the landing CTA and submit the form', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Enquire Quote' }).focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/quote$/);

    await mockQuoteSuccess(page);
    await fillQuoteForm(page);
    await page.getByRole('button', { name: 'Get quote' }).focus();
    await page.keyboard.press('Enter');

    await expect(page.getByRole('heading', { name: 'Quote result' })).toBeVisible();
  });

  test('successful submission shows premium, risk band and applied factors', async ({ page }) => {
    await mockQuoteSuccess(page);
    await page.goto('/quote');
    await fillQuoteForm(page);
    await page.getByRole('button', { name: 'Get quote' }).click();

    await expect(page.getByRole('heading', { name: 'Quote result' })).toBeVisible();
    await expect(page.getByText('£360.00')).toBeVisible();
    await expect(page.getByText('Approx. monthly premium: £30.00')).toBeVisible();
    await expect(page.getByText('ELEVATED')).toBeVisible();
    await expect(page.getByText('Flat - higher shared risk (10 points)')).toBeVisible();
    await expect(page.getByText('Postcode starts with EX - flood zone risk (15 points)')).toBeVisible();
  });

  test('loading state is visible while quote submission is pending', async ({ page }) => {
    await page.route('**/policy/quote', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      await route.fulfill({
        contentType: 'application/json',
        status: 200,
        body: JSON.stringify(quoteResponse),
      });
    });
    await page.goto('/quote');
    await fillQuoteForm(page);
    await page.getByRole('button', { name: 'Get quote' }).click();

    await expect(page.getByRole('status', { name: 'Loading quote...' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Quote result' })).toBeVisible();
  });

  test('API errors show an accessible error state', async ({ page }) => {
    await page.route('**/policy/quote', async (route) => {
      await route.fulfill({
        contentType: 'application/json',
        status: 500,
        body: JSON.stringify({ message: 'Service unavailable' }),
      });
    });
    await page.goto('/quote');
    await fillQuoteForm(page);
    await page.getByRole('button', { name: 'Get quote' }).click();

    await expect(page.getByRole('alert')).toHaveText('Unable to retrieve a quote. Please try again.');
  });
});