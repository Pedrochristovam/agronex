import Link from "next/link";
import {
  Banknote,
  CheckCircle2,
  Clock,
  Download,
  FileWarning,
  Timer,
  Wallet,
} from "lucide-react";
import { MetricCard } from "@/components/produtor/MetricCard";
import { StatusBadge } from "@/components/produtor/StatusBadge";
import { Button } from "@/components/ui/Button";

const recentOrders = [
  {
    date: "24/10/2023",
    client: "AgroIndústria Vale S.A.",
    product: "Soja (Tipo 1)",
    quantity: "5.000 sacas",
    value: "R$ 650.000,00",
    status: "Em Transporte",
    statusVariant: "warning" as const,
  },
  {
    date: "22/10/2023",
    client: "Exportadora Sul Real",
    product: "Café Arábica",
    quantity: "800 sacas",
    value: "R$ 840.000,00",
    status: "Pago",
    statusVariant: "success" as const,
  },
  {
    date: "20/10/2023",
    client: "Moinhos de Minas Ltda",
    product: "Milho Grão",
    quantity: "2.500 sacas",
    value: "R$ 150.000,00",
    status: "Aguardando Coleta",
    statusVariant: "neutral" as const,
  },
];

const chartBars = [
  { month: "Mai", soja: 60, milho: 40, cafe: 25 },
  { month: "Jun", soja: 75, milho: 55, cafe: 30 },
  { month: "Jul", soja: 90, milho: 45, cafe: 35 },
  { month: "Ago", soja: 85, milho: 70, cafe: 40 },
  { month: "Set", soja: 100, milho: 60, cafe: 45 },
  { month: "Out", soja: 95, milho: 80, cafe: 50 },
];

