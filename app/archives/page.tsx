import Link from 'next/link';
import { getArchives } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import { ArchiveIcon, CalendarIcon } from '@/components/ui/Icons';

export const metadata = {
  title: '归档',
  description: '所有文章按时间归档',
};

export default function ArchivesPage() {
  const archives = getArchives();
  const sortedArchives = Object.entries(archives).sort(
    ([a], [b]) => b.localeCompare(a)
  );
  
  const totalPosts = Object.values(archives).flat().length;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center">
          <ArchiveIcon size={24} className="text-[var(--color-primary)]" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">归档</h1>
          <p className="text-sm text-[var(--color-muted)] mt-1">
            共 {totalPosts} 篇文章
          </p>
        </div>
      </div>

      {sortedArchives.map(([yearMonth, posts]) => {
        const [year, month] = yearMonth.split('-');
        const monthNames = [
          '一月', '二月', '三月', '四月', '五月', '六月',
          '七月', '八月', '九月', '十月', '十一月', '十二月',
        ];

        return (
          <div key={yearMonth} className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <CalendarIcon size={18} className="text-[var(--color-primary)]" />
              <h2 className="text-xl font-semibold text-[var(--color-primary)]">
                {year}年 {monthNames[parseInt(month, 10) - 1]}
              </h2>
              <span className="text-sm text-[var(--color-muted)] bg-[var(--color-border)] px-2 py-0.5 rounded">
                {posts.length}篇
              </span>
            </div>
            <ul className="space-y-3 ml-7 border-l-2 border-[var(--color-border)] pl-6">
              {posts.map((post) => (
                <li key={post.slug} className="relative">
                  <div className="absolute -left-[1.85rem] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[var(--color-background)] border-2 border-[var(--color-primary)]" />
                  <Link
                    href={`/posts/${post.slug}`}
                    className="flex items-start gap-4 group py-1"
                  >
                    <span className="text-sm text-[var(--color-muted)] shrink-0">
                      {formatDate(post.date)}
                    </span>
                    <span className="group-hover:text-[var(--color-primary)] transition-colors">
                      {post.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}

      {sortedArchives.length === 0 && (
        <div className="text-center py-16 border border-dashed border-[var(--color-border)] rounded-xl">
          <p className="text-[var(--color-muted)]">
            暂无文章
          </p>
        </div>
      )}
    </div>
  );
}
