"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bookmark,
  Clock,
  Gavel,
  MapPin,
  Scale,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { auctionCards } from "@/lib/leiloes-data";

interface AuctionCardProps {
  auction: (typeof auctionCards)[number];
}

export function AuctionCard({ auction }: AuctionCardProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const [saved, setSaved] = useState(false);

  const images = auction.images ?? [auction.image];

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-agronex-border bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      {/* Imagem */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={images[imageIndex]}
          alt={auction.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-agronex-green-dark/80 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {auction.live && (
            <span className="flex w-fit items-center gap-1.5 rounded-full bg-red-600 px-2.5 py-1 text-[10px] font-bold uppercase text-white shadow">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
              Ao vivo
            </span>
          )}
          <span className="w-fit rounded-md bg-white/90 px-2 py-0.5 font-mono text-[10px] font-bold text-agronex-green-dark backdrop-blur-sm">
            #{auction.id}
          </span>
        </div>

        <span className="absolute right-3 top-3 rounded-full bg-agronex-green px-2.5 py-1 text-[10px] font-semibold text-white">
          {auction.category}
        </span>

        {/* Timer + lances */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <span className="flex items-center gap-1 rounded-md bg-black/50 px-2 py-1 font-mono text-[11px] font-semibold text-white backdrop-blur-sm">
            <Clock className="h-3 w-3 text-agronex-accent" />
            {auction.timer}
          </span>
          {auction.bidCount && (
            <span className="flex items-center gap-1 rounded-md bg-black/50 px-2 py-1 text-[11px] text-white backdrop-blur-sm">
              <Users className="h-3 w-3" />
              {auction.bidCount}
            </span>
          )}
        </div>

        {/* Mini carousel */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setImageIndex(i)}
                className={cn(
                  "h-1 rounded-full transition-all",
                  i === imageIndex ? "w-3 bg-agronex-accent" : "w-1 bg-white/40",
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold leading-snug text-gray-900 group-hover:text-agronex-green">
            {auction.title}
          </h3>
          <button
            type="button"
            onClick={() => setSaved(!saved)}
            className="flex-shrink-0 text-gray-300 transition-colors hover:text-agronex-green"
            aria-label="Salvar lote"
          >
            <Bookmark
              className={cn(
                "h-4 w-4",
                saved && "fill-agronex-green text-agronex-green",
              )}
            />
          </button>
        </div>

        <p className="mt-1 flex items-center gap-1 text-xs text-agronex-muted">
          <MapPin className="h-3 w-3 flex-shrink-0" />
          {auction.location}
        </p>

        <div className="mt-2 flex flex-wrap gap-1">
          {auction.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-medium text-agronex-green"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Métricas */}
        <div className="mt-3 grid grid-cols-2 gap-2 rounded-xl bg-gray-50 p-3">
          <div>
            <p className="flex items-center gap-1 text-[10px] uppercase text-agronex-muted">
              <Scale className="h-3 w-3" />
              Volume
            </p>
            <p className="text-sm font-bold text-gray-900">{auction.volume}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-agronex-muted">
              Preço / un.
            </p>
            <p className="text-sm font-bold text-agronex-green">
              {auction.pricePerUnit}
            </p>
          </div>
        </div>

        {/* Lance */}
        <div className="mt-3 border-t border-agronex-border pt-3">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] text-agronex-muted">Lance atual</p>
              <p className="text-lg font-bold text-agronex-green">
                {auction.currentBid}
              </p>
              <p className="text-[10px] text-agronex-muted">
                Mín. {auction.minBid}
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/produtor/leiloes/lote/${auction.id}`}
                className="rounded-lg border border-agronex-border px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                Detalhes
              </Link>
              <Link
                href={
                  auction.id === "4928"
                    ? `/produtor/leiloes/4928`
                    : `/produtor/leiloes/lote/${auction.id}`
                }
                className="inline-flex items-center gap-1.5 rounded-lg bg-agronex-green px-3 py-2 text-xs font-bold text-white hover:bg-agronex-green-dark"
              >
                <Gavel className="h-3.5 w-3.5" />
                Lances
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
