"use client";

import type { ComponentType } from "react";
import {
  BookOpen,
  Briefcase,
  CalendarDays,
  CircleCheck,
  FileText,
  GraduationCap,
  Layers,
  Mail,
  MapPin,
  Phone,
  School,
  Target,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LogOut } from "lucide-react";
import { useStudentSession } from "@/features/student/state/student-session";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  getProfileCompletion,
  initialsOf,
  type ProfileFieldKey,
} from "../data/student";
import { useStudentProfile } from "../state/student-profile-provider";
import {
  ActionButton,
  ChipField,
  DashboardSection,
  ProfileField,
} from "./dashboard-parts";

type Icon = ComponentType<{
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
}>;

 
const missingPrompts: Record<
  ProfileFieldKey,
  { icon: Icon; title: string; text: string; href?: string }
> = {
  name: {
    icon: UserRound,
    title: "Add your name",
    text: "So Pathway can address you properly.",
    href: "/student/profile#personal",
  },
  email: {
    icon: Mail,
    title: "Add your email",
    text: "Used for your account.",
    href: "/student/profile#personal",
  },
  phone: {
    icon: Phone,
    title: "Add phone number",
    text: "Keep your contact details up to date.",
    href: "/student/profile#personal",
  },
  city: {
    icon: MapPin,
    title: "Add your city",
    text: "Where you are based.",
    href: "/student/profile#personal",
  },
  studyLevel: {
    icon: GraduationCap,
    title: "Add study level",
    text: "Where you are in your education today.",
    href: "/student/profile#education",
  },
  stream: {
    icon: BookOpen,
    title: "Add your stream",
    text: "The subjects or course you are studying.",
    href: "/student/profile#education",
  },
  graduationYear: {
    icon: CalendarDays,
    title: "Add passing year",
    text: "When you finish or finished this level.",
    href: "/student/profile#education",
  },
  preferredCourse: {
    icon: Layers,
    title: "Add preferred course",
    text: "What you would like to study next.",
    href: "/student/preferences",
  },
  preferredExam: {
    icon: FileText,
    title: "Add preferred exams",
    text: "Entrance exams you plan to take.",
    href: "/student/preferences",
  },
  preferredLocation: {
    icon: MapPin,
    title: "Add preferred study location",
    text: "Tell us where you would like to study.",
    href: "/student/preferences",
  },
  careerGoal: {
    icon: Target,
    title: "Add career goal",
    text: "A goal helps shape what is relevant to you.",
    href: "/student/profile#career-goal",
  },
};




 
function LogOutButton() {
  const { signOut } = useStudentSession();
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => {
        signOut();
        toast.success("Signed out of the demo account.");
        router.push("/login");
      }}
      className="mt-3 flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border text-sm font-semibold text-destructive outline-none transition-colors hover:bg-destructive/5 focus-visible:ring-2 focus-visible:ring-destructive/40"
    >
      <LogOut className="size-4" aria-hidden="true" />
      Log out
    </button>
  );
}

