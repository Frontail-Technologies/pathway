import type { ReactNode } from 'react'

const ink = 'var(--primary)'
const fill = 'var(--card)'
const wash = 'color-mix(in srgb, var(--primary) 10%, transparent)'
const line = 'var(--border)'
const faint = 'var(--muted)'
const accent = '#f97316'
const onAccent = '#ffffff'

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

const scenes = {
  noResults: (
    <>
      <rect x={56} y={30} width={64} height={80} rx={10} fill={fill} stroke={line} strokeWidth={3} transform="rotate(-7 88 70)" />
      <rect x={66} y={40} width={64} height={80} rx={10} fill={fill} stroke={ink} strokeWidth={3} />
      <rect x={76} y={52} width={24} height={24} rx={6} fill={wash} />
      <rect x={76} y={86} width={42} height={6} rx={3} fill={faint} />
      <rect x={76} y={98} width={28} height={6} rx={3} fill={faint} />
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
      <path d="M138 70 h-60 l-12 13 l12 13 h60 a4 4 0 0 0 4 -4 v-18 a4 4 0 0 0 -4 -4 z" fill="color-mix(in srgb, #f97316 14%, transparent)" stroke={accent} strokeWidth={3} strokeLinejoin="round" />
      <rect x={96} y={80} width={34} height={6} rx={3} fill={accent} opacity={0.45} />
    </>
  ),
} as const

export type AdminIllustrationName = keyof typeof scenes

export function AdminIllustration({ name, width = 176, className }: { name: AdminIllustrationName; width?: number; className?: string }) {
  return (
    <svg width={width} height={(width * 150) / 200} viewBox="0 0 200 150" aria-hidden="true" className={className}>
      <Stage>{scenes[name]}</Stage>
    </svg>
  )
}
