import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProjectCard from '../ProjectCard';
import { useTheme } from '../../../hooks/useTheme';
import { useLocale } from 'next-intl';
import { getProjectTitle, getProjectDescription } from '../../../lib/projectTranslations';

// Mock de useTheme
jest.mock('../../../hooks/useTheme', () => ({
  useTheme: jest.fn(),
}));

// Mock de next-intl
jest.mock('next-intl', () => ({
  useLocale: jest.fn(),
}));

// Mock de projectTranslations
jest.mock('../../../lib/projectTranslations', () => ({
  getProjectTitle: jest.fn((name, locale, fallback) => fallback || name),
  getProjectDescription: jest.fn((name, locale, fallback) => fallback || ''),
}));

describe('ProjectCard', () => {
  const mockProject = {
    id: 1,
    name: 'test-repo',
    description: 'Test description',
    url: 'https://github.com/user/test-repo',
    homepage: 'https://test-repo.com',
    language: 'JavaScript',
    stars: 10,
    forks: 5,
    updatedAt: '2024-01-15T10:00:00Z',
    topics: ['react', 'nextjs', 'testing'],
  };

  beforeEach(() => {
    useTheme.mockReturnValue({ isDark: false, mounted: true });
    useLocale.mockReturnValue('es');
    getProjectTitle.mockReturnValue('Test Repo');
    getProjectDescription.mockReturnValue('Test description');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Renderizado básico', () => {
    it('debería renderizar el componente con información básica', () => {
      render(<ProjectCard project={mockProject} />);
      
      expect(screen.getByText('Test Repo')).toBeInTheDocument();
      expect(screen.getByText('Test description')).toBeInTheDocument();
      expect(screen.getByText('JavaScript')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('no debería renderizar nada si project es null', () => {
      const { container } = render(<ProjectCard project={null} />);
      expect(container.firstChild).toBeNull();
    });

    it('debería renderizar con tema oscuro', () => {
      useTheme.mockReturnValue({ isDark: true, mounted: true });
      render(<ProjectCard project={mockProject} />);
      
      const card = screen.getByRole('button');
      expect(card).toHaveStyle({ backgroundColor: 'rgb(39, 39, 42)' });
    });

    it('debería renderizar con tema claro', () => {
      useTheme.mockReturnValue({ isDark: false, mounted: true });
      render(<ProjectCard project={mockProject} />);
      
      const card = screen.getByRole('button');
      expect(card).toHaveStyle({ backgroundColor: 'rgb(255, 255, 255)' });
    });
  });

  describe('Enlaces y botones', () => {
    it('debería mostrar el enlace de homepage si existe', () => {
      render(<ProjectCard project={mockProject} />);
      
      const homepageLink = screen.getByTitle('Ver demo');
      expect(homepageLink).toBeInTheDocument();
      expect(homepageLink).toHaveAttribute('href', 'https://test-repo.com');
      expect(homepageLink).toHaveAttribute('target', '_blank');
      expect(homepageLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('debería mostrar el botón de GitHub para proyectos no personalizados', () => {
      render(<ProjectCard project={mockProject} />);
      
      const githubLink = screen.getByTitle('Ver en GitHub');
      expect(githubLink).toBeInTheDocument();
      expect(githubLink).toHaveAttribute('href', 'https://github.com/user/test-repo');
    });

    it('no debería mostrar el botón de GitHub para proyectos personalizados', () => {
      const customProject = { ...mockProject, isCustom: true };
      render(<ProjectCard project={customProject} />);
      
      expect(screen.queryByTitle('Ver en GitHub')).not.toBeInTheDocument();
    });

    it('debería mostrar el botón de enlace externo para proyectos personalizados con URL', () => {
      const customProject = { ...mockProject, isCustom: true, url: 'https://custom-project.com' };
      render(<ProjectCard project={customProject} />);
      
      const externalLink = screen.getByTitle('Ver proyecto');
      expect(externalLink).toBeInTheDocument();
      expect(externalLink).toHaveAttribute('href', 'https://custom-project.com');
    });

    it('no debería mostrar enlaces si no existen', () => {
      const projectWithoutLinks = {
        ...mockProject,
        homepage: null,
        url: null,
      };
      render(<ProjectCard project={projectWithoutLinks} />);
      
      expect(screen.queryByTitle('Ver demo')).not.toBeInTheDocument();
      expect(screen.queryByTitle('Ver en GitHub')).not.toBeInTheDocument();
    });
  });

  describe('Interactividad', () => {
    it('debería llamar onClick cuando se hace clic en la tarjeta', () => {
      const handleClick = jest.fn();
      render(<ProjectCard project={mockProject} onClick={handleClick} />);
      
      const card = screen.getByRole('button');
      fireEvent.click(card);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('debería llamar onClick cuando se presiona Enter', () => {
      const handleClick = jest.fn();
      render(<ProjectCard project={mockProject} onClick={handleClick} />);
      
      const card = screen.getByRole('button');
      fireEvent.keyDown(card, { key: 'Enter' });
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('debería llamar onClick cuando se presiona Espacio', () => {
      const handleClick = jest.fn();
      render(<ProjectCard project={mockProject} onClick={handleClick} />);
      
      const card = screen.getByRole('button');
      fireEvent.keyDown(card, { key: ' ' });
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('no debería llamar onClick cuando se hace clic en un enlace interno', () => {
      const handleClick = jest.fn();
      render(<ProjectCard project={mockProject} onClick={handleClick} />);
      
      const homepageLink = screen.getByTitle('Ver demo');
      fireEvent.click(homepageLink);
      
      // El onClick del card no debería llamarse debido a stopPropagation
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('debería tener aria-label correcto', () => {
      render(<ProjectCard project={mockProject} />);
      
      const card = screen.getByRole('button');
      expect(card).toHaveAttribute('aria-label', 'Ver detalles de Test Repo');
    });

    it('debería tener tabIndex 0 para accesibilidad', () => {
      render(<ProjectCard project={mockProject} />);
      
      const card = screen.getByRole('button');
      expect(card).toHaveAttribute('tabIndex', '0');
    });
  });

  describe('Topics/Tags', () => {
    it('debería mostrar los primeros 4 topics', () => {
      const projectWithManyTopics = {
        ...mockProject,
        topics: ['react', 'nextjs', 'testing', 'jest', 'typescript'],
      };
      render(<ProjectCard project={projectWithManyTopics} />);
      
      expect(screen.getByText('react')).toBeInTheDocument();
      expect(screen.getByText('nextjs')).toBeInTheDocument();
      expect(screen.getByText('testing')).toBeInTheDocument();
      expect(screen.getByText('jest')).toBeInTheDocument();
      expect(screen.queryByText('typescript')).not.toBeInTheDocument();
    });

    it('debería mostrar contador de topics adicionales si hay más de 4', () => {
      const projectWithManyTopics = {
        ...mockProject,
        topics: ['react', 'nextjs', 'testing', 'jest', 'typescript'],
      };
      render(<ProjectCard project={projectWithManyTopics} />);
      
      expect(screen.getByText('+1')).toBeInTheDocument();
    });

    it('no debería mostrar topics si no existen', () => {
      const projectWithoutTopics = {
        ...mockProject,
        topics: [],
      };
      render(<ProjectCard project={projectWithoutTopics} />);
      
      expect(screen.queryByText('react')).not.toBeInTheDocument();
    });
  });

  describe('Formato de fechas', () => {
    it('debería formatear la fecha correctamente en español', () => {
      useLocale.mockReturnValue('es');
      render(<ProjectCard project={mockProject} />);
      
      // La fecha debería estar formateada
      const dateElement = screen.getByText(/ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic/i);
      expect(dateElement).toBeInTheDocument();
    });

    it('debería formatear la fecha correctamente en inglés', () => {
      useLocale.mockReturnValue('en');
      render(<ProjectCard project={mockProject} />);
      
      // La fecha debería estar formateada
      const dateElement = screen.getByText(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/i);
      expect(dateElement).toBeInTheDocument();
    });

    it('no debería mostrar fecha si updatedAt no existe', () => {
      const projectWithoutDate = {
        ...mockProject,
        updatedAt: null,
      };
      render(<ProjectCard project={projectWithoutDate} />);
      
      // No debería haber un elemento Calendar visible
      const calendarIcons = screen.queryAllByRole('img', { hidden: true });
      expect(calendarIcons.length).toBe(0);
    });
  });

  describe('Traducciones', () => {
    it('debería usar getProjectTitle para obtener el título traducido', () => {
      getProjectTitle.mockReturnValue('Repositorio de Prueba');
      render(<ProjectCard project={mockProject} />);
      
      expect(getProjectTitle).toHaveBeenCalledWith('test-repo', 'es', 'test-repo');
      expect(screen.getByText('Repositorio de Prueba')).toBeInTheDocument();
    });

    it('debería usar getProjectDescription para obtener la descripción traducida', () => {
      getProjectDescription.mockReturnValue('Descripción traducida');
      render(<ProjectCard project={mockProject} />);
      
      expect(getProjectDescription).toHaveBeenCalledWith('test-repo', 'es', 'Test description');
      expect(screen.getByText('Descripción traducida')).toBeInTheDocument();
    });

    it('debería usar el locale correcto para las traducciones', () => {
      useLocale.mockReturnValue('en');
      render(<ProjectCard project={mockProject} />);
      
      expect(getProjectTitle).toHaveBeenCalledWith('test-repo', 'en', 'test-repo');
      expect(getProjectDescription).toHaveBeenCalledWith('test-repo', 'en', 'Test description');
    });
  });

  describe('Estilos y clases CSS', () => {
    it('debería tener las clases CSS correctas', () => {
      render(<ProjectCard project={mockProject} />);
      
      const card = screen.getByRole('button');
      expect(card).toHaveClass('rounded-lg', 'p-6', 'border', 'transition-all', 'hover:shadow-lg', 'hover:scale-[1.02]', 'flex', 'flex-col', 'h-full', 'cursor-pointer');
    });

    it('debería aplicar estilos dinámicos según el tema', () => {
      useTheme.mockReturnValue({ isDark: true, mounted: true });
      render(<ProjectCard project={mockProject} />);
      
      const card = screen.getByRole('button');
      expect(card).toHaveStyle({
        backgroundColor: 'rgb(39, 39, 42)',
        borderColor: 'rgb(63, 63, 70)',
      });
    });
  });

  describe('Casos edge', () => {
    it('debería manejar proyecto sin descripción', () => {
      const projectWithoutDescription = {
        ...mockProject,
        description: null,
      };
      getProjectDescription.mockReturnValue('');
      render(<ProjectCard project={projectWithoutDescription} />);
      
      expect(screen.queryByText('Test description')).not.toBeInTheDocument();
    });

    it('debería manejar proyecto sin lenguaje', () => {
      const projectWithoutLanguage = {
        ...mockProject,
        language: null,
      };
      render(<ProjectCard project={projectWithoutLanguage} />);
      
      expect(screen.queryByText('JavaScript')).not.toBeInTheDocument();
    });

    it('debería manejar proyecto sin stats', () => {
      const projectWithoutStats = {
        ...mockProject,
        stars: 0,
        forks: 0,
      };
      render(<ProjectCard project={projectWithoutStats} />);
      
      // Cuando hay múltiples elementos con "0", usar getAllByText
      const zeroElements = screen.getAllByText('0');
      expect(zeroElements.length).toBeGreaterThanOrEqual(1); // Al menos stars o forks mostrarán 0
      
      // Verificar que el componente se renderiza correctamente
      expect(screen.getByText('Test Repo')).toBeInTheDocument();
    });
  });
});

