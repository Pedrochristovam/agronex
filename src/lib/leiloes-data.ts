export const auctionCards = [
  {
    id: "4928",
    certame: "LEILÃO DE COMMODITIES 003 DE 2024",
    title: "Soja Safra 2024 — Grau A",
    category: "Soja",
    location: "Patos de Minas, MG — Fazenda Boa Vista",
    origin: "Fazenda Boa Vista",
    volume: "500 toneladas",
    minBid: "R$ 1.400.000,00",
    currentBid: "R$ 1.450.000,00",
    pricePerUnit: "R$ 2.900,00 / ton",
    bidCount: 24,
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80",
    ],
    timer: "00:59:12",
    closingDate: "02/09/2026 - 16:30:00",
    description:
      "Lote de soja grau A, safra 2024, padrão exportação. Umidade máx. 14%, impurezas 1%. Armazenado em silo climatizado com laudo SGS. Origem rastreável certificada Agronex.",
    tags: ["Rastreável", "Padrão Exportação"],
    live: true,
    status: "ABERTO" as const,
    itemNumber: "Item 1",
  },
  {
    id: "4931",
    certame: "LEILÃO DE COMMODITIES 004 DE 2024",
    title: "Milho Grão — Safra 23/24",
    category: "Milho",
    location: "Uberaba, MG — Cooperativa Vale do Rio",
    origin: "Cooperativa Vale do Rio",
    volume: "800 toneladas",
    minBid: "R$ 850.000,00",
    currentBid: "R$ 892.000,00",
    pricePerUnit: "R$ 1.115,00 / ton",
    bidCount: 18,
    image:
      "https://images.unsplash.com/photo-1551752495-afd0c097a066?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1551752495-afd0c097a066?w=800&q=80",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    ],
    timer: "02:14:35",
    closingDate: "02/09/2026 - 18:00:00",
    description:
      "Milho amarelo tipo 1, safra 23/24, origem cooperativa certificada. Ideal para ração animal e exportação. Entrega FOB na unidade de Uberaba com laudo de classificação.",
    tags: ["Convencional", "Rastreável"],
    live: true,
    status: "ABERTO" as const,
    itemNumber: "Item 1",
  },
  {
    id: "4935",
    certame: "LEILÃO DE COMMODITIES 005 DE 2024",
    title: "Café Arábica Bebida Dura",
    category: "Café",
    location: "Patrocínio, MG — Sítio Alta Mogiana",
    origin: "Sítio Alta Mogiana",
    volume: "300 sacas",
    minBid: "R$ 270.000,00",
    currentBid: "R$ 285.000,00",
    pricePerUnit: "R$ 950,00 / sc",
    bidCount: 11,
    image:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55a?w=800&q=80",
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80",
    ],
    timer: "04:32:08",
    closingDate: "03/09/2026 - 10:00:00",
    description:
      "Café arábica bebida dura, pontuação 82+, certificação orgânica IBD. Secagem em terreiro suspenso. Lote premiado na região da Alta Mogiana, pronto para exportação especial.",
    tags: ["Certificado", "Orgânico"],
    live: true,
    status: "ABERTO" as const,
    itemNumber: "Item 1",
  },
];

export const liveAuction = {
  id: "4928",
  title: "Lote #4928 — Soja Premium",
  variety: "BRS 8381",
  volume: "500 Toneladas",
  humidity: "14%",
  impurity: "1%",
  origin: "Fazenda Alvorada — Sorriso, MT",
  pickup: "Retirada 15 dias",
  timeRemaining: "10:32",
  currentBid: 1450000,
  minIncrement: 500,
  bidCount: 24,
  userOutbid: true,
  userLastBid: 1445000,
  suggestedBid: 1450500,
  image:
    "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80",
  history: [
    { time: "Agora", bidder: "Investidor_MT", amount: 1450000, isLeader: true },
    { time: "13:43:10", bidder: "Você (YOU)", amount: 1445000, isYou: true },
    { time: "13:42:05", bidder: "Agro_Sul_BR", amount: 1440000 },
    { time: "13:38:22", bidder: "Investidor_MT", amount: 1420000 },
    { time: "13:33:10", bidder: "Cerealista_Central", amount: 1400000 },
  ],
};

