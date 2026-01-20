/**
 * Blog Posts Data
 * 
 * Estructura de datos para los posts del blog
 * Cada post puede tener contenido en múltiples idiomas
 */

const blogPosts = [
  {
    id: '1',
    slug: 'introduccion-bim-autodesk',
    title: {
      es: 'Introducción a BIM y Autodesk APIs',
      en: 'Introduction to BIM and Autodesk APIs'
    },
    excerpt: {
      es: 'Una introducción completa a las metodologías BIM y cómo las APIs de Autodesk pueden ayudar a automatizar procesos en proyectos de construcción.',
      en: 'A complete introduction to BIM methodologies and how Autodesk APIs can help automate processes in construction projects.'
    },
    content: {
      es: `
        <h2>¿Qué es BIM?</h2>
        <p>Building Information Modeling (BIM) es una metodología de trabajo colaborativa para la creación y gestión de proyectos de construcción.</p>
        
        <h3>Ventajas del BIM</h3>
        <ul>
          <li>Mejora la colaboración entre equipos</li>
          <li>Reduce errores y conflictos</li>
          <li>Optimiza el tiempo y costos del proyecto</li>
          <li>Facilita la gestión del ciclo de vida del edificio</li>
        </ul>
        
        <h3>APIs de Autodesk</h3>
        <p>Las APIs de Autodesk permiten automatizar tareas repetitivas y crear herramientas personalizadas para mejorar los flujos de trabajo BIM.</p>
      `,
      en: `
        <h2>What is BIM?</h2>
        <p>Building Information Modeling (BIM) is a collaborative work methodology for the creation and management of construction projects.</p>
        
        <h3>BIM Advantages</h3>
        <ul>
          <li>Improves collaboration between teams</li>
          <li>Reduces errors and conflicts</li>
          <li>Optimizes project time and costs</li>
          <li>Facilitates building lifecycle management</li>
        </ul>
        
        <h3>Autodesk APIs</h3>
        <p>Autodesk APIs allow automating repetitive tasks and creating custom tools to improve BIM workflows.</p>
      `
    },
    author: 'Daniel Bonilla Mosquera',
    publishedAt: '2025-01-15',
    updatedAt: '2025-01-15',
    tags: ['BIM', 'Autodesk', 'APIs'],
    category: {
      es: 'Tutoriales',
      en: 'Tutorials'
    },
    image: '/images/sketch-draw.png',
    readingTime: {
      es: '5 min',
      en: '5 min'
    }
  },
  {
    id: '2',
    slug: 'automatizacion-revit-api',
    title: {
      es: 'Automatización con Revit API',
      en: 'Automation with Revit API'
    },
    excerpt: {
      es: 'Aprende cómo usar la Revit API para automatizar tareas comunes en proyectos BIM y mejorar la productividad.',
      en: 'Learn how to use the Revit API to automate common tasks in BIM projects and improve productivity.'
    },
    content: {
      es: `
        <h2>Introducción a Revit API</h2>
        <p>La Revit API permite crear complementos y scripts que extienden las capacidades de Autodesk Revit.</p>
        
        <h3>Casos de Uso Comunes</h3>
        <ul>
          <li>Generación automática de planos</li>
          <li>Validación de modelos BIM</li>
          <li>Exportación de datos a formatos personalizados</li>
          <li>Automatización de anotaciones y etiquetas</li>
        </ul>
        
        <h3>Empezando con Revit API</h3>
        <p>Para comenzar, necesitas instalar Visual Studio y el SDK de Revit. Luego puedes crear tu primer complemento.</p>
      `,
      en: `
        <h2>Introduction to Revit API</h2>
        <p>The Revit API allows creating add-ins and scripts that extend Autodesk Revit capabilities.</p>
        
        <h3>Common Use Cases</h3>
        <ul>
          <li>Automatic drawing generation</li>
          <li>BIM model validation</li>
          <li>Data export to custom formats</li>
          <li>Annotation and tag automation</li>
        </ul>
        
        <h3>Getting Started with Revit API</h3>
        <p>To get started, you need to install Visual Studio and the Revit SDK. Then you can create your first add-in.</p>
      `
    },
    author: 'Daniel Bonilla Mosquera',
    publishedAt: '2025-01-10',
    updatedAt: '2025-01-10',
    tags: ['Revit', 'API', 'Automatización'],
    category: {
      es: 'Tutoriales',
      en: 'Tutorials'
    },
    image: '/images/sketch-draw-white.webp',
    readingTime: {
      es: '7 min',
      en: '7 min'
    }
  },
  {
    id: '3',
    slug: 'forge-platform-services',
    title: {
      es: 'Autodesk Platform Services (Forge)',
      en: 'Autodesk Platform Services (Forge)'
    },
    excerpt: {
      es: 'Explorando las capacidades de Autodesk Platform Services para crear aplicaciones web que interactúan con modelos BIM.',
      en: 'Exploring Autodesk Platform Services capabilities to create web applications that interact with BIM models.'
    },
    content: {
      es: `
        <h2>¿Qué es Autodesk Platform Services?</h2>
        <p>Anteriormente conocido como Forge, APS es una plataforma en la nube que proporciona APIs para trabajar con datos de diseño.</p>
        
        <h3>Servicios Principales</h3>
        <ul>
          <li><strong>Model Derivative API:</strong> Conversión y visualización de modelos</li>
          <li><strong>Data Management API:</strong> Gestión de archivos y proyectos</li>
          <li><strong>Design Automation API:</strong> Automatización de tareas de diseño</li>
          <li><strong>Webhooks:</strong> Notificaciones de eventos</li>
        </ul>
        
        <h3>Casos de Uso</h3>
        <p>APS es ideal para crear dashboards, visualizadores web, y herramientas de colaboración que funcionan con modelos BIM en la nube.</p>
      `,
      en: `
        <h2>What is Autodesk Platform Services?</h2>
        <p>Previously known as Forge, APS is a cloud platform that provides APIs to work with design data.</p>
        
        <h3>Main Services</h3>
        <ul>
          <li><strong>Model Derivative API:</strong> Model conversion and visualization</li>
          <li><strong>Data Management API:</strong> File and project management</li>
          <li><strong>Design Automation API:</strong> Design task automation</li>
          <li><strong>Webhooks:</strong> Event notifications</li>
        </ul>
        
        <h3>Use Cases</h3>
        <p>APS is ideal for creating dashboards, web viewers, and collaboration tools that work with BIM models in the cloud.</p>
      `
    },
    author: 'Daniel Bonilla Mosquera',
    publishedAt: '2025-01-05',
    updatedAt: '2025-01-05',
    tags: ['Forge', 'APS', 'Cloud'],
    category: {
      es: 'Tecnología',
      en: 'Technology'
    },
    image: '/images/sketch-draw.png',
    readingTime: {
      es: '6 min',
      en: '6 min'
    }
  }
];

