/**
 * Traducciones de descripciones de proyectos/repositorios de GitHub
 * 
 * Este archivo mapea los nombres de los repositorios a sus traducciones
 * en diferentes idiomas. Si un repositorio no tiene traducción, se usará
 * la descripción original de GitHub.
 * 
 * Estructura:
 * {
 *   'nombre-del-repo': {
 *     'es': 'Descripción en español',
 *     'en': 'Description in English'
 *   }
 * }
 */

const projectTranslations = {
    'Portafolio-V3': {
        es: 'Portafolio personal desarrollado con Next.js y React',
        en: 'Personal portfolio developed with Next.js and React'
    }
  // Agrega tus traducciones aquí:
  // 'nombre-del-repo': {
  //   'es': 'Descripción en español',
  //   'en': 'Description in English'
  // }
};

/**
 * Obtiene la traducción de la descripción de un proyecto
 * 
 * @param {string} repoName - Nombre del repositorio
 * @param {string} locale - Locale actual ('es' o 'en')
 * @param {string} fallbackDescription - Descripción original de GitHub (fallback)
 * @returns {string} Descripción traducida o la original si no hay traducción
 */
export function getProjectDescription(repoName, locale, fallbackDescription = '') {
  if (!repoName || !projectTranslations[repoName]) {
    return fallbackDescription || '';
  }

  const translations = projectTranslations[repoName];
  
  // Intentar obtener la traducción para el locale actual
  if (translations[locale]) {
    return translations[locale];
  }

  // Si no hay traducción para el locale actual, intentar con el otro
  const fallbackLocale = locale === 'es' ? 'en' : 'es';
  if (translations[fallbackLocale]) {
    return translations[fallbackLocale];
  }

  // Si no hay ninguna traducción, usar la descripción original
  return fallbackDescription || '';
}

/**
 * Verifica si existe una traducción para un repositorio
 * 
 * @param {string} repoName - Nombre del repositorio
 * @returns {boolean} True si existe traducción
 */
export function hasProjectTranslation(repoName) {
  return !!projectTranslations[repoName];
}

export default projectTranslations;