export const closedAuction = {
  id: "8492",
  title: "Lote #8492 — Soja Premium",
  closedAt: "15 Out 2023, 14:30",
  description:
    "Lote de 5.000 sacas (300 ton) de soja transgênica, padrão exportação, armazenada no Silo 4 — Unidade Rio Verde.",
  winningBid: "R$ 138,50 /saca",
  totalValue: "R$ 692.500,00",
  winner: {
    company: "AgroTrade Global Exports SA",
    cnpj: "12.345.678/0001-90",
    contact: "Roberto Almeida",
    email: "roberto@agrotrade.com.br",
    phone: "(11) 98765-4321",
    destination: "Porto de Santos — Terminal 3",
    incoterm: "FOB",
  },
  bidHistory: [
    {
      time: "14:29:45",
      bidder: "AgroTrade Global",
      amount: "R$ 138,50 /sc",
      winner: true,
    },
    {
      time: "14:28:12",
      bidder: "Cargill S.A.",
      amount: "R$ 138,00 /sc",
    },
    {
      time: "14:25:30",
      bidder: "Bunge Alimentos",
      amount: "R$ 137,50 /sc",
    },
    {
      time: "14:20:05",
      bidder: "AgroTrade Global",
      amount: "R$ 137,00 /sc",
    },
  ],
  totalBids: 18,
  participants: 4,
  specs: {
    umidade: "13,5%",
    impureza: "0,8%",
    avariados: "4,2%",
    verdes: "5,0%",
  },
};

export const painelLeiloes = {
  kpis: [
    {
      label: "Taxa de Sucesso",
      value: "68,4%",
      trend: "+ 0,2% vs. mês anterior",
      positive: true,
    },
    {
      label: "Volume Negociado",
      value: "R$ 1,2M",
      trend: "+ 12,5% vs. mês anterior",
      positive: true,
    },
    {
      label: "Lances Ativos",
      value: "14",
      detail: "Ganhando: 9 • Superado: 5",
    },
  ],
  activeBids: [
    {
      id: "84500",
      product: "Soja Tipo 1 — Safra 23/24",
      lot: "Lote #84500 — 500 Toneladas",
      icon: "soja",
      endDate: "Hoje, 14:20",
      endHint: "Faltam 2h",
      endHintDanger: true,
      yourBid: "R$ 135,00 / sc",
      status: "Ganhando",
      statusVariant: "success" as const,
      action: "view",
      href: "/produtor/leiloes/lote/4928",
    },
    {
      id: "84515",
      product: "Milho Grão — Padrão Exportação",
      lot: "Lote #84515 — 1.000 Toneladas",
      icon: "milho",
      endDate: "Amanhã, 10:00",
      yourBid: "R$ 62,50 / sc",
      currentBid: "Lance atual: R$ 63,00",
      status: "Superado",
      statusVariant: "danger" as const,
      action: "cover",
      href: "/produtor/leiloes/lote/4928",
      liveHref: "/produtor/leiloes/4928",
    },
    {
      id: "84350",
      product: "Café Arábica Bebida Dura",
      lot: "Lote #84350 — 300 Sacas",
      icon: "cafe",
      endDate: "12 Out 2023",
      yourBid: "R$ 950,00 / sc",
      status: "Pendente Logística",
      statusVariant: "neutral" as const,
      action: "logistics",
      href: "/produtor/leiloes/lote/8492",
    },
  ],
};

export function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

export const lotDetails: Record<
  string,
  {
    id: string;
    title: string;
    status: string;
    currentBid: string;
    timer: string;
    quantity: string;
    harvestDate: string;
    logistics: string;
    certification: string;
    humidityImpurity: string;
    liveAuctionId: string;
    images: {
      main: string;
      thumbs: string[];
    };
    timeline: { date: string; event: string }[];
    producer: {
      name: string;
      rating: number;
      transactions: number;
      verified: boolean;
    };
    location: {
      farm: string;
      place: string;
      mapImage: string;
    };
  }
