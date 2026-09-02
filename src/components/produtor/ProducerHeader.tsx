"use client";

import { Bell, ChevronDown, HelpCircle, Search } from "lucide-react";

interface ProducerHeaderProps {
  searchPlaceholder?: string;
}

export function ProducerHeader({
  searchPlaceholder = "Buscar lotes, leilões ou pedidos...",
}: ProducerHeaderProps) {
  return (
    <header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-agronex-border bg-white px-6">
      <div className="flex flex-1 justify-center px-8">
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder={searchPlaceholder}
            className="w-full rounded-full border border-agronex-border bg-gray-50 py-2 pl-10 pr-4 text-sm outline-none transition-colors focus:border-agronex-green focus:ring-2 focus:ring-agronex-green/20"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          aria-label="Notificações"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <button
          type="button"
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          aria-label="Ajuda"
        >
          <HelpCircle className="h-5 w-5" />
        </button>

        <button
          type="button"
          className="flex items-center gap-2 rounded-lg border border-agronex-border px-3 py-1.5 hover:bg-gray-50"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-agronex-green text-xs font-semibold text-white">
            PR
          </div>
          <span className="text-sm font-medium text-gray-700">Perfil</span>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </button>
      </div>
    </header>
  );
}
