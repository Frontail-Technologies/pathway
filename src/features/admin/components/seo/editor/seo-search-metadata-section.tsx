'use client'

import * as React from 'react'
import { Type, Info, KeyRound, Plus, X, Tag } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface SeoSearchMetadataSectionProps {
  title: string
  description: string
  primaryKeyword: string
  secondaryKeywords: string[]
  secondaryKeywordInput: string
  onTitleChange: (value: string) => void
  onDescriptionChange: (value: string) => void
  onPrimaryKeywordChange: (value: string) => void
  onSecondaryKeywordInputChange: (value: string) => void
  onAddSecondaryKeyword: (keyword?: string) => void
  onRemoveSecondaryKeyword: (index: number) => void
  baselineTitle: string
  baselineDescription: string
  error?: string
}

export function SeoSearchMetadataSection({
  title,
  description,
  primaryKeyword,
  secondaryKeywords,
  secondaryKeywordInput,
  onTitleChange,
  onDescriptionChange,
  onPrimaryKeywordChange,
  onSecondaryKeywordInputChange,
  onAddSecondaryKeyword,
  onRemoveSecondaryKeyword,
  baselineTitle,
  baselineDescription,
  error,
}: SeoSearchMetadataSectionProps) {
  const isTitleOverridden = title.trim().length > 0
  const isDescOverridden = description.trim().length > 0

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      onAddSecondaryKeyword()
    }
  }

  return (
    <section id="metadata" className="scroll-mt-20 space-y-4 rounded-lg border border-border bg-card p-5 sm:p-6">
      <h2 className="text-[15px] font-semibold text-foreground">Search Metadata & Editorial Planning</h2>
      <div className="space-y-4">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-foreground">Meta Title</Label>
            <span className="text-[13px] text-muted-foreground font-mono">
              {title.length} characters
            </span>
          </div>
          <Input
            placeholder={baselineTitle || 'Enter custom meta title...'}
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="h-9 text-sm bg-background"
          />
          <div className="flex items-center justify-between text-[13px] text-muted-foreground">
            <span>Keep titles concise and descriptive (typically 50–60 characters).</span>
            {!isTitleOverridden && (
              <span className="text-muted-foreground">Using generated default</span>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-foreground">Meta Description</Label>
            <span className="text-[13px] text-muted-foreground font-mono">
              {description.length} characters
            </span>
          </div>
          <Textarea
            placeholder={baselineDescription || 'Enter custom meta description...'}
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            rows={3}
            className="text-sm bg-background resize-none leading-relaxed"
          />
          <div className="flex items-center justify-between text-[13px] text-muted-foreground">
            <span>Summarize page content accurately (typically 140–160 characters).</span>
            {!isDescOverridden && (
              <span className="text-muted-foreground">Using generated default</span>
            )}
          </div>
        </div>

        <div className="pt-2 border-t border-border/60 space-y-4">
          <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
            <KeyRound className="w-3.5 h-3.5 text-blue-600" />
            <span>Editorial Focus Keywords (Planning Only)</span>
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-foreground">Primary Focus Keyword</Label>
            <Input
              placeholder="e.g. btech computer science admissions, iit delhi placements..."
              value={primaryKeyword}
              onChange={(e) => onPrimaryKeywordChange(e.target.value)}
              className="h-9 text-sm bg-background"
            />
            <p className="text-[13px] text-muted-foreground">
              Main search phrase this page is intended to target.
            </p>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Secondary Keywords</Label>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Type keyword and press Enter or comma..."
                value={secondaryKeywordInput}
                onChange={(e) => onSecondaryKeywordInputChange(e.target.value)}
                onKeyDown={handleKeyDown}
                className="h-9 text-sm bg-background flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onAddSecondaryKeyword()}
                disabled={!secondaryKeywordInput.trim()}
                className="h-9 text-sm shrink-0"
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                Add Keyword
              </Button>
            </div>
            <p className="text-[13px] text-muted-foreground">
              Related search phrases used for editorial planning.
            </p>

            {secondaryKeywords.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {secondaryKeywords.map((kw, index) => (
                  <Badge
                    key={`${kw}-${index}`}
                    variant="secondary"
                    className="text-[13px] font-medium pl-2.5 pr-1.5 py-1 bg-slate-100 text-slate-800 border-slate-200 flex items-center gap-1"
                  >
                    <Tag className="w-3 h-3 text-muted-foreground" />
                    <span>{kw}</span>
                    <button
                      type="button"
                      onClick={() => onRemoveSecondaryKeyword(index)}
                      className="w-4 h-4 rounded-full hover:bg-slate-200 inline-flex items-center justify-center text-muted-foreground hover:text-slate-700 transition-colors"
                    >
                      <X className="w-3 h-3" />
                      <span className="sr-only">Remove {kw}</span>
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="p-3 rounded-lg bg-muted/20 border border-border/60 text-[13px] text-muted-foreground space-y-1">
          <div className="flex items-center gap-1.5 font-semibold text-foreground">
            <Info className="w-3.5 h-3.5 text-blue-600" />
            <span>Admin Planning Metadata</span>
          </div>
          <p className="leading-relaxed">
            Focus keywords are internal planning metadata for content creators and editors. They are not output as obsolete <code className="font-mono text-xs">&lt;meta name=&quot;keywords&quot;&gt;</code> HTML tags and do not claim to directly influence search engine ranking algorithms.
          </p>
        </div>
      </div>
    </section>
  )
}
