/**
 * GitHub API Integration
 * 
 * Función para obtener repositorios de GitHub usando la REST API v3
 * Compatible con Next.js Server Components
 */

/**
 * Obtiene los repositorios de un usuario de GitHub
 * 
 * @param {string} username - Nombre de usuario de GitHub
 * @param {Object} options - Opciones de configuración
 * @param {string} options.sort - Ordenar por: 'created', 'updated', 'pushed', 'full_name' (default: 'updated')
 * @param {number} options.per_page - Número de repositorios por página (default: 6, max: 100)
 * @param {string} options.type - Tipo: 'all', 'owner', 'member' (default: 'owner')
 * @param {boolean} options.includePrivate - Incluir repositorios privados (default: false)
 * @param {boolean} options.includeArchived - Incluir repositorios archivados (default: false)
 * @param {boolean} options.includeForks - Incluir forks (default: false)
 * @returns {Promise<Array>} Array de repositorios formateados
 */
export async function getGitHubRepos(username, options = {}) {
  const {
    sort = 'updated',
    per_page = 6,
    type = 'owner',
    includePrivate = false,
    includeArchived = false,
    includeForks = false
  } = options;

  // Validar que se proporcione un username
  if (!username) {
    console.warn('GitHub username is required');
    return [];
  }

  // Configurar headers
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'Portfolio-App' // GitHub recomienda incluir User-Agent
  };

  // Agregar token de autenticación si está disponible
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers['Authorization'] = `token ${token}`;
  }

  try {
    // Construir URL con parámetros
    const params = new URLSearchParams({
      sort,
      per_page: per_page.toString(),
      type
    });

    const url = `https://api.github.com/users/${username}/repos?${params.toString()}`;

    // Realizar petición con cache de Next.js (1 hora)
    const response = await fetch(url, {
      headers,
      next: { revalidate: 3600 } // Cache por 1 hora
    });

    // Manejar errores de rate limit
    if (response.status === 403) {
      const rateLimitRemaining = response.headers.get('x-ratelimit-remaining');
      const rateLimitReset = response.headers.get('x-ratelimit-reset');
      
      console.warn('GitHub API rate limit exceeded', {
        remaining: rateLimitRemaining,
        reset: rateLimitReset ? new Date(parseInt(rateLimitReset) * 1000).toISOString() : 'unknown'
      });
      
      return [];
    }

    // Manejar otros errores HTTP
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const repos = await response.json();

    // Filtrar repositorios según las opciones
    let filteredRepos = repos;

    if (!includePrivate) {
      filteredRepos = filteredRepos.filter(repo => !repo.private);
    }

    if (!includeArchived) {
      filteredRepos = filteredRepos.filter(repo => !repo.archived);
    }

    if (!includeForks) {
      filteredRepos = filteredRepos.filter(repo => !repo.fork);
    }

    // Formatear y retornar datos
    return filteredRepos.map(repo => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description || '',
      url: repo.html_url,
      homepage: repo.homepage || null,
      language: repo.language || null,
      stars: repo.stargazers_count || 0,
      forks: repo.forks_count || 0,
      watchers: repo.watchers_count || 0,
      openIssues: repo.open_issues_count || 0,
      createdAt: repo.created_at,
      updatedAt: repo.updated_at,
      pushedAt: repo.pushed_at,
      topics: repo.topics || [],
      isPrivate: repo.private,
      isArchived: repo.archived,
      isFork: repo.fork,
      defaultBranch: repo.default_branch,
      size: repo.size,
      license: repo.license ? repo.license.name : null,
      hasPages: repo.has_pages || false,
      hasWiki: repo.has_wiki || false,
      hasIssues: repo.has_issues || false
    }));

  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return []; // Retornar array vacío en caso de error para no romper la UI
  }
}

/**
 * Obtiene información adicional de un repositorio específico
 * 
 * @param {string} owner - Propietario del repositorio
 * @param {string} repo - Nombre del repositorio
 * @returns {Promise<Object|null>} Información del repositorio o null si hay error
 */
export async function getGitHubRepo(owner, repo) {
  if (!owner || !repo) {
    console.warn('Owner and repo name are required');
    return null;
  }

  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'Portfolio-App'
  };

  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers['Authorization'] = `token ${token}`;
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers,
        next: { revalidate: 3600 }
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repoData = await response.json();

    return {
      id: repoData.id,
      name: repoData.name,
      fullName: repoData.full_name,
      description: repoData.description || '',
      url: repoData.html_url,
      homepage: repoData.homepage || null,
      language: repoData.language || null,
      stars: repoData.stargazers_count || 0,
      forks: repoData.forks_count || 0,
      watchers: repoData.watchers_count || 0,
      openIssues: repoData.open_issues_count || 0,
      createdAt: repoData.created_at,
      updatedAt: repoData.updated_at,
      pushedAt: repoData.pushed_at,
      topics: repoData.topics || [],
      isPrivate: repoData.private,
      isArchived: repoData.archived,
      isFork: repoData.fork,
      defaultBranch: repoData.default_branch,
      size: repoData.size,
      license: repoData.license ? repoData.license.name : null,
      hasPages: repoData.has_pages || false,
      hasWiki: repoData.has_wiki || false,
      hasIssues: repoData.has_issues || false
    };

  } catch (error) {
    console.error('Error fetching GitHub repo:', error);
    return null;
  }
}

/**
 * Obtiene los lenguajes utilizados en un repositorio
 * 
 * @param {string} owner - Propietario del repositorio
 * @param {string} repo - Nombre del repositorio
 * @returns {Promise<Object>} Objeto con lenguajes y bytes de código
 */
export async function getRepoLanguages(owner, repo) {
  if (!owner || !repo) {
    return {};
  }

  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'Portfolio-App'
  };

  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers['Authorization'] = `token ${token}`;
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/languages`,
      {
        headers,
        next: { revalidate: 3600 }
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    return await response.json();

  } catch (error) {
    console.error('Error fetching repo languages:', error);
    return {};
  }
}

