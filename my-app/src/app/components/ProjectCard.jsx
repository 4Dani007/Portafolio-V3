'use client';
import { ExternalLink, Github, Star, GitFork, Calendar, Code } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLocale, useTranslations } from 'next-intl';
import { getProjectTitle, getProjectDescription, getProjectImage } from '../../lib/projectTranslations';

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
export default function ProjectCard({ project, onClick }) {
  const { isDark } = useTheme();
  const locale = useLocale();
  const t = useTranslations('projectsSection');

  if (!project) {
    return null;
  }

  // Obtener título y descripción traducidos
  const translatedTitle = getProjectTitle(
    project.name,
    locale,
    project.name || ''
  );
  
  const translatedDescription = getProjectDescription(
    project.name,
    locale,
    project.description || ''
  );

  const projectImage = project.image || getProjectImage(project.name);

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
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      aria-label={`Ver detalles de ${translatedTitle}`}
    >
      {projectImage && (
        <div className="relative w-full h-40 overflow-hidden flex-shrink-0">
          <img
            src={projectImage}
            alt={translatedTitle}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
          {project.isPrivate && (
            <div
              className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium"
              style={{
                backgroundColor: isDark ? 'rgba(100, 116, 139, 0.95)' : 'rgba(71, 85, 105, 0.9)',
                color: 'rgb(255, 255, 255)',
              }}
            >
              {t('privateBadge')}
            </div>
          )}
        </div>
      )}

      <div className="p-6 flex flex-col flex-grow">
      {/* Header con nombre y enlaces */}
      <div className="flex items-start justify-between mb-4">
        <h3 
          className="text-xl font-semibold transition-colors flex-1 pr-2"
          style={{ color: isDark ? 'rgb(241, 245, 249)' : 'rgb(0, 102, 204)' }}
        >
          {translatedTitle}
        </h3>
        <div className="flex gap-2 flex-shrink-0">
          {project.homepage && (
            <a
              href={project.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg transition-colors hover:scale-110"
              style={{
                backgroundColor: isDark ? 'rgb(30, 41, 59)' : 'rgb(230, 244, 255)',
                color: isDark ? 'rgb(59, 130, 246)' : 'rgb(0, 102, 204)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDark ? 'rgb(59, 130, 246)' : 'rgb(0, 102, 204)';
                e.currentTarget.style.color = 'rgb(255, 255, 255)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = isDark ? 'rgb(30, 41, 59)' : 'rgb(230, 244, 255)';
                e.currentTarget.style.color = isDark ? 'rgb(59, 130, 246)' : 'rgb(0, 102, 204)';
              }}
              onClick={(e) => e.stopPropagation()}
              title="Ver demo"
            >
              <ExternalLink size={18} />
            </a>
          )}
          {/* Solo mostrar botón de GitHub si NO es un proyecto personalizado */}
          {!project.isCustom && project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg transition-colors hover:scale-110"
              style={{
                backgroundColor: isDark ? 'rgb(30, 41, 59)' : 'rgb(230, 244, 255)',
                color: isDark ? 'rgb(59, 130, 246)' : 'rgb(0, 102, 204)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDark ? 'rgb(59, 130, 246)' : 'rgb(0, 102, 204)';
                e.currentTarget.style.color = 'rgb(255, 255, 255)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = isDark ? 'rgb(30, 41, 59)' : 'rgb(230, 244, 255)';
                e.currentTarget.style.color = isDark ? 'rgb(59, 130, 246)' : 'rgb(0, 102, 204)';
              }}
              onClick={(e) => e.stopPropagation()}
              title="Ver en GitHub"
            >
              <Github size={18} />
            </a>
          )}
          {/* Para proyectos personalizados, mostrar botón de enlace si hay URL */}
          {project.isCustom && project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg transition-colors hover:scale-110"
              style={{
                backgroundColor: isDark ? 'rgb(30, 41, 59)' : 'rgb(230, 244, 255)',
                color: isDark ? 'rgb(59, 130, 246)' : 'rgb(0, 102, 204)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDark ? 'rgb(59, 130, 246)' : 'rgb(0, 102, 204)';
                e.currentTarget.style.color = 'rgb(255, 255, 255)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = isDark ? 'rgb(30, 41, 59)' : 'rgb(230, 244, 255)';
                e.currentTarget.style.color = isDark ? 'rgb(59, 130, 246)' : 'rgb(0, 102, 204)';
              }}
              onClick={(e) => e.stopPropagation()}
              title="Ver proyecto"
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      {/* Descripción */}
      {translatedDescription && (
        <p 
          className="text-sm mb-4 line-clamp-3 transition-colors flex-grow"
          style={{ color: isDark ? 'rgb(203, 213, 225)' : 'rgb(74, 85, 104)' }}
        >
          {translatedDescription}
        </p>
      )}

      {/* Lenguaje */}
      {project.language && (
        <div className="flex items-center gap-2 mb-4">
          <Code size={16} style={{ color: isDark ? 'rgb(59, 130, 246)' : 'rgb(0, 102, 204)' }} />
          <span 
            className="text-sm font-medium transition-colors"
            style={{ color: isDark ? 'rgb(203, 213, 225)' : 'rgb(74, 85, 104)' }}
          >
            {project.language}
          </span>
        </div>
      )}

      {/* Stats (Stars y Forks) — solo repos públicos de GitHub */}
      {!project.isCustom && (
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1">
          <Star 
            size={16} 
            style={{ color: isDark ? 'rgb(250, 204, 21)' : 'rgb(234, 179, 8)' }} 
            fill={isDark ? 'rgb(250, 204, 21)' : 'rgb(234, 179, 8)'}
          />
          <span 
            className="text-sm transition-colors"
            style={{ color: isDark ? 'rgb(203, 213, 225)' : 'rgb(74, 85, 104)' }}
          >
            {project.stars}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <GitFork 
            size={16} 
            style={{ color: isDark ? 'rgb(59, 130, 246)' : 'rgb(0, 102, 204)' }} 
          />
          <span 
            className="text-sm transition-colors"
            style={{ color: isDark ? 'rgb(203, 213, 225)' : 'rgb(74, 85, 104)' }}
          >
            {project.forks}
          </span>
        </div>
        {project.updatedAt && (
          <div className="flex items-center gap-1 ml-auto">
            <Calendar 
              size={14} 
              style={{ color: isDark ? 'rgb(161, 161, 170)' : 'rgb(113, 113, 122)' }} 
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
      )}

      {/* Topics/Tags - Se empuja hacia abajo con mt-auto */}
      {project.topics && project.topics.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-4 border-t mt-auto"
          style={{ borderColor: isDark ? 'rgb(30, 41, 59)' : 'rgb(226, 232, 240)' }}
        >
          {project.topics.slice(0, 4).map((topic) => (
            <span
              key={topic}
              className="text-xs px-2 py-1 rounded-md font-medium transition-colors"
              style={{
                backgroundColor: isDark ? 'rgb(30, 58, 138)' : 'rgb(230, 244, 255)',
                color: isDark ? 'rgb(147, 197, 253)' : 'rgb(0, 102, 204)'
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
    </div>
  );
}