> = {
  "8492": {
    id: "8492",
    title: "Soja Premium Tipo 1 — Safra 2023/24",
    status: "Em Leilão",
    currentBid: "R$ 138,50 / sc",
    timer: "04:12:39",
    quantity: "5.200 Ton",
    harvestDate: "15/05/23",
    logistics: "Bitrem 9 Eixos",
    certification: "RenovaBio & Orgânico",
    humidityImpurity: "12,5% / 1,2%",
    liveAuctionId: "4928",
    images: {
      main: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=900&q=80",
      thumbs: [
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=200&q=80",
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=200&q=80",
      ],
    },
    timeline: [
      {
        date: "15/05/2023",
        event: "Colheita Finalizada — Fazenda Boa Esperança",
      },
      {
        date: "18/05/2023",
        event: "Classificação e Emissão de Laudo",
      },
    ],
    producer: {
      name: "Ricardo Alvez",
      rating: 4.9,
      transactions: 124,
      verified: true,
    },
    location: {
      farm: "Fazenda Boa Esperança",
      place: "Sorriso, MT — Brasil",
      mapImage:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80",
    },
  },
  "4928": {
    id: "4928",
    title: "Soja Safra 2024",
    status: "Em Leilão",
    currentBid: "R$ 2.900,00 / t",
    timer: "00:59:12",
    quantity: "500 Ton",
    harvestDate: "20/03/24",
    logistics: "Truck (Toco)",
    certification: "Rastreável",
    humidityImpurity: "14% / 1%",
    liveAuctionId: "4928",
    images: {
      main: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=900&q=80",
      thumbs: [
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=200&q=80",
        "https://images.unsplash.com/photo-1551752495-afd0c097a066?w=200&q=80",
      ],
    },
    timeline: [
      { date: "20/03/2024", event: "Colheita Finalizada — Fazenda Boa Vista" },
      { date: "22/03/2024", event: "Classificação e Emissão de Laudo" },
    ],
    producer: {
      name: "João da Silva",
      rating: 4.7,
      transactions: 89,
      verified: true,
    },
    location: {
      farm: "Fazenda Boa Vista",
      place: "Patos de Minas, MG — Brasil",
      mapImage:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80",
    },
  },
  "4931": {
    id: "4931",
    title: "Milho Grão — Safra 23/24",
    status: "Em Leilão",
    currentBid: "R$ 111,50 / sc",
    timer: "02:14:35",
    quantity: "800 Ton",
    harvestDate: "10/04/24",
    logistics: "Carreta LS",
    certification: "Convencional",
    humidityImpurity: "13% / 0,9%",
    liveAuctionId: "4928",
    images: {
      main: "https://images.unsplash.com/photo-1551752495-afd0c097a066?w=900&q=80",
      thumbs: [
        "https://images.unsplash.com/photo-1551752495-afd0c097a066?w=200&q=80",
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=200&q=80",
      ],
    },
    timeline: [
      {
        date: "10/04/2024",
        event: "Colheita Finalizada — Cooperativa Vale do Rio",
      },
      { date: "12/04/2024", event: "Classificação e Emissão de Laudo" },
    ],
    producer: {
      name: "Maria Oliveira",
      rating: 4.8,
      transactions: 67,
      verified: true,
    },
    location: {
      farm: "Cooperativa Vale do Rio",
      place: "Uberaba, MG — Brasil",
      mapImage:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80",
    },
  },
  "4935": {
    id: "4935",
    title: "Café Arábica Bebida Dura",
    status: "Em Leilão",
    currentBid: "R$ 950,00 / sc",
    timer: "04:32:08",
    quantity: "300 sc",
    harvestDate: "05/08/23",
    logistics: "Truck (Toco)",
    certification: "Orgânico",
    humidityImpurity: "11% / 0,5%",
    liveAuctionId: "4928",
    images: {
      main: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=900&q=80",
      thumbs: [
        "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=200&q=80",
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=200&q=80",
      ],
    },
    timeline: [
      {
        date: "05/08/2023",
        event: "Colheita Finalizada — Sítio Alta Mogiana",
      },
      { date: "08/08/2023", event: "Classificação e Emissão de Laudo" },
    ],
    producer: {
      name: "Carlos Mendes",
      rating: 5.0,
      transactions: 42,
      verified: true,
    },
    location: {
      farm: "Sítio Alta Mogiana",
      place: "Patrocínio, MG — Brasil",
      mapImage:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80",
    },
  },
};
