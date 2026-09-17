FROM node:22-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME/node_modules/.bin:$PATH"
RUN corepack enable

WORKDIR /app

# Copiar arquivos de configuração do monorepo
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/api/package.json ./apps/api/
COPY packages/database/package.json ./packages/database/

# Instalar todas as dependências (necessário devDependencies devido ao tsx e drizzle-kit)
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Copiar código-fonte necessário
COPY apps/api ./apps/api
COPY packages/database ./packages/database

EXPOSE 3000

# Executar migrações do banco e iniciar a API
CMD pnpm --filter @usuarios_endereco/model db:migrate && pnpm --filter @usuarios_endereco/controller start