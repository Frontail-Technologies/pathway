import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Clock } from 'lucide-react'
import { Breadcrumbs } from '@/components/shared'
import { Container } from '@/components/shared/container'
import { articleTypeLabel, categoryLabel, formatArticleDate, getArticle } from '@/features/content/api/content-api'
import { ArticleCard } from '@/features/content/components/article-card'
import { MarkdownBody } from '@/features/content/components/markdown-body'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticle((await params).slug)
  if (!article) return { title: 'Article Not Found' }
  return { title: article.title, description: article.excerpt ?? undefined, alternates: { canonical: `/articles/${article.slug}` } }
}

export default async function ArticleRoute({ params }: Props) {
  const article = await getArticle((await params).slug)
  if (!article) notFound()
  const updated = article.updatedAt && article.publishedAt && new Date(article.updatedAt).getTime() - new Date(article.publishedAt).getTime() > 86_400_000

  return (
    <div className="bg-background pb-24 lg:pb-14">
      <Container className="pt-5 lg:pt-6">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Articles', href: '/articles' }, article.title]} />
          <p className="mt-5 text-sm font-medium text-primary">
            {articleTypeLabel[article.type]}
            {article.category ? ` · ${categoryLabel[article.category] ?? article.category}` : ''}
          </p>
          <h1 className="mt-2 font-heading text-[28px] leading-tight font-extrabold text-foreground sm:text-[38px]">{article.title}</h1>
          {article.excerpt ? <p className="mt-3 text-[17px] leading-8 text-muted-foreground">{article.excerpt}</p> : null}
          <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 border-b pb-5 text-sm text-muted-foreground">
            {article.authorName ? <span className="font-medium text-foreground">{article.authorName}</span> : null}
            {article.publishedAt ? <span>{formatArticleDate(article.publishedAt)}</span> : null}
            {updated ? <span>Updated {formatArticleDate(article.updatedAt)}</span> : null}
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" aria-hidden="true" />
              {article.readingMinutes} min read
            </span>
          </p>
          {article.heroImageUrl ? (
            <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl bg-muted">
              <Image src={article.heroImageUrl} alt="" fill sizes="(min-width: 768px) 48rem, 100vw" className="object-cover" priority unoptimized />
            </div>
          ) : null}
          <div className="mt-4">
            <MarkdownBody source={article.body} />
          </div>
          {article.tags.length ? (
            <div className="mt-8 flex flex-wrap gap-2 border-t pt-5">
              {article.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                  #{tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        {article.related.length ? (
          <section aria-labelledby="related-articles" className="mx-auto mt-12 max-w-5xl">
            <h2 id="related-articles" className="font-heading text-xl font-bold text-foreground">
              Keep reading
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {article.related.map((item) => (
                <ArticleCard key={item.slug} article={item} />
              ))}
            </div>
          </section>
        ) : null}
      </Container>
    </div>
  )
}
