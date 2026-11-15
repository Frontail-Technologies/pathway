'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { IndianRupee, Percent, Timer } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const inr = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Math.round(value))

type Inputs = { amount: string; rate: string; years: string; moratorium: string }

function compute(inputs: Inputs) {
  const amount = Number(inputs.amount.replace(/[,\s]/g, ''))
  const rate = Number(inputs.rate)
  const years = Number(inputs.years)
  const moratorium = Number(inputs.moratorium || 0)
  const errors: Partial<Record<keyof Inputs, string>> = {}
  if (!Number.isFinite(amount) || amount < 10_000 || amount > 2_00_00_000) errors.amount = 'Enter an amount between ₹10,000 and ₹2 crore.'
  if (!Number.isFinite(rate) || rate <= 0 || rate > 30) errors.rate = 'Enter a rate between 0.1% and 30%.'
  if (!Number.isFinite(years) || years < 1 || years > 30 || !Number.isInteger(years)) errors.years = 'Enter a whole number of years from 1 to 30.'
  if (!Number.isFinite(moratorium) || moratorium < 0 || moratorium > 84 || !Number.isInteger(moratorium)) errors.moratorium = 'Enter 0 to 84 months.'
  if (Object.keys(errors).length) return { errors }

  const monthly = rate / 12 / 100
  const accrued = amount * monthly * moratorium
  const principal = amount + accrued
  const months = years * 12
  const growth = Math.pow(1 + monthly, months)
  const emi = (principal * monthly * growth) / (growth - 1)

  const yearly: { year: number; principal: number; interest: number }[] = []
  let balance = principal
  for (let year = 1; year <= years; year += 1) {
    let paidPrincipal = 0
    let paidInterest = 0
    for (let month = 0; month < 12; month += 1) {
      const interest = balance * monthly
      const toPrincipal = Math.min(emi - interest, balance)
      paidInterest += interest
      paidPrincipal += toPrincipal
      balance -= toPrincipal
    }
    yearly.push({ year, principal: paidPrincipal, interest: paidInterest })
  }
  const totalPaid = emi * months
  return { errors, emi, accrued, totalInterest: totalPaid - amount, totalPaid, yearly }
}

function NumberField({ id, label, icon: Icon, suffix, value, onChange, error }: { id: string; label: string; icon: typeof IndianRupee; suffix?: string; value: string; onChange: (value: string) => void; error?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Icon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <Input id={id} inputMode="decimal" value={value} onChange={(event) => onChange(event.target.value)} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} className={cn('pl-9', suffix && 'pr-16')} />
        {suffix ? <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-sm text-muted-foreground">{suffix}</span> : null}
      </div>
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export function LoanCalculator() {
  const [inputs, setInputs] = useState<Inputs>({ amount: '1000000', rate: '9.5', years: '7', moratorium: '0' })
  const set = (key: keyof Inputs) => (value: string) => setInputs((current) => ({ ...current, [key]: value }))
  const result = useMemo(() => compute(inputs), [inputs])
  const ok = 'emi' in result && result.emi !== undefined
  const peak = ok ? Math.max(...result.yearly.map((row) => row.principal + row.interest)) : 1

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-6">
      <form onSubmit={(event) => event.preventDefault()} className="flex flex-col gap-4 rounded-xl border bg-card p-4 sm:p-5 lg:sticky lg:top-header-gap lg:w-90 lg:shrink-0">
        <NumberField id="loan-amount" label="Loan amount" icon={IndianRupee} value={inputs.amount} onChange={set('amount')} error={result.errors.amount} />
        <NumberField id="loan-rate" label="Interest rate" icon={Percent} suffix="% a year" value={inputs.rate} onChange={set('rate')} error={result.errors.rate} />
        <NumberField id="loan-years" label="Repayment period" icon={Timer} suffix="years" value={inputs.years} onChange={set('years')} error={result.errors.years} />
        <NumberField id="loan-moratorium" label="Moratorium before repayment" icon={Timer} suffix="months" value={inputs.moratorium} onChange={set('moratorium')} error={result.errors.moratorium} />
      </form>

      <div className="flex min-w-0 flex-1 flex-col gap-4">
        {ok ? (
          <>
            <section aria-live="polite" className="grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-3">
              {[
                { label: 'Monthly EMI', value: inr(result.emi), strong: true },
                { label: 'Total interest', value: inr(result.totalInterest) },
                { label: 'Total payable', value: inr(result.totalPaid) },
              ].map((item) => (
                <div key={item.label} className="bg-card px-5 py-4">
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className={cn('mt-1 font-heading font-bold text-foreground tabular-nums', item.strong ? 'text-3xl text-primary' : 'text-2xl')}>{item.value}</p>
                </div>
              ))}
            </section>
            {result.accrued > 0 ? <p className="text-sm text-muted-foreground">Includes {inr(result.accrued)} of simple interest that builds up during the moratorium.</p> : null}

            <section className="rounded-xl border bg-card p-4 sm:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="font-heading text-lg font-bold text-foreground sm:text-xl">Year by year</h2>
                <div className="flex items-center gap-4 text-[13px] text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-sm bg-primary" aria-hidden="true" />
                    Principal
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-sm bg-cta" aria-hidden="true" />
                    Interest
                  </span>
                </div>
              </div>
              <ul className="mt-4 flex flex-col gap-2.5">
                {result.yearly.map((row) => (
                  <li key={row.year} className="grid grid-cols-[3.5rem_1fr_6.5rem] items-center gap-3 text-sm">
                    <span className="text-muted-foreground">Year {row.year}</span>
                    <span className="flex h-3 overflow-hidden rounded-full bg-muted" role="img" aria-label={`Year ${row.year}: ${inr(row.principal)} principal, ${inr(row.interest)} interest`}>
                      <span className="h-full bg-primary" style={{ width: `${(row.principal / peak) * 100}%` }} />
                      <span className="h-full bg-cta" style={{ width: `${(row.interest / peak) * 100}%` }} />
                    </span>
                    <span className="text-right font-medium text-foreground tabular-nums">{inr(row.principal + row.interest)}</span>
                  </li>
                ))}
              </ul>
            </section>
          </>
        ) : (
          <p className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">Fix the highlighted fields to see your EMI.</p>
        )}

        <section className="rounded-xl border bg-card p-4 sm:p-6">
          <h2 className="font-heading text-lg font-bold text-foreground sm:text-xl">How it is calculated</h2>
          <p className="mt-2.5 text-[15px] leading-7 text-muted-foreground">
            EMI = P × r × (1 + r)<sup>n</sup> ÷ ((1 + r)<sup>n</sup> − 1), where P is the amount owed when repayment starts, r is the monthly rate and n the number of months. During a moratorium we add simple interest to P. Banks may charge differently, so confirm the final figure with your lender.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Looking for funding instead?{' '}
            <Link href="/scholarships" className="font-semibold text-primary hover:underline">
              Browse scholarships
            </Link>
          </p>
        </section>
      </div>
    </div>
  )
}
