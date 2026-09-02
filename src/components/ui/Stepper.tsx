import { cn } from "@/lib/utils";

interface Step {
  number: number;
  label: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  variant?: "default" | "buyer";
}

export function Stepper({ steps, currentStep, variant = "default" }: StepperProps) {
  return (
    <div className="flex items-center justify-center gap-0">
      {steps.map((step, index) => {
        const isActive = step.number === currentStep;
        const isCompleted = step.number < currentStep;
        const isLast = index === steps.length - 1;

        return (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                  isActive || isCompleted
                    ? variant === "buyer"
                      ? "bg-gray-900 text-white"
                      : "bg-agronex-green text-white"
                    : "border-2 border-gray-300 bg-white text-gray-500",
                )}
              >
                {step.number}
              </div>
              <span
                className={cn(
                  "whitespace-nowrap text-xs font-medium",
                  isActive ? "text-agronex-green" : "text-gray-500",
                )}
              >
                {step.label}
              </span>
            </div>
            {!isLast && (
              <div
                className={cn(
                  "mx-4 mb-5 h-0.5 w-16 sm:w-24",
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
