"use client";

import Link from "next/link";
import { Plus, Sprout } from "lucide-react";
import { StatusBadge } from "@/components/produtor/StatusBadge";
import { Button } from "@/components/ui/Button";

const lotes = [
  {
    id: "ACX-2024-8492",
    produto: "Soja em Grãos",
    volume: "1.200 t",
    municipio: "Patos de Minas, MG",
    status: "Rascunho",
    statusVariant: "neutral" as const,
  },
  {
    id: "ACX-2024-8401",
    produto: "Milho Grão",
    volume: "800 t",
    municipio: "Uberaba, MG",
    status: "Ativo",
    statusVariant: "success" as const,
  },
  {
    id: "ACX-2024-8398",
    produto: "Café Arábica",
    volume: "150 t",
    municipio: "Patrocínio, MG",
    status: "Em Leilão",
    statusVariant: "warning" as const,
  },
];

export default function LotesPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lotes</h1>
          <p className="mt-1 text-sm text-agronex-muted">
            Gerencie seus lotes de produção agrícola
          </p>
        </div>
        <Button href="/produtor/lotes/novo" className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Lote
        </Button>
      </div>

      <div className="rounded-xl border border-agronex-border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-agronex-border bg-gray-50 text-left text-xs font-medium uppercase tracking-wide text-agronex-muted">
                <th className="px-5 py-3">ID</th>
                <th className="px-5 py-3">Produto</th>
                <th className="px-5 py-3">Volume</th>
                <th className="px-5 py-3">Origem</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {lotes.map((lote) => (
                <tr
                  key={lote.id}
                  className="border-b border-agronex-border last:border-0 hover:bg-gray-50"
                >
                  <td className="px-5 py-4 font-medium text-agronex-green">
                    {lote.id}
                  </td>
                  <td className="px-5 py-4">{lote.produto}</td>
                  <td className="px-5 py-4">{lote.volume}</td>
                  <td className="px-5 py-4 text-agronex-muted">{lote.municipio}</td>
                  <td className="px-5 py-4">
                    <StatusBadge
                      label={lote.status}
                      variant={lote.statusVariant}
                    />
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      href={
                        lote.status === "Rascunho"
                          ? "/produtor/lotes/novo/produto"
                          : lote.status === "Em Leilão"
                            ? "/produtor/leiloes/lote/8492"
                            : `/produtor/lotes/${lote.id}`
                      }
                      className="text-xs font-semibold text-agronex-green hover:underline"
                    >
                      {lote.status === "Rascunho" ? "Continuar" : "Ver detalhes"}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {lotes.length === 0 && (
          <div className="flex flex-col items-center py-16 text-center">
            <Sprout className="mb-4 h-12 w-12 text-gray-300" />
            <p className="text-sm text-agronex-muted">
              Nenhum lote cadastrado ainda.
            </p>
            <Button href="/produtor/lotes/novo" className="mt-4">
              Cadastrar primeiro lote
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
