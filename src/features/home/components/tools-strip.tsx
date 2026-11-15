import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ToolArt, type ToolArtName } from '@/components/shared/tool-art'
import { HomeSectionHeading } from './home-section-heading'

const tools: { label: string; text: string; href: string; art: ToolArtName }[] = [
  { label: 'College predictor', text: 'Colleges and branches for your JEE rank, from JoSAA cutoffs', href: '/college-predictor', art: 'collegePredictor' },
  { label: 'Rank predictor', text: 'Estimate your JEE Main rank from your percentile', href: '/rank-predictor', art: 'rankPredictor' },
  { label: 'Compare colleges', text: 'Fees, ranks and placements side by side', href: '/compare/colleges', art: 'compare' },
  { label: 'Resume builder', text: 'A clean resume for internships and placements', href: '/resume-builder', art: 'resume' },
  { label: 'Psychometric test', text: 'Find courses and careers that suit your interests', href: '/psychometric-test', art: 'psychometric' },
]

export function ToolsStrip() {
  return (
    <section aria-labelledby="tools-strip-title" className="bg-muted/60 py-10 sm:py-12 lg:py-16">
      <div className="container-shell">
        <span id="tools-strip-title" className="sr-only">
          Free tools
        </span>
        <HomeSectionHeading eyebrow="Free tools" title="Free tools" subtitle="Built on official cutoffs and rankings, no sign-up needed" />
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex flex-col rounded-xl border bg-card p-5 outline-none transition-colors hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-ring/50"
            >
              <ToolArt name={tool.art} />
              <span className="mt-4 text-base font-semibold text-foreground group-hover:text-primary">{tool.label}</span>
              <span className="mt-1 text-sm leading-6 text-muted-foreground">{tool.text}</span>
              <span className="mt-auto flex items-center gap-1 pt-3 text-sm font-semibold text-primary">
                Open
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
