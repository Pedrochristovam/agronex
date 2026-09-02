"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input, Select } from "@/components/ui/Input";
import { LoteWizardActions } from "@/components/produtor/lote/LoteWizardActions";
import { LoteWizardStepper } from "@/components/produtor/lote/LoteWizardStepper";

const characteristics = [
  { id: "organico", label: "Orgânico" },
  { id: "convencional", label: "Convencional" },
  { id: "nao-transgenico", label: "Não-Transgênico" },
];

export default function LoteQualidadePage() {
  const [selected, setSelected] = useState<string[]>(["organico", "nao-transgenico"]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Cadastrar Novo Lote</h1>
          <p className="mt-1 text-sm text-agronex-muted">
            Passo 2 — Quantidade e Qualidade
          </p>
        </div>

        <LoteWizardStepper currentStep={2} />

        <div className="mt-8 space-y-6">
          <div className="rounded-xl border border-agronex-border bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-sm font-semibold text-gray-900">
              Detalhes da Produção
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <Input
                label="Quantidade Disponível"
                type="number"
                placeholder="0,00"
                defaultValue="1200"
                required
              />
              <Select
                label="Unidade de Medida"
                defaultValue="toneladas"
                options={[
                  { value: "sacas", label: "Sacas (60kg)" },
                  { value: "toneladas", label: "Toneladas" },
                  { value: "kg", label: "Quilogramas (kg)" },
                ]}
              />
              <Input
                label="Peso Total Estimado (kg)"
                type="number"
                placeholder="0,00"
                defaultValue="1200000"
              />
              <Input
                label="Data da Colheita"
                type="date"
                required
              />
            </div>
          </div>

          <div className="rounded-xl border border-agronex-border bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-sm font-semibold text-gray-900">
              Especificações Técnicas
            </h2>
            <div className="space-y-5">
              <Input
                label="Qualidade / Variedade"
                placeholder="Ex: Tipo 1, Exportação, Padrão"
                defaultValue="BRS 1074 IPRO"
              />

              <div>
                <label className="mb-3 block text-sm font-medium text-agronex-green">
                  Características (Selecione múltiplas)
                </label>
                <div className="flex flex-wrap gap-3">
                  {characteristics.map((char) => {
                    const isSelected = selected.includes(char.id);
                    return (
                      <button
                        key={char.id}
                        type="button"
                        onClick={() => toggle(char.id)}
                        className={cn(
                          "rounded-lg border-2 px-4 py-2 text-sm font-medium transition-colors",
                          isSelected
                            ? "border-agronex-green bg-green-50 text-agronex-green"
                            : "border-agronex-border text-gray-700 hover:border-agronex-green/50",
                        )}
                      >
                        {char.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-agronex-green">
                  Informações Adicionais (Opcional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Observações sobre qualidade, armazenamento, etc."
                  className="w-full rounded-lg border border-agronex-border px-3 py-2.5 text-sm outline-none focus:border-agronex-green focus:ring-2 focus:ring-agronex-green/20"
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-agronex-border bg-white p-6 shadow-sm">
            <LoteWizardActions currentSlug="qualidade" />
          </div>
        </div>
      </div>
    </div>
  );
}
