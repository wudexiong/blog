import { getAllPosts } from '@/lib/mdx';
import { PostCard } from '@/components/mdx/PostCard';
import { FileIcon } from '@/components/ui/Icons';

export const metadata = {
  title: '文章',
  description: '所有文章列表',
};

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center">
          <FileIcon size={24} className="text-[var(--color-primary)]" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">文章</h1>
          <p className="text-sm text-[var(--color-muted)] mt-1">
            共 {posts.length} 篇文章
          </p>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      
      {posts.length === 0 && (
        <div className="text-center py-16 border border-dashed border-[var(--color-border)] rounded-xl">
          <p className="text-[var(--color-muted)]">
            暂无文章，请添加内容到 content/posts 目录
          </p>
        </div>
      )}
    </div>
  );
}