/**
 * Obtiene todos los posts del blog
 * @param {string} locale - Idioma ('es' o 'en')
 * @returns {Array} Array de posts formateados
 */
export function getAllBlogPosts(locale = 'es') {
  return blogPosts.map(post => ({
    ...post,
    title: post.title[locale] || post.title.es,
    excerpt: post.excerpt[locale] || post.excerpt.es,
    category: post.category[locale] || post.category.es,
    readingTime: post.readingTime[locale] || post.readingTime.es,
  })).sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
}

/**
 * Obtiene un post por slug
 * @param {string} slug - Slug del post
 * @param {string} locale - Idioma ('es' o 'en')
 * @returns {Object|null} Post o null si no existe
 */
export function getBlogPostBySlug(slug, locale = 'es') {
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) return null;

  return {
    ...post,
    title: post.title[locale] || post.title.es,
    excerpt: post.excerpt[locale] || post.excerpt.es,
    content: post.content[locale] || post.content.es,
    category: post.category[locale] || post.category.es,
    readingTime: post.readingTime[locale] || post.readingTime.es,
  };
}

/**
 * Obtiene posts por categoría
 * @param {string} category - Categoría del post
 * @param {string} locale - Idioma ('es' o 'en')
 * @returns {Array} Array de posts filtrados
 */
export function getBlogPostsByCategory(category, locale = 'es') {
  return getAllBlogPosts(locale).filter(post => 
    post.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Obtiene todas las categorías disponibles
 * @param {string} locale - Idioma ('es' o 'en')
 * @returns {Array} Array de categorías únicas
 */
export function getAllCategories(locale = 'es') {
  const categories = blogPosts.map(post => 
    post.category[locale] || post.category.es
  );
  return [...new Set(categories)];
}

export default blogPosts;
