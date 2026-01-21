import { getAllBlogPosts } from '../lib/blogPosts';

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dev-4daniel.vercel.app';
  const locales = ['es', 'en'];
  
  // Páginas principales por idioma
  const mainRoutes = locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1,
    alternates: {
      languages: {
        es: `${baseUrl}/es`,
        en: `${baseUrl}/en`,
      },
    },
  }));

  // Página de blog por idioma
  const blogRoutes = locales.map((locale) => ({
    url: `${baseUrl}/${locale}/blog`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
    alternates: {
      languages: {
        es: `${baseUrl}/es/blog`,
        en: `${baseUrl}/en/blog`,
      },
    },
  }));

  // Posts del blog por idioma
  const blogPostRoutes = [];
  locales.forEach((locale) => {
    const posts = getAllBlogPosts(locale);
    posts.forEach((post) => {
      blogPostRoutes.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(post.publishedAt),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: {
            es: `${baseUrl}/es/blog/${post.slug}`,
            en: `${baseUrl}/en/blog/${post.slug}`,
          },
        },
      });
    });
  });
  
  return [...mainRoutes, ...blogRoutes, ...blogPostRoutes];
}
