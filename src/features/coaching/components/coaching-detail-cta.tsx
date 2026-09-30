import { Bookmark, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { CoachingProvider } from '../data/coaching'
import { CoachingEnquiryDialog } from './coaching-enquiry-dialog'

type CoachingDetailCtaProps = {
  provider: CoachingProvider
  saved: boolean
  onToggleSaved: () => void
}

 
export function CoachingDetailCta({ provider, saved, onToggleSaved }: CoachingDetailCtaProps) {
  return (
    <div className="my-6 flex flex-col items-start gap-4 rounded-[12px] border border-primary/15 bg-secondary/50 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="flex items-start gap-3.5">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-card text-primary shadow-sm">
          <GraduationCap className="size-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-base font-bold text-foreground">Interested in this coaching institute?</p>
          <p className="mt-0.5 text-sm text-muted-foreground">Send an enquiry to {provider.name} and get in touch.</p>
        </div>
      </div>
      <div className="flex w-full gap-2 sm:w-fit">
        <Button variant="outline" className="h-11 flex-1 gap-1.5 bg-card px-5 text-sm font-semibold sm:h-10 sm:flex-none" onClick={onToggleSaved} aria-pressed={saved}>
          <Bookmark className={saved ? 'size-4 fill-primary text-primary' : 'size-4'} aria-hidden="true" />
          {saved ? 'Saved' : 'Save'}
        </Button>
        <CoachingEnquiryDialog
          provider={provider}
          trigger={
            <Button variant="cta" className="h-11 flex-1 px-6 text-sm font-semibold sm:h-10 sm:flex-none">
              Enquire Now
            </Button>
          }
        />
      </div>
    </div>
  )
}
