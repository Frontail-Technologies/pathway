import { listCoaching } from '@/features/coaching/api/coaching-api'
import { listTutors } from '@/features/tutors/api/tutors-api'
import { TutorsCoachingTabs } from './tutors-coaching-tabs'

export async function TutorsCoachingSection() {
  const [featuredTutors, featuredCoaching] = await Promise.all([
    listTutors({ limit: '12' })
      .then((list) => list.items.filter((tutor) => tutor.featured).slice(0, 4))
      .catch(() => []),
    listCoaching({ limit: '12' })
      .then((list) => list.items.filter((provider) => provider.featured).slice(0, 4))
      .catch(() => []),
  ])
  if (featuredTutors.length === 0 && featuredCoaching.length === 0) return null
  return <TutorsCoachingTabs featuredTutors={featuredTutors} featuredCoaching={featuredCoaching} />
}
