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
          backgroundColor: isDark ? 'rgb(30, 41, 59)' : 'rgb(255, 255, 255)',
          borderColor: isDark ? 'rgb(30, 41, 59)' : 'rgb(0, 102, 204)',
          borderWidth: isDark ? '1px' : '2px'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = isDark ? 'rgb(59, 130, 246)' : 'rgb(0, 102, 204)';
          e.currentTarget.style.borderWidth = '2px';
          e.currentTarget.style.boxShadow = isDark 
            ? '0 10px 15px -3px rgba(59, 130, 246, 0.2), 0 4px 6px -2px rgba(59, 130, 246, 0.1)' 
            : '0 10px 15px -3px rgba(0, 102, 204, 0.2), 0 4px 6px -2px rgba(0, 102, 204, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = isDark ? 'rgb(30, 41, 59)' : 'rgb(0, 102, 204)';
          e.currentTarget.style.borderWidth = isDark ? '1px' : '2px';
          e.currentTarget.style.boxShadow = '';
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
                  backgroundColor: isDark ? 'rgba(59, 130, 246, 0.9)' : 'rgba(0, 102, 204, 0.9)',
                  color: 'rgb(255, 255, 255)'
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
                    backgroundColor: isDark ? 'rgb(30, 58, 138)' : 'rgb(230, 244, 255)',
                    color: isDark ? 'rgb(147, 197, 253)' : 'rgb(0, 102, 204)'
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
            style={{ color: isDark ? 'rgb(241, 245, 249)' : 'rgb(0, 102, 204)' }}
          >
            {post.title}
          </h3>

          {/* Excerpt */}
          {post.excerpt && (
            <p
              className="text-sm mb-4 line-clamp-3 transition-colors flex-grow"
              style={{ color: isDark ? 'rgb(203, 213, 225)' : 'rgb(74, 85, 104)' }}
            >
              {post.excerpt}
            </p>
          )}

          {/* Footer con fecha y tiempo de lectura */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t"
            style={{ borderColor: isDark ? 'rgb(30, 41, 59)' : 'rgb(226, 232, 240)' }}
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
              style={{ color: isDark ? 'rgb(59, 130, 246)' : 'rgb(0, 102, 204)' }}
            />
          </div>
        </div>
      </article>
    </Link>
  );
}
