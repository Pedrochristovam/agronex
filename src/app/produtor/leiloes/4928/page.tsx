"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ChevronLeft,
  Gavel,
  History,
  Info,
  MapPin,
  Radio,
  Shield,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { formatCurrency, liveAuction } from "@/lib/leiloes-data";
import { Button } from "@/components/ui/Button";

function TimerDigit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-16 w-14 items-center justify-center rounded-xl bg-black/30 font-mono text-3xl font-bold text-white shadow-inner backdrop-blur-sm lg:h-20 lg:w-16 lg:text-4xl">
        {value}
      </div>
      <span className="mt-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/50">
        {label}
      </span>
    </div>
  );
}

export default function LeilaoLivePage() {
  const [bidAmount, setBidAmount] = useState(liveAuction.suggestedBid);
  const [autoBid, setAutoBid] = useState(false);

  const [mins, secs] = liveAuction.timeRemaining.split(":");

  return (
    <div className="min-h-full bg-[#0a0f0c]">
      {/* Header do pregão */}
      <div className="border-b border-white/10 bg-gradient-to-r from-agronex-green-dark to-agronex-green px-6 py-4">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/produtor/leiloes/lote/4928"
              className="flex items-center gap-1 text-sm text-white/60 transition-colors hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
              Detalhes do Lote
            </Link>
            <div className="hidden h-4 w-px bg-white/20 sm:block" />
            <div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 rounded-md bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  <Radio className="h-3 w-3" />
                  Pregão Ao Vivo
                </span>
                <span className="font-mono text-xs text-white/40">
                  CERTAME #{liveAuction.id}
                </span>
              </div>
              <h1 className="mt-1 text-lg font-bold text-white">
                {liveAuction.title}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm text-white/60">
            <Users className="h-4 w-4" />
            {liveAuction.bidCount} participantes ativos
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl p-6 lg:p-8">
        <div className="grid gap-6 xl:grid-cols-12">
          {/* Coluna esquerda — lote */}
          <div className="space-y-4 xl:col-span-3">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="relative h-44">
                <Image
                  src={liveAuction.image}
                  alt="Soja"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-agronex-accent/90 px-2 py-1 text-[10px] font-bold text-white">
                  <Shield className="h-3 w-3" />
                  Certificada
                </span>
              </div>
              <div className="p-4">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-white/40">
                  Especificações do Lote
                </p>
                <dl className="space-y-2.5 text-sm">
                  {[
                    ["Variedade", liveAuction.variety],
                    ["Volume Total", liveAuction.volume],
                    ["Umidade Máx", liveAuction.humidity],
                    ["Impureza Máx", liveAuction.impurity],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between">
                      <dt className="text-white/50">{label}</dt>
                      <dd className="font-semibold text-white">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="mb-3 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-agronex-accent" />
                <h2 className="text-sm font-semibold text-white">Origem</h2>
              </div>
              <p className="text-sm text-white/70">{liveAuction.origin}</p>
              <div
                className="mt-3 flex h-24 items-center justify-center overflow-hidden rounded-xl"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=300&q=80')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="flex h-full w-full items-center justify-center bg-black/30">
                  <MapPin className="h-6 w-6 text-agronex-accent drop-shadow" />
                </div>
              </div>
              <p className="mt-2 text-xs text-white/40">{liveAuction.pickup}</p>
            </div>
          </div>

          {/* Coluna central — timer + lance atual */}
          <div className="space-y-4 xl:col-span-5">
            {/* Timer */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-agronex-green-dark to-[#0d2818] shadow-2xl">
              <div className="border-b border-white/10 px-6 py-3 text-center">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/70">
                  <Zap className="h-3.5 w-3.5" />
                  Encerramento do Pregão
                </span>
              </div>
              <div className="flex items-center justify-center gap-3 px-6 py-8">
                <TimerDigit value={mins} label="Min" />
                <span className="mb-5 font-mono text-3xl font-bold text-white/30">:</span>
                <TimerDigit value={secs} label="Seg" />
              </div>
            </div>

            {/* Lance atual */}
            <div className="rounded-2xl border border-white/10 bg-white p-6 text-center shadow-xl">
              <p className="text-xs font-bold uppercase tracking-widest text-agronex-muted">
                Maior Lance Registrado
              </p>
              <p className="mt-3 text-5xl font-bold tracking-tight text-agronex-accent">
                {formatCurrency(liveAuction.currentBid)}
              </p>
              <p className="mt-1 text-sm text-agronex-muted">
                R$ 2.900,00 / tonelada
              </p>
              <div className="mt-5 flex items-center justify-center divide-x divide-agronex-border">
                <div className="px-6 text-center">
                  <p className="text-xs text-agronex-muted">Incremento Mín.</p>
                  <p className="mt-0.5 text-sm font-bold text-gray-900">
                    {formatCurrency(liveAuction.minIncrement)}
                  </p>
                </div>
                <div className="px-6 text-center">
                  <p className="text-xs text-agronex-muted">Total de Lances</p>
                  <p className="mt-0.5 text-sm font-bold text-gray-900">
                    {liveAuction.bidCount}
                  </p>
                </div>
                <div className="px-6 text-center">
                  <p className="text-xs text-agronex-muted">Participantes</p>
                  <p className="mt-0.5 text-sm font-bold text-gray-900">12</p>
                </div>
              </div>

              {liveAuction.userOutbid && (
                <div className="mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-left">
                  <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                  <div>
                    <p className="text-sm font-semibold text-red-800">
                      Seu lance foi superado
                    </p>
                    <p className="mt-0.5 text-xs text-red-600">
                      Seu último lance: {formatCurrency(liveAuction.userLastBid)} —
                      cobrir agora para retomar a liderança
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Barra de atividade */}
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
              <TrendingUp className="h-4 w-4 text-agronex-accent" />
              <p className="text-xs text-white/60">
                Último lance há <span className="font-semibold text-white">12 segundos</span> —
                mercado aquecido
              </p>
            </div>
          </div>

          {/* Coluna direita — dar lance + histórico */}
          <div className="space-y-4 xl:col-span-4">
            <div className="rounded-2xl border border-white/10 bg-white p-5 shadow-xl">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-bold text-gray-900">Registrar Lance</h2>
                <span className="rounded-full bg-agronex-green/10 px-2 py-0.5 text-[10px] font-bold text-agronex-green">
                  MAIOR LANCE
                </span>
              </div>

              <div className="mb-3 flex gap-2">
                {[500, 1000, 5000].map((inc) => (
                  <button
                    key={inc}
                    type="button"
                    onClick={() => setBidAmount(liveAuction.currentBid + inc)}
                    className="flex-1 rounded-xl border border-agronex-border bg-gray-50 py-2 text-xs font-semibold text-gray-700 transition-colors hover:border-agronex-green hover:bg-green-50 hover:text-agronex-green"
                  >
                    + {formatCurrency(inc)}
                  </button>
                ))}
              </div>

              <div className="relative mb-4">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-agronex-muted">
                  R$
                </span>
                <input
                  type="text"
                  value={bidAmount.toLocaleString("pt-BR")}
                  readOnly
                  className="w-full rounded-xl border-2 border-agronex-green/30 bg-[#f8faf8] py-4 pl-10 pr-4 text-2xl font-bold text-gray-900 outline-none focus:border-agronex-green focus:ring-4 focus:ring-agronex-green/10"
                />
              </div>

              <Button className="w-full gap-2 rounded-xl py-4 text-base font-bold shadow-lg" size="lg">
                <Gavel className="h-5 w-5" />
                Confirmar Lance
              </Button>

              <label className="mt-4 flex cursor-pointer items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Zap className="h-4 w-4 text-agronex-accent" />
                  Lance Automático
                  <Info className="h-3.5 w-3.5 text-gray-400" />
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={autoBid}
                  onClick={() => setAutoBid(!autoBid)}
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    autoBid ? "bg-agronex-green" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                      autoBid ? "left-5" : "left-0.5"
                    }`}
                  />
                </button>
              </label>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4">
                <History className="h-4 w-4 text-agronex-accent" />
                <h2 className="text-sm font-semibold text-white">
                  Histórico do Pregão
                </h2>
                <span className="ml-auto flex items-center gap-1 text-[10px] text-red-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400" />
                  Ao vivo
                </span>
              </div>
              <div className="max-h-72 space-y-1 overflow-y-auto p-3">
                {liveAuction.history.map((entry, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm ${
                      entry.isLeader
                        ? "border border-agronex-accent/30 bg-agronex-accent/10"
                        : entry.isYou
                          ? "border border-blue-500/30 bg-blue-500/10"
                          : "hover:bg-white/5"
                    }`}
                  >
                    <div>
                      <p className="text-[10px] text-white/40">{entry.time}</p>
                      <p className={`font-medium ${entry.isLeader ? "text-agronex-accent" : entry.isYou ? "text-blue-300" : "text-white/80"}`}>
                        {entry.bidder}
                        {entry.isLeader && (
                          <span className="ml-1.5 text-[10px] font-bold uppercase text-agronex-accent">
                            Líder
                          </span>
                        )}
                      </p>
                    </div>
                    <p className="font-bold text-agronex-accent">
                      {formatCurrency(entry.amount)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
