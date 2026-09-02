import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { DocumentStatusBadge } from "@/components/produtor/documentos/DocumentStatusBadge";
import { getDocumentoBySlug } from "@/lib/documentos-data";

interface DocumentoDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function DocumentoDetailPage({
  params,
}: DocumentoDetailPageProps) {
  const { slug } = await params;
  const doc = getDocumentoBySlug(slug);

  if (!doc || doc.certificado) {
    notFound();
  }

  return (
    <div className="p-6 lg:p-8">
      <Link
        href="/produtor/documentos"
        className="mb-4 inline-flex items-center gap-1 text-sm text-agronex-green hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        Meus Documentos
      </Link>

      <div className="max-w-2xl rounded-xl border border-agronex-border bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{doc.titulo}</h1>
            <p className="text-sm text-agronex-muted">ID: {doc.id}</p>
          </div>
          <DocumentStatusBadge status={doc.status} />
        </div>

        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-agronex-muted">Tipo</dt>
            <dd className="font-medium">{doc.tipo}</dd>
          </div>
          <div>
            <dt className="text-agronex-muted">Emissão</dt>
            <dd className="font-medium">{doc.emissao}</dd>
          </div>
          <div>
            <dt className="text-agronex-muted">Validade</dt>
            <dd className={doc.validadeExpired ? "font-medium text-red-600" : "font-medium"}>
              {doc.validade}
            </dd>
          </div>
        </dl>

        {doc.status === "pendente" && (
          <Link
            href="/produtor/documentos/novo"
            className="mt-6 inline-block text-sm font-semibold text-agronex-green hover:underline"
          >
            Reenviar documento →
          </Link>
        )}
      </div>
    </div>
  );
}
