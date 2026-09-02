"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Banknote,
  FileText,
  Gavel,
  LayoutDashboard,
  LogOut,
  Package,
  Plus,
  Settings,
  ShoppingCart,
  Sprout,
  Truck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    href: "/produtor/visao-geral",
    isActive: (pathname: string) =>
      pathname === "/produtor" || pathname === "/produtor/visao-geral",
    label: "Início",
    icon: LayoutDashboard,
  },
  {
    href: "/produtor/meus-produtos",
    isActive: (pathname: string) => pathname.startsWith("/produtor/meus-produtos"),
    label: "Meus Produtos",
    icon: Package,
  },
  {
    href: "/produtor/lotes",
    isActive: (pathname: string) => pathname.startsWith("/produtor/lotes"),
    label: "Lotes",
    icon: Sprout,
  },
  {
    href: "/produtor/leiloes",
    isActive: (pathname: string) => pathname.startsWith("/produtor/leiloes"),
    label: "Leilões",
    icon: Gavel,
  },
  {
    href: "/produtor/pedidos",
    isActive: (pathname: string) => pathname.startsWith("/produtor/pedidos"),
    label: "Pedidos",
    icon: ShoppingCart,
  },
  {
    href: "/produtor/logistica",
    isActive: (pathname: string) => pathname.startsWith("/produtor/logistica"),
    label: "Logística",
    icon: Truck,
  },
  {
    href: "/produtor/financeiro",
    isActive: (pathname: string) => pathname.startsWith("/produtor/financeiro"),
    label: "Financeiro",
    icon: Banknote,
  },
  {
    href: "/produtor/documentos",
    isActive: (pathname: string) => pathname.startsWith("/produtor/documentos"),
    label: "Documentos",
    icon: FileText,
  },
];

export function ProducerSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (item: (typeof navItems)[number]) => item.isActive(pathname);

  return (
    <aside className="flex h-screen w-64 flex-shrink-0 flex-col bg-agronex-green-dark text-white">
      <div className="border-b border-white/10 px-5 py-6">
        <Link href="/produtor/visao-geral" className="block">
          <span className="text-lg font-bold tracking-wide">AGRONEX WEB</span>
          <span className="mt-0.5 block text-xs text-white/70">Produtor Rural</span>
        </Link>

        <Link
          href="/produtor/lotes/novo"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-agronex-accent px-4 py-2.5 text-sm font-semibold text-agronex-green-dark transition-colors hover:bg-green-300"
        >
          <Plus className="h-4 w-4" />
          Novo Lote
        </Link>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-white/15 text-white"
                  : "text-white/75 hover:bg-white/10 hover:text-white",
              )}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 border-t border-white/10 px-3 py-4">
        <Link
          href="/produtor/configuracoes"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
            pathname === "/produtor/configuracoes"
              ? "bg-white/15 text-white"
              : "text-white/75 hover:bg-white/10 hover:text-white",
          )}
        >
          <Settings className="h-4 w-4" />
          Configurações
        </Link>

        <button
          type="button"
          onClick={() => router.push("/login")}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Sair
        </button>
      </div>
    </aside>
  );
}
