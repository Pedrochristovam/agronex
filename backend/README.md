# AGRONEX API

Backend da plataforma **AGRONEX** — comercialização e gestão de produtos agrícolas.

Arquitetura: **Modular Monolith** (NestJS + PostgreSQL + Prisma + Redis).

---

## Stack

| Tecnologia | Uso |
|---|---|
| Node.js + TypeScript | Runtime e linguagem |
| NestJS | Framework backend |
| PostgreSQL | Banco transacional principal |
| Prisma ORM | Migrations, schema, client |
| Redis | Cache, sessões, locks, leilões em tempo real |
| Socket.IO | Tempo real (próxima etapa) |
| JWT | Autenticação |
| Docker | Containerização |
| Swagger | Documentação OpenAPI |

---

## Estrutura do Projeto

```
backend/
├── prisma/
│   ├── schema.prisma      # Schema completo do banco
│   ├── migrations/        # Migrations versionadas
│   └── seed.ts            # Dados de desenvolvimento
├── src/
│   ├── common/            # Config, guards, filters, pipes, decorators
│   ├── infrastructure/    # Prisma, Redis, Logger
│   ├── modules/           # Módulos de domínio (baixo acoplamento)
│   ├── jobs/              # Tarefas agendadas (futuro)
│   ├── integrations/      # Gateways externos (futuro)
│   ├── app.module.ts
│   └── main.ts
├── docker-compose.yml
├── Dockerfile
└── .env.example
```

### Módulos de domínio

`auth`, `users`, `roles`, `producers`, `buyers`, `delivery-partners`, `products`, `categories`, `lots`, `auctions`, `bids`, `orders`, `payments`, `split-payments`, `advances`, `routes`, `deliveries`, `tracking`, `documents`, `certificates`, `reputation`, `ratings`, `notifications`, `analytics`, `admin`, `audit`

> Nesta etapa, apenas `health` e `auth` (base) possuem endpoints. Os demais módulos estão estruturados para implementação futura.

---

## Pré-requisitos

- Node.js 20+
- npm 10+
- Docker e Docker Compose (recomendado)
- PostgreSQL 16+ (se rodar sem Docker)
- Redis 7+ (se rodar sem Docker)

---

## Instalação

```bash
cd backend
npm install
cp .env.example .env
```

Edite `.env` com suas credenciais locais.

---

## Docker

### Subir apenas PostgreSQL e Redis

```bash
docker compose up -d postgres redis
```

### Subir stack completa (API + PostgreSQL + Redis)

```bash
docker compose up -d --build
```

### Parar serviços

```bash
docker compose down
```

### Credenciais padrão (Docker)

| Serviço | Host | Porta | Usuário | Senha | Database |
|---|---|---|---|---|---|
| PostgreSQL | localhost | 5432 | agronex | agronex_dev | agronex |
| Redis | localhost | 6379 | — | — | — |

> **Nota:** A stack utiliza **PostgreSQL** conforme especificação. Credenciais MySQL/phpMyAdmin não são utilizadas neste backend.

---

## Banco de Dados

### Gerar Prisma Client

```bash
npm run prisma:generate
```

### Criar / aplicar migrations

```bash
npm run prisma:migrate
```

Em produção:

```bash
npm run prisma:migrate:deploy
```

### Seed (dados de desenvolvimento)

```bash
npm run prisma:seed
```

### Reset completo (cuidado — apaga dados)

```bash
npm run db:reset
```

### Prisma Studio (UI visual)

```bash
npm run prisma:studio
```

---

## Execução

### Desenvolvimento

```bash
# Terminal 1 — infra
docker compose up -d postgres redis

# Terminal 2 — API
npm run start:dev
```

A API estará disponível em:

- **API:** http://localhost:3001
- **Health:** http://localhost:3001/health
- **Swagger:** http://localhost:3001/docs
- **Endpoints:** http://localhost:3001/api/v1/...

### Produção

```bash
npm run build
npm run start:prod
```

---

## Health Check

```http
GET /health
```

Verifica:

- **API** — processo ativo
- **PostgreSQL** — conexão Prisma + latência
- **Redis** — ping + latência

Resposta de exemplo:

```json
{
  "success": true,
  "data": {
    "status": "ok",
    "timestamp": "2024-04-01T12:00:00.000Z",
    "uptime": 123.45,
    "services": {
      "api": { "status": "ok" },
      "postgres": { "status": "ok", "latencyMs": 3 },
      "redis": { "status": "ok", "latencyMs": 1 }
    }
  }
}
```

---

## Autenticação (base)

Infraestrutura preparada:

- JWT Access Token + Refresh Token
- RBAC com roles: `PRODUCER`, `BUYER`, `DELIVERY_PARTNER`, `ADMIN`
- Guards globais (`JwtAuthGuard`, `RolesGuard`)
- Decorators `@Public()` e `@Roles()`
- Bcrypt para hash de senhas

Endpoints atuais:

```http
GET /api/v1/auth/status   # Público — status do módulo
GET /api/v1/auth/me       # Protegido — placeholder
```

Login/registro serão implementados na próxima etapa.

---

## Seed — Usuários de Desenvolvimento

Senha padrão: `Agronex@2024`

| Papel | E-mail |
|---|---|
| Admin | admin@agronex.com.br |
| Produtor | joao.silva@fazendaboavista.com.br |
| Comprador | compras@agrotrade.com.br |
| Transportador | logistica@transagro.com.br |

O seed também cria: categorias, produtos, lotes, leilão, lances, pedido, pagamento, split, antecipação, rota, entrega, rastreamento, documentos, certificado, avaliação e notificações.

---

## Testes

```bash
npm test
npm run test:e2e
npm run test:cov
```

---

## Segurança

Implementado nesta etapa:

- Helmet (headers HTTP)
- CORS configurável
- Rate limiting (`@nestjs/throttler`)
- Validação global (`class-validator`)
- Tratamento global de exceções
- Sanitização via whitelist de DTOs
- JWT + RBAC base
- Senhas com bcrypt (12 rounds)
- Audit log (schema)

---

## Variáveis de Ambiente

Consulte `.env.example` para a lista completa.

Variáveis obrigatórias:

- `DATABASE_URL`
- `JWT_ACCESS_SECRET` (mín. 32 caracteres)
- `JWT_REFRESH_SECRET` (mín. 32 caracteres)

---

## Próximos Passos

1. Implementar login/registro e refresh token
2. CRUD dos módulos de domínio
3. Socket.IO para leilões em tempo real
4. Upload de documentos com validação
5. Integração com gateway de pagamento
6. Jobs para encerramento de leilões

---

## Licença

Proprietário — AGRONEX © 2024
