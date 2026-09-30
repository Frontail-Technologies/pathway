import * as React from 'react'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Banknote, Check } from 'lucide-react'

export function AdmissionsFeesEditorHeader({
  isEdit,
  offeringTitle,
  backHref,
  onCancel,
  onSave,
}: {
  isEdit: boolean
  offeringTitle?: string
  backHref: string
  onCancel: () => void
  onSave: (e: React.FormEvent) => void
}) {
  return (
    <div>
      <Link
        href={backHref}
        className={buttonVariants({
          variant: 'ghost',
          size: 'sm',
          className: 'text-xs font-semibold text-muted-foreground hover:text-foreground -ml-2 mb-3 inline-flex',
        })}
      >
        <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
        {isEdit ? 'Back to Offering Details' : 'Back to Admissions & Fees'}
      </Link>

      <div className="bg-card rounded-xl p-5 sm:p-6 shadow-xs border-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center shrink-0">
            <Banknote className="w-6 h-6" />
          </div>

          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold font-heading text-foreground truncate">
                {isEdit ? `Edit: ${offeringTitle}` : 'Create Program Offering'}
              </h1>
              <Badge
                variant="secondary"
                className="text-xs font-semibold px-2 py-0.5 bg-primary/10 text-primary border-0"
              >
                {isEdit ? 'Editing Offering' : 'New Offering Draft'}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              {isEdit
                ? 'Update fee schedules, entrance exams, eligibility thresholds, and admission procedures.'
                : 'Configure fee structure and admission criteria for an Institution × Program offering.'}
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2.5 shrink-0">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onCancel}
            className="text-xs font-semibold"
          >
            Cancel
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={onSave}
            className="text-xs font-semibold gap-1.5 shadow-xs"
          >
            <Check className="w-3.5 h-3.5" />
            Save Offering
          </Button>
        </div>
      </div>
    </div>
  )
}
