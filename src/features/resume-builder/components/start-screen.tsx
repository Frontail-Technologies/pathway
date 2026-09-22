'use client'

import Link from 'next/link'
import { ArrowLeft, FileEdit, LayoutTemplate } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TemplatePicker } from './template-picker'
import { createSampleResume } from '../data/fixtures'
import type { ResumeTemplateId } from '../data/types'

const SAMPLE_DATA = createSampleResume()

export function StartScreen({ onStart, onPreviewSample }: { onStart: (templateId: ResumeTemplateId) => void; onPreviewSample: () => void }) {
  return (
    <div className="flex min-h-full flex-col">
      <header className="flex h-13 shrink-0 items-center gap-2 border-b bg-card px-3">
        <Button variant="ghost" size="icon-sm" nativeButton={false} render={<Link href="/" aria-label="Back to Student Tools" />}>
          <ArrowLeft className="size-4" aria-hidden="true" />
        </Button>
        <span className="font-heading text-sm font-bold text-foreground">Pathway · Resume Builder</span>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center px-4 py-14 text-center sm:py-20">
        <h1 className="font-heading text-2xl font-extrabold text-foreground sm:text-3xl">Create Your Resume</h1>
        <p className="mt-2 max-w-md text-sm text-muted-foreground sm:text-base">
          Build a clean, ATS-friendly resume in a few guided steps — made for students and freshers.
        </p>

        <div className="mt-8 grid w-full max-w-lg gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => onStart('classic-ats')}
            className="flex cursor-pointer flex-col items-center gap-2 rounded-[12px] border bg-card p-6 text-center transition-colors hover:border-primary/40 hover:bg-primary/5"
          >
            <span className="flex size-11 items-center justify-center rounded-full bg-secondary text-primary">
              <FileEdit className="size-5" aria-hidden="true" />
            </span>
            <span className="text-sm font-semibold text-foreground">Start from Scratch</span>
            <span className="text-xs text-muted-foreground">Jump straight into the builder with a default template.</span>
          </button>

          <TemplatePicker
            data={SAMPLE_DATA}
            templateId="classic-ats"
            onSelect={onStart}
            trigger={
              <div className="flex h-full cursor-pointer flex-col items-center gap-2 rounded-[12px] border bg-card p-6 text-center transition-colors hover:border-primary/40 hover:bg-primary/5">
                <span className="flex size-11 items-center justify-center rounded-full bg-secondary text-primary">
                  <LayoutTemplate className="size-5" aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold text-foreground">Choose a Template</span>
                <span className="text-xs text-muted-foreground">Pick a look first from 3 starter templates.</span>
              </div>
            }
          />
        </div>

        <Button type="button" variant="link" className="mt-6 h-auto p-0 text-sm" onClick={onPreviewSample}>
          Or preview with sample data first
        </Button>
      </div>
    </div>
  )
}
