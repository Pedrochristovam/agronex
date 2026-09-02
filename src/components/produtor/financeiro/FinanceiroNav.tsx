"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/produtor/financeiro", label: "Dashboard", exact: true },
  { href: "/produtor/financeiro/fluxo-de-caixa", label: "Fluxo de Caixa" },
  { href: "/produtor/financeiro/antecipacao", label: "Antecipações" },
];

export function FinanceiroNav() {
  const pathname = usePathname();

  return (
    <div className="mb-6 flex flex-wrap gap-2 border-b border-agronex-border pb-4">
      {navItems.map((item) => {
        const active = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-agronex-green text-white"
                : "text-agronex-muted hover:bg-gray-100 hover:text-gray-900",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
