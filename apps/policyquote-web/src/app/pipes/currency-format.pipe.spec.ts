import { CurrencyFormatPipe } from './currency-format.pipe';
import { describe, expect, it, afterEach } from '@jest/globals';

describe('CurrencyFormatPipe', () => {
  const originalLanguage = navigator.language;
  const pipe = new CurrencyFormatPipe();

  afterEach(() => {
    Object.defineProperty(navigator, 'language', {
      configurable: true,
      value: originalLanguage,
    });
  });

  function setLanguage(language: string): void {
    Object.defineProperty(navigator, 'language', {
      configurable: true,
      value: language,
    });
  }

  it.each([
    ['en-GB', '£'],
    ['en-IE', '£'],
    ['en-US', '$'],
    ['de-DE', '€'],
    ['fr-FR', '€'],
    ['es-ES', '€'],
    ['it-IT', '€'],
  ])('formats %s with the expected currency', (language, expectedSymbol) => {
    setLanguage(language);

    expect(pipe.transform(1234.56)).toContain(expectedSymbol);
  });

  it('falls back to EUR for an unsupported region', () => {
    setLanguage('en-CA');

    expect(pipe.transform(1234.56)).toContain('€');
  });
});
