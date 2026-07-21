const DEFAULT_PROJECT_IMAGE = '/images/projects/web.svg';

const projectTranslations = {
  'custom-1': {
    title: {
      es: 'Suite de herramientas de gestión empresarial',
      en: 'Enterprise management tools suite',
    },
    description: {
      es: 'Aplicación full stack para automatizar operaciones administrativas: frontend en React, backend en Flask y orquestación de APIs REST de terceros.',
      en: 'Full stack application to automate administrative operations: React frontend, Flask backend, and third-party REST API orchestration.',
    },
    image: '/images/projects/enterprise.svg',
    caseStudy: {
      es: {
        problem: 'La administración de usuarios, permisos y proyectos en plataformas empresariales requería tareas manuales repetitivas que consumían horas del equipo.',
        solution: 'Desarrollé una suite full stack con React y Flask que centraliza operaciones masivas mediante integraciones OAuth y APIs REST.',
        result: 'Procesos que tomaban horas se redujeron a minutos, con mayor trazabilidad y consistencia en la gestión documental.',
      },
      en: {
        problem: 'Managing users, permissions, and projects across enterprise platforms required repetitive manual tasks that consumed hours of team time.',
        solution: 'I built a full stack suite with React and Flask that centralizes bulk operations through OAuth integrations and REST APIs.',
        result: 'Processes that took hours were reduced to minutes, with better traceability and consistency in document management.',
      },
    },
    additionalInfo: {
      es: {
        title: 'Características Principales',
        content: '<strong>Objetivo:</strong><br>Reducir tareas manuales, mejorar la trazabilidad y centralizar operaciones administrativas relacionadas con usuarios, permisos y proyectos.<br><br><strong>Mi rol:</strong>',
        items: [
          'Desarrollo frontend en React para interfaces de visualización masiva.',
          'Implementación backend en Flask para orquestar operaciones con APIs REST.',
          'Gestión de autenticación OAuth (2-legged y 3-legged).',
          'Desarrollo de scripts Python para operaciones masivas.',
          'Documentación técnica y flujos en Postman para uso interno del equipo.',
        ],
        content2: '<strong>Stack y APIs:</strong>',
        items2: [
          'React (frontend)',
          'Flask (backend)',
          'Python (scripts de automatización)',
          'REST APIs de plataformas empresariales',
          'OAuth 2.0 / tokens de acceso',
        ],
        content3: '<strong>Características principales:</strong>',
        items3: [
          'Visualización masiva de permisos por proyecto.',
          'Exportación de listas de proyectos',
          'Asignación masiva de usuarios a proyectos',
          'Comparación de permisos entre proyectos',
        ],
        content4: '<strong>Impacto:</strong>',
        items4: [
          'Procesos manuales reducidos de horas a minutos.',
          'Mayor consistencia en la administración de usuarios y permisos.',
          'Mejor trazabilidad en gestión documental y administración de proyectos.',
        ],
        content5: '<strong>Nota:</strong> <br> Este proyecto fue desarrollado dentro de un entorno empresarial; se presenta únicamente de forma conceptual sin mostrar código ni detalles privados.',
      },
      en: {
        title: 'Main Features',
        content: '<strong>Objective:</strong><br>Reduce manual tasks, improve traceability, and centralize administrative operations related to users, permissions, and projects.<br><br><strong>My role:</strong>',
        items: [
          'Frontend development in React for massive visualization interfaces.',
          'Backend implementation in Flask to orchestrate REST API operations.',
          'OAuth authentication management (2-legged and 3-legged).',
          'Development of Python scripts for bulk operations.',
          'Technical documentation and flows in Postman for internal team use.',
        ],
        content2: '<strong>Stack and APIs:</strong>',
        items2: [
          'React (frontend)',
          'Flask (backend)',
          'Python (automation scripts)',
          'Enterprise platform REST APIs',
          'OAuth 2.0 / access tokens',
        ],
        content3: '<strong>Main features:</strong>',
        items3: [
          'Massive permission visualization by project.',
          'Export project lists',
          'Massive user assignment to projects',
          'Permission comparison between projects',
        ],
        content4: '<strong>Impact:</strong>',
        items4: [
          'Manual processes reduced from hours to minutes.',
          'Greater consistency in user and permission management.',
          'Better traceability in document management and project administration.',
        ],
        content5: '<strong>Note:</strong> <br> This project was developed within an enterprise environment; it is presented only in a conceptual form without showing code or private details.',
      },
    },
  },

  'Portafolio-V3': {
    title: {
      es: 'Portafolio profesional full stack',
      en: 'Professional full stack portfolio',
    },
    description: {
      es: 'Sitio web bilingüe con blog, SEO optimizado y despliegue en Vercel. Construido con Next.js, React y Tailwind CSS.',
      en: 'Bilingual website with blog, optimized SEO, and Vercel deployment. Built with Next.js, React, and Tailwind CSS.',
    },
    image: '/images/projects/portfolio.svg',
    caseStudy: {
      es: {
        problem: 'Necesitaba una presencia web profesional que comunicara mis servicios como desarrollador y facilitara el contacto con clientes potenciales.',
        solution: 'Desarrollé este portafolio con Next.js, internacionalización (ES/EN), blog integrado, modo oscuro y metadata SEO completa.',
        result: 'Un sitio rápido, indexable en Google y orientado a convertir visitas en conversaciones comerciales.',
      },
      en: {
        problem: 'I needed a professional web presence that communicated my services as a developer and made it easy for potential clients to reach out.',
        solution: 'I built this portfolio with Next.js, internationalization (ES/EN), integrated blog, dark mode, and complete SEO metadata.',
        result: 'A fast, Google-indexable site designed to turn visits into business conversations.',
      },
    },
  },

  'OpenAI_Prueba_I': {
    title: {
      es: 'Asistente inteligente para documentos PDF',
      en: 'Smart assistant for PDF documents',
    },
    description: {
      es: 'Chatbot con procesamiento de lenguaje natural que interpreta y responde preguntas sobre documentos PDF usando la API de OpenAI.',
      en: 'NLP chatbot that interprets and answers questions about PDF documents using the OpenAI API.',
    },
    image: '/images/projects/chatbot.svg',
    caseStudy: {
      es: {
        problem: 'Consultar información dentro de documentos PDF largos es lento y poco eficiente cuando se necesitan respuestas concretas.',
        solution: 'Implementé un backend en Flask con Python que extrae contenido de PDFs y usa la API de OpenAI para responder en lenguaje natural.',
        result: 'Un prototipo funcional que demuestra integración de IA con documentos y APIs de terceros.',
      },
      en: {
        problem: 'Finding specific information in long PDF documents is slow and inefficient when you need direct answers.',
        solution: 'I implemented a Flask backend in Python that extracts PDF content and uses the OpenAI API to respond in natural language.',
        result: 'A working prototype demonstrating AI integration with documents and third-party APIs.',
      },
    },
  },

  'proyecto_redes': {
    title: {
      es: 'Sistema de monitoreo de redes',
      en: 'Network monitoring system',
    },
    description: {
      es: 'Aplicación web universitaria para gestionar y monitorear infraestructura de redes y telecomunicaciones con Django.',
      en: 'University web application to manage and monitor network and telecommunications infrastructure with Django.',
    },
    image: '/images/projects/django.svg',
    caseStudy: {
      es: {
        problem: 'Era necesario un sistema centralizado para registrar, consultar y monitorear elementos de una red de telecomunicaciones.',
        solution: 'Construí una aplicación web con Django que modela la infraestructura de red y expone interfaces para consulta y administración.',
        result: 'Proyecto académico que consolidó conocimientos en backend, bases de datos y arquitectura web.',
      },
      en: {
        problem: 'A centralized system was needed to register, query, and monitor elements of a telecommunications network.',
        solution: 'I built a Django web application that models network infrastructure and exposes interfaces for querying and administration.',
        result: 'An academic project that consolidated backend, database, and web architecture skills.',
      },
    },
  },

  'CADHUBEV': {
    title: {
      es: 'Sitio web institucional',
      en: 'Institutional website',
    },
    description: {
      es: 'Página web para el colectivo CADHUBEV con información, recursos y presencia digital accesible.',
      en: 'Website for the CADHUBEV collective with information, resources, and accessible digital presence.',
    },
    image: '/images/projects/web.svg',
    caseStudy: {
      es: {
        problem: 'El colectivo CADHUBEV necesitaba una presencia en línea para compartir su trabajo y conectar con su comunidad.',
        solution: 'Desarrollé un sitio web con HTML, CSS y JavaScript enfocado en claridad, accesibilidad y diseño responsive.',
        result: 'Un sitio funcional que refuerza la identidad del colectivo y facilita el acceso a su información pública.',
      },
      en: {
        problem: 'The CADHUBEV collective needed an online presence to share their work and connect with their community.',
        solution: 'I developed a website with HTML, CSS, and JavaScript focused on clarity, accessibility, and responsive design.',
        result: 'A functional site that strengthens the collective\'s identity and makes public information easy to access.',
      },
    },
  },

  'Gestion_Biblioteca': {
    title: {
      es: 'Sistema de gestión para bibliotecas',
      en: 'Library management system',
    },
    description: {
      es: 'Aplicación web para administrar catálogo, préstamos y usuarios de una biblioteca de forma centralizada.',
      en: 'Web application to centrally manage library catalog, loans, and users.',
    },
    image: '/images/projects/library.svg',
    caseStudy: {
      es: {
        problem: 'Gestionar préstamos, inventario y usuarios de una biblioteca con procesos manuales genera errores y retrasa las operaciones diarias.',
        solution: 'Desarrollé un sistema web que centraliza el catálogo, el registro de préstamos y la administración de usuarios.',
        result: 'Una herramienta que automatiza tareas repetitivas y mejora la trazabilidad de los recursos bibliográficos.',
      },
      en: {
        problem: 'Managing library loans, inventory, and users with manual processes causes errors and slows daily operations.',
        solution: 'I built a web system that centralizes the catalog, loan tracking, and user administration.',
        result: 'A tool that automates repetitive tasks and improves traceability of bibliographic resources.',
      },
    },
  },

  'Hercules-Fichas_Tecnicas': {
    title: {
      es: 'Plataforma de fichas técnicas industriales',
      en: 'Industrial technical datasheet platform',
    },
    description: {
      es: 'Plataforma web privada para crear, consultar y organizar fichas técnicas industriales. Frontend en Vue, backend en Django y despliegue con Node.js.',
      en: 'Private web platform to create, query, and organize industrial technical datasheets. Vue frontend, Django backend, and Node.js deployment.',
    },
    image: '/images/projects/technical.svg',
    caseStudy: {
      es: {
        problem: 'Las fichas técnicas industriales dispersas en distintos formatos dificultan la consulta y el mantenimiento de la información de productos.',
        solution: 'Implementé una plataforma web con Vue y Django que estandariza la estructura de fichas técnicas y facilita su búsqueda y actualización.',
        result: 'Información técnica centralizada y accesible para equipos que necesitan consultar especificaciones de productos.',
      },
      en: {
        problem: 'Industrial datasheets scattered across different formats make it hard to query and maintain product information.',
        solution: 'I built a web platform with Vue and Django that standardizes datasheet structure and makes search and updates easier.',
        result: 'Centralized, accessible technical information for teams that need to consult product specifications.',
      },
    },
    additionalInfo: {
      es: {
        title: 'Características Principales',
        content: '<strong>Objetivo:</strong><br>Centralizar, estandarizar y facilitar la consulta de fichas técnicas industriales en un entorno web seguro.<br><br><strong>Mi rol:</strong>',
        items: [
          'Desarrollo frontend en Vue para interfaces de consulta y gestión de fichas.',
          'Implementación backend en Django para la lógica de negocio y APIs REST.',
          'Configuración y despliegue del entorno con Node.js.',
          'Modelado de datos para productos, especificaciones y categorías técnicas.',
        ],
        content2: '<strong>Stack:</strong>',
        items2: [
          'Vue (frontend)',
          'Django (backend)',
          'Node.js (despliegue)',
          'APIs REST',
        ],
        content3: '<strong>Características principales:</strong>',
        items3: [
          'Creación y edición de fichas técnicas estructuradas.',
          'Búsqueda y filtrado por producto, categoría o especificación.',
          'Organización centralizada de documentación técnica industrial.',
        ],
        content4: '<strong>Impacto:</strong>',
        items4: [
          'Información técnica unificada y más fácil de mantener.',
          'Consulta más rápida de especificaciones para equipos internos.',
          'Reducción de dependencia de archivos dispersos en distintos formatos.',
        ],
        content5: '<strong>Nota:</strong> <br> Este proyecto fue desarrollado en un entorno privado; se presenta únicamente de forma conceptual sin mostrar código, capturas ni detalles confidenciales.',
      },
      en: {
        title: 'Main Features',
        content: '<strong>Objective:</strong><br>Centralize, standardize, and simplify access to industrial technical datasheets in a secure web environment.<br><br><strong>My role:</strong>',
        items: [
          'Vue frontend development for datasheet management and query interfaces.',
          'Django backend implementation for business logic and REST APIs.',
          'Environment setup and deployment with Node.js.',
          'Data modeling for products, specifications, and technical categories.',
        ],
        content2: '<strong>Stack:</strong>',
        items2: [
          'Vue (frontend)',
          'Django (backend)',
          'Node.js (deployment)',
          'REST APIs',
        ],
        content3: '<strong>Main features:</strong>',
        items3: [
          'Creation and editing of structured technical datasheets.',
          'Search and filtering by product, category, or specification.',
          'Centralized organization of industrial technical documentation.',
        ],
        content4: '<strong>Impact:</strong>',
        items4: [
          'Unified technical information that is easier to maintain.',
          'Faster specification lookup for internal teams.',
          'Reduced reliance on scattered files in different formats.',
        ],
        content5: '<strong>Note:</strong> <br> This project was developed in a private environment; it is presented only in a conceptual form without showing code, screenshots, or confidential details.',
      },
    },
  },

  'HUD-PokeCompanion': {
    title: {
      es: 'Companion web interactivo para entrenadores',
      en: 'Interactive web companion for trainers',
    },
    description: {
      es: 'Aplicación web interactiva inspirada en Pokémon con interfaz dinámica y experiencia de usuario inmersiva.',
      en: 'Interactive web application inspired by Pokémon with a dynamic interface and immersive user experience.',
    },
    image: '/images/projects/companion.svg',
    caseStudy: {
      es: {
        problem: 'Se buscaba una experiencia web interactiva que combinara datos de juego con una interfaz atractiva y fácil de usar.',
        solution: 'Desarrollé un companion web con componentes interactivos, diseño responsive y lógica de frontend para consultar información en tiempo real.',
        result: 'Un proyecto que demuestra habilidades en UI interactiva, consumo de APIs y experiencia de usuario.',
      },
      en: {
        problem: 'The goal was an interactive web experience combining game data with an attractive, easy-to-use interface.',
        solution: 'I built a web companion with interactive components, responsive design, and frontend logic for real-time information lookup.',
        result: 'A project showcasing interactive UI, API consumption, and user experience skills.',
      },
    },
  },
};

