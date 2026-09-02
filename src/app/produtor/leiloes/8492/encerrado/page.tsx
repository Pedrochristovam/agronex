import Link from "next/link";
import {
  ArrowLeft,
  Award,
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
    <div className="min-h-full bg-[#f0f2f0] p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Link
              href="/produtor/leiloes"
              className="mb-3 inline-flex items-center gap-1 text-sm font-medium text-agronex-green hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar aos Certames
            </Link>

            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-gray-200 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-600">
                Pregão Encerrado
              </span>
              <span className="flex items-center gap-1.5 text-sm text-agronex-muted">
                <Clock className="h-4 w-4" />
                {closedAuction.closedAt}
              </span>
            </div>

            <h1 className="mt-3 text-2xl font-bold text-gray-900">
              {closedAuction.title}
            </h1>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-agronex-muted">
              {closedAuction.description}
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-agronex-border bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:shadow-md"
          >
            <Printer className="h-4 w-4" />
            Imprimir Ata
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-5 lg:col-span-2">
            {/* Arrematante */}
            <div className="rounded-2xl border border-agronex-border bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-agronex-accent/10">
                  <Trophy className="h-5 w-5 text-agronex-accent" />
                </div>
                <h2 className="font-semibold text-gray-900">
                  Arrematante — Maior Lance
                </h2>
              </div>

              <p className="text-lg font-bold text-gray-900">
                {closedAuction.winner.company}
              </p>
              <p className="text-sm text-agronex-muted">
                CNPJ: {closedAuction.winner.cnpj}
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-agronex-muted">
                    Contato
                  </p>
                  <p className="mt-2 text-sm font-semibold">
                    {closedAuction.winner.contact}
                  </p>
                  <p className="text-sm text-agronex-muted">
                    {closedAuction.winner.email}
                  </p>
                  <p className="text-sm text-agronex-muted">
                    {closedAuction.winner.phone}
                  </p>
                </div>
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-agronex-muted">
                    Destino Previsto
                  </p>
                  <p className="mt-2 text-sm font-semibold">
                    {closedAuction.winner.destination}
                  </p>
                  <p className="text-sm text-agronex-muted">
                    Retirada: {closedAuction.winner.incoterm}
                  </p>
                </div>
              </div>

              <Button href="/produtor/pedidos/agx-9042" className="mt-6 gap-2 rounded-xl">
                <FileText className="h-4 w-4" />
                Gerar Pedido de Venda
              </Button>
            </div>

            {/* Especificações */}
            <div className="rounded-2xl border border-agronex-border bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-agronex-green" />
                <h2 className="font-semibold text-gray-900">
                  Especificações do Lote
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {Object.entries(closedAuction.specs).map(([key, value]) => (
                  <div
                    key={key}
                    className="rounded-xl border border-agronex-border bg-gradient-to-br from-[#f8faf8] to-white p-4 text-center"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-wider text-agronex-muted">
                      {key}
                    </p>
                    <p className="mt-1.5 text-xl font-bold text-gray-900">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-agronex-green" />
                  <span>Laudo de Classificação Oficial — SGS Brasil</span>
                </div>
                <Link
                  href="#"
                  className="font-bold text-agronex-green hover:underline"
                >
                  PDF
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            {/* Lance vencedor */}
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <div className="bg-gradient-to-br from-[#071510] to-agronex-green-dark p-6 text-white">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                  Lance Vencedor
                </p>
                <p className="mt-3 text-4xl font-bold text-agronex-accent">
                  {closedAuction.winningBid}
                </p>
                <p className="mt-2 text-sm text-white/70">
                  Valor Total:{" "}
                  <span className="font-semibold text-white">
                    {closedAuction.totalValue}
                  </span>
                </p>
              </div>
            </div>

            {/* Histórico */}
            <div className="rounded-2xl border border-agronex-border bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-agronex-green" />
                <h2 className="font-semibold text-gray-900">
                  Histórico de Lances
                </h2>
              </div>

              <div className="space-y-2">
                {closedAuction.bidHistory.map((bid, i) => (
                  <div
                    key={i}
                    className={`rounded-xl border px-4 py-3 ${
                      bid.winner
                        ? "border-agronex-accent/30 bg-agronex-accent/5"
                        : "border-agronex-border hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-mono text-[10px] text-agronex-muted">
                          {bid.time}
                        </p>
                        <p className="text-sm font-semibold">{bid.bidder}</p>
                      </div>
                      <p className="text-sm font-bold text-agronex-green">
                        {bid.amount}
                      </p>
                    </div>
                    {bid.winner && (
                      <span className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-agronex-green">
                        <Trophy className="h-3 w-3" />
                        Lance Vencedor
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-between border-t border-agronex-border pt-4 text-xs text-agronex-muted">
                <span>{closedAuction.totalBids} lances registrados</span>
                <span>{closedAuction.participants} participantes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
