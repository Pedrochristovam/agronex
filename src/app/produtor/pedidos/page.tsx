"use client";

import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Coffee,
  Eye,
  Filter,
  Search,
  ShoppingBag,
  Sprout,
  Truck,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { OrderStatusBadge } from "@/components/produtor/pedidos/OrderComponents";
import { pedidosList, pedidosStats } from "@/lib/pedidos-data";

const productIcons: Record<string, typeof Sprout> = {
  soja: Sprout,
  milho: Sprout,
  cafe: Coffee,
};

const statusFilters = [
  { id: "todos", label: "Todos" },
  { id: "pendentes", label: "Pendentes" },
  { id: "em-transito", label: "Em Trânsito" },
  { id: "concluidos", label: "Concluídos" },
];

export default function PedidosPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gestão de Pedidos</h1>
        <p className="mt-1 text-sm text-agronex-muted">
          Acompanhe e gerencie as transações da safra
        </p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-agronex-border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase text-agronex-muted">
                Total
              </p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {pedidosStats.total.toLocaleString("pt-BR")}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
              <ShoppingBag className="h-5 w-5 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-agronex-border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase text-agronex-muted">
                Em Trânsito
              </p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {pedidosStats.emTransito}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
              <Truck className="h-5 w-5 text-agronex-green" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-orange-200 bg-white p-5 shadow-sm border-l-4 border-l-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase text-agronex-muted">
                Aguardando Pagamento
              </p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {pedidosStats.aguardandoPagamento}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50">
              <Wallet className="h-5 w-5 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters bar */}
      <div className="mb-4 flex flex-col gap-3 rounded-xl border border-agronex-border bg-white p-4 shadow-sm lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="ID do Pedido..."
            className="w-full rounded-lg border border-agronex-border py-2 pl-10 pr-4 text-sm outline-none focus:border-agronex-green"
          />
        </div>
        <select className="rounded-lg border border-agronex-border px-4 py-2 text-sm outline-none focus:border-agronex-green">
          <option>Últimos 30 dias</option>
          <option>Últimos 7 dias</option>
          <option>Este mês</option>
          <option>Este ano</option>
        </select>
        <div className="flex flex-wrap gap-2">
          {statusFilters.map((filter, i) => (
            <button
              key={filter.id}
              type="button"
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                i === 0
                  ? "bg-agronex-green text-white"
                  : "border border-agronex-border text-gray-700 hover:bg-gray-50",
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="rounded-lg border border-agronex-border p-2 text-gray-500 hover:bg-gray-50"
          aria-label="Filtros avançados"
        >
          <Filter className="h-4 w-4" />
        </button>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-agronex-border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-agronex-border bg-gray-50 text-left text-xs font-medium uppercase tracking-wide text-agronex-muted">
                <th className="px-5 py-3">ID Pedido</th>
                <th className="px-5 py-3">Produto</th>
                <th className="px-5 py-3">Data</th>
                <th className="px-5 py-3">Comprador</th>
                <th className="px-5 py-3">Valor Total</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {pedidosList.map((pedido) => {
                const Icon = productIcons[pedido.icon] || Sprout;
                return (
                  <tr
                    key={pedido.id}
                    className="border-b border-agronex-border last:border-0 hover:bg-gray-50"
                  >
                    <td className="px-5 py-4 font-medium text-agronex-green">
                      #{pedido.id}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50">
                          <Icon className="h-4 w-4 text-agronex-green" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {pedido.produto}
                          </p>
                          <p className="text-xs text-agronex-muted">
                            Lote: {pedido.lote}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-agronex-muted">{pedido.data}</td>
                    <td className="px-5 py-4">{pedido.comprador}</td>
                    <td className="px-5 py-4 font-medium">{pedido.valor}</td>
                    <td className="px-5 py-4">
                      <OrderStatusBadge status={pedido.status} />
                    </td>
                    <td className="px-5 py-4">
                      <Link
                        href={`/produtor/pedidos/${pedido.slug}`}
                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                        aria-label="Ver detalhes"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-agronex-border px-5 py-3 text-sm text-agronex-muted">
          <span>Mostrando 1 a 10 de {pedidosStats.total.toLocaleString("pt-BR")} resultados</span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="rounded-lg border border-agronex-border p-1.5 hover:bg-gray-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                type="button"
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium",
                  page === 1
                    ? "bg-agronex-green text-white"
                    : "border border-agronex-border hover:bg-gray-50",
                )}
              >
                {page}
              </button>
            ))}
            <span className="px-1">...</span>
            <button
              type="button"
              className="rounded-lg border border-agronex-border p-1.5 hover:bg-gray-50"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