export default function ProdutorVisaoGeralPage() {
  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Visão Geral</h1>
          <p className="mt-1 text-sm text-agronex-muted">
            Bem-vindo de volta. Aqui está o resumo das suas operações em Minas
            Gerais.
          </p>
        </div>
        <Button variant="secondary" className="gap-2 whitespace-nowrap">
          <Download className="h-4 w-4" />
          Relatório Mensal
        </Button>
      </div>

      {/* Metrics */}
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <MetricCard
          title="Valor Total Vendido (YTD)"
          value="R$ 450.000,00"
          trend="+12,5% vs mês anterior"
          trendPositive
          icon={Banknote}
        />
        <MetricCard
          title="Valores Pendentes"
          value="R$ 85.200,00"
          subtitle="Aguardando liquidação (3 transações)"
          icon={Timer}
        />
        <MetricCard
          title="Valores Disponíveis"
          value="R$ 12.450,00"
          valueClassName="text-agronex-green"
          icon={Wallet}
          action={
            <Link
              href="/produtor/financeiro"
              className="mt-2 inline-block text-xs font-semibold text-agronex-green hover:underline"
            >
              Solicitar Saque →
            </Link>
          }
        />
      </div>

      {/* Middle grid */}
      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        {/* Operations */}
        <div className="rounded-xl border border-agronex-border bg-white p-5 shadow-sm lg:col-span-1">
          <h2 className="mb-4 text-sm font-semibold text-gray-900">
            Operações em Andamento
          </h2>

          <div className="space-y-4">
            <div className="rounded-lg border border-agronex-border p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-agronex-muted">
                  Lotes Ativos
                </span>
                <span className="text-2xl font-bold text-agronex-green">5</span>
              </div>
              <p className="mt-2 text-xs text-agronex-muted">
                Lotes de Soja (3) e Milho (2) classificados e prontos para
                oferta.
              </p>
              <Link
                href="/produtor/lotes"
                className="mt-2 inline-block text-xs font-semibold text-agronex-green hover:underline"
              >
                Ver Lotes
              </Link>
            </div>

            <div className="rounded-lg border border-agronex-border p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-agronex-muted">
                  Leilões em Andamento
                </span>
                <span className="text-2xl font-bold text-agronex-green">2</span>
              </div>
              <div className="mt-3 space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium">Leilão #402 (Soja)</span>
                    <span className="font-semibold text-red-600">Encerra em 2h</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-gray-100">
                    <div className="h-full w-[85%] rounded-full bg-agronex-green" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium">Leilão #405 (Milho)</span>
                    <span className="text-agronex-muted">Encerra em 2 dias</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-gray-100">
                    <div className="h-full w-[45%] rounded-full bg-agronex-green" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="rounded-xl border border-agronex-border bg-white p-5 shadow-sm lg:col-span-2">
          <h2 className="mb-4 text-sm font-semibold text-gray-900">
            Evolução do Faturamento &amp; Vendas por Produto
          </h2>
          <div className="flex h-48 items-end justify-between gap-2 border-b border-l border-gray-200 px-2 pb-2 pt-4">
            {chartBars.map((bar) => (
              <div key={bar.month} className="flex flex-1 flex-col items-center gap-1">
                <div className="flex h-36 w-full items-end justify-center gap-0.5">
                  <div
                    className="w-2 rounded-t bg-green-700"
                    style={{ height: `${bar.soja}%` }}
                    title="Soja"
                  />
                  <div
                    className="w-2 rounded-t bg-yellow-500"
                    style={{ height: `${bar.milho}%` }}
                    title="Milho"
                  />
                  <div
                    className="w-2 rounded-t bg-amber-700"
                    style={{ height: `${bar.cafe}%` }}
                    title="Café"
                  />
                </div>
                <span className="text-[10px] text-agronex-muted">{bar.month}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-center gap-4 text-xs text-agronex-muted">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-green-700" /> Soja
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-yellow-500" /> Milho
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-amber-700" /> Café
            </span>
          </div>
        </div>
      </div>

      {/* Quick actions + Alerts */}
      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-agronex-border bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-gray-900">
            Ações Rápidas
          </h2>
          <div className="space-y-3">
            <Button href="/produtor/meus-produtos/novo" className="w-full">
              Novo Produto
            </Button>
            <Button href="/produtor/lotes/novo" variant="secondary" className="w-full">
              Novo Lote
            </Button>
            <Button href="/produtor/leiloes/novo" variant="secondary" className="w-full">
              Criar Leilão
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-agronex-border bg-white p-5 shadow-sm lg:col-span-2">
          <h2 className="mb-4 text-sm font-semibold text-gray-900">
            Alertas Importantes
          </h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3 rounded-lg border border-red-100 bg-red-50 p-3">
              <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Leilão encerra em 2h
                </p>
                <p className="text-xs text-agronex-muted">
                  Leilão #402 (Soja) — Lote de 150 toneladas em Uberaba, MG
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-orange-100 bg-orange-50 p-3">
              <FileWarning className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Documento Pendente
                </p>
                <p className="text-xs text-agronex-muted">
                  GTA necessária para Lote #398 (Milho)
                </p>
                <Link
                  href="/produtor/documentos"
                  className="mt-1 inline-block text-xs font-semibold text-orange-700 hover:underline"
                >
                  ANEXAR DOCUMENTO
                </Link>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-green-100 bg-green-50 p-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Pagamento Liberado
                </p>
                <p className="text-xs text-agronex-muted">
                  Pedido #1254 (Café) — R$ 84.000,00 disponível para saque
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent orders table */}
      <div className="rounded-xl border border-agronex-border bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-agronex-border px-5 py-4">
          <h2 className="text-sm font-semibold text-gray-900">Pedidos Recentes</h2>
          <Link
            href="/produtor/pedidos"
            className="text-xs font-semibold text-agronex-green hover:underline"
          >
            Ver Todos
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-agronex-border bg-gray-50 text-left text-xs font-medium uppercase tracking-wide text-agronex-muted">
                <th className="px-5 py-3">Data</th>
                <th className="px-5 py-3">Cliente</th>
                <th className="px-5 py-3">Produto</th>
                <th className="px-5 py-3">Quantidade</th>
                <th className="px-5 py-3">Valor (R$)</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr
                  key={order.date + order.client}
                  className="border-b border-agronex-border last:border-0 hover:bg-gray-50"
                >
                  <td className="px-5 py-4 text-agronex-muted">{order.date}</td>
                  <td className="px-5 py-4 font-medium text-gray-900">
                    {order.client}
                  </td>
                  <td className="px-5 py-4">{order.product}</td>
                  <td className="px-5 py-4">{order.quantity}</td>
                  <td className="px-5 py-4 font-medium">{order.value}</td>
                  <td className="px-5 py-4">
                    <StatusBadge
                      label={order.status}
                      variant={order.statusVariant}
                    />
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
