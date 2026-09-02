"use client";

import Link from "next/link";
import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  Filter,
  MapPin,
  Package,
  Search,
  SlidersHorizontal,
  Truck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LogisticaStatusBadge } from "@/components/produtor/logistica/LogisticaStatusBadge";
import { logisticaKpis, remessasList } from "@/lib/logistica-data";

export default function LogisticaPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Logística</h1>
          <p className="mt-1 text-sm text-agronex-muted">
            Gerenciamento completo de remessas e entregas
          </p>
        </div>
        <Link
          href="/produtor/logistica/operacoes"
          className="inline-flex items-center gap-2 rounded-lg bg-agronex-green px-4 py-2 text-sm font-medium text-white hover:bg-agronex-green-dark"
        >
          <MapPin className="h-4 w-4" />
          Painel de Operações
        </Link>
      </div>

      {/* KPIs */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-agronex-border bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase text-agronex-muted">
                Em Trânsito
              </p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {logisticaKpis.emTransito}
              </p>
              <p className="mt-1 text-xs font-medium text-green-600">
                {logisticaKpis.emTransitoTrend}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
              <Truck className="h-5 w-5 text-agronex-green" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-agronex-border bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase text-agronex-muted">
                Aguardando Coleta
              </p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {logisticaKpis.aguardandoColeta}
              </p>
              <p className="mt-1 text-xs text-agronex-muted">
                Nos centros de distribuição
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
              <Calendar className="h-5 w-5 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-agronex-border bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase text-agronex-muted">
                Entregues (Mês)
              </p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {logisticaKpis.entreguesMes}
              </p>
              <p className="mt-1 text-xs font-medium text-green-600">
                {logisticaKpis.entreguesTrend}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
              <CheckCircle2 className="h-5 w-5 text-agronex-green" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-red-200 border-l-4 border-l-red-500 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase text-agronex-muted">
                Com Problemas
              </p>
              <p className="mt-1 text-2xl font-bold text-red-600">
                {logisticaKpis.comProblemas}
              </p>
              <p className="mt-1 text-xs text-red-600">Requer atenção imediata</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="ID da Entrega ou Pedido..."
              className="w-full rounded-lg border border-agronex-border py-2 pl-10 pr-4 text-sm outline-none focus:border-agronex-green"
            />
          </div>
          <select className="rounded-lg border border-agronex-border px-4 py-2 text-sm outline-none">
            <option>Status (Todos)</option>
            <option>Em Trânsito</option>
            <option>Aguardando Coleta</option>
            <option>Com Problemas</option>
          </select>
          <select className="rounded-lg border border-agronex-border px-4 py-2 text-sm outline-none">
            <option>Transportadora (Todas)</option>
            <option>AgroTransp S.A.</option>
            <option>TransGrãos Logística</option>
          </select>
          <select className="rounded-lg border border-agronex-border px-4 py-2 text-sm outline-none">
            <option>Últimos 30 Dias</option>
          </select>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border border-agronex-border bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <Download className="h-4 w-4" />
          Exportar CSV
        </button>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-agronex-border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-agronex-border bg-gray-50 text-left text-xs font-medium uppercase tracking-wide text-agronex-muted">
                <th className="px-5 py-3">ID / Pedido</th>
                <th className="px-5 py-3">Produto</th>
                <th className="px-5 py-3">Origem → Destino</th>
                <th className="px-5 py-3">Transportadora</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">ETA (Previsão)</th>
                <th className="px-5 py-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {remessasList.map((remessa) => (
                <tr
                  key={remessa.id}
                  className="border-b border-agronex-border last:border-0 hover:bg-gray-50"
                >
                  <td className="px-5 py-4">
                    <p className="font-medium text-agronex-green">#{remessa.id}</p>
                    <p className="text-xs text-agronex-muted">{remessa.pedido}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-medium">{remessa.produto}</p>
                    <p className="text-xs text-agronex-muted">{remessa.peso}</p>
                  </td>
                  <td className="px-5 py-4 text-agronex-muted">
                    {remessa.origem} → {remessa.destino}
                  </td>
                  <td className="px-5 py-4">{remessa.transportadora}</td>
                  <td className="px-5 py-4">
                    <LogisticaStatusBadge status={remessa.status} />
                  </td>
                  <td className="px-5 py-4">
                    <p>{remessa.eta}</p>
                    <p
                      className={cn(
                        "text-xs",
                        remessa.status === "problema"
                          ? "text-red-600"
                          : "text-agronex-muted",
                      )}
                    >
                      {remessa.etaNote}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      href={`/produtor/logistica/rastreamento/${remessa.slug}`}
                      className="text-xs font-semibold text-agronex-green hover:underline"
                    >
                      Rastrear
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-agronex-border px-5 py-3 text-sm text-agronex-muted">
          <span>Mostrando 1 a 5 de 156 remessas</span>
          <div className="flex items-center gap-1">
            <button type="button" className="rounded-lg border border-agronex-border p-1.5">
              <ChevronLeft className="h-4 w-4" />
            </button>
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                type="button"
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg text-sm",
                  p === 1 ? "bg-agronex-green text-white" : "border border-agronex-border",
                )}
              >
                {p}
              </button>
            ))}
            <span className="px-1">...</span>
            <button type="button" className="rounded-lg border border-agronex-border px-2 py-1">
              32
            </button>
            <button type="button" className="rounded-lg border border-agronex-border p-1.5">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
