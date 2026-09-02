"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, BarChart3, Tractor, Truck } from "lucide-react";
import { AppFooter } from "@/components/layout/AppFooter";
import { Button } from "@/components/ui/Button";
import { cn, ROLE_ROUTES, type UserRole } from "@/lib/utils";

const roles = [
  {
    id: "produtor" as UserRole,
    icon: Tractor,
    title: "Sou Produtor",
    description:
      "Gerencie sua safra, acompanhe cotações e negocie diretamente com compradores.",
  },
  {
    id: "comprador" as UserRole,
    icon: BarChart3,
    title: "Sou Comprador",
    description:
      "Encontre produtores, analise dados de mercado e garanta suprimentos de qualidade.",
  },
  {
    id: "transportador" as UserRole,
    icon: Truck,
    title: "Sou Transportador",
    description:
      "Conecte-se com demandas de frete, otimize rotas e gerencie sua frota logística.",
  },
];

export default function CadastroPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const handleContinue = () => {
    if (selectedRole) {
      router.push(ROLE_ROUTES[selectedRole]);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f6f7]">
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <h1 className="mb-8 text-2xl font-bold tracking-wide text-agronex-green">
          AGRONEX WEB
        </h1>

        <div className="w-full max-w-4xl rounded-2xl border border-agronex-border bg-white p-8 shadow-sm md:p-12">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-agronex-green">
              Bem-vindo ao Agronex
            </h2>
            <p className="mt-2 text-sm text-agronex-muted">
              Como você deseja utilizar a plataforma?
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {roles.map((role) => {
              const Icon = role.icon;
              const isSelected = selectedRole === role.id;

              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={cn(
                    "flex flex-col items-center rounded-xl border-2 p-6 text-center transition-all hover:border-agronex-green/50",
                    isSelected
                      ? "border-agronex-green bg-green-50/50 shadow-sm"
                      : "border-agronex-border bg-white",
                  )}
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                    <Icon className="h-6 w-6 text-gray-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{role.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-agronex-muted">
                    {role.description}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="mt-10 flex justify-center">
            <Button
              onClick={handleContinue}
              disabled={!selectedRole}
              className={cn(
                "min-w-[160px]",
                !selectedRole && "bg-gray-300 hover:bg-gray-300",
              )}
            >
              Continuar
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <p className="mt-6 text-center text-sm text-agronex-muted">
            Já possui conta?{" "}
            <Link href="/login" className="font-semibold text-agronex-green hover:underline">
              Fazer login
            </Link>
          </p>
        </div>
      </div>

      <AppFooter variant="compact" />
    </div>
  );
}
