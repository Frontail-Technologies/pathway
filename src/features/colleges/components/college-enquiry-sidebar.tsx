import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EnquiryDialog } from '@/features/enquiries/components/enquiry-dialog'
import type { CollegeDetailData } from '../data/college-detail'

export function CollegeEnquirySidebar({ college }: { college: CollegeDetailData }) {
  return (
    <div className="rounded-[10px] border bg-card p-4">
      <p className="text-[15px] font-semibold text-foreground">Interested in {college.name}?</p>
      <p className="mt-1 text-xs text-muted-foreground">Get course, fees and admission details.</p>

      <div className="mt-4 flex flex-col gap-2">
        <EnquiryDialog
          entityName={college.name}
          interestOptions={college.courses.map((course) => course.name)}
          interestLabel="Course"
          trigger={<Button variant="cta" className="h-10 w-full text-sm font-semibold">Enquire Now</Button>}
        />
        <EnquiryDialog
          intent="brochure"
          entityName={college.name}
          interestOptions={college.courses.map((course) => course.name)}
          interestLabel="Course"
          trigger={<Button variant="outline" className="h-10 w-full text-sm font-semibold">Download Brochure</Button>}
        />
      </div>

      <div className="mt-4 border-t pt-4">
        <p className="text-xs text-muted-foreground">Know your exam score?</p>
        <Button variant="outline" className="mt-2 h-10 w-full text-sm font-semibold" nativeButton={false} render={<Link href="/college-predictor" />}>
          Try College Predictor
        </Button>
      </div>

      <div className="mt-4 border-t pt-4">
        <p className="text-xs text-muted-foreground">Need guidance?</p>
        <Link
          href="/counselling"
          className="mt-1 flex cursor-pointer items-center gap-1 text-sm font-semibold text-primary outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          Talk to a counsellor
          <ChevronRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}
