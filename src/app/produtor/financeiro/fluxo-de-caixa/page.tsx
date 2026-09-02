"use client";

import { useState } from "react";
import {
  BarChart3,
  Building2,
  Download,
  Filter,
  TrendingUp,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FinanceiroNav } from "@/components/produtor/financeiro/FinanceiroNav";
import { extratoTransacoes, fluxoKpis } from "@/lib/financeiro-data";

export default function FluxoDeCaixaPage() {
  const [selectedId, setSelectedId] = useState("TRX-9824-A");
  const selected = extratoTransacoes.find((t) => t.id === selectedId);

  return (
    <div className="flex h-full flex-col lg:flex-row">
      <div className="flex-1 p-6 lg:p-8">
        <div className="mb-2">
          <p className="text-xs font-medium uppercase text-agronex-muted">
            Gestão Financeira — Módulo Produtor
          </p>
          <h1 className="text-2xl font-bold text-gray-900">Extrato Financeiro</h1>
          <p className="mt-1 text-sm text-agronex-muted">
            Acompanhe seus recebimentos e a transparência das taxas aplicadas
          </p>
        </div>

        <FinanceiroNav />

        <div className="mb-4 flex justify-end gap-2">
          <select className="rounded-lg border border-agronex-border px-4 py-2 text-sm outline-none">
            <option>Últimos 30 dias</option>
            <option>Últimos 90 dias</option>
          </select>
          <button
            type="button"
            className="rounded-lg border border-agronex-border p-2 text-gray-500 hover:bg-gray-50"
          >
            <Filter className="h-4 w-4" />
          </button>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-agronex-border bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase text-agronex-muted">Saldo Disponível</p>
                <p className="mt-1 text-2xl font-bold">{fluxoKpis.saldoDisponivel}</p>
              </div>
              <Building2 className="h-8 w-8 text-gray-300" />
            </div>
          </div>
          <div className="rounded-xl border border-agronex-border bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase text-agronex-muted">Entradas Previstas</p>
                <p className="mt-1 text-2xl font-bold">{fluxoKpis.entradasPrevistas}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-agronex-green" />
            </div>
          </div>
          <div className="rounded-xl border border-agronex-border bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase text-agronex-muted">Taxa Média Retida</p>
                <p className="mt-1 text-2xl font-bold text-agronex-green">
                  {fluxoKpis.taxaMediaRetida}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-gray-300" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-agronex-border bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-agronex-border bg-gray-50 text-left text-xs font-medium uppercase tracking-wide text-agronex-muted">
                  <th className="px-5 py-3">Data</th>
                  <th className="px-5 py-3">Descrição</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Valor Bruto</th>
                  <th className="px-5 py-3">Valor Líquido</th>
                </tr>
              </thead>
              <tbody>
                {extratoTransacoes.map((tx) => (
                  <tr
                    key={tx.id}
                    onClick={() => setSelectedId(tx.id)}
                    className={cn(
                      "cursor-pointer border-b border-agronex-border last:border-0 hover:bg-gray-50",
                      selectedId === tx.id && "border-l-4 border-l-agronex-green bg-green-50/30",
                    )}
                  >
                    <td className="px-5 py-4 text-agronex-muted">{tx.data}</td>
                    <td className="px-5 py-4">
                      <p className="font-medium">{tx.descricao}</p>
                      <p className="text-xs text-agronex-muted">ID: {tx.id}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-0.5 text-xs font-medium",
                          tx.status === "liquidado"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-700",
                        )}
                      >
                        {tx.status === "liquidado"
                          ? "Liquidado"
                          : "Aguardando Escrow"}
                      </span>
                    </td>
                    <td className="px-5 py-4">{tx.valorBruto}</td>
                    <td className="px-5 py-4 font-semibold text-agronex-green">
                      {tx.valorLiquido}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selected && (
        <aside className="w-full border-l border-agronex-border bg-white lg:w-96">
          <div className="flex items-center justify-between border-b border-agronex-border px-5 py-4">
            <h2 className="font-semibold text-gray-900">Detalhes da Transação</h2>
            <button
              type="button"
              onClick={() => setSelectedId("")}
              className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 lg:hidden"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="p-5">
            <h3 className="font-semibold text-gray-900">{selected.detail.titulo}</h3>
            <p className="text-xs text-agronex-muted">ID: {selected.id}</p>
            <p className="text-xs text-agronex-muted">{selected.data}</p>
            <span className="mt-2 inline-block rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
              {selected.detail.statusLabel}
            </span>

            <div className="mt-6 rounded-xl bg-gray-50 p-4">
              <p className="mb-3 text-xs font-semibold uppercase text-agronex-muted">
                Composição do Repasse
              </p>
              <dl className="space-y-2 text-sm">
                {selected.detail.composicao.map((item) => (
                  <div key={item.label} className="flex justify-between">
                    <dt className="text-gray-700">{item.label}</dt>
                    <dd
                      className={
                        item.type === "deduction"
                          ? "text-red-600"
                          : "font-medium text-gray-900"
                      }
                    >
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-4 flex justify-between border-t border-agronex-border pt-3">
                <span className="font-semibold text-agronex-green">= Valor Líquido</span>
                <span className="text-lg font-bold text-agronex-green">
                  {selected.detail.valorLiquido}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <p className="mb-3 text-xs font-semibold uppercase text-agronex-muted">
                Documentos Relacionados
              </p>
              <div className="space-y-2">
                {selected.detail.documentos.map((doc) => (
                  <div
                    key={doc}
                    className="flex items-center justify-between rounded-lg border border-agronex-border px-3 py-2.5"
                  >
                    <span className="text-sm">{doc}</span>
                    <button
                      type="button"
                      className="text-agronex-green hover:text-agronex-green-dark"
                      aria-label={`Baixar ${doc}`}
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
