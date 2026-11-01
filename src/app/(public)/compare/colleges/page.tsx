import { Suspense } from "react";
import type { Metadata } from "next";
import { CollegeComparePage } from "@/features/compare/components/college-compare-page";
import { PageLoadingSkeleton } from "@/components/feedback";

export const metadata: Metadata = { title: "Compare Colleges" };

export default function CompareCollegesPage() {
  return (
    <>
      <Suspense fallback={<PageLoadingSkeleton />}>
        <CollegeComparePage />
      </Suspense>
    </>
  );
}
