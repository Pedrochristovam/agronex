"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Download,
  ExternalLink,
  Printer,
  QrCode,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { certificadoDetail, getCertificadoById } from "@/lib/documentos-data";
import { notFound, useParams } from "next/navigation";

export default function CertificadoDetailPage() {
  const params = useParams();
  const slug = params.id as string;
  const data = getCertificadoById(slug);

  if (!data) {
    notFound();
  }

  const cert = slug === "cert-rastreabilidade" ? certificadoDetail : data;

  return (
    <div className="p-6 lg:p-8">
      <Link
        href="/produtor/documentos"
        className="mb-4 inline-flex items-center gap-1 text-sm text-agronex-green hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        Meus Documentos
      </Link>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-agronex-green">
            Detalhes do Certificado
          </h1>
          <p className="mt-1 text-sm text-agronex-muted">
            Visualização e validação de autenticidade documental
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" className="gap-2">
            <Printer className="h-4 w-4" />
            Imprimir
          </Button>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Baixar PDF
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-xl border-2 border-agronex-border bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-start justify-between border-b border-agronex-border pb-6">
              <div>
                <p className="text-lg font-bold text-agronex-green">AGRONEX</p>
                <p className="text-xs text-agronex-muted">Selo de Qualidade</p>
              </div>
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                {cert.status}
              </span>
            </div>

            <div className="text-center">
              <p className="text-sm text-agronex-muted">Certifica-se que</p>
              <h2 className="mt-2 text-xl font-bold text-gray-900">{cert.titulo}</h2>
              <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-agronex-muted">
                Este documento atesta a conformidade com os padrões de origem
                sustentável e excelência nos processos agrícolas aplicados ao lote
                especificado, conforme auditoria técnica Agronex.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase text-agronex-muted">ID do Certificado</p>
                <p className="font-semibold">{cert.id}</p>
              </div>
              <div>
                <p className="text-xs uppercase text-agronex-muted">Data de Emissão</p>
                <p className="font-semibold">{cert.emissao}</p>
              </div>
              <div>
                <p className="text-xs uppercase text-agronex-muted">Produtor / Titular</p>
                <p className="font-semibold">{cert.produtor}</p>
              </div>
              <div>
                <p className="text-xs uppercase text-agronex-muted">Data de Validade</p>
                <p className="font-semibold">{cert.validade}</p>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center rounded-xl border border-agronex-border bg-gray-50 p-6">
              <QrCode className="h-24 w-24 text-agronex-green" />
              <p className="mt-2 text-xs text-agronex-muted">
                Escaneie para validar rastreabilidade
              </p>
            </div>

            <div className="mt-8 border-t border-agronex-border pt-6 text-center">
              <p className="text-sm font-medium text-gray-900">
                Autoridade Certificadora Agronex
              </p>
              <p className="mt-4 font-serif italic text-agronex-green">
                Assinatura Digital Verificada
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-agronex-border bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold">Dados do Lote Relacionado</h3>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-agronex-muted">Produto</dt>
                <dd className="font-medium">{cert.lote.produto}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-agronex-muted">Quantidade</dt>
                <dd className="font-medium">{cert.lote.quantidade}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-agronex-muted">Origem</dt>
                <dd className="font-medium">{cert.lote.origem}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-agronex-muted">Safra</dt>
                <dd className="font-medium">{cert.lote.safra}</dd>
              </div>
            </dl>
            <Link
              href={cert.lote.loteHref}
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-agronex-green hover:underline"
            >
              Ver Detalhes do Lote
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>

          <div className="rounded-xl border border-agronex-border bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold">Histórico de Validação</h3>
            <div className="space-y-4">
              {cert.historico.map((item, i) => (
                <div key={i} className="relative flex gap-3 pl-4">
                  <span className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-agronex-green" />
                  <div>
                    <p className="text-xs text-agronex-muted">{item.data}</p>
                    <p className="text-sm text-gray-900">{item.evento}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
