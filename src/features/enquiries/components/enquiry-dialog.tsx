'use client'

import { type ReactElement, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { EnquiryForm, enquiryIntentCopy, type EnquiryIntent } from './enquiry-form'

type EnquiryDialogProps = {
  trigger: ReactElement
  intent?: EnquiryIntent
  entityName?: string
  interestOptions?: readonly string[]
  interestLabel?: string
  description?: string
}

/** Opens the shared enquiry / brochure / counselling form in a dialog. */
export function EnquiryDialog({ trigger, intent = 'enquiry', entityName, interestOptions, interestLabel, description }: EnquiryDialogProps) {
  const [open, setOpen] = useState(false)
  const copy = enquiryIntentCopy[intent]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent showCloseButton className="flex max-h-[90dvh] max-w-md flex-col gap-0 overflow-hidden p-0">
        <DialogHeader className="shrink-0 border-b p-4 text-left">
          <DialogTitle className="pr-8">{copy.title(entityName)}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          <EnquiryForm intent={intent} entityName={entityName} interestOptions={interestOptions} interestLabel={interestLabel} onSubmitted={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
