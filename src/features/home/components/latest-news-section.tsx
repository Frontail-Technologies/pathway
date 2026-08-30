import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/shared/section-header'
import { newsArticles } from '../data/news-articles'
import { ArticleCard } from './article-card'
import { ArticleRow } from './article-row'

export function LatestNewsSection() {
  const [featured, ...rest] = newsArticles

  return (
    <section className="border-b bg-muted py-8 sm:py-9 lg:py-11">
      <div className="container-shell px-4">
        <div className="flex items-center justify-between gap-3">
          <SectionHeader title="Latest Education News & Articles" />
          <Link href="/articles" className="flex shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:underline">
            View All <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_1fr]">
          <ArticleCard article={featured} />
          <div className="flex flex-col rounded-[10px] border bg-card px-4">
            {rest.map((article) => <ArticleRow key={article.id} article={article} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
