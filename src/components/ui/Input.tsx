import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  icon?: LucideIcon;
  rightElement?: React.ReactNode;
  labelAction?: React.ReactNode;
}

export function Input({
  label,
  helperText,
  icon: Icon,
  rightElement,
  labelAction,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      {(label || labelAction) && (
        <div className="flex items-center justify-between">
          {label && (
            <label
              htmlFor={inputId}
              className="text-sm font-medium text-agronex-green"
            >
              {label}
              {props.required && <span className="text-red-500"> *</span>}
            </label>
          )}
          {labelAction}
        </div>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        )}
        <input
          id={inputId}
          className={cn(
            "w-full rounded-lg border border-agronex-border bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors focus:border-agronex-green focus:ring-2 focus:ring-agronex-green/20",
            Icon && "pl-10",
            rightElement && "pr-10",
            className,
          )}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
      {helperText && (
        <p className="text-xs text-agronex-muted">{helperText}</p>
      )}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, options, className, id, ...props }: SelectProps) {
  const selectId = id || label?.toLowerCase().replace(/\s/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={selectId}
          className="text-sm font-medium text-agronex-green"
        >
          {label}
          {props.required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <select
        id={selectId}
        className={cn(
          "w-full rounded-lg border border-agronex-border bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-agronex-green focus:ring-2 focus:ring-agronex-green/20",
          className,
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
