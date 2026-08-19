import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { knowledgeBaseSchema } from './schema/validation/knowledgebase.schema';
import type { KnowledgeBase } from './schema/types/knowledgebase';

export function loadKnowledgeBase(): KnowledgeBase {
  const filePath = join(__dirname, 'assets', 'risk-kb.json');

  const rawKnowledgeBase: unknown = JSON.parse(readFileSync(filePath, 'utf8'));
  return knowledgeBaseSchema.parse(rawKnowledgeBase) as KnowledgeBase;
}