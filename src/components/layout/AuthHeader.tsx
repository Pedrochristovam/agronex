import Link from "next/link";

interface AuthHeaderProps {
  brand?: "AGRONEX" | "AGRONEX WEB";
}

export function AuthHeader({ brand = "AGRONEX WEB" }: AuthHeaderProps) {
  return (
    <header className="border-b border-agronex-border bg-white px-6 py-4">
      <div className="mx-auto max-w-6xl">
        <Link href="/login" className="text-lg font-bold tracking-wide text-agronex-green">
          {brand}
        </Link>
      </div>
    </header>
  );
}
