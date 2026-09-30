'use client'

import { type ReactElement, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import type { CoachingProvider } from '../data/coaching'
import { CoachingEnquiryForm } from './coaching-enquiry-form'

type CoachingEnquiryDialogProps = {
  provider: CoachingProvider
  trigger: ReactElement
}

 
export function CoachingEnquiryDialog({ provider, trigger }: CoachingEnquiryDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent showCloseButton className="flex max-h-[85dvh] max-w-md flex-col gap-0 overflow-hidden p-0">
        <DialogHeader className="shrink-0 border-b p-4">
          <DialogTitle>Enquire — {provider.name}</DialogTitle>
        </DialogHeader>
        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          <CoachingEnquiryForm provider={provider} onSubmitted={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
