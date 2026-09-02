"use client";

import Link from "next/link";
import { BarChart3 } from "lucide-react";
import { AuctionCard } from "@/components/produtor/leiloes/AuctionCard";
import {
  LeiloesFilters,
  LeiloesTabs,
} from "@/components/produtor/leiloes/LeiloesFilters";
import { auctionCards } from "@/lib/leiloes-data";

export default function LeiloesPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leilões</h1>
          <p className="mt-1 text-sm text-agronex-muted">
            Explore leilões ativos e participe em tempo real
          </p>
        </div>
        <Link
          href="/produtor/leiloes/painel"
          className="inline-flex items-center gap-2 rounded-lg border border-agronex-green px-4 py-2 text-sm font-medium text-agronex-green hover:bg-green-50"
        >
          <BarChart3 className="h-4 w-4" />
          Painel de Leilões
        </Link>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <LeiloesFilters />

        <div className="flex-1">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <LeiloesTabs active="ativos" />
            <div className="flex items-center gap-2 text-sm text-agronex-muted">
              Ordenar por:
              <select className="rounded-lg border border-agronex-border px-3 py-1.5 text-sm font-medium text-gray-900 outline-none">
                <option>Menor Tempo</option>
                <option>Maior Lance</option>
                <option>Menor Volume</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
            {auctionCards.map((auction) => (
              <AuctionCard key={auction.id} auction={auction} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
