"use client";

import { FileText, Info } from "lucide-react";
import { Select } from "@/components/ui/Input";
import { DocumentUploadCard } from "@/components/produtor/lote/FileUploadZone";
import { LoteWizardActions } from "@/components/produtor/lote/LoteWizardActions";
import { LoteWizardStepper } from "@/components/produtor/lote/LoteWizardStepper";
import { LOTE_DRAFT } from "@/lib/lote-wizard";
import { Button } from "@/components/ui/Button";

export default function LoteCertificacaoPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-2 text-xs text-agronex-muted">
          Lotes &gt; Novo Lote
        </div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Cadastrar Novo Lote</h1>
          <p className="mt-1 text-sm text-agronex-muted">
            Passo 4 — Documentos e Certificações
          </p>
        </div>

        <LoteWizardStepper currentStep={4} />

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-xl border border-agronex-border bg-white p-6 shadow-sm">
              <h2 className="mb-1 text-sm font-semibold text-gray-900">
                Documentos Obrigatórios
              </h2>
              <p className="mb-5 text-xs text-agronex-muted">
                Anexe os documentos fiscais e de trânsito necessários para o lote
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <DocumentUploadCard
                  title="Nota Fiscal de Origem"
                  status="pending"
                />
                <DocumentUploadCard
                  title="GTA — Guia de Trânsito Animal"
                  status="uploaded"
                  fileName="GTA_Lote_8492.pdf"
                  fileSize="2,4 MB"
                  uploadedAgo="Enviado há 2 min"
                />
              </div>
            </div>

            <div className="rounded-xl border border-agronex-border bg-white p-6 shadow-sm">
              <h2 className="mb-1 text-sm font-semibold text-gray-900">
                Certificações Adicionais
              </h2>
              <p className="mb-5 text-xs text-agronex-muted">
                Opcional — adicione certificações de sustentabilidade ou orgânico
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Select
                  defaultValue=""
                  options={[
                    { value: "", label: "Selecione o tipo de certificado..." },
                    { value: "organico", label: "Orgânico IBD/Ecocert" },
                    { value: "rainforest", label: "Rainforest Alliance" },
                    { value: "sustentabilidade", label: "Sustentabilidade" },
                  ]}
                  className="flex-1"
                />
                <Button
                  variant="secondary"
                  href="/produtor/documentos/novo"
                  className="gap-2 whitespace-nowrap"
                >
                  <FileText className="h-4 w-4" />
                  Anexar Arquivo
                </Button>
              </div>
            </div>

            <div className="rounded-xl border border-agronex-border bg-white p-6 shadow-sm">
              <LoteWizardActions currentSlug="certificacao" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-green-200 bg-green-50 p-4">
              <div className="flex gap-2">
                <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-agronex-green" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Por que precisamos disso?
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-agronex-muted">
                    A documentação é exigida por lei para garantir rastreabilidade
                    e conformidade na comercialização de produtos agrícolas.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-agronex-border bg-white p-5 shadow-sm">
              <h3 className="mb-4 text-sm font-semibold text-gray-900">
                Resumo do Lote
              </h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-agronex-muted">ID do Lote</dt>
                  <dd className="font-medium">{LOTE_DRAFT.id}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-agronex-muted">Produto</dt>
                  <dd className="font-medium">{LOTE_DRAFT.produto}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-agronex-muted">Volume</dt>
                  <dd className="font-medium">{LOTE_DRAFT.volume}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-agronex-muted">Status Atual</dt>
                  <dd>
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
                      {LOTE_DRAFT.status}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
