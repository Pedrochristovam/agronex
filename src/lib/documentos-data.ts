export type DocumentStatus =
  | "aprovado"
  | "pendente"
  | "em-analise"
  | "expirado"
  | "recusado";

export const documentStatusConfig: Record<
  DocumentStatus,
  { label: string; variant: "success" | "warning" | "neutral" | "danger" | "info" }
> = {
  aprovado: { label: "Aprovado", variant: "success" },
  pendente: { label: "Pendente", variant: "warning" },
  "em-analise": { label: "Em Análise", variant: "info" },
  expirado: { label: "Expirado", variant: "neutral" },
  recusado: { label: "Recusado", variant: "danger" },
};

export const documentosStats = {
  total: 142,
  pendentes: 12,
  emAnalise: 5,
  expirados: 3,
};

export const documentosList = [
  {
    id: "DOC-2023-089",
    slug: "car-fazenda-boa-vista",
    titulo: "CAR — Fazenda Boa Vista",
    tipo: "Ambiental",
    icon: "farm",
    emissao: "10 Jan 2023",
    validade: "10 Jan 2028",
    status: "aprovado" as DocumentStatus,
    certificado: false,
  },
  {
    id: "DOC-2023-112",
    slug: "gta-lote-45",
    titulo: "GTA — Lote Bovinos #45",
    tipo: "Trânsito",
    icon: "transit",
    emissao: "05 Out 2023",
    validade: "20 Out 2023",
    status: "pendente" as DocumentStatus,
    certificado: false,
  },
  {
    id: "DOC-2023-156",
    slug: "cnh-carlos",
    titulo: "CNH — Motorista Carlos M.",
    tipo: "Pessoal",
    icon: "personal",
    emissao: "15 Mar 2022",
    validade: "15 Mar 2027",
    status: "em-analise" as DocumentStatus,
    certificado: false,
  },
  {
    id: "DOC-2021-002",
    slug: "dap-2021",
    titulo: "DAP — Declaração 2021",
    tipo: "Financeiro",
    icon: "financial",
    emissao: "01 Fev 2021",
    validade: "01 Fev 2022",
    validadeExpired: true,
    status: "expirado" as DocumentStatus,
    certificado: false,
  },
  {
    id: "DOC-2023-210",
    slug: "licenca-silo",
    titulo: "Licença de Operação Silo A",
    tipo: "Operacional",
    icon: "operational",
    emissao: "20 Ago 2023",
    validade: "20 Ago 2024",
    status: "recusado" as DocumentStatus,
    certificado: false,
  },
  {
    id: "ANX-8823-901B",
    slug: "cert-rastreabilidade",
    titulo: "Certificado de Rastreabilidade e Qualidade",
    tipo: "Certificação",
    icon: "cert",
    emissao: "12 Out 2023",
    validade: "12 Out 2024",
    status: "aprovado" as DocumentStatus,
    certificado: true,
  },
];

export const certificadoDetail = {
  id: "ANX-8823-901B",
  titulo: "Certificado de Rastreabilidade e Qualidade",
  status: "Ativo",
  emissao: "12 Out 2023",
  validade: "12 Out 2024",
  produtor: "Fazenda Alvorada S.A.",
  lote: {
    produto: "Soja Grau A",
    quantidade: "500 t",
    origem: "Sorriso — MT",
    safra: "2023/2024",
    loteHref: "/produtor/leiloes/lote/8492",
  },
  historico: [
    {
      data: "Hoje, 09:41",
      evento: "Validação por leitura QR no Terminal Porto Santos",
    },
    {
      data: "12 Out 2023, 14:30",
      evento: "Emissão do documento pelo sistema de auditoria",
    },
    {
      data: "10 Out 2023, 08:15",
      evento: "Auditoria concluída — laudo técnico aprovado",
    },
  ],
};

export function getDocumentoBySlug(slug: string) {
  return documentosList.find((d) => d.slug === slug);
}

export function getCertificadoById(id: string) {
  if (id === "ANX-8823-901B" || id === "cert-rastreabilidade") {
    return certificadoDetail;
  }
  const doc = documentosList.find((d) => d.id === id || d.slug === id);
  if (!doc?.certificado) return null;
  return { ...certificadoDetail, id: doc.id, titulo: doc.titulo };
}
