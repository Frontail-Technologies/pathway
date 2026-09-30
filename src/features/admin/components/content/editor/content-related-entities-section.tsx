'use client'

import * as React from 'react'
import type { ContentFormData } from './use-content-editor'
import {
  RelatedEntityType,
  relatedEntityTypeMap,
} from '@/features/content/types/content'
import {
  getEntityOptionsForType,
  resolveRelatedEntity,
} from '@/features/admin/data/admin-content'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Link2, Plus, Trash2, Building2 } from 'lucide-react'

const entityTypeOptions: { value: RelatedEntityType; label: string }[] = [
  { value: 'institution', label: 'Institution / College' },
  { value: 'program', label: 'Degree Program / Course' },
  { value: 'scholarship', label: 'Scholarship' },
  { value: 'exam', label: 'Entrance Exam' },
  { value: 'tutor', label: 'Individual Tutor' },
  { value: 'coaching', label: 'Coaching Provider' },
]

export function ContentRelatedEntitiesSection({
  formData,
  onAddRelatedEntity,
  onRemoveRelatedEntity,
}: {
  formData: ContentFormData
  onAddRelatedEntity: (entityType: RelatedEntityType, entityId: string) => void
  onRemoveRelatedEntity: (index: number) => void
}) {
  const [selectedType, setSelectedType] = React.useState<RelatedEntityType>('institution')
  const [selectedId, setSelectedId] = React.useState<string>('')

  
  const availableOptions = React.useMemo(() => {
    return getEntityOptionsForType(selectedType)
  }, [selectedType])

  
  React.useEffect(() => {
    if (availableOptions.length > 0) {
      setSelectedId(availableOptions[0].id)
    } else {
      setSelectedId('')
    }
  }, [selectedType, availableOptions])

  const handleAdd = () => {
    if (selectedId) {
      onAddRelatedEntity(selectedType, selectedId)
    }
  }

  return (
    <div id="related" className="bg-card rounded-xl p-5 border border-border/60 shadow-xs space-y-4">
      <div className="flex items-center justify-between gap-2 border-b border-border/50 pb-3">
        <div className="flex items-center gap-2">
          <Link2 className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-bold text-foreground">Linked Canonical Entities</h2>
        </div>
        <Badge variant="secondary" className="text-xs px-2 py-0">
          {formData.relatedEntityRefs.length} Tagged
        </Badge>
      </div>

      <p className="text-xs text-muted-foreground">
        Link canonical platform entities (colleges, courses, scholarships, exams, or educators) referenced in this article.
      </p>

      { }
      <div className="p-4 rounded-lg bg-muted/20 border border-border/60 space-y-3">
        <h4 className="text-xs font-semibold text-foreground">Add Related Entity Reference</h4>
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
          <div className="sm:col-span-4 space-y-1.5">
            <Label htmlFor="entity-type-picker" className="text-[11px] font-medium text-muted-foreground">
              Entity Type
            </Label>
            <Select
              value={selectedType}
              onValueChange={(val) => setSelectedType(val as RelatedEntityType)}
            >
              <SelectTrigger id="entity-type-picker" className="w-full text-xs">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {entityTypeOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="sm:col-span-6 space-y-1.5">
            <Label htmlFor="entity-id-picker" className="text-[11px] font-medium text-muted-foreground">
              Select Record
            </Label>
            <Select value={selectedId} onValueChange={(val) => setSelectedId(val ?? '')}>
              <SelectTrigger id="entity-id-picker" className="w-full text-xs">
                <SelectValue placeholder="Select entity" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {availableOptions.map((opt) => (
                  <SelectItem key={opt.id} value={opt.id}>
                    <span>{opt.label}</span>
                    {opt.subtext && (
                      <span className="text-muted-foreground text-[10px] ml-1.5">
                        ({opt.subtext})
                      </span>
                    )}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="sm:col-span-2">
            <Button
              type="button"
              onClick={handleAdd}
              disabled={!selectedId}
              size="sm"
              className="w-full h-9 text-xs font-semibold"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </div>

      { }
      <div className="space-y-2">
        <Label className="text-xs font-semibold">Currently Linked Entities</Label>
        {formData.relatedEntityRefs.length > 0 ? (
          <div className="space-y-2">
            {formData.relatedEntityRefs.map((ref, idx) => {
              const resolved = resolveRelatedEntity(ref.entityType, ref.entityId)
              return (
                <div
                  key={`${ref.entityType}-${ref.entityId}-${idx}`}
                  className="flex items-center justify-between p-3 rounded-lg border border-border/60 bg-card text-xs gap-3"
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground truncate">
                        {resolved.name}
                      </span>
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 font-normal shrink-0 border-border/60">
                        {resolved.typeLabel}
                      </Badge>
                    </div>
                    {resolved.subtitle && (
                      <p className="text-[11px] text-muted-foreground truncate">
                        {resolved.subtitle}
                      </p>
                    )}
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => onRemoveRelatedEntity(idx)}
                    className="text-destructive hover:bg-destructive/10 shrink-0"
                    aria-label="Remove related entity"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="p-6 text-center bg-muted/10 rounded-lg border border-dashed border-border/70 text-xs text-muted-foreground">
            No entities currently tagged to this article.
          </div>
        )}
      </div>
    </div>
  )
}
