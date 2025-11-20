'use client';
import { X, ExternalLink, Github, Star, GitFork, Calendar, Code, Globe, Clock, Eye, AlertCircle, FileText, GitBranch } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLocale } from 'next-intl';
import { getProjectTitle, getProjectDescription, getProjectAdditionalInfo } from '../../lib/projectTranslations';
import { useEffect } from 'react';

/**
 * Modal para mostrar detalles expandidos de un proyecto
 * 
 * @param {Object} props
 * @param {Object|null} props.project - Proyecto a mostrar (null para cerrar)
 * @param {Function} props.onClose - Función para cerrar el modal
 */
export default function ProjectModal({ project, onClose }) {
  const { isDark } = useTheme();
  const locale = useLocale();

  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [project]);

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

  // Obtener información adicional traducida
  const translatedAdditionalInfo = getProjectAdditionalInfo(
    project.name,
    locale,
    project.additionalInfo || null
  );

  // Formatear fechas
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', { 
      year: 'numeric', 
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateShort = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', { 
      year: 'numeric', 
      month: 'short',
      day: 'numeric'
    });
  };

  // Cerrar modal al hacer clic en el overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Cerrar modal con ESC
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const bgColor = isDark ? 'rgb(24, 24, 27)' : 'rgb(255, 255, 255)';
  const cardBg = isDark ? 'rgb(39, 39, 42)' : 'rgb(255, 255, 255)';
  const borderColor = isDark ? 'rgb(63, 63, 70)' : 'rgb(228, 228, 231)';
  const textColor = isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)';
  const secondaryTextColor = isDark ? 'rgb(209, 213, 219)' : 'rgb(63, 63, 70)';
  const iconColor = isDark ? 'rgb(209, 213, 219)' : 'rgb(113, 113, 122)';
  const tagBg = isDark ? 'rgb(63, 63, 70)' : 'rgb(244, 244, 245)';
  const tagTextColor = isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)';
  const hoverBg = isDark ? 'rgb(63, 63, 70)' : 'rgb(244, 244, 245)';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] rounded-lg border shadow-xl overflow-hidden flex flex-col animate-slideUp"
        style={{
          backgroundColor: cardBg,
          borderColor: borderColor
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-start justify-between p-6 border-b"
          style={{ borderColor: borderColor }}
        >
          <div className="flex-1 pr-4">
            <h2
              className="text-2xl md:text-3xl font-bold mb-2 transition-colors"
              style={{ color: textColor }}
            >
              {translatedTitle}
            </h2>
            {project.language && (
              <div className="flex items-center gap-2">
                <Code size={16} style={{ color: iconColor }} />
                <span
                  className="text-sm font-medium transition-colors"
                  style={{ color: secondaryTextColor }}
                >
                  {project.language}
                </span>
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-colors hover:scale-110 flex-shrink-0"
            style={{
              backgroundColor: isDark ? 'rgb(63, 63, 70)' : 'rgb(244, 244, 245)',
              color: textColor
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = hoverBg;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = isDark ? 'rgb(63, 63, 70)' : 'rgb(244, 244, 245)';
            }}
            aria-label="Cerrar"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="overflow-y-auto flex-1 p-6">
          {/* Descripción */}
          {translatedDescription && (
            <div className="mb-6">
              <h3
                className="text-lg font-semibold mb-3 transition-colors"
                style={{ color: textColor }}
              >
                {locale === 'es' ? 'Descripción' : 'Description'}
              </h3>
              <p
                className="text-base leading-relaxed transition-colors"
                style={{ color: secondaryTextColor }}
              >
                {translatedDescription}
              </p>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {project.stars !== undefined && (
              <div
                className="p-4 rounded-lg border"
                style={{
                  backgroundColor: tagBg,
                  borderColor: borderColor
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Star
                    size={18}
                    style={{ color: isDark ? 'rgb(250, 204, 21)' : 'rgb(234, 179, 8)' }}
                    fill={isDark ? 'rgb(250, 204, 21)' : 'rgb(234, 179, 8)'}
                  />
                  <span
                    className="text-sm font-medium transition-colors"
                    style={{ color: secondaryTextColor }}
                  >
                    {locale === 'es' ? 'Estrellas' : 'Stars'}
                  </span>
                </div>
                <p
                  className="text-2xl font-bold transition-colors"
                  style={{ color: textColor }}
                >
                  {project.stars || 0}
                </p>
              </div>
            )}

            {project.forks !== undefined && (
              <div
                className="p-4 rounded-lg border"
                style={{
                  backgroundColor: tagBg,
                  borderColor: borderColor
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <GitFork size={18} style={{ color: iconColor }} />
                  <span
                    className="text-sm font-medium transition-colors"
                    style={{ color: secondaryTextColor }}
                  >
                    {locale === 'es' ? 'Forks' : 'Forks'}
                  </span>
                </div>
                <p
                  className="text-2xl font-bold transition-colors"
                  style={{ color: textColor }}
                >
                  {project.forks || 0}
                </p>
              </div>
            )}

            {project.watchers !== undefined && project.watchers > 0 && (
              <div
                className="p-4 rounded-lg border"
                style={{
                  backgroundColor: tagBg,
                  borderColor: borderColor
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Eye size={18} style={{ color: iconColor }} />
                  <span
                    className="text-sm font-medium transition-colors"
                    style={{ color: secondaryTextColor }}
                  >
                    {locale === 'es' ? 'Watchers' : 'Watchers'}
                  </span>
                </div>
                <p
                  className="text-2xl font-bold transition-colors"
                  style={{ color: textColor }}
                >
                  {project.watchers || 0}
                </p>
              </div>
            )}

            {project.openIssues !== undefined && project.openIssues > 0 && (
              <div
                className="p-4 rounded-lg border"
                style={{
                  backgroundColor: tagBg,
                  borderColor: borderColor
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <AlertCircle size={18} style={{ color: iconColor }} />
                  <span
                    className="text-sm font-medium transition-colors"
                    style={{ color: secondaryTextColor }}
                  >
                    {locale === 'es' ? 'Issues' : 'Issues'}
                  </span>
                </div>
                <p
                  className="text-2xl font-bold transition-colors"
                  style={{ color: textColor }}
                >
                  {project.openIssues || 0}
                </p>
              </div>
            )}

            {project.createdAt && (
              <div
                className="p-4 rounded-lg border"
                style={{
                  backgroundColor: tagBg,
                  borderColor: borderColor
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Clock size={18} style={{ color: iconColor }} />
                  <span
                    className="text-sm font-medium transition-colors"
                    style={{ color: secondaryTextColor }}
                  >
                    {locale === 'es' ? 'Creado' : 'Created'}
                  </span>
                </div>
                <p
                  className="text-sm font-semibold transition-colors"
                  style={{ color: textColor }}
                >
                  {formatDateShort(project.createdAt)}
                </p>
              </div>
            )}

            {project.updatedAt && (
              <div
                className="p-4 rounded-lg border"
                style={{
                  backgroundColor: tagBg,
                  borderColor: borderColor
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Calendar size={18} style={{ color: iconColor }} />
                  <span
                    className="text-sm font-medium transition-colors"
                    style={{ color: secondaryTextColor }}
                  >
                    {locale === 'es' ? 'Actualizado' : 'Updated'}
                  </span>
                </div>
                <p
                  className="text-sm font-semibold transition-colors"
                  style={{ color: textColor }}
                >
                  {formatDateShort(project.updatedAt)}
                </p>
              </div>
            )}
          </div>

          {/* Topics */}
          {project.topics && project.topics.length > 0 && (
            <div className="mb-6">
              <h3
                className="text-lg font-semibold mb-3 transition-colors"
                style={{ color: textColor }}
              >
                {locale === 'es' ? 'Tecnologías' : 'Technologies'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.topics.map((topic) => (
                  <span
                    key={topic}
                    className="px-3 py-1 rounded-md text-sm font-medium transition-colors"
                    style={{
                      backgroundColor: tagBg,
                      color: tagTextColor
                    }}
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Información adicional del proyecto */}
          <div className="mb-6">
            <h3
              className="text-lg font-semibold mb-3 transition-colors"
              style={{ color: textColor }}
            >
              {locale === 'es' ? 'Información del Proyecto' : 'Project Information'}
            </h3>
            <div className="space-y-2">
              {project.createdAt && (
                <div className="flex items-center gap-2">
                  <Clock size={16} style={{ color: iconColor }} />
                  <span
                    className="text-sm transition-colors"
                    style={{ color: secondaryTextColor }}
                  >
                    <strong>{locale === 'es' ? 'Creado:' : 'Created:'}</strong>{' '}
                    {formatDate(project.createdAt)}
                  </span>
                </div>
              )}
              {project.updatedAt && (
                <div className="flex items-center gap-2">
                  <Calendar size={16} style={{ color: iconColor }} />
                  <span
                    className="text-sm transition-colors"
                    style={{ color: secondaryTextColor }}
                  >
                    <strong>{locale === 'es' ? 'Última actualización:' : 'Last updated:'}</strong>{' '}
                    {formatDate(project.updatedAt)}
                  </span>
                </div>
              )}
              {project.pushedAt && (
                <div className="flex items-center gap-2">
                  <GitBranch size={16} style={{ color: iconColor }} />
                  <span
                    className="text-sm transition-colors"
                    style={{ color: secondaryTextColor }}
                  >
                    <strong>{locale === 'es' ? 'Último push:' : 'Last pushed:'}</strong>{' '}
                    {formatDate(project.pushedAt)}
                  </span>
                </div>
              )}
              {project.license && (
                <div className="flex items-center gap-2">
                  <FileText size={16} style={{ color: iconColor }} />
                  <span
                    className="text-sm transition-colors"
                    style={{ color: secondaryTextColor }}
                  >
                    <strong>{locale === 'es' ? 'Licencia:' : 'License:'}</strong>{' '}
                    {project.license}
                  </span>
                </div>
              )}
              {project.defaultBranch && (
                <div className="flex items-center gap-2">
                  <GitBranch size={16} style={{ color: iconColor }} />
                  <span
                    className="text-sm transition-colors"
                    style={{ color: secondaryTextColor }}
                  >
                    <strong>{locale === 'es' ? 'Rama principal:' : 'Default branch:'}</strong>{' '}
                    {project.defaultBranch}
                  </span>
                </div>
              )}
              {project.size !== undefined && (
                <div className="flex items-center gap-2">
                  <FileText size={16} style={{ color: iconColor }} />
                  <span
                    className="text-sm transition-colors"
                    style={{ color: secondaryTextColor }}
                  >
                    <strong>{locale === 'es' ? 'Tamaño:' : 'Size:'}</strong>{' '}
                    {project.size > 1024 
                      ? `${(project.size / 1024).toFixed(1)} MB` 
                      : `${project.size} KB`}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Información personalizada adicional */}
          {translatedAdditionalInfo && (
            <div className="mb-6 space-y-6">
              {translatedAdditionalInfo.title && (
                <h3
                  className="text-lg font-semibold mb-3 transition-colors"
                  style={{ color: textColor }}
                >
                  {translatedAdditionalInfo.title}
                </h3>
              )}
              
              {/* Renderizar todos los bloques de contenido e items dinámicamente */}
              {Object.keys(translatedAdditionalInfo).map((key) => {
                // Ignorar 'title' ya que se renderiza arriba
                if (key === 'title') return null;
                
                // Si es un campo 'content' (content, content2, content3, etc.)
                if (key.startsWith('content')) {
                  const contentValue = translatedAdditionalInfo[key];
                  if (contentValue) {
                    return (
                      <div
                        key={key}
                        className="text-base leading-relaxed transition-colors"
                        style={{ color: secondaryTextColor }}
                        dangerouslySetInnerHTML={{ __html: contentValue }}
                      />
                    );
                  }
                }
                
                // Si es un campo 'items' (items, items2, items3, etc.)
                if (key.startsWith('items')) {
                  const itemsValue = translatedAdditionalInfo[key];
                  if (Array.isArray(itemsValue) && itemsValue.length > 0) {
                    return (
                      <ul key={key} className="list-disc list-inside space-y-2 ml-4">
                        {itemsValue.map((item, index) => (
                          <li
                            key={index}
                            className="text-sm transition-colors"
                            style={{ color: secondaryTextColor }}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                }
                
                return null;
              })}
            </div>
          )}
        </div>

        {/* Footer con botones */}
        <div
          className="flex flex-col sm:flex-row gap-3 p-6 border-t"
          style={{ borderColor: borderColor }}
        >
          {project.homepage && (
            <a
              href={project.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border text-sm font-medium transition-colors hover:scale-105 flex-1"
              style={{
                backgroundColor: cardBg,
                borderColor: borderColor,
                color: textColor
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = hoverBg;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = cardBg;
              }}
            >
              <Globe size={18} />
              <span>{locale === 'es' ? 'Ver Demo' : 'View Demo'}</span>
            </a>
          )}
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border text-sm font-medium transition-colors hover:scale-105 flex-1"
              style={{
                backgroundColor: cardBg,
                borderColor: borderColor,
                color: textColor
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = hoverBg;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = cardBg;
              }}
            >
              {project.isCustom ? (
                <>
                  <ExternalLink size={18} />
                  <span>{locale === 'es' ? 'Ver Proyecto' : 'View Project'}</span>
                </>
              ) : (
                <>
                  <Github size={18} />
                  <span>{locale === 'es' ? 'Ver en GitHub' : 'View on GitHub'}</span>
                </>
              )}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

