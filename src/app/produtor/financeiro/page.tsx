"use client";

import Link from "next/link";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Clock,
  Landmark,
  Lock,
} from "lucide-react";
import { FinanceiroNav } from "@/components/produtor/financeiro/FinanceiroNav";
import { Button } from "@/components/ui/Button";
import {
  chartData,
  financeiroKpis,
  transacoesRecentes,
} from "@/lib/financeiro-data";

export default function FinanceiroDashboardPage() {
  const maxValue = 600;

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-2 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase text-agronex-muted">
            Gestão Financeira — Módulo Produtor
          </p>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Financeiro</h1>
        </div>
        <Button href="/produtor/financeiro/antecipacao">
          Solicitar Antecipação
        </Button>
      </div>

      <FinanceiroNav />

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-agronex-border bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase text-agronex-muted">
                Valor Disponível
              </p>
              <p className="mt-2 text-2xl font-bold text-gray-900">
                {financeiroKpis.disponivel}
              </p>
              <p className="mt-1 flex items-center gap-1 text-xs font-medium text-green-600">
                <ArrowUpRight className="h-3 w-3" />
                {financeiroKpis.disponivelTrend}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50">
              <Landmark className="h-5 w-5 text-agronex-green" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-agronex-border bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase text-agronex-muted">
                Valores em Garantia (Escrow)
              </p>
              <p className="mt-2 text-2xl font-bold text-gray-900">
                {financeiroKpis.escrow}
              </p>
              <p className="mt-1 text-xs text-agronex-muted">
                Bloqueado para operações
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
              <Lock className="h-5 w-5 text-gray-500" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-agronex-border bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase text-agronex-muted">
                Valores a Receber
              </p>
              <p className="mt-2 text-2xl font-bold text-gray-900">
                {financeiroKpis.aReceber}
              </p>
              <p className="mt-1 text-xs text-agronex-muted">
                {financeiroKpis.aReceberPrazo}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-50">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 rounded-xl border border-agronex-border bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">
            Evolução Financeira (Últimos 6 meses)
          </h2>
          <div className="flex gap-4 text-xs">
            <span className="flex items-center gap-1">
              <span className="h-0.5 w-4 bg-gray-900" /> Receita
            </span>
            <span className="flex items-center gap-1">
              <span className="h-0.5 w-4 border-t-2 border-dashed border-red-500" />{" "}
              Despesas
            </span>
          </div>
        </div>

        <div className="relative h-56">
          <div className="absolute inset-0 flex flex-col justify-between text-xs text-agronex-muted">
            {["R$ 600k", "R$ 400k", "R$ 200k", "R$ 0k"].map((label) => (
              <div key={label} className="flex items-center gap-2">
                <span className="w-12 text-right">{label}</span>
                <div className="h-px flex-1 bg-gray-100" />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 ml-14 flex items-end justify-between gap-2 pb-6">
            {chartData.map((point) => (
              <div key={point.month} className="flex flex-1 flex-col items-center">
                <div className="relative h-40 w-full">
                  <div
                    className="absolute bottom-0 w-full rounded-t bg-green-100"
                    style={{ height: `${(point.receita / maxValue) * 100}%` }}
                  />
                  <div
                    className="absolute bottom-0 w-full border-t-2 border-gray-900"
                    style={{ bottom: `${(point.receita / maxValue) * 100}%` }}
                  />
                </div>
                <span className="mt-2 text-xs text-agronex-muted">{point.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-agronex-border bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-agronex-border px-5 py-4">
          <h2 className="text-sm font-semibold text-gray-900">
            Histórico de Transações Recentes
          </h2>
          <Link
            href="/produtor/financeiro/fluxo-de-caixa"
            className="text-xs font-semibold text-agronex-green hover:underline"
          >
            Ver todas
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-agronex-border bg-gray-50 text-left text-xs font-medium uppercase tracking-wide text-agronex-muted">
                <th className="px-5 py-3">Data</th>
                <th className="px-5 py-3">Descrição</th>
                <th className="px-5 py-3">Tipo</th>
                <th className="px-5 py-3">Valor Bruto</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {transacoesRecentes.map((tx) => (
                <tr
                  key={tx.id}
                  className="border-b border-agronex-border last:border-0 hover:bg-gray-50"
                >
                  <td className="px-5 py-4 text-agronex-muted">{tx.data}</td>
                  <td className="px-5 py-4 font-medium">{tx.descricao}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1 ${
                        tx.tipo === "credito" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {tx.tipo === "credito" ? (
                        <ArrowUpRight className="h-3 w-3" />
                      ) : (
                        <ArrowDownLeft className="h-3 w-3" />
                      )}
                      {tx.tipo === "credito" ? "Crédito" : "Débito"}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-medium">{tx.valor}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        tx.status === "concluido"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {tx.status === "concluido" ? "Concluído" : "Processando"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
