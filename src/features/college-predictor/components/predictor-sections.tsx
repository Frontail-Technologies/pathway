import { BarChart3, ClipboardList, Compass, FileText, GitCompareArrows, GraduationCap, ListChecks, SlidersHorizontal, TrendingUp } from 'lucide-react'
import { StudentToolHero } from '@/components/shared/student-tool/student-tool-hero'
import { ToolHowItWorks, ToolRelatedTools } from '@/components/shared/student-tool/student-tool-parts'

const benefits = [
  { icon: Compass, label: 'Make informed choices' },
  { icon: ListChecks, label: 'Shortlist suitable colleges' },
  { icon: BarChart3, label: 'Plan your next steps' },
]

 
function HeroArtwork() {
  return (
    <div className="relative hidden h-52 w-120 shrink-0 lg:block" aria-hidden="true">
      <div className="absolute top-3 left-64 w-44 rounded-2xl bg-white/80 p-3 shadow-[0_12px_32px_rgba(30,58,138,0.12)] ring-1 ring-primary/10 backdrop-blur-sm">
        {[
          ['Top Matches', 'bg-success'],
          ['Balanced Options', 'bg-primary'],
          ['Explore More', 'bg-cta'],
        ].map(([label, dot]) => (
          <div key={label} className="mb-1.5 flex items-center gap-2 rounded-lg bg-white px-2.5 py-2 text-[11px] font-medium text-foreground last:mb-0">
            <span className={`size-2 rounded-full ${dot}`} />
            {label}
          </div>
        ))}
      </div>

      <svg viewBox="0 0 220 170" className="absolute bottom-0 left-0 h-44 w-56 drop-shadow-[0_16px_20px_rgba(30,58,138,0.25)]">
        <rect x="14" y="128" width="160" height="16" rx="3" fill="#f3ead6" />
        <rect x="18" y="118" width="152" height="14" rx="3" fill="#1e3a8a" />
        <rect x="14" y="140" width="164" height="6" rx="2" fill="#dfd3b8" />
        <path d="M96 40 L184 70 L96 100 L8 70 Z" fill="#1e3a8a" />
        <path d="M46 88 v22 c0 8 22 16 50 16 s50-8 50-16 V88 L96 104 Z" fill="#172c6b" />
        <path d="M96 40 L184 70 L96 100 Z" fill="#274a9e" opacity=".55" />
        <path d="M96 70 L182 76 v34" fill="none" stroke="#f5b53d" strokeWidth="3" strokeLinecap="round" />
        <circle cx="182" cy="114" r="5" fill="#f5b53d" />
        <path d="M182 118 v18" stroke="#f5b53d" strokeWidth="4" strokeLinecap="round" />
      </svg>

      <span className="absolute top-0 left-58 text-xl text-cta/70">+</span>
      <span className="absolute right-4 top-24 text-xl text-cta/70">+</span>
      <p className="absolute right-0 bottom-3 -rotate-6 text-right font-heading text-xl leading-6 font-medium text-primary/70 italic">
        Right college,
        <br />
        brighter future
      </p>
    </div>
  )
}

export function PredictorHero() {
  return <StudentToolHero titleLead="College" titleAccent="Predictor" description="Find colleges that may match your entrance-exam profile, category and preferences." benefits={benefits} artwork={<HeroArtwork />} />
}

const howItWorks = [
  { icon: GraduationCap, title: 'Choose course & exams', text: 'Pick what you want to study and the exams you took.' },
  { icon: ClipboardList, title: 'Add exam performance', text: 'Enter a rank, percentile or score for each exam.' },
  { icon: SlidersHorizontal, title: 'Set preferences', text: 'Choose states, branches and college type.' },
  { icon: TrendingUp, title: 'Review options', text: 'See how results will be grouped once the engine is live.' },
]

export function HowItWorks() {
  return <ToolHowItWorks items={howItWorks} columnsClass="sm:grid-cols-2 lg:grid-cols-4" />
}

const relatedTools = [
  { icon: TrendingUp, title: 'Rank Predictor', text: 'Estimate your rank from a score', href: '/rank-predictor' },
  { icon: GitCompareArrows, title: 'College Comparison', text: 'Compare colleges side by side', href: '/compare' },
  { icon: FileText, title: 'Resume Builder', text: 'Build a clean student resume', href: '/resume-builder' },
]

export function RelatedStudentTools() {
  return <ToolRelatedTools tools={relatedTools} />
}
