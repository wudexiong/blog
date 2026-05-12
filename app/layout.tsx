import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: '净土博客 - 融合净土佛学理念与AI技术',
    template: '%s | 净土博客',
  },
  description: '融合净土佛学理念与AI技术的个人技术博客，技术学习中种下净土种子',
  keywords: ['净土', '佛学', 'AI', '技术博客', 'Next.js'],
  authors: [{ name: '净土博客' }],
  creator: '净土博客',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    siteName: '净土博客',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const themeInitScript = `
  (function() {
    try {
      var theme = localStorage.getItem('theme') || 'zen';
      document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
