const customProjects = [

    {
        id: 'custom-1',
        name: 'custom-1',
        description: 'Suite de herramientas full stack para automatizar operaciones administrativas mediante integraciones con APIs empresariales',
        language: 'Python • React • Flask • REST APIs',
        updatedAt: '2025-11-21T00:00:00Z',
        order: 3,
        isCustom: true
    }
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

export default customProjects;

