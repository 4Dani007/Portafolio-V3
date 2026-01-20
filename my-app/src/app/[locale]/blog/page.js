'use client';
import Navbar from '../../components/Navbar';
import { useTranslations, useLocale } from 'next-intl';
import { useTheme } from '../../../hooks/useTheme';
import BlogCard from '../../components/BlogCard';
import { getAllBlogPosts } from '../../../lib/blogPosts';
import { useEffect, useState } from 'react';

export default function BlogPage() {
  const t = useTranslations();
  const locale = useLocale();
  const { isDark, mounted } = useTheme();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (mounted) {
      const allPosts = getAllBlogPosts(locale);
      setPosts(allPosts);
    }
  }, [locale, mounted]);

  if (!mounted) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="min-h-screen flex items-center justify-center p-6 py-20 pt-32">
        <div className="w-full max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1
              className="text-4xl md:text-5xl font-bold mb-4 transition-colors"
              style={{ color: isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)' }}
            >
              {t('blogSection.title')}
            </h1>
            <p
              className="text-lg transition-colors"
              style={{ color: isDark ? 'rgb(209, 213, 219)' : 'rgb(63, 63, 70)' }}
            >
              {t('blogSection.subtitle')}
            </p>
          </div>

          {/* Lista de posts */}
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p
                className="text-lg transition-colors"
                style={{ color: isDark ? 'rgb(209, 213, 219)' : 'rgb(63, 63, 70)' }}
              >
                {t('blogSection.noPosts')}
              </p>
              <p
                className="text-sm mt-2 transition-colors"
                style={{ color: isDark ? 'rgb(161, 161, 170)' : 'rgb(113, 113, 122)' }}
              >
                {t('blogSection.comingSoon')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
