# AGRONEX — Documentação da API (v0.1.0)

## Visão Geral

API REST única para Web e Mobile. Arquitetura **Modular Monolith** com baixo acoplamento entre módulos.

## Fluxo Principal

```
Produtor → Lote → Leilão → Lances → Pedido → Pagamento → Logística → Entrega → Repasse → Reputação
```

## Endpoints Disponíveis

| Método | Rota | Auth | Descrição |
|---|---|---|---|
| GET | `/health` | Não | Health check (API + PostgreSQL + Redis) |
| GET | `/api/v1/auth/status` | Não | Status do módulo de autenticação |
| GET | `/api/v1/auth/me` | Sim | Placeholder endpoint protegido |

## Swagger

Documentação interativa: http://localhost:3001/docs

## Modelo de Dados

Ver `prisma/schema.prisma` para o schema completo com 30+ entidades.

### Enums principais

- **LotStatus:** DRAFT, PENDING_REVIEW, AVAILABLE, IN_AUCTION, SOLD, DELIVERED, CANCELLED
- **AuctionStatus:** SCHEDULED, ACTIVE, CLOSED, CANCELLED
- **OrderStatus:** PENDING_PAYMENT, PAYMENT_HELD, IN_LOGISTICS, IN_TRANSIT, DELIVERED, COMPLETED, CANCELLED, DISPUTED
- **RoleType:** PRODUCER, BUYER, DELIVERY_PARTNER, ADMIN

### Valores financeiros

Todos os campos monetários utilizam `Decimal(18, 2)` — nunca Float.

## Convenções

- IDs: UUID v4
- Timestamps: UTC (`createdAt`, `updatedAt`)
- API prefix: `/api/v1`
- Respostas: `{ success, data, timestamp }` ou `{ success, statusCode, error, message }`
