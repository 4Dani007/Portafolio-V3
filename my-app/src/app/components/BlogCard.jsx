'use client';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import Link from 'next/link';
import { useLocale } from 'next-intl';

/**
 * Componente para mostrar una tarjeta de post del blog
 * 
 * @param {Object} post - Objeto con información del post
 * @param {string} post.slug - Slug del post
 * @param {string} post.title - Título del post
 * @param {string} post.excerpt - Resumen del post
 * @param {string} post.publishedAt - Fecha de publicación
 * @param {string} post.readingTime - Tiempo de lectura
 * @param {string} post.category - Categoría del post
 * @param {Array} post.tags - Tags del post
 * @param {string} post.image - URL de la imagen
 */
export default function BlogCard({ post }) {
  const { isDark } = useTheme();
  const locale = useLocale();

  if (!post) {
    return null;
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
    <Link href={`/${locale}/blog/${post.slug}`}>
      <article
        className="rounded-lg border transition-all hover:shadow-lg hover:scale-[1.02] flex flex-col h-full cursor-pointer overflow-hidden"
        style={{
          backgroundColor: isDark ? 'rgb(39, 39, 42)' : 'rgb(255, 255, 255)',
          borderColor: isDark ? 'rgb(63, 63, 70)' : 'rgb(228, 228, 231)'
        }}
      >
        {/* Imagen del post */}
        {post.image && (
          <div className="relative w-full h-48 overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform hover:scale-105"
            />
            {post.category && (
              <div
                className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: isDark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.9)',
                  color: isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)'
                }}
              >
                {post.category}
              </div>
            )}
          </div>
        )}

        {/* Contenido */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 rounded text-xs font-medium transition-colors"
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

          {/* Título */}
          <h3
            className="text-xl font-bold mb-3 transition-colors line-clamp-2"
            style={{ color: isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)' }}
          >
            {post.title}
          </h3>

          {/* Excerpt */}
          {post.excerpt && (
            <p
              className="text-sm mb-4 line-clamp-3 transition-colors flex-grow"
              style={{ color: isDark ? 'rgb(209, 213, 219)' : 'rgb(63, 63, 70)' }}
            >
              {post.excerpt}
            </p>
          )}

          {/* Footer con fecha y tiempo de lectura */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t"
            style={{ borderColor: isDark ? 'rgb(63, 63, 70)' : 'rgb(228, 228, 231)' }}
          >
            <div className="flex items-center gap-4 text-xs"
              style={{ color: isDark ? 'rgb(161, 161, 170)' : 'rgb(113, 113, 122)' }}
            >
              {post.publishedAt && (
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
              )}
              {post.readingTime && (
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{post.readingTime}</span>
                </div>
              )}
            </div>
            <ArrowRight
              size={16}
              style={{ color: isDark ? 'rgb(209, 213, 219)' : 'rgb(63, 63, 70)' }}
            />
          </div>
        </div>
      </article>
    </Link>
  );
}
