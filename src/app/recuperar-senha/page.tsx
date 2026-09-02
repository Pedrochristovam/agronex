"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthHeader } from "@/components/layout/AuthHeader";
import { AppFooter } from "@/components/layout/AppFooter";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function RecuperarSenhaPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/verificar-email");
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f6f7]">
      <AuthHeader />

      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md rounded-2xl border border-agronex-border bg-white p-8 shadow-sm">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-agronex-green">
              Recuperação de Senha
            </h1>
            <p className="mt-2 text-sm text-agronex-muted">
              Informe o e-mail associado à sua conta para receber as instruções
              de recuperação.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="E-mail Corporativo"
              type="email"
              placeholder="seu.email@agronex.com"
              required
            />

            <Button type="submit" size="lg">
              Enviar instruções
            </Button>
          </form>

          <p className="mt-6 text-center">
            <Link
              href="/login"
              className="text-sm font-medium text-agronex-green hover:underline"
            >
              Voltar para o Login
            </Link>
          </p>
        </div>
      </div>

      <AppFooter variant="auth" />
    </div>
  );
}
