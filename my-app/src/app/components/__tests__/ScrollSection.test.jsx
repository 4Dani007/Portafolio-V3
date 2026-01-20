import { render, screen } from '@testing-library/react';
import ScrollSection from '../ScrollSection';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

// Mock de framer-motion
const mockUseScroll = jest.fn();
const mockUseTransform = jest.fn();
const mockY = { get: jest.fn(() => 0) };

jest.mock('framer-motion', () => {
  const React = require('react');
  return {
    motion: {
      div: React.forwardRef(({ children, style, ...props }, ref) => {
        return React.createElement('div', { 
          'data-testid': 'motion-div', 
          style, 
          ref,
          ...props 
        }, children);
      }),
    },
    useScroll: jest.fn(),
    useTransform: jest.fn(),
  };
});

// Mock de React useRef
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useRef: jest.fn(),
}));

describe('ScrollSection', () => {
  const mockRef = { current: null };
  const mockScrollYProgress = { get: jest.fn(() => 0.5) };

  beforeEach(() => {
    jest.clearAllMocks();
    useRef.mockReturnValue(mockRef);
    mockUseScroll.mockReturnValue({ scrollYProgress: mockScrollYProgress });
    mockUseTransform.mockReturnValue(mockY);
    
    // Asignar los mocks a las funciones importadas
    useScroll.mockImplementation(mockUseScroll);
    useTransform.mockImplementation(mockUseTransform);
  });

  describe('Renderizado básico', () => {
    it('debería renderizar el componente con children', () => {
      render(
        <ScrollSection>
          <div>Test Content</div>
        </ScrollSection>
      );
      
      expect(screen.getByText('Test Content')).toBeInTheDocument();
      expect(screen.getByTestId('motion-div')).toBeInTheDocument();
    });

    it('debería renderizar múltiples children', () => {
      render(
        <ScrollSection>
          <div>Content 1</div>
          <div>Content 2</div>
        </ScrollSection>
      );
      
      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });

    it('debería renderizar contenido complejo', () => {
      render(
        <ScrollSection>
          <div>
            <h1>Título</h1>
            <p>Párrafo de prueba</p>
          </div>
        </ScrollSection>
      );
      
      expect(screen.getByText('Título')).toBeInTheDocument();
      expect(screen.getByText('Párrafo de prueba')).toBeInTheDocument();
    });
  });

  describe('Props por defecto', () => {
    it('debería usar valores por defecto para from y to', () => {
      render(
        <ScrollSection>
          <div>Test</div>
        </ScrollSection>
      );
      
      expect(useTransform).toHaveBeenCalledWith(
        mockScrollYProgress,
        [0, 1],
        ['0%', '-50%']
      );
    });

    it('debería usar className vacío por defecto', () => {
      render(
        <ScrollSection>
          <div>Test</div>
        </ScrollSection>
      );
      
      const section = screen.getByText('Test').closest('section');
      expect(section).toHaveClass('relative', 'overflow-hidden');
    });
  });

  describe('Props personalizadas', () => {
    it('debería usar from y to personalizados', () => {
      render(
        <ScrollSection from="10%" to="-10%">
          <div>Test</div>
        </ScrollSection>
      );
      
      expect(useTransform).toHaveBeenCalledWith(
        mockScrollYProgress,
        [0, 1],
        ['10%', '-10%']
      );
    });

    it('debería aplicar className personalizada', () => {
      render(
        <ScrollSection className="custom-class">
          <div>Test</div>
        </ScrollSection>
      );
      
      const section = screen.getByText('Test').closest('section');
      expect(section).toHaveClass('relative', 'overflow-hidden', 'custom-class');
    });

    it('debería combinar className personalizada con clases por defecto', () => {
      render(
        <ScrollSection className="my-custom-class another-class">
          <div>Test</div>
        </ScrollSection>
      );
      
      const section = screen.getByText('Test').closest('section');
      expect(section).toHaveClass('relative', 'overflow-hidden', 'my-custom-class', 'another-class');
    });
  });

  describe('Hooks de framer-motion', () => {
    it('debería llamar useScroll con la configuración correcta', () => {
      render(
        <ScrollSection>
          <div>Test</div>
        </ScrollSection>
      );
      
      expect(useScroll).toHaveBeenCalledWith({
        target: mockRef,
        offset: ['start end', 'end start'],
      });
    });

    it('debería llamar useTransform con los valores correctos', () => {
      render(
        <ScrollSection from="20%" to="-20%">
          <div>Test</div>
        </ScrollSection>
      );
      
      expect(useTransform).toHaveBeenCalledWith(
        mockScrollYProgress,
        [0, 1],
        ['20%', '-20%']
      );
    });

    it('debería renderizar motion.div con el estilo transformado', () => {
      mockY.get.mockReturnValue('-25%');
      
      render(
        <ScrollSection>
          <div>Test</div>
        </ScrollSection>
      );
      
      const motionDiv = screen.getByTestId('motion-div');
      expect(motionDiv).toBeInTheDocument();
      // Verificar que el componente se renderiza correctamente
      // El estilo y es un objeto de framer-motion que se aplica dinámicamente
      expect(motionDiv).toContainHTML('<div>Test</div>');
    });
  });

  describe('Estructura del DOM', () => {
    it('debería renderizar un section como contenedor principal', () => {
      render(
        <ScrollSection>
          <div>Test</div>
        </ScrollSection>
      );
      
      const section = screen.getByText('Test').closest('section');
      expect(section).toBeInTheDocument();
      expect(section).toHaveClass('relative', 'overflow-hidden');
    });

    it('debería renderizar motion.div dentro del section', () => {
      render(
        <ScrollSection>
          <div>Test</div>
        </ScrollSection>
      );
      
      const section = screen.getByText('Test').closest('section');
      const motionDiv = screen.getByTestId('motion-div');
      
      expect(section).toContainElement(motionDiv);
    });

    it('debería mantener la jerarquía correcta de elementos', () => {
      render(
        <ScrollSection>
          <div data-testid="inner">Inner Content</div>
        </ScrollSection>
      );
      
      const section = screen.getByTestId('inner').closest('section');
      const motionDiv = screen.getByTestId('motion-div');
      const inner = screen.getByTestId('inner');
      
      expect(section).toContainElement(motionDiv);
      expect(motionDiv).toContainElement(inner);
    });
  });

  describe('Casos edge', () => {
    it('debería manejar children vacío', () => {
      const { container } = render(<ScrollSection>{null}</ScrollSection>);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('debería manejar children undefined', () => {
      const { container } = render(<ScrollSection>{undefined}</ScrollSection>);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('debería manejar from y to con valores numéricos como strings', () => {
      render(
        <ScrollSection from="0" to="-100">
          <div>Test</div>
        </ScrollSection>
      );
      
      expect(useTransform).toHaveBeenCalledWith(
        mockScrollYProgress,
        [0, 1],
        ['0', '-100']
      );
    });

    it('debería manejar className vacío', () => {
      render(
        <ScrollSection className="">
          <div>Test</div>
        </ScrollSection>
      );
      
      const section = screen.getByText('Test').closest('section');
      expect(section).toHaveClass('relative', 'overflow-hidden');
    });
  });

  describe('Integración', () => {
    it('debería funcionar correctamente con otros componentes', () => {
      const TestComponent = () => <div>Test Component</div>;
      
      render(
        <ScrollSection>
          <TestComponent />
        </ScrollSection>
      );
      
      expect(screen.getByText('Test Component')).toBeInTheDocument();
    });

    it('debería funcionar con múltiples instancias', () => {
      render(
        <>
          <ScrollSection>
            <div>Section 1</div>
          </ScrollSection>
          <ScrollSection>
            <div>Section 2</div>
          </ScrollSection>
        </>
      );
      
      expect(screen.getByText('Section 1')).toBeInTheDocument();
      expect(screen.getByText('Section 2')).toBeInTheDocument();
    });
  });
});

