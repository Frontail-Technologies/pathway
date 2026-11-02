'use client'

import type { ContentCategory } from '@/features/content/types/content'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tag } from '../../kit'
import { contentCategoryOptions } from '../shared/content-constants'
import { Field, FormSection } from '../shared/content-form'
import type { ContentFormData } from './use-content-editor'

export function ContentTaxonomySection({
  formData,
  onChange,
}: {
  formData: ContentFormData
  onChange: <K extends keyof ContentFormData>(field: K, value: ContentFormData[K]) => void
}) {
  const tags = formData.tagsString
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)

  return (
    <FormSection id="taxonomy" title="Category and author">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field id="content-category" label="Category">
          <Select value={formData.category} onValueChange={(value) => value && onChange('category', value as ContentCategory)} items={contentCategoryOptions}>
            <SelectTrigger id="content-category" className="w-full text-sm">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {contentCategoryOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field id="content-author" label="Author" hint="Optional. Shown as the byline.">
          <Input id="content-author" value={formData.authorName} onChange={(e) => onChange('authorName', e.target.value)} placeholder="e.g. Ananya Sen" className="text-sm" />
        </Field>
      </div>

      <Field id="content-tags" label="Tags" hint="Separate with commas. Used for internal search.">
        <Input id="content-tags" value={formData.tagsString} onChange={(e) => onChange('tagsString', e.target.value)} placeholder="jee main, counselling, cutoffs" className="text-sm" />
      </Field>
      {tags.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag, index) => (
            <Tag key={`${tag}-${index}`}>{tag}</Tag>
          ))}
        </div>
      ) : null}
    </FormSection>
  )
}
