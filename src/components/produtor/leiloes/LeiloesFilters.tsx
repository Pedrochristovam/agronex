"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BarChart3,
  ChevronDown,
  Filter,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Opções de filtro para agronegócio ── */

const commodities = [
  { value: "", label: "Todas as commodities" },
  { value: "soja", label: "Soja" },
  { value: "milho", label: "Milho" },
  { value: "cafe", label: "Café" },
  { value: "algodao", label: "Algodão" },
  { value: "trigo", label: "Trigo" },
  { value: "arroz", label: "Arroz" },
  { value: "feijao", label: "Feijão" },
  { value: "pecuaria", label: "Pecuária (Bovinos)" },
  { value: "suinos", label: "Suínos" },
  { value: "sementes", label: "Sementes" },
  { value: "insumos", label: "Insumos / Defensivos" },
];

const safras = [
  { value: "", label: "Todas as safras" },
  { value: "2025-26", label: "Safra 2025/26" },
  { value: "2024-25", label: "Safra 2024/25" },
  { value: "2023-24", label: "Safra 2023/24" },
];

const regioes = [
  { value: "", label: "Todas as regiões" },
  { value: "MG", label: "Minas Gerais" },
  { value: "MT", label: "Mato Grosso" },
  { value: "GO", label: "Goiás" },
  { value: "SP", label: "São Paulo" },
  { value: "PR", label: "Paraná" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "BA", label: "Bahia" },
];

const certificacoes = [
  { value: "", label: "Qualquer certificação" },
  { value: "rastreavel", label: "Rastreável Agronex" },
  { value: "exportacao", label: "Padrão Exportação" },
  { value: "organico", label: "Orgânico / IBD" },
  { value: "convencional", label: "Convencional" },
  { value: "rainforest", label: "Rainforest Alliance" },
];

const unidades = [
  { value: "", label: "Qualquer unidade" },
  { value: "ton", label: "Tonelada (t)" },
  { value: "saca", label: "Saca (60 kg)" },
  { value: "arroba", label: "Arroba (@)" },
  { value: "sc", label: "Saca de café" },
];

const statusPregao = [
  { value: "em-pregao", label: "Em pregão" },
  { value: "encerrando", label: "Encerrando hoje" },
  { value: "agendado", label: "Agendados" },
  { value: "encerrado", label: "Encerrados" },
];

const faixaPreco = [
  { value: "", label: "Qualquer preço" },
  { value: "ate-100", label: "Até R$ 100 / un." },
  { value: "100-500", label: "R$ 100 – 500 / un." },
  { value: "500-1000", label: "R$ 500 – 1.000 / un." },
  { value: "acima-1000", label: "Acima de R$ 1.000 / un." },
];

const logistica = [
  { value: "", label: "Qualquer modalidade" },
  { value: "fob", label: "FOB — Retirada na fazenda" },
  { value: "cif", label: "CIF — Entrega no destino" },
  { value: "silos", label: "Retirada em silo/armazém" },
];

const quickFilters = [
  "Ao vivo",
  "Grãos",
  "Café",
  "Pecuária",
  "Certificados",
  "Safra 24/25",
];

function SelectField({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-1 block text-xs font-medium text-agronex-muted">
        {label}
      </label>
      <div className="relative">{children}</div>
    </div>
  );
}

const selectCls =
  "w-full appearance-none rounded-lg border border-agronex-border bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-agronex-green focus:ring-2 focus:ring-agronex-green/15";

export function LeiloesSearchPanel() {
  const [expanded, setExpanded] = useState(true);
  const [activeQuick, setActiveQuick] = useState<string | null>("Ao vivo");

  return (
    <div className="rounded-2xl border border-agronex-border bg-white shadow-sm">
      {/* Cabeçalho */}
      <div className="flex flex-col gap-3 border-b border-agronex-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-agronex-green" />
          <h2 className="text-sm font-semibold text-gray-900">
            Filtrar lotes
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="text-xs font-medium text-agronex-green hover:underline"
          >
            {expanded ? "Recolher" : "Expandir"} filtros
          </button>
          <Link
            href="/produtor/leiloes/painel"
            className="inline-flex items-center gap-1.5 rounded-lg border border-agronex-green px-3 py-1.5 text-xs font-semibold text-agronex-green hover:bg-green-50"
          >
            <BarChart3 className="h-3.5 w-3.5" />
            Meu painel
          </Link>
        </div>
      </div>

      {/* Filtros rápidos (chips) */}
      <div className="flex flex-wrap gap-2 border-b border-agronex-border px-5 py-3">
        {quickFilters.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() =>
              setActiveQuick(activeQuick === chip ? null : chip)
            }
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-colors",
              activeQuick === chip
                ? "bg-agronex-green text-white"
                : "bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-agronex-green",
            )}
          >
            {chip === "Ao vivo" && (
              <span className="mr-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-red-400" />
            )}
            {chip}
          </button>
        ))}
      </div>

      {expanded && (
        <div className="p-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SelectField label="Commodity" className="lg:col-span-2">
              <select className={selectCls}>
                {commodities.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </SelectField>

            <SelectField label="Safra">
              <select className={selectCls}>
                {safras.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </SelectField>

            <SelectField label="Região produtora">
              <select className={selectCls} defaultValue="MG">
                {regioes.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </SelectField>

            <SelectField label="Certificação / Qualidade">
              <select className={selectCls}>
                {certificacoes.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </SelectField>

            <SelectField label="Unidade de venda">
              <select className={selectCls}>
                {unidades.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </SelectField>

            <SelectField label="Status do pregão">
              <select className={selectCls} defaultValue="em-pregao">
                {statusPregao.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </SelectField>

            <SelectField label="Faixa de preço">
              <select className={selectCls}>
                {faixaPreco.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </SelectField>

            <SelectField label="Logística">
              <select className={selectCls}>
                {logistica.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </SelectField>
          </div>

          <div className="mt-4 flex flex-col gap-3 border-t border-agronex-border pt-4 sm:flex-row sm:items-center sm:justify-between">
            <input
              type="search"
              placeholder="Buscar por fazenda, produtor ou nº do lote..."
              className="flex-1 rounded-lg border border-agronex-border px-3 py-2 text-sm outline-none focus:border-agronex-green focus:ring-2 focus:ring-agronex-green/15"
            />
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-lg border border-agronex-border px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                Limpar
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg bg-agronex-green px-5 py-2 text-sm font-semibold text-white hover:bg-agronex-green-dark"
              >
                <Filter className="h-4 w-4" />
                Aplicar filtros
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface LeiloesTabsProps {
  active: "ativos" | "proximos" | "encerrados";
}

export function LeiloesTabs({ active }: LeiloesTabsProps) {
  const tabs = [
    { id: "ativos" as const, label: "Em pregão", href: "/produtor/leiloes" },
    {
      id: "proximos" as const,
      label: "Agendados",
      href: "/produtor/leiloes?tab=proximos",
    },
    {
      id: "encerrados" as const,
      label: "Encerrados",
      href: "/produtor/leiloes/8492/encerrado",
    },
  ];

  return (
    <div className="flex gap-0 border-b border-agronex-border">
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          href={tab.href}
          className={cn(
            "relative px-4 py-2.5 text-sm font-medium transition-colors",
            active === tab.id
              ? "text-agronex-green"
              : "text-agronex-muted hover:text-gray-900",
          )}
        >
          {tab.label}
          {active === tab.id && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-agronex-green" />
          )}
        </Link>
      ))}
    </div>
  );
}
