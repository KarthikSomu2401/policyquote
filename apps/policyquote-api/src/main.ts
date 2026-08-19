import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { loadKnowledgeBase } from './kb-loader';
import { quoteRequestSchema } from './schema/quote-request.schema';
import { createQuote } from './service/quote.service';
import openApiDocument from './assets/openapi.json';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

app.get('/health', (_request, response) => {
  const knowledgeBase = loadKnowledgeBase();

  response.json({
    status: 'ok',
    kbVersion: knowledgeBase.version
  });
});

app.post('/policy/quote', (request, response) => {
  const result = quoteRequestSchema.safeParse(request.body);

  if (!result.success) {
    return response.status(400).json({
      message: 'Invalid quote request'
    });
  }

  return response.status(200).json(createQuote(result.data));
});

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});