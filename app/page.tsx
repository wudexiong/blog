import Link from 'next/link';
import { getRecentPosts } from '@/lib/mdx';
import { PostCard } from '@/components/mdx/PostCard';
import { LogoIcon, LotusIcon, AIIcon, YinYangIcon, ToolIcon, ArrowRightIcon } from '@/components/ui/Icons';

const features = [
  {
    icon: LotusIcon,
    title: '净土佛学',
    description: '经典讲解与修行心得',
    color: 'var(--color-primary)',
  },
  {
    icon: AIIcon,
    title: 'AI技术',
    description: '前沿技术与实用教程',
    color: 'var(--color-accent)',
  },
  {
    icon: YinYangIcon,
    title: '理念融合',
    description: '技术与佛学思考',
    color: 'var(--color-secondary)',
  },
  {
    icon: ToolIcon,
    title: '实用工具',
    description: '提升效率的工具推荐',
    color: 'var(--color-primary)',
  },
];

export default function Home() {
  const posts = getRecentPosts(6);

  return (
    <div className="min-h-screen">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)]/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--color-accent)]/5 blur-3xl" />
        
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <LogoIcon size={80} className="text-[var(--color-primary)]" />
              <div className="absolute inset-0 animate-pulse opacity-20">
                <LogoIcon size={80} className="text-[var(--color-accent)]" />
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl font-serif font-bold mb-4 text-[var(--color-primary)]">
            净土博客
          </h1>
          <p className="text-xl text-[var(--color-muted)] mb-2 tracking-wide">
            融合净土佛学理念与AI技术
          </p>
          <p className="text-[var(--color-muted)] text-sm opacity-80">
            技术学习中种下净土种子
          </p>
          
          <div className="flex justify-center gap-4 mt-10">
            <Link
              href="/posts"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:opacity-90 transition-all duration-200 shadow-lg shadow-[var(--color-primary)]/20"
            >
              浏览文章
              <ArrowRightIcon size={16} />
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-border)] text-[var(--color-foreground)] rounded-lg hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all duration-200"
            >
              探索工具
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold">最新文章</h2>
          <Link
            href="/posts"
            className="inline-flex items-center gap-1 text-sm text-[var(--color-accent)] hover:underline"
          >
            查看全部
            <ArrowRightIcon size={14} />
          </Link>
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
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid gap-6 md:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative p-6 border border-[var(--color-border)] rounded-xl hover:border-[var(--color-primary)]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[var(--color-primary)]/5"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-[var(--color-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `color-mix(in srgb, ${feature.color} 10%, transparent)` }}
                  >
                    <Icon size={24} className="opacity-80" style={{ color: feature.color }} />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-[var(--color-muted)]">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
