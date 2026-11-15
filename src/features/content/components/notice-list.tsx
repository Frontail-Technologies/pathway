import Link from 'next/link'
import { ArrowUpRight, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'
import { noticeTypeLabel, type OfficialNotice } from '../api/content-api'

export function NoticeRow({ notice }: { notice: OfficialNotice }) {
  const ownerHref = notice.owner.kind === 'exam' ? `/exam/${notice.owner.slug}` : `/scholarship/${notice.owner.slug}`
  return (
    <li className="group relative flex gap-3 py-3.5">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        <FileText className="size-5" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
          <Link href={ownerHref} className="relative z-10 rounded-md bg-secondary px-1.5 py-0.5 font-semibold text-primary hover:underline">
            {notice.owner.name}
          </Link>
          <span className="text-muted-foreground">{[noticeTypeLabel[notice.docType] ?? 'Document', notice.academicSession ? `Session ${notice.academicSession}` : ''].filter(Boolean).join(' · ')}</span>
        </p>
        <a href={notice.url} target="_blank" rel="noopener noreferrer" className="mt-1 line-clamp-2 text-sm leading-6 font-medium text-foreground outline-none after:absolute after:inset-0 group-hover:text-primary focus-visible:underline">
          {notice.title}
        </a>
      </div>
      <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground group-hover:text-primary" aria-hidden="true" />
    </li>
  )
}

export function NoticeList({ notices, className }: { notices: OfficialNotice[]; className?: string }) {
  return (
    <ul className={cn('divide-y', className)}>
      {notices.map((notice) => (
        <NoticeRow key={`${notice.owner.slug}-${notice.url}`} notice={notice} />
      ))}
    </ul>
  )
}
