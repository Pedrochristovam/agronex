"use client";

import { useState } from "react";
import { Banknote } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input, Select } from "@/components/ui/Input";
import { LoteWizardActions } from "@/components/produtor/lote/LoteWizardActions";
import { LoteWizardStepper } from "@/components/produtor/lote/LoteWizardStepper";

const modalidades = [
  {
    id: "direta",
    title: "Venda Direta",
    description: "Preço fixo com base no valor mínimo",
  },
  {
    id: "leilao",
    title: "Leilão",
    description: "Lances abertos para o mercado",
  },
  {
    id: "negociacao",
    title: "Negociação Aberta",
    description: "Aceita propostas diretas de compradores",
  },
];

export default function LoteComercialPage() {
  const [modalidade, setModalidade] = useState("direta");

  return (
    <div className="p-6 lg:p-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Cadastrar Novo Lote</h1>
          <p className="mt-1 text-sm text-agronex-muted">
            Passo 5 — Comercial
          </p>
        </div>

        <LoteWizardStepper currentStep={5} />

        <div className="mt-8 space-y-6">
          <div className="relative rounded-xl border border-agronex-border bg-white p-6 shadow-sm">
            <Banknote className="absolute right-6 top-6 h-8 w-8 text-gray-100" />
            <h2 className="mb-5 text-sm font-semibold text-gray-900">
              Precificação Base
            </h2>
            <Input
              label="Preço Mínimo (R$)"
              placeholder="R$ 0,00"
              defaultValue="R$ 185,00"
              helperText="Valor mínimo aceitável para abertura de negociações"
              required
            />
          </div>

          <div className="rounded-xl border border-agronex-border bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-sm font-semibold text-gray-900">
              Termos Comerciais
            </h2>
            <Select
              label="Condições de Pagamento"
              required
              defaultValue=""
              options={[
                { value: "", label: "Selecione uma condição" },
                { value: "a-vista", label: "À vista (escrow)" },
                { value: "30-dias", label: "30 dias após entrega" },
                { value: "50-50", label: "50% antecipado + 50% na entrega" },
                { value: "parcelado", label: "Parcelado conforme contrato" },
              ]}
            />
          </div>

          <div className="rounded-xl border border-agronex-border bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-sm font-semibold text-gray-900">
              Modalidade de Venda
            </h2>
            <div className="space-y-3">
              {modalidades.map((mod) => (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => setModalidade(mod.id)}
                  className={cn(
                    "w-full rounded-xl border-2 p-4 text-left transition-colors",
                    modalidade === mod.id
                      ? "border-agronex-green bg-green-50"
                      : "border-agronex-border hover:border-agronex-green/50",
                  )}
                >
                  <p className="font-semibold text-gray-900">{mod.title}</p>
                  <p className="mt-1 text-sm text-agronex-muted">
                    {mod.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-agronex-border bg-white p-6 shadow-sm">
            <LoteWizardActions currentSlug="comercial" />
          </div>
        </div>
      </div>
    </div>
  );
}