function resolveLocaleField(field, locale) {
  if (!field) return null;
  if (field[locale]) return field[locale];
  const fallbackLocale = locale === 'es' ? 'en' : 'es';
  return field[fallbackLocale] || null;
}

/**
 * Obtiene la traducción del título de un proyecto
 */
export function getProjectTitle(repoName, locale, fallbackTitle = '') {
  if (!repoName || !projectTranslations[repoName]?.title) {
    return fallbackTitle || '';
  }
  return resolveLocaleField(projectTranslations[repoName].title, locale) || fallbackTitle || '';
}

/**
 * Obtiene la traducción de la descripción de un proyecto
 */
export function getProjectDescription(repoName, locale, fallbackDescription = '') {
  if (!repoName || !projectTranslations[repoName]?.description) {
    return fallbackDescription || '';
  }
  return resolveLocaleField(projectTranslations[repoName].description, locale) || fallbackDescription || '';
}

/**
 * Obtiene la imagen de preview de un proyecto
 */
export function getProjectImage(repoName, fallbackImage = null) {
  if (!repoName || !projectTranslations[repoName]?.image) {
    return fallbackImage || DEFAULT_PROJECT_IMAGE;
  }
  return projectTranslations[repoName].image;
}

/**
 * Obtiene el case study (problema, solución, resultado) de un proyecto
 */
export function getProjectCaseStudy(repoName, locale) {
  if (!repoName || !projectTranslations[repoName]?.caseStudy) {
    return null;
  }
  return resolveLocaleField(projectTranslations[repoName].caseStudy, locale);
}

/**
 * Obtiene la traducción de la información adicional de un proyecto
 */
export function getProjectAdditionalInfo(repoName, locale, fallbackAdditionalInfo = null) {
  if (!repoName || !projectTranslations[repoName]?.additionalInfo) {
    return fallbackAdditionalInfo;
  }
  return resolveLocaleField(projectTranslations[repoName].additionalInfo, locale) || fallbackAdditionalInfo;
}

/**
 * Verifica si existe una traducción para un repositorio
 */
export function hasProjectTranslation(repoName) {
  return !!projectTranslations[repoName];
}

export default projectTranslations;
