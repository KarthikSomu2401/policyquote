import express from 'express';
import { loadKnowledgeBase } from './kb-loader';

const app = express();
const port = 3000;

app.get('/health', (_request, response) => {
  const knowledgeBase = loadKnowledgeBase();

  response.json({
    status: 'ok',
    kbVersion: knowledgeBase.version
  });
});

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});