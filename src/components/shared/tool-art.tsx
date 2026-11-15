import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const ink = 'var(--primary)'
const fill = 'var(--card)'
const wash = 'var(--secondary)'
const faint = 'var(--muted)'
const accent = 'var(--brand-orange)'
const onAccent = '#ffffff'

const art = {
  collegePredictor: (
    <>
      <circle cx={38} cy={40} r={24} fill={fill} stroke={ink} strokeWidth={3} />
      <circle cx={38} cy={40} r={15} fill="none" stroke={ink} strokeOpacity={0.5} strokeWidth={3} />
      <circle cx={38} cy={40} r={6} fill={accent} />
      <path d="M38 40 L62 16" stroke={ink} strokeWidth={3} strokeLinecap="round" />
      <path d="M56 14 h8 v8" fill="none" stroke={ink} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M50 74 L64 64 L78 74 Z" fill={ink} />
      <rect x={52} y={74} width={24} height={4} rx={1} fill={ink} />
      <path d="M56 74 v-6 M64 74 v-6 M72 74 v-6" stroke={fill} strokeWidth={2} strokeLinecap="round" />
    </>
  ),
  rankPredictor: (
    <>
      <rect x={14} y={50} width={18} height={24} rx={3} fill={fill} stroke={ink} strokeWidth={3} />
      <rect x={35} y={36} width={18} height={38} rx={3} fill={ink} />
      <rect x={56} y={58} width={18} height={16} rx={3} fill={fill} stroke={ink} strokeWidth={3} />
      <path d="M41 50 h6 M44 47 v9" stroke={onAccent} strokeWidth={2.5} strokeLinecap="round" />
      <path d="M12 30 L28 22 L40 26 L60 12" fill="none" stroke={accent} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M52 11 h9 v9" fill="none" stroke={accent} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  psychometric: (
    <>
      <path
        d="M30 76 v-12 c-8 -4 -14 -12 -14 -24 c0 -14 11 -26 26 -26 c14 0 24 10 24 22 l6 10 l-6 2 v8 c0 4 -3 6 -7 6 h-7 v14"
        fill={fill}
        stroke={ink}
        strokeWidth={3}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx={40} cy={34} r={11} fill={wash} stroke={ink} strokeWidth={2.5} />
      <path d="M36 40 v3 h8 v-3" fill="none" stroke={ink} strokeWidth={2.5} strokeLinejoin="round" />
      <path d="M40 23 v-3 M51 34 h3 M26 34 h3 M48 26 l2 -2 M30 24 l2 2" stroke={accent} strokeWidth={2.5} strokeLinecap="round" />
    </>
  ),
  compare: (
    <>
      <rect x={10} y={16} width={30} height={44} rx={6} fill={fill} stroke={ink} strokeWidth={3} />
      <rect x={16} y={22} width={12} height={12} rx={3} fill={wash} />
      <rect x={16} y={40} width={18} height={4} rx={2} fill={faint} />
      <rect x={16} y={48} width={13} height={4} rx={2} fill={faint} />
      <rect x={48} y={16} width={30} height={44} rx={6} fill={fill} stroke={ink} strokeWidth={3} />
      <rect x={54} y={22} width={12} height={12} rx={3} fill={accent} />
      <rect x={54} y={40} width={18} height={4} rx={2} fill={faint} />
      <rect x={54} y={48} width={13} height={4} rx={2} fill={faint} />
      <path d="M28 70 h32 M33 65 l-5 5 l5 5 M55 65 l5 5 l-5 5" fill="none" stroke={ink} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  resume: (
    <>
      <path d="M18 10 h34 l14 14 v52 a4 4 0 0 1 -4 4 h-44 a4 4 0 0 1 -4 -4 v-62 a4 4 0 0 1 4 -4 z" fill={fill} stroke={ink} strokeWidth={3} strokeLinejoin="round" />
      <path d="M52 10 v14 h14" fill="none" stroke={ink} strokeWidth={3} strokeLinejoin="round" />
      <circle cx={30} cy={30} r={7} fill={wash} stroke={ink} strokeWidth={2.5} />
      <rect x={22} y={44} width={34} height={4} rx={2} fill={faint} />
      <rect x={22} y={53} width={28} height={4} rx={2} fill={faint} />
      <rect x={22} y={62} width={20} height={4} rx={2} fill={faint} />
      <path d="M58 72 l16 -16 l5 5 l-16 16 h-5 z" fill={accent} stroke={accent} strokeWidth={2} strokeLinejoin="round" />
    </>
  ),
  cutoffs: (
    <>
      <rect x={10} y={14} width={68} height={60} rx={8} fill={fill} stroke={ink} strokeWidth={3} />
      <path d="M10 30 h68" stroke={ink} strokeWidth={3} />
      <rect x={18} y={20} width={22} height={5} rx={2.5} fill={wash} />
      <rect x={18} y={38} width={30} height={5} rx={2.5} fill={faint} />
      <rect x={18} y={50} width={24} height={5} rx={2.5} fill={faint} />
      <rect x={18} y={62} width={28} height={5} rx={2.5} fill={faint} />
      <rect x={56} y={36} width={14} height={9} rx={3} fill={accent} />
      <rect x={56} y={48} width={14} height={9} rx={3} fill={wash} />
      <rect x={56} y={60} width={14} height={9} rx={3} fill={wash} />
    </>
  ),
  calendar: (
    <>
      <rect x={12} y={18} width={64} height={58} rx={8} fill={fill} stroke={ink} strokeWidth={3} />
      <path d="M12 34 h64" stroke={ink} strokeWidth={3} />
      <path d="M28 12 v12 M60 12 v12" stroke={ink} strokeWidth={4} strokeLinecap="round" />
      <rect x={22} y={42} width={10} height={9} rx={2} fill={faint} />
      <rect x={39} y={42} width={10} height={9} rx={2} fill={faint} />
      <rect x={56} y={42} width={10} height={9} rx={2} fill={accent} />
      <rect x={22} y={57} width={10} height={9} rx={2} fill={faint} />
      <rect x={39} y={57} width={10} height={9} rx={2} fill={wash} />
    </>
  ),
  loan: (
    <>
      <circle cx={32} cy={46} r={22} fill={fill} stroke={ink} strokeWidth={3} />
      <path d="M24 36 h16 M24 43 h16 M28 36 c10 0 10 14 0 14 l12 12" fill="none" stroke={ink} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      <rect x={58} y={50} width={8} height={18} rx={2} fill={wash} />
      <rect x={70} y={40} width={8} height={28} rx={2} fill={ink} />
      <path d="M56 34 l10 -8 l8 4 l8 -10" fill="none" stroke={accent} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
} satisfies Record<string, ReactNode>

export type ToolArtName = keyof typeof art

export function ToolArt({ name, className }: { name: ToolArtName; className?: string }) {
  return (
    <span aria-hidden="true" className={cn('flex size-16 shrink-0 items-center justify-center rounded-2xl bg-secondary', className)}>
      <svg viewBox="0 0 88 88" className="size-[86%]">
        {art[name]}
      </svg>
    </span>
  )
}
