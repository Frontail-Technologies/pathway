'use client'

import * as React from 'react'
import { X } from 'lucide-react'
import type { RelatedEntityType } from '@/features/content/types/content'
import { getEntityOptionsForType, resolveRelatedEntity } from '@/features/admin/data/admin-content'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tag } from '../../kit'
import { relatedEntityTypeLabels, relatedEntityTypeOptions } from '../shared/content-constants'
import { Field, FormSection } from '../shared/content-form'
import type { ContentFormData } from './use-content-editor'

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
  const [selectedId, setSelectedId] = React.useState('')

  const options = React.useMemo(() => getEntityOptionsForType(selectedType), [selectedType])
  const recordItems = React.useMemo(() => options.map((option) => ({ value: option.id, label: option.label })), [options])

  React.useEffect(() => {
    setSelectedId(options[0]?.id ?? '')
  }, [options])

  return (
    <FormSection id="related" title="Linked records" description="Colleges, courses and other records this article mentions.">
      <div className="grid grid-cols-1 items-end gap-3 sm:grid-cols-12">
        <Field id="entity-type-picker" label="Type" className="sm:col-span-4">
          <Select value={selectedType} onValueChange={(value) => value && setSelectedType(value as RelatedEntityType)} items={relatedEntityTypeOptions}>
            <SelectTrigger id="entity-type-picker" className="w-full text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {relatedEntityTypeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field id="entity-id-picker" label="Record" className="sm:col-span-6">
          <Select value={selectedId} onValueChange={(value) => setSelectedId((value as string | null) ?? '')} items={recordItems}>
            <SelectTrigger id="entity-id-picker" className="w-full text-sm">
              <SelectValue placeholder="Select a record" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {options.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label}
                  {option.subtext ? <span className="ml-1.5 text-muted-foreground">{option.subtext}</span> : null}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Button type="button" variant="outline" onClick={() => selectedId && onAddRelatedEntity(selectedType, selectedId)} disabled={!selectedId} className="sm:col-span-2">
          Add
        </Button>
      </div>

      {formData.relatedEntityRefs.length > 0 ? (
        <ul className="divide-y divide-border rounded-lg border border-border">
          {formData.relatedEntityRefs.map((ref, index) => {
            const resolved = resolveRelatedEntity(ref.entityType, ref.entityId)
            return (
              <li key={`${ref.entityType}-${ref.entityId}-${index}`} className="flex items-center justify-between gap-3 px-3 py-2.5">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-medium text-foreground">{resolved.name}</span>
                    <Tag>{relatedEntityTypeLabels[ref.entityType]}</Tag>
                  </div>
                  {resolved.subtitle ? <p className="truncate text-[13px] text-muted-foreground">{resolved.subtitle}</p> : null}
                </div>
                <Button type="button" variant="ghost" size="icon-sm" onClick={() => onRemoveRelatedEntity(index)} className="shrink-0 text-muted-foreground hover:text-foreground" aria-label={`Remove ${resolved.name}`}>
                  <X className="size-4" />
                </Button>
              </li>
            )
          })}
        </ul>
      ) : (
        <p className="text-sm text-muted-foreground">Nothing linked yet.</p>
      )}
    </FormSection>
  )
}
