const projectTranslations = {
    'Portafolio-V3': {
        title: {
            es: 'Portafolio Personal',
            en: 'Personal Portfolio'
        },
        description: {
            es: 'Portafolio personal desarrollado con Next.js y React',
            en: 'Personal portfolio developed with Next.js and React'
        }
    },

    'proyecto_redes': {
        title: {
            es: 'Proyecto Universitario - Redes y telecomunicaciones',
            en: 'University Project - Redes and telecommunications'
        },
        description: {
            es: 'Proyecto universitario para la materia de Redes y telecomunicaciones, desarrollado en el framework Django',
            en: 'University project for the subject of Redes and telecommunications, developed in the Django framework'
        }
    },

    'OpenAI_Prueba_I': {
        title: {
            es: 'Pruebas de integracion API OpenAI',
            en: 'OpenAI API integration tests'
        },
        description: {
            es: 'Pruebas de integracion API OpenAI, desarrolladas en Python con flask para realizar un chatbot NLP que permite interpretar documentos en PDF',
            en: 'OpenAI API integration tests, developed in Python with flask to perform an NLP chatbot that allows interpreting documents in PDF'
        }
    },

    'CADHUBEV': {
        title: {
            es: 'Pagina web para el colectivo CADHUBEV',
            en: 'Website for the CADHUBEV collective'
        },
        description: {
            es: 'Pagina web para el colectivo CADHUBEV, desarrollada en html, css y javascript',
            en: 'Website for the CADHUBEV collective, developed in html, css and javascript'
        }
    }
};

/**
 * Obtiene la traducción del título de un proyecto
 * 
 * @param {string} repoName - Nombre del repositorio
 * @param {string} locale - Locale actual ('es' o 'en')
 * @param {string} fallbackTitle - Título original de GitHub (fallback)
 * @returns {string} Título traducido o el original si no hay traducción
 */
export function getProjectTitle(repoName, locale, fallbackTitle = '') {
  if (!repoName || !projectTranslations[repoName] || !projectTranslations[repoName].title) {
    return fallbackTitle || '';
  }

  const titleTranslations = projectTranslations[repoName].title;
  
  // Intentar obtener la traducción para el locale actual
  if (titleTranslations[locale]) {
    return titleTranslations[locale];
  }

  // Si no hay traducción para el locale actual, intentar con el otro
  const fallbackLocale = locale === 'es' ? 'en' : 'es';
  if (titleTranslations[fallbackLocale]) {
    return titleTranslations[fallbackLocale];
  }

  // Si no hay ninguna traducción, usar el título original
  return fallbackTitle || '';
}

/**
 * Obtiene la traducción de la descripción de un proyecto
 * 
 * @param {string} repoName
 * @param {string} locale
 * @param {string} fallbackDescription
 * @returns {string}
 */
export function getProjectDescription(repoName, locale, fallbackDescription = '') {
  if (!repoName || !projectTranslations[repoName] || !projectTranslations[repoName].description) {
    return fallbackDescription || '';
  }

  const descriptionTranslations = projectTranslations[repoName].description;
  
  if (descriptionTranslations[locale]) {
    return descriptionTranslations[locale];
  }

  const fallbackLocale = locale === 'es' ? 'en' : 'es';
  if (descriptionTranslations[fallbackLocale]) {
    return descriptionTranslations[fallbackLocale];
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

