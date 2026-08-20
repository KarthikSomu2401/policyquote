import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const outputPath = resolve('apps/policyquote-web/public/runtime-config.js');
const apiUrl = process.env.POLICYQUOTE_API_URL ?? 'http://localhost:3000';

if (!URL.canParse(apiUrl)) {
  throw new Error('POLICYQUOTE_API_URL must be a valid absolute URL');
}

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(
  outputPath,
  `globalThis.__POLICYQUOTE_RUNTIME_CONFIG__ = ${JSON.stringify({ apiUrl })};\n`,
  'utf8',
);