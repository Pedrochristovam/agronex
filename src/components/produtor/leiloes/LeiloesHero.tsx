import Link from "next/link";
import { ChevronRight, Radio, Search, Sprout } from "lucide-react";

export function LeiloesHero() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-agronex-green-dark via-agronex-green to-agronex-green-light">
      {/* Textura sutil */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=60')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-agronex-green-dark/95 via-agronex-green/85 to-agronex-green-light/70" />

      <div className="relative px-6 py-8 lg:px-10 lg:py-10">
        <nav className="mb-5 flex items-center gap-1.5 text-sm text-white/60">
          <Link href="/produtor/visao-geral" className="hover:text-white">
            Início
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-medium text-agronex-accent">Leilões</span>
        </nav>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
              <Radio className="h-3 w-3 text-red-400" />
              Pregão eletrônico Agronex
            </div>
            <h1 className="text-2xl font-bold leading-tight text-white lg:text-3xl">
              Leilões de lotes agrícolas
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-white/75 lg:text-base">
              Lance em grãos, café e insumos de produtores verificados. Transparência
              total, rastreabilidade e pagamento seguro.
            </p>
          </div>

          <div className="flex gap-6 text-center text-white">
            {[
              { value: "3", label: "Ao vivo" },
              { value: "847", label: "Compradores" },
              { value: "R$ 4,2 mi", label: "Volume hoje" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-xl font-bold lg:text-2xl">{stat.value}</p>
                <p className="text-[10px] uppercase tracking-wider text-white/50">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Busca rápida */}
        <div className="mt-8 flex max-w-2xl overflow-hidden rounded-xl border border-white/20 bg-white/10 shadow-lg backdrop-blur-md">
          <div className="flex flex-1 items-center gap-3 px-4 py-3">
            <Search className="h-4 w-4 text-white/50" />
            <input
              type="search"
              placeholder="Buscar por produto, fazenda ou região..."
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
            />
          </div>
          <Link
            href="#lotes"
            className="flex items-center gap-2 bg-agronex-accent px-5 py-3 text-sm font-bold text-agronex-green-dark transition-colors hover:bg-green-300"
          >
            <Sprout className="h-4 w-4" />
            Explorar
          </Link>
        </div>
      </div>
    </section>
  );
}
