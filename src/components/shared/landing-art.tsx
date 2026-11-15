import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const white = '#ffffff'
const glow = 'rgba(255,255,255,0.12)'
const soft = 'rgba(255,255,255,0.55)'
const ink = 'var(--primary)'
const wash = 'var(--secondary)'
const faint = 'var(--muted)'
const accent = 'var(--brand-orange)'

const Rows = ({ x, y, widths, color = faint, gap = 12 }: { x: number; y: number; widths: number[]; color?: string; gap?: number }) => (
  <>
    {widths.map((width, index) => (
      <rect key={index} x={x} y={y + index * gap} width={width} height={6} rx={3} fill={color} />
    ))}
  </>
)

const Sparkles = () => (
  <>
    <circle cx={38} cy={56} r={4} fill={accent} />
    <circle cx={360} cy={40} r={3} fill={soft} />
    <circle cx={372} cy={250} r={4} fill={soft} />
    <circle cx={30} cy={232} r={3} fill={soft} />
    <path d="M330 92 v12 M324 98 h12" stroke={white} strokeWidth={3} strokeLinecap="round" />
  </>
)

const heroScenes = {
  careers: (
    <>
      <circle cx={210} cy={150} r={126} fill={glow} />
      <path d="M60 268 C120 230 150 200 186 150 S270 70 340 52" fill="none" stroke={soft} strokeWidth={4} strokeDasharray="2 12" strokeLinecap="round" />
      <rect x={148} y={96} width={10} height={160} rx={4} fill={white} />
      <path d="M156 104 h92 l18 16 l-18 16 h-92 z" fill={white} />
      <Rows x={170} y={114} widths={[56]} color={wash} />
      <path d="M150 150 h-86 l-18 16 l18 16 h86 z" fill={accent} />
      <rect x={72} y={162} width={48} height={6} rx={3} fill={white} opacity={0.85} />
      <path d="M156 196 h70 l16 14 l-16 14 h-70 z" fill={white} />
      <Rows x={170} y={207} widths={[40]} color={wash} />
      <g transform="translate(272 168)">
        <rect x={0} y={14} width={86} height={62} rx={12} fill={white} />
        <path d="M28 14 v-6 a6 6 0 0 1 6 -6 h18 a6 6 0 0 1 6 6 v6" fill="none" stroke={white} strokeWidth={6} />
        <rect x={0} y={36} width={86} height={8} fill={wash} />
        <rect x={36} y={32} width={14} height={16} rx={3} fill={accent} />
      </g>
      <g transform="translate(270 34)">
        <rect x={0} y={0} width={92} height={64} rx={12} fill={white} />
        <rect x={14} y={34} width={12} height={18} rx={2} fill={wash} />
        <rect x={32} y={24} width={12} height={28} rx={2} fill={wash} />
        <rect x={50} y={14} width={12} height={38} rx={2} fill={ink} />
        <rect x={68} y={20} width={12} height={32} rx={2} fill={accent} />
      </g>
      <Sparkles />
    </>
  ),
  studyAbroad: (
    <>
      <circle cx={200} cy={150} r={126} fill={glow} />
      <circle cx={190} cy={156} r={84} fill={white} />
      <ellipse cx={190} cy={156} rx={84} ry={30} fill="none" stroke={wash} strokeWidth={4} />
      <ellipse cx={190} cy={156} rx={34} ry={84} fill="none" stroke={wash} strokeWidth={4} />
      <path d="M106 156 h168 M190 72 v168" stroke={wash} strokeWidth={4} />
      <path d="M140 108 c18 -10 34 -4 40 10 c4 12 -10 18 -22 16 c-14 -2 -26 -14 -18 -26 z M204 170 c16 -6 32 2 34 16 c2 14 -16 24 -30 18 c-12 -6 -14 -26 -4 -34 z" fill={ink} opacity={0.85} />
      <path d="M44 236 C90 120 230 40 356 66" fill="none" stroke={soft} strokeWidth={4} strokeDasharray="2 12" strokeLinecap="round" />
      <g transform="translate(330 56) rotate(18)">
        <path d="M-30 0 L22 -6 L34 0 L22 6 Z" fill={white} />
        <path d="M-2 -3 L-16 -26 L-8 -26 L14 -4 Z M-2 3 L-16 26 L-8 26 L14 4 Z" fill={accent} />
        <path d="M-26 -1 L-36 -12 L-30 -12 L-18 -2 Z M-26 1 L-36 12 L-30 12 L-18 2 Z" fill={accent} />
      </g>
      <g transform="translate(286 182) rotate(10)">
        <rect x={0} y={0} width={70} height={92} rx={10} fill={ink} stroke={white} strokeWidth={4} />
        <circle cx={35} cy={38} r={16} fill="none" stroke={white} strokeWidth={4} />
        <path d="M19 38 h32 M35 22 v32" stroke={white} strokeWidth={3} />
        <rect x={18} y={66} width={34} height={6} rx={3} fill={white} />
      </g>
      <g transform="translate(36 70)">
        <rect x={0} y={0} width={86} height={52} rx={10} fill={white} />
        <rect x={0} y={0} width={24} height={52} rx={10} fill={accent} />
        <rect x={14} y={0} width={10} height={52} fill={accent} />
        <Rows x={34} y={14} widths={[38, 26]} color={wash} />
      </g>
      <Sparkles />
    </>
  ),
  about: (
    <>
      <circle cx={200} cy={150} r={126} fill={glow} />
      <g transform="translate(70 52)">
        <rect x={0} y={0} width={232} height={176} rx={16} fill={white} />
        <rect x={0} y={0} width={232} height={30} rx={16} fill={wash} />
        <rect x={0} y={16} width={232} height={14} fill={wash} />
        <circle cx={18} cy={15} r={4} fill={accent} />
        <circle cx={32} cy={15} r={4} fill={white} />
        <circle cx={46} cy={15} r={4} fill={white} />
        <rect x={18} y={44} width={196} height={22} rx={11} fill={faint} />
        <circle cx={34} cy={55} r={5} fill="none" stroke={ink} strokeWidth={2.5} />
        <path d="M18 92 l28 -14 l28 14 z" fill={ink} />
        <rect x={22} y={92} width={48} height={4} fill={ink} />
        <path d="M28 96 v22 M40 96 v22 M52 96 v22 M64 96 v22" stroke={ink} strokeWidth={4} />
        <rect x={20} y={118} width={52} height={6} rx={2} fill={ink} />
        <Rows x={88} y={84} widths={[110, 84, 96]} />
        <rect x={88} y={124} width={50} height={20} rx={10} fill={accent} />
        <Rows x={20} y={146} widths={[150]} />
      </g>
      <g transform="translate(276 170)">
        <circle cx={34} cy={34} r={30} fill={white} stroke={ink} strokeWidth={8} />
        <path d="M24 34 l8 8 l14 -16" fill="none" stroke={accent} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M56 56 l24 24" stroke={white} strokeWidth={12} strokeLinecap="round" />
      </g>
      <Sparkles />
    </>
  ),
  streams: (
    <>
      <circle cx={200} cy={150} r={126} fill={glow} />
      <g transform="translate(96 168)">
        <rect x={0} y={44} width={190} height={30} rx={6} fill={white} />
        <rect x={0} y={44} width={14} height={30} rx={4} fill={accent} />
        <rect x={12} y={12} width={170} height={30} rx={6} fill={ink} stroke={white} strokeWidth={4} />
        <rect x={150} y={12} width={14} height={30} fill={white} opacity={0.6} />
        <rect x={24} y={-20} width={150} height={30} rx={6} fill={white} />
        <rect x={34} y={-11} width={70} height={6} rx={3} fill={wash} />
      </g>
      <g transform="translate(130 46)">
        <path d="M0 40 L70 10 L140 40 L70 70 Z" fill={white} />
        <path d="M30 54 v30 c20 14 60 14 80 0 v-30 l-40 16 z" fill={white} opacity={0.9} />
        <path d="M120 48 v38" stroke={accent} strokeWidth={5} strokeLinecap="round" />
        <circle cx={120} cy={90} r={7} fill={accent} />
      </g>
      <g transform="translate(296 90)">
        <rect x={0} y={0} width={70} height={58} rx={12} fill={white} />
        <circle cx={22} cy={22} r={10} fill={wash} />
        <Rows x={14} y={38} widths={[42]} color={faint} />
      </g>
      <g transform="translate(26 92)">
        <rect x={0} y={0} width={74} height={50} rx={12} fill={white} />
        <rect x={12} y={12} width={22} height={26} rx={4} fill={accent} />
        <Rows x={40} y={14} widths={[22, 16]} color={faint} />
      </g>
      <Sparkles />
    </>
  ),
  resume: (
    <>
      <circle cx={205} cy={150} r={126} fill={glow} />
      <g transform="translate(40 112)">
        <rect x={0} y={0} width={72} height={96} rx={10} fill={white} opacity={0.9} />
        <rect x={8} y={8} width={20} height={80} rx={4} fill={wash} />
        <Rows x={34} y={12} widths={[28, 20, 26, 16]} color={faint} gap={11} />
      </g>
      <rect x={124} y={34} width={176} height={236} rx={14} fill={white} />
      <circle cx={166} cy={84} r={24} fill={wash} />
      <circle cx={166} cy={78} r={8} fill={ink} />
      <path d="M151 99 a15 13 0 0 1 30 0 z" fill={ink} />
      <Rows x={200} y={70} widths={[76, 52]} color={ink} gap={14} />
      <rect x={144} y={126} width={44} height={7} rx={3.5} fill={accent} />
      <Rows x={144} y={142} widths={[136, 116, 126]} color={faint} />
      <rect x={144} y={186} width={44} height={7} rx={3.5} fill={accent} />
      <Rows x={144} y={202} widths={[128, 96]} color={faint} />
      <rect x={144} y={236} width={36} height={14} rx={7} fill={wash} />
      <rect x={186} y={236} width={48} height={14} rx={7} fill={wash} />
      <rect x={240} y={236} width={32} height={14} rx={7} fill={wash} />
      <g transform="translate(300 126)">
        <circle cx={0} cy={0} r={30} fill={accent} />
        <path d="M-12 0 l8 8 l16 -16" fill="none" stroke={white} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g transform="translate(296 236) rotate(-38)">
        <rect x={0} y={-7} width={70} height={14} rx={3} fill={white} />
        <rect x={52} y={-7} width={12} height={14} fill={wash} />
        <path d="M0 -7 l-16 7 l16 7 z" fill={accent} />
      </g>
      <Sparkles />
    </>
  ),
  news: (
    <>
      <circle cx={200} cy={150} r={126} fill={glow} />
      <rect x={96} y={52} width={196} height={204} rx={14} fill={white} />
      <rect x={116} y={72} width={96} height={12} rx={6} fill={ink} />
      <rect x={116} y={92} width={60} height={8} rx={4} fill={accent} />
      <rect x={116} y={114} width={72} height={58} rx={8} fill={wash} />
      <path d="M126 160 l14 -16 l12 10 l10 -8 l16 14" fill="none" stroke={ink} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
      <Rows x={200} y={116} widths={[72, 64, 70, 48]} color={faint} />
      <Rows x={116} y={188} widths={[156, 140, 150, 96]} color={faint} />
      <g transform="translate(286 70)">
        <path d="M0 22 h14 l34 -20 v58 l-34 -20 h-14 z" fill={accent} />
        <rect x={6} y={40} width={12} height={22} rx={4} fill={accent} />
        <path d="M58 16 c8 6 8 22 0 28 M66 8 c14 10 14 34 0 44" fill="none" stroke={white} strokeWidth={4} strokeLinecap="round" />
      </g>
      <g transform="translate(40 168)">
        <rect x={0} y={0} width={70} height={66} rx={10} fill={white} opacity={0.92} />
        <rect x={0} y={0} width={70} height={18} rx={9} fill={ink} />
        <rect x={0} y={9} width={70} height={9} fill={ink} />
        <circle cx={18} cy={34} r={4} fill={faint} />
        <circle cx={35} cy={34} r={4} fill={accent} />
        <circle cx={52} cy={34} r={4} fill={faint} />
        <circle cx={18} cy={50} r={4} fill={faint} />
        <circle cx={35} cy={50} r={4} fill={faint} />
      </g>
      <Sparkles />
    </>
  ),
} satisfies Record<string, ReactNode>

export type HeroSceneName = keyof typeof heroScenes

export function HeroScene({ name, className }: { name: HeroSceneName; className?: string }) {
  return (
    <svg viewBox="0 0 400 300" aria-hidden="true" className={cn('h-auto w-full', className)}>
      {heroScenes[name]}
    </svg>
  )
}

const fieldArt = {
  engineering: (
    <>
      <circle cx={40} cy={42} r={20} fill="none" stroke={ink} strokeWidth={8} strokeDasharray="7 5" />
      <circle cx={40} cy={42} r={11} fill={ink} />
      <circle cx={40} cy={42} r={4} fill={white} />
      <path d="M58 64 h14 v-14 M72 64 l8 8" fill="none" stroke={accent} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={72} cy={50} r={4} fill={accent} />
    </>
  ),
  medicine: (
    <>
      <path d="M44 74 C18 56 12 40 20 28 C28 16 42 20 44 30 C46 20 60 16 68 28 C76 40 70 56 44 74 Z" fill={white} stroke={ink} strokeWidth={4} strokeLinejoin="round" />
      <path d="M44 34 v24 M32 46 h24" stroke={accent} strokeWidth={7} strokeLinecap="round" />
    </>
  ),
  business: (
    <>
      <rect x={14} y={30} width={60} height={42} rx={8} fill={white} stroke={ink} strokeWidth={4} />
      <path d="M34 30 v-6 a4 4 0 0 1 4 -4 h12 a4 4 0 0 1 4 4 v6" fill="none" stroke={ink} strokeWidth={4} />
      <rect x={24} y={50} width={8} height={14} rx={2} fill={wash} />
      <rect x={38} y={44} width={8} height={20} rx={2} fill={ink} />
      <rect x={52} y={38} width={8} height={26} rx={2} fill={accent} />
    </>
  ),
  design: (
    <>
      <circle cx={34} cy={36} r={18} fill={white} stroke={ink} strokeWidth={4} />
      <rect x={42} y={42} width={30} height={30} rx={6} fill={wash} stroke={ink} strokeWidth={4} />
      <path d="M58 14 l14 14 l-26 26 l-16 2 l2 -16 z" fill={accent} stroke={accent} strokeWidth={2} strokeLinejoin="round" />
    </>
  ),
  law: (
    <>
      <path d="M44 16 v54 M26 70 h36" stroke={ink} strokeWidth={4} strokeLinecap="round" />
      <path d="M18 26 h52" stroke={ink} strokeWidth={4} strokeLinecap="round" />
      <path d="M22 28 l-10 22 h20 z M66 28 l-10 22 h20 z" fill={white} stroke={ink} strokeWidth={3} strokeLinejoin="round" />
      <circle cx={44} cy={16} r={5} fill={accent} />
    </>
  ),
  science: (
    <>
      <path d="M36 14 h16 M40 14 v20 L22 66 a6 6 0 0 0 5 9 h34 a6 6 0 0 0 5 -9 L48 34 v-20" fill={white} stroke={ink} strokeWidth={4} strokeLinejoin="round" />
      <path d="M28 58 h32 l6 10 a4 4 0 0 1 -4 6 h-36 a4 4 0 0 1 -4 -6 z" fill={wash} />
      <circle cx={38} cy={64} r={4} fill={accent} />
      <circle cx={50} cy={58} r={3} fill={ink} />
    </>
  ),
  education: (
    <>
      <path d="M14 34 L44 20 L74 34 L44 48 Z" fill={ink} />
      <path d="M26 42 v14 c10 8 26 8 36 0 v-14 l-18 8 z" fill={white} stroke={ink} strokeWidth={4} strokeLinejoin="round" />
      <path d="M68 38 v18" stroke={accent} strokeWidth={4} strokeLinecap="round" />
      <circle cx={68} cy={60} r={5} fill={accent} />
    </>
  ),
  media: (
    <>
      <path d="M18 38 h12 l26 -16 v44 l-26 -16 h-12 z" fill={white} stroke={ink} strokeWidth={4} strokeLinejoin="round" />
      <path d="M24 50 l4 18 h8 l-4 -18" fill={wash} stroke={ink} strokeWidth={3} strokeLinejoin="round" />
      <path d="M64 34 c6 4 6 16 0 20 M70 28 c10 8 10 24 0 32" fill="none" stroke={accent} strokeWidth={4} strokeLinecap="round" />
    </>
  ),
  commerce: (
    <>
      <rect x={18} y={12} width={38} height={60} rx={7} fill={white} stroke={ink} strokeWidth={4} />
      <rect x={25} y={20} width={24} height={11} rx={2.5} fill={wash} />
      <circle cx={29} cy={41} r={3} fill={ink} />
      <circle cx={37} cy={41} r={3} fill={ink} />
      <circle cx={45} cy={41} r={3} fill={ink} />
      <circle cx={29} cy={50} r={3} fill={ink} />
      <circle cx={37} cy={50} r={3} fill={ink} />
      <circle cx={45} cy={50} r={3} fill={ink} />
      <rect x={26} y={57} width={14} height={6} rx={3} fill={ink} />
      <circle cx={64} cy={64} r={13} fill={accent} />
      <path d="M58 57.5 h12 M58 62 h12 M61 57.5 c6 0 6 9 0 9 l7 6" fill="none" stroke={white} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
} satisfies Record<string, ReactNode>

export type FieldArtName = keyof typeof fieldArt

export const fieldArtNames = Object.keys(fieldArt) as FieldArtName[]

export function FieldArt({ name, className }: { name: FieldArtName; className?: string }) {
  return (
    <span aria-hidden="true" className={cn('flex size-16 shrink-0 items-center justify-center rounded-2xl bg-secondary', className)}>
      <svg viewBox="0 0 88 88" className="size-[86%]">
        {fieldArt[name]}
      </svg>
    </span>
  )
}
