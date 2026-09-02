"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, BadgeCheck, Info } from "lucide-react";
import { AppFooter } from "@/components/layout/AppFooter";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Stepper } from "@/components/ui/Stepper";

const steps = [
  { number: 1, label: "Dados Gerais" },
  { number: 2, label: "Frota & Região" },
  { number: 3, label: "Documentos" },
];

export default function CadastroTransportadorPage() {
  const router = useRouter();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/verificar-email");
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f6f7]">
      <div className="flex flex-1 flex-col items-center px-6 py-10">
        <div className="mb-8 w-full max-w-3xl text-center">
          <h1 className="text-2xl font-bold text-agronex-green">
            Cadastro de Transportador
          </h1>
          <p className="mt-2 text-sm text-agronex-muted">
            Junte-se à rede logística mais eficiente do agronegócio.
          </p>
        </div>

        <div className="mb-8">
          <Stepper steps={steps} currentStep={1} />
        </div>

        <div className="w-full max-w-3xl rounded-2xl border border-agronex-border bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-2">
            <BadgeCheck className="h-5 w-5 text-agronex-green" />
            <h2 className="text-lg font-semibold text-gray-900">Identificação</h2>
          </div>

          <form onSubmit={handleNext} className="space-y-6">
            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Nome da Transportadora ou Autônomo"
                required
                placeholder="Razão Social ou Nome Completo"
              />
              <Input
                label="CPF / CNPJ"
                required
                placeholder="00.000.000/0000-00"
              />
            </div>

            <Input
              label="RNTRC"
              required
              placeholder="Registro Nacional de Transportadores Rodoviários de Cargas"
              rightElement={
                <span title="Número do registro ANTT">
                  <Info className="h-4 w-4 text-gray-400" />
                </span>
              }
            />

            <div className="flex justify-end gap-3 border-t border-agronex-border pt-6">
              <Button variant="secondary" href="/cadastro">
                Cancelar
              </Button>
              <Button type="submit">
                Próximo Passo
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>

      <AppFooter variant="compact" />
    </div>
  );
}
