import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import openApiDocument from './assets/openapi.json';
import { knowledgeBaseLoader } from './kb-loader';
import { quoteRequestSchema } from './schema/validation/quote-request.schema';
import { createQuote } from './service/quote.service';

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

  app.get('/health', async (_request, response) => {
    const knowledgeBase = await knowledgeBaseLoader.load();

    response.json({
      status: 'ok',
      kbVersion: knowledgeBase.version,
    });
  });

  app.post('/policy/quote', async (request, response) => {
    const result = quoteRequestSchema.safeParse(request.body);

    if (!result.success) {
      return response.status(400).json({
        message: 'Invalid quote request',
      });
    }

    const knowledgeBase = await knowledgeBaseLoader.load();
    return response.status(200).json(await createQuote(result.data, knowledgeBase));
  });

  return app;
}

export const app = createApp();