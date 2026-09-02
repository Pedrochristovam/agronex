"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Headphones, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { OtpInput } from "@/components/ui/OtpInput";

export default function VerificarEmailPage() {
  const router = useRouter();
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length === 6) {
      router.push("/produtor");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f5f6f7] px-6 py-12">
      <h1 className="mb-8 text-2xl font-bold tracking-wide text-agronex-green">
        AGRONEX
      </h1>

      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-agronex-border bg-white shadow-sm">
        <div className="h-1 bg-gradient-to-r from-agronex-accent to-agronex-green" />

        <div className="p-8">
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-green-100">
              <MailCheck className="h-7 w-7 text-agronex-green" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              Verifique seu E-mail
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-agronex-muted">
              Enviamos um código de segurança para o seu endereço de e-mail.
              Por favor, insira a sequência de 6 dígitos abaixo para confirmar
              sua identidade.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <OtpInput value={code} onChange={setCode} />

            <Button type="submit" size="lg" disabled={code.length < 6}>
              Confirmar Identidade
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-agronex-muted">
            Não recebeu o e-mail?{" "}
            <button
              type="button"
              className="font-medium text-agronex-green-muted hover:underline"
            >
              Reenviar código
            </button>
          </p>

          <div className="mt-6 border-t border-agronex-border pt-6">
            <div className="flex items-center justify-center gap-2 text-sm text-agronex-muted">
              <Headphones className="h-4 w-4" />
              <span>
                Problemas com a verificação?{" "}
                <Link href="#" className="font-medium text-agronex-green hover:underline">
                  Contate o suporte
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
