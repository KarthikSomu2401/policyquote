import { expect, Page } from '@playwright/test';

export const quoteRequest = {
  customerName: 'Alex Smith',
  age: 42,
  propertyType: 'House',
  propertyValue: 350000,
  postcode: 'AB1 2CD',
  previousClaims: 0,
};

export const quoteResponse = {
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

export async function navigateToLanding(page: Page): Promise<void> {
  await page.goto('/');
  await expect(page.getByTestId('landing-page')).toBeVisible();
}

export async function navigateToQuote(page: Page): Promise<void> {
  await page.goto('/quote');
  await expect(page.getByTestId('quote-page')).toBeVisible();
}

export async function completeQuoteForm(page: Page): Promise<void> {
  await page.getByTestId('customer-name-input').fill(quoteRequest.customerName);
  await page.getByTestId('age-input').fill(String(quoteRequest.age));
  await page.getByTestId('property-type-select').selectOption(quoteRequest.propertyType);
  await page.getByTestId('property-value-input').fill(String(quoteRequest.propertyValue));
  await page.getByTestId('postcode-input').fill(quoteRequest.postcode);
  await page.getByTestId('previous-claims-input').fill(String(quoteRequest.previousClaims));
}

export async function mockQuoteSuccess(page: Page): Promise<void> {
  await page.route('**/policy/quote', async (route) => {
    await route.fulfill({
      contentType: 'application/json',
      status: 200,
      body: JSON.stringify(quoteResponse),
    });
  });
}

export async function mockPendingQuote(page: Page): Promise<void> {
  await page.route('**/policy/quote', async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    await route.fulfill({
      contentType: 'application/json',
      status: 200,
      body: JSON.stringify(quoteResponse),
    });
  });
}

export async function mockQuoteError(page: Page): Promise<void> {
  await page.route('**/policy/quote', async (route) => {
    await route.fulfill({
      contentType: 'application/json',
      status: 500,
      body: JSON.stringify({ message: 'Service unavailable' }),
    });
  });
}

export async function expectQuoteResult(page: Page): Promise<void> {
  await expect(page.getByTestId('quote-result')).toBeVisible();
  await expect(page.getByTestId('annual-premium')).toHaveText('£360.00');
  await expect(page.getByTestId('monthly-premium')).toHaveText(
    'Approx. monthly premium: £30.00',
  );
  await expect(page.getByTestId('risk-band')).toHaveText('ELEVATED');
  await expect(page.getByTestId('risk-factors')).toContainText(
    'Flat - higher shared risk (10 points)',
  );
  await expect(page.getByTestId('risk-factors')).toContainText(
    'Postcode starts with EX - flood zone risk (15 points)',
  );
}

export async function expectRequiredFieldErrors(page: Page): Promise<void> {
  for (const field of [
    'customer-name',
    'age',
    'property-type',
    'property-value',
    'postcode',
    'previous-claims',
  ]) {
    await expect(page.getByTestId(`${field}-error`)).toBeVisible();
  }

  await expect(page.getByTestId('customer-name-input')).toHaveAttribute(
    'aria-invalid',
    'true',
  );
  await expect(page.getByTestId('customer-name-input')).toHaveAttribute(
    'aria-describedby',
    'customerName-error',
  );
}