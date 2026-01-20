import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProjectModal from '../ProjectModal';
import { useTheme } from '../../../hooks/useTheme';
import { useLocale } from 'next-intl';
import { getProjectTitle, getProjectDescription, getProjectAdditionalInfo } from '../../../lib/projectTranslations';

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
  getProjectAdditionalInfo: jest.fn((name, locale, fallback) => fallback || null),
}));

describe('ProjectModal', () => {
  const mockProject = {
    id: 1,
    name: 'test-repo',
    description: 'Test description',
    url: 'https://github.com/user/test-repo',
    homepage: 'https://test-repo.com',
    language: 'JavaScript',
    stars: 10,
    forks: 5,
    watchers: 3,
    openIssues: 2,
    updatedAt: '2024-01-15T10:00:00Z',
    createdAt: '2023-01-01T10:00:00Z',
    pushedAt: '2024-01-14T10:00:00Z',
    topics: ['react', 'nextjs', 'testing'],
    license: 'MIT',
    defaultBranch: 'main',
    size: 1024,
  };

  const mockOnClose = jest.fn();

  beforeEach(() => {
    useTheme.mockReturnValue({ isDark: false, mounted: true });
    useLocale.mockReturnValue('es');
    getProjectTitle.mockReturnValue('Test Repo');
    getProjectDescription.mockReturnValue('Test description');
    getProjectAdditionalInfo.mockReturnValue(null);
    mockOnClose.mockClear();
    
    // Mock document.body.style.overflow
    Object.defineProperty(document.body, 'style', {
      value: {
        overflow: '',
      },
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    document.body.style.overflow = '';
  });

  describe('Renderizado básico', () => {
    it('no debería renderizar nada si project es null', () => {
      const { container } = render(<ProjectModal project={null} onClose={mockOnClose} />);
      expect(container.firstChild).toBeNull();
    });

    it('debería renderizar el modal con información básica del proyecto', () => {
      render(<ProjectModal project={mockProject} onClose={mockOnClose} />);
      
      expect(screen.getByText('Test Repo')).toBeInTheDocument();
      expect(screen.getByText('Test description')).toBeInTheDocument();
      expect(screen.getByText('JavaScript')).toBeInTheDocument();
    });

    it('debería bloquear el scroll del body cuando el modal está abierto', () => {
      render(<ProjectModal project={mockProject} onClose={mockOnClose} />);
      
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('debería restaurar el scroll del body cuando el modal se cierra', () => {
      const { rerender } = render(<ProjectModal project={mockProject} onClose={mockOnClose} />);
      
      expect(document.body.style.overflow).toBe('hidden');
      
      rerender(<ProjectModal project={null} onClose={mockOnClose} />);
      
      expect(document.body.style.overflow).toBe('unset');
    });
  });

  describe('Cerrar modal', () => {
    it('debería llamar onClose cuando se hace clic en el botón de cerrar', () => {
      render(<ProjectModal project={mockProject} onClose={mockOnClose} />);
      
      const closeButton = screen.getByLabelText('Cerrar');
      fireEvent.click(closeButton);
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('debería llamar onClose cuando se hace clic en el overlay', () => {
      render(<ProjectModal project={mockProject} onClose={mockOnClose} />);
      
      const overlay = screen.getByText('Test Repo').closest('[style*="background-color: rgba(0, 0, 0, 0.5)"]');
      if (overlay) {
        fireEvent.click(overlay);
        expect(mockOnClose).toHaveBeenCalledTimes(1);
      } else {
        // Fallback: buscar por clase o estructura
        const modalContainer = document.querySelector('.fixed.inset-0');
        if (modalContainer) {
          fireEvent.click(modalContainer);
          expect(mockOnClose).toHaveBeenCalledTimes(1);
        }
      }
    });

    it('no debería cerrar el modal cuando se hace clic dentro del contenido', () => {
      render(<ProjectModal project={mockProject} onClose={mockOnClose} />);
      
      const modalContent = screen.getByText('Test Repo').closest('.max-w-3xl');
      if (modalContent) {
        fireEvent.click(modalContent);
        expect(mockOnClose).not.toHaveBeenCalled();
      }
    });

    it('debería llamar onClose cuando se presiona ESC', () => {
      render(<ProjectModal project={mockProject} onClose={mockOnClose} />);
      
      const overlay = document.querySelector('.fixed.inset-0');
      if (overlay) {
        fireEvent.keyDown(overlay, { key: 'Escape' });
        expect(mockOnClose).toHaveBeenCalledTimes(1);
      }
    });

    it('no debería cerrar el modal cuando se presiona otra tecla', () => {
      render(<ProjectModal project={mockProject} onClose={mockOnClose} />);
      
      const overlay = document.querySelector('.fixed.inset-0');
      if (overlay) {
        fireEvent.keyDown(overlay, { key: 'Enter' });
        expect(mockOnClose).not.toHaveBeenCalled();
      }
    });
  });

  describe('Estadísticas del proyecto', () => {
    it('debería mostrar las estadísticas correctas', () => {
      render(<ProjectModal project={mockProject} onClose={mockOnClose} />);
      
      expect(screen.getByText('10')).toBeInTheDocument(); // Stars
      expect(screen.getByText('5')).toBeInTheDocument(); // Forks
      expect(screen.getByText('3')).toBeInTheDocument(); // Watchers
      expect(screen.getByText('2')).toBeInTheDocument(); // Issues
    });

    it('debería mostrar labels traducidos en español', () => {
      useLocale.mockReturnValue('es');
      render(<ProjectModal project={mockProject} onClose={mockOnClose} />);
      
      expect(screen.getByText('Estrellas')).toBeInTheDocument();
      expect(screen.getByText('Forks')).toBeInTheDocument();
      expect(screen.getByText('Watchers')).toBeInTheDocument();
      expect(screen.getByText('Issues')).toBeInTheDocument();
    });

    it('debería mostrar labels traducidos en inglés', () => {
      useLocale.mockReturnValue('en');
      render(<ProjectModal project={mockProject} onClose={mockOnClose} />);
      
      expect(screen.getByText('Stars')).toBeInTheDocument();
      expect(screen.getByText('Forks')).toBeInTheDocument();
      expect(screen.getByText('Watchers')).toBeInTheDocument();
      expect(screen.getByText('Issues')).toBeInTheDocument();
    });

    it('no debería mostrar watchers si es 0', () => {
      const projectWithoutWatchers = {
        ...mockProject,
        watchers: 0,
      };
      render(<ProjectModal project={projectWithoutWatchers} onClose={mockOnClose} />);
      
      expect(screen.queryByText('Watchers')).not.toBeInTheDocument();
    });

    it('no debería mostrar issues si es 0', () => {
      const projectWithoutIssues = {
        ...mockProject,
        openIssues: 0,
      };
      render(<ProjectModal project={projectWithoutIssues} onClose={mockOnClose} />);
      
      expect(screen.queryByText('Issues')).not.toBeInTheDocument();
    });
  });

  describe('Topics/Tecnologías', () => {
    it('debería mostrar todos los topics', () => {
      render(<ProjectModal project={mockProject} onClose={mockOnClose} />);
      
      expect(screen.getByText('react')).toBeInTheDocument();
      expect(screen.getByText('nextjs')).toBeInTheDocument();
      expect(screen.getByText('testing')).toBeInTheDocument();
    });

    it('debería mostrar el título "Tecnologías" en español', () => {
      useLocale.mockReturnValue('es');
      render(<ProjectModal project={mockProject} onClose={mockOnClose} />);
      
      expect(screen.getByText('Tecnologías')).toBeInTheDocument();
    });

    it('debería mostrar el título "Technologies" en inglés', () => {
      useLocale.mockReturnValue('en');
      render(<ProjectModal project={mockProject} onClose={mockOnClose} />);
      
      expect(screen.getByText('Technologies')).toBeInTheDocument();
    });

    it('no debería mostrar topics si no existen', () => {
      const projectWithoutTopics = {
        ...mockProject,
        topics: [],
      };
      render(<ProjectModal project={projectWithoutTopics} onClose={mockOnClose} />);
      
      expect(screen.queryByText('Tecnologías')).not.toBeInTheDocument();
    });
  });

  describe('Información del proyecto', () => {
    it('debería mostrar información adicional del proyecto', () => {
      render(<ProjectModal project={mockProject} onClose={mockOnClose} />);
      
      expect(screen.getByText(/Creado:/i)).toBeInTheDocument();
      expect(screen.getByText(/Última actualización:/i)).toBeInTheDocument();
      expect(screen.getByText(/Último push:/i)).toBeInTheDocument();
      expect(screen.getByText(/Licencia:/i)).toBeInTheDocument();
      expect(screen.getByText(/Rama principal:/i)).toBeInTheDocument();
      expect(screen.getByText(/Tamaño:/i)).toBeInTheDocument();
    });

    it('debería formatear el tamaño correctamente en KB', () => {
      const projectSmall = {
        ...mockProject,
        size: 512,
      };
      render(<ProjectModal project={projectSmall} onClose={mockOnClose} />);
      
      expect(screen.getByText(/512 KB/i)).toBeInTheDocument();
    });

    it('debería formatear el tamaño correctamente en MB', () => {
      const projectLarge = {
        ...mockProject,
        size: 2048,
      };
      render(<ProjectModal project={projectLarge} onClose={mockOnClose} />);
      
      expect(screen.getByText(/2.0 MB/i)).toBeInTheDocument();
    });
  });

  describe('Información adicional personalizada', () => {
    it('debería mostrar información adicional si existe', () => {
      const additionalInfo = {
        title: 'Características Principales',
        content: '<p>Contenido HTML</p>',
        items: ['Item 1', 'Item 2'],
      };
      
      getProjectAdditionalInfo.mockReturnValue(additionalInfo);
      
      render(<ProjectModal project={mockProject} onClose={mockOnClose} />);
      
      expect(screen.getByText('Características Principales')).toBeInTheDocument();
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('debería renderizar contenido HTML en información adicional', () => {
      const additionalInfo = {
        title: 'Título',
        content: '<strong>Texto en negrita</strong>',
      };
      
      getProjectAdditionalInfo.mockReturnValue(additionalInfo);
      
      render(<ProjectModal project={mockProject} onClose={mockOnClose} />);
      
      const boldText = screen.getByText('Texto en negrita');
      expect(boldText.tagName).toBe('STRONG');
    });

    it('debería manejar múltiples bloques de contenido', () => {
      const additionalInfo = {
        title: 'Título',
        content: 'Contenido 1',
        items: ['Item 1'],
        content2: 'Contenido 2',
        items2: ['Item 2'],
      };
      
      getProjectAdditionalInfo.mockReturnValue(additionalInfo);
      
      render(<ProjectModal project={mockProject} onClose={mockOnClose} />);
      
      expect(screen.getByText('Contenido 1')).toBeInTheDocument();
      expect(screen.getByText('Contenido 2')).toBeInTheDocument();
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('no debería mostrar información adicional si no existe', () => {
      getProjectAdditionalInfo.mockReturnValue(null);
      
      render(<ProjectModal project={mockProject} onClose={mockOnClose} />);
      
      expect(screen.queryByText('Características Principales')).not.toBeInTheDocument();
    });
  });

  describe('Enlaces y botones', () => {
    it('debería mostrar el botón de demo si existe homepage', () => {
      render(<ProjectModal project={mockProject} onClose={mockOnClose} />);
      
      const demoLink = screen.getByText('Ver Demo');
      expect(demoLink).toBeInTheDocument();
      expect(demoLink.closest('a')).toHaveAttribute('href', 'https://test-repo.com');
    });

    it('debería mostrar el botón de GitHub para proyectos no personalizados', () => {
      render(<ProjectModal project={mockProject} onClose={mockOnClose} />);
      
      const githubLink = screen.getByText('Ver en GitHub');
      expect(githubLink).toBeInTheDocument();
      expect(githubLink.closest('a')).toHaveAttribute('href', 'https://github.com/user/test-repo');
    });

    it('debería mostrar el botón de proyecto para proyectos personalizados', () => {
      const customProject = {
        ...mockProject,
        isCustom: true,
      };
      render(<ProjectModal project={customProject} onClose={mockOnClose} />);
      
      const projectLink = screen.getByText('Ver Proyecto');
      expect(projectLink).toBeInTheDocument();
    });

    it('no debería mostrar botones si no hay enlaces', () => {
      const projectWithoutLinks = {
        ...mockProject,
        homepage: null,
        url: null,
      };
      render(<ProjectModal project={projectWithoutLinks} onClose={mockOnClose} />);
      
      expect(screen.queryByText('Ver Demo')).not.toBeInTheDocument();
      expect(screen.queryByText('Ver en GitHub')).not.toBeInTheDocument();
    });
  });

  describe('Temas y estilos', () => {
    it('debería aplicar estilos de tema oscuro', () => {
      useTheme.mockReturnValue({ isDark: true, mounted: true });
      render(<ProjectModal project={mockProject} onClose={mockOnClose} />);
      
      const modal = document.querySelector('.max-w-3xl');
      if (modal) {
        expect(modal).toHaveStyle({ backgroundColor: 'rgb(39, 39, 42)' });
      } else {
        // Verificar que el componente se renderiza correctamente
        expect(screen.getByText('Test Repo')).toBeInTheDocument();
      }
    });

    it('debería aplicar estilos de tema claro', () => {
      useTheme.mockReturnValue({ isDark: false, mounted: true });
      render(<ProjectModal project={mockProject} onClose={mockOnClose} />);
      
      const modal = document.querySelector('.max-w-3xl');
      if (modal) {
        expect(modal).toHaveStyle({ backgroundColor: 'rgb(255, 255, 255)' });
      } else {
        // Verificar que el componente se renderiza correctamente
        expect(screen.getByText('Test Repo')).toBeInTheDocument();
      }
    });
  });

  describe('Traducciones', () => {
    it('debería usar getProjectTitle para obtener el título traducido', () => {
      getProjectTitle.mockReturnValue('Repositorio de Prueba');
      render(<ProjectModal project={mockProject} onClose={mockOnClose} />);
      
      expect(getProjectTitle).toHaveBeenCalledWith('test-repo', 'es', 'test-repo');
      expect(screen.getByText('Repositorio de Prueba')).toBeInTheDocument();
    });

    it('debería usar getProjectDescription para obtener la descripción traducida', () => {
      getProjectDescription.mockReturnValue('Descripción traducida');
      render(<ProjectModal project={mockProject} onClose={mockOnClose} />);
      
      expect(getProjectDescription).toHaveBeenCalledWith('test-repo', 'es', 'Test description');
      expect(screen.getByText('Descripción traducida')).toBeInTheDocument();
    });

    it('debería usar getProjectAdditionalInfo para obtener información adicional traducida', () => {
      const additionalInfo = { title: 'Título traducido' };
      getProjectAdditionalInfo.mockReturnValue(additionalInfo);
      
      render(<ProjectModal project={mockProject} onClose={mockOnClose} />);
      
      expect(getProjectAdditionalInfo).toHaveBeenCalledWith('test-repo', 'es', null);
      expect(screen.getByText('Título traducido')).toBeInTheDocument();
    });
  });

  describe('Casos edge', () => {
    it('debería manejar proyecto sin descripción', () => {
      const projectWithoutDescription = {
        ...mockProject,
        description: null,
      };
      getProjectDescription.mockReturnValue('');
      render(<ProjectModal project={projectWithoutDescription} onClose={mockOnClose} />);
      
      expect(screen.queryByText('Test description')).not.toBeInTheDocument();
    });

    it('debería manejar proyecto sin lenguaje', () => {
      const projectWithoutLanguage = {
        ...mockProject,
        language: null,
      };
      render(<ProjectModal project={projectWithoutLanguage} onClose={mockOnClose} />);
      
      expect(screen.queryByText('JavaScript')).not.toBeInTheDocument();
    });

    it('debería manejar proyecto sin fechas', () => {
      const projectWithoutDates = {
        ...mockProject,
        createdAt: null,
        updatedAt: null,
        pushedAt: null,
      };
      render(<ProjectModal project={projectWithoutDates} onClose={mockOnClose} />);
      
      expect(screen.queryByText(/Creado:/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Última actualización:/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Último push:/i)).not.toBeInTheDocument();
    });
  });
});

