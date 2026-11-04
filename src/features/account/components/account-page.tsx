'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
  Bookmark,
  BookOpen,
  ChevronRight,
  FileText,
  GraduationCap,
  Headphones,
  Info,
  LayoutDashboard,
  LogOut,
  Mail,
  MessagesSquare,
  ShieldCheck,
  SlidersHorizontal,
  UserRound,
  type LucideIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Container } from '@/components/shared/container'
import { savedKinds, useSavedItems } from '@/features/saved/saved-items-provider'
import { useStudentSession } from '@/features/student/state/student-session'
import { useStudentProfile } from '@/features/student/state/student-profile-provider'
import { getProfileCompletion, initialsOf } from '@/features/student/data/student'

type Row = { href: string; label: string; icon: LucideIcon; hint?: string }

function RowList({ title, rows }: { title: string; rows: Row[] }) {
  return (
    <section aria-labelledby={`${title}-title`.replace(/\W+/g, '-')}>
      <h2 id={`${title}-title`.replace(/\W+/g, '-')} className="px-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
        {title}
      </h2>
      <ul className="mt-2 divide-y overflow-hidden rounded-[12px] border bg-card">
        {rows.map(({ href, label, icon: Icon, hint }) => (
          <li key={href}>
            <Link href={href} className="flex min-h-14 items-center gap-3 px-4 py-2.5 outline-none transition-colors hover:bg-muted/50 focus-visible:bg-muted active:bg-muted">
              <Icon className="size-5 shrink-0 text-primary" aria-hidden="true" />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-foreground">{label}</span>
                {hint && <span className="block truncate text-xs text-muted-foreground">{hint}</span>}
              </span>
              <ChevronRight className="size-4 shrink-0 text-muted-foreground/60" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function AccountPage() {
  const router = useRouter()
  const { signedIn, hydrated, signOut } = useStudentSession()
  const { profile, photoUrl } = useStudentProfile()
  const { saved, hydrated: savedHydrated } = useSavedItems()

  const savedCount = savedKinds.reduce((sum, kind) => sum + saved[kind].length, 0)
  const completion = getProfileCompletion(profile)

  const studentRows: Row[] = [
    { href: '/student', label: 'Dashboard', icon: LayoutDashboard, hint: 'Your plans at a glance' },
    { href: '/student/saved', label: 'Saved items', icon: Bookmark, hint: savedHydrated ? `${savedCount} saved` : undefined },
    { href: '/student/profile', label: 'My profile', icon: UserRound, hint: `${completion.percent}% complete` },
    { href: '/student/preferences', label: 'Preferences', icon: SlidersHorizontal, hint: 'Courses, exams and locations' },
    { href: '/student/notes', label: 'My notes', icon: BookOpen },
    { href: '/student/enquiries', label: 'Counselling & enquiries', icon: MessagesSquare },
    { href: '/resume-builder', label: 'Resume builder', icon: FileText },
  ]

  const helpRows: Row[] = [
    { href: '/counselling', label: 'Free counselling', icon: Headphones, hint: 'Talk to a counsellor' },
    { href: '/contact', label: 'Contact us', icon: Mail },
    { href: '/about', label: 'About Pathway', icon: Info },
    { href: '/privacy', label: 'Privacy & terms', icon: ShieldCheck },
  ]

  return (
    <Container className="px-4 py-5 lg:py-8">
      <div className="mx-auto flex max-w-xl flex-col gap-6">
        <h1 className="font-heading text-2xl font-extrabold text-foreground">Account</h1>

        {!hydrated ? (
          <div aria-busy="true" className="h-36 animate-pulse rounded-[14px] bg-muted" />
        ) : signedIn ? (
          <section aria-label="Your profile" className="rounded-[14px] border bg-card p-4 shadow-[0_2px_10px_rgba(15,23,42,0.04)]">
            <div className="flex items-center gap-3">
              <span className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary text-lg font-bold text-primary-foreground">
                {photoUrl ? <Image src={photoUrl} alt="" fill className="object-cover" /> : <span aria-hidden="true">{initialsOf(profile.name)}</span>}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-base font-bold text-foreground">{profile.name}</p>
                <p className="truncate text-sm text-muted-foreground">{profile.email}</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-foreground">Profile {completion.percent}% complete</span>
                <span className="text-muted-foreground">
                  {completion.filled} of {completion.total}
                </span>
              </div>
              <Progress value={completion.percent} className="mt-1.5" aria-label="Profile completion" />
            </div>
            {completion.percent < 100 && (
              <Button variant="cta" className="mt-4 h-11 w-full text-sm font-semibold" nativeButton={false} render={<Link href="/student/profile" />}>
                Complete Profile
              </Button>
            )}
          </section>
        ) : (
          <section aria-label="Sign in" className="rounded-[14px] border bg-card p-5 text-center shadow-[0_2px_10px_rgba(15,23,42,0.04)]">
            <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-secondary text-primary">
              <UserRound className="size-6" aria-hidden="true" />
            </span>
            <p className="mt-3 font-heading text-lg font-bold text-foreground">Sign in to Pathway</p>
            <p className="mt-1 text-sm text-muted-foreground">Save colleges and courses, track your profile and pick up where you left off.</p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-center">
              <Button variant="cta" className="h-11 px-6 text-sm font-semibold" nativeButton={false} render={<Link href="/login" />}>
                Sign In
              </Button>
              <Button variant="outline" className="h-11 px-6 text-sm font-semibold" nativeButton={false} render={<Link href="/register" />}>
                Create Account
              </Button>
            </div>
          </section>
        )}

        {hydrated && signedIn && <RowList title="Your space" rows={studentRows} />}

        <RowList title="For tutors" rows={[{ href: '/tutor-dashboard', label: 'Tutor Space', icon: GraduationCap, hint: 'Manage your tutor profile and requests' }]} />

        <RowList title="Help & information" rows={helpRows} />

        {hydrated && signedIn && (
          <button
            type="button"
            onClick={() => {
              signOut()
              toast.success('Signed out of the demo account.')
              router.refresh()
            }}
            className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-[12px] border bg-card text-sm font-semibold text-destructive outline-none transition-colors hover:bg-destructive/5 focus-visible:ring-2 focus-visible:ring-destructive/40"
          >
            <LogOut className="size-4" aria-hidden="true" />
            Log out
          </button>
        )}

        <p className="text-center text-xs text-muted-foreground">Demo account — sign-in is not connected to a server yet.</p>
      </div>
    </Container>
  )
}
