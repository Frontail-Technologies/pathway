import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const ink = 'var(--primary)'
const fill = 'var(--card)'
const wash = 'var(--secondary)'
const accent = 'var(--brand-orange)'
const white = '#ffffff'
const line = { stroke: ink, strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

const spots = {
  trophy: (
    <>
      <path d="M15 13 h-3.5 a4.5 4.5 0 0 0 4.5 8 M33 13 h3.5 a4.5 4.5 0 0 1 -4.5 8" fill="none" {...line} />
      <path d="M15 9 h18 v9 a9 9 0 0 1 -18 0 z" fill={ink} />
      <circle cx={24} cy={16} r={3} fill={fill} />
      <rect x={22} y={27} width={4} height={6} fill={ink} />
      <rect x={15} y={33} width={18} height={6} rx={2} fill={accent} />
    </>
  ),
  college: (
    <>
      <path d="M7 18 L24 8 L41 18 Z" fill={ink} />
      <circle cx={24} cy={14} r={2.5} fill={accent} />
      <rect x={12} y={20} width={5} height={15} rx={1} fill={fill} stroke={ink} strokeWidth={2} />
      <rect x={21.5} y={20} width={5} height={15} rx={1} fill={fill} stroke={ink} strokeWidth={2} />
      <rect x={31} y={20} width={5} height={15} rx={1} fill={fill} stroke={ink} strokeWidth={2} />
      <rect x={8} y={36} width={32} height={4} rx={1.5} fill={ink} />
    </>
  ),
  courses: (
    <>
      <path d="M24 14 c-5 -4 -12 -4 -17 -2 v24 c5 -2 12 -2 17 2 z" fill={fill} {...line} />
      <path d="M24 14 c5 -4 12 -4 17 -2 v24 c-5 -2 -12 -2 -17 2 z" fill={wash} {...line} />
      <path d="M11 19 h8 M11 25 h8" stroke={ink} strokeOpacity={0.45} strokeWidth={2.5} strokeLinecap="round" />
      <path d="M31 10.5 v10 l2.5 -2 l2.5 2 v-10.5" fill={accent} />
    </>
  ),
  exam: (
    <>
      <rect x={10} y={6} width={23} height={31} rx={3} fill={fill} {...line} />
      <path d="M15.5 14 h12 M15.5 20 h12 M15.5 26 h7" stroke={ink} strokeOpacity={0.45} strokeWidth={2.5} strokeLinecap="round" />
      <circle cx={33} cy={34} r={8.5} fill={accent} />
      <path d="M29.2 34 l2.6 2.6 l5 -5" fill="none" stroke={white} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  scholarship: (
    <>
      <path d="M14 5 h7.5 l5 11 h-7.5 z" fill={ink} />
      <path d="M34 5 h-7.5 l-5 11 h7.5 z" fill={accent} />
      <circle cx={24} cy={29} r={11} fill={fill} {...line} />
      <path d="M24 23.5 l1.7 3.7 l4 .4 l-3 2.6 l.9 3.9 l-3.6 -2.1 l-3.6 2.1 l.9 -3.9 l-3 -2.6 l4 -.4 z" fill={accent} />
    </>
  ),
  predictor: (
    <>
      <circle cx={21} cy={27} r={14} fill={fill} {...line} />
      <circle cx={21} cy={27} r={8} fill="none" stroke={ink} strokeOpacity={0.45} strokeWidth={2.5} />
      <circle cx={21} cy={27} r={3.5} fill={accent} />
      <path d="M21 27 L38 10" {...line} />
      <path d="M32 9 h7 v7" fill="none" {...line} />
    </>
  ),
  compare: (
    <>
      <rect x={5} y={11} width={16} height={24} rx={3} fill={fill} {...line} />
      <rect x={27} y={11} width={16} height={24} rx={3} fill={wash} {...line} />
      <path d="M9.5 18 h7 M9.5 23 h5 M31.5 18 h7 M31.5 23 h5" stroke={ink} strokeOpacity={0.45} strokeWidth={2.2} strokeLinecap="round" />
      <circle cx={24} cy={30} r={6.5} fill={accent} />
      <path d="M21 30 h6 M23 28 l-2 2 l2 2 M25 28 l2 2 l-2 2" fill="none" stroke={white} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  guide: (
    <>
      <circle cx={24} cy={24} r={16} fill={fill} {...line} />
      <path d="M24 11 l4.5 13 h-9 z" fill={accent} />
      <path d="M24 37 l4.5 -13 h-9 z" fill={ink} />
      <circle cx={24} cy={24} r={2.2} fill={fill} />
    </>
  ),
  chart: (
    <>
      <rect x={8} y={26} width={8} height={14} rx={2} fill={wash} stroke={ink} strokeWidth={2} />
      <rect x={20} y={18} width={8} height={22} rx={2} fill={ink} />
      <rect x={32} y={10} width={8} height={30} rx={2} fill={accent} />
    </>
  ),
  presentation: (
    <>
      <rect x={6} y={8} width={36} height={24} rx={3} fill={fill} {...line} />
      <path d="M12 26 l7 -7 l5 4 l9 -9" fill="none" stroke={accent} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 32 v6 M17 41 l7 -3 l7 3" fill="none" {...line} />
    </>
  ),
  state: (
    <>
      <ellipse cx={24} cy={41} rx={11} ry={3} fill={wash} />
      <path d="M24 40 c-8 -9 -13 -15 -13 -21 a13 13 0 0 1 26 0 c0 6 -5 12 -13 21 z" fill={ink} />
      <circle cx={24} cy={19} r={5.5} fill={fill} />
      <circle cx={24} cy={19} r={2.5} fill={accent} />
    </>
  ),
  city: (
    <>
      <circle cx={38} cy={11} r={4} fill={accent} />
      <rect x={7} y={21} width={10} height={19} rx={1.5} fill={fill} stroke={ink} strokeWidth={2.2} />
      <rect x={19} y={10} width={11} height={30} rx={1.5} fill={ink} />
      <rect x={32} y={24} width={9} height={16} rx={1.5} fill={fill} stroke={ink} strokeWidth={2.2} />
      <path d="M22.5 15 h4 M22.5 21 h4 M22.5 27 h4" stroke={fill} strokeWidth={2.2} strokeLinecap="round" />
      <path d="M4 40 h40" {...line} />
    </>
  ),
  sources: (
    <>
      <path d="M10 6 h18 l8 8 v26 a2 2 0 0 1 -2 2 h-24 a2 2 0 0 1 -2 -2 v-32 a2 2 0 0 1 2 -2 z" fill={fill} {...line} />
      <path d="M28 6 v8 h8" fill="none" {...line} />
      <path d="M14 20 h12 M14 26 h8" stroke={ink} strokeOpacity={0.45} strokeWidth={2.5} strokeLinecap="round" />
      <circle cx={31} cy={34} r={7} fill={accent} />
      <path d="M28 41 l-1 5 l4 -2 l4 2 l-1 -5" fill={accent} />
    </>
  ),
  verified: (
    <>
      <path d="M24 5 l4.5 3.3 5.5 -.2 1.7 5.3 4.5 3.2 -1.7 5.4 1.7 5.4 -4.5 3.2 -1.7 5.3 -5.5 -.2 -4.5 3.3 -4.5 -3.3 -5.5 .2 -1.7 -5.3 -4.5 -3.2 1.7 -5.4 -1.7 -5.4 4.5 -3.2 1.7 -5.3 5.5 .2 z" fill={ink} />
      <path d="M17.5 24 l4.5 4.5 l8.5 -8.5" fill="none" stroke={white} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={38} cy={38} r={4} fill={accent} />
    </>
  ),
  open: (
    <>
      <path d="M16 21 v-6 a8 8 0 0 1 15.5 -2.8" fill="none" stroke={ink} strokeWidth={3} strokeLinecap="round" />
      <rect x={10} y={21} width={28} height={20} rx={4} fill={fill} {...line} />
      <circle cx={24} cy={29.5} r={3} fill={accent} />
      <path d="M24 31 v4.5" stroke={accent} strokeWidth={3} strokeLinecap="round" />
    </>
  ),
  updated: (
    <>
      <path d="M38 20 a15 15 0 0 0 -27.5 -4" fill="none" {...line} />
      <path d="M10 28 a15 15 0 0 0 27.5 4" fill="none" stroke={accent} strokeWidth={2.5} strokeLinecap="round" />
      <path d="M9 9 v7.5 h7.5" fill="none" {...line} />
      <path d="M39 39 v-7.5 h-7.5" fill="none" stroke={accent} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={24} cy={24} r={5} fill={wash} stroke={ink} strokeWidth={2} />
    </>
  ),
  tutor: (
    <>
      <circle cx={24} cy={17} r={8} fill={ink} />
      <path d="M10 41 a14 13 0 0 1 28 0 z" fill={ink} />
      <path d="M14 11 L24 6 L34 11 L24 16 Z" fill={accent} />
      <path d="M34 11 v6" stroke={accent} strokeWidth={2} strokeLinecap="round" />
      <rect x={20} y={30} width={8} height={6} rx={1.5} fill={fill} />
    </>
  ),
  notes: (
    <>
      <rect x={13} y={8} width={24} height={32} rx={3} fill={wash} {...line} />
      <rect x={9} y={12} width={24} height={30} rx={3} fill={fill} {...line} />
      <path d="M14.5 20 h13 M14.5 26 h13 M14.5 32 h8" stroke={ink} strokeOpacity={0.45} strokeWidth={2.5} strokeLinecap="round" />
      <path d="M33 30 l8 -8 l3 3 l-8 8 l-4 1 z" fill={accent} />
    </>
  ),
  search: (
    <>
      <circle cx={21} cy={21} r={12} fill={fill} stroke={ink} strokeWidth={3.5} />
      <path d="M15 21 a6 6 0 0 1 6 -6" fill="none" stroke={accent} strokeWidth={2.5} strokeLinecap="round" />
      <path d="M30 30 l10 10" stroke={ink} strokeWidth={5} strokeLinecap="round" />
    </>
  ),
} satisfies Record<string, ReactNode>

export type SpotArtName = keyof typeof spots

export function SpotArt({ name, className }: { name: SpotArtName; className?: string }) {
  return (
    <span aria-hidden="true" className={cn('flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary', className)}>
      <svg viewBox="0 0 48 48" className="size-[78%]">
        {spots[name]}
      </svg>
    </span>
  )
}
