import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { KnowledgeBase } from './schema/knowledgebase.schema';

export function loadKnowledgeBase(): KnowledgeBase {
  const filePath = join(__dirname, 'assets', 'risk-kb.json');

  return JSON.parse(readFileSync(filePath, 'utf8')) as KnowledgeBase;
}