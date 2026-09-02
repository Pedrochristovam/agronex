export type OrderStatus =
  | "em-transito"
  | "aguardando-pagamento"
  | "concluido"
  | "em-garantia";

export const orderStatusConfig: Record<
  OrderStatus,
  { label: string; variant: "success" | "warning" | "neutral" | "info" }
> = {
  "em-transito": { label: "Em Trânsito", variant: "success" },
  "aguardando-pagamento": { label: "Aguardando Pagamento", variant: "warning" },
  concluido: { label: "Concluído", variant: "neutral" },
  "em-garantia": { label: "Em Garantia (Escrow)", variant: "info" },
};

export const pedidosStats = {
  total: 1248,
  emTransito: 42,
  aguardandoPagamento: 15,
};

export const pedidosList = [
  {
    id: "ORD-9021A",
    slug: "agx-9042",
    produto: "Soja em Grãos — Tipo 1",
    lote: "L-442",
    icon: "soja",
    data: "12 Out, 2023",
    comprador: "Cargill Agrícola S.A.",
    valor: "R$ 245.000,00",
    status: "em-transito" as OrderStatus,
  },
  {
    id: "ORD-9018B",
    slug: "agx-9038",
    produto: "Milho Grão — Padrão",
    lote: "L-438",
    icon: "milho",
    data: "10 Out, 2023",
    comprador: "Bunge Alimentos Ltda",
    valor: "R$ 180.500,00",
    status: "aguardando-pagamento" as OrderStatus,
  },
  {
    id: "ORD-9015C",
    slug: "agx-9035",
    produto: "Café Arábica — Bebida Dura",
    lote: "L-430",
    icon: "cafe",
    data: "08 Out, 2023",
    comprador: "Exportadora Sul Real",
    valor: "R$ 420.000,00",
    status: "concluido" as OrderStatus,
  },
  {
    id: "ORD-9012D",
    slug: "agx-9030",
    produto: "Soja em Grãos — Exportação",
    lote: "L-425",
    icon: "soja",
    data: "05 Out, 2023",
    comprador: "AgroTrade Global Exports SA",
    valor: "R$ 692.500,00",
    status: "em-garantia" as OrderStatus,
  },
  {
    id: "ORD-9009E",
    slug: "agx-9025",
    produto: "Milho Grão — Safra 23/24",
    lote: "L-420",
    icon: "milho",
    data: "02 Out, 2023",
    comprador: "Moinhos de Minas Ltda",
    valor: "R$ 150.000,00",
    status: "em-transito" as OrderStatus,
  },
];

export const pedidoDetail = {
  id: "AGX-9042",
  displayId: "#AGX-9042",
  status: "IN_TRANSIT" as const,
  statusLabel: "Em Trânsito",
  lote: {
    produto: "Soja Tipo 1 Exportação",
    quantidade: "5.000 Sacas",
    valorUnitario: "R$ 135,00",
    totalBruto: "R$ 675.000,00",
  },
  financeiro: {
    pagamento: "Transferência Bancária (TED)",
    escrowStatus: "Retido p/ Liberação",
  },
  partes: {
    produtor: {
      nome: "Fazenda Santa Luzia",
      documento: "CNPJ 12.345.678/0001-90",
      endereco: "Rod. BR-163, Km 45 — Sorriso, MT",
    },
    comprador: {
      nome: "Agro Trading S.A.",
      documento: "CNPJ 98.765.432/0001-10",
      endereco: "Av. Portuária, 1200 — Paranaguá, PR",
    },
  },
  logistica: {
    transportadora: "TransGrãos Logística Ltda",
    motorista: "Carlos Silva — CNH 12345678900",
    veiculo: "ABC-1234 — Bi-trem",
    previsaoEntrega: "24/10/2023",
  },
  steps: [
    { id: "criado", label: "Criado", completed: true },
    { id: "pagamento", label: "Pagamento", completed: true },
    { id: "retirada", label: "Retirada", completed: true },
    { id: "transporte", label: "Transporte", current: true },
    { id: "entrega", label: "Entrega", completed: false },
  ],
  documentos: [
    { nome: "NF-e 001.234", tipo: "pdf", tamanho: "142 KB", disponivel: true },
    { nome: "GTA", tipo: "doc", tamanho: "89 KB", disponivel: true },
    {
      nome: "Laudo Classificação",
      tipo: "chart",
      tamanho: "210 KB",
      disponivel: true,
    },
    {
      nome: "Comprovante Entrega",
      tipo: "pending",
      tamanho: "",
      disponivel: false,
    },
  ],
};

export function getPedidoBySlug(slug: string) {
  const item = pedidosList.find((p) => p.slug === slug);
  if (!item) return null;
  if (slug === "agx-9042") return { ...pedidoDetail, listItem: item };
  return {
    ...pedidoDetail,
    id: slug.toUpperCase().replace("-", "-"),
    displayId: `#${slug.toUpperCase()}`,
    listItem: item,
    lote: {
      ...pedidoDetail.lote,
      produto: item.produto,
    },
  };
}
