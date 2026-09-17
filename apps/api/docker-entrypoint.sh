#!/bin/sh
set -e

pnpm --filter @usuarios_endereco/model db:migrate
exec pnpm --filter @usuarios_endereco/controller start