import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import { LoanCalculator } from '@/features/loan-calculator/components/loan-calculator'

export const metadata: Metadata = {
  title: 'Education Loan EMI Calculator',
  description: 'Work out the monthly EMI, total interest and year-by-year repayment for an education loan, including a moratorium period.',
  alternates: { canonical: '/education-loan-calculator' },
}

export default function Page() {
  return (
    <div className="bg-muted/50 pb-10">
      <div className="border-b bg-card">
        <div className="container-shell px-4 pt-5 pb-6 lg:pt-6">
          <Breadcrumbs items={['Home', { label: 'Scholarships', href: '/scholarships' }, 'Education loan calculator']} />
          <h1 className="mt-4 font-heading text-2xl font-bold text-foreground sm:text-3xl">Education loan EMI calculator</h1>
          <p className="mt-2 max-w-3xl text-[15px] leading-7 text-muted-foreground">See your monthly EMI, total interest and how the repayment splits year by year.</p>
        </div>
      </div>
      <div className="container-shell px-4 pt-5 lg:pt-6">
        <LoanCalculator />
      </div>
    </div>
  )
}
