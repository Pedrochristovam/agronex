"use client";

import { Input, Select } from "@/components/ui/Input";
import { FileUploadZone } from "@/components/produtor/lote/FileUploadZone";
import { LoteWizardActions } from "@/components/produtor/lote/LoteWizardActions";
import { LoteWizardStepper } from "@/components/produtor/lote/LoteWizardStepper";

export default function LoteProdutoPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Cadastrar Novo Lote</h1>
          <p className="mt-1 text-sm text-agronex-muted">
            Passo 1 — Informações do Produto
          </p>
        </div>

        <LoteWizardStepper currentStep={1} />

        <div className="mt-8 rounded-xl border border-agronex-border bg-white p-6 shadow-sm sm:p-8">
          <div className="space-y-5">
            <Input
              label="Nome do Produto"
              placeholder="Ex: Soja Safra 2024"
              required
            />

            <Select
              label="Categoria"
              required
              defaultValue=""
              options={[
                { value: "", label: "Selecione a categoria..." },
                { value: "graos", label: "Grãos" },
                { value: "cafe", label: "Café" },
                { value: "algodao", label: "Algodão" },
                { value: "hortifruti", label: "Hortifruti" },
              ]}
            />

            <Input
              label="Tipo"
              placeholder="Ex: Soja em Grão"
              required
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-agronex-green">
                Descrição
              </label>
              <textarea
                rows={4}
                placeholder="Descrição detalhada do lote de produto..."
                className="w-full rounded-lg border border-agronex-border bg-white px-3 py-2.5 text-sm outline-none transition-colors focus:border-agronex-green focus:ring-2 focus:ring-agronex-green/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-agronex-green">
                Fotos do Lote
              </label>
              <FileUploadZone />
            </div>
          </div>

          <LoteWizardActions currentSlug="produto" />
        </div>
      </div>
    </div>
  );
}
