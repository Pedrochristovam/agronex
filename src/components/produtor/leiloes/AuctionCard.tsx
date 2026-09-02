import Image from "next/image";
import Link from "next/link";
import { Clock, Gavel, MapPin, Sprout } from "lucide-react";
import { auctionCards } from "@/lib/leiloes-data";

interface AuctionCardProps {
  auction: (typeof auctionCards)[number];
}

export function AuctionCard({ auction }: AuctionCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-agronex-border bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative h-40">
        <Image
          src={auction.image}
          alt={auction.title}
          fill
          className="object-cover"
        />
        {auction.live && (
          <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-red-600 px-2.5 py-1 text-xs font-semibold text-white">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            AO VIVO
          </span>
        )}
        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white">
          <Clock className="h-3 w-3" />
          {auction.timer}
        </span>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-gray-900">{auction.title}</h3>
        <div className="mt-2 space-y-1 text-xs text-agronex-muted">
          <p className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {auction.location}
          </p>
          <p className="flex items-center gap-1">
            <Sprout className="h-3 w-3" />
            {auction.origin}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-agronex-border pt-4">
          <div>
            <p className="text-[10px] font-medium uppercase text-agronex-muted">
              Volume Total
            </p>
            <p className="text-sm font-bold text-gray-900">{auction.volume}</p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase text-agronex-muted">
              Lance Atual
            </p>
            <p className="text-sm font-bold text-agronex-green">
              {auction.currentBid}
            </p>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {auction.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>

        <Link
          href={`/produtor/leiloes/lote/${auction.id}`}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-agronex-green py-2.5 text-sm font-semibold text-white transition-colors hover:bg-agronex-green-dark"
        >
          <Gavel className="h-4 w-4" />
          Participar do Leilão
        </Link>
      </div>
    </div>
  );
}
