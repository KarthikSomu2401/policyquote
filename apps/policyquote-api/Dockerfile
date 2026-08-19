FROM node:22-bookworm-slim AS build

WORKDIR /workspace

COPY package.json package-lock.json nx.json tsconfig.base.json ./
RUN npm ci

COPY apps/policyquote-api ./apps/policyquote-api

RUN npx nx build policyquote-api

FROM node:22-bookworm-slim AS runtime

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=build /workspace/dist/apps/policyquote-api ./
COPY --from=build /workspace/apps/policyquote-api/risk-kb.json ./risk-kb.json

USER node

EXPOSE 3000

CMD ["node", "main.js"]