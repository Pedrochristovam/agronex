import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Award,
  BadgeCheck,
  ChevronRight,
  Clock,
  Droplets,
  FileText,
  Gavel,
  Leaf,
  MapPin,
  Shield,
  Star,
  Truck,
} from "lucide-react";
import { lotDetails } from "@/lib/leiloes-data";

interface LoteDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function LoteDetailPage({ params }: LoteDetailPageProps) {
  const { id } = await params;
  const lote = lotDetails[id];

  if (!lote) {
    notFound();
  }

  return (
    <div className="min-h-full bg-[#f0f2f0] p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-agronex-muted">
          <Link href="/produtor/leiloes" className="hover:text-agronex-green">
            Leilões
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-mono text-xs text-agronex-green">
            LOTE #{lote.id}
          </span>
          <ChevronRight className="h-3 w-3" />
          <span className="font-medium text-gray-900">{lote.title}</span>
        </nav>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-5 lg:col-span-2">
            {/* Galeria */}
            <div className="overflow-hidden rounded-2xl border border-agronex-border bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
              <div className="flex items-start justify-between border-b border-agronex-border px-6 py-4">
                <div>
                  <p className="font-mono text-xs font-bold tracking-wider text-agronex-green">
                    CERTAME — LOTE #{lote.id}
                  </p>
                  <h1 className="mt-1 text-xl font-bold text-gray-900 lg:text-2xl">
                    {lote.title}
                  </h1>
                </div>
                <span className="flex items-center gap-1.5 rounded-full bg-agronex-green px-3 py-1.5 text-xs font-bold text-white shadow-md">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-agronex-accent" />
                  {lote.status}
                </span>
              </div>

              <div className="relative m-5 overflow-hidden rounded-xl">
                <div className="relative h-72 sm:h-96">
                  <Image
                    src={lote.images.main}
                    alt={lote.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <div className="absolute bottom-4 right-4 flex gap-2">
                  {lote.images.thumbs.map((thumb, i) => (
                    <div
                      key={i}
                      className={`relative h-16 w-16 overflow-hidden rounded-xl border-2 shadow-lg transition-transform hover:scale-105 ${
                        i === 0 ? "border-agronex-accent" : "border-white/80"
                      }`}
                    >
                      <Image
                        src={thumb}
                        alt={`Miniatura ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Qualidade */}
            <div className="rounded-2xl border border-agronex-border bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-2">
                <Award className="h-5 w-5 text-agronex-accent" />
                <h2 className="font-semibold text-gray-900">
                  Qualidade e Rastreabilidade
                </h2>
              </div>

              <div className="mb-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-agronex-border bg-gradient-to-br from-[#f8faf8] to-white p-4">
                  <div className="mb-2 flex items-center gap-2 text-agronex-green">
                    <Leaf className="h-4 w-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      Certificação
                    </span>
                  </div>
                  <p className="text-sm font-bold text-gray-900">
                    {lote.certification}
                  </p>
                </div>
                <div className="rounded-xl border border-agronex-border bg-gradient-to-br from-[#f8faf8] to-white p-4">
                  <div className="mb-2 flex items-center gap-2 text-agronex-green">
                    <Droplets className="h-4 w-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      Umidade / Impurezas
                    </span>
                  </div>
                  <p className="text-sm font-bold text-gray-900">
                    {lote.humidityImpurity}
                  </p>
                </div>
              </div>

              <div className="space-y-5 border-l-2 border-agronex-accent/40 pl-5">
                {lote.timeline.map((item, i) => (
                  <div key={i} className="relative">
                    <span className="absolute -left-[26px] flex h-4 w-4 items-center justify-center rounded-full bg-agronex-accent ring-4 ring-white">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                    <p className="text-xs font-semibold text-agronex-muted">
                      {item.date}
                    </p>
                    <p className="text-sm text-gray-900">{item.event}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-2 rounded-xl border border-agronex-border bg-gray-50 px-4 py-3 text-sm">
                <FileText className="h-4 w-4 text-agronex-green" />
                <span className="text-gray-700">
                  Laudo de classificação disponível
                </span>
                <Link
                  href="#"
                  className="ml-auto text-xs font-bold text-agronex-green hover:underline"
                >
                  Ver PDF
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Painel de lance */}
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <div className="bg-gradient-to-br from-agronex-green-dark to-agronex-green p-5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                  Maior Lance Atual
                </p>
                <p className="mt-2 text-3xl font-bold text-white">
                  {lote.currentBid}
                </p>
              </div>
              <div className="flex items-center gap-2 border-x border-agronex-border bg-agronex-green-dark px-5 py-3">
                <Clock className="h-4 w-4 text-agronex-accent" />
                <span className="text-sm text-white/80">
                  Encerra em:{" "}
                  <span className="font-mono font-bold text-agronex-accent">
                    {lote.timer}
                  </span>
                </span>
              </div>
              <Link
                href={`/produtor/leiloes/${lote.liveAuctionId}`}
                className="flex items-center justify-center gap-2 bg-agronex-accent py-4 text-sm font-bold text-agronex-green-dark transition-all hover:bg-green-300"
              >
                <Gavel className="h-4 w-4" />
                Entrar no Pregão Ao Vivo
              </Link>
            </div>

            {/* Specs */}
            <div className="rounded-2xl border border-agronex-border bg-white p-5 shadow-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-gray-50 p-3 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-agronex-muted">
                    Quantidade
                  </p>
                  <p className="mt-1 text-lg font-bold text-gray-900">
                    {lote.quantity}
                  </p>
                </div>
                <div className="rounded-xl bg-gray-50 p-3 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-agronex-muted">
                    Colheita
                  </p>
                  <p className="mt-1 text-lg font-bold text-gray-900">
                    {lote.harvestDate}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3 border-t border-agronex-border pt-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-agronex-green/10">
                  <Truck className="h-4 w-4 text-agronex-green" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-agronex-muted">
                    Logística
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {lote.logistics}
                  </p>
                </div>
              </div>
            </div>

            {/* Produtor */}
            <div className="rounded-2xl border border-agronex-border bg-white p-5 shadow-sm">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-agronex-muted">
                Produtor Verificado
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-agronex-green to-agronex-green-dark text-sm font-bold text-white shadow-md">
                  {lote.producer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-semibold text-gray-900">
                      {lote.producer.name}
                    </p>
                    {lote.producer.verified && (
                      <BadgeCheck className="h-4 w-4 text-blue-500" />
                    )}
                  </div>
                  <p className="flex items-center gap-1 text-xs text-agronex-muted">
                    <Star className="h-3 w-3 fill-agronex-accent text-agronex-accent" />
                    {lote.producer.rating} · {lote.producer.transactions}{" "}
                    transações
                  </p>
                </div>
              </div>
            </div>

            {/* Localização */}
            <div className="overflow-hidden rounded-2xl border border-agronex-border bg-white shadow-sm">
              <div
                className="relative h-28 bg-cover bg-center"
                style={{ backgroundImage: `url('${lote.location.mapImage}')` }}
              >
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-lg bg-white/90 px-2 py-1 text-xs font-semibold text-gray-800 backdrop-blur-sm">
                  <Shield className="h-3 w-3 text-agronex-green" />
                  Origem Rastreável
                </div>
              </div>
              <div className="p-4">
                <p className="font-semibold text-gray-900">{lote.location.farm}</p>
                <p className="mt-1 flex items-center gap-1 text-sm text-agronex-muted">
                  <MapPin className="h-3.5 w-3.5 text-red-500" />
                  {lote.location.place}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
