import Image from 'next/image'
import { SpotArt, type SpotArtName } from '@/components/shared/spot-art'
import { cn } from '@/lib/utils'
import type { Article } from '../api/content-api'

const categoryArt: Record<string, SpotArtName> = {
  admissions: 'predictor',
  exams: 'exam',
  colleges: 'college',
  courses: 'courses',
  careers: 'guide',
  study_abroad: 'state',
  scholarships: 'scholarship',
  general: 'notes',
}

export function ArticleCover({ article, tone = 'light', className, sizes = '(min-width: 1024px) 40vw, 100vw' }: { article: Article; tone?: 'light' | 'blue'; className?: string; sizes?: string }) {
  if (article.heroImageUrl) {
    return (
      <div className={cn('relative overflow-hidden bg-muted', className)}>
        <Image src={article.heroImageUrl} alt="" fill sizes={sizes} className="object-cover transition-transform duration-300 group-hover:scale-[1.02]" unoptimized />
      </div>
    )
  }
  const blue = tone === 'blue'
  return (
    <div aria-hidden="true" className={cn('relative overflow-hidden', blue ? 'bg-primary' : 'bg-secondary', className)}>
      <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
        <circle cx={262} cy={36} r={92} fill={blue ? 'rgba(255,255,255,0.1)' : 'var(--card)'} opacity={blue ? 1 : 0.7} />
        <circle cx={40} cy={168} r={56} fill={blue ? 'rgba(255,255,255,0.08)' : 'var(--card)'} opacity={blue ? 1 : 0.5} />
        <circle cx={58} cy={34} r={5} fill="var(--brand-orange)" />
        <circle cx={286} cy={150} r={4} fill={blue ? 'rgba(255,255,255,0.6)' : 'var(--primary)'} opacity={0.5} />
        <path d="M250 112 v12 M244 118 h12" stroke={blue ? '#ffffff' : 'var(--primary)'} strokeOpacity={0.5} strokeWidth={3} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <SpotArt name={categoryArt[article.category ?? ''] ?? 'notes'} className="aspect-square h-[52%] max-h-28 w-auto rounded-3xl bg-card shadow-[0_10px_30px_rgba(15,23,42,0.12)] transition-transform duration-300 group-hover:scale-105" />
      </div>
    </div>
  )
}
