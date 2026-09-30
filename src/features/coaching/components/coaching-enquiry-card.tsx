import { Bookmark } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { CoachingProvider } from '../data/coaching'
import { CoachingEnquiryForm } from './coaching-enquiry-form'

type CoachingEnquiryCardProps = {
  provider: CoachingProvider
  saved: boolean
  onToggleSaved: () => void
}

 
export function CoachingEnquiryCard({ provider, saved, onToggleSaved }: CoachingEnquiryCardProps) {
  return (
    <div className="rounded-[10px] border bg-card p-4 shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
      <p className="text-[15px] font-bold text-foreground">Interested in {provider.name}?</p>
      <p className="mt-1 text-xs text-muted-foreground">Share your details and the team will get in touch.</p>

      <div className="mt-4">
        <CoachingEnquiryForm provider={provider} compact />
      </div>
      <p className="mt-2 text-center text-[11px] text-muted-foreground">This is a demo preview — no enquiry is sent to a real provider.</p>

      <Button variant="outline" className="mt-3 h-10 w-full gap-1.5 text-sm font-semibold" onClick={onToggleSaved} aria-pressed={saved}>
        <Bookmark className={saved ? 'size-4 fill-primary text-primary' : 'size-4'} aria-hidden="true" />
        {saved ? 'Saved' : 'Save'}
      </Button>
    </div>
  )
}
