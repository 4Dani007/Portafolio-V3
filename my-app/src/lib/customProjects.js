const customProjects = [

    {
        id: 'custom-1',
        name: 'custom-1',
        description: 'Conjunto de herramientas que aprovechan el API de Autodesk para la gestion de proyectos BIM360 y Autodesk Construction Cloud',
        language: 'Python, React, Flask',
        updatedAt: '2024-01-15T00:00:00Z',
        order: 1,
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

