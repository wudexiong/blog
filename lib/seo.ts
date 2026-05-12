import { Metadata } from 'next';

export const siteConfig = {
  name: '净土博客',
  description: '融合净土佛学理念与AI技术的个人技术博客',
  url: 'https://pureland.blog',
  ogImage: '/og-image.png',
  links: {
    github: 'https://github.com',
  },
};

export function generateSEO({
  title,
  description,
  image,
  ...rest
}: {
  title: string;
  description?: string;
  image?: string;
  [key: string]: unknown;
}): Metadata {
  return {
    title,
    description: description || siteConfig.description,
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description: description || siteConfig.description,
      images: [{ url: image || siteConfig.ogImage }],
      ...rest,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${siteConfig.name}`,
      description: description || siteConfig.description,
      images: [image || siteConfig.ogImage],
    },
    ...rest,
  };
}
