"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Building2,
  Coffee,
  Leaf,
  MapPin,
  Shield,
  Sprout,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { Stepper } from "@/components/ui/Stepper";
import { cn } from "@/lib/utils";

const steps = [
  { number: 1, label: "Empresa" },
  { number: 2, label: "Demanda" },
  { number: 3, label: "Revisão" },
];

const categories = [
  { id: "soja", label: "Soja", icon: Leaf },
  { id: "milho", label: "Milho", icon: Sprout },
  { id: "cafe", label: "Café", icon: Coffee },
  { id: "algodao", label: "Algodão", icon: Sprout },
];

export default function CadastroCompradorPage() {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/verificar-email");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 p-4 md:p-8">
      <div className="flex w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* Sidebar */}
        <div className="relative hidden w-72 flex-shrink-0 flex-col justify-between bg-agronex-green-dark p-8 text-white md:flex lg:w-80">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="relative">
            <h1 className="text-3xl font-bold tracking-widest">AGRONEX</h1>
            <p className="mt-2 text-sm text-white/80">
              Cadastro de Comprador B2B
            </p>
          </div>
          <div className="relative space-y-4">
            <div className="flex items-start gap-3">
              <Shield className="mt-0.5 h-5 w-5 flex-shrink-0 text-agronex-accent" />
              <p className="text-sm text-white/90">
                Acesso à maior rede de produtores verificados
              </p>
            </div>
            <div className="flex items-start gap-3">
              <TrendingUp className="mt-0.5 h-5 w-5 flex-shrink-0 text-agronex-accent" />
              <p className="text-sm text-white/90">
                Dados de safra e logística em tempo real
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 p-6 md:p-10">
          <div className="mb-8">
            <Stepper steps={steps} currentStep={1} variant="buyer" />
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Dados Cadastrais</h2>
            <p className="mt-1 text-sm text-agronex-muted">
              Insira as informações oficiais da sua empresa para validação B2B
            </p>
          </div>

          <form onSubmit={handleContinue} className="space-y-5">
            <Input
              label="Razão Social"
              required
              placeholder="Nome oficial da empresa"
              icon={Building2}
            />

            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="CNPJ"
                required
                placeholder="00.000.000/0000-00"
              />
              <Input
                label="Localização da Sede"
                required
                placeholder="Cidade, Estado"
                icon={MapPin}
              />
            </div>

            <Select
              label="Volume Estimado (Mensal)"
              required
              defaultValue=""
              options={[
                { value: "", label: "Selecione uma faixa" },
                { value: "ate-100", label: "Até 100 toneladas" },
                { value: "100-500", label: "100 a 500 toneladas" },
                { value: "500-1000", label: "500 a 1.000 toneladas" },
                { value: "1000+", label: "Acima de 1.000 toneladas" },
              ]}
            />

            <div>
              <label className="mb-3 block text-sm font-medium text-agronex-green">
                Categorias de Interesse Primário
              </label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = selectedCategories.includes(cat.id);
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => toggleCategory(cat.id)}
                      className={cn(
                        "flex items-center gap-2 rounded-lg border-2 px-4 py-3 text-sm font-medium transition-colors",
                        isSelected
                          ? "border-agronex-green bg-green-50 text-agronex-green"
                          : "border-agronex-border text-gray-700 hover:border-agronex-green/50",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-agronex-border pt-6">
              <Link
                href="/cadastro"
                className="text-sm font-medium text-agronex-green hover:underline"
              >
                ← Voltar
              </Link>
              <Button type="submit">
                Continuar
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
