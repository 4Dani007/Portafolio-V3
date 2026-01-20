import { render, screen } from '@testing-library/react';
import FadeinSection from '../FadeinSection';

// Mock de framer-motion - simplificado para tests
jest.mock('framer-motion', () => {
  const React = require('react');
  return {
    motion: {
      section: React.forwardRef(({ children, ...props }, ref) => {
        // Filtrar props de framer-motion para evitar warnings de React
        const { initial, whileInView, viewport, transition, ...domProps } = props;
        return React.createElement('section', { 
          'data-testid': 'fadein-section', 
          ref,
          ...domProps 
        }, children);
      }),
    },
  };
});

describe('FadeinSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Renderizado básico', () => {
    it('debería renderizar el componente con children', () => {
      render(
        <FadeinSection>
          <div>Test Content</div>
        </FadeinSection>
      );
      
      expect(screen.getByText('Test Content')).toBeInTheDocument();
      expect(screen.getByTestId('fadein-section')).toBeInTheDocument();
    });

    it('debería renderizar múltiples children', () => {
      render(
        <FadeinSection>
          <div>Content 1</div>
          <div>Content 2</div>
        </FadeinSection>
      );
      
      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });

    it('debería renderizar contenido complejo', () => {
      render(
        <FadeinSection>
          <div>
            <h1>Título</h1>
            <p>Párrafo de prueba</p>
            <button>Botón</button>
          </div>
        </FadeinSection>
      );
      
      expect(screen.getByText('Título')).toBeInTheDocument();
      expect(screen.getByText('Párrafo de prueba')).toBeInTheDocument();
      expect(screen.getByText('Botón')).toBeInTheDocument();
    });
  });

  describe('Props de framer-motion', () => {
    it('debería renderizar el componente con las props correctas', () => {
      render(
        <FadeinSection>
          <div>Test</div>
        </FadeinSection>
      );
      
      const section = screen.getByTestId('fadein-section');
      expect(section).toBeInTheDocument();
      expect(section).toContainHTML('<div>Test</div>');
    });

    it('debería renderizar correctamente con diferentes children', () => {
      render(
        <FadeinSection>
          <h1>Título</h1>
          <p>Párrafo</p>
        </FadeinSection>
      );
      
      const section = screen.getByTestId('fadein-section');
      expect(section).toBeInTheDocument();
      expect(screen.getByText('Título')).toBeInTheDocument();
      expect(screen.getByText('Párrafo')).toBeInTheDocument();
    });
  });

  describe('Casos edge', () => {
    it('debería manejar children vacío', () => {
      const { container } = render(<FadeinSection>{null}</FadeinSection>);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('debería manejar children undefined', () => {
      const { container } = render(<FadeinSection>{undefined}</FadeinSection>);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('debería renderizar correctamente con children que son arrays', () => {
      render(
        <FadeinSection>
          {['Item 1', 'Item 2', 'Item 3'].map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </FadeinSection>
      );
      
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByText('Item 3')).toBeInTheDocument();
    });
  });

  describe('Integración', () => {
    it('debería funcionar correctamente con otros componentes', () => {
      const TestComponent = () => <div>Test Component</div>;
      
      render(
        <FadeinSection>
          <TestComponent />
        </FadeinSection>
      );
      
      expect(screen.getByText('Test Component')).toBeInTheDocument();
    });

    it('debería mantener la estructura del DOM correcta', () => {
      render(
        <FadeinSection>
          <div data-testid="inner-content">Content</div>
        </FadeinSection>
      );
      
      const section = screen.getByTestId('fadein-section');
      const innerContent = screen.getByTestId('inner-content');
      
      expect(section).toContainElement(innerContent);
    });
  });
});

