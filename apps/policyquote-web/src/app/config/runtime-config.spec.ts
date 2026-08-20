import { describe, expect, it } from '@jest/globals';
import { getRuntimeConfig } from './runtime-config';

describe('web runtime configuration', () => {
  it('returns the configured API URL without a trailing slash', () => {
    globalThis.__POLICYQUOTE_RUNTIME_CONFIG__ = {
      apiUrl: 'http://localhost:3000/',
    };

    expect(getRuntimeConfig()).toEqual({ apiUrl: 'http://localhost:3000' });
  });

  it('rejects a missing API URL', () => {
    globalThis.__POLICYQUOTE_RUNTIME_CONFIG__ = undefined;

    expect(() => getRuntimeConfig()).toThrow('POLICYQUOTE_API_URL is required');
  });
});
