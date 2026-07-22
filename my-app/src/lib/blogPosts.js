/**
 * Blog Posts Data
 *
 * Estructura de datos para los posts del blog
 * Cada post puede tener contenido en múltiples idiomas
 */

const blogPosts = [
  {
    id: '1',
    slug: 'automatizar-procesos-python-flask',
    title: {
      es: 'Cómo automatizar procesos empresariales con Python y Flask',
      en: 'How to automate business processes with Python and Flask',
    },
    excerpt: {
      es: 'Guía práctica para reducir tareas manuales con scripts, APIs REST y un backend en Flask orientado a operaciones reales de negocio.',
      en: 'A practical guide to reducing manual tasks with scripts, REST APIs, and a Flask backend focused on real business operations.',
    },
    content: {
      es: `
        <h2>El problema: horas perdidas en tareas repetitivas</h2>
        <p>En muchas empresas, equipos administrativos dedican horas a consultar plataformas, exportar listas, comparar permisos o asignar usuarios uno por uno. No es un problema de falta de herramientas, sino de <strong>procesos que no están conectados</strong>.</p>
        <p>La automatización web no busca reemplazar personas, sino liberar tiempo para decisiones que sí requieren criterio humano.</p>

        <h2>Enfoque: backend ligero + integraciones</h2>
        <p>Un patrón que funciona bien es combinar:</p>
        <ul>
          <li><strong>Python + Flask</strong> para orquestar lógica de negocio y llamadas a APIs.</li>
          <li><strong>Scripts puntuales</strong> para operaciones masivas (importaciones, validaciones, reportes).</li>
          <li><strong>Frontend en React</strong> cuando el equipo necesita visualizar y ejecutar acciones desde una interfaz.</li>
        </ul>
        <p>Flask es ideal cuando necesitas iterar rápido, integrar OAuth y exponer endpoints internos sin la complejidad de un framework más pesado.</p>

        <h2>Arquitectura básica</h2>
        <pre><code>React UI → Flask API → REST externa / scripts Python
                ↓
           Logs + validaciones</code></pre>
        <p>La clave está en centralizar reglas: quién puede hacer qué, qué datos se sincronizan y cómo se registran los cambios.</p>

        <h2>Patrones que más valor aportan</h2>
        <h3>1. Operaciones masivas</h3>
        <p>Asignar usuarios, exportar proyectos o comparar permisos en lote reduce errores y tiempo. Un endpoint que reciba una lista y valide antes de ejecutar evita inconsistencias.</p>

        <h3>2. Autenticación OAuth</h3>
        <p>Integraciones empresariales suelen requerir flujos 2-legged o 3-legged. Documentar tokens, expiración y scopes desde el inicio ahorra incidentes en producción.</p>

        <h3>3. Trazabilidad</h3>
        <p>Cada acción masiva debería dejar registro: qué se ejecutó, cuándo y con qué resultado. Eso facilita auditoría y soporte.</p>

        <h2>Errores comunes</h2>
        <ul>
          <li>Automatizar sin entender el proceso manual primero.</li>
          <li>No manejar rate limits de APIs externas.</li>
          <li>Mezclar lógica de negocio con código de integración sin capas claras.</li>
          <li>Ignorar permisos: automatizar no significa saltarse controles.</li>
        </ul>

        <h2>Resultado esperado</h2>
        <p>En proyectos reales, el objetivo no es “usar Python”, sino pasar de procesos de horas a minutos, con mayor consistencia. Ese es el mensaje que un cliente entiende y valora.</p>

        <h2>Conclusión</h2>
        <p>Flask + Python es una base sólida para automatizaciones empresariales cuando el problema es conectar sistemas y reducir fricción operativa. Si tu negocio repite las mismas tareas cada semana, probablemente hay espacio para un sistema a medida.</p>
      `,
      en: `
        <h2>The problem: hours lost on repetitive tasks</h2>
        <p>In many companies, administrative teams spend hours querying platforms, exporting lists, comparing permissions, or assigning users one by one. The issue is usually not missing tools, but <strong>disconnected processes</strong>.</p>
        <p>Web automation is not about replacing people — it is about freeing time for decisions that actually need human judgment.</p>

        <h2>Approach: lightweight backend + integrations</h2>
        <p>A pattern that works well combines:</p>
        <ul>
          <li><strong>Python + Flask</strong> to orchestrate business logic and API calls.</li>
          <li><strong>Targeted scripts</strong> for bulk operations (imports, validations, reports).</li>
          <li><strong>React frontend</strong> when teams need to visualize and trigger actions from an interface.</li>
        </ul>
        <p>Flask is ideal when you need to iterate quickly, integrate OAuth, and expose internal endpoints without the overhead of a heavier framework.</p>

        <h2>Basic architecture</h2>
        <pre><code>React UI → Flask API → external REST / Python scripts
                ↓
           logs + validations</code></pre>
        <p>The key is centralizing rules: who can do what, which data syncs, and how changes are recorded.</p>

        <h2>High-impact patterns</h2>
        <h3>1. Bulk operations</h3>
        <p>Assigning users, exporting projects, or comparing permissions in batch reduces errors and time. An endpoint that validates a list before execution prevents inconsistencies.</p>

        <h3>2. OAuth authentication</h3>
        <p>Enterprise integrations often require 2-legged or 3-legged flows. Documenting tokens, expiration, and scopes early prevents production incidents.</p>

        <h3>3. Traceability</h3>
        <p>Every bulk action should leave a trail: what ran, when, and with what outcome. That makes auditing and support much easier.</p>

        <h2>Common mistakes</h2>
        <ul>
          <li>Automating before understanding the manual process.</li>
          <li>Not handling external API rate limits.</li>
          <li>Mixing business logic with integration code without clear layers.</li>
          <li>Ignoring permissions — automation must not bypass controls.</li>
        </ul>

        <h2>Expected outcome</h2>
        <p>In real projects, the goal is not “using Python” but moving from hours to minutes with better consistency. That is what clients understand and value.</p>

        <h2>Conclusion</h2>
        <p>Flask + Python is a solid base for enterprise automation when the problem is connecting systems and reducing operational friction. If your business repeats the same tasks every week, there is likely room for a custom system.</p>
      `,
    },
    author: 'Daniel Bonilla Mosquera',
    publishedAt: '2026-06-10',
    updatedAt: '2026-06-10',
    tags: ['Python', 'Flask', 'Automatización', 'APIs'],
    category: {
      es: 'Automatización',
      en: 'Automation',
    },
    image: '/images/projects/enterprise.svg',
    readingTime: {
      es: '6 min',
      en: '6 min',
    },
  },
  {
    id: '2',
    slug: 'integrar-apis-react-nextjs',
    title: {
      es: 'Integrar APIs de terceros en React y Next.js',
      en: 'Integrating third-party APIs in React and Next.js',
    },
    excerpt: {
      es: 'Buenas prácticas para conectar servicios externos en aplicaciones modernas: variables de entorno, rutas API, errores y seguridad.',
      en: 'Best practices for connecting external services in modern apps: environment variables, API routes, errors, and security.',
    },
    content: {
      es: `
        <h2>Por qué importan las integraciones bien hechas</h2>
        <p>Portafolios, dashboards y sistemas internos suelen depender de datos externos: GitHub, plataformas de pago, CRMs, servicios de email o APIs empresariales. La diferencia entre una integración frágil y una robusta está en el diseño, no solo en el código.</p>

        <h2>Separar secretos del cliente</h2>
        <p>Regla de oro: <strong>tokens privados nunca en el frontend</strong>. En Next.js, usa variables <code>process.env</code> en el servidor y rutas bajo <code>/api</code> cuando el token no debe exponerse.</p>
        <ul>
          <li><code>NEXT_PUBLIC_*</code> → visible en el navegador (URLs públicas, IDs de analytics).</li>
          <li>Variables sin prefijo → solo servidor (tokens, claves secretas).</li>
        </ul>

        <h2>Flujo recomendado en Next.js</h2>
        <pre><code>Componente React → fetch('/api/service') → route handler → API externa</code></pre>
        <p>Así controlas formato de respuesta, cache, límites y mensajes de error sin filtrar detalles internos al usuario.</p>

        <h2>Manejo de errores orientado al usuario</h2>
        <p>No basta con <code>console.error</code>. Define estados claros:</p>
        <ul>
          <li>Cargando (skeleton o spinner).</li>
          <li>Sin datos / servicio no configurado.</li>
          <li>Error recuperable con reintento.</li>
        </ul>
        <p>En un portafolio, por ejemplo, si GitHub falla aún puedes mostrar proyectos custom sin romper la página.</p>

        <h2>Cache y rendimiento</h2>
        <p>Next.js permite <code>revalidate</code> en fetch del servidor para no golpear la API en cada visita. Para datos que cambian poco (repos, métricas), cache de minutos u horas suele ser suficiente.</p>

        <h2>Checklist antes de producción</h2>
        <ul>
          <li>Variables configuradas en Vercel (Production, Preview, Development).</li>
          <li>Rate limits documentados y manejados.</li>
          <li>Respuestas de error sin filtrar stack traces al cliente.</li>
          <li>Timeouts razonables en fetch.</li>
          <li>Logs en servidor para depuración.</li>
        </ul>

        <h2>Conclusión</h2>
        <p>Integrar APIs no es solo “hacer fetch”. Es diseñar una capa intermedia que proteja credenciales, mejore UX y haga el sistema mantenible. Ese enfoque es lo que escala cuando el proyecto crece.</p>
      `,
      en: `
        <h2>Why well-built integrations matter</h2>
        <p>Portfolios, dashboards, and internal systems often rely on external data: GitHub, payment platforms, CRMs, email services, or enterprise APIs. The gap between a fragile integration and a robust one is design, not just code.</p>

        <h2>Keep secrets out of the client</h2>
        <p>Golden rule: <strong>private tokens never belong in the frontend</strong>. In Next.js, use <code>process.env</code> on the server and <code>/api</code> routes when the token must stay hidden.</p>
        <ul>
          <li><code>NEXT_PUBLIC_*</code> → visible in the browser (public URLs, analytics IDs).</li>
          <li>Variables without the prefix → server only (tokens, secret keys).</li>
        </ul>

        <h2>Recommended flow in Next.js</h2>
        <pre><code>React component → fetch('/api/service') → route handler → external API</code></pre>
        <p>This lets you control response shape, caching, limits, and error messages without leaking internal details to users.</p>

        <h2>User-facing error handling</h2>
        <p><code>console.error</code> alone is not enough. Define clear states:</p>
        <ul>
          <li>Loading (skeleton or spinner).</li>
          <li>No data / service not configured.</li>
          <li>Recoverable error with retry.</li>
        </ul>
        <p>On a portfolio, if GitHub fails you can still show custom projects without breaking the page.</p>

        <h2>Cache and performance</h2>
        <p>Next.js supports <code>revalidate</code> on server fetch to avoid hitting the API on every visit. For slow-changing data (repos, metrics), caching for minutes or hours is usually enough.</p>

        <h2>Pre-production checklist</h2>
        <ul>
          <li>Variables set in Vercel (Production, Preview, Development).</li>
          <li>Documented and handled rate limits.</li>
          <li>Error responses without stack traces exposed to clients.</li>
          <li>Reasonable fetch timeouts.</li>
          <li>Server logs for debugging.</li>
        </ul>

        <h2>Conclusion</h2>
        <p>API integration is not just “calling fetch”. It is designing a middle layer that protects credentials, improves UX, and keeps the system maintainable. That approach scales as the product grows.</p>
      `,
    },
    author: 'Daniel Bonilla Mosquera',
    publishedAt: '2026-06-28',
    updatedAt: '2026-06-28',
    tags: ['React', 'Next.js', 'APIs', 'Full Stack'],
    category: {
      es: 'Desarrollo Web',
      en: 'Web Development',
    },
    image: '/images/projects/chatbot.svg',
    readingTime: {
      es: '5 min',
      en: '5 min',
    },
  },
  {
    id: '3',
    slug: 'panel-administrativo-lecciones',
    title: {
      es: 'Lecciones al construir un panel administrativo a medida',
      en: 'Lessons from building a custom admin dashboard',
    },
    excerpt: {
      es: 'Qué aprendí diseñando dashboards para clientes: priorizar operaciones, tablas accionables y métricas que importan al negocio.',
      en: 'What I learned designing dashboards for clients: prioritize operations, actionable tables, and metrics that matter to the business.',
    },
    content: {
      es: `
        <h2>Un dashboard no es solo gráficas bonitas</h2>
        <p>Muchos proyectos empiezan pidiendo “un panel con estadísticas”, pero el valor real aparece cuando el sistema <strong>permite actuar</strong>: aprobar, filtrar, exportar, asignar, comparar. Un dashboard útil responde: ¿qué debo hacer ahora?</p>

        <h2>Empezar por el flujo operativo</h2>
        <p>Antes de diseñar componentes, mapa el proceso manual:</p>
        <ol>
          <li>¿Quién usa el panel?</li>
          <li>¿Qué decisión toma con la información?</li>
          <li>¿Qué acciones repetitivas puede automatizar?</li>
        </ol>
        <p>Ese orden evita pantallas que se ven bien en demo pero no se usan en el día a día.</p>

        <h2>Componentes que más se repiten</h2>
        <ul>
          <li><strong>KPIs arriba:</strong> 3–5 números clave, no veinte.</li>
          <li><strong>Tablas con filtros:</strong> usuarios, proyectos, permisos, pedidos.</li>
          <li><strong>Acciones masivas:</strong> seleccionar varios registros y aplicar cambios.</li>
          <li><strong>Estado del sistema:</strong> APIs conectadas, última sincronización, errores.</li>
        </ul>
        <p>En el hero de mi portafolio uso justamente ese patrón: métricas, actividad semanal y tabla por tabs — porque es lo que los clientes reconocen.</p>

        <h2>Stack típico</h2>
        <p>Para paneles modernos suelo combinar React o Vue en frontend, Python (Flask/Django) en backend y despliegue en Node.js o plataformas como Vercel cuando aplica. Lo importante es que cada capa tenga responsabilidades claras.</p>

        <h2>UX para usuarios no técnicos</h2>
        <ul>
          <li>Etiquetas en lenguaje de negocio, no jargon técnico.</li>
          <li>Confirmación antes de acciones destructivas.</li>
          <li>Feedback inmediato (toast, badges de estado).</li>
          <li>Modo claro/oscuro si el panel se usa muchas horas al día.</li>
        </ul>

        <h2>Proyectos privados y confidencialidad</h2>
        <p>Algunos paneles no pueden mostrarse públicamente por datos sensibles. En esos casos presento el proyecto de forma conceptual: problema, solución, impacto y stack — sin capturas ni código privado. Eso sigue siendo una prueba sólida de experiencia.</p>

        <h2>Conclusión</h2>
        <p>Un panel administrativo exitoso reduce fricción operativa y da visibilidad. Si tu empresa vive en hojas de cálculo y correos para coordinar tareas, probablemente necesitas algo a medida — no otro reporte estático.</p>
      `,
      en: `
        <h2>A dashboard is not just pretty charts</h2>
        <p>Many projects start with “a panel with stats”, but real value shows up when the system <strong>enables action</strong>: approve, filter, export, assign, compare. A useful dashboard answers: what should I do now?</p>

        <h2>Start with the operational flow</h2>
        <p>Before designing components, map the manual process:</p>
        <ol>
          <li>Who uses the panel?</li>
          <li>What decision do they make with the data?</li>
          <li>Which repetitive actions can be automated?</li>
        </ol>
        <p>That order prevents screens that demo well but are not used day to day.</p>

        <h2>Components that repeat most often</h2>
        <ul>
          <li><strong>KPIs on top:</strong> 3–5 key numbers, not twenty.</li>
          <li><strong>Filterable tables:</strong> users, projects, permissions, orders.</li>
          <li><strong>Bulk actions:</strong> select multiple records and apply changes.</li>
          <li><strong>System status:</strong> connected APIs, last sync, errors.</li>
        </ul>
        <p>In my portfolio hero I use that exact pattern: metrics, weekly activity, and tabbed tables — because clients recognize it instantly.</p>

        <h2>Typical stack</h2>
        <p>For modern panels I usually combine React or Vue on the frontend, Python (Flask/Django) on the backend, and Node.js or platforms like Vercel for deployment when it fits. What matters is a clear separation of responsibilities.</p>

        <h2>UX for non-technical users</h2>
        <ul>
          <li>Labels in business language, not technical jargon.</li>
          <li>Confirmation before destructive actions.</li>
          <li>Immediate feedback (toasts, status badges).</li>
          <li>Light/dark mode when the panel is used for long sessions.</li>
        </ul>

        <h2>Private projects and confidentiality</h2>
        <p>Some panels cannot be shown publicly because of sensitive data. In those cases I present the project conceptually: problem, solution, impact, and stack — without private screenshots or code. That is still strong proof of experience.</p>

        <h2>Conclusion</h2>
        <p>A successful admin panel reduces operational friction and improves visibility. If your company lives in spreadsheets and email threads to coordinate work, you likely need something custom — not another static report.</p>
      `,
    },
    author: 'Daniel Bonilla Mosquera',
    publishedAt: '2026-07-12',
    updatedAt: '2026-07-12',
    tags: ['React', 'Dashboards', 'Full Stack', 'Producto'],
    category: {
      es: 'Producto',
      en: 'Product',
    },
    image: '/images/projects/portfolio.svg',
    readingTime: {
      es: '5 min',
      en: '5 min',
    },
  },
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

export default blogPosts;
