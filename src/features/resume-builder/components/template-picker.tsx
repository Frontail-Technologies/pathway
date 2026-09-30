'use client'

import { useState, type ReactElement } from 'react'
import { Check } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { RESUME_TEMPLATES, type ResumeData, type ResumeTemplateId } from '../data/types'
import { createSampleResume } from '../data/fixtures'
import { useMediaQuery } from '../hooks/use-media-query'
import { ResumeTemplateThumbnail } from './resume-template-thumbnail'

type TemplatePickerProps = {
  data: ResumeData
  templateId: ResumeTemplateId
  onSelect: (templateId: ResumeTemplateId) => void
  trigger: ReactElement
}

 

const SAMPLE_DATA = createSampleResume()

export function TemplatePicker({ data, templateId, onSelect, trigger }: TemplatePickerProps) {
  const [open, setOpen] = useState(false)
  
  
  
  
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const cards = (
    <>
      {RESUME_TEMPLATES.map((template) => (
        <TemplateCard
          key={template.id}
          data={SAMPLE_DATA}
          template={template}
          active={template.id === templateId}
          onSelect={() => {
            onSelect(template.id)
            setOpen(false)
          }}
        />
      ))}
    </>
  )

  return (
    <>
      <span onClick={() => setOpen(true)}>{trigger}</span>

      {isDesktop ? (
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent showCloseButton className="flex max-h-[82vh] flex-col gap-0 p-0" style={{ width: 'min(920px, calc(100vw - 64px))', maxWidth: 'min(920px, calc(100vw - 64px))' }}>
            <DialogHeader className="shrink-0 border-b p-4">
              <DialogTitle>Choose a Template</DialogTitle>
            </DialogHeader>
            <ScrollArea className="min-h-0 flex-1">
              <div className="grid gap-5 p-5 sm:grid-cols-3">{cards}</div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      ) : (
        
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="bottom" className="flex h-dvh max-w-none flex-col gap-0 p-0">
            <SheetHeader className="shrink-0 border-b p-4">
              <SheetTitle>Choose a Template</SheetTitle>
            </SheetHeader>
            <ScrollArea className="min-h-0 flex-1">
              <div className="flex flex-col gap-5 p-4">{cards}</div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      )}
    </>
  )
}

function TemplateCard({
  data,
  template,
  active,
  onSelect,
}: {
  data: ResumeData
  template: (typeof RESUME_TEMPLATES)[number]
  active: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex cursor-pointer flex-col overflow-hidden rounded-[10px] border-2 text-left outline-none transition-shadow hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary/40 ${
        active ? 'border-primary' : 'border-border hover:border-primary/40'
      }`}
    >
      <div className="relative border-b bg-muted/60 p-4">
        <div className="mx-auto max-w-[220px]">
          <ResumeTemplateThumbnail templateId={template.id} data={data} />
        </div>
        {active && (
          <span className="absolute top-5 right-5 flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Check className="size-3.5" aria-hidden="true" />
          </span>
        )}
      </div>
      <div className="bg-card p-3.5">
        <p className="text-sm font-semibold text-foreground">{template.name}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{template.tagline}</p>
      </div>
    </button>
  )
}
