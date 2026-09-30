import * as React from 'react'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Award, Save, X } from 'lucide-react'

export function ScholarshipEditorHeader({
  isEdit,
  scholarshipName,
  onSubmit,
}: {
  isEdit: boolean
  scholarshipName?: string
  onSubmit: (e: React.FormEvent) => void
}) {
  return (
    <div>
      <Link
        href="/admin/scholarships"
        className={buttonVariants({
          variant: 'ghost',
          size: 'sm',
          className: 'text-xs font-semibold text-muted-foreground hover:text-foreground -ml-2 mb-3 inline-flex',
        })}
      >
        <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
        Back to Scholarships
      </Link>

      <div className="bg-card rounded-xl p-5 sm:p-6 shadow-xs border-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5 min-w-0">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>

          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold font-heading text-foreground truncate">
                {isEdit ? `Edit: ${scholarshipName || 'Scholarship Scheme'}` : 'Create New Scholarship Scheme'}
              </h1>
              <Badge
                variant="secondary"
                className="text-xs font-semibold px-2 py-0.5 bg-blue-50 text-blue-700 border-0"
              >
                {isEdit ? 'Scheme Edit' : 'New Scheme'}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              {isEdit
                ? 'Update financial grant parameters, eligibility thresholds, application steps, and circular citations.'
                : 'Configure a new scholarship opportunity, financial support structure, and verification requirements.'}
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2.5 shrink-0">
          <Link
            href="/admin/scholarships"
            className={buttonVariants({
              variant: 'outline',
              size: 'sm',
              className: 'text-xs font-semibold',
            })}
          >
            <X className="w-3.5 h-3.5 mr-1" />
            Cancel
          </Link>
          <Button
            size="sm"
            onClick={onSubmit}
            className="text-xs font-semibold gap-1.5 shadow-xs"
          >
            <Save className="w-3.5 h-3.5" />
            {isEdit ? 'Save Changes' : 'Create Scholarship'}
          </Button>
        </div>
      </div>
    </div>
  )
}
