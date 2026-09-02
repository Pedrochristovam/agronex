"use client";

import { usePathname } from "next/navigation";
import { ProducerHeader } from "@/components/produtor/ProducerHeader";
import { ProducerSidebar } from "@/components/produtor/ProducerSidebar";

const FULL_PAGE_ROUTES = [
  "/produtor/lotes/novo/logistica",
  "/produtor/lotes/novo/revisao",
];

function getSearchPlaceholder(pathname: string) {
  if (pathname.startsWith("/produtor/leiloes")) {
    return "Buscar leilões, produtos...";
  }
  if (pathname.startsWith("/produtor/pedidos")) {
    return "Buscar pedidos, lotes, produtores...";
  }
  if (pathname.startsWith("/produtor/logistica")) {
    return pathname.includes("operacoes")
      ? "Buscar cargas..."
      : "Buscar pedidos, lotes ou documentos...";
  }
  if (pathname.startsWith("/produtor/financeiro")) {
    return "Buscar transações, faturas...";
  }
  if (pathname.startsWith("/produtor/documentos")) {
    return "Buscar documentos globais...";
  }
  return "Buscar lotes, leilões ou pedidos...";
}

export function ProdutorShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isFullPage = FULL_PAGE_ROUTES.some((route) => pathname.startsWith(route));

  if (isFullPage) {
    return (
      <div className="flex h-screen flex-col overflow-hidden bg-[#f5f6f7]">
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#f5f6f7]">
      <ProducerSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <ProducerHeader searchPlaceholder={getSearchPlaceholder(pathname)} />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
