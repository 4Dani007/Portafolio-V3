const projectOrder = {
  'Portafolio-V3': 2,
  'OpenAI_Prueba_I': 3,
  'proyecto_redes': 4,
  'CADHUBEV': 5,
};

/**
 * Obtiene el orden de un proyecto por su nombre
 * 
 * @param {string} repoName - Nombre del repositorio
 * @returns {number|undefined} Orden del proyecto o undefined si no está definido
 */
export function getProjectOrder(repoName) {
  return projectOrder[repoName];
}

/**
 * Verifica si un proyecto tiene orden definido
 * 
 * @param {string} repoName - Nombre del repositorio
 * @returns {boolean} True si tiene orden definido
 */
export function hasProjectOrder(repoName) {
  return projectOrder[repoName] !== undefined;
}

export default projectOrder;

