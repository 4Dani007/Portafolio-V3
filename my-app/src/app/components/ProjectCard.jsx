'use client';
import { ExternalLink, Github, Star, GitFork, Calendar, Code } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLocale } from 'next-intl';
import { getProjectDescription } from '../../lib/projectTranslations';

/**
 * Componente para mostrar una tarjeta de proyecto de GitHub
 * 
 * @param {Object} project - Objeto con información del repositorio
 * @param {string} project.name - Nombre del repositorio
 * @param {string} project.description - Descripción del proyecto
 * @param {string} project.url - URL del repositorio en GitHub
 * @param {string|null} project.homepage - URL del demo/proyecto en vivo
 * @param {string|null} project.language - Lenguaje principal
 * @param {number} project.stars - Número de estrellas
 * @param {number} project.forks - Número de forks
 * @param {string} project.updatedAt - Fecha de última actualización
 * @param {Array} project.topics - Array de topics/etiquetas
 */
export default function ProjectCard({ project }) {
  const { isDark } = useTheme();
  const locale = useLocale();

  if (!project) {
    return null;
  }

  // Obtener descripción traducida
  const translatedDescription = getProjectDescription(
    project.name,
    locale,
    project.description || ''
  );

  // Formatear fecha de actualización
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', { 
      year: 'numeric', 
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div
      className="rounded-lg p-6 border transition-all hover:shadow-lg hover:scale-[1.02]"
      style={{
        backgroundColor: isDark ? 'rgb(39, 39, 42)' : 'rgb(255, 255, 255)',
        borderColor: isDark ? 'rgb(63, 63, 70)' : 'rgb(228, 228, 231)'
      }}
    >
      {/* Header con nombre y enlaces */}
      <div className="flex items-start justify-between mb-4">
        <h3 
          className="text-xl font-semibold transition-colors flex-1 pr-2"
          style={{ color: isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)' }}
        >
          {project.name}
        </h3>
        <div className="flex gap-2 flex-shrink-0">
          {project.homepage && (
            <a
              href={project.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg transition-colors hover:scale-110"
              style={{
                backgroundColor: isDark ? 'rgb(63, 63, 70)' : 'rgb(244, 244, 245)',
                color: isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDark ? 'rgb(82, 82, 91)' : 'rgb(228, 228, 231)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = isDark ? 'rgb(63, 63, 70)' : 'rgb(244, 244, 245)';
              }}
              title="Ver demo"
            >
              <ExternalLink size={18} />
            </a>
          )}
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg transition-colors hover:scale-110"
            style={{
              backgroundColor: isDark ? 'rgb(63, 63, 70)' : 'rgb(244, 244, 245)',
              color: isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = isDark ? 'rgb(82, 82, 91)' : 'rgb(228, 228, 231)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = isDark ? 'rgb(63, 63, 70)' : 'rgb(244, 244, 245)';
            }}
            title="Ver en GitHub"
          >
            <Github size={18} />
          </a>
        </div>
      </div>

      {/* Descripción */}
      {translatedDescription && (
        <p 
          className="text-sm mb-4 line-clamp-3 transition-colors"
          style={{ color: isDark ? 'rgb(209, 213, 219)' : 'rgb(63, 63, 70)' }}
        >
          {translatedDescription}
        </p>
      )}

      {/* Lenguaje */}
      {project.language && (
        <div className="flex items-center gap-2 mb-4">
          <Code size={16} style={{ color: isDark ? 'rgb(209, 213, 219)' : 'rgb(63, 63, 70)' }} />
          <span 
            className="text-sm font-medium transition-colors"
            style={{ color: isDark ? 'rgb(209, 213, 219)' : 'rgb(63, 63, 70)' }}
          >
            {project.language}
          </span>
        </div>
      )}

      {/* Stats (Stars y Forks) */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1">
          <Star 
            size={16} 
            style={{ color: isDark ? 'rgb(250, 204, 21)' : 'rgb(234, 179, 8)' }} 
            fill={isDark ? 'rgb(250, 204, 21)' : 'rgb(234, 179, 8)'}
          />
          <span 
            className="text-sm transition-colors"
            style={{ color: isDark ? 'rgb(209, 213, 219)' : 'rgb(63, 63, 70)' }}
          >
            {project.stars}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <GitFork 
            size={16} 
            style={{ color: isDark ? 'rgb(209, 213, 219)' : 'rgb(63, 63, 70)' }} 
          />
          <span 
            className="text-sm transition-colors"
            style={{ color: isDark ? 'rgb(209, 213, 219)' : 'rgb(63, 63, 70)' }}
          >
            {project.forks}
          </span>
        </div>
        {project.updatedAt && (
          <div className="flex items-center gap-1 ml-auto">
            <Calendar 
              size={14} 
              style={{ color: isDark ? 'rgb(209, 213, 219)' : 'rgb(63, 63, 70)' }} 
            />
            <span 
              className="text-xs transition-colors"
              style={{ color: isDark ? 'rgb(161, 161, 170)' : 'rgb(113, 113, 122)' }}
            >
              {formatDate(project.updatedAt)}
            </span>
          </div>
        )}
      </div>

      {/* Topics/Tags */}
      {project.topics && project.topics.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-4 border-t"
          style={{ borderColor: isDark ? 'rgb(63, 63, 70)' : 'rgb(228, 228, 231)' }}
        >
          {project.topics.slice(0, 4).map((topic) => (
            <span
              key={topic}
              className="text-xs px-2 py-1 rounded-md font-medium transition-colors"
              style={{
                backgroundColor: isDark ? 'rgb(63, 63, 70)' : 'rgb(244, 244, 245)',
                color: isDark ? 'rgb(209, 213, 219)' : 'rgb(63, 63, 70)'
              }}
            >
              {topic}
            </span>
          ))}
          {project.topics.length > 4 && (
            <span 
              className="text-xs px-2 py-1 transition-colors"
              style={{ color: isDark ? 'rgb(161, 161, 170)' : 'rgb(113, 113, 122)' }}
            >
              +{project.topics.length - 4}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

