"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { AppFooter } from "@/components/layout/AppFooter";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { Stepper } from "@/components/ui/Stepper";

const steps = [
  { number: 1, label: "Dados Pessoais" },
  { number: 2, label: "Localização" },
  { number: 3, label: "Documentos" },
];

export default function CadastroProdutorPage() {
  const router = useRouter();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/verificar-email");
  };

  return (
    <div className="grid-pattern flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col items-center px-6 py-10">
        <div className="mb-8 w-full max-w-3xl text-center">
          <h1 className="text-2xl font-bold text-agronex-green">
            Cadastro de Produtor Rural
          </h1>
          <p className="mt-2 text-sm text-agronex-muted">
            Bem-vindo ao AGRONEX. Siga os passos abaixo para registrar sua
            propriedade.
          </p>
        </div>

        <div className="mb-8">
          <Stepper steps={steps} currentStep={1} />
        </div>

        <div className="w-full max-w-3xl rounded-2xl border border-agronex-border bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold text-gray-900">
            Dados Pessoais ou Empresariais
          </h2>

          <form onSubmit={handleNext} className="space-y-6">
            <div className="grid gap-5 md:grid-cols-2">
              <Select
                label="Tipo de Pessoa"
                required
                defaultValue="pf"
                options={[
                  { value: "pf", label: "Pessoa Física" },
                  { value: "pj", label: "Pessoa Jurídica" },
                ]}
              />
              <Input
                label="Nome / Razão Social"
                required
                placeholder="Ex: João da Silva ou Agrícola Silva Ltda"
              />
              <Input
                label="CPF / CNPJ"
                required
                placeholder="000.000.000-00"
                helperText="Digite apenas números."
              />
              <Input
                label="Inscrição Estadual"
                placeholder="Opcional se Isento"
              />
            </div>

            <div className="flex justify-end border-t border-agronex-border pt-6">
              <Button type="submit">
                Próximo
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>

      <AppFooter brand="AGRONEX" variant="compact" />
    </div>
  );
}
