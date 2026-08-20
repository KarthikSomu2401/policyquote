const configuredPort = Number(process.env.POLICYQUOTE_API_PORT ?? '3000');

if (!Number.isInteger(configuredPort) || configuredPort < 1 || configuredPort > 65535) {
  throw new Error('POLICYQUOTE_API_PORT must be an integer between 1 and 65535');
}

export const runtimeConfig = {
  port: configuredPort,
};