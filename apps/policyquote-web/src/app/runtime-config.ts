export type WebRuntimeConfig = {
  apiUrl: string;
};

declare global {
  var __POLICYQUOTE_RUNTIME_CONFIG__: Partial<WebRuntimeConfig> | undefined;
}

export function getRuntimeConfig(): WebRuntimeConfig {
  const apiUrl = globalThis.__POLICYQUOTE_RUNTIME_CONFIG__?.apiUrl;

  if (!apiUrl) {
    throw new Error('POLICYQUOTE_API_URL is required');
  }

  return { apiUrl: apiUrl.replace(/\/$/, '') };
}