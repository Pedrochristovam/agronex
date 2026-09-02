import Link from "next/link";

const footerLinks = [
  { label: "Termos de Uso", href: "#" },
  { label: "Política de Privacidade", href: "#" },
  { label: "Central de Ajuda", href: "#" },
  { label: "Cookies", href: "#" },
];

interface AppFooterProps {
  variant?: "default" | "compact" | "auth";
  brand?: "AGRONEX" | "AGRONEX WEB";
}

export function AppFooter({
  variant = "default",
  brand = "AGRONEX WEB",
}: AppFooterProps) {
  if (variant === "auth") {
    return (
      <footer className="border-t border-agronex-border bg-white px-6 py-4">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-sm text-agronex-muted md:flex-row">
          <div className="flex items-center gap-4">
            <span className="font-bold text-agronex-green">{brand}</span>
            <span>© 2024 AGRONEX. Tecnologia para o Agronegócio Sustentável.</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-agronex-green transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    );
  }

  if (variant === "compact") {
    return (
      <footer className="border-t border-agronex-border bg-[#f0f1f2] px-6 py-5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-agronex-muted lg:flex-row">
          <span className="font-bold text-agronex-green">{brand}</span>
          <div className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-agronex-green transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <span>© 2024 AGRONEX. Tecnologia para o Agronegócio Sustentável.</span>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-agronex-border bg-[#f0f1f2] px-6 py-5">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-agronex-muted lg:flex-row">
        <span className="font-bold text-agronex-green">{brand}</span>
        <div className="flex flex-wrap justify-center gap-6">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-agronex-green transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <span>© 2024 AGRONEX. Tecnologia para o Agronegócio Sustentável.</span>
      </div>
    </footer>
  );
}
