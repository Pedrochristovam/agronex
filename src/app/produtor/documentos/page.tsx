"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
  Filter,
  Hourglass,
  Search,
  ShieldCheck,
  Tractor,
  Truck,
  Upload,
  User,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DocumentStatusBadge } from "@/components/produtor/documentos/DocumentStatusBadge";
import { Button } from "@/components/ui/Button";
import {
  documentosList,
  documentosStats,
  type DocumentStatus,
} from "@/lib/documentos-data";

const iconMap: Record<string, typeof FileText> = {
  farm: Tractor,
  transit: Truck,
  personal: User,
  financial: Wallet,
  operational: FileText,
  cert: ShieldCheck,
};

const tabs = [
  { id: "todos", label: "Todos" },
  { id: "validos", label: "Válidos", statuses: ["aprovado"] },
  { id: "pendentes", label: "Pendentes", statuses: ["pendente", "em-analise"] },
  { id: "expirados", label: "Expirados", statuses: ["expirado", "recusado"] },
];

export default function DocumentosPage() {
  const [activeTab, setActiveTab] = useState("todos");

  const filtered = documentosList.filter((doc) => {
    const tab = tabs.find((t) => t.id === activeTab);
    if (!tab || activeTab === "todos") return true;
    return tab.statuses?.includes(doc.status);
  });

  const getDocHref = (doc: (typeof documentosList)[number]) => {
    if (doc.certificado) {
      return `/produtor/documentos/certificado/${doc.slug}`;
    }
    return `/produtor/documentos/${doc.slug}`;
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestão de Documentos</h1>
          <p className="mt-1 text-sm text-agronex-muted">
            Gerencie, analise e renove a documentação da sua operação
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-agronex-border bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            <Filter className="h-4 w-4" />
            Filtrar
          </button>
          <Button href="/produtor/documentos/novo" className="gap-2">
            <Upload className="h-4 w-4" />
            Upload de Novo Documento
          </Button>
        </div>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-agronex-border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase text-agronex-muted">Total Registrados</p>
              <p className="mt-1 text-2xl font-bold">{documentosStats.total}</p>
            </div>
            <FileText className="h-8 w-8 text-gray-300" />
          </div>
        </div>
        <div className="rounded-xl border border-agronex-border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase text-agronex-muted">Pendentes</p>
              <p className="mt-1 text-2xl font-bold text-orange-600">
                {documentosStats.pendentes}
              </p>
            </div>
            <Hourglass className="h-8 w-8 text-orange-400" />
          </div>
        </div>
        <div className="rounded-xl border border-agronex-border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase text-agronex-muted">Em Análise</p>
              <p className="mt-1 text-2xl font-bold text-agronex-green">
                {documentosStats.emAnalise}
              </p>
            </div>
            <ShieldCheck className="h-8 w-8 text-agronex-green" />
          </div>
        </div>
        <div className="rounded-xl border border-agronex-border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase text-agronex-muted">Expirados</p>
              <p className="mt-1 text-2xl font-bold text-red-600">
                {documentosStats.expirados}
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-400" />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-agronex-border bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-agronex-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                  activeTab === tab.id
                    ? "bg-agronex-green text-white"
                    : "text-agronex-muted hover:bg-gray-100",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Buscar nesta lista..."
              className="w-full rounded-lg border border-agronex-border py-2 pl-10 pr-4 text-sm outline-none focus:border-agronex-green"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-agronex-border bg-gray-50 text-left text-xs font-medium uppercase tracking-wide text-agronex-muted">
                <th className="px-5 py-3">Documento</th>
                <th className="px-5 py-3">Tipo</th>
                <th className="px-5 py-3">Emissão</th>
                <th className="px-5 py-3">Validade</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((doc) => {
                const Icon = iconMap[doc.icon] || FileText;
                return (
                  <tr
                    key={doc.id}
                    className="border-b border-agronex-border last:border-0 hover:bg-gray-50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                          <Icon className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{doc.titulo}</p>
                          <p className="text-xs text-agronex-muted">ID: {doc.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">{doc.tipo}</td>
                    <td className="px-5 py-4 text-agronex-muted">{doc.emissao}</td>
                    <td
                      className={cn(
                        "px-5 py-4",
                        doc.validadeExpired ? "font-medium text-red-600" : "text-agronex-muted",
                      )}
                    >
                      {doc.validade}
                    </td>
                    <td className="px-5 py-4">
                      <DocumentStatusBadge status={doc.status} />
                    </td>
                    <td className="px-5 py-4">
                      <Link
                        href={getDocHref(doc)}
                        className="text-xs font-semibold text-agronex-green hover:underline"
                      >
                        Ver
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-agronex-border px-5 py-3 text-sm text-agronex-muted">
          <span>
            Mostrando 1–{filtered.length} de {documentosStats.total} documentos
          </span>
          <div className="flex items-center gap-1">
            <button type="button" className="rounded-lg border border-agronex-border p-1.5">
              <ChevronLeft className="h-4 w-4" />
            </button>
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                type="button"
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg text-sm",
                  p === 1 ? "bg-agronex-green text-white" : "border border-agronex-border",
                )}
              >
                {p}
              </button>
            ))}
            <span className="px-1">...</span>
            <button type="button" className="rounded-lg border border-agronex-border p-1.5">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
