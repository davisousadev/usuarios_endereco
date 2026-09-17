# usuarios_endereco

Projeto full stack para cadastro e consulta de usuários com endereço, usando preenchimento automático de dados de localização a partir do CEP.

## Visão geral

O sistema permite:

- cadastrar usuários com nome, CPF, CEP, número e complemento;
- buscar os dados de endereço no serviço ViaCEP com base no CEP informado;
- persistir os dados no PostgreSQL;
- listar os usuários cadastrados em uma interface web.

## Arquitetura

Monorepo gerenciado com **pnpm workspace**, dividido em:

- `apps/api`: API em Fastify para criar e listar usuários;
- `apps/web`: front-end em React + Vite para cadastro e visualização;
- `packages/database`: camada de acesso ao banco com Drizzle ORM e migrations.

## Fluxo principal

1. O usuário preenche o formulário no front-end.
2. A API valida os dados recebidos.
3. A API consulta o ViaCEP para completar os dados de endereço.
4. O registro é salvo no PostgreSQL.
5. A lista de usuários é atualizada na interface.

## Tecnologias utilizadas

- **Node.js** + **TypeScript**
- **Fastify** + **Zod**
- **React** + **Vite** + **Tailwind CSS**
- **PostgreSQL**
- **Drizzle ORM**
- **Docker Compose**

## Endpoints da API

- `POST /usuarios`: cria um novo usuário
- `GET /usuarios`: lista todos os usuários cadastrados

## Como executar com Docker

Na raiz do projeto:

```bash
docker compose up --build
```

Serviços disponíveis:

- Web: `http://localhost`
- API: `http://localhost:3000`
- PostgreSQL: `localhost:5432`

## Execução local (sem Docker)

1. Instale dependências:

```bash
pnpm install
```

2. Configure a variável `DATABASE_URL` (exemplo):

```env
DATABASE_URL=******localhost:5432/cadastro_db
```

3. Rode as migrations:

```bash
pnpm --filter @usuarios_endereco/model db:migrate
```

4. Suba a API:

```bash
pnpm --filter @usuarios_endereco/controller dev
```

5. Em outro terminal, suba o front-end:

```bash
pnpm --filter @usuarios_endereco/view dev
```
