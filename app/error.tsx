'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center">
      <div className="text-6xl mb-4">⚠️</div>
      <h1 className="text-4xl font-bold mb-4">出错了</h1>
      <p className="text-[var(--color-muted)] mb-8">
        抱歉，页面加载时发生了错误。
      </p>
      <div className="flex gap-4 justify-center">
        <button
          onClick={reset}
          className="px-6 py-3 bg-[var(--color-accent)] text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          重试
        </button>
        <Link
          href="/"
          className="px-6 py-3 border border-[var(--color-border)] rounded-lg hover:border-[var(--color-accent)] transition-colors"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}
