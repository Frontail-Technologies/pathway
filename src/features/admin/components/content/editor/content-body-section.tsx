'use client'

import * as React from 'react'
import type { ContentFormData } from './use-content-editor'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { AlignLeft, Code, Info } from 'lucide-react'

export function ContentBodySection({
  formData,
  errors,
  onChange,
}: {
  formData: ContentFormData
  errors: Record<string, string>
  onChange: <K extends keyof ContentFormData>(field: K, value: ContentFormData[K]) => void
}) {
  const wordCount = formData.body.trim() ? formData.body.trim().split(/\s+/).length : 0
  const charCount = formData.body.length

  return (
    <div id="body" className="bg-card rounded-xl p-5 border border-border/60 shadow-xs space-y-4">
      <div className="flex items-center justify-between gap-2 border-b border-border/50 pb-3">
        <div className="flex items-center gap-2">
          <AlignLeft className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-bold text-foreground">Content Body (Markdown)</h2>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>{wordCount} words</span>
          <span>{charCount} characters</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="content-body" className="text-xs font-semibold">
            Markdown Body Text <span className="text-destructive">*</span>
          </Label>
          <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-mono">
            <Code className="w-3 h-3" />
            Standard Markdown & HTML supported
          </span>
        </div>

        <Textarea
          id="content-body"
          value={formData.body}
          onChange={(e) => onChange('body', e.target.value)}
          placeholder="# Introduction&#10;&#10;Write comprehensive editorial content here...&#10;&#10;## Section Heading&#10;&#10;- Key point 1&#10;- Key point 2&#10;&#10;> Note: Important admission deadlines apply."
          rows={14}
          className={`font-mono text-xs leading-relaxed ${errors.body ? 'border-destructive' : ''}`}
        />

        {errors.body && (
          <p className="text-[11px] text-destructive font-medium">{errors.body}</p>
        )}

        <div className="rounded-lg p-2.5 bg-muted/30 border border-border/40 text-[11px] text-muted-foreground flex items-start gap-2">
          <Info className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
          <span>
            Use markdown formatting: <code className="bg-muted px-1 py-0.2 rounded font-mono"># H1</code>, <code className="bg-muted px-1 py-0.2 rounded font-mono">## H2</code>, <code className="bg-muted px-1 py-0.2 rounded font-mono">**bold**</code>, <code className="bg-muted px-1 py-0.2 rounded font-mono">[link](url)</code>, <code className="bg-muted px-1 py-0.2 rounded font-mono">- lists</code>, <code className="bg-muted px-1 py-0.2 rounded font-mono">&gt; blockquote</code>.
          </span>
        </div>
      </div>
    </div>
  )
}
