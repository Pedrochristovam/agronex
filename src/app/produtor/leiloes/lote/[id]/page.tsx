import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Award,
  BadgeCheck,
  ChevronRight,
  Clock,
  Droplets,
  Gavel,
  Leaf,
  MapPin,
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
    <div className="p-6 lg:p-8">
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-agronex-muted">
        <Link href="/produtor/visao-geral" className="hover:text-agronex-green">
          Início
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/produtor/leiloes" className="hover:text-agronex-green">
          Leilões
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="font-medium text-gray-900">Lote #{lote.id}</span>
      </nav>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Coluna principal */}
        <div className="space-y-6 lg:col-span-2">
          <div className="overflow-hidden rounded-xl border border-agronex-border bg-white shadow-sm">
            <div className="flex items-start justify-between p-5 pb-0">
              <div>
                <h1 className="text-xl font-bold text-gray-900">{lote.title}</h1>
                <p className="mt-1 text-sm text-agronex-muted">
                  Lote ID: #{lote.id}
                </p>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-agronex-green-dark px-3 py-1 text-xs font-semibold text-white">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-agronex-accent" />
                {lote.status}
              </span>
            </div>

            <div className="relative m-5 mt-4 overflow-hidden rounded-xl">
              <div className="relative h-72 sm:h-80">
                <Image
                  src={lote.images.main}
                  alt={lote.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute bottom-3 right-3 flex gap-2">
                {lote.images.thumbs.map((thumb, i) => (
                  <div
                    key={i}
                    className="relative h-14 w-14 overflow-hidden rounded-lg border-2 border-white shadow-md"
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

          <div className="rounded-xl border border-agronex-border bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-2">
              <Award className="h-5 w-5 text-agronex-green" />
              <h2 className="text-sm font-semibold text-gray-900">
                Qualidade e Rastreabilidade
              </h2>
            </div>

            <div className="mb-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="mb-2 flex items-center gap-2 text-agronex-green">
                  <Leaf className="h-4 w-4" />
                  <span className="text-xs font-medium uppercase">Certificação</span>
                </div>
                <p className="text-sm font-semibold text-gray-900">
                  {lote.certification}
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="mb-2 flex items-center gap-2 text-agronex-green">
                  <Droplets className="h-4 w-4" />
                  <span className="text-xs font-medium uppercase">
                    Umidade / Impurezas
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-900">
                  {lote.humidityImpurity}
                </p>
              </div>
            </div>

            <div className="space-y-4 border-l-2 border-agronex-green/30 pl-4">
              {lote.timeline.map((item, i) => (
                <div key={i} className="relative">
                  <span className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-agronex-green" />
                  <p className="text-xs font-medium text-agronex-muted">
                    {item.date}
                  </p>
                  <p className="text-sm text-gray-900">{item.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Coluna lateral */}
        <div className="space-y-4">
          <div className="overflow-hidden rounded-xl bg-agronex-green shadow-sm">
            <div className="p-5">
              <p className="text-xs font-medium uppercase text-white/70">
                Lance Atual
              </p>
              <p className="mt-1 text-3xl font-bold text-white">
                {lote.currentBid}
              </p>
            </div>
            <div className="mx-5 mb-5 flex items-center gap-2 rounded-lg bg-black/20 px-4 py-2.5">
              <Clock className="h-4 w-4 text-white/80" />
              <span className="text-sm text-white/90">
                Encerra em:{" "}
                <span className="font-semibold text-white">{lote.timer}</span>
              </span>
            </div>
            <Link
              href={`/produtor/leiloes/${lote.liveAuctionId}`}
              className="flex items-center justify-center gap-2 bg-agronex-accent py-4 text-sm font-bold text-agronex-green-dark transition-colors hover:bg-green-300"
            >
              <Gavel className="h-4 w-4" />
              Participar do Leilão
            </Link>
          </div>

          <div className="rounded-xl border border-agronex-border bg-white p-5 shadow-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-agronex-muted">Quantidade</p>
                <p className="mt-0.5 font-bold text-gray-900">{lote.quantity}</p>
              </div>
              <div>
                <p className="text-xs text-agronex-muted">Data Colheita</p>
                <p className="mt-0.5 font-bold text-gray-900">{lote.harvestDate}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 border-t border-agronex-border pt-4">
              <Truck className="h-4 w-4 text-agronex-green" />
              <div>
                <p className="text-xs text-agronex-muted">Logística Recomendada</p>
                <p className="text-sm font-semibold text-gray-900">
                  {lote.logistics}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-agronex-border bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-agronex-green text-sm font-bold text-white">
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
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  {lote.producer.rating} ({lote.producer.transactions} transações)
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-agronex-border bg-white shadow-sm">
            <div
              className="relative h-28 bg-cover bg-center"
              style={{ backgroundImage: `url('${lote.location.mapImage}')` }}
            />
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
  );
}
