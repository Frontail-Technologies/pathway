import Image from 'next/image'
import Link from 'next/link'
import { Rating } from '@/components/shared/rating'
import { VerifiedBadge } from '@/components/shared/verified-badge'
import type { Tutor } from '../data/tutors'

export function TutorCard({ tutor }: { tutor: Tutor }) {
  return (
    <Link
      href={`/tutors?id=${tutor.id}`}
      className="group flex h-full w-[85vw] shrink-0 snap-start flex-col gap-2.5 rounded-[10px] border bg-card p-3.5 outline-none transition-colors hover:border-primary focus-visible:ring-2 focus-visible:ring-primary/40 sm:w-auto sm:gap-3 sm:p-4"
    >
      <div className="flex items-start gap-2.5 sm:gap-3">
        <div className="relative size-12 shrink-0 overflow-hidden rounded-full bg-secondary sm:size-14">
          <Image src={tutor.avatar} alt="" fill sizes="56px" className="object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <p className="truncate text-[15px] font-semibold text-foreground">{tutor.name}</p>
            {tutor.verified && <VerifiedBadge />}
          </div>
          <p className="truncate text-xs text-muted-foreground">{tutor.subject} · {tutor.expertise}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-muted-foreground">
        <Rating value={tutor.rating} count={tutor.reviewCount} />
        <span>{tutor.experienceYears} yrs · {tutor.mode}</span>
        <span>{tutor.city}</span>
      </div>
      <div className="mt-auto flex items-center justify-between border-t pt-2.5 sm:pt-3">
        <span className="text-sm font-semibold text-foreground">{tutor.fee}</span>
        <span className="text-xs font-semibold text-primary group-hover:underline sm:text-sm">View Profile</span>
      </div>
    </Link>
  )
}
