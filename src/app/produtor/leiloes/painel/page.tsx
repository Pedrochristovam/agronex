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
    <div className="min-h-full bg-[#f0f2f0] p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Link
              href="/produtor/leiloes"
              className="mb-3 inline-flex items-center gap-1 text-sm font-medium text-agronex-green hover:underline"
            >
              <ChevronLeft className="h-4 w-4" />
              Explorar Certames
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Painel de Leilões</h1>
            <p className="mt-1 text-sm text-agronex-muted">
              Acompanhe seus lances, histórico e desempenho nos pregões
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-agronex-border bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:shadow-md"
            >
              <Calendar className="h-4 w-4" />
              Últimos 30 dias
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-agronex-border bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:shadow-md"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filtros
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div className="mb-6 grid gap-4 md:grid-cols-3">
          {painelLeiloes.kpis.map((kpi, i) => {
            const icons = [TrendingUp, Wallet, Megaphone];
            const Icon = icons[i];
            const accents = [
              "from-agronex-green/10 to-agronex-green/5 border-agronex-green/20",
              "from-agronex-green/10 to-agronex-green/5 border-agronex-green/20",
              "from-blue-500/10 to-blue-500/5 border-blue-500/20",
            ];
            return (
              <div
                key={kpi.label}
                className={cn(
                  "rounded-2xl border bg-gradient-to-br p-5 shadow-sm",
                  accents[i],
                )}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-agronex-muted">
                      {kpi.label}
                    </p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">
                      {kpi.value}
                    </p>
                    {"trend" in kpi && kpi.trend && (
                      <p
                        className={cn(
                          "mt-1.5 text-xs font-semibold",
                          kpi.positive ? "text-green-600" : "text-red-600",
                        )}
                      >
                        {kpi.trend}
                      </p>
                    )}
                    {"detail" in kpi && kpi.detail && (
                      <p className="mt-1.5 text-xs text-agronex-muted">
                        {kpi.detail}
                      </p>
                    )}
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm">
                    <Icon className="h-5 w-5 text-agronex-green" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tabela */}
        <div className="overflow-hidden rounded-2xl border border-agronex-border bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
          <div className="flex gap-0 overflow-x-auto border-b border-agronex-border bg-gray-50/50 px-2">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                type="button"
                className={cn(
                  "relative whitespace-nowrap px-4 py-3.5 text-sm font-medium transition-colors",
                  i === 0
                    ? "text-agronex-green"
                    : "text-agronex-muted hover:text-gray-900",
                )}
              >
                {tab}
                {i === 0 && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-agronex-green" />
                )}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-agronex-border text-left text-[10px] font-bold uppercase tracking-widest text-agronex-muted">
                  <th className="px-5 py-3.5">Lote / Produto</th>
                  <th className="px-5 py-3.5">Encerramento</th>
                  <th className="px-5 py-3.5">Seu Lance</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5">Ação</th>
                </tr>
              </thead>
              <tbody>
                {painelLeiloes.activeBids.map((bid) => {
                  const Icon = productIcons[bid.icon] || Sprout;
                  return (
                    <tr
                      key={bid.id}
                      className="border-b border-agronex-border/60 last:border-0 transition-colors hover:bg-[#f8faf8]"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-agronex-green/10 to-agronex-green/5">
                            <Icon className="h-5 w-5 text-agronex-green" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">
                              {bid.product}
                            </p>
                            <p className="font-mono text-xs text-agronex-muted">
                              {bid.lot}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-medium">{bid.endDate}</p>
                        {bid.endHint && (
                          <p
                            className={cn(
                              "text-xs font-semibold",
                              bid.endHintDanger ? "text-red-600" : "text-agronex-muted",
                            )}
                          >
                            {bid.endHint}
                          </p>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-bold text-gray-900">{bid.yourBid}</p>
                        {bid.currentBid && (
                          <p className="text-xs font-medium text-red-600">
                            {bid.currentBid}
                          </p>
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
                            className="inline-flex items-center gap-1 rounded-lg border border-agronex-border px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            Ver
                          </Link>
                        )}
                        {bid.action === "cover" && (
                          <Button
                            href={"liveHref" in bid ? bid.liveHref : bid.href}
                            size="sm"
                            className="rounded-xl font-bold"
                          >
                            Cobrir Lance
                          </Button>
                        )}
                        {bid.action === "logistics" && (
                          <Link
                            href="/produtor/logistica"
                            className="inline-flex items-center gap-1 rounded-lg border border-agronex-border px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                          >
                            Logística
                          </Link>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-agronex-border bg-gray-50/50 px-5 py-3.5 text-sm text-agronex-muted">
            <span>Mostrando 1 a 3 de 14 lances ativos</span>
            <div className="flex gap-1">
              <button
                type="button"
                className="rounded-lg border border-agronex-border bg-white p-1.5 hover:bg-gray-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="rounded-lg border border-agronex-border bg-white p-1.5 hover:bg-gray-50"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
