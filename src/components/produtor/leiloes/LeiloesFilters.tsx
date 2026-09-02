"use client";

import { cn } from "@/lib/utils";

const categories = [
  { id: "soja", label: "Soja", count: 45, defaultChecked: true },
  { id: "milho", label: "Milho", count: 32 },
  { id: "trigo", label: "Trigo", count: 12 },
  { id: "cafe", label: "Café", count: 28 },
];

export function LeiloesFilters() {
  return (
    <aside className="w-full flex-shrink-0 lg:w-56">
      <div className="rounded-xl border border-agronex-border bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">Filtros</h2>
          <button
            type="button"
            className="text-xs font-medium text-agronex-green hover:underline"
          >
            Limpar
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-agronex-muted">
              Categorias
            </p>
            <div className="space-y-2">
              {categories.map((cat) => (
                <label
                  key={cat.id}
                  className="flex cursor-pointer items-center gap-2 text-sm"
                >
                  <input
                    type="checkbox"
                    defaultChecked={cat.defaultChecked}
                    className="h-4 w-4 rounded border-gray-300 text-agronex-green focus:ring-agronex-green"
                  />
                  <span className="text-gray-700">
                    {cat.label}{" "}
                    <span className="text-agronex-muted">({cat.count})</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-agronex-muted">
              Região
            </p>
            <select className="w-full rounded-lg border border-agronex-border px-3 py-2 text-sm outline-none focus:border-agronex-green">
              <option>Minas Gerais (MG)</option>
              <option>Mato Grosso (MT)</option>
              <option>Goiás (GO)</option>
              <option>São Paulo (SP)</option>
            </select>
          </div>

          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-agronex-muted">
              Preço (R$ / ton)
            </p>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Mín"
                className="w-full rounded-lg border border-agronex-border px-3 py-2 text-sm outline-none focus:border-agronex-green"
              />
              <input
                type="number"
                placeholder="Máx"
                className="w-full rounded-lg border border-agronex-border px-3 py-2 text-sm outline-none focus:border-agronex-green"
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

interface LeiloesTabsProps {
  active: "ativos" | "proximos" | "encerrados";
}

export function LeiloesTabs({ active }: LeiloesTabsProps) {
  const tabs = [
    { id: "ativos" as const, label: "Leilões Ativos", href: "/produtor/leiloes" },
    {
      id: "proximos" as const,
      label: "Próximos",
      href: "/produtor/leiloes?tab=proximos",
    },
    {
      id: "encerrados" as const,
      label: "Encerrados",
      href: "/produtor/leiloes/8492/encerrado",
    },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <a
          key={tab.id}
          href={tab.href}
          className={cn(
            "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
            active === tab.id
              ? "bg-agronex-green text-white"
              : "bg-white text-gray-700 border border-agronex-border hover:bg-gray-50",
          )}
        >
          {tab.label}
        </a>
      ))}
    </div>
  );
}
