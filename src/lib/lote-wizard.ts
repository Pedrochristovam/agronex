export const LOTE_WIZARD_STEPS = [
  { number: 1, label: "Produto", slug: "produto" },
  { number: 2, label: "Qualidade", slug: "qualidade" },
  { number: 3, label: "Origem", slug: "origem" },
  { number: 4, label: "Certificação", slug: "certificacao" },
  { number: 5, label: "Comercial", slug: "comercial" },
  { number: 6, label: "Logística", slug: "logistica" },
  { number: 7, label: "Revisão", slug: "revisao" },
] as const;

export type LoteWizardSlug = (typeof LOTE_WIZARD_STEPS)[number]["slug"];

export function getLoteStepHref(slug: LoteWizardSlug) {
  return `/produtor/lotes/novo/${slug}`;
}

export function getNextStepSlug(current: LoteWizardSlug): LoteWizardSlug | null {
  const index = LOTE_WIZARD_STEPS.findIndex((s) => s.slug === current);
  return index < LOTE_WIZARD_STEPS.length - 1
    ? LOTE_WIZARD_STEPS[index + 1].slug
    : null;
}

export function getPrevStepSlug(current: LoteWizardSlug): LoteWizardSlug | null {
  const index = LOTE_WIZARD_STEPS.findIndex((s) => s.slug === current);
  return index > 0 ? LOTE_WIZARD_STEPS[index - 1].slug : null;
}

export const LOTE_DRAFT = {
  id: "ACX-2024-8492",
  produto: "Soja em Grãos",
  volume: "1.200 Toneladas",
  status: "Rascunho",
  variedade: "BRS 1074 IPRO",
  safra: "2023/2024",
  volumeRevisao: "5.200 Toneladas",
  umidade: "12,5% (Padrão)",
  impurezas: "1,2%",
  propriedade: "Fazenda Boa Esperança",
  municipio: "Sorriso - MT",
  coordenadas: "-12.5432, -55.7654",
};
