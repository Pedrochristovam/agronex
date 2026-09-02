import {
  Check,
  CheckCircle2,
  Clock,
  Lock,
  LucideIcon,
  Truck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  orderStatusConfig,
  type OrderStatus,
} from "@/lib/pedidos-data";

const statusIcons: Partial<Record<OrderStatus, LucideIcon>> = {
  "em-transito": Truck,
  "aguardando-pagamento": Clock,
  concluido: CheckCircle2,
  "em-garantia": Lock,
};

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const config = orderStatusConfig[status];
  const Icon = statusIcons[status];

  const variantClasses = {
    success: "bg-green-100 text-green-800",
    warning: "bg-orange-100 text-orange-800",
    neutral: "bg-gray-100 text-gray-700",
    info: "bg-emerald-100 text-emerald-800",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantClasses[config.variant],
      )}
    >
      {Icon && <Icon className="h-3 w-3" />}
      {config.label}
    </span>
  );
}

interface OrderProgressStepperProps {
  steps: {
    id: string;
    label: string;
    completed?: boolean;
    current?: boolean;
  }[];
}

export function OrderProgressStepper({ steps }: OrderProgressStepperProps) {
  return (
    <div className="rounded-xl border border-agronex-border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          const isCompleted = step.completed;
          const isCurrent = step.current;

          return (
            <div key={step.id} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2",
                    isCompleted || isCurrent
                      ? "border-agronex-green bg-agronex-green text-white"
                      : "border-gray-200 bg-white text-gray-400",
                  )}
                >
                  {isCompleted && !isCurrent ? (
                    <Check className="h-5 w-5" />
                  ) : isCurrent ? (
                    <Truck className="h-5 w-5" />
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-gray-300" />
                  )}
                </div>
                <span
                  className={cn(
                    "mt-2 text-[10px] font-semibold uppercase tracking-wide sm:text-xs",
                    isCompleted || isCurrent
                      ? "text-agronex-green"
                      : "text-gray-400",
                  )}
                >
                  {step.label}
                </span>
              </div>
              {!isLast && (
                <div
                  className={cn(
                    "mx-2 mb-5 h-0.5 flex-1",
                    isCompleted ? "bg-agronex-green" : "bg-gray-200",
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
