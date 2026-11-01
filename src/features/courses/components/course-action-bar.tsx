'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MobileActionBar, MobileActionBarSave } from '@/components/shared/mobile-action-bar'
import { EnquiryDialog } from '@/features/enquiries/components/enquiry-dialog'
import { useSavedItem } from '@/features/saved/saved-items-provider'
import type { CourseDetailData } from '../data/course-detail'

export function CourseActionBar({ course }: { course: CourseDetailData }) {
  const { saved, toggleSaved } = useSavedItem('course', course.slug, 'Course')

  return (
    <MobileActionBar label={`${course.name} actions`}>
      <MobileActionBarSave saved={saved} onToggle={toggleSaved} entityLabel="course" />
      <Button variant="outline" className="h-11 flex-1 px-3 text-sm font-semibold" nativeButton={false} render={<Link href="/colleges" />}>
        View Colleges
      </Button>
      <EnquiryDialog
        intent="counselling"
        entityName={course.name}
        description={`Talk to a counsellor about ${course.name}: colleges, fees, exams and career options.`}
        trigger={<Button variant="cta" className="h-11 flex-[1.3] px-3 text-sm font-semibold">Free Counselling</Button>}
      />
    </MobileActionBar>
  )
}
