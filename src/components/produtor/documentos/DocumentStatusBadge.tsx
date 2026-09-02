import { cn } from "@/lib/utils";
import {
  documentStatusConfig,
  type DocumentStatus,
} from "@/lib/documentos-data";

interface DocumentStatusBadgeProps {
  status: DocumentStatus;
}

export function DocumentStatusBadge({ status }: DocumentStatusBadgeProps) {
  const config = documentStatusConfig[status];

  const variants = {
    success: "bg-green-100 text-green-800",
    warning: "bg-orange-100 text-orange-800",
    info: "bg-gray-100 text-gray-700",
    neutral: "bg-gray-100 text-red-700",
    danger: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[config.variant],
      )}
    >
      {config.label}
    </span>
  );
}
