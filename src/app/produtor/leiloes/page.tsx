"use client";

import { AuctionCard } from "@/components/produtor/leiloes/AuctionCard";
import { LeiloesHero } from "@/components/produtor/leiloes/LeiloesHero";
import {
  LeiloesSearchPanel,
  LeiloesTabs,
} from "@/components/produtor/leiloes/LeiloesFilters";
import { auctionCards } from "@/lib/leiloes-data";

export default function LeiloesPage() {
  return (
    <div className="min-h-full bg-[#f5f6f7] p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <LeiloesHero />

        <LeiloesSearchPanel />

        <div id="lotes">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <LeiloesTabs active="ativos" />
            <p className="text-sm text-agronex-muted">
              <span className="font-semibold text-gray-800">
                {auctionCards.length} lotes
              </span>{" "}
              em pregão · Minas Gerais
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {auctionCards.map((auction) => (
              <AuctionCard key={auction.id} auction={auction} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
