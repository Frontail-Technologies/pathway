'use client'

import { ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HeroScene } from '@/components/shared/landing-art'
import { StepList } from '@/components/shared/landing'
import { cn } from '@/lib/utils'
import { createSampleResume } from '../data/fixtures'
import { RESUME_TEMPLATES, type ResumeTemplateId } from '../data/types'
import { ResumeTemplateThumbnail } from './resume-template-thumbnail'
import { WorkspaceBar, onBlueOutline } from './workspace/workspace-bar'

const SAMPLE_DATA = createSampleResume()

const points = ['ATS-friendly templates', 'Download as PDF', 'Saved only in this browser']

const steps = [
  { title: 'Personal details', text: 'Name, contact links and a short summary.' },
  { title: 'Education and projects', text: 'Degrees, internships and the work you are proud of.' },
  { title: 'Skills and achievements', text: 'Grouped skills, awards, languages and activities.' },
  { title: 'Review and download', text: 'Switch templates, check each section and save a PDF.' },
]

export function StartScreen({ onStart, onPreviewSample }: { onStart: (templateId: ResumeTemplateId) => void; onPreviewSample: () => void }) {
  return (
    <div className="flex min-h-full flex-col bg-background">
      <WorkspaceBar />

      <section className="border-t border-primary-foreground/15 bg-primary text-primary-foreground">
        <div className="container-shell grid items-center gap-8 py-10 sm:py-12 lg:grid-cols-[minmax(0,1fr)_420px] lg:py-14">
          <div>
            <h1 className="font-heading text-3xl leading-tight font-extrabold sm:text-4xl">Build a resume recruiters can read</h1>
            <p className="mt-3 max-w-xl text-[15px] leading-7 text-primary-foreground/85 sm:text-base">
              A guided builder for students and freshers. Fill in a few steps, pick a template and download a clean PDF for internships, placements and applications.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button type="button" variant="cta" size="lg" className="font-semibold" onClick={() => onStart('classic-ats')}>
                Start building
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
              <Button type="button" variant="outline" size="lg" className={cn('font-semibold', onBlueOutline)} onClick={onPreviewSample}>
                Try with sample data
              </Button>
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
              {points.map((point) => (
                <li key={point} className="flex items-center gap-1.5">
                  <Check className="size-4 text-cta" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <HeroScene name="resume" className="hidden lg:block" />
        </div>
      </section>

      <section aria-labelledby="templates-title" className="py-10 sm:py-12">
        <div className="container-shell">
          <h2 id="templates-title" className="font-heading text-[22px] font-extrabold text-foreground sm:text-[28px]">
            Pick a template
          </h2>
          <p className="mt-1.5 text-sm text-muted-foreground sm:text-[15px]">You can switch any time, your details stay the same</p>
          <ul className="mt-6 grid gap-5 sm:grid-cols-3">
            {RESUME_TEMPLATES.map((template) => (
              <li key={template.id}>
                <button
                  type="button"
                  onClick={() => onStart(template.id)}
                  className="group flex w-full cursor-pointer flex-col overflow-hidden rounded-xl border bg-card text-left outline-none transition-colors hover:border-primary/60 focus-visible:ring-2 focus-visible:ring-primary/40"
                >
                  <span className="block border-b bg-muted/60 px-6 pt-6">
                    <span className="mx-auto block max-w-[240px] overflow-hidden rounded-t-md shadow-[0_8px_24px_rgba(15,23,42,0.12)]">
                      <ResumeTemplateThumbnail templateId={template.id} data={SAMPLE_DATA} />
                    </span>
                  </span>
                  <span className="flex items-center justify-between gap-3 p-4">
                    <span>
                      <span className="block text-base font-semibold text-foreground group-hover:text-primary">{template.name}</span>
                      <span className="block text-[13px] text-muted-foreground">{template.tagline}</span>
                    </span>
                    <span className="flex items-center gap-1 text-sm font-semibold text-primary">
                      Use
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="how-title" className="bg-muted/60 py-10 sm:py-12">
        <div className="container-shell">
          <h2 id="how-title" className="font-heading text-[22px] font-extrabold text-foreground sm:text-[28px]">
            How it works
          </h2>
          <div className="mt-6">
            <StepList steps={steps} />
          </div>
        </div>
      </section>
    </div>
  )
}
