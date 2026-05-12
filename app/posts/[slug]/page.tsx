import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getAllPosts } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import { MDXContent } from '@/components/mdx/MDXContent';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const categoryLabels: Record<string, string> = {
  buddhism: '净土佛学',
  'ai-tech': 'AI技术',
  fusion: '理念融合',
  tools: '实用工具',
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: '文章未找到' };

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author || '净土博客'],
      tags: post.tags,
    },
  };
}

function generateJsonLd(post: {
  title: string;
  description: string;
  date: string;
  updated?: string;
  author?: string;
  tags: string[];
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: {
      '@type': 'Person',
      name: post.author || '净土博客',
    },
    publisher: {
      '@type': 'Organization',
      name: '净土博客',
      url: 'https://pureland.blog',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://pureland.blog/posts/${post.slug}`,
    },
    keywords: post.tags.join(', '),
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateJsonLd(post)) }}
      />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link
          href="/posts"
          className="text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)] mb-6 inline-block"
        >
          ← 返回文章列表
        </Link>

        <article>
          <header className="mb-8">
            <div className="flex items-center gap-2 text-sm text-[var(--color-muted)] mb-4">
              <span className="px-2 py-0.5 bg-[var(--color-border)] rounded">
                {categoryLabels[post.category]}
              </span>
              <span>{formatDate(post.date)}</span>
              <span>·</span>
              <span>{post.readingTime}</span>
            </div>
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p className="text-lg text-[var(--color-muted)]">{post.description}</p>
          </header>

          <MDXContent content={post.content} />

          <footer className="mt-8 pt-8 border-t border-[var(--color-border)]">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className="px-3 py-1 text-sm bg-[var(--color-border)] rounded-full hover:bg-[var(--color-accent)] hover:text-white transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </footer>
        </article>
      </div>
    </>
  );
}
