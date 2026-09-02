"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      router.push("/produtor/visao-geral");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Hero */}
      <div className="relative hidden w-1/2 lg:block">
        <Image
          src="/images/login-hero.png"
          alt="Campo agrícola com tecnologia de precisão"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-12 text-center text-white">
          <h1 className="text-5xl font-bold tracking-widest">AGRONEX</h1>
          <p className="mt-4 max-w-md text-lg text-white/90">
            Tecnologia de Precisão para o Futuro do Agronegócio.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="flex w-full flex-col items-center justify-center bg-[#f5f6f7] px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md rounded-2xl border border-agronex-border bg-white p-8 shadow-sm">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-agronex-green">
              Acessar Plataforma
            </h2>
            <p className="mt-1 text-sm text-agronex-muted">
              Insira suas credenciais para continuar.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="E-mail"
              type="email"
              placeholder="seu@email.com"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Senha"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              icon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              labelAction={
                <Link
                  href="/recuperar-senha"
                  className="text-xs font-medium text-agronex-green hover:underline"
                >
                  Esqueci minha senha
                </Link>
              }
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              }
            />

            <Button type="submit" size="lg" className="mt-2">
              Entrar
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-agronex-muted">
            Ainda não possui acesso?{" "}
            <Link
              href="/cadastro"
              className="font-semibold text-agronex-green hover:underline"
            >
              Criar nova conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
