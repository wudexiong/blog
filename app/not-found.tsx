import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center">
      <div className="text-6xl mb-4">🪷</div>
      <h1 className="text-4xl font-bold mb-4">页面未找到</h1>
      <p className="text-[var(--color-muted)] mb-8">
        您访问的页面不存在，可能已被移动或删除。
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-[var(--color-accent)] text-white rounded-lg hover:opacity-90 transition-opacity"
      >
        返回首页
      </Link>
    </div>
  );
}
