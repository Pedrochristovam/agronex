import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: string;
  trendPositive?: boolean;
  icon: LucideIcon;
  action?: React.ReactNode;
  valueClassName?: string;
}

export function MetricCard({
  title,
  value,
  subtitle,
  trend,
  trendPositive,
  icon: Icon,
  action,
  valueClassName,
}: MetricCardProps) {
  return (
    <div className="rounded-xl border border-agronex-border bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-agronex-muted">
            {title}
          </p>
          <p className={cn("mt-2 text-2xl font-bold text-gray-900", valueClassName)}>
            {value}
          </p>
          {trend && (
            <p
              className={cn(
                "mt-1 text-xs font-medium",
                trendPositive ? "text-green-600" : "text-red-600",
              )}
            >
              {trend}
            </p>
          )}
          {subtitle && (
            <p className="mt-1 text-xs text-agronex-muted">{subtitle}</p>
          )}
          {action}
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
          <Icon className="h-5 w-5 text-agronex-green" />
        </div>
      </div>
    </div>
  );
}
