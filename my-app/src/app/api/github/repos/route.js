import { NextResponse } from 'next/server';
import { getGitHubRepos } from '../../../../lib/github';

/**
 * API Route para obtener repositorios de GitHub
 * GET /api/github/repos?username=xxx&sort=updated&per_page=6
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Obtener parámetros de la query string o usar valores por defecto
    const username = searchParams.get('username') || process.env.GITHUB_USERNAME;
    const sort = searchParams.get('sort') || 'updated';
    const perPage = parseInt(searchParams.get('per_page') || '6', 10);
    const type = searchParams.get('type') || 'owner';
    const includePrivate = searchParams.get('include_private') === 'true';
    const includeArchived = searchParams.get('include_archived') === 'true';
    const includeForks = searchParams.get('include_forks') === 'true';

    // Validar que se proporcione un username
    if (!username) {
      return NextResponse.json(
        { error: 'GitHub username is required. Set GITHUB_USERNAME in .env.local or provide username query parameter.' },
        { status: 400 }
      );
    }

    // Obtener repositorios usando la función helper
    const repos = await getGitHubRepos(username, {
      sort,
      per_page: Math.min(perPage, 100), // Máximo 100 por página
      type,
      includePrivate,
      includeArchived,
      includeForks
    });

    return NextResponse.json({
      success: true,
      data: repos,
      count: repos.length
    });

  } catch (error) {
    console.error('Error in GitHub repos API route:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch GitHub repositories',
        message: error.message 
      },
      { status: 500 }
    );
  }
}

