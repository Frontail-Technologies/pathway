import { Brain, ClipboardList, FileSearch, GitCompareArrows, GraduationCap, Target } from 'lucide-react'
import { StudentToolHero } from '@/components/shared/student-tool/student-tool-hero'
import { ToolHowItWorks, ToolRelatedTools } from '@/components/shared/student-tool/student-tool-parts'

/** Local decorative illustration: an upward staircase with a flag, plus a blank exam-result sheet. No numbers, no chart, no gauge. */
function RankArtwork() {
  return (
    <div className="relative hidden h-52 w-120 shrink-0 lg:block" aria-hidden="true">
      <div className="absolute top-3 left-60 w-44 rounded-2xl bg-white/85 p-4 shadow-[0_12px_32px_rgba(30,58,138,0.12)] ring-1 ring-primary/10 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary">
            <FileSearch className="size-4" />
          </span>
          <span className="text-[11px] font-semibold text-foreground">Exam result</span>
        </div>
        <div className="mt-3 space-y-2">
          <span className="block h-2 w-full rounded-full bg-primary/15" />
          <span className="block h-2 w-4/5 rounded-full bg-primary/15" />
          <span className="block h-2 w-3/5 rounded-full bg-primary/15" />
        </div>
      </div>

      <svg viewBox="0 0 240 170" className="absolute bottom-0 left-2 h-44 w-60 drop-shadow-[0_16px_20px_rgba(30,58,138,0.22)]">
        <path d="M6 156 H70 V118 H6 Z" fill="#93b4f5" />
        <path d="M70 156 H134 V88 H70 Z" fill="#3b6fe0" />
        <path d="M134 156 H198 V54 H134 Z" fill="#1e3a8a" />
        <path d="M134 54 H198 L206 46 H142 Z" fill="#274a9e" />
        <path d="M166 54 V20" stroke="#1e3a8a" strokeWidth="3" strokeLinecap="round" />
        <path d="M166 20 L192 29 L166 38 Z" fill="#f5b53d" />
        <path d="M14 108 C50 98 78 74 118 50" fill="none" stroke="#f5b53d" strokeWidth="2.5" strokeDasharray="5 6" strokeLinecap="round" />
      </svg>

      <span className="absolute top-0 left-52 text-xl text-cta/70">+</span>
      <span className="absolute right-4 top-28 text-xl text-cta/70">+</span>
      <p className="absolute right-0 bottom-3 -rotate-6 text-right font-heading text-xl leading-6 font-medium text-primary/70 italic">
        One step closer,
        <br />
        one rank clearer
      </p>
    </div>
  )
}

export function RankHero() {
  return <StudentToolHero titleLead="Rank" titleAccent="Predictor" description="Estimate how your exam performance may translate into a rank once verified exam data is connected." artwork={<RankArtwork />} />
}

const howItWorks = [
  { icon: GraduationCap, title: 'Choose your exam', text: 'Pick the exam you want a rank estimate for.' },
  { icon: ClipboardList, title: 'Enter your performance', text: 'Add your score or percentile, plus optional category.' },
  { icon: Target, title: 'Review your rank estimate', text: 'Rank estimates will appear once verified exam data is connected.' },
]

export function RankHowItWorks() {
  return <ToolHowItWorks items={howItWorks} columnsClass="md:grid-cols-3" />
}

const relatedTools = [
  { icon: GraduationCap, title: 'College Predictor', text: 'Find colleges that may match your profile', href: '/college-predictor' },
  { icon: GitCompareArrows, title: 'College Comparison', text: 'Compare colleges side by side', href: '/compare' },
  { icon: Brain, title: 'Psychometric Test', text: 'Discover your interests and strengths', href: '/psychometric-test' },
]

export function RankRelatedTools() {
  return <ToolRelatedTools tools={relatedTools} />
}
