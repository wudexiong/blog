import { notFound } from 'next/navigation';
import { getPostsByCategory } from '@/lib/mdx';
import { PostCard } from '@/components/mdx/PostCard';

interface PageProps {
  params: Promise<{ category: string }>;
}

const categoryLabels: Record<string, string> = {
  buddhism: '净土佛学',
  'ai-tech': 'AI技术',
  fusion: '理念融合',
  tools: '实用工具',
};

export async function generateStaticParams() {
  return Object.keys(categoryLabels).map((category) => ({ category }));
}

export async function generateMetadata({ params }: PageProps) {
  const { category } = await params;
  const label = categoryLabels[category];
  if (!label) return { title: '分类未找到' };

  return {
    title: `${label} - 分类`,
    description: `${label}相关的所有文章`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const label = categoryLabels[category];

  if (!label) {
    notFound();
  }

  const posts = getPostsByCategory(category);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">{label}</h1>
      <p className="text-[var(--color-muted)] mb-8">
        共 {posts.length} 篇文章
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      {posts.length === 0 && (
        <p className="text-center text-[var(--color-muted)] py-12">
          暂无文章
        </p>
      )}
    </div>
  );
}
