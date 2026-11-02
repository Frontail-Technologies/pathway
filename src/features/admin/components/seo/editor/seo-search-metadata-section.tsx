'use client'

import * as React from 'react'
import { Plus, X } from 'lucide-react'
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
      <h2 className="text-[15px] font-semibold text-foreground">Search text</h2>
      <div className="space-y-4">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-foreground">Title</Label>
            <span className="text-[13px] text-muted-foreground font-mono">
              {title.length} characters
            </span>
          </div>
          <Input
            placeholder={baselineTitle || 'Search title'}
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="h-9 text-sm bg-background"
          />
          <div className="flex items-center justify-between text-[13px] text-muted-foreground">
            <span>Aim for 50–60 characters. Leave empty to use the default.</span>
            {!isTitleOverridden && (
              <span className="text-muted-foreground">Using default</span>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-foreground">Description</Label>
            <span className="text-[13px] text-muted-foreground font-mono">
              {description.length} characters
            </span>
          </div>
          <Textarea
            placeholder={baselineDescription || 'Search description'}
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            rows={3}
            className="text-sm bg-background resize-none leading-relaxed"
          />
          <div className="flex items-center justify-between text-[13px] text-muted-foreground">
            <span>Aim for 140–160 characters. Leave empty to use the default.</span>
            {!isDescOverridden && (
              <span className="text-muted-foreground">Using default</span>
            )}
          </div>
        </div>

        <div className="pt-2 border-t border-border/60 space-y-4">
          <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
            <span>Keywords</span>
            <span className="text-[13px] font-normal text-muted-foreground">For planning only; not added to the page.</span>
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-foreground">Primary keyword</Label>
            <Input
              placeholder="e.g. iit delhi placements"
              value={primaryKeyword}
              onChange={(e) => onPrimaryKeywordChange(e.target.value)}
              className="h-9 text-sm bg-background"
            />
            <p className="text-[13px] text-muted-foreground">
              The main phrase this page should rank for.
            </p>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Other keywords</Label>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Type and press Enter"
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
                Add
              </Button>
            </div>
            <p className="text-[13px] text-muted-foreground">
              Related phrases.
            </p>

            {secondaryKeywords.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {secondaryKeywords.map((kw, index) => (
                  <Badge
                    key={`${kw}-${index}`}
                    variant="secondary"
                    className="text-[13px] font-medium pl-2.5 pr-1.5 py-1 flex items-center gap-1"
                  >
                                        <span>{kw}</span>
                    <button
                      type="button"
                      onClick={() => onRemoveSecondaryKeyword(index)}
                      className="w-4 h-4 rounded-full hover:bg-muted inline-flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
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
      </div>
    </section>
  )
}
