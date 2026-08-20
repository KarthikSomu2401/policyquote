import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { knowledgeBaseSchema } from './schema/validation/knowledgebase.schema';
import type { KnowledgeBase } from './schema/types/knowledgebase';

export const DEFAULT_APPCONFIG_AGENT_URL = 'http://localhost:2772';
export const DEFAULT_REFRESH_INTERVAL_MS = 30_000;

type KnowledgeBaseSource = 'local' | 'appconfig';

export type KnowledgeBaseLoaderOptions = {
  env?: NodeJS.ProcessEnv;
  fetchConfig?: (url: string) => Promise<Response>;
  readFile?: (path: string, encoding: 'utf8') => string | Buffer;
};

function parseKnowledgeBase(raw: string): KnowledgeBase {
  return knowledgeBaseSchema.parse(JSON.parse(raw));
}

function getSource(env: NodeJS.ProcessEnv): KnowledgeBaseSource {
  if (env.POLICYQUOTE_KB_SOURCE === 'local') {
    return 'local';
  }

  if (env.POLICYQUOTE_KB_SOURCE === 'appconfig' || env.NODE_ENV === 'production') {
    return 'appconfig';
  }

  return 'local';
}

function getAppConfigUrl(env: NodeJS.ProcessEnv): string {
  const agentUrl = env.APPCONFIG_AGENT_URL ?? DEFAULT_APPCONFIG_AGENT_URL;
  const application = env.APPCONFIG_APPLICATION;
  const environment = env.APPCONFIG_ENVIRONMENT;
  const configuration = env.APPCONFIG_CONFIGURATION;

  if (!application || !environment || !configuration) {
    throw new Error(
      'APPCONFIG_APPLICATION, APPCONFIG_ENVIRONMENT, and APPCONFIG_CONFIGURATION are required for AppConfig KB loading',
    );
  }

  return `${agentUrl.replace(/\/$/, '')}/appconfig/applications/${encodeURIComponent(application)}/environments/${encodeURIComponent(environment)}/configurations/${encodeURIComponent(configuration)}`;
}

function getLocalFilePaths(env: NodeJS.ProcessEnv): string[] {
  if (env.POLICYQUOTE_KB_PATH) {
    return [env.POLICYQUOTE_KB_PATH];
  }

  return [
    join(__dirname, 'assets', 'risk-kb.json'),
    join(process.cwd(), 'risk-kb.json'),
    join(process.cwd(), 'apps', 'policyquote-api', 'src', 'assets', 'risk-kb.json'),
  ];
}

export class KnowledgeBaseLoader {
  private readonly env: NodeJS.ProcessEnv;
  private readonly fetchConfig: (url: string) => Promise<Response>;
  private readonly readFile: (path: string, encoding: 'utf8') => string | Buffer;
  private readonly refreshIntervalMs: number;
  private cachedKnowledgeBase: KnowledgeBase | null = null;
  private cachedAt = 0;
  private refreshPromise: Promise<KnowledgeBase> | null = null;

  constructor(options: KnowledgeBaseLoaderOptions = {}) {
    this.env = options.env ?? process.env;
    this.fetchConfig = options.fetchConfig ?? ((url) => fetch(url));
    this.readFile = options.readFile ?? ((path, encoding) => readFileSync(path, encoding));
    const configuredRefreshIntervalMs = Number(
      this.env.POLICYQUOTE_KB_REFRESH_INTERVAL_MS ?? DEFAULT_REFRESH_INTERVAL_MS,
    );
    this.refreshIntervalMs = Number.isFinite(configuredRefreshIntervalMs)
      ? Math.max(0, configuredRefreshIntervalMs)
      : DEFAULT_REFRESH_INTERVAL_MS;
  }

  async load(): Promise<KnowledgeBase> {
    const now = Date.now();
    if (this.cachedKnowledgeBase && now - this.cachedAt < this.refreshIntervalMs) {
      return this.cachedKnowledgeBase;
    }

    if (!this.refreshPromise) {
      this.refreshPromise = this.refresh();
    }

    try {
      return await this.refreshPromise;
    } finally {
      this.refreshPromise = null;
    }
  }

  private async refresh(): Promise<KnowledgeBase> {
    try {
      const knowledgeBase = getSource(this.env) === 'appconfig'
        ? await this.loadFromAppConfig()
        : this.loadFromLocalFile();

      this.cachedKnowledgeBase = knowledgeBase;
      this.cachedAt = Date.now();
      return knowledgeBase;
    } catch (error) {
      if (this.cachedKnowledgeBase) {
        return this.cachedKnowledgeBase;
      }

      throw error;
    }
  }

  private loadFromLocalFile(): KnowledgeBase {
    let lastError: unknown;

    for (const filePath of getLocalFilePaths(this.env)) {
      try {
        const rawKnowledgeBase = this.readFile(filePath, 'utf8');
        return parseKnowledgeBase(rawKnowledgeBase.toString());
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError ?? new Error('No local risk knowledge base file was found');
  }

  private async loadFromAppConfig(): Promise<KnowledgeBase> {
    const response = await this.fetchConfig(getAppConfigUrl(this.env));
    if (!response.ok) {
      throw new Error(`AppConfig KB request failed with status ${response.status}`);
    }

    return parseKnowledgeBase(await response.text());
  }
}

export const knowledgeBaseLoader = new KnowledgeBaseLoader();

export async function loadKnowledgeBase(): Promise<KnowledgeBase> {
  return knowledgeBaseLoader.load();
}