import { Camera } from "lucide-react";

interface FileUploadZoneProps {
  label?: string;
  hint?: string;
  accept?: string;
}

export function FileUploadZone({
  label = "Clique para adicionar fotos ou arraste e solte aqui",
  hint = "JPG, PNG — máx. 5MB",
  accept = "image/jpeg,image/png",
}: FileUploadZoneProps) {
  return (
    <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-agronex-border bg-gray-50 px-6 py-10 transition-colors hover:border-agronex-green hover:bg-green-50/50">
      <input type="file" className="hidden" accept={accept} multiple />
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
        <Camera className="h-6 w-6 text-agronex-green" />
      </div>
      <p className="text-sm font-medium text-gray-700">{label}</p>
      <p className="mt-1 text-xs text-agronex-muted">{hint}</p>
    </label>
  );
}

interface DocumentUploadCardProps {
  title: string;
  status: "pending" | "uploaded";
  fileName?: string;
  fileSize?: string;
  uploadedAgo?: string;
}

export function DocumentUploadCard({
  title,
  status,
  fileName,
  fileSize,
  uploadedAgo,
}: DocumentUploadCardProps) {
  return (
    <div className="rounded-xl border border-agronex-border p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-900">{title}</span>
        <span
          className={
            status === "uploaded"
              ? "rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800"
              : "rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-800"
          }
        >
          {status === "uploaded" ? "Enviado" : "Pendente"}
        </span>
      </div>
      {status === "pending" ? (
        <>
          <p className="mb-3 text-xs text-agronex-muted">
            Arraste ou clique para enviar (PDF, JPG)
          </p>
          <label className="inline-flex cursor-pointer rounded-lg border border-agronex-border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
            Procurar
          </label>
        </>
      ) : (
        <div className="flex items-center gap-2 text-sm text-agronex-muted">
          <span className="font-medium text-gray-900">{fileName}</span>
          <span>•</span>
          <span>
            {fileSize} • {uploadedAgo}
          </span>
        </div>
      )}
    </div>
  );
}
