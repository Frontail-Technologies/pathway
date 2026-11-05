'use client'

import { Button } from '@/components/ui/button'
import { MobileActionBar, MobileActionBarSave } from '@/components/shared/mobile-action-bar'
import { EnquiryDialog } from '@/features/enquiries/components/enquiry-dialog'
import { useSavedItem } from '@/features/saved/saved-items-provider'
import type { CollegeDetailData } from '../data/college-detail'

export function CollegeActionBar({ college }: { college: CollegeDetailData }) {
  const { saved, toggleSaved } = useSavedItem('college', college.slug, 'College')
  const courseNames = college.courses.map((course) => course.name)

  return (
    <MobileActionBar label={`${college.name} actions`}>
      <MobileActionBarSave saved={saved} onToggle={toggleSaved} entityLabel="college" />
      <EnquiryDialog
        intent="brochure"
        entityName={college.name}
        entity={{ kind: 'college', slug: college.slug }}
        interestOptions={courseNames}
        interestLabel="Course"
        trigger={<Button variant="outline" className="h-11 flex-1 px-3 text-sm font-semibold">Brochure</Button>}
      />
      <EnquiryDialog
        entityName={college.name}
        entity={{ kind: 'college', slug: college.slug }}
        interestOptions={courseNames}
        interestLabel="Course"
        trigger={<Button variant="cta" className="h-11 flex-[1.4] px-3 text-sm font-semibold">Enquire Now</Button>}
      />
    </MobileActionBar>
  )
}
