"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import {
  ArrowLeft,
  Camera,
  Clock,
  MapPin,
  Minus,
  Phone,
  Plus,
  Truck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getRastreamentoBySlug, rastreamentoDetail } from "@/lib/logistica-data";

export default function RastreamentoPage() {
  const params = useParams();
  const slug = params.slug as string;
  const data = getRastreamentoBySlug(slug);

  if (!data) {
    notFound();
  }

  const detail = slug === "log-8492-sp" ? rastreamentoDetail : data;

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col lg:flex-row">
      {/* Map area */}
      <div className="relative min-h-[320px] flex-1">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-white/30" />

        <div className="absolute left-4 top-4 z-10 rounded-xl border border-agronex-border bg-white p-4 shadow-lg">
          <Link
            href="/produtor/logistica/operacoes"
            className="mb-2 inline-flex items-center gap-1 text-sm text-agronex-green hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
          <p className="font-bold text-gray-900">Entrega #{detail.id}</p>
          <p className="text-sm text-agronex-muted">
            {detail.produto} • {detail.peso}
          </p>
        </div>

        <div className="absolute right-4 top-4 z-10 flex flex-col gap-2">
          {[Plus, Minus, MapPin].map((Icon, i) => (
            <button
              key={i}
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-agronex-border bg-white shadow hover:bg-gray-50"
            >
              <Icon className="h-4 w-4 text-gray-600" />
            </button>
          ))}
        </div>

        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-wrap items-center justify-center gap-4 rounded-full border border-agronex-border bg-white px-6 py-3 shadow-lg">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-agronex-green" />
            <span className="text-agronex-muted">Previsão chegada:</span>
            <span className="font-semibold">{detail.previsaoChegada}</span>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            {detail.status}
          </span>
        </div>

        <div className="absolute left-[55%] top-[45%] z-10">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-agronex-green shadow-lg ring-4 ring-white">
            <Truck className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>

      <aside className="w-full overflow-y-auto border-l border-agronex-border bg-white lg:w-96">
        <div className="p-5">
          <div className="mb-6 rounded-xl border border-agronex-border p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">
                {detail.transportadora.nome}
              </h2>
              <button
                type="button"
                className="rounded-lg p-2 text-agronex-green hover:bg-green-50"
                aria-label="Ligar"
              >
                <Phone className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 flex items-center gap-2 text-sm text-agronex-muted">
              <Truck className="h-4 w-4" />
              {detail.transportadora.veiculo} • Placa: {detail.transportadora.placa}
            </p>
            <div className="mt-3 flex items-center gap-3 border-t border-agronex-border pt-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-agronex-green text-xs font-bold text-white">
                CE
              </div>
              <div>
                <p className="text-sm font-medium">{detail.transportadora.motorista}</p>
                <p className="text-xs text-agronex-muted">
                  {detail.transportadora.cnh}
                </p>
              </div>
            </div>
          </div>

          <h3 className="mb-4 text-sm font-semibold text-gray-900">
            Histórico da Operação
          </h3>
          <div className="space-y-0">
            {detail.timeline.map((event, i) => (
              <div key={i} className="relative flex gap-3 pb-6 last:pb-0">
                {!event.pending && i < detail.timeline.length - 1 && (
                  <div className="absolute left-[11px] top-6 h-full w-0.5 bg-gray-200" />
                )}
                <div
                  className={cn(
                    "relative z-10 mt-0.5 h-6 w-6 flex-shrink-0 rounded-full border-2",
                    event.current
                      ? "border-agronex-green bg-white"
                      : event.completed
                        ? "border-gray-300 bg-gray-200"
                        : "border-dashed border-gray-300 bg-white",
                  )}
                >
                  {event.current && (
                    <div className="absolute inset-1 rounded-full bg-agronex-green" />
                  )}
                </div>
                <div
                  className={cn(
                    "flex-1 rounded-lg p-3",
                    event.current && "border border-green-200 bg-green-50",
                  )}
                >
                  <p className="text-sm font-medium text-gray-900">{event.title}</p>
                  {"date" in event && event.date && (
                    <p className="text-xs text-agronex-muted">{event.date}</p>
                  )}
                  {"location" in event && event.location && (
                    <p className="mt-1 text-xs text-gray-700">{event.location}</p>
                  )}
                  {"distance" in event && event.distance && (
                    <p className="text-xs font-medium text-agronex-green">
                      {event.distance}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-dashed border-agronex-border bg-gray-50 p-5 text-center">
            <h3 className="mb-3 text-sm font-semibold text-gray-900">
              Comprovante de Entrega
            </h3>
            <div className="flex flex-col items-center py-6">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gray-200">
                <Camera className="h-7 w-7 text-gray-400" />
              </div>
              <p className="text-sm font-medium text-gray-700">
                Aguardando Confirmação
              </p>
              <p className="mt-1 text-xs text-agronex-muted">
                Foto e coordenadas GPS serão anexadas automaticamente na entrega
              </p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
