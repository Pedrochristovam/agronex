"use client";

import Link from "next/link";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Eye,
  Megaphone,
  SlidersHorizontal,
  Sprout,
  TrendingUp,
  Truck,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusBadge } from "@/components/produtor/StatusBadge";
import { painelLeiloes } from "@/lib/leiloes-data";
import { Button } from "@/components/ui/Button";

const tabs = [
  "Meus Lances Ativos",
  "Leilões Vencidos",
  "Leilões Perdidos",
  "Meus Lotes Leiloados",
];

const productIcons: Record<string, typeof Sprout> = {
  soja: Sprout,
  milho: Sprout,
  cafe: Coffee,
};

export default function PainelLeiloesPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link
            href="/produtor/leiloes"
            className="mb-2 inline-flex items-center gap-1 text-sm text-agronex-green hover:underline"
          >
            ← Explorar Leilões
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Painel de Leilões</h1>
          <p className="mt-1 text-sm text-agronex-muted">
            Gerencie suas ofertas, histórico e métricas de desempenho
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-agronex-border bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Calendar className="h-4 w-4" />
            Últimos 30 dias
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-agronex-border bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filtros
          </button>
        </div>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        {painelLeiloes.kpis.map((kpi, i) => {
          const icons = [TrendingUp, Wallet, Megaphone];
          const Icon = icons[i];
          return (
            <div
              key={kpi.label}
              className="rounded-xl border border-agronex-border bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium uppercase text-agronex-muted">
                    {kpi.label}
                  </p>
                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {kpi.value}
                  </p>
                  {"trend" in kpi && kpi.trend && (
                    <p
                      className={cn(
                        "mt-1 text-xs font-medium",
                        kpi.positive ? "text-green-600" : "text-red-600",
                      )}
                    >
                      {kpi.trend}
                    </p>
                  )}
                  {"detail" in kpi && kpi.detail && (
                    <p className="mt-1 text-xs text-agronex-muted">{kpi.detail}</p>
                  )}
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
                  <Icon className="h-5 w-5 text-agronex-green" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-agronex-border bg-white shadow-sm">
        <div className="flex gap-1 overflow-x-auto border-b border-agronex-border px-4">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              type="button"
              className={cn(
                "whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors",
                i === 0
                  ? "border-agronex-green text-agronex-green"
                  : "border-transparent text-agronex-muted hover:text-gray-900",
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-agronex-border bg-gray-50 text-left text-xs font-medium uppercase tracking-wide text-agronex-muted">
                <th className="px-5 py-3">Lote / Produto</th>
                <th className="px-5 py-3">Data de Fim</th>
                <th className="px-5 py-3">Seu Lance Atual</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Ação</th>
              </tr>
            </thead>
            <tbody>
              {painelLeiloes.activeBids.map((bid) => {
                const Icon = productIcons[bid.icon] || Sprout;
                return (
                  <tr
                    key={bid.id}
                    className="border-b border-agronex-border last:border-0 hover:bg-gray-50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
                          <Icon className="h-5 w-5 text-agronex-green" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{bid.product}</p>
                          <p className="text-xs text-agronex-muted">{bid.lot}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p>{bid.endDate}</p>
                      {bid.endHint && (
                        <p
                          className={cn(
                            "text-xs",
                            bid.endHintDanger ? "text-red-600" : "text-agronex-muted",
                          )}
                        >
                          {bid.endHint}
                        </p>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-medium">{bid.yourBid}</p>
                      {bid.currentBid && (
                        <p className="text-xs text-red-600">{bid.currentBid}</p>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge
                        label={bid.status}
                        variant={bid.statusVariant}
                      />
                    </td>
                    <td className="px-5 py-4">
                      {bid.action === "view" && (
                        <Link
                          href={bid.href}
                          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                          aria-label="Ver leilão"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                      )}
                      {bid.action === "cover" && (
                        <Button
                          href={"liveHref" in bid ? bid.liveHref : bid.href}
                          size="sm"
                        >
                          Cobrir
                        </Button>
                      )}
                      {bid.action === "logistics" && (
                        <Link
                          href="/produtor/logistica"
                          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                          aria-label="Logística"
                        >
                          <Truck className="h-4 w-4" />
                        </Link>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-agronex-border px-5 py-3 text-sm text-agronex-muted">
          <span>Mostrando 1 a 3 de 14 lances ativos</span>
          <div className="flex gap-1">
            <button
              type="button"
              className="rounded-lg border border-agronex-border p-1.5 hover:bg-gray-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
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
