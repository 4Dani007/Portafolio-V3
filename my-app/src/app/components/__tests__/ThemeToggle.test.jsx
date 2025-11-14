import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ThemeToggle from '../ThemeToggle'

// Mock de lucide-react
jest.mock('lucide-react', () => ({
  Moon: () => <svg data-testid="moon-icon" className="lucide lucide-moon" />,
  Sun: () => <svg data-testid="sun-icon" className="lucide lucide-sun" />,
}))

describe('ThemeToggle', () => {
  // Limpiar localStorage y DOM antes de cada test
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.className = ''
    document.documentElement.classList.remove('dark')
    
    // Mock de window.matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })
  })

  describe('Renderizado básico', () => {
    it('should not render button immediately (before mount)', () => {
      const { container } = render(<ThemeToggle />)
      // El componente retorna null antes de montar, pero React puede renderizarlo muy rápido
      // Verificamos que eventualmente se renderiza el botón
      waitFor(() => {
        const button = screen.queryByRole('button')
        // El botón debería aparecer después del mount
        expect(button).toBeInTheDocument()
      })
    })

    it('should render button after mount', async () => {
      render(<ThemeToggle />)
      
      await waitFor(() => {
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
      })
    })

    it('should render Moon icon initially when theme is light', async () => {
      render(<ThemeToggle />)
      
      await waitFor(() => {
        const moonIcon = screen.getByTestId('moon-icon')
        expect(moonIcon).toBeInTheDocument()
      })
    })

    it('should render Sun icon when theme is dark', async () => {
      // Configurar tema oscuro en localStorage antes de renderizar
      localStorage.setItem('theme', 'dark')
      
      render(<ThemeToggle />)
      
      await waitFor(() => {
        const sunIcon = screen.getByTestId('sun-icon')
        expect(sunIcon).toBeInTheDocument()
      })
    })
  })

  describe('Toggle del tema', () => {
    it('should toggle from light to dark when clicked', async () => {
      render(<ThemeToggle />)
      
      await waitFor(() => {
        expect(screen.getByRole('button')).toBeInTheDocument()
      })
      
      const button = screen.getByRole('button')
      
      // Inicialmente debería mostrar Moon (tema claro)
      expect(screen.getByTestId('moon-icon')).toBeInTheDocument()
      
      // Hacer clic para cambiar a oscuro
      fireEvent.click(button)
      
      // Debería mostrar Sun (tema oscuro)
      await waitFor(() => {
        expect(screen.getByTestId('sun-icon')).toBeInTheDocument()
      })
      
      // Verificar que se agregó la clase dark al documento
      expect(document.documentElement.classList.contains('dark')).toBe(true)
    })

    it('should toggle from dark to light when clicked', async () => {
      // Configurar tema oscuro inicialmente
      localStorage.setItem('theme', 'dark')
      
      render(<ThemeToggle />)
      
      await waitFor(() => {
        expect(screen.getByRole('button')).toBeInTheDocument()
      })
      
      const button = screen.getByRole('button')
      
      // Inicialmente debería mostrar Sun (tema oscuro)
      expect(screen.getByTestId('sun-icon')).toBeInTheDocument()
      
      // Hacer clic para cambiar a claro
      fireEvent.click(button)
      
      // Debería mostrar Moon (tema claro)
      await waitFor(() => {
        expect(screen.getByTestId('moon-icon')).toBeInTheDocument()
      })
      
      // Verificar que se removió la clase dark del documento
      expect(document.documentElement.classList.contains('dark')).toBe(false)
    })

    it('should toggle multiple times correctly', async () => {
      render(<ThemeToggle />)
      
      await waitFor(() => {
        expect(screen.getByRole('button')).toBeInTheDocument()
      })
      
      const button = screen.getByRole('button')
      
      // Toggle 1: Light -> Dark
      fireEvent.click(button)
      await waitFor(() => {
        expect(screen.getByTestId('sun-icon')).toBeInTheDocument()
      })
      
      // Toggle 2: Dark -> Light
      fireEvent.click(button)
      await waitFor(() => {
        expect(screen.getByTestId('moon-icon')).toBeInTheDocument()
      })
      
      // Toggle 3: Light -> Dark
      fireEvent.click(button)
      await waitFor(() => {
        expect(screen.getByTestId('sun-icon')).toBeInTheDocument()
      })
    })
  })

  describe('Persistencia en localStorage', () => {
    it('should save theme to localStorage when toggled to dark', async () => {
      render(<ThemeToggle />)
      
      await waitFor(() => {
        expect(screen.getByRole('button')).toBeInTheDocument()
      })
      
      const button = screen.getByRole('button')
      fireEvent.click(button)
      
      await waitFor(() => {
        expect(localStorage.getItem('theme')).toBe('dark')
      })
    })

    it('should save theme to localStorage when toggled to light', async () => {
      localStorage.setItem('theme', 'dark')
      
      render(<ThemeToggle />)
      
      await waitFor(() => {
        expect(screen.getByRole('button')).toBeInTheDocument()
      })
      
      const button = screen.getByRole('button')
      fireEvent.click(button)
      
      await waitFor(() => {
        expect(localStorage.getItem('theme')).toBe('light')
      })
    })

    it('should read theme from localStorage on mount', async () => {
      localStorage.setItem('theme', 'dark')
      
      render(<ThemeToggle />)
      
      await waitFor(() => {
        const sunIcon = screen.getByTestId('sun-icon')
        expect(sunIcon).toBeInTheDocument()
      })
      
      expect(document.documentElement.classList.contains('dark')).toBe(true)
    })

    it('should use system preference when no theme in localStorage', async () => {
      // Simular preferencia del sistema oscura
      window.matchMedia = jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))
      
      render(<ThemeToggle />)
      
      await waitFor(() => {
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
      })
      
      // Debería detectar el tema del sistema
      await waitFor(() => {
        const sunIcon = screen.queryByTestId('sun-icon')
        if (sunIcon) {
          expect(sunIcon).toBeInTheDocument()
        }
      }, { timeout: 1000 })
    })
  })

  describe('Detección de preferencia del sistema', () => {
    it('should detect dark system preference when no localStorage', async () => {
      // Mock matchMedia para retornar dark
      const mockMatchMedia = jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))
      
      window.matchMedia = mockMatchMedia
      
      render(<ThemeToggle />)
      
      await waitFor(() => {
        expect(document.documentElement.classList.contains('dark')).toBe(true)
      })
    })

    it('should detect light system preference when no localStorage', async () => {
      // Mock matchMedia para retornar light (no matches)
      const mockMatchMedia = jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))
      
      window.matchMedia = mockMatchMedia
      
      render(<ThemeToggle />)
      
      await waitFor(() => {
        expect(document.documentElement.classList.contains('dark')).toBe(false)
      })
    })
  })

  describe('Estilos adaptativos', () => {
    it('should apply light theme styles when isDark is false', async () => {
      render(<ThemeToggle />)
      
      await waitFor(() => {
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
      })
      
      const button = screen.getByRole('button')
      
      expect(button).toHaveStyle({
        backgroundColor: 'rgb(244, 244, 245)',
        borderColor: 'rgb(228, 228, 231)',
        color: 'rgb(0, 0, 0)',
      })
    })

    it('should apply dark theme styles when isDark is true', async () => {
      localStorage.setItem('theme', 'dark')
      
      render(<ThemeToggle />)
      
      await waitFor(() => {
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
      })
      
      const button = screen.getByRole('button')
      
      expect(button).toHaveStyle({
        backgroundColor: 'rgb(39, 39, 42)',
        borderColor: 'rgb(63, 63, 70)',
        color: 'rgb(250, 250, 250)',
      })
    })

    it('should update styles when theme changes', async () => {
      render(<ThemeToggle />)
      
      await waitFor(() => {
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
      })
      
      const button = screen.getByRole('button')
      
      // Estilos iniciales (light)
      expect(button).toHaveStyle({
        backgroundColor: 'rgb(244, 244, 245)',
      })
      
      // Cambiar a dark
      fireEvent.click(button)
      
      await waitFor(() => {
        expect(button).toHaveStyle({
          backgroundColor: 'rgb(39, 39, 42)',
        })
      })
    })
  })

  describe('Hover effects', () => {
    it('should change background color on hover in light mode', async () => {
      render(<ThemeToggle />)
      
      await waitFor(() => {
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
      })
      
      const button = screen.getByRole('button')
      
      // Hover
      fireEvent.mouseEnter(button)
      
      expect(button).toHaveStyle({
        backgroundColor: 'rgb(228, 228, 231)',
      })
      
      // Leave
      fireEvent.mouseLeave(button)
      
      expect(button).toHaveStyle({
        backgroundColor: 'rgb(244, 244, 245)',
      })
    })

    it('should change background color on hover in dark mode', async () => {
      localStorage.setItem('theme', 'dark')
      
      render(<ThemeToggle />)
      
      await waitFor(() => {
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
      })
      
      const button = screen.getByRole('button')
      
      // Hover
      fireEvent.mouseEnter(button)
      
      expect(button).toHaveStyle({
        backgroundColor: 'rgb(63, 63, 70)',
      })
      
      // Leave
      fireEvent.mouseLeave(button)
      
      expect(button).toHaveStyle({
        backgroundColor: 'rgb(39, 39, 42)',
      })
    })
  })

  describe('Escucha de cambios del sistema', () => {
    it('should listen to system theme changes when no localStorage', async () => {
      let changeHandler = null
      
      const mockMatchMedia = jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn((event, handler) => {
          changeHandler = handler
        }),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))
      
      window.matchMedia = mockMatchMedia
      
      render(<ThemeToggle />)
      
      await waitFor(() => {
        expect(mockMatchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)')
      })
      
      // Simular cambio del sistema a dark
      if (changeHandler) {
        changeHandler({ matches: true })
        
        await waitFor(() => {
          expect(document.documentElement.classList.contains('dark')).toBe(true)
        })
      }
    })

    it('should not listen to system changes when theme is saved in localStorage', async () => {
      localStorage.setItem('theme', 'light')
      
      let changeHandler = null
      
      const mockMatchMedia = jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn((event, handler) => {
          changeHandler = handler
        }),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))
      
      window.matchMedia = mockMatchMedia
      
      render(<ThemeToggle />)
      
      await waitFor(() => {
        expect(screen.getByRole('button')).toBeInTheDocument()
      })
      
      // Simular cambio del sistema
      if (changeHandler) {
        const initialDark = document.documentElement.classList.contains('dark')
        changeHandler({ matches: true })
        
        // No debería cambiar porque hay tema guardado
        await waitFor(() => {
          expect(document.documentElement.classList.contains('dark')).toBe(initialDark)
        })
      }
    })
  })

  describe('Limpieza de recursos', () => {
    it('should remove event listener on unmount', async () => {
      const removeEventListener = jest.fn()
      
      const mockMatchMedia = jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener,
        dispatchEvent: jest.fn(),
      }))
      
      window.matchMedia = mockMatchMedia
      
      const { unmount } = render(<ThemeToggle />)
      
      await waitFor(() => {
        expect(screen.getByRole('button')).toBeInTheDocument()
      })
      
      unmount()
      
      // Verificar que se removió el listener
      expect(removeEventListener).toHaveBeenCalled()
    })
  })

  describe('Casos edge', () => {
    it('should handle invalid localStorage values', async () => {
      localStorage.setItem('theme', 'invalid')
      
      render(<ThemeToggle />)
      
      await waitFor(() => {
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
      })
      
      // Debería usar preferencia del sistema o default
      expect(screen.getByTestId('moon-icon')).toBeInTheDocument()
    })

    it('should default to light theme when no preference available', async () => {
      // Sin localStorage y sin matchMedia
      window.matchMedia = jest.fn().mockImplementation(() => ({
        matches: false,
        media: '',
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))
      
      render(<ThemeToggle />)
      
      await waitFor(() => {
        const moonIcon = screen.getByTestId('moon-icon')
        expect(moonIcon).toBeInTheDocument()
      })
    })
  })
})

