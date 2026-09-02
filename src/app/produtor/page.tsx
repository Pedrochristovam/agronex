"use client";

import Link from "next/link";
import { CirclePlay, Plus, Tractor } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ProdutorInicioPage() {
  return (
    <div className="flex min-h-full items-center justify-center p-8">
      <div className="w-full max-w-lg rounded-2xl border border-agronex-border bg-white p-10 text-center shadow-sm">
        <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center">
          <div className="absolute inset-0 rounded-2xl bg-green-50 grid-pattern opacity-60" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-xl bg-green-100">
            <Tractor className="h-8 w-8 text-agronex-green" />
          </div>
          <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-agronex-accent text-agronex-green-dark">
            <Plus className="h-4 w-4" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-agronex-green">
          Bem-vindo ao AgroNex!
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-agronex-muted">
          Você ainda não possui lotes ou vendas registradas. Comece a gerenciar
          sua produção agora mesmo.
        </p>

        <div className="mt-8 space-y-4">
          <Button href="/produtor/meus-produtos/novo" size="lg" className="gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
              <Plus className="h-4 w-4" />
            </span>
            Cadastrar meu primeiro produto
          </Button>

          <Link
            href="/produtor/visao-geral"
            className="inline-flex items-center gap-2 text-sm font-medium text-agronex-green hover:underline"
          >
            <CirclePlay className="h-4 w-4" />
            Ver guia de introdução
          </Link>
        </div>
      </div>
    </div>
  );
}
