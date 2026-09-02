import {
  PrismaClient,
  RoleType,
  UserStatus,
  LotStatus,
  AuctionStatus,
  OrderStatus,
  PaymentProvider,
  PaymentStatus,
  SplitRecipientType,
  SplitPaymentStatus,
  DeliveryStatus,
  RouteStatus,
  DocumentType,
  DocumentStatus,
  CertificateStatus,
  UnitType,
  CadastralStatus,
  NotificationType,
  TrackingEventType,
} from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const PASSWORD = 'Agronex@2024';

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

async function main() {
  console.log('🌱 Iniciando seed AGRONEX...');

  await prisma.auditLog.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.rating.deleteMany();
  await prisma.reputation.deleteMany();
  await prisma.trackingEvent.deleteMany();
  await prisma.delivery.deleteMany();
  await prisma.route.deleteMany();
  await prisma.advance.deleteMany();
  await prisma.splitPayment.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.bid.deleteMany();
  await prisma.auction.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.document.deleteMany();
  await prisma.lot.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.refreshToken.deleteMany();
  await prisma.producer.deleteMany();
  await prisma.buyer.deleteMany();
  await prisma.deliveryPartner.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();
  await prisma.role.deleteMany();

  const passwordHash = await hashPassword(PASSWORD);

  const roles = await Promise.all(
    Object.values(RoleType).map((name) =>
      prisma.role.create({
        data: {
          name,
          description: `Papel ${name} no sistema AGRONEX`,
          permissions: [],
        },
      }),
    ),
  );

  const roleMap = Object.fromEntries(roles.map((r) => [r.name, r.id])) as Record<
    RoleType,
    string
  >;

  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@agronex.com.br',
      passwordHash,
      roleId: roleMap.ADMIN,
      status: UserStatus.ACTIVE,
      profile: {
        create: { fullName: 'Administrador AGRONEX' },
      },
      reputation: { create: { score: 5.0, totalRatings: 0 } },
    },
  });

  const producerUser = await prisma.user.create({
    data: {
      email: 'joao.silva@fazendaboavista.com.br',
      passwordHash,
      roleId: roleMap.PRODUCER,
      status: UserStatus.ACTIVE,
      profile: {
        create: { fullName: 'João Silva', phone: '(34) 99912-3456' },
      },
      reputation: { create: { score: 4.85, totalRatings: 127 } },
      producer: {
        create: {
          legalName: 'João Silva Agronegócios Ltda',
          tradeName: 'Fazenda Boa Vista',
          document: '12.345.678/0001-90',
          phone: '(34) 99912-3456',
          contactEmail: 'joao.silva@fazendaboavista.com.br',
          address: 'Rodovia MG-179, Km 42',
          city: 'Patos de Minas',
          state: 'MG',
          zipCode: '38700-000',
          propertyName: 'Fazenda Boa Vista',
          propertySize: 1250.5,
          propertyRegistration: 'MG-1234567',
          latitude: -18.5786,
          longitude: -46.5181,
          cadastralStatus: CadastralStatus.APPROVED,
        },
      },
    },
    include: { producer: true },
  });

  const buyerUser = await prisma.user.create({
    data: {
      email: 'compras@agrotrade.com.br',
      passwordHash,
      roleId: roleMap.BUYER,
      status: UserStatus.ACTIVE,
      profile: {
        create: { fullName: 'Maria Oliveira', phone: '(11) 98877-6655' },
      },
      reputation: { create: { score: 4.72, totalRatings: 89 } },
      buyer: {
        create: {
          companyName: 'AgroTrade Comercial Ltda',
          document: '98.765.432/0001-10',
          phone: '(11) 98877-6655',
          contactEmail: 'compras@agrotrade.com.br',
          address: 'Av. Paulista, 1000',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '01310-100',
        },
      },
    },
    include: { buyer: true },
  });

  const deliveryUser = await prisma.user.create({
    data: {
      email: 'logistica@transagro.com.br',
      passwordHash,
      roleId: roleMap.DELIVERY_PARTNER,
      status: UserStatus.ACTIVE,
      profile: {
        create: { fullName: 'Carlos Mendes', phone: '(34) 99123-4567' },
      },
      reputation: { create: { score: 4.91, totalRatings: 203 } },
      deliveryPartner: {
        create: {
          companyName: 'TransAgro Logística',
          document: '11.222.333/0001-44',
          phone: '(34) 99123-4567',
          contactEmail: 'logistica@transagro.com.br',
          licensePlate: 'ABC1D23',
          vehicleType: 'Carreta Graneleira',
          address: 'Rua dos Transportadores, 500',
          city: 'Uberaba',
          state: 'MG',
          zipCode: '38000-000',
        },
      },
    },
    include: { deliveryPartner: true },
  });

  const categoryGrains = await prisma.category.create({
    data: {
      name: 'Grãos',
      slug: 'graos',
      description: 'Soja, milho, trigo e outros grãos',
    },
  });

  const categorySoja = await prisma.category.create({
    data: {
      name: 'Soja',
      slug: 'soja',
      description: 'Soja em grão',
      parentId: categoryGrains.id,
    },
  });

  const productSoja = await prisma.product.create({
    data: {
      categoryId: categorySoja.id,
      name: 'Soja Grau A',
      description: 'Soja grau A, padrão exportação, umidade máx. 14%',
    },
  });

  const productMilho = await prisma.product.create({
    data: {
      categoryId: categoryGrains.id,
      name: 'Milho Amarelo',
      description: 'Milho amarelo tipo 1 para ração animal',
    },
  });

  const lotSoja = await prisma.lot.create({
    data: {
      productId: productSoja.id,
      producerId: producerUser.producer!.id,
      quantity: 500,
      unit: UnitType.TON,
      harvestDate: new Date('2024-03-15'),
      minimumPrice: 142.5,
      origin: 'Patos de Minas — MG',
      latitude: -18.5786,
      longitude: -46.5181,
      availabilityDate: new Date('2024-04-01'),
      status: LotStatus.IN_AUCTION,
    },
  });

  const lotMilho = await prisma.lot.create({
    data: {
      productId: productMilho.id,
      producerId: producerUser.producer!.id,
      quantity: 200,
      unit: UnitType.TON,
      harvestDate: new Date('2024-02-20'),
      minimumPrice: 98.0,
      origin: 'Patos de Minas — MG',
      latitude: -18.5786,
      longitude: -46.5181,
      availabilityDate: new Date('2024-03-15'),
      status: LotStatus.AVAILABLE,
    },
  });

  const auction = await prisma.auction.create({
    data: {
      lotId: lotSoja.id,
      startAt: new Date('2024-04-01T10:00:00Z'),
      endAt: new Date('2024-04-01T18:00:00Z'),
      minimumPrice: 142.5,
      currentPrice: 158.75,
      minimumIncrement: 0.5,
      status: AuctionStatus.CLOSED,
      winnerId: buyerUser.buyer!.id,
    },
  });

  await prisma.bid.createMany({
    data: [
      {
        auctionId: auction.id,
        bidderId: buyerUser.buyer!.id,
        amount: 145.0,
        createdAt: new Date('2024-04-01T10:15:00Z'),
      },
      {
        auctionId: auction.id,
        bidderId: buyerUser.buyer!.id,
        amount: 152.0,
        createdAt: new Date('2024-04-01T14:30:00Z'),
      },
      {
        auctionId: auction.id,
        bidderId: buyerUser.buyer!.id,
        amount: 158.75,
        createdAt: new Date('2024-04-01T17:45:00Z'),
      },
    ],
  });

  const order = await prisma.order.create({
    data: {
      buyerId: buyerUser.buyer!.id,
      producerId: producerUser.producer!.id,
      auctionId: auction.id,
      status: OrderStatus.IN_TRANSIT,
      subtotal: 79375.0,
      freight: 4500.0,
      insurance: 850.0,
      total: 84725.0,
      origin: 'Patos de Minas — MG',
      destination: 'Santos — SP',
      expectedDeliveryDate: new Date('2024-04-15'),
      deliveryInstructions: 'Entregar no Terminal Portuário, doca 7. Contato: Maria (11) 98877-6655',
      items: {
        create: {
          lotId: lotSoja.id,
          quantity: 500,
          unitPrice: 158.75,
          total: 79375.0,
        },
      },
    },
  });

  const payment = await prisma.payment.create({
    data: {
      orderId: order.id,
      provider: PaymentProvider.MANUAL,
      externalId: 'PAY-AGX-9042',
      amount: 84725.0,
      status: PaymentStatus.PAID,
      paidAt: new Date('2024-04-02T09:00:00Z'),
      splitPayments: {
        create: [
          {
            recipientType: SplitRecipientType.PRODUCER,
            recipientId: producerUser.producer!.id,
            percentage: 92.0,
            amount: 77947.0,
            status: SplitPaymentStatus.PENDING,
          },
          {
            recipientType: SplitRecipientType.PLATFORM,
            recipientId: adminUser.id,
            percentage: 5.0,
            amount: 4236.25,
            status: SplitPaymentStatus.TRANSFERRED,
            transferredAt: new Date('2024-04-02T09:05:00Z'),
          },
          {
            recipientType: SplitRecipientType.DELIVERY_PARTNER,
            recipientId: deliveryUser.deliveryPartner!.id,
            percentage: 3.0,
            amount: 2541.75,
            status: SplitPaymentStatus.PENDING,
          },
        ],
      },
    },
  });

  await prisma.advance.create({
    data: {
      producerId: producerUser.producer!.id,
      paymentId: payment.id,
      requestedAmount: 35000.0,
      status: 'APPROVED',
      processedAt: new Date('2024-04-03T11:00:00Z'),
    },
  });

  const route = await prisma.route.create({
    data: {
      origin: 'Patos de Minas — MG',
      destination: 'Santos — SP',
      distance: 680.5,
      estimatedDuration: 540,
      status: RouteStatus.ACTIVE,
    },
  });

  const delivery = await prisma.delivery.create({
    data: {
      orderId: order.id,
      deliveryPartnerId: deliveryUser.deliveryPartner!.id,
      routeId: route.id,
      vehicle: 'Carreta Graneleira ABC1D23',
      status: DeliveryStatus.IN_TRANSIT,
      pickupAt: new Date('2024-04-05T06:00:00Z'),
    },
  });

  await prisma.trackingEvent.createMany({
    data: [
      {
        deliveryId: delivery.id,
        latitude: -18.5786,
        longitude: -46.5181,
        timestamp: new Date('2024-04-05T06:30:00Z'),
        eventType: TrackingEventType.PICKUP,
      },
      {
        deliveryId: delivery.id,
        latitude: -21.1775,
        longitude: -47.8103,
        timestamp: new Date('2024-04-06T14:00:00Z'),
        eventType: TrackingEventType.CHECKPOINT,
      },
      {
        deliveryId: delivery.id,
        latitude: -23.5505,
        longitude: -46.6333,
        timestamp: new Date('2024-04-07T10:00:00Z'),
        eventType: TrackingEventType.LOCATION_UPDATE,
      },
    ],
  });

  await prisma.document.createMany({
    data: [
      {
        ownerId: producerUser.id,
        lotId: lotSoja.id,
        type: DocumentType.CAR,
        fileUrl: '/uploads/documents/car-fazenda-boa-vista.pdf',
        status: DocumentStatus.APPROVED,
        expiresAt: new Date('2028-01-10'),
        validatedAt: new Date('2024-01-15'),
      },
      {
        ownerId: producerUser.id,
        lotId: lotSoja.id,
        type: DocumentType.GTA,
        fileUrl: '/uploads/documents/gta-lote-8492.pdf',
        status: DocumentStatus.UNDER_REVIEW,
      },
      {
        ownerId: producerUser.id,
        type: DocumentType.DAP,
        fileUrl: '/uploads/documents/dap-2023.pdf',
        status: DocumentStatus.EXPIRED,
        expiresAt: new Date('2022-02-01'),
      },
    ],
  });

  await prisma.certificate.create({
    data: {
      lotId: lotSoja.id,
      publicCode: 'ANX-8823-901B',
      qrCode: 'https://agronex.com.br/validar/ANX-8823-901B',
      status: CertificateStatus.ACTIVE,
      harvestDate: new Date('2024-03-15'),
      origin: 'Patos de Minas — MG',
      certifications: ['Rastreabilidade', 'Qualidade Grau A', 'Origem Sustentável'],
      integrityHash: 'sha256:abc123def456',
    },
  });

  await prisma.rating.create({
    data: {
      orderId: order.id,
      evaluatorId: buyerUser.id,
      evaluatedId: producerUser.id,
      score: 5,
      comment: 'Produto conforme especificação, entrega dentro do prazo.',
    },
  });

  await prisma.notification.createMany({
    data: [
      {
        userId: producerUser.id,
        type: NotificationType.AUCTION,
        title: 'Leilão encerrado',
        message: 'Seu lote de Soja Grau A foi vendido por R$ 158,75/ton.',
      },
      {
        userId: buyerUser.id,
        type: NotificationType.ORDER,
        title: 'Pedido em trânsito',
        message: 'Pedido #AGX-9042 saiu de Patos de Minas em direção a Santos.',
      },
    ],
  });

  await prisma.auditLog.create({
    data: {
      userId: adminUser.id,
      action: 'SEED_COMPLETED',
      entity: 'System',
      entityId: adminUser.id,
      metadata: { version: '0.1.0', environment: 'development' },
      ip: '127.0.0.1',
      userAgent: 'agronex-seed',
    },
  });

  console.log('✅ Seed concluído com sucesso!');
  console.log('');
  console.log('Usuários de desenvolvimento (senha: Agronex@2024):');
  console.log('  Admin:        admin@agronex.com.br');
  console.log('  Produtor:     joao.silva@fazendaboavista.com.br');
  console.log('  Comprador:    compras@agrotrade.com.br');
  console.log('  Transportador: logistica@transagro.com.br');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
