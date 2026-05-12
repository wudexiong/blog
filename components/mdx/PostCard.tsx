import Link from 'next/link';
import { Post } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import { CalendarIcon, ClockIcon, TagIcon } from '@/components/ui/Icons';

interface PostCardProps {
  post: Post;
}

const categoryLabels: Record<string, string> = {
  buddhism: '净土佛学',
  'ai-tech': 'AI技术',
  fusion: '理念融合',
  tools: '实用工具',
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group border border-[var(--color-border)] rounded-xl p-6 hover:border-[var(--color-primary)]/50 hover:shadow-lg hover:shadow-[var(--color-primary)]/5 transition-all duration-300">
      <Link href={`/posts/${post.slug}`} className="block">
        <div className="flex items-center gap-3 text-xs text-[var(--color-muted)] mb-3">
          <span className="px-2.5 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-md font-medium">
            {categoryLabels[post.category]}
          </span>
        </div>
        
        <h2 className="text-lg font-semibold mb-3 group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
          {post.title}
        </h2>
        
        <p className="text-sm text-[var(--color-muted)] line-clamp-2 mb-4">
          {post.description}
        </p>
        
        <div className="flex items-center gap-4 text-xs text-[var(--color-muted)]">
          <span className="flex items-center gap-1.5">
            <CalendarIcon size={14} className="opacity-60" />
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <ClockIcon size={14} className="opacity-60" />
            {post.readingTime}
          </span>
        </div>
        
        {post.tags.length > 0 && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[var(--color-border)]/50">
            <TagIcon size={14} className="text-[var(--color-muted)] opacity-60" />
            <div className="flex gap-2 flex-wrap">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-[var(--color-accent)] hover:text-[var(--color-primary)] transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </Link>
    </article>
  );
}
