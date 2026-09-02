import { cn } from "@/lib/utils";
import {
  logisticaStatusConfig,
  type LogisticaStatus,
} from "@/lib/logistica-data";

interface LogisticaStatusBadgeProps {
  status: LogisticaStatus;
  className?: string;
}

export function LogisticaStatusBadge({
  status,
  className,
}: LogisticaStatusBadgeProps) {
  const config = logisticaStatusConfig[status];

  const variants = {
    success: "bg-green-100 text-green-800",
    warning: "bg-amber-100 text-amber-800",
    danger: "bg-red-100 text-red-800",
    neutral: "bg-gray-100 text-gray-700",
    info: "bg-emerald-100 text-emerald-800",
  };

  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[config.variant],
        className,
      )}
    >
      {config.label}
    </span>
  );
}
