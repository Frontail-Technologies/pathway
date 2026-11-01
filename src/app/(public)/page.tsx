import { HeroSection } from '@/features/home/components/hero-section'
import { DiscoveryToolsSection } from '@/features/home/components/discovery-tools-section'
import { AdmissionsBanner } from '@/features/home/components/admissions-banner'
import { TopExamsSection } from '@/features/home/components/top-exams-section'
import { CollegePredictorsSection } from '@/features/home/components/college-predictors-section'
import { PredictorBanner } from '@/features/home/components/predictor-banner'
import { TrendingCoursesSection } from '@/features/home/components/trending-courses-section'
import { TrendingCollegesSection } from '@/features/home/components/trending-colleges-section'
import { TutorsCoachingSection } from '@/features/home/components/tutors-coaching-section'
import { CounsellingCtaSection } from '@/features/home/components/counselling-cta-section'
import { SeoDiscoveryLinks } from '@/features/home/components/seo-discovery-links'

export default function PublicHomePage() {
  return (
    <>
      <HeroSection />
      <DiscoveryToolsSection />
      <AdmissionsBanner />
      <TopExamsSection />
      <CollegePredictorsSection />
      <PredictorBanner />
      <TrendingCoursesSection />
      <TrendingCollegesSection />
      <TutorsCoachingSection />
      <CounsellingCtaSection />
      <SeoDiscoveryLinks />
    </>
  )
}
