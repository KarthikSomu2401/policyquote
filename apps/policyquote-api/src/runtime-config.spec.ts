import { describe, expect, it, jest } from '@jest/globals';

describe('API runtime configuration', () => {
  it('uses the local API port default', async () => {
    jest.resetModules();
    delete process.env.POLICYQUOTE_API_PORT;

    const { runtimeConfig } = await import('./runtime-config');

    expect(runtimeConfig.port).toBe(3000);
  });

  it('rejects an invalid API port', async () => {
    jest.resetModules();
    process.env.POLICYQUOTE_API_PORT = 'not-a-port';

    await expect(import('./runtime-config')).rejects.toThrow(
      'POLICYQUOTE_API_PORT must be an integer between 1 and 65535',
    );

    delete process.env.POLICYQUOTE_API_PORT;
  });
});