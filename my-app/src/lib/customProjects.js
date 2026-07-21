const customProjects = [
    {
        id: 'custom-1',
        name: 'custom-1',
        description: 'Suite de herramientas full stack para automatizar operaciones administrativas mediante integraciones con APIs empresariales',
        language: 'Python • React • Flask • REST APIs',
        image: '/images/projects/enterprise.svg',
        updatedAt: '2025-11-21T00:00:00Z',
        order: 3,
        isCustom: true,
    },
    {
        id: 'hercules-fichas',
        name: 'Hercules-Fichas_Tecnicas',
        description: 'Plataforma web privada para crear, consultar y organizar fichas técnicas industriales con Vue, Django y despliegue en Node.js',
        language: 'Vue • Django • Node.js',
        image: '/images/projects/technical.svg',
        updatedAt: '2025-10-15T00:00:00Z',
        order: 4,
        isCustom: true,
        isPrivate: true,
    },
];

/**
 * Obtiene todos los proyectos personalizados
 * 
 * @returns {Array} Array de proyectos personalizados
 */
export function getCustomProjects() {
  return customProjects;
}

/**
 * Obtiene un proyecto personalizado por ID
 * 
 * @param {string} id - ID del proyecto
 * @returns {Object|null} Proyecto personalizado o null si no existe
 */
export function getCustomProjectById(id) {
  return customProjects.find(project => project.id === id) || null;
}

/**
 * Nombres de repos que se gestionan como proyectos custom (evita duplicados desde GitHub)
 */
export function getCustomProjectNames() {
  return new Set(customProjects.map((project) => project.name));
}

export default customProjects;

