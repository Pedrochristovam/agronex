import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  FileText,
  Printer,
  Trophy,
} from "lucide-react";
import { closedAuction } from "@/lib/leiloes-data";
import { Button } from "@/components/ui/Button";

export default function LeilaoEncerradoPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <nav className="mb-2 flex flex-wrap items-center gap-2 text-sm text-agronex-muted">
            <Link
              href="/produtor/leiloes"
              className="inline-flex items-center gap-1 text-agronex-green hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para Lista
            </Link>
            <span>|</span>
            <Link href="/produtor/leiloes" className="hover:text-gray-900">
              Leilões
            </Link>
            <span>|</span>
            <span className="text-gray-900">{closedAuction.title}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold uppercase text-gray-700">
              Leilão Encerrado
            </span>
            <span className="flex items-center gap-1 text-sm text-agronex-muted">
              <Clock className="h-4 w-4" />
              {closedAuction.closedAt}
            </span>
          </div>

          <h1 className="mt-2 text-2xl font-bold text-gray-900">
            {closedAuction.title}
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-agronex-muted">
            {closedAuction.description}
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border border-agronex-border bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <Printer className="h-4 w-4" />
          Imprimir
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-xl border border-agronex-border bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-agronex-green" />
              <h2 className="text-sm font-semibold text-gray-900">
                Informações do Arrematante
              </h2>
            </div>

            <p className="font-semibold text-gray-900">
              {closedAuction.winner.company}
            </p>
            <p className="text-sm text-agronex-muted">
              CNPJ: {closedAuction.winner.cnpj}
            </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase text-agronex-muted">
                  Contato
                </p>
                <p className="mt-1 text-sm font-medium">
                  {closedAuction.winner.contact}
                </p>
                <p className="text-sm text-agronex-muted">
                  {closedAuction.winner.email}
                </p>
                <p className="text-sm text-agronex-muted">
                  {closedAuction.winner.phone}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase text-agronex-muted">
                  Destino Previsto
                </p>
                <p className="mt-1 text-sm font-medium">
                  {closedAuction.winner.destination}
                </p>
                <p className="text-sm text-agronex-muted">
                  Retirada: {closedAuction.winner.incoterm}
                </p>
              </div>
            </div>

            <Button href="/produtor/pedidos/agx-9042" className="mt-6 gap-2">
              <FileText className="h-4 w-4" />
              Gerar Pedido de Venda
            </Button>
          </div>

          <div className="rounded-xl border border-agronex-border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-sm font-semibold text-gray-900">
              Especificações do Lote
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {Object.entries(closedAuction.specs).map(([key, value]) => (
                <div
                  key={key}
                  className="rounded-lg border border-agronex-border p-3 text-center"
                >
                  <p className="text-xs font-medium uppercase text-agronex-muted">
                    {key}
                  </p>
                  <p className="mt-1 text-lg font-bold text-gray-900">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-agronex-green" />
                <span>
                  Laudo de Classificação Oficial — emitido por SGS Brasil
                </span>
              </div>
              <Link
                href="#"
                className="font-semibold text-agronex-green hover:underline"
              >
                PDF
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl bg-agronex-green p-6 text-white shadow-sm">
            <p className="text-xs font-medium uppercase text-white/80">
              Lance Vencedor
            </p>
            <p className="mt-2 text-3xl font-bold">{closedAuction.winningBid}</p>
            <p className="mt-2 text-sm text-white/80">
              Valor Total: {closedAuction.totalValue}
            </p>
          </div>

          <div className="rounded-xl border border-agronex-border bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-agronex-green" />
              <h2 className="text-sm font-semibold text-gray-900">
                Histórico de Lances
              </h2>
            </div>

            <div className="space-y-3">
              {closedAuction.bidHistory.map((bid, i) => (
                <div
                  key={i}
                  className={`rounded-lg border px-3 py-2.5 ${
                    bid.winner
                      ? "border-green-200 bg-green-50"
                      : "border-agronex-border"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-agronex-muted">{bid.time}</p>
                      <p className="text-sm font-medium">{bid.bidder}</p>
                    </div>
                    <p className="text-sm font-bold text-agronex-green">
                      {bid.amount}
                    </p>
                  </div>
                  {bid.winner && (
                    <span className="mt-1 inline-block text-xs font-semibold text-green-700">
                      Lance Vencedor
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-between border-t border-agronex-border pt-4 text-xs text-agronex-muted">
              <span>Total de Lances: {closedAuction.totalBids} lances</span>
              <span>Participantes Ativos: {closedAuction.participants}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
