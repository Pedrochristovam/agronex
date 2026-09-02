"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  getLoteStepHref,
  getNextStepSlug,
  getPrevStepSlug,
  type LoteWizardSlug,
} from "@/lib/lote-wizard";

interface LoteWizardActionsProps {
  currentSlug: LoteWizardSlug;
  onNext?: () => void;
  nextLabel?: string;
  showDraft?: boolean;
}

export function LoteWizardActions({
  currentSlug,
  onNext,
  nextLabel = "Próximo Passo",
  showDraft = true,
}: LoteWizardActionsProps) {
  const router = useRouter();
  const prevSlug = getPrevStepSlug(currentSlug);
  const nextSlug = getNextStepSlug(currentSlug);

  const handleNext = () => {
    if (onNext) {
      onNext();
    } else if (nextSlug) {
      router.push(getLoteStepHref(nextSlug));
    }
  };

  return (
    <div className="flex items-center justify-between border-t border-agronex-border pt-6">
      {prevSlug ? (
        <Link
          href={getLoteStepHref(prevSlug)}
          className="inline-flex items-center gap-2 text-sm font-medium text-agronex-green hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Link>
      ) : (
        <Link
          href="/produtor/lotes"
          className="inline-flex items-center gap-2 text-sm font-medium text-agronex-green hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Link>
      )}

      <div className="flex items-center gap-3">
        {showDraft && (
          <button
            type="button"
            className="text-sm font-medium text-agronex-muted hover:text-gray-900"
          >
            Salvar Rascunho
          </button>
        )}
        <Button type="button" onClick={handleNext} className="gap-2">
          {nextLabel}
          {nextLabel.includes("Passo") && <ArrowRight className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
