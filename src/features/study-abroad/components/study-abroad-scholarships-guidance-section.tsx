import Link from 'next/link'
import { ArrowRight, Check, GraduationCap, MessageCircleQuestion } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { scholarshipCategories } from '../data/study-abroad'

const supportPoints = ['Shortlist destinations', 'Understand requirements', 'Plan next steps']








 
export function StudyAbroadScholarshipsGuidanceSection() {
  return (
    <div id="scholarships" className="scroll-mt-24 rounded-[16px] border bg-card shadow-[0_2px_10px_rgba(15,23,42,0.04)]">
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col gap-4 p-5 sm:p-6 lg:w-[60%] lg:border-r">
          <div>
            <h2 className="font-heading text-lg font-bold text-foreground sm:text-xl">Scholarships & Funding</h2>
            <p className="mt-1 text-sm text-muted-foreground">General categories to help you start researching how to fund your studies.</p>
          </div>
          <div className="flex flex-col gap-2.5">
            {scholarshipCategories.map((category) => (
              <div key={category.title} className="flex items-center gap-3 rounded-[10px] bg-muted px-3.5 py-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                  <GraduationCap className="size-4.5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">{category.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{category.description}</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="h-10 w-fit px-4 text-sm font-semibold" nativeButton={false} render={<Link href="/scholarships" />}>
            Explore Scholarships <ArrowRight className="size-3.5" aria-hidden="true" />
          </Button>
        </div>

        <div className="flex flex-col justify-center gap-3 p-5 sm:p-6 lg:w-[40%]">
          <div className="flex items-center gap-2 text-primary">
            <MessageCircleQuestion className="size-5" aria-hidden="true" />
            <p className="text-xs font-semibold tracking-wider uppercase">Guidance</p>
          </div>
          <h3 className="font-heading text-base font-bold text-foreground sm:text-lg">Need help planning your study abroad journey?</h3>
          <ul className="flex flex-col gap-1.5">
            {supportPoints.map((point) => (
              <li key={point} className="flex items-center gap-1.5 text-sm text-foreground">
                <Check className="size-4 shrink-0 text-success" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
          <Button variant="cta" className="h-10 w-fit px-4 text-sm font-semibold" nativeButton={false} render={<Link href="/counselling" />}>
            Explore Counselling
          </Button>
        </div>
      </div>
    </div>
  )
}
