import { StudyAbroadHero } from './study-abroad-hero'
import { StudyAbroadPlanner } from './study-abroad-planner'
import { StudyAbroadExamRail } from './study-abroad-exam-rail'
import { DestinationFeatureGrid } from './destination-feature-grid'
import { StudyAbroadScholarshipsGuidanceSection } from './study-abroad-scholarships-guidance-section'
import { StudyAbroadResourceStrip } from './study-abroad-resource-strip'
import { StudyAbroadJourney } from './study-abroad-journey'





 
export function StudyAbroadListingPage() {
  return (
    <div className="bg-background">
      <StudyAbroadHero />
      <StudyAbroadPlanner />

      <section className="bg-background py-8 sm:py-10 lg:py-14">
        <div className="container-shell mx-auto px-4">
          <DestinationFeatureGrid />
        </div>
      </section>

      <section className="bg-muted py-8 sm:py-10 lg:py-14">
        <div className="container-shell mx-auto px-4">
          <StudyAbroadExamRail />
        </div>
      </section>

      <section className="bg-brand-blue-light py-8 sm:py-10 lg:py-14">
        <div className="container-shell mx-auto px-4">
          <StudyAbroadScholarshipsGuidanceSection />
        </div>
      </section>

      <StudyAbroadResourceStrip />
      <StudyAbroadJourney />
    </div>
  )
}
