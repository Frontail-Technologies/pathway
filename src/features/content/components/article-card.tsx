import Image from 'next/image'
import Link from 'next/link'
import { Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { articleTypeLabel, categoryLabel, formatArticleDate, type Article } from '../api/content-api'

function Cover({ article, className }: { article: Article; className?: string }) {
  if (!article.heroImageUrl) return null
  return (
    <div className={cn('relative overflow-hidden bg-muted', className)}>
      <Image src={article.heroImageUrl} alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.02]" unoptimized />
    </div>
  )
}

function Meta({ article }: { article: Article }) {
  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
      {article.authorName ? <span>{article.authorName}</span> : null}
      {article.publishedAt ? <span>{formatArticleDate(article.publishedAt)}</span> : null}
      <span className="flex items-center gap-1">
        <Clock className="size-3.5" aria-hidden="true" />
        {article.readingMinutes} min read
      </span>
    </p>
  )
}

export function ArticleFeature({ article }: { article: Article }) {
  return (
    <article className={cn('group relative grid overflow-hidden rounded-2xl border bg-card', article.heroImageUrl && 'md:grid-cols-[1.1fr_1fr]')}>
      <Cover article={article} className="aspect-[16/9] md:aspect-auto md:min-h-72" />
      <div className="flex flex-col justify-center gap-3 p-5 sm:p-7">
        <p className="text-sm font-medium text-primary">
          {articleTypeLabel[article.type]}
          {article.category ? ` · ${categoryLabel[article.category] ?? article.category}` : ''}
        </p>
        <h3 className="font-heading text-xl leading-snug font-bold text-foreground sm:text-2xl">
          <Link href={`/articles/${article.slug}`} className="outline-none after:absolute after:inset-0 group-hover:text-primary focus-visible:underline">
            {article.title}
          </Link>
        </h3>
        {article.excerpt ? <p className="line-clamp-3 text-[15px] leading-7 text-muted-foreground">{article.excerpt}</p> : null}
        <Meta article={article} />
      </div>
    </article>
  )
}

export function ArticleCard({ article, className }: { article: Article; className?: string }) {
  return (
    <article className={cn('group relative flex flex-col overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-[0_12px_28px_rgba(15,23,42,0.08)]', className)}>
      <Cover article={article} className="aspect-[16/9]" />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-[13px] font-medium text-primary">
          {articleTypeLabel[article.type]}
          {article.category ? ` · ${categoryLabel[article.category] ?? article.category}` : ''}
        </p>
        <h3 className="text-base leading-snug font-semibold text-foreground">
          <Link href={`/articles/${article.slug}`} className="line-clamp-2 outline-none after:absolute after:inset-0 group-hover:text-primary focus-visible:underline">
            {article.title}
          </Link>
        </h3>
        {article.excerpt ? <p className="line-clamp-2 text-sm text-muted-foreground">{article.excerpt}</p> : null}
        <div className="mt-auto pt-1">
          <Meta article={article} />
        </div>
      </div>
    </article>
  )
}
