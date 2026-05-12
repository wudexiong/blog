export type ThemeName = 'zen' | 'eye-care' | 'dark' | 'classic';

export interface Theme {
  name: ThemeName;
  label: string;
  description: string;
  icon: string;
}

export const themes: Theme[] = [
  {
    name: 'zen',
    label: '禅意',
    description: '米白背景，檀木色调，宁静致远',
    icon: '🪷',
  },
  {
    name: 'eye-care',
    label: '护眼',
    description: '暖色调，低对比度，适合长时间阅读',
    icon: '🌙',
  },
  {
    name: 'dark',
    label: '深色',
    description: '深灰背景，柔和文字，夜间阅读',
    icon: '🌑',
  },
  {
    name: 'classic',
    label: '经典',
    description: '宣纸色，墨色文字，传统书卷气息',
    icon: '📜',
  },
];

export const defaultTheme: ThemeName = 'zen';
