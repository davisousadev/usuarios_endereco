FROM node:22-alpine

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME/node_modules/.bin:$PATH"
RUN corepack enable

WORKDIR /app

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/api/package.json ./apps/api/
COPY packages/database/package.json ./packages/database/

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY apps/api ./apps/api
COPY packages/database ./packages/database

EXPOSE 3000

RUN chmod +x /app/apps/api/docker-entrypoint.sh

CMD ["/app/apps/api/docker-entrypoint.sh"]