import type { ReactNode } from 'react'

const ink = 'var(--primary)'
const fill = 'var(--card)'
const wash = 'color-mix(in srgb, var(--primary) 10%, transparent)'
const line = 'var(--border)'
const faint = 'var(--muted)'
const accent = '#f97316'
const accentSoft = 'color-mix(in srgb, #f97316 14%, transparent)'
const onAccent = '#ffffff'
const success = 'var(--success)'

function Stage({ children }: { children: ReactNode }) {
  return (
    <>
      <circle cx={100} cy={74} r={60} fill={wash} />
      <path d="M36 134 H140 v-6 h8 v-6 h8" fill="none" stroke={line} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M150 116 h6 v6" fill="none" stroke={accent} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={34} cy={42} r={3.5} fill={accent} />
      <circle cx={168} cy={34} r={2.5} fill={ink} opacity={0.45} />
      <circle cx={26} cy={96} r={2} fill={ink} opacity={0.35} />
      {children}
    </>
  )
}

const Lines = ({ x, y, widths }: { x: number; y: number; widths: number[] }) => (
  <>
    {widths.map((width, index) => (
      <rect key={index} x={x} y={y + index * 12} width={width} height={6} rx={3} fill={faint} />
    ))}
  </>
)

const scenes = {
  noResults: (
    <>
      <rect x={56} y={30} width={64} height={80} rx={10} fill={fill} stroke={line} strokeWidth={3} transform="rotate(-7 88 70)" />
      <rect x={66} y={40} width={64} height={80} rx={10} fill={fill} stroke={ink} strokeWidth={3} />
      <rect x={76} y={52} width={24} height={24} rx={6} fill={wash} />
      <Lines x={76} y={86} widths={[42, 28]} />
      <line x1={142} y1={100} x2={156} y2={114} stroke={accent} strokeWidth={10} strokeLinecap="round" />
      <circle cx={128} cy={86} r={20} fill={fill} stroke={ink} strokeWidth={6} />
      <path d="M120 86 h16" stroke={line} strokeWidth={4} strokeLinecap="round" />
    </>
  ),
  inboxEmpty: (
    <>
      <g transform="rotate(-10 100 44)">
        <rect x={80} y={26} width={40} height={28} rx={4} fill={fill} stroke={ink} strokeWidth={3} />
        <path d="M82 29 l18 13 l18 -13" fill="none" stroke={accent} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <circle cx={90} cy={62} r={2} fill={ink} opacity={0.35} />
      <circle cx={100} cy={65} r={2} fill={ink} opacity={0.35} />
      <circle cx={110} cy={62} r={2} fill={ink} opacity={0.35} />
      <rect x={50} y={72} width={100} height={52} rx={12} fill={fill} stroke={ink} strokeWidth={3} />
      <path d="M52 96 h26 l6 10 h32 l6 -10 h26" fill="none" stroke={ink} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      <rect x={60} y={80} width={80} height={10} rx={5} fill={wash} />
    </>
  ),
  loadError: (
    <>
      <path d="M64 106 a22 22 0 0 1 2 -44 a30 30 0 0 1 56 -8 a24 24 0 0 1 14 52 z" fill={fill} stroke={ink} strokeWidth={3} strokeLinejoin="round" />
      <path d="M80 86 h40" stroke={ink} strokeWidth={4} strokeLinecap="round" strokeDasharray="2 8" />
      <circle cx={138} cy={102} r={15} fill={accent} />
      <line x1={138} y1={94} x2={138} y2={103} stroke={onAccent} strokeWidth={3.5} strokeLinecap="round" />
      <circle cx={138} cy={109.5} r={2} fill={onAccent} />
    </>
  ),
  notFound: (
    <>
      <rect x={96} y={40} width={8} height={94} rx={3} fill={ink} />
      <path d="M62 32 h60 l12 13 l-12 13 h-60 a4 4 0 0 1 -4 -4 v-18 a4 4 0 0 1 4 -4 z" fill={fill} stroke={ink} strokeWidth={3} strokeLinejoin="round" />
      <rect x={70} y={42} width={34} height={6} rx={3} fill={faint} />
      <path d="M138 70 h-60 l-12 13 l12 13 h60 a4 4 0 0 0 4 -4 v-18 a4 4 0 0 0 -4 -4 z" fill={accentSoft} stroke={accent} strokeWidth={3} strokeLinejoin="round" />
      <rect x={96} y={80} width={34} height={6} rx={3} fill={accent} opacity={0.45} />
    </>
  ),
  noArticles: (
    <>
      <rect x={62} y={30} width={70} height={92} rx={8} fill={fill} stroke={ink} strokeWidth={3} />
      <rect x={74} y={44} width={46} height={8} rx={4} fill={wash} />
      <Lines x={74} y={62} widths={[46, 46, 30, 46, 24]} />
      <g transform="rotate(40 140 92)">
        <rect x={134} y={58} width={12} height={8} rx={2} fill={ink} />
        <rect x={134} y={66} width={12} height={44} fill={accent} />
        <path d="M134 110 l6 12 l6 -12 z" fill={fill} stroke={ink} strokeWidth={2} strokeLinejoin="round" />
      </g>
    </>
  ),
  noNotes: (
    <>
      <rect x={64} y={30} width={66} height={92} rx={8} fill={fill} stroke={ink} strokeWidth={3} />
      <rect x={67} y={33} width={12} height={86} rx={4} fill={wash} />
      {[46, 62, 78, 94, 110].map((y) => (
        <circle key={y} cx={64} cy={y} r={3.5} fill={ink} />
      ))}
      <Lines x={88} y={48} widths={[32, 24, 28]} />
      <circle cx={138} cy={102} r={14} fill={accent} />
      <path d="M138 95 v14 M131 102 h14" stroke={onAccent} strokeWidth={3} strokeLinecap="round" />
    </>
  ),
  noBanners: (
    <>
      <rect x={46} y={38} width={108} height={70} rx={10} fill={fill} stroke={ink} strokeWidth={3} />
      <circle cx={74} cy={62} r={9} fill={accent} />
      <path d="M50 102 l30 -28 l22 20 l16 -14 l32 24" fill={wash} stroke={ink} strokeWidth={3} strokeLinejoin="round" />
      <rect x={46} y={116} width={70} height={6} rx={3} fill={faint} />
      <rect x={124} y={116} width={30} height={6} rx={3} fill={accentSoft} />
    </>
  ),
  noPromotions: (
    <>
      <rect x={56} y={44} width={88} height={64} rx={10} fill={fill} stroke={ink} strokeWidth={3} />
      <rect x={68} y={58} width={24} height={24} rx={6} fill={wash} />
      <Lines x={100} y={60} widths={[34, 22]} />
      <rect x={68} y={92} width={60} height={6} rx={3} fill={faint} />
      <path d="M138 24 l5.5 11.5 l12.5 1.8 l-9 8.8 l2.2 12.4 l-11.2 -5.9 l-11.2 5.9 l2.2 -12.4 l-9 -8.8 l12.5 -1.8 z" fill={accent} stroke={fill} strokeWidth={3} strokeLinejoin="round" />
    </>
  ),
  noSeo: (
    <>
      <rect x={52} y={40} width={80} height={14} rx={7} fill={fill} stroke={ink} strokeWidth={3} />
      <rect x={60} y={46} width={40} height={3} rx={1.5} fill={faint} />
      <rect x={52} y={64} width={80} height={10} rx={5} fill={wash} />
      <rect x={52} y={82} width={60} height={6} rx={3} fill={faint} />
      <rect x={52} y={94} width={70} height={6} rx={3} fill={faint} />
      <line x1={144} y1={100} x2={158} y2={114} stroke={accent} strokeWidth={10} strokeLinecap="round" />
      <circle cx={130} cy={86} r={20} fill={fill} stroke={ink} strokeWidth={6} />
      <path d="M124 86 l4 4 l8 -8" fill="none" stroke={success} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  noReviews: (
    <>
      <path d="M54 44 h92 a10 10 0 0 1 10 10 v40 a10 10 0 0 1 -10 10 h-56 l-20 16 v-16 h-16 a10 10 0 0 1 -10 -10 v-40 a10 10 0 0 1 10 -10 z" fill={fill} stroke={ink} strokeWidth={3} strokeLinejoin="round" />
      {[72, 88, 104, 120, 136].map((x, index) => (
        <path key={x} d={`M${x} 62 l3.2 6.6 l7.3 1 l-5.3 5.1 l1.3 7.2 l-6.5 -3.4 l-6.5 3.4 l1.3 -7.2 l-5.3 -5.1 l7.3 -1 z`} fill={index < 3 ? accent : faint} />
      ))}
      <rect x={66} y={88} width={68} height={6} rx={3} fill={faint} />
    </>
  ),
  noStudents: (
    <>
      <rect x={42} y={46} width={60} height={72} rx={10} fill={fill} stroke={ink} strokeWidth={3} />
      <circle cx={72} cy={70} r={11} fill={wash} stroke={ink} strokeWidth={3} />
      <path d="M54 102 a18 14 0 0 1 36 0" fill={wash} stroke={ink} strokeWidth={3} strokeLinecap="round" />
      <rect x={110} y={56} width={52} height={62} rx={10} fill={fill} stroke={line} strokeWidth={3} />
      <circle cx={136} cy={78} r={9} fill={faint} />
      <path d="M122 104 a14 11 0 0 1 28 0" fill={faint} />
      <circle cx={150} cy={50} r={11} fill={accent} />
      <path d="M150 45 v10 M145 50 h10" stroke={onAccent} strokeWidth={3} strokeLinecap="round" />
    </>
  ),
  noActivity: (
    <>
      <circle cx={84} cy={78} r={30} fill={fill} stroke={ink} strokeWidth={3} />
      <path d="M84 60 v18 l12 8" fill="none" stroke={ink} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={84} cy={78} r={3} fill={accent} />
      <rect x={122} y={54} width={44} height={8} rx={4} fill={wash} />
      <rect x={122} y={72} width={36} height={6} rx={3} fill={faint} />
      <rect x={122} y={86} width={44} height={6} rx={3} fill={faint} />
      <rect x={122} y={100} width={28} height={6} rx={3} fill={faint} />
    </>
  ),
  allClear: (
    <>
      <path d="M100 26 l44 14 v30 c0 26 -20 44 -44 54 c-24 -10 -44 -28 -44 -54 v-30 z" fill={fill} stroke={ink} strokeWidth={3} strokeLinejoin="round" />
      <path d="M100 38 l32 10 v22 c0 20 -14 34 -32 42 c-18 -8 -32 -22 -32 -42 v-22 z" fill={wash} />
      <path d="M84 78 l11 11 l22 -24" fill="none" stroke={success} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={146} cy={44} r={6} fill={accent} />
    </>
  ),
  noData: (
    <>
      <rect x={52} y={44} width={96} height={70} rx={10} fill={fill} stroke={ink} strokeWidth={3} />
      <rect x={66} y={88} width={12} height={16} rx={3} fill={faint} />
      <rect x={86} y={76} width={12} height={28} rx={3} fill={faint} />
      <rect x={106} y={84} width={12} height={20} rx={3} fill={faint} />
      <rect x={126} y={66} width={12} height={38} rx={3} fill={accentSoft} stroke={accent} strokeWidth={2} />
      <path d="M62 70 c14 -6 26 -4 40 -12 s24 -4 36 -14" fill="none" stroke={ink} strokeWidth={3} strokeLinecap="round" strokeDasharray="4 6" />
    </>
  ),
} as const

export type AdminIllustrationName = keyof typeof scenes

export const adminIllustrationNames = Object.keys(scenes) as AdminIllustrationName[]

export function AdminIllustration({ name, width = 176, className }: { name: AdminIllustrationName; width?: number; className?: string }) {
  return (
    <svg width={width} height={(width * 150) / 200} viewBox="0 0 200 150" aria-hidden="true" className={className}>
      <Stage>{scenes[name]}</Stage>
    </svg>
  )
}
