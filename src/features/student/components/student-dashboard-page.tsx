'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { ArrowRight, Briefcase, Check, ChevronRight, LogOut, MapPin } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { SpotArt, type SpotArtName } from '@/components/shared/spot-art'
import { queryKeys } from '@/lib/query-client'
import { listOwnEnquiries } from '@/features/enquiries/api/enquiries-api'
import { savedKinds, useSavedItems } from '@/features/saved/saved-items-provider'
import { useStudentSession } from '@/features/student/state/student-session'
import { getProfileCompletion, initialsOf, type ProfileFieldKey } from '../data/student'
import { useStudentProfile } from '../state/student-profile-provider'
import { ActionButton, ChipField, DashboardSection, ProfileField } from './dashboard-parts'

const missingPrompts: Record<ProfileFieldKey, { title: string; href: string }> = {
  name: { title: 'Add your name', href: '/student/profile#personal' },
  email: { title: 'Add your email', href: '/student/profile#personal' },
  phone: { title: 'Add your phone number', href: '/student/profile#personal' },
  city: { title: 'Add your city', href: '/student/profile#personal' },
  studyLevel: { title: 'Add your study level', href: '/student/profile#education' },
  stream: { title: 'Add your stream', href: '/student/profile#education' },
  graduationYear: { title: 'Add your passing year', href: '/student/profile#education' },
  preferredCourse: { title: 'Pick courses you want to study', href: '/student/preferences' },
  preferredExam: { title: 'Pick exams you plan to take', href: '/student/preferences' },
  preferredLocation: { title: 'Pick where you want to study', href: '/student/preferences' },
  careerGoal: { title: 'Add a career goal', href: '/student/profile#career-goal' },
}

const tools: { label: string; text: string; href: string; art: SpotArtName }[] = [
  { label: 'College predictor', text: 'Colleges for your rank', href: '/college-predictor', art: 'predictor' },
  { label: 'Rank predictor', text: 'Percentile to rank', href: '/rank-predictor', art: 'chart' },
  { label: 'Compare colleges', text: 'Side by side', href: '/compare', art: 'compare' },
  { label: 'Scholarships', text: 'Open schemes', href: '/scholarships', art: 'scholarship' },
  { label: 'Resume builder', text: 'Download a PDF', href: '/resume-builder', art: 'notes' },
  { label: 'Psychometric test', text: 'Find your fit', href: '/psychometric-test', art: 'guide' },
]

function CompletionRing({ percent }: { percent: number }) {
  const radius = 34
  const circumference = 2 * Math.PI * radius
  return (
    <div role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent} aria-label="Profile completion" className="relative size-24 shrink-0">
      <svg viewBox="0 0 80 80" className="size-full -rotate-90">
        <circle cx={40} cy={40} r={radius} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth={8} />
        <circle cx={40} cy={40} r={radius} fill="none" stroke="var(--brand-orange)" strokeWidth={8} strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference * (1 - percent / 100)} />
      </svg>
      <span className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-heading text-xl font-extrabold">{percent}%</span>
        <span className="text-[11px] text-primary-foreground/80">complete</span>
      </span>
    </div>
  )
}

function LogOutButton() {
  const { signOut } = useStudentSession()
  const router = useRouter()
  return (
    <button
      type="button"
      onClick={async () => {
        await signOut()
        toast.success('Signed out')
        router.push('/login')
      }}
      className="mt-4 flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border text-sm font-semibold text-destructive outline-none transition-colors hover:bg-destructive/5 focus-visible:ring-2 focus-visible:ring-destructive/40"
    >
      <LogOut className="size-4" aria-hidden="true" />
      Log out
    </button>
  )
}

