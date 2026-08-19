import { Pipe, PipeTransform } from '@angular/core';

type CurrencyCode = 'GBP' | 'USD' | 'EUR';

const currencyByRegion: Record<string, CurrencyCode> = {
  DE: 'EUR',
  ES: 'EUR',
  FR: 'EUR',
  GB: 'GBP',
  IE: 'GBP',
  IT: 'EUR',
  US: 'USD',
};

@Pipe({
  name: 'currencyFormat',
  standalone: true,
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: number): string {
    const locale = globalThis.navigator?.language || 'en-IE';
    const region = locale.split(/[-_]/)[1]?.toUpperCase();
    const currency = currencyByRegion[region ?? ''] ?? 'EUR';

    try {
      return new Intl.NumberFormat(locale, {
        currency,
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
        style: 'currency',
      }).format(value);
    } catch {
      return new Intl.NumberFormat('en-IE', {
        currency,
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
        style: 'currency',
      }).format(value);
    }
  }
}
