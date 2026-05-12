'use client';

import { themes, ThemeName } from '@/lib/themes';
import { useState, useEffect } from 'react';
import { LotusIcon, SunIcon, MoonIcon } from '@/components/ui/Icons';

const themeIcons: Record<string, typeof LotusIcon> = {
  zen: LotusIcon,
  'eye-care': SunIcon,
  dark: MoonIcon,
  classic: LotusIcon,
};

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeName>('zen');
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as ThemeName | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = () => setIsOpen(false);
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isOpen]);

  const handleSetTheme = (newTheme: ThemeName) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    setIsOpen(false);
  };

  const currentTheme = themes.find(t => t.name === theme);
  const CurrentIcon = themeIcons[theme] || LotusIcon;

  if (!mounted) {
    return (
      <div className="flex items-center gap-2 px-3 py-2">
        <LotusIcon size={18} className="text-[var(--color-primary)] opacity-50" />
        <span className="hidden sm:inline text-sm text-[var(--color-muted)]">禅意</span>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[var(--color-border)]/50 transition-colors"
        aria-label="切换主题"
        aria-expanded={isOpen}
      >
        <CurrentIcon size={18} className="text-[var(--color-primary)]" />
        <span className="hidden sm:inline text-sm text-[var(--color-muted)]">{currentTheme?.label}</span>
      </button>
      
      {isOpen && (
        <div 
          className="absolute right-0 top-full mt-2 py-2 w-52 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {themes.map((t) => {
            const Icon = themeIcons[t.name] || LotusIcon;
            return (
              <button
                key={t.name}
                onClick={() => handleSetTheme(t.name)}
                className={`w-full px-4 py-3 text-left hover:bg-[var(--color-border)]/50 transition-colors flex items-center gap-3 ${
                  theme === t.name ? 'bg-[var(--color-border)]/30' : ''
                }`}
              >
                <Icon size={18} className="text-[var(--color-primary)] opacity-70" />
                <div>
                  <div className="text-sm font-medium">{t.label}</div>
                  <div className="text-xs text-[var(--color-muted)]">{t.description}</div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
