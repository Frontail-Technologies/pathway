'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MobileActionBar } from '@/components/shared/mobile-action-bar'
import { EnquiryDialog } from '@/features/enquiries/components/enquiry-dialog'

type ExamActionBarProps = {
  examName: string
  examSlug: string
  collegePredictorHref: string | null
  rankPredictorHref: string | null
}

export function ExamActionBar({ examName, examSlug, collegePredictorHref, rankPredictorHref }: ExamActionBarProps) {
  const counselling = (
    <EnquiryDialog
      intent="counselling"
      entityName={examName}
      entity={{ kind: 'exam', slug: examSlug }}
      description={`Talk to a counsellor about ${examName} preparation, cut-offs and college options.`}
      trigger={
        <Button variant={collegePredictorHref ? 'outline' : 'cta'} className="h-11 flex-1 px-3 text-sm font-semibold">
          Free Counselling
        </Button>
      }
    />
  )

  return (
    <MobileActionBar label={`${examName} actions`}>
      {rankPredictorHref ? (
        <Button variant="outline" className="h-11 flex-1 px-3 text-sm font-semibold" nativeButton={false} render={<Link href={rankPredictorHref} />}>
          Predict Rank
        </Button>
      ) : (
        counselling
      )}
      {collegePredictorHref && (
        <Button variant="cta" className="h-11 flex-1 px-3 text-sm font-semibold" nativeButton={false} render={<Link href={collegePredictorHref} />}>
          Predict Colleges
        </Button>
      )}
      {!collegePredictorHref && rankPredictorHref && counselling}
    </MobileActionBar>
  )
}
