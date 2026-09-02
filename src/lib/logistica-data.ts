export type LogisticaStatus =
  | "em-transito"
  | "pendente"
  | "problema"
  | "aguardando-coleta"
  | "proxima-entrega"
  | "entregue";

export const logisticaStatusConfig: Record<
  LogisticaStatus,
  { label: string; variant: "success" | "warning" | "danger" | "neutral" | "info" }
> = {
  "em-transito": { label: "Em Trânsito", variant: "success" },
  pendente: { label: "Pendente", variant: "neutral" },
  problema: { label: "Problema", variant: "danger" },
  "aguardando-coleta": { label: "Aguardando Coleta", variant: "warning" },
  "proxima-entrega": { label: "Próx. à Entrega", variant: "info" },
  entregue: { label: "Entregue", variant: "neutral" },
};

export const logisticaKpis = {
  emTransito: 24,
  emTransitoTrend: "+12% vs. mês ant.",
  aguardandoColeta: 8,
  entreguesMes: 156,
  entreguesTrend: "+5% vs. mês ant.",
  comProblemas: 2,
};

export const operacoesKpis = {
  entregasTotais: 1248,
  entregasTrend: "+12%",
  emTransito: 86,
  coletasPendentes: 34,
  ocorrencias: 3,
};

export const remessasList = [
  {
    id: "TRK-8921",
    pedido: "ORD-9021A",
    slug: "log-8492-sp",
    produto: "Soja (Grão Especial)",
    peso: "250 Toneladas",
    origem: "Faz. Boa Vista",
    destino: "Porto de Santos",
    transportadora: "AgroTransp S.A.",
    status: "em-transito" as LogisticaStatus,
    eta: "15 Out 2023",
    etaNote: "Dentro do prazo",
  },
  {
    id: "TRK-8918",
    pedido: "ORD-9015B",
    slug: "log-8918-mg",
    produto: "Milho Grão",
    peso: "180 Toneladas",
    origem: "Coop. Vale do Rio",
    destino: "Uberlândia, MG",
    transportadora: "TransGrãos Logística",
    status: "problema" as LogisticaStatus,
    eta: "14 Out 2023",
    etaNote: "Atraso (Veículo) — Revisão necessária",
  },
  {
    id: "TRK-8915",
    pedido: "ORD-9012C",
    slug: "log-8915-mg",
    produto: "Café Arábica",
    peso: "45 Toneladas",
    origem: "Sítio Alta Mogiana",
    destino: "Santos, SP",
    transportadora: "CafeLog Express",
    status: "aguardando-coleta" as LogisticaStatus,
    eta: "16 Out 2023",
    etaNote: "Coleta agendada",
  },
  {
    id: "TRK-8910",
    pedido: "ORD-9008D",
    slug: "log-8910-sp",
    produto: "Soja Exportação",
    peso: "320 Toneladas",
    origem: "Faz. Santa Luzia",
    destino: "Paranaguá, PR",
    transportadora: "AgroTransp S.A.",
    status: "proxima-entrega" as LogisticaStatus,
    eta: "15 Out 2023",
    etaNote: "Chegada em ~2h",
  },
  {
    id: "TRK-8905",
    pedido: "ORD-9005E",
    slug: "log-8905-mg",
    produto: "Milho Safra 23/24",
    peso: "200 Toneladas",
    origem: "Faz. Boa Esperança",
    destino: "Contagem, MG",
    transportadora: "MinasFrete Ltda",
    status: "entregue" as LogisticaStatus,
    eta: "10 Out 2023",
    etaNote: "Entregue confirmado",
  },
];

export const cargasAtivas = [
  {
    id: "CAR-8924",
    produto: "Soja a Granel (32t)",
    destino: "Porto de Santos",
    horario: "Hoje, 14:30",
    status: "em-transito" as LogisticaStatus,
    slug: "log-8492-sp",
  },
  {
    id: "CAR-8925",
    produto: "Fertilizante NPK (15t)",
    destino: "Fazenda Boa Esperança",
    horario: "Amanhã, 08:00",
    status: "pendente" as LogisticaStatus,
    slug: "log-8915-mg",
  },
  {
    id: "CAR-8920",
    produto: "Milho (20t) — Pneu Furado",
    destino: "BR-163, km 45",
    horario: "Atrasado",
    status: "problema" as LogisticaStatus,
    slug: "log-8918-mg",
    alert: true,
  },
  {
    id: "CAR-8927",
    produto: "Defensivos Agrícolas",
    destino: "Silo Central",
    horario: "Hoje, 17:00",
    status: "em-transito" as LogisticaStatus,
    slug: "log-8910-sp",
  },
];

export const rastreamentoDetail = {
  id: "LOG-8492-SP",
  produto: "Soja em Grãos",
  peso: "32 Toneladas",
  previsaoChegada: "Hoje, 14:30",
  status: "Em Trânsito",
  transportadora: {
    nome: "Transportadora Alpha",
    telefone: "(11) 3456-7890",
    veiculo: "Scania R500",
    placa: "ABC-1234",
    motorista: "Carlos Eduardo Santos",
    cnh: "CNH 123.456.789-00",
  },
  timeline: [
    {
      title: "Carregamento Concluído",
      date: "12 Out, 08:00",
      completed: true,
    },
    {
      title: "Passagem por Posto Fiscal",
      date: "12 Out, 11:45",
      completed: true,
    },
    {
      title: "Em Trânsito — Atualização de Localização",
      date: "10:15",
      location: "Rodovia SP-333, Km 152 — Marília, SP",
      distance: "~280 km restantes",
      current: true,
    },
    {
      title: "Chegada Prevista (Destino)",
      date: "Porto de Santos, Terminal 3 — SP",
      pending: true,
    },
  ],
};

export function getRastreamentoBySlug(slug: string) {
  const remessa = remessasList.find((r) => r.slug === slug);
  if (!remessa) return null;
  if (slug === "log-8492-sp") return { ...rastreamentoDetail, remessa };
  return {
    ...rastreamentoDetail,
    id: remessa.id,
    produto: remessa.produto,
    peso: remessa.peso,
    remessa,
  };
}
