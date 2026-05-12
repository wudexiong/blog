import Link from 'next/link';
import { LogoIcon, RssIcon } from '@/components/ui/Icons';

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] py-12 mt-auto">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <LogoIcon className="text-[var(--color-primary)] opacity-60" size={28} />
            <div className="text-center md:text-left">
              <p className="text-sm text-[var(--color-muted)]">
                融合净土佛学理念与AI技术
              </p>
              <p className="text-xs text-[var(--color-muted)] mt-1">
                © {new Date().getFullYear()} 净土博客 · 技术学习中种下净土种子
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Link 
              href="/rss.xml" 
              className="flex items-center gap-1.5 text-xs text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
            >
              <RssIcon size={14} />
              RSS
            </Link>
            <span className="text-[var(--color-border)]">|</span>
            <Link 
              href="/sitemap.xml" 
              className="text-xs text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
