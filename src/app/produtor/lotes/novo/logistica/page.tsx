"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeftRight,
  Calendar,
  Check,
  ClipboardList,
  Home,
  MapPin,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/Input";
import { LoteWizardStepper } from "@/components/produtor/lote/LoteWizardStepper";
import { getLoteStepHref } from "@/lib/lote-wizard";
import { Button } from "@/components/ui/Button";

const vehicleTypes = [
  { id: "toco", label: "Truck (Toco)" },
  { id: "ls", label: "Carreta LS" },
  { id: "bitrem", label: "Bitrem" },
  { id: "rodotrem", label: "Rodotrem" },
];

const requirements = [
  {
    id: "lona",
    label: "Exige lona especial",
    description: "Proteção contra umidade severa requerida",
    defaultChecked: true,
  },
  {
    id: "horario",
    label: "Restrição de horário de carga",
    description: "Apenas horário comercial (08h às 18h)",
    defaultChecked: false,
  },
  {
    id: "higienizacao",
    label: "Higienização do baú/carroceria",
    description: "Necessário certificado de limpeza pré-embarque",
    defaultChecked: false,
  },
];

export default function LoteLogisticaPage() {
  const router = useRouter();
  const [vehicle, setVehicle] = useState("toco");
  const [checks, setChecks] = useState<Record<string, boolean>>({
    lona: true,
    horario: false,
    higienizacao: false,
  });

  return (
    <div className="min-h-full bg-[#f5f6f7]">
      {/* Minimal header */}
      <div className="flex items-center justify-between border-b border-agronex-border bg-white px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-agronex-green">AGRONEX</span>
        </div>
        <Link
          href="/produtor/lotes"
          className="flex items-center gap-2 text-sm font-medium text-agronex-muted hover:text-gray-900"
        >
          CANCELAR E SAIR
          <X className="h-4 w-4" />
        </Link>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Cadastrar Novo Lote</h1>
          <p className="mt-1 text-sm text-agronex-muted">
            Configure as diretrizes de movimentação e transporte da carga
          </p>
        </div>

        <LoteWizardStepper currentStep={6} compact />

        <div className="mt-8 space-y-6 rounded-xl border border-agronex-border bg-white p-6 shadow-sm sm:p-8">
          {/* Rota */}
          <section>
            <div className="mb-4 flex items-center gap-2">
              <ArrowLeftRight className="h-5 w-5 text-agronex-green" />
              <h2 className="text-sm font-semibold text-gray-900">
                Rota de Transporte
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-agronex-green">
                  Local de Retirada
                </label>
                <div className="relative">
                  <Home className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <select className="w-full rounded-lg border border-agronex-border py-2.5 pl-10 pr-3 text-sm outline-none focus:border-agronex-green">
                    <option>Fazenda Boa Vista — Patos de Minas, MG</option>
                    <option>Fazenda Boa Esperança — Sorriso, MT</option>
                  </select>
                </div>
                <p className="mt-1 text-xs text-agronex-muted">
                  Carregado com base na etapa 3 (Origem)
                </p>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-agronex-green">
                  Destino{" "}
                  <span className="font-normal text-agronex-muted">
                    (Opcional para mercado livre)
                  </span>
                </label>
                <Input
                  icon={MapPin}
                  placeholder="Ex: Porto de Santos, SP"
                />
              </div>
            </div>
          </section>

          {/* Prazos */}
          <section>
            <div className="mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-agronex-green" />
              <h2 className="text-sm font-semibold text-gray-900">
                Prazos e Modalidade
              </h2>
            </div>
            <div className="space-y-4">
              <Input label="Data de Disponibilidade" type="date" required />
              <div>
                <label className="mb-3 block text-sm font-medium text-agronex-green">
                  Tipo de Veículo Recomendado
                </label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {vehicleTypes.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setVehicle(v.id)}
                      className={cn(
                        "relative rounded-lg border-2 px-3 py-2.5 text-xs font-medium transition-colors sm:text-sm",
                        vehicle === v.id
                          ? "border-agronex-green bg-green-50 text-agronex-green"
                          : "border-agronex-border text-gray-700 hover:border-agronex-green/50",
                      )}
                    >
                      {vehicle === v.id && (
                        <Check className="absolute right-1.5 top-1.5 h-3 w-3" />
                      )}
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Requisitos */}
          <section className="rounded-lg bg-gray-50 p-4">
            <div className="mb-4 flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-agronex-green" />
              <h2 className="text-sm font-semibold text-gray-900">
                Requisitos Logísticos Adicionais
              </h2>
            </div>
            <div className="space-y-3">
              {requirements.map((req) => (
                <label
                  key={req.id}
                  className="flex cursor-pointer items-start gap-3 rounded-lg border border-agronex-border bg-white p-3"
                >
                  <input
                    type="checkbox"
                    checked={checks[req.id]}
                    onChange={(e) =>
                      setChecks((prev) => ({
                        ...prev,
                        [req.id]: e.target.checked,
                      }))
                    }
                    className="mt-0.5 h-4 w-4 rounded border-gray-300 text-agronex-green focus:ring-agronex-green"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {req.label}
                    </p>
                    <p className="text-xs text-agronex-muted">{req.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </section>

          <div className="flex items-center justify-between border-t border-agronex-border pt-6">
            <Link
              href={getLoteStepHref("comercial")}
              className="inline-flex items-center gap-2 text-sm font-medium text-agronex-green hover:underline"
            >
              ← Voltar
            </Link>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="text-sm font-medium text-agronex-muted hover:text-gray-900"
              >
                Salvar Rascunho
              </button>
              <Button
                onClick={() => router.push(getLoteStepHref("revisao"))}
                className="gap-2"
              >
                Próximo Passo
                →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
