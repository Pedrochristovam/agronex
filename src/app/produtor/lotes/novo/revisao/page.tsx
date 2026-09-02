"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Send } from "lucide-react";
import { LoteWizardProgressSidebar } from "@/components/produtor/lote/LoteWizardStepper";
import { LOTE_DRAFT, getLoteStepHref } from "@/lib/lote-wizard";
import { Button } from "@/components/ui/Button";

const reviewSections = [
  {
    title: "Produto e Cultura",
    items: [
      { label: "Tipo", value: "Soja Convencional" },
      { label: "Variedade", value: LOTE_DRAFT.variedade },
      { label: "Safra", value: LOTE_DRAFT.safra },
    ],
  },
  {
    title: "Quantidade e Qualidade",
    items: [
      { label: "Volume Total Estimado", value: LOTE_DRAFT.volumeRevisao },
      { label: "Umidade Média", value: LOTE_DRAFT.umidade },
      { label: "Impurezas", value: LOTE_DRAFT.impurezas },
    ],
  },
  {
    title: "Origem e Rastreabilidade",
    items: [
      { label: "Propriedade", value: LOTE_DRAFT.propriedade },
      { label: "Município/UF", value: LOTE_DRAFT.municipio },
      { label: "Coordenadas (Talhão Central)", value: LOTE_DRAFT.coordenadas },
    ],
    hasMap: true,
  },
];

export default function LoteRevisaoPage() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="min-h-full bg-[#f5f6f7]">
      {/* Custom header */}
      <div className="flex items-center justify-between border-b border-agronex-border bg-white px-6 py-4">
        <Link
          href="/produtor/visao-geral"
          className="inline-flex items-center gap-2 text-sm font-medium text-agronex-green hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para Dashboard
        </Link>
        <span className="text-lg font-bold text-agronex-green">AGRONEX</span>
        <div className="text-right text-sm">
          <p className="font-medium text-gray-900">Nova Submissão</p>
          <p className="text-agronex-muted">Lote #{LOTE_DRAFT.id}</p>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-8 p-6 lg:flex-row lg:p-8">
        <LoteWizardProgressSidebar currentStep={7} />

        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Revisar Informações do Lote
            </h1>
            <p className="mt-1 text-sm text-agronex-muted">
              Verifique os dados abaixo antes de publicar. Todas as informações
              serão utilizadas para rastreabilidade na plataforma.
            </p>
          </div>

          <div className="space-y-4">
            {reviewSections.map((section) => (
              <div
                key={section.title}
                className="rounded-xl border border-agronex-border bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="mb-4 text-sm font-semibold text-gray-900">
                      {section.title}
                    </h2>
                    <dl className="space-y-2">
                      {section.items.map((item) => (
                        <div key={item.label} className="flex gap-4 text-sm">
                          <dt className="w-44 flex-shrink-0 text-agronex-muted">
                            {item.label}
                          </dt>
                          <dd className="font-medium text-gray-900">
                            {item.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  {section.hasMap && (
                    <div
                      className="hidden h-24 w-32 flex-shrink-0 rounded-lg bg-cover bg-center sm:block"
                      style={{
                        backgroundImage:
                          "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=300&q=80')",
                      }}
                    >
                      <div className="flex h-full items-center justify-center">
                        <MapPin className="h-6 w-6 text-agronex-green drop-shadow" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div className="rounded-xl border border-agronex-border bg-white p-5 shadow-sm">
              <h2 className="mb-3 text-sm font-semibold text-gray-900">
                Declaração de Veracidade
              </h2>
              <p className="mb-4 text-xs leading-relaxed text-agronex-muted">
                Declaro, sob as penas da lei, que todas as informações
                fornecidas neste cadastro são verdadeiras e correspondem à
                realidade da produção agrícola registrada.
              </p>
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 text-agronex-green focus:ring-agronex-green"
                />
                <span className="text-sm text-gray-700">
                  Li e concordo com os{" "}
                  <Link href="#" className="font-medium text-agronex-green hover:underline">
                    Termos de Responsabilidade
                  </Link>{" "}
                  e{" "}
                  <Link href="#" className="font-medium text-agronex-green hover:underline">
                    Políticas de Sustentabilidade
                  </Link>{" "}
                  da Plataforma
                </span>
              </label>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <Link
              href={getLoteStepHref("logistica")}
              className="inline-flex items-center gap-2 text-sm font-medium text-agronex-green hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Link>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="text-sm font-medium text-agronex-muted hover:text-gray-900"
              >
                Salvar Rascunho
              </button>
              <Button
                disabled={!agreed}
                onClick={() => router.push("/produtor/lotes")}
                className="gap-2"
              >
                Publicar Lote
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
