"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  Gavel,
  History,
  Info,
  MapPin,
  Users,
} from "lucide-react";
import { formatCurrency, liveAuction } from "@/lib/leiloes-data";
import { Button } from "@/components/ui/Button";

export default function LeilaoLivePage() {
  const [bidAmount, setBidAmount] = useState(liveAuction.suggestedBid);
  const [autoBid, setAutoBid] = useState(false);

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <Link
          href="/produtor/leiloes/lote/4928"
          className="text-sm font-medium text-agronex-green hover:underline"
        >
          ← Ver detalhes do lote
        </Link>
        <h1 className="mt-2 text-xl font-bold text-gray-900">
          {liveAuction.title}
        </h1>
      </div>

      <div className="grid gap-6 xl:grid-cols-12">
        {/* Coluna esquerda — info do lote */}
        <div className="space-y-4 xl:col-span-3">
          <div className="overflow-hidden rounded-xl border border-agronex-border bg-white shadow-sm">
            <div className="relative h-40">
              <Image
                src={liveAuction.image}
                alt="Soja"
                fill
                className="object-cover"
              />
              <span className="absolute right-2 top-2 rounded bg-agronex-green px-2 py-0.5 text-xs font-medium text-white">
                Certificada
              </span>
            </div>
            <div className="p-4">
              <h2 className="mb-3 text-sm font-semibold text-gray-900">
                Informações do Lote
              </h2>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-agronex-muted">Variedade</dt>
                  <dd className="font-medium">{liveAuction.variety}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-agronex-muted">Volume Total</dt>
                  <dd className="font-medium">{liveAuction.volume}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-agronex-muted">Umidade Máx</dt>
                  <dd className="font-medium">{liveAuction.humidity}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-agronex-muted">Impureza Máx</dt>
                  <dd className="font-medium">{liveAuction.impurity}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="rounded-xl border border-agronex-border bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-agronex-green" />
              <h2 className="text-sm font-semibold text-gray-900">Origem</h2>
            </div>
            <p className="text-sm text-gray-700">{liveAuction.origin}</p>
            <div
              className="mt-3 flex h-20 items-center justify-center rounded-lg bg-green-50"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=300&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <MapPin className="h-6 w-6 text-agronex-green drop-shadow" />
            </div>
            <p className="mt-2 text-xs text-agronex-muted">{liveAuction.pickup}</p>
          </div>
        </div>

        {/* Coluna central — timer e lance */}
        <div className="space-y-4 xl:col-span-5">
          <div className="overflow-hidden rounded-xl border border-agronex-border bg-agronex-green shadow-sm">
            <div className="px-6 py-3 text-center">
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white">
                Encerrando em Breve
              </span>
            </div>
            <div className="px-6 pb-6 pt-2 text-center text-white">
              <p className="text-5xl font-bold tracking-wider">
                {liveAuction.timeRemaining}
              </p>
              <p className="mt-1 text-sm text-white/80">TEMPO RESTANTE</p>
            </div>
          </div>

          <div className="rounded-xl border border-agronex-border bg-white p-6 text-center shadow-sm">
            <p className="text-sm text-agronex-muted">Lance Atual Mais Alto</p>
            <p className="mt-2 text-4xl font-bold text-agronex-green">
              {formatCurrency(liveAuction.currentBid)}
            </p>
            <div className="mt-4 flex items-center justify-center gap-4 text-sm text-agronex-muted">
              <span>Incremento Mín: {formatCurrency(liveAuction.minIncrement)}</span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                Lances: {liveAuction.bidCount}
              </span>
            </div>

            {liveAuction.userOutbid && (
              <div className="mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-left text-sm text-red-800">
                <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>
                  Você foi superado! Último lance:{" "}
                  {formatCurrency(liveAuction.userLastBid)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Coluna direita — dar lance */}
        <div className="space-y-4 xl:col-span-4">
          <div className="rounded-xl border border-agronex-border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-sm font-semibold text-gray-900">Seu Lance</h2>

            <div className="mb-3 flex gap-2">
              {[500, 1000].map((inc) => (
                <button
                  key={inc}
                  type="button"
                  onClick={() => setBidAmount(liveAuction.currentBid + inc)}
                  className="rounded-lg border border-agronex-border px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  + {formatCurrency(inc)}
                </button>
              ))}
            </div>

            <input
              type="text"
              value={formatCurrency(bidAmount)}
              onChange={() => {}}
              className="mb-4 w-full rounded-lg border border-agronex-border px-4 py-3 text-lg font-bold text-gray-900 outline-none focus:border-agronex-green focus:ring-2 focus:ring-agronex-green/20"
            />

            <Button className="w-full gap-2" size="lg">
              <Gavel className="h-4 w-4" />
              Dar Lance
            </Button>

            <label className="mt-4 flex cursor-pointer items-center justify-between">
              <span className="flex items-center gap-2 text-sm text-gray-700">
                Auto-Bid
                <Info className="h-3.5 w-3.5 text-gray-400" />
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={autoBid}
                onClick={() => setAutoBid(!autoBid)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  autoBid ? "bg-agronex-green" : "bg-gray-200"
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

          <div className="rounded-xl border border-agronex-border bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <History className="h-4 w-4 text-agronex-green" />
              <h2 className="text-sm font-semibold text-gray-900">
                Histórico ao Vivo
              </h2>
            </div>
            <div className="max-h-64 space-y-3 overflow-y-auto">
              {liveAuction.history.map((entry, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm ${
                    entry.isLeader
                      ? "bg-green-50 font-medium"
                      : entry.isYou
                        ? "bg-blue-50"
                        : ""
                  }`}
                >
                  <div>
                    <p className="text-xs text-agronex-muted">{entry.time}</p>
                    <p className="font-medium">{entry.bidder}</p>
                  </div>
                  <p className="font-semibold text-agronex-green">
                    {formatCurrency(entry.amount)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
