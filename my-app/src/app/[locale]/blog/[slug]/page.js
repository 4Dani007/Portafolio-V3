'use client';
import Navbar from '../../../components/Navbar';
import { useTranslations, useLocale } from 'next-intl';
import { useTheme } from '../../../../hooks/useTheme';
import { getBlogPostBySlug, getAllBlogPosts } from '../../../../lib/blogPosts';
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function BlogPostPage() {
  const t = useTranslations();
  const locale = useLocale();
  const { isDark, mounted } = useTheme();
  const params = useParams();
  const [post, setPost] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (mounted && params?.slug) {
      const foundPost = getBlogPostBySlug(params.slug, locale);
      if (foundPost) {
        setPost(foundPost);
      } else {
        setNotFound(true);
      }
    }
  }, [locale, mounted, params?.slug]);

  if (!mounted) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
        </div>
      </>
    );
  }

  if (notFound || !post) {
    return (
      <>
        <Navbar />
        <section className="min-h-screen flex items-center justify-center p-6 py-20 pt-32">
          <div className="text-center">
            <h1
              className="text-3xl font-bold mb-4 transition-colors"
              style={{ color: isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)' }}
            >
              404 - Post no encontrado
            </h1>
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-colors hover:scale-105"
              style={{
                backgroundColor: isDark ? 'rgb(39, 39, 42)' : 'rgb(244, 244, 245)',
                color: isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)'
              }}
            >
              <ArrowLeft size={20} />
              {t('blogSection.backToBlog')}
            </Link>
          </div>
        </section>
      </>
    );
  }

  // Formatear fecha
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', { 
      year: 'numeric', 
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Navbar />
      <article className="min-h-screen p-6 py-20 pt-32">
        <div className="max-w-4xl mx-auto">
          {/* Botón volver */}
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 mb-8 transition-colors hover:opacity-70"
            style={{ color: isDark ? 'rgb(209, 213, 219)' : 'rgb(63, 63, 70)' }}
          >
            <ArrowLeft size={20} />
            <span>{t('blogSection.backToBlog')}</span>
          </Link>

          {/* Header del post */}
          <header className="mb-8">
            {post.category && (
              <div
                className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
                style={{
                  backgroundColor: isDark ? 'rgb(63, 63, 70)' : 'rgb(244, 244, 245)',
                  color: isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)'
                }}
              >
                {post.category}
              </div>
            )}

            <h1
              className="text-4xl md:text-5xl font-bold mb-6 transition-colors"
              style={{ color: isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)' }}
            >
              {post.title}
            </h1>

            {/* Meta información */}
            <div className="flex flex-wrap items-center gap-6 mb-6 text-sm"
              style={{ color: isDark ? 'rgb(161, 161, 170)' : 'rgb(113, 113, 122)' }}
            >
              {post.publishedAt && (
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>
                    {t('blogSection.publishedOn')} {formatDate(post.publishedAt)}
                  </span>
                </div>
              )}
              {post.readingTime && (
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{post.readingTime}</span>
                </div>
              )}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <Tag size={16} style={{ color: isDark ? 'rgb(161, 161, 170)' : 'rgb(113, 113, 122)' }} />
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full text-xs font-medium transition-colors"
                    style={{
                      backgroundColor: isDark ? 'rgb(63, 63, 70)' : 'rgb(244, 244, 245)',
                      color: isDark ? 'rgb(209, 213, 219)' : 'rgb(63, 63, 70)'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Imagen destacada */}
          {post.image && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Contenido del post */}
          <div
            className="prose prose-lg max-w-none mb-12 transition-colors"
            style={{
              color: isDark ? 'rgb(209, 213, 219)' : 'rgb(63, 63, 70)'
            }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Footer del post */}
          <div className="pt-8 border-t"
            style={{ borderColor: isDark ? 'rgb(63, 63, 70)' : 'rgb(228, 228, 231)' }}
          >
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-colors hover:scale-105"
              style={{
                backgroundColor: isDark ? 'rgb(39, 39, 42)' : 'rgb(244, 244, 245)',
                color: isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)'
              }}
            >
              <ArrowLeft size={20} />
              {t('blogSection.backToBlog')}
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
