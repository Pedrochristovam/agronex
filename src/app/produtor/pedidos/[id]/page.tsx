import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BarChart3,
  ChevronRight,
  Download,
  Eye,
  FileText,
  MapPin,
} from "lucide-react";
import { OrderProgressStepper } from "@/components/produtor/pedidos/OrderComponents";
import { Button } from "@/components/ui/Button";
import { getPedidoBySlug, pedidoDetail } from "@/lib/pedidos-data";

interface PedidoDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function PedidoDetailPage({ params }: PedidoDetailPageProps) {
  const { id } = await params;
  const pedido = getPedidoBySlug(id);

  if (!pedido) {
    notFound();
  }

  const detail = id === "agx-9042" ? pedidoDetail : pedido;

  return (
    <div className="p-6 lg:p-8">
      <nav className="mb-4 flex flex-wrap items-center gap-2 text-sm text-agronex-muted">
        <Link href="/produtor/visao-geral" className="hover:text-agronex-green">
          Início
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/produtor/pedidos" className="hover:text-agronex-green">
          Pedidos
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="font-medium text-gray-900">
          Pedido {detail.displayId}
        </span>
      </nav>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900">{detail.displayId}</h1>
          <span className="rounded-full bg-agronex-accent px-3 py-1 text-xs font-bold uppercase tracking-wide text-agronex-green-dark">
            {detail.status}
          </span>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary">Ver Comprovante</Button>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Baixar NF
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <OrderProgressStepper steps={detail.steps} />
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-agronex-border bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-gray-900">
            Informações do Lote
          </h2>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-xs font-medium uppercase text-agronex-muted">
                Produto
              </dt>
              <dd className="font-medium text-gray-900">
                {detail.lote.produto}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-xs font-medium uppercase text-agronex-muted">
                Quantidade
              </dt>
              <dd className="font-medium">{detail.lote.quantidade}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-xs font-medium uppercase text-agronex-muted">
                Valor Unitário
              </dt>
              <dd className="font-medium">{detail.lote.valorUnitario}</dd>
            </div>
            <div className="flex justify-between border-t border-agronex-border pt-3">
              <dt className="text-xs font-medium uppercase text-agronex-muted">
                Total Bruto
              </dt>
              <dd className="text-lg font-bold text-gray-900">
                {detail.lote.totalBruto}
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-xl border border-agronex-border bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-gray-900">Financeiro</h2>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-xs font-medium uppercase text-agronex-muted">
                Pagamento
              </dt>
              <dd className="mt-0.5 font-medium text-gray-900">
                {detail.financeiro.pagamento}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase text-agronex-muted">
                Status Escrow
              </dt>
              <dd className="mt-1">
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                  {detail.financeiro.escrowStatus}
                </span>
              </dd>
            </div>
          </dl>
          <button
            type="button"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-agronex-green hover:underline"
          >
            <Eye className="h-4 w-4" />
            Visualizar Comprovante
          </button>
        </div>

        <div className="rounded-xl border border-agronex-border bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-gray-900">
            Partes Envolvidas
          </h2>
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-xs font-medium uppercase text-agronex-muted">
                Origem (Produtor)
              </p>
              <p className="mt-1 font-semibold text-gray-900">
                {detail.partes.produtor.nome}
              </p>
              <p className="text-agronex-muted">{detail.partes.produtor.documento}</p>
              <p className="flex items-start gap-1 text-agronex-muted">
                <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                {detail.partes.produtor.endereco}
              </p>
            </div>
            <div className="border-t border-agronex-border pt-4">
              <p className="text-xs font-medium uppercase text-agronex-muted">
                Destino (Comprador)
              </p>
              <p className="mt-1 font-semibold text-gray-900">
                {detail.partes.comprador.nome}
              </p>
              <p className="text-agronex-muted">{detail.partes.comprador.documento}</p>
              <p className="flex items-start gap-1 text-agronex-muted">
                <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                {detail.partes.comprador.endereco}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-agronex-border bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-gray-900">
            Logística &amp; Transporte
          </h2>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-xs font-medium uppercase text-agronex-muted">
                Transportadora
              </dt>
              <dd className="font-medium">{detail.logistica.transportadora}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase text-agronex-muted">
                Motorista
              </dt>
              <dd className="font-medium">{detail.logistica.motorista}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase text-agronex-muted">
                Placa / Veículo
              </dt>
              <dd className="font-medium">{detail.logistica.veiculo}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase text-agronex-muted">
                Previsão Entrega
              </dt>
              <dd className="font-semibold text-agronex-green">
                {detail.logistica.previsaoEntrega}
              </dd>
            </div>
          </dl>
          <Link
            href="/produtor/logistica/rastreamento/log-8492-sp"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-agronex-green hover:underline"
          >
            Ver rastreamento completo →
          </Link>
        </div>
      </div>

      <div className="rounded-xl border border-agronex-border bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold text-gray-900">
          Documentos da Operação
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {detail.documentos.map((doc) => (
            <div
              key={doc.nome}
              className={
                doc.disponivel
                  ? "flex items-center justify-between rounded-lg border border-agronex-border p-4"
                  : "flex items-center justify-between rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 opacity-60"
              }
            >
              <div className="flex items-center gap-3">
                {doc.tipo === "pdf" && (
                  <FileText className="h-5 w-5 text-red-500" />
                )}
                {doc.tipo === "doc" && (
                  <FileText className="h-5 w-5 text-blue-500" />
                )}
                {doc.tipo === "chart" && (
                  <BarChart3 className="h-5 w-5 text-agronex-green" />
                )}
                {doc.tipo === "pending" && (
                  <FileText className="h-5 w-5 text-gray-400" />
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900">{doc.nome}</p>
                  <p className="text-xs text-agronex-muted">
                    {doc.disponivel ? doc.tamanho : "Aguardando..."}
                  </p>
                </div>
              </div>
              {doc.disponivel && (
                <button
                  type="button"
                  className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100"
                  aria-label={`Baixar ${doc.nome}`}
                >
                  <Download className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
