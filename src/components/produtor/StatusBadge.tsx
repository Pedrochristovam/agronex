import { cn } from "@/lib/utils";

type StatusVariant = "success" | "warning" | "info" | "neutral" | "danger";

const variants: Record<StatusVariant, string> = {
  success: "bg-green-100 text-green-800",
  warning: "bg-orange-100 text-orange-800",
  info: "bg-blue-100 text-blue-800",
  neutral: "bg-gray-100 text-gray-700",
  danger: "bg-red-100 text-red-800",
};

interface StatusBadgeProps {
  label: string;
  variant?: StatusVariant;
}

export function StatusBadge({ label, variant = "neutral" }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
      )}
    >
      {label}
    </span>
  );
}
