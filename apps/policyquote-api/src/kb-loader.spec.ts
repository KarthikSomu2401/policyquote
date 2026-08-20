import { describe, expect, it, jest } from '@jest/globals';
import { KnowledgeBaseLoader } from './kb-loader';

const validKnowledgeBase = {
  version: '2.0.0',
  basePremium: 400,
  coverageLoadFactor: 1.1,
  riskBands: {
    STANDARD: { min: 0, max: 25, multiplier: 1 },
    ELEVATED: { min: 26, max: 60, multiplier: 1.5 },
    HIGH_RISK: { min: 61, max: 999, multiplier: 2.2 },
  },
  factors: [],
};

function response(body: unknown, ok = true): Response {
  return {
    ok,
    status: ok ? 200 : 503,
    text: async () => JSON.stringify(body),
  } as Response;
}

describe('KnowledgeBaseLoader', () => {
  it('loads the local fallback for Nx development', async () => {
    const readFile = jest.fn<(path: string, encoding: 'utf8') => string>(() =>
      JSON.stringify(validKnowledgeBase),
    );
    const loader = new KnowledgeBaseLoader({
      env: { POLICYQUOTE_KB_SOURCE: 'local', POLICYQUOTE_KB_PATH: '/local/risk-kb.json' },
      readFile,
    });

    await expect(loader.load()).resolves.toEqual(validKnowledgeBase);
    expect(readFile).toHaveBeenCalledWith('/local/risk-kb.json', 'utf8');
  });

  it('loads and validates content from the AppConfig Agent', async () => {
    const fetchConfig = jest.fn<(url: string) => Promise<Response>>(async () =>
      response(validKnowledgeBase),
    );
    const loader = new KnowledgeBaseLoader({
      env: {
        POLICYQUOTE_KB_SOURCE: 'appconfig',
        APPCONFIG_APPLICATION: 'policyquote',
        APPCONFIG_ENVIRONMENT: 'production',
        APPCONFIG_CONFIGURATION: 'risk-kb',
      },
      fetchConfig,
    });

    await expect(loader.load()).resolves.toEqual(validKnowledgeBase);
    expect(fetchConfig).toHaveBeenCalledWith(
      'http://localhost:2772/appconfig/applications/policyquote/environments/production/configurations/risk-kb',
    );
  });

  it('rejects invalid remote content', async () => {
    const fetchConfig = jest.fn<(url: string) => Promise<Response>>(async () =>
      response({ version: 'invalid' }),
    );
    const loader = new KnowledgeBaseLoader({
      env: {
        POLICYQUOTE_KB_SOURCE: 'appconfig',
        APPCONFIG_APPLICATION: 'policyquote',
        APPCONFIG_ENVIRONMENT: 'production',
        APPCONFIG_CONFIGURATION: 'risk-kb',
      },
      fetchConfig,
    });

    await expect(loader.load()).rejects.toThrow();
  });

  it('retains the last valid KB when a refresh fails', async () => {
    const fetchConfig = jest
      .fn<(url: string) => Promise<Response>>()
      .mockResolvedValueOnce(response(validKnowledgeBase))
      .mockRejectedValueOnce(new Error('AppConfig unavailable'));
    const loader = new KnowledgeBaseLoader({
      env: {
        POLICYQUOTE_KB_SOURCE: 'appconfig',
        APPCONFIG_APPLICATION: 'policyquote',
        APPCONFIG_ENVIRONMENT: 'production',
        APPCONFIG_CONFIGURATION: 'risk-kb',
        POLICYQUOTE_KB_REFRESH_INTERVAL_MS: '0',
      },
      fetchConfig,
    });

    await expect(loader.load()).resolves.toEqual(validKnowledgeBase);
    await expect(loader.load()).resolves.toEqual(validKnowledgeBase);
    expect(fetchConfig).toHaveBeenCalledTimes(2);
  });
});