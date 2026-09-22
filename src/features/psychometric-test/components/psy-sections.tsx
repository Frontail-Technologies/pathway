import { ClipboardList, Compass, FileText, GitCompareArrows, GraduationCap, Heart, Layers, Sparkles, TrendingUp, UserRound } from 'lucide-react'
import { StudentToolHero } from '@/components/shared/student-tool/student-tool-hero'
import { ToolHowItWorks, ToolRelatedTools } from '@/components/shared/student-tool/student-tool-parts'

/** Local decorative illustration: a compass with branching pathways and three interest cards. No brain/clinical imagery, no data. */
function PsyArtwork() {
  return (
    <div className="relative hidden h-52 w-120 shrink-0 lg:block" aria-hidden="true">
      <div className="absolute top-3 left-60 w-44 rounded-2xl bg-white/85 p-3 shadow-[0_12px_32px_rgba(30,58,138,0.12)] ring-1 ring-primary/10 backdrop-blur-sm">
        {[
          [Heart, 'Interests'],
          [Sparkles, 'Strengths'],
          [Layers, 'Directions'],
        ].map(([Icon, label]) => {
          const I = Icon as typeof Heart
          return (
            <div key={label as string} className="mb-1.5 flex items-center gap-2 rounded-lg bg-white px-2.5 py-2 text-[11px] font-medium text-foreground last:mb-0">
              <span className="flex size-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                <I className="size-3" />
              </span>
              {label as string}
            </div>
          )
        })}
      </div>

      <svg viewBox="0 0 220 170" className="absolute bottom-0 left-2 h-44 w-56 drop-shadow-[0_16px_20px_rgba(30,58,138,0.22)]">
        <path d="M110 128 C110 96 60 96 40 60" fill="none" stroke="#93b4f5" strokeWidth="3" strokeDasharray="5 6" strokeLinecap="round" />
        <path d="M110 128 C110 96 160 96 180 60" fill="none" stroke="#93b4f5" strokeWidth="3" strokeDasharray="5 6" strokeLinecap="round" />
        <path d="M110 128 V40" fill="none" stroke="#93b4f5" strokeWidth="3" strokeDasharray="5 6" strokeLinecap="round" />
        <circle cx="40" cy="56" r="7" fill="#f5b53d" />
        <circle cx="110" cy="34" r="7" fill="#3b6fe0" />
        <circle cx="180" cy="56" r="7" fill="#1e3a8a" />
        <circle cx="110" cy="128" r="30" fill="#1e3a8a" />
        <circle cx="110" cy="128" r="23" fill="#fff" />
        <path d="M110 108 L118 128 L110 148 L102 128 Z" fill="#f5b53d" />
        <path d="M110 108 L118 128 H102 Z" fill="#1e3a8a" />
        <circle cx="110" cy="128" r="3" fill="#1e3a8a" />
      </svg>

      <span className="absolute top-0 left-52 text-xl text-cta/70">+</span>
      <span className="absolute right-4 top-28 text-xl text-cta/70">+</span>
      <p className="absolute right-0 bottom-3 -rotate-6 text-right font-heading text-xl leading-6 font-medium text-primary/70 italic">
        Know yourself,
        <br />
        explore your path
      </p>
    </div>
  )
}

export function PsyHero() {
  return (
    <StudentToolHero
      titleLead="Psychometric"
      titleAccent="Test"
      description="Explore your interests, strengths and preferred ways of working to discover career directions worth considering."
      artwork={<PsyArtwork />}
    />
  )
}

const howItWorks = [
  { icon: UserRound, title: 'Tell us about yourself', text: 'Share your study level and what you want to explore.' },
  { icon: Heart, title: 'Share your interests', text: 'Rate how much you like a few everyday activities.' },
  { icon: ClipboardList, title: 'Choose your work style', text: 'Pick the way of working that feels more natural.' },
  { icon: Compass, title: 'Explore your profile', text: 'See the directions your answers point towards.' },
]

export function PsyHowItWorks() {
  return <ToolHowItWorks items={howItWorks} columnsClass="sm:grid-cols-2 lg:grid-cols-4" />
}

const relatedTools = [
  { icon: GraduationCap, title: 'College Predictor', text: 'Find colleges that may match your profile', href: '/college-predictor' },
  { icon: TrendingUp, title: 'Rank Predictor', text: 'Estimate your rank from a score', href: '/rank-predictor' },
  { icon: FileText, title: 'Resume Builder', text: 'Build a clean student resume', href: '/resume-builder' },
  { icon: GitCompareArrows, title: 'College Comparison', text: 'Compare colleges side by side', href: '/compare' },
]

export function PsyRelatedTools() {
  return <ToolRelatedTools tools={relatedTools} columnsClass="sm:grid-cols-2 lg:grid-cols-4" />
}
