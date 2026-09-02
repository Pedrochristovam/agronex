"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  Clock,
  Filter,
  MapPin,
  Package,
  Radio,
  Truck,
} from "lucide-react";
import { LogisticaStatusBadge } from "@/components/produtor/logistica/LogisticaStatusBadge";
import { cargasAtivas, operacoesKpis } from "@/lib/logistica-data";

export default function OperacoesLogisticaPage() {
  const [mapView, setMapView] = useState<"frota" | "rotas">("rotas");

  return (
    <div className="flex h-full flex-col p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link
            href="/produtor/logistica"
            className="mb-2 inline-flex items-center gap-1 text-sm text-agronex-green hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para Remessas
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Painel de Operações</h1>
          <p className="mt-1 text-sm text-agronex-muted">
            Visão consolidada da malha logística e status de frota
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-agronex-border bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            <Calendar className="h-4 w-4" />
            Hoje
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-agronex-green px-4 py-2 text-sm font-medium text-white hover:bg-agronex-green-dark"
          >
            <MapPin className="h-4 w-4" />
            Nova Rota
          </button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-agronex-border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase text-agronex-muted">Entregas Totais</p>
              <p className="text-2xl font-bold">{operacoesKpis.entregasTotais.toLocaleString("pt-BR")}</p>
              <p className="text-xs font-medium text-green-600">{operacoesKpis.entregasTrend}</p>
            </div>
            <Package className="h-8 w-8 text-gray-300" />
          </div>
        </div>
        <div className="rounded-xl border border-agronex-border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase text-agronex-muted">Em Trânsito</p>
              <p className="text-2xl font-bold">{operacoesKpis.emTransito} veículos</p>
            </div>
            <Truck className="h-8 w-8 text-agronex-green" />
          </div>
        </div>
        <div className="rounded-xl border border-agronex-border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase text-agronex-muted">Coletas Pendentes</p>
              <p className="text-2xl font-bold">{operacoesKpis.coletasPendentes} agendadas</p>
            </div>
            <Clock className="h-8 w-8 text-gray-400" />
          </div>
        </div>
        <div className="rounded-xl border border-red-200 border-b-4 border-b-red-500 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase text-agronex-muted">Ocorrências</p>
              <p className="text-2xl font-bold text-red-600">{operacoesKpis.ocorrencias}</p>
              <p className="text-xs text-red-600">requer atenção</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Map + Active loads */}
      <div className="flex min-h-0 flex-1 flex-col gap-4 lg:flex-row">
        <div className="relative min-h-[400px] flex-1 overflow-hidden rounded-xl border border-agronex-border bg-white shadow-sm lg:min-h-[500px]">
          <div className="absolute left-4 right-4 top-4 z-10 flex items-center justify-between">
            <h2 className="rounded-lg bg-white/90 px-3 py-1.5 text-sm font-semibold shadow-sm">
              Mapa Operacional
            </h2>
            <div className="flex rounded-lg border border-agronex-border bg-white shadow-sm">
              {(["frota", "rotas"] as const).map((view) => (
                <button
                  key={view}
                  type="button"
                  onClick={() => setMapView(view)}
                  className={`px-3 py-1.5 text-xs font-semibold uppercase ${
                    mapView === view
                      ? "bg-agronex-green text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  } ${view === "frota" ? "rounded-l-lg" : "rounded-r-lg"}`}
                >
                  {view}
                </button>
              ))}
            </div>
          </div>

          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-green-900/20" />

          {/* Route line mock */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 500">
            <path
              d="M 100 350 Q 250 200 400 280 T 700 150"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
              strokeDasharray="8 4"
            />
          </svg>

          {/* Map pins */}
          <div className="absolute left-[20%] top-[55%] rounded bg-gray-900 px-2 py-1 text-xs font-medium text-white shadow">
            BR-163: Soja
          </div>
          <div className="absolute left-[45%] top-[40%] flex items-center gap-1 rounded bg-red-600 px-2 py-1 text-xs font-medium text-white shadow">
            <Radio className="h-3 w-3 animate-pulse" />
            Atraso Crítico
          </div>
          <div className="absolute right-[25%] top-[25%] rounded bg-agronex-green px-2 py-1 text-xs font-medium text-white shadow">
            SP-330: Fertilizante
          </div>
        </div>

        <aside className="flex w-full flex-col rounded-xl border border-agronex-border bg-white shadow-sm lg:w-80">
          <div className="flex items-center justify-between border-b border-agronex-border px-4 py-3">
            <h2 className="text-sm font-semibold">Cargas Ativas</h2>
            <button type="button" className="text-gray-400 hover:text-gray-600">
              <Filter className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {cargasAtivas.map((carga) => (
              <Link
                key={carga.id}
                href={`/produtor/logistica/rastreamento/${carga.slug}`}
                className={`block rounded-lg border p-3 transition-colors hover:bg-gray-50 ${
                  carga.alert ? "border-red-200 bg-red-50/50" : "border-agronex-border"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-medium text-agronex-green">#{carga.id}</p>
                    <p className="text-sm font-medium text-gray-900">{carga.produto}</p>
                    <p className="text-xs text-agronex-muted">{carga.destino}</p>
                    <p className="mt-1 text-xs text-agronex-muted">{carga.horario}</p>
                  </div>
                  <LogisticaStatusBadge status={carga.status} />
                </div>
                {carga.alert && (
                  <p className="mt-2 text-xs font-semibold text-red-600">Atrasado</p>
                )}
              </Link>
            ))}
          </div>

          <div className="border-t border-agronex-border p-3">
            <Link
              href="/produtor/logistica"
              className="block w-full rounded-lg border border-agronex-border py-2 text-center text-sm font-medium text-agronex-green hover:bg-gray-50"
            >
              Ver Todas
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
