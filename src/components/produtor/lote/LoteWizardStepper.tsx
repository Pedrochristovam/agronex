import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { LOTE_WIZARD_STEPS } from "@/lib/lote-wizard";

interface LoteWizardStepperProps {
  currentStep: number;
  compact?: boolean;
}

export function LoteWizardStepper({ currentStep, compact }: LoteWizardStepperProps) {
  return (
    <div className="flex items-center justify-center overflow-x-auto pb-2">
      {LOTE_WIZARD_STEPS.map((step, index) => {
        const isActive = step.number === currentStep;
        const isCompleted = step.number < currentStep;
        const isLast = index === LOTE_WIZARD_STEPS.length - 1;

        return (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors sm:h-9 sm:w-9 sm:text-sm",
                  isCompleted
                    ? "bg-agronex-green text-white"
                    : isActive
                      ? "bg-agronex-green text-white ring-4 ring-green-100"
                      : "border-2 border-gray-300 bg-white text-gray-400",
                )}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : step.number}
              </div>
              {!compact && (
                <span
                  className={cn(
                    "hidden text-[10px] font-medium sm:block sm:text-xs",
                    isActive || isCompleted
                      ? "text-agronex-green"
                      : "text-gray-400",
                  )}
                >
                  {step.label}
                </span>
              )}
            </div>
            {!isLast && (
              <div
                className={cn(
                  "mx-1 mb-4 h-0.5 w-6 sm:mx-2 sm:mb-5 sm:w-10 md:w-14",
                  isCompleted ? "bg-agronex-green" : "bg-gray-200",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

interface LoteWizardProgressSidebarProps {
  currentStep: number;
}

export function LoteWizardProgressSidebar({
  currentStep,
}: LoteWizardProgressSidebarProps) {
  return (
    <div className="w-full max-w-xs">
      <h3 className="mb-4 text-sm font-semibold text-gray-900">Progresso</h3>
      <div className="space-y-1">
        {LOTE_WIZARD_STEPS.map((step) => {
          const isActive = step.number === currentStep;
          const isCompleted = step.number < currentStep;

          return (
            <div
              key={step.number}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5",
                isActive && "bg-green-50",
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                  isCompleted
                    ? "bg-agronex-green text-white"
                    : isActive
                      ? "bg-agronex-green text-white"
                      : "border-2 border-gray-200 text-gray-400",
                )}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : step.number}
              </div>
              <div>
                <p
                  className={cn(
                    "text-sm font-medium",
                    isActive || isCompleted ? "text-gray-900" : "text-gray-400",
                  )}
                >
                  {step.label}
                </p>
                {isActive && step.number === 7 && (
                  <p className="text-xs text-agronex-muted">Etapa Final</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