export function StudentDashboardPage() {
  const { profile, photoUrl } = useStudentProfile()
  const { user } = useStudentSession()
  const { saved } = useSavedItems()
  const enquiries = useQuery({ queryKey: queryKeys.studentEnquiries(user?.id ?? 'none'), queryFn: listOwnEnquiries, enabled: Boolean(user) })
  const completion = getProfileCompletion(profile)
  const firstName = profile.name.split(' ')[0] || 'there'
  const savedCount = savedKinds.reduce((sum, kind) => sum + (saved[kind]?.length ?? 0), 0)
  const openEnquiries = (enquiries.data ?? []).length

  const stats: { label: string; value: string; href: string; art: SpotArtName }[] = [
    { label: 'Saved items', value: String(savedCount), href: '/student/saved', art: 'college' },
    { label: 'Enquiries', value: enquiries.isSuccess ? String(openEnquiries) : '–', href: '/student/enquiries', art: 'guide' },
    { label: 'Exams', value: String(profile.preferredExams.length), href: '/student/preferences', art: 'exam' },
    { label: 'Profile details', value: `${completion.filled}/${completion.total}`, href: '/student/profile', art: 'verified' },
  ]

  return (
    <div className="mx-auto flex w-full max-w-[1360px] flex-col gap-5">
      <section aria-label="Profile summary" className="relative overflow-hidden rounded-2xl bg-primary p-5 text-primary-foreground sm:p-6">
        <span aria-hidden="true" className="absolute -top-16 -right-10 size-56 rounded-full bg-primary-foreground/10" />
        <span aria-hidden="true" className="absolute right-40 bottom-5 hidden size-2.5 rounded-full bg-cta md:block" />
        <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <span className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-foreground text-xl font-bold text-primary ring-4 ring-primary-foreground/20 sm:size-18">
              {photoUrl ? <Image src={photoUrl} alt="" fill className="object-cover" /> : <span aria-hidden="true">{initialsOf(profile.name || profile.email)}</span>}
            </span>
            <div className="min-w-0">
              <h1 className="font-heading text-2xl leading-tight font-extrabold sm:text-[28px]">Welcome back, {firstName}</h1>
              <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-primary-foreground/85">
                <span className="truncate">{profile.email}</span>
                {profile.city ? (
                  <span className="flex items-center gap-1">
                    <MapPin className="size-3.5" aria-hidden="true" />
                    {profile.city}
                  </span>
                ) : null}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 md:gap-5">
            <CompletionRing percent={completion.percent} />
            <div className="flex flex-col gap-2">
              <p className="text-sm text-primary-foreground/85">{completion.missing.length ? `${completion.missing.length} ${completion.missing.length === 1 ? 'detail' : 'details'} left` : 'Your profile is complete'}</p>
              <Button variant="cta" className="h-10 px-5 text-sm font-semibold" nativeButton={false} render={<Link href="/student/profile" />}>
                {completion.missing.length ? 'Complete profile' : 'Edit profile'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((stat) => (
          <li key={stat.label}>
            <Link href={stat.href} className="group flex h-full items-center gap-3 rounded-xl border bg-card p-3.5 outline-none transition-colors hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/40 sm:p-4">
              <SpotArt name={stat.art} className="size-11 sm:size-12" />
              <span className="min-w-0">
                <span className="block font-heading text-xl font-extrabold text-foreground tabular-nums sm:text-2xl">{stat.value}</span>
                <span className="block truncate text-xs text-muted-foreground group-hover:text-primary sm:text-[13px]">{stat.label}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="flex min-w-0 flex-col gap-5">
          <DashboardSection title="Plan your next step" action={<ActionButton href="/predictors">All tools</ActionButton>}>
            <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {tools.map((tool) => (
                <li key={tool.href}>
                  <Link href={tool.href} className="group flex h-full flex-col items-center gap-2 rounded-xl border p-3 text-center outline-none sm:flex-row sm:gap-3 sm:text-left transition-colors hover:border-primary/50 hover:bg-secondary/40 focus-visible:ring-2 focus-visible:ring-primary/40">
                    <SpotArt name={tool.art} className="size-10 rounded-lg" />
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-foreground group-hover:text-primary sm:truncate">{tool.label}</span>
                      <span className="block text-xs text-muted-foreground sm:truncate">{tool.text}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </DashboardSection>

          <DashboardSection title="About you" action={<ActionButton href="/student/profile">Edit</ActionButton>}>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 lg:grid-cols-3">
              <ProfileField label="Full name" value={profile.name} />
              <ProfileField label="Phone" value={profile.phone} />
              <ProfileField label="City" value={profile.city} />
              <ProfileField label="Study level" value={profile.studyLevel} />
              <ProfileField label="Course or stream" value={profile.stream} />
              <ProfileField label="School or college" value={profile.education?.institution} />
              <ProfileField label="Passing year" value={profile.education?.graduationYear?.toString()} />
              <ProfileField label="Career goal" value={profile.careerGoal} />
            </dl>
          </DashboardSection>

          <DashboardSection title="Study preferences" action={<ActionButton href="/student/preferences">Edit</ActionButton>}>
            <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              <ChipField label="Study goal" values={profile.studyGoal ? [profile.studyGoal] : []} />
              <ChipField label="Courses and streams" values={[...(profile.preferredStreams ?? []), ...profile.preferredCourses]} />
              <ChipField label="Exams" values={profile.preferredExams} />
              <ChipField label="Locations" values={profile.preferredLocations} />
            </dl>
          </DashboardSection>

          <DashboardSection title="Experience" action={<ActionButton href="/student/profile#experience">{profile.workExperience.length ? 'Edit' : 'Add'}</ActionButton>}>
            {profile.workExperience.length ? (
              <ul className="flex flex-col gap-2">
                {profile.workExperience.map((item) => (
                  <li key={`${item.role}-${item.organisation}`} className="flex items-center gap-2.5 text-sm text-foreground">
                    <Briefcase className="size-4 text-primary" aria-hidden="true" />
                    <span className="font-medium">{item.role}</span>
                    <span className="text-muted-foreground">{item.organisation}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No internships or projects added yet.</p>
            )}
          </DashboardSection>
        </div>

        <div className="flex flex-col gap-5">
          <DashboardSection title="Finish your profile">
            {completion.missing.length === 0 ? (
              <div className="flex items-center gap-3">
                <SpotArt name="verified" className="size-11" />
                <p className="text-sm font-medium text-foreground">Every detail is filled in.</p>
              </div>
            ) : (
              <ul className="flex flex-col gap-1.5">
                {completion.missing.map((key) => (
                  <li key={key}>
                    <Link href={missingPrompts[key].href} className="group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary/40">
                      <span aria-hidden="true" className="size-4 shrink-0 rounded-full border-2 border-primary/40" />
                      <span className="min-w-0 flex-1 font-medium text-foreground group-hover:text-primary">{missingPrompts[key].title}</span>
                      <ChevronRight className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
                {completion.filled ? (
                  <li className="flex items-center gap-2.5 px-2.5 py-2 text-sm text-muted-foreground">
                    <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Check className="size-3" aria-hidden="true" />
                    </span>
                    {completion.filled} {completion.filled === 1 ? 'detail' : 'details'} done
                  </li>
                ) : null}
              </ul>
            )}
          </DashboardSection>

          <section className="rounded-xl bg-secondary p-5">
            <SpotArt name="guide" className="size-12 bg-card" />
            <h2 className="mt-3 font-heading text-base font-bold text-foreground">Not sure what to pick?</h2>
            <p className="mt-1 text-sm text-muted-foreground">A counsellor can help with colleges, exams and scholarships.</p>
            <Link href="/counselling" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
              Get free counselling
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </section>

          <DashboardSection title="Account">
            <dl className="flex flex-col gap-2.5 text-sm">
              {[
                ['Email', profile.email],
                ['Account type', 'Student'],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">{label}</dt>
                  <dd className="min-w-0 truncate text-right font-medium text-foreground">{value}</dd>
                </div>
              ))}
            </dl>
            <LogOutButton />
          </DashboardSection>
        </div>
      </div>
    </div>
  )
}
