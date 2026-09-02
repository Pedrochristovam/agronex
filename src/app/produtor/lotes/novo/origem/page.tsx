"use client";

import { MapPin, Tractor } from "lucide-react";
import { Input, Select } from "@/components/ui/Input";
import { LoteWizardActions } from "@/components/produtor/lote/LoteWizardActions";
import { LoteWizardStepper } from "@/components/produtor/lote/LoteWizardStepper";

export default function LoteOrigemPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Cadastrar Novo Lote</h1>
          <p className="mt-1 text-sm text-agronex-muted">
            Complete os detalhes de origem para registrar este lote no sistema
          </p>
        </div>

        <LoteWizardStepper currentStep={3} />

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="relative rounded-xl border border-agronex-border bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="mb-5 text-sm font-semibold text-gray-900">
              Localização da Propriedade
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <Select
                label="Estado"
                defaultValue="mg"
                options={[
                  { value: "mg", label: "Minas Gerais" },
                  { value: "mt", label: "Mato Grosso" },
                  { value: "go", label: "Goiás" },
                  { value: "sp", label: "São Paulo" },
                ]}
              />
              <Select
                label="Município"
                defaultValue="patos-de-minas"
                options={[
                  { value: "patos-de-minas", label: "Patos de Minas" },
                  { value: "uberaba", label: "Uberaba" },
                  { value: "uberlandia", label: "Uberlândia" },
                  { value: "sorriso", label: "Sorriso" },
                ]}
              />
              <Input
                label="Nome da Propriedade"
                defaultValue="Fazenda Boa Vista"
                className="sm:col-span-2"
                required
              />
              <Input
                label="Endereço / Coordenadas"
                icon={MapPin}
                defaultValue="-18.5796, -46.5186"
                className="sm:col-span-2"
              />
            </div>

            <Tractor className="absolute bottom-6 right-6 h-16 w-16 text-gray-100" />
          </div>

          <div className="space-y-5">
            <div className="rounded-xl border border-agronex-border bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-sm font-semibold text-gray-900">
                Dados de Registro
              </h2>
              <div className="space-y-4">
                <Input
                  label="CAR (Cadastro Ambiental Rural)"
                  defaultValue="MG-0000000-0000..."
                  helperText="Obrigatório para certificação de sustentabilidade"
                  required
                />
                <Input
                  label="Matrícula da Propriedade"
                  placeholder="Número da matrícula"
                />
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-agronex-border bg-white shadow-sm">
              <div
                className="relative h-40 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80')",
                }}
              >
                <span className="absolute bottom-2 left-2 rounded bg-white/90 px-2 py-1 text-xs font-medium text-gray-700">
                  Região Selecionada
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-agronex-border bg-white p-6 shadow-sm">
          <LoteWizardActions currentSlug="origem" />
        </div>
      </div>
    </div>
  );
}
