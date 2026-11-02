'use client'

import { Target, ShieldAlert, Globe } from 'lucide-react'
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
    <section id="target" className="scroll-mt-20 space-y-4 rounded-lg border border-border bg-card p-5 sm:p-6">
      <h2 className="text-[15px] font-semibold text-foreground">Target Page / Canonical Entity</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-foreground">
              Target Type <span className="text-destructive">*</span>
            </Label>
            <Select
              value={targetType || undefined}
              onValueChange={(val) => {
                if (val) onTargetTypeChange(val as SeoTargetType)
              }}
              disabled={isEditing}
            >
              <SelectTrigger className="h-9 text-sm bg-background">
                <SelectValue placeholder="Select target type" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(seoTargetTypeMap).map(([key, meta]) => (
                  <SelectItem key={key} value={key} className="text-sm">
                    {meta.label}
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
                Choose the public page category or entity type to target.
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-foreground">
              Target Page / Entity <span className="text-destructive">*</span>
            </Label>
            <Select
              value={targetId || undefined}
              onValueChange={(val) => {
                if (val) onTargetIdChange(val)
              }}
              disabled={isEditing || !targetType}
            >
              <SelectTrigger className="h-9 text-sm bg-background">
                <SelectValue placeholder={!targetType ? 'Select target type first' : 'Select specific target'} />
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
                <Globe className="w-3 h-3" />
                <span>Resolved route: </span>
                <code className="font-mono text-xs bg-muted/60 px-1 py-0.5 rounded">
                  {selectedOption?.routePath || targetId}
                </code>
              </p>
            ) : (
              <p className="text-[13px] text-muted-foreground">
                {!targetType ? 'Disabled until target type is selected.' : 'Select the specific route or entity.'}
              </p>
            )}
          </div>
        </div>

        <div className="p-3 rounded-lg bg-muted/20 border border-border/60 text-[13px] text-muted-foreground flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Public Surface Only:</strong> Private authenticated routes (
              <code className="font-mono text-xs">/admin/*</code>,{' '}
              <code className="font-mono text-xs">/student/*</code>,{' '}
              <code className="font-mono text-xs">/login</code>,{' '}
              <code className="font-mono text-xs">/register</code>
            ) are strictly excluded from SEO configuration to prevent accidental exposure of private areas.
          </p>
        </div>
      </div>
    </section>
  )
}
