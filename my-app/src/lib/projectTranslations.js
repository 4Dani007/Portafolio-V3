import { TableColumnsSplit } from "lucide-react";

const projectTranslations = {

  'custom-1': {
        title: {
          es: 'Herramientas de gestion BIM360 y Autodesk Construction Cloud',
          en: 'BIM360 and Autodesk Construction Cloud management tools'
        },
        description: {
          es: 'Suite interna de herramientas desarrollada para optimizar la administración de proyectos en BIM360 y Autodesk Construction Cloud mediante integraciones con Autodesk Platform Services.',
          en: 'Internal suite of tools developed to optimize project management in BIM360 and Autodesk Construction Cloud through integrations with Autodesk Platform Services.'
        },
        additionalInfo: {
          es: {
            title: 'Características Principales',
            content: '<strong>Objetivo:</strong><br>Reducir tareas manuales, mejorar la trazabilidad y centralizar operaciones administrativas relacionadas con usuarios, permisos y proyectos.<br><br><strong>Mi rol:</strong>',
            items: [
              'Desarrollo frontend en React para interfaces de visualización masiva.',
              'Implementación backend en Flask para orquestar operaciones con Autodesk API.',
              'Gestión de autenticación con tokens (2-legged y 3-legged).',
              'Desarrollo de scripts Python para operaciones masivas',
              'Documentación técnica y flujos en Postman para uso interno del equipo.'
            ],
            content2: '<strong>APIs utilizadas:</strong>',
            items2: [
              'Autodesk Platform Services (APS)',
              'Autodesk Construction Cloud API',
              'Autodesk BIM360 API',
              'Data Management API'
            ],
            content3: '<strong>Características principales:</strong>',
            items3: [
              'Visualización masiva de permisos por proyecto.',
              'Exportación de listas de proyectos',
              'Asignación masiva de usuarios a proyectos',
              'Comparación de permisos entre proyectos'
            ],
            content4: '<strong>Impacto:</strong>',
            items4: [
              'Procesos manuales reducidos de horas a minutos.',
              'Mayor consistencia en la administración de usuarios y permisos.',
              'Mejor trazabilidad en gestión documental y administración de proyectos.'
            ],
            content5: '<strong>Nota:</strong> <br> Este proyecto fue desarrollado dentro de un entorno empresarial; se presenta únicamente de forma conceptual sin mostrar código ni detalles privados.'
          },
          en: {
            title: 'Main Features',
            content: '<strong>Objective:</strong><br>Reduce manual tasks, improve traceability, and centralize administrative operations related to users, permissions, and projects.<br><br><strong>My role:</strong>',
            items: [
              'Frontend development in React for massive visualization interfaces.',
              'Backend implementation in Flask to orchestrate operations with Autodesk API.',
              'Authentication management with tokens (2-legged and 3-legged).',
              'Development of Python scripts for massive operations',
              'Technical documentation and flows in Postman for internal team use.'
            ],
            content2: '<strong>Used APIs:</strong>',
            items2: [
              'Autodesk Platform Services (APS)',
              'Autodesk Construction Cloud API',
              'Autodesk BIM360 API',
              'Data Management API'
            ],
            content3: '<strong>Main features:</strong>',
            items3: [
              'Massive permission visualization by project.',
              'Export project lists',
              'Massive user assignment to projects',
              'Permission comparison between projects'
            ],
            content4: '<strong>Impact:</strong>',
            items4: [
              'Manual processes reduced from hours to minutes.',
              'Greater consistency in user and permission management.',
              'Better traceability in document management and project administration.'
            ],
            content5: '<strong>Note:</strong> <br> This project was developed within an enterprise environment; it is presented only in a conceptual form without showing code or private details.'
          }
        }
      },
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
 * Obtiene la traducción de la información adicional de un proyecto
 * 
 * @param {string} repoName - Nombre del repositorio
 * @param {string} locale - Locale actual ('es' o 'en')
 * @param {Object} fallbackAdditionalInfo - Información adicional original (fallback)
 * @returns {Object|null} Información adicional traducida o la original si no hay traducción
 */
export function getProjectAdditionalInfo(repoName, locale, fallbackAdditionalInfo = null) {
  if (!repoName || !projectTranslations[repoName] || !projectTranslations[repoName].additionalInfo) {
    return fallbackAdditionalInfo;
  }

  const additionalInfoTranslations = projectTranslations[repoName].additionalInfo;
  
  // Intentar obtener la traducción para el locale actual
  if (additionalInfoTranslations[locale]) {
    return additionalInfoTranslations[locale];
  }

  // Si no hay traducción para el locale actual, intentar con el otro
  const fallbackLocale = locale === 'es' ? 'en' : 'es';
  if (additionalInfoTranslations[fallbackLocale]) {
    return additionalInfoTranslations[fallbackLocale];
  }

  // Si no hay ninguna traducción, usar la información original
  return fallbackAdditionalInfo;
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

