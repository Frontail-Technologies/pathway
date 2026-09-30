'use client'

import * as React from 'react'
import type {
  AdminPromotion,
  PromotionKind,
  PromotionTargetType,
  PromotionPlacement,
  PromotionStatus,
} from '@/features/admin/data/admin-promotions'
import {
  getTargetOptionsForType,
  promotionPlacementMap,
  promotionTargetTypeMap,
} from '@/features/admin/data/admin-promotions'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { AlertCircle, Sparkles, DollarSign } from 'lucide-react'

export function PromotionEditorForm({
  initialPromotion,
  isCreate = false,
}: {
  initialPromotion?: AdminPromotion
  isCreate?: boolean
}) {
  const [kind, setKind] = React.useState<PromotionKind>(initialPromotion?.kind ?? 'featured')
  const [targetType, setTargetType] = React.useState<PromotionTargetType>(
    initialPromotion?.targetType ?? 'institution'
  )
  const [targetId, setTargetId] = React.useState<string>(initialPromotion?.targetId ?? '')
  const [placement, setPlacement] = React.useState<PromotionPlacement>(
    initialPromotion?.placement ?? 'home_featured_colleges'
  )
  const [status, setStatus] = React.useState<PromotionStatus>(
    initialPromotion?.status ?? 'active'
  )
  const [label, setLabel] = React.useState<string>(initialPromotion?.label ?? '')
  const [startsAt, setStartsAt] = React.useState<string>(
    initialPromotion?.startsAt ? initialPromotion.startsAt.split('T')[0] : ''
  )
  const [endsAt, setEndsAt] = React.useState<string>(
    initialPromotion?.endsAt ? initialPromotion.endsAt.split('T')[0] : ''
  )
  const [priority, setPriority] = React.useState<string>(
    initialPromotion?.priority !== undefined ? String(initialPromotion.priority) : '10'
  )
  const [notes, setNotes] = React.useState<string>(initialPromotion?.notes ?? '')

  const targetOptions = React.useMemo(() => {
    return getTargetOptionsForType(targetType)
  }, [targetType])

  
  React.useEffect(() => {
    if (targetOptions.length > 0 && !targetOptions.some((opt) => opt.id === targetId)) {
      setTargetId(targetOptions[0].id)
    }
  }, [targetType, targetOptions, targetId])

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
      <Card className="border-0 shadow-xs">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-bold font-heading">
            Placement Nature & Classification
          </CardTitle>
          <CardDescription className="text-xs">
            Specify whether this promotion is an editorial curation or a paid commercial placement.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setKind('featured')}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                kind === 'featured'
                  ? 'border-amber-400 bg-amber-50/50 ring-1 ring-amber-400'
                  : 'border-border/70 hover:border-border bg-card'
              }`}
            >
              <div className="flex items-center gap-2 font-semibold text-xs text-foreground">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Featured (Editorial)</span>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1 leading-normal">
                Academic selection highlighted for curriculum quality or popularity. No commercial tags.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setKind('sponsored')}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                kind === 'sponsored'
                  ? 'border-purple-400 bg-purple-50/50 ring-1 ring-purple-400'
                  : 'border-border/70 hover:border-border bg-card'
              }`}
            >
              <div className="flex items-center gap-2 font-semibold text-xs text-foreground">
                <DollarSign className="w-4 h-4 text-purple-600" />
                <span>Sponsored (Commercial)</span>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1 leading-normal">
                Commercially promoted placement. Mandatory public Sponsored badge will be rendered.
              </p>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Placement Slot
              </label>
              <Select
                value={placement}
                onValueChange={(val) => setPlacement((val as PromotionPlacement) ?? 'home_featured_colleges')}
              >
                <SelectTrigger className="h-9 text-xs bg-background">
                  <SelectValue placeholder="Select Placement" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(promotionPlacementMap).map(([key, meta]) => (
                    <SelectItem key={key} value={key} className="text-xs">
                      {meta.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Display Label (Optional)
              </label>
              <Input
                placeholder="e.g. Featured College Spotlight"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="h-9 text-xs bg-background"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-xs">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-bold font-heading">
            Target Canonical Entity
          </CardTitle>
          <CardDescription className="text-xs">
            Link an authoritative Pathway institution, program, scholarship, tutor, or coaching provider.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Target Entity Type
              </label>
              <Select
                value={targetType}
                onValueChange={(val) => setTargetType((val as PromotionTargetType) ?? 'institution')}
              >
                <SelectTrigger className="h-9 text-xs bg-background">
                  <SelectValue placeholder="Select Entity Type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(promotionTargetTypeMap).map(([key, meta]) => (
                    <SelectItem key={key} value={key} className="text-xs">
                      {meta.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Canonical Record
              </label>
              <Select
                value={targetId}
                onValueChange={(val) => setTargetId(val ?? '')}
              >
                <SelectTrigger className="h-9 text-xs bg-background">
                  <SelectValue placeholder="Select Target Entity" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {targetOptions.map((opt) => (
                    <SelectItem key={opt.id} value={opt.id} className="text-xs">
                      {opt.label} {opt.subtext ? `(${opt.subtext})` : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-xs">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-bold font-heading">
            Schedule & Ordering
          </CardTitle>
          <CardDescription className="text-xs">
            Optional start/end activation dates and relative rendering priority.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Start Date (Optional)
              </label>
              <Input
                type="date"
                value={startsAt}
                onChange={(e) => setStartsAt(e.target.value)}
                className="h-9 text-xs bg-background"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                End Date (Optional)
              </label>
              <Input
                type="date"
                value={endsAt}
                onChange={(e) => setEndsAt(e.target.value)}
                className="h-9 text-xs bg-background"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Display Priority (1–100)
              </label>
              <Input
                type="number"
                min="1"
                max="100"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="h-9 text-xs bg-background"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Initial Status
              </label>
              <Select
                value={status}
                onValueChange={(val) => setStatus((val as PromotionStatus) ?? 'active')}
              >
                <SelectTrigger className="h-9 text-xs bg-background">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active" className="text-xs">Active</SelectItem>
                  <SelectItem value="draft" className="text-xs">Draft</SelectItem>
                  <SelectItem value="paused" className="text-xs">Paused</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-foreground">
                Internal Administrative Notes
              </label>
              <Textarea
                placeholder="Add editorial context or placement arrangement details..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="text-xs bg-background min-h-[80px]"
              />
            </div>
          </div>

          <div className="p-3 bg-muted/20 rounded-lg flex items-start gap-2.5 text-xs text-muted-foreground border border-border/50">
            <AlertCircle className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-semibold text-foreground">API Connection Required</span>
              <p className="text-[11px] leading-relaxed">
                Saving and modifying placement configurations requires connection to the Admin API backend. Changes will not persist in static demo mode.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/60">
            <Button
              type="button"
              disabled
              className="h-9 px-4 text-xs font-semibold bg-primary text-primary-foreground"
            >
              {isCreate ? 'Create Placement' : 'Save Changes'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
