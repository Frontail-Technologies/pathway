'use client'

import { Button } from '@/components/ui/button'
import { MobileActionBar, MobileActionBarSave } from '@/components/shared/mobile-action-bar'
import { useSavedItem } from '@/features/saved/saved-items-provider'

export function TutorActionBar({ tutorSlug, tutorName }: { tutorSlug: string; tutorName: string }) {
  const { saved, toggleSaved } = useSavedItem('tutor', tutorSlug, 'Tutor')

  return (
    <MobileActionBar label={`${tutorName} actions`}>
      <MobileActionBarSave saved={saved} onToggle={toggleSaved} entityLabel="tutor" />
      <Button variant="cta" className="h-11 flex-1 px-3 text-sm font-semibold" disabled title="Session requests are coming soon">
        Request Session · Soon
      </Button>
    </MobileActionBar>
  )
}
