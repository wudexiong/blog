import { getPostsByTag, getAllTags } from '@/lib/mdx';
import { PostCard } from '@/components/mdx/PostCard';

interface PageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: PageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  return {
    title: `#${decodedTag} - 标签`,
    description: `标签 #${decodedTag} 相关的所有文章`,
  };
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">#{decodedTag}</h1>
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
