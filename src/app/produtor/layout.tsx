import { ProdutorShell } from "@/components/produtor/ProdutorShell";

export default function ProdutorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProdutorShell>{children}</ProdutorShell>;
}
