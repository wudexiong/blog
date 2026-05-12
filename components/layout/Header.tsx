import Link from 'next/link';
import { ThemeSwitcher } from './ThemeSwitcher';
import { LogoIcon, HomeIcon, FileIcon, ToolIcon, ArchiveIcon, SearchIcon } from '@/components/ui/Icons';

const navItems = [
  { href: '/', label: '首页', icon: HomeIcon },
  { href: '/posts', label: '文章', icon: FileIcon },
  { href: '/tools', label: '工具', icon: ToolIcon },
  { href: '/archives', label: '归档', icon: ArchiveIcon },
  { href: '/search', label: '搜索', icon: SearchIcon },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-background)]/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <LogoIcon 
            className="text-[var(--color-primary)] transition-transform duration-300 group-hover:scale-105" 
            size={36} 
          />
          <div className="flex flex-col">
            <span className="text-xl font-serif font-bold text-[var(--color-primary)] leading-tight">
              净土博客
            </span>
            <span className="text-[10px] text-[var(--color-muted)] tracking-wider opacity-70">
              Pure Land Blog
            </span>
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-border)]/30 rounded-lg transition-all duration-200"
              >
                <Icon size={16} className="opacity-70" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
