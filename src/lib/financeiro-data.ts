export const financeiroKpis = {
  disponivel: "R$ 425.800,00",
  disponivelTrend: "+5,2% vs. mês anterior",
  escrow: "R$ 1.150.000,00",
  aReceber: "R$ 890.250,00",
  aReceberPrazo: "Próximos 30 dias",
};

export const fluxoKpis = {
  saldoDisponivel: "R$ 1.402,7k",
  entradasPrevistas: "R$ 850,0k",
  taxaMediaRetida: "3,2%",
};

export const chartData = [
  { month: "Mai", receita: 320, despesas: 180 },
  { month: "Jun", receita: 380, despesas: 200 },
  { month: "Jul", receita: 420, despesas: 220 },
  { month: "Ago", receita: 480, despesas: 250 },
  { month: "Set", receita: 520, despesas: 280 },
  { month: "Out", receita: 560, despesas: 300 },
];

export const transacoesRecentes = [
  {
    id: "tx-1",
    data: "12 Out 2023",
    descricao: "Venda Lote #8492",
    tipo: "credito" as const,
    valor: "R$ 150.000,00",
    status: "concluido" as const,
  },
  {
    id: "tx-2",
    data: "10 Out 2023",
    descricao: "Taxa Logística TransRural",
    tipo: "debito" as const,
    valor: "R$ 12.500,00",
    status: "concluido" as const,
  },
  {
    id: "tx-3",
    data: "08 Out 2023",
    descricao: "Antecipação Contrato #A-992",
    tipo: "credito" as const,
    valor: "R$ 200.000,00",
    status: "processando" as const,
  },
  {
    id: "tx-4",
    data: "05 Out 2023",
    descricao: "Comissão Corretagem",
    tipo: "debito" as const,
    valor: "R$ 8.900,00",
    status: "concluido" as const,
  },
];

export const extratoTransacoes = [
  {
    id: "TRX-9824-A",
    data: "15 Out 2023",
    descricao: "Venda Safra Soja — Lote A",
    status: "liquidado" as const,
    valorBruto: "R$ 1.450.000,00",
    valorLiquido: "R$ 1.402.700,00",
    detail: {
      titulo: "Venda Safra Soja — Lote A",
      statusLabel: "Repasse Liquidado",
      composicao: [
        { label: "Valor Bruto da Venda", value: "R$ 1.450.000,00", type: "normal" },
        { label: "Comissão Agronex (2%)", value: "- R$ 29.000,00", type: "deduction" },
        { label: "Frete/Logística", value: "- R$ 15.500,00", type: "deduction" },
        { label: "Seguro de Carga", value: "- R$ 2.800,00", type: "deduction" },
      ],
      valorLiquido: "R$ 1.402.700,00",
      documentos: ["Nota Fiscal (Danfe)", "Comprovante TED"],
    },
  },
  {
    id: "TRX-8812-B",
    data: "12 Out 2023",
    descricao: "Adiantamento Insumos",
    status: "escrow" as const,
    valorBruto: "R$ 320.000,00",
    valorLiquido: "R$ 310.400,00",
    detail: {
      titulo: "Adiantamento Insumos",
      statusLabel: "Aguardando Escrow",
      composicao: [
        { label: "Valor Bruto", value: "R$ 320.000,00", type: "normal" },
        { label: "Taxa de Processamento", value: "- R$ 9.600,00", type: "deduction" },
      ],
      valorLiquido: "R$ 310.400,00",
      documentos: ["Contrato de Adiantamento"],
    },
  },
  {
    id: "TRX-7531-C",
    data: "05 Out 2023",
    descricao: "Venda Milho Safrinha",
    status: "liquidado" as const,
    valorBruto: "R$ 850.000,00",
    valorLiquido: "R$ 824.500,00",
    detail: {
      titulo: "Venda Milho Safrinha",
      statusLabel: "Repasse Liquidado",
      composicao: [
        { label: "Valor Bruto da Venda", value: "R$ 850.000,00", type: "normal" },
        { label: "Comissão Agronex (2%)", value: "- R$ 17.000,00", type: "deduction" },
        { label: "Frete/Logística", value: "- R$ 8.500,00", type: "deduction" },
      ],
      valorLiquido: "R$ 824.500,00",
      documentos: ["Nota Fiscal (Danfe)", "Comprovante TED"],
    },
  },
];

export const faturasAntecipacao = [
  {
    id: "nf-10459",
    cliente: "Cargill Agrícola",
    nf: "10459-A",
    vencimento: "15 Out 2024",
    valor: 150000,
    valorFormatted: "R$ 150.000,00",
    defaultSelected: true,
  },
  {
    id: "nf-2201",
    cliente: "Bunge Brasil",
    nf: "2201-B",
    vencimento: "30 Nov 2024",
    valor: 320500,
    valorFormatted: "R$ 320.500,00",
    defaultSelected: true,
  },
  {
    id: "nf-8840",
    cliente: "Louis Dreyfus Co.",
    nf: "8840-C",
    vencimento: "10 Dez 2024",
    valor: 85000,
    valorFormatted: "R$ 85.000,00",
    defaultSelected: false,
  },
  {
    id: "nf-9921",
    cliente: "AgroTrade Global",
    nf: "9921-D",
    vencimento: "20 Dez 2024",
    valor: 210000,
    valorFormatted: "R$ 210.000,00",
    defaultSelected: false,
  },
];

export function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
