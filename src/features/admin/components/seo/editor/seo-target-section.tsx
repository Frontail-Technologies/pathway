'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import {
  SeoTargetType,
  seoTargetTypeMap,
  SeoTargetOption,
} from '@/features/seo/types/seo-metadata'
import { seoTargetTypeLabels, seoTargetTypeOptions } from '../shared/seo-meta'

interface SeoTargetSectionProps {
  targetType: SeoTargetType | ''
  targetId: string
  targetOptions: SeoTargetOption[]
  onTargetTypeChange: (type: SeoTargetType) => void
  onTargetIdChange: (id: string) => void
  isEditing?: boolean
  typeError?: string
  error?: string
}

export function SeoTargetSection({
  targetType,
  targetId,
  targetOptions,
  onTargetTypeChange,
  onTargetIdChange,
  isEditing = false,
  typeError,
  error,
}: SeoTargetSectionProps) {
  const selectedOption = targetOptions.find((o) => o.id === targetId)

  return (
    <section id="target" className="scroll-mt-20 space-y-4 rounded-xl border border-border bg-card shadow-sm p-5 sm:p-6">
      <h2 className="text-[15px] font-semibold text-foreground">Page</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-foreground">
              Type <span className="text-destructive">*</span>
            </Label>
            <Select
              items={seoTargetTypeOptions}
              value={targetType || undefined}
              onValueChange={(val) => {
                if (val) onTargetTypeChange(val as SeoTargetType)
              }}
              disabled={isEditing}
            >
              <SelectTrigger className="h-9 text-sm bg-background">
                <SelectValue placeholder="Choose a type" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(seoTargetTypeMap).map(([key, meta]) => (
                  <SelectItem key={key} value={key} className="text-sm">
                    {seoTargetTypeLabels[key as SeoTargetType] ?? meta.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {typeError ? (
              <p className="text-[13px] text-destructive">{typeError}</p>
            ) : targetType ? (
              <p className="text-[13px] text-muted-foreground">
                {seoTargetTypeMap[targetType]?.description}
              </p>
            ) : (
              <p className="text-[13px] text-muted-foreground">
                What kind of page this override is for.
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-foreground">
              Page <span className="text-destructive">*</span>
            </Label>
            <Select
              items={targetOptions.map((opt) => ({ value: opt.id, label: opt.label }))}
              value={targetId || undefined}
              onValueChange={(val) => {
                if (val) onTargetIdChange(val)
              }}
              disabled={isEditing || !targetType}
            >
              <SelectTrigger className="h-9 text-sm bg-background">
                <SelectValue placeholder={!targetType ? 'Choose a type first' : 'Choose a page'} />
              </SelectTrigger>
              <SelectContent className="max-h-64">
                {targetOptions.map((opt) => (
                  <SelectItem key={opt.id} value={opt.id} className="text-sm">
                    <div className="flex flex-col text-left">
                      <span>{opt.label}</span>
                      {opt.sublabel && (
                        <span className="text-xs text-muted-foreground">
                          {opt.sublabel}
                        </span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {error ? (
              <p className="text-[13px] text-destructive">{error}</p>
            ) : targetId ? (
              <p className="text-[13px] text-muted-foreground flex items-center gap-1">
                <span>Path: </span>
                <code className="font-mono text-xs bg-muted/60 px-1 py-0.5 rounded">
                  {selectedOption?.routePath || targetId}
                </code>
              </p>
            ) : (
              <p className="text-[13px] text-muted-foreground">
                {!targetType ? 'Choose a type first.' : 'The public page this applies to.'}
              </p>
            )}
          </div>
        </div>

        <p className="text-[13px] text-muted-foreground">Only public pages can have SEO settings. Admin, student and sign-in pages are excluded.</p>
      </div>
    </section>
  )
}
