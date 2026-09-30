import type { Tutor, TutorAvatarSpec } from '../data/tutors'

 
export function TutorAvatar({ spec, className = 'size-16' }: { spec: TutorAvatarSpec; className?: string }) {
  const { skin, hair, shirt, style, glasses } = spec
  return (
    <svg viewBox="0 0 64 64" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden="true">
      <rect width="64" height="64" fill="#e8effd" />
      {style === 'long' && <path d="M17 30c0-13 6-19 15-19s15 6 15 19v20H17Z" fill={hair} />}
      <path d="M8 64c1-13 10-19 24-19s23 6 24 19Z" fill={shirt} />
      <path d="M27 40h10v8c0 3-2 5-5 5s-5-2-5-5Z" fill={skin} />
      <ellipse cx="32" cy="30" rx="11" ry="12.5" fill={skin} />
      {style === 'bun' && <circle cx="32" cy="12" r="6" fill={hair} />}
      <path d={style === 'long' ? 'M20 30c0-9 5-14 12-14s12 5 12 14c-3-6-7-8-12-8s-9 2-12 8Z' : 'M20.5 28c0-9 5-14.5 11.5-14.5S43.5 19 43.5 28c-2-5-6-7-11.5-7s-9.5 2-11.5 7Z'} fill={hair} />
      <circle cx="27.5" cy="31" r="1.3" fill="#2b2118" />
      <circle cx="36.5" cy="31" r="1.3" fill="#2b2118" />
      {glasses && (
        <g fill="none" stroke="#2b2118" strokeWidth="1.1">
          <circle cx="27.5" cy="31" r="3.6" />
          <circle cx="36.5" cy="31" r="3.6" />
          <path d="M31.1 31h1.8" />
        </g>
      )}
      <path d="M28.5 37.5c2 1.7 5 1.7 7 0" fill="none" stroke="#7a4a35" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}





 
export function TutorPortrait({ tutor, className = 'size-20 rounded-xl' }: { tutor: Pick<Tutor, 'name' | 'portrait' | 'avatar'>; className?: string }) {
  return (
    <div className={`shrink-0 overflow-hidden bg-[#e8effd] ring-1 ring-black/5 ${className}`}>
      {tutor.portrait ? (
        
        <img src={tutor.portrait} alt={`Portrait of ${tutor.name}`} loading="lazy" decoding="async" className="size-full object-cover object-[50%_20%]" />
      ) : (
        <TutorAvatar spec={tutor.avatar} className="size-full" />
      )}
    </div>
  )
}
