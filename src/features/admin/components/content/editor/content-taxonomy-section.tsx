'use client'

import * as React from 'react'
import type { ContentFormData } from './use-content-editor'
import { ContentCategory } from '@/features/content/types/content'
import { contentCategoryOptions } from '../shared/content-constants'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tags, User } from 'lucide-react'

export function ContentTaxonomySection({
  formData,
  onChange,
}: {
  formData: ContentFormData
  onChange: <K extends keyof ContentFormData>(field: K, value: ContentFormData[K]) => void
}) {
  const parsedTags = formData.tagsString
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)

  return (
    <div id="taxonomy" className="bg-card rounded-xl p-5 border border-border/60 shadow-xs space-y-4">
      <div className="flex items-center gap-2 border-b border-border/50 pb-3">
        <Tags className="w-4 h-4 text-primary" />
        <h2 className="text-sm font-bold text-foreground">Taxonomy & Editorial Attribution</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        { }
        <div className="space-y-1.5">
          <Label htmlFor="content-category" className="text-xs font-semibold">
            Primary Category
          </Label>
          <Select
            value={formData.category}
            onValueChange={(val) => {
              if (val) onChange('category', val as ContentCategory)
            }}
          >
            <SelectTrigger id="content-category" className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {contentCategoryOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-[10px] text-muted-foreground">
            Topic pillar for navigation and related article grouping.
          </p>
        </div>

        { }
        <div className="space-y-1.5">
          <Label htmlFor="content-author" className="text-xs font-semibold">
            Author / Byline Name
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-muted-foreground">
              <User className="w-3.5 h-3.5" />
            </span>
            <Input
              id="content-author"
              value={formData.authorName}
              onChange={(e) => onChange('authorName', e.target.value)}
              placeholder="e.g. Dr. Ananya Sen (optional)"
              className="pl-8 text-xs"
            />
          </div>
          <p className="text-[10px] text-muted-foreground">
            Attribution credit displayed at the top of the published article.
          </p>
        </div>
      </div>

      { }
      <div className="space-y-1.5 pt-2">
        <Label htmlFor="content-tags" className="text-xs font-semibold">
          Keywords & Tags (Comma Separated)
        </Label>
        <Input
          id="content-tags"
          value={formData.tagsString}
          onChange={(e) => onChange('tagsString', e.target.value)}
          placeholder="jee main, counselling, josaa, cutoffs, engineering"
          className="text-xs font-mono"
        />
        <p className="text-[10px] text-muted-foreground">
          Keywords used for internal semantic search and topic indexing.
        </p>

        {parsedTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {parsedTags.map((tag, i) => (
              <Badge
                key={`${tag}-${i}`}
                variant="secondary"
                className="text-[11px] px-2 py-0.5 bg-muted text-foreground/80 font-normal"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
