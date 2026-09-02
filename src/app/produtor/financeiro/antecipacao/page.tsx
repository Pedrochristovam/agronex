"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Calculator, HelpCircle, Search } from "lucide-react";
import { FinanceiroNav } from "@/components/produtor/financeiro/FinanceiroNav";
import { Button } from "@/components/ui/Button";
import {
  faturasAntecipacao,
  formatBRL,
} from "@/lib/financeiro-data";

const CUSTO_FIXO_RATE = 0.0225;

export default function AntecipacaoPage() {
  const [selected, setSelected] = useState<string[]>(
    faturasAntecipacao.filter((f) => f.defaultSelected).map((f) => f.id),
  );
  const [agreed, setAgreed] = useState(false);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const simulation = useMemo(() => {
    const faturas = faturasAntecipacao.filter((f) => selected.includes(f.id));
    const bruto = faturas.reduce((sum, f) => sum + f.valor, 0);
    const custo = bruto * CUSTO_FIXO_RATE;
    const liquido = bruto - custo;
    return { bruto, custo, liquido, count: faturas.length };
  }, [selected]);

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-2 flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase text-agronex-muted">
            Gestão Financeira — Módulo Produtor
          </p>
          <h1 className="text-2xl font-bold text-gray-900">Solicitar Antecipação</h1>
          <p className="mt-1 text-sm text-agronex-muted">
            Selecione as faturas elegíveis e simule o valor da antecipação
          </p>
        </div>
        <button
          type="button"
          className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
          aria-label="Ajuda"
        >
          <HelpCircle className="h-5 w-5" />
        </button>
      </div>

      <FinanceiroNav />

      <div className="flex flex-col gap-6 xl:flex-row">
        <div className="flex-1">
          <div className="mb-4 flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                placeholder="Buscar por cliente ou NF"
                className="w-full rounded-lg border border-agronex-border py-2 pl-10 pr-4 text-sm outline-none focus:border-agronex-green"
              />
            </div>
            <button
              type="button"
              className="rounded-lg border border-agronex-border px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >
              Filtrar
            </button>
          </div>

          <div className="rounded-xl border border-agronex-border bg-white shadow-sm">
            <div className="flex items-center gap-2 border-b border-agronex-border px-5 py-4">
              <h2 className="text-sm font-semibold">Faturas &quot;A Receber&quot;</h2>
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                {faturasAntecipacao.length} Elegíveis
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-agronex-border bg-gray-50 text-left text-xs font-medium uppercase tracking-wide text-agronex-muted">
                    <th className="px-5 py-3 w-10" />
                    <th className="px-5 py-3">Cliente / NF</th>
                    <th className="px-5 py-3">Vencimento</th>
                    <th className="px-5 py-3">Valor Total</th>
                    <th className="px-5 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {faturasAntecipacao.map((fatura) => (
                    <tr
                      key={fatura.id}
                      className="border-b border-agronex-border last:border-0 hover:bg-gray-50"
                    >
                      <td className="px-5 py-4">
                        <input
                          type="checkbox"
                          checked={selected.includes(fatura.id)}
                          onChange={() => toggle(fatura.id)}
                          className="h-4 w-4 rounded border-gray-300 text-agronex-green focus:ring-agronex-green"
                        />
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-medium">{fatura.cliente}</p>
                        <p className="text-xs text-agronex-muted">NF: {fatura.nf}</p>
                      </td>
                      <td className="px-5 py-4 text-agronex-muted">
                        {fatura.vencimento}
                      </td>
                      <td className="px-5 py-4 font-medium">{fatura.valorFormatted}</td>
                      <td className="px-5 py-4">
                        <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          A Receber
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <aside className="w-full xl:w-80">
          <div className="sticky top-6 rounded-xl border border-agronex-border bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-agronex-green" />
              <h2 className="font-semibold text-gray-900">Simulador</h2>
            </div>

            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-agronex-muted">Valor Bruto Selecionado</dt>
                <dd className="font-semibold">{formatBRL(simulation.bruto)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-agronex-muted">Taxa de Desconto Aplicada</dt>
                <dd className="font-medium text-red-600">1,5% a.m.</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-agronex-muted">Prazo Médio Ponderado</dt>
                <dd className="font-medium">45 dias</dd>
              </div>
              <div className="flex justify-between border-t border-agronex-border pt-3">
                <dt className="text-agronex-muted">Custo Total da Operação</dt>
                <dd className="font-semibold text-red-600">
                  - {formatBRL(simulation.custo)}
                </dd>
              </div>
            </dl>

            <div className="mt-4 rounded-xl bg-green-50 p-4">
              <p className="text-xs text-agronex-muted">Valor Líquido a Receber Hoje</p>
              <p className="mt-1 text-2xl font-bold text-agronex-green">
                {formatBRL(simulation.liquido)}
              </p>
            </div>

            <label className="mt-4 flex cursor-pointer items-start gap-2 text-xs text-gray-700">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-agronex-green"
              />
              Li e concordo com os Termos de Antecipação de Recebíveis
            </label>

            <Button
              disabled={!agreed || simulation.count === 0}
              className="mt-4 w-full gap-2"
              size="lg"
            >
              Confirmar Antecipação
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