export function StudentDashboardPage() {
  const { profile, photoUrl } = useStudentProfile();
  const completion = getProfileCompletion(profile);
  const firstName = profile.name.split(" ")[0];

  return (
    <div className="mx-auto grid w-full max-w-[1360px] grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="max-xl:order-1 xl:col-span-2">
        <h1 className="font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
          Welcome back, {firstName}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground sm:text-[15px]">
          Keep your student profile updated to get more relevant Pathway
          experiences.
        </p>
      </div>

      <section
        aria-label="Profile summary"
        className="rounded-[12px] border bg-card p-4 shadow-[0_2px_10px_rgba(15,23,42,0.04)] max-xl:order-2 sm:p-5 xl:col-span-2"
      >
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-8">
          <div className="flex min-w-0 items-center gap-4">
            <span className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary text-xl font-bold text-primary-foreground">
              {photoUrl ? (
                <Image src={photoUrl} alt="" fill className="object-cover" />
              ) : (
                <span aria-hidden="true">{initialsOf(profile.name)}</span>
              )}
            </span>
            <div className="min-w-0">
              <p className="truncate font-heading text-lg font-bold text-foreground sm:text-xl">
                {profile.name}
              </p>
              <p className="truncate text-sm text-muted-foreground">
                {profile.email}
              </p>
              {profile.city && (
                <p className="mt-0.5 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="size-3.5" aria-hidden="true" />
                  {profile.city}
                </p>
              )}
            </div>
          </div>

          <div className="w-full md:max-w-sm md:flex-1">
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-heading text-2xl font-extrabold text-foreground">
                {completion.percent}%
              </p>
              <p className="text-sm text-muted-foreground">
                {completion.filled} of {completion.total} details completed
              </p>
            </div>
            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={completion.percent}
              aria-label="Profile completion"
              className="mt-2 h-2.5 overflow-hidden rounded-full bg-muted"
            >
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${completion.percent}%` }}
              />
            </div>
          </div>

          <div className="shrink-0">
            <Button
              variant="cta"
              className="h-10 w-full px-6 text-sm font-semibold md:w-auto"
              nativeButton={false}
              render={<Link href="/student/profile" />}
            >
              Complete Profile
            </Button>
          </div>
        </div>
      </section>

      <div className="flex min-w-0 flex-col gap-5 max-xl:contents">
        <DashboardSection
          className="max-xl:order-4"
          title="Personal Information"
          action={
            <ActionButton href="/student/profile#personal">
              Edit Personal Info
            </ActionButton>
          }
        >
          <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            <ProfileField label="Full name" value={profile.name} />
            <ProfileField label="Email" value={profile.email} />
            <ProfileField label="Phone" value={profile.phone} />
            <ProfileField label="City" value={profile.city} />
          </dl>
        </DashboardSection>

        <DashboardSection
          className="max-xl:order-5"
          title="Education Background"
          action={
            <ActionButton href="/student/profile#education">
              Edit Education
            </ActionButton>
          }
        >
          <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            <ProfileField
              label="Current study level"
              value={profile.studyLevel}
            />
            <ProfileField
              label="School / college"
              value={profile.education?.institution}
            />
            <ProfileField label="Course / stream" value={profile.stream} />
            <ProfileField
              label="Graduation / passing year"
              value={profile.education?.graduationYear?.toString()}
            />
          </dl>
        </DashboardSection>

        <DashboardSection
          className="max-xl:order-6"
          title="Study Preferences"
          action={
            <ActionButton href="/student/preferences">
              Edit Preferences
            </ActionButton>
          }
        >
          <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            <ChipField
              label="Study goal"
              values={profile.studyGoal ? [profile.studyGoal] : []}
            />
            <ChipField
              label="Preferred course / stream"
              values={[
                ...(profile.preferredStreams ?? []),
                ...profile.preferredCourses,
              ]}
            />
            <ChipField
              label="Preferred exams"
              values={profile.preferredExams}
            />
            <ChipField
              label="Preferred locations"
              values={profile.preferredLocations}
            />
          </dl>
        </DashboardSection>

        <DashboardSection
          className="max-xl:order-7"
          title="Career Goal"
          action={
            <ActionButton href="/student/profile#career-goal">
              {profile.careerGoal ? "Edit Career Goal" : "Add Career Goal"}
            </ActionButton>
          }
        >
          {profile.careerGoal ? (
            <p className="text-sm font-medium text-foreground">
              {profile.careerGoal}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Career goal not added yet.
            </p>
          )}
        </DashboardSection>

        <DashboardSection
          className="max-xl:order-8"
          title="Experience"
          description="Optional — work or internship experience."
          action={
            <ActionButton href="/student/profile#experience">
              {profile.workExperience.length
                ? "Edit Experience"
                : "Add Experience"}
            </ActionButton>
          }
        >
          {profile.workExperience.length ? (
            <ul className="flex flex-col gap-2">
              {profile.workExperience.map((item) => (
                <li
                  key={`${item.role}-${item.organisation}`}
                  className="flex items-center gap-2 text-sm text-foreground"
                >
                  <Briefcase
                    className="size-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                  {item.role} · {item.organisation}
                </li>
              ))}
            </ul>
          ) : (
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Briefcase className="size-4 shrink-0" aria-hidden="true" />
              No work or internship experience added yet.
            </p>
          )}
        </DashboardSection>
      </div>

      <div className="flex flex-col gap-5 max-xl:contents">
        <DashboardSection
          className="max-xl:order-3"
          title="Complete your profile"
          description={
            completion.missing.length
              ? `${completion.missing.length} ${completion.missing.length === 1 ? "detail is" : "details are"} still missing.`
              : undefined
          }
        >
          {completion.missing.length === 0 ? (
            <p className="flex items-center gap-2 text-sm font-medium text-foreground">
              <CircleCheck className="size-4 text-primary" aria-hidden="true" />
              Your profile is complete.
            </p>
          ) : (
            <ul className="flex flex-col gap-2">
              {completion.missing.map((key) => {
                const prompt = missingPrompts[key];
                return (
                  <li
                    key={key}
                    className="flex items-start gap-2.5 rounded-[10px] bg-muted/50 p-2.5"
                  >
                    <prompt.icon
                      className="mt-0.5 size-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-semibold text-foreground">
                        {prompt.title}
                      </p>
                      <p className="text-xs leading-5 text-muted-foreground">
                        {prompt.text}
                      </p>
                    </div>
                    <ActionButton href={prompt.href}>Add</ActionButton>
                  </li>
                );
              })}
            </ul>
          )}
        </DashboardSection>

        <DashboardSection className="max-xl:order-9" title="Account">
          <dl className="flex flex-col gap-2.5 text-sm">
            {[
              ["Email", profile.email],
              ["Account type", "Student"],
              ["Sign-in status", "Demo account"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-3">
                <dt className="text-muted-foreground">{label}</dt>
                <dd className="min-w-0 truncate text-right font-medium text-foreground">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 flex items-start gap-2 border-t pt-3 text-xs leading-5 text-muted-foreground">
            <School className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
            Frontend demo account — sign-in is not connected yet.
          </p>
          <LogOutButton />
        </DashboardSection>
      </div>
    </div>
  );
}
