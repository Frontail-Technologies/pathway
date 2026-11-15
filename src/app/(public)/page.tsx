import { HeroSection } from '@/features/home/components/hero-section'
import { StreamSwitcherSection } from '@/features/home/components/stream-switcher-section'
import { TrustStrip } from '@/features/home/components/trust-strip'
import { TrendingCollegesSection } from '@/features/home/components/trending-colleges-section'
import { TopExamsSection } from '@/features/home/components/top-exams-section'
import { ToolsStrip } from '@/features/home/components/tools-strip'
import { TrendingCoursesSection } from '@/features/home/components/trending-courses-section'
import { CounsellingCtaSection } from '@/features/home/components/counselling-cta-section'
import { ScholarshipsClosingSection } from '@/features/home/components/scholarships-closing-section'
import { UpdatesSection } from '@/features/home/components/updates-section'
import { AppShowcase } from '@/features/home/components/app-showcase'
import { SeoDiscoverySection } from '@/features/home/components/seo-discovery-section'

export default function PublicHomePage() {
  return (
    <>
      <HeroSection />
      <StreamSwitcherSection />
      <TrustStrip />
      <TrendingCollegesSection />
      <TopExamsSection />
      <ToolsStrip />
      <TrendingCoursesSection />
      <CounsellingCtaSection tone="muted" />
      <ScholarshipsClosingSection />
      <UpdatesSection />
      <AppShowcase />
      <SeoDiscoverySection />
    </>
  )
}
