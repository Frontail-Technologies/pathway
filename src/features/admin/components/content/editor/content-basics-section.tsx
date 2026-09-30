'use client'

import * as React from 'react'
import type { ContentFormData } from './use-content-editor'
import { ContentType } from '@/features/content/types/content'
import { contentTypeOptions } from '../shared/content-constants'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FileText } from 'lucide-react'

export function ContentBasicsSection({
  formData,
  errors,
  onTitleChange,
  onSlugChange,
  onChange,
}: {
  formData: ContentFormData
  errors: Record<string, string>
  onTitleChange: (title: string) => void
  onSlugChange: (slug: string) => void
  onChange: <K extends keyof ContentFormData>(field: K, value: ContentFormData[K]) => void
}) {
  return (
    <div id="basics" className="bg-card rounded-xl p-5 border border-border/60 shadow-xs space-y-4">
      <div className="flex items-center gap-2 border-b border-border/50 pb-3">
        <FileText className="w-4 h-4 text-primary" />
        <h2 className="text-sm font-bold text-foreground">Basic Information</h2>
      </div>

      <div className="space-y-4">
        { }
        <div className="space-y-1.5">
          <Label htmlFor="content-title" className="text-xs font-semibold">
            Article Title <span className="text-destructive">*</span>
          </Label>
          <Input
            id="content-title"
            value={formData.title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="e.g. Complete JEE Main 2025 Counselling Guide & Seat Matrix"
            className={errors.title ? 'border-destructive' : ''}
          />
          {errors.title && (
            <p className="text-[11px] text-destructive font-medium">{errors.title}</p>
          )}
        </div>

        { }
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="content-slug" className="text-xs font-semibold">
              URL Slug <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs text-muted-foreground font-mono">
                /
              </span>
              <Input
                id="content-slug"
                value={formData.slug}
                onChange={(e) => onSlugChange(e.target.value)}
                placeholder="jee-main-2025-counselling-guide"
                className={`pl-6 font-mono text-xs ${errors.slug ? 'border-destructive' : ''}`}
              />
            </div>
            {errors.slug && (
              <p className="text-[11px] text-destructive font-medium">{errors.slug}</p>
            )}
            <p className="text-[10px] text-muted-foreground">
              Auto-generated from title. URL-safe characters only.
            </p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="content-type" className="text-xs font-semibold">
              Content Format / Type <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.type}
              onValueChange={(val) => {
                if (val) onChange('type', val as ContentType)
              }}
            >
              <SelectTrigger id="content-type" className="w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {contentTypeOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-[10px] text-muted-foreground">
              Editorial classification format.
            </p>
          </div>
        </div>

        { }
        <div className="space-y-1.5">
          <Label htmlFor="content-excerpt" className="text-xs font-semibold">
            Short Excerpt / Teaser Summary
          </Label>
          <Textarea
            id="content-excerpt"
            value={formData.excerpt}
            onChange={(e) => onChange('excerpt', e.target.value)}
            placeholder="A concise 1-2 sentence overview shown in search cards, social shares, and directory listings..."
            rows={2}
            className="text-xs resize-none"
          />
        </div>
      </div>
    </div>
  )
}
