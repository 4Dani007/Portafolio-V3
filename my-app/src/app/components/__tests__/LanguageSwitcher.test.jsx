import { render, screen, fireEvent } from '@testing-library/react'
import LanguageSwitcher from '../LanguageSwitcher'
import { usePathname } from 'next/navigation'
import { useTheme } from '../../../hooks/useTheme'

// Mock de next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/en'),
  Link: ({ children, href, ...props }) => <a href={href} {...props}>{children}</a>,
}))

// Mock del hook useTheme
jest.mock('../../../hooks/useTheme', () => ({
  useTheme: jest.fn(() => ({
    isDark: false,
    mounted: true,
  })),
}))

// Mock de country-flag-icons
jest.mock('country-flag-icons/react/3x2/ES', () => {
  return function ES(props) {
    return <svg data-testid="es-flag" {...props} />
  }
})

jest.mock('country-flag-icons/react/3x2/US', () => {
  return function US(props) {
    return <svg data-testid="us-flag" {...props} />
  }
})

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    usePathname.mockReturnValue('/en')
    useTheme.mockReturnValue({
      isDark: false,
      mounted: true,
    })
  })

  describe('Renderizado básico', () => {
    it('should render the language switcher link', () => {
      render(<LanguageSwitcher />)
      
      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()
    })

    it('should render text indicating target language', () => {
      render(<LanguageSwitcher />)
      
      // Cuando está en inglés, debería mostrar "ES" para cambiar a español
      expect(screen.getByText('ES')).toBeInTheDocument()
    })

    it('should render US flag when current language is English', () => {
      usePathname.mockReturnValue('/en')
      
      render(<LanguageSwitcher />)
      
      const usFlag = screen.getByTestId('us-flag')
      expect(usFlag).toBeInTheDocument()
      
      // No debería tener la bandera ES
      expect(screen.queryByTestId('es-flag')).not.toBeInTheDocument()
    })

    it('should render ES flag when current language is Spanish', () => {
      usePathname.mockReturnValue('/es')
      
      render(<LanguageSwitcher />)
      
      const esFlag = screen.getByTestId('es-flag')
      expect(esFlag).toBeInTheDocument()
      
      // No debería tener la bandera US
      expect(screen.queryByTestId('us-flag')).not.toBeInTheDocument()
    })
  })

  describe('Detección del idioma actual', () => {
    it('should detect English from pathname starting with /en', () => {
      usePathname.mockReturnValue('/en')
      
      render(<LanguageSwitcher />)
      
      expect(screen.getByText('ES')).toBeInTheDocument()
      expect(screen.getByTestId('us-flag')).toBeInTheDocument()
    })

    it('should detect Spanish from pathname starting with /es', () => {
      usePathname.mockReturnValue('/es')
      
      render(<LanguageSwitcher />)
      
      expect(screen.getByText('EN')).toBeInTheDocument()
      expect(screen.getByTestId('es-flag')).toBeInTheDocument()
    })

    it('should detect Spanish from nested Spanish path', () => {
      usePathname.mockReturnValue('/es/about')
      
      render(<LanguageSwitcher />)
      
      expect(screen.getByText('EN')).toBeInTheDocument()
      expect(screen.getByTestId('es-flag')).toBeInTheDocument()
    })

    it('should detect English from nested English path', () => {
      usePathname.mockReturnValue('/en/projects')
      
      render(<LanguageSwitcher />)
      
      expect(screen.getByText('ES')).toBeInTheDocument()
      expect(screen.getByTestId('us-flag')).toBeInTheDocument()
    })
  })

  describe('Generación del nuevo path', () => {
    it('should generate Spanish path when current is English', () => {
      usePathname.mockReturnValue('/en')
      
      render(<LanguageSwitcher />)
      
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/es')
    })

    it('should generate English path when current is Spanish', () => {
      usePathname.mockReturnValue('/es')
      
      render(<LanguageSwitcher />)
      
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/en')
    })

    it('should preserve path segments when switching from English to Spanish', () => {
      usePathname.mockReturnValue('/en/projects')
      
      render(<LanguageSwitcher />)
      
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/es/projects')
    })

    it('should preserve path segments when switching from Spanish to English', () => {
      usePathname.mockReturnValue('/es/about')
      
      render(<LanguageSwitcher />)
      
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/en/about')
    })

    it('should handle root path correctly', () => {
      usePathname.mockReturnValue('/en')
      
      render(<LanguageSwitcher />)
      
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/es')
    })

    it('should handle Spanish root path correctly', () => {
      usePathname.mockReturnValue('/es')
      
      render(<LanguageSwitcher />)
      
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/en')
    })
  })

  describe('Title attribute', () => {
    it('should show "Cambiar a Español" when current language is English', () => {
      usePathname.mockReturnValue('/en')
      
      render(<LanguageSwitcher />)
      
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('title', 'Cambiar a Español')
    })

    it('should show "Switch to English" when current language is Spanish', () => {
      usePathname.mockReturnValue('/es')
      
      render(<LanguageSwitcher />)
      
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('title', 'Switch to English')
    })
  })

  describe('Estilos adaptativos', () => {
    it('should apply light theme styles when isDark is false', () => {
      useTheme.mockReturnValue({
        isDark: false,
        mounted: true,
      })
      
      render(<LanguageSwitcher />)
      
      const link = screen.getByRole('link')
      
      expect(link).toHaveStyle({
        backgroundColor: 'rgb(244, 244, 245)',
        color: 'rgb(0, 0, 0)',
      })
    })

    it('should apply dark theme styles when isDark is true', () => {
      useTheme.mockReturnValue({
        isDark: true,
        mounted: true,
      })
      
      render(<LanguageSwitcher />)
      
      const link = screen.getByRole('link')
      
      expect(link).toHaveStyle({
        backgroundColor: 'rgb(39, 39, 42)',
        color: 'rgb(250, 250, 250)',
      })
    })

    it('should update styles when theme changes', () => {
      const { rerender } = render(<LanguageSwitcher />)
      
      let link = screen.getByRole('link')
      
      // Estilos iniciales (light)
      expect(link).toHaveStyle({
        backgroundColor: 'rgb(244, 244, 245)',
      })
      
      // Cambiar a dark
      useTheme.mockReturnValue({
        isDark: true,
        mounted: true,
      })
      
      rerender(<LanguageSwitcher />)
      
      link = screen.getByRole('link')
      expect(link).toHaveStyle({
        backgroundColor: 'rgb(39, 39, 42)',
      })
    })
  })

  describe('Hover effects', () => {
    it('should change background color on hover in light mode', () => {
      useTheme.mockReturnValue({
        isDark: false,
        mounted: true,
      })
      
      render(<LanguageSwitcher />)
      
      const link = screen.getByRole('link')
      
      // Hover
      fireEvent.mouseEnter(link)
      
      expect(link).toHaveStyle({
        backgroundColor: 'rgb(228, 228, 231)',
      })
      
      // Leave
      fireEvent.mouseLeave(link)
      
      expect(link).toHaveStyle({
        backgroundColor: 'rgb(244, 244, 245)',
      })
    })

    it('should change background color on hover in dark mode', () => {
      useTheme.mockReturnValue({
        isDark: true,
        mounted: true,
      })
      
      render(<LanguageSwitcher />)
      
      const link = screen.getByRole('link')
      
      // Hover
      fireEvent.mouseEnter(link)
      
      expect(link).toHaveStyle({
        backgroundColor: 'rgb(63, 63, 70)',
      })
      
      // Leave
      fireEvent.mouseLeave(link)
      
      expect(link).toHaveStyle({
        backgroundColor: 'rgb(39, 39, 42)',
      })
    })
  })

  describe('Clases CSS', () => {
    it('should have correct CSS classes', () => {
      render(<LanguageSwitcher />)
      
      const link = screen.getByRole('link')
      
      expect(link).toHaveClass('px-3')
      expect(link).toHaveClass('py-1')
      expect(link).toHaveClass('rounded')
      expect(link).toHaveClass('text-sm')
      expect(link).toHaveClass('font-medium')
      expect(link).toHaveClass('transition')
      expect(link).toHaveClass('flex')
      expect(link).toHaveClass('items-center')
      expect(link).toHaveClass('gap-2')
    })
  })

  describe('Bandera y texto', () => {
    it('should display ES flag and EN text when in Spanish', () => {
      usePathname.mockReturnValue('/es')
      
      render(<LanguageSwitcher />)
      
      expect(screen.getByTestId('es-flag')).toBeInTheDocument()
      expect(screen.getByText('EN')).toBeInTheDocument()
    })

    it('should display US flag and ES text when in English', () => {
      usePathname.mockReturnValue('/en')
      
      render(<LanguageSwitcher />)
      
      expect(screen.getByTestId('us-flag')).toBeInTheDocument()
      expect(screen.getByText('ES')).toBeInTheDocument()
    })

    it('should pass className to flag components', () => {
      usePathname.mockReturnValue('/en')
      
      render(<LanguageSwitcher />)
      
      const usFlag = screen.getByTestId('us-flag')
      expect(usFlag).toHaveClass('w-5')
      expect(usFlag).toHaveClass('h-auto')
    })
  })

  describe('Casos edge', () => {
    it('should handle pathname without locale prefix', () => {
      usePathname.mockReturnValue('/')
      
      render(<LanguageSwitcher />)
      
      // Debería tratar como inglés y mostrar opción para español
      expect(screen.getByText('ES')).toBeInTheDocument()
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/es')
    })

    it('should handle complex nested paths', () => {
      usePathname.mockReturnValue('/en/blog/my-post')
      
      render(<LanguageSwitcher />)
      
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/es/blog/my-post')
    })

    it('should handle Spanish complex nested paths', () => {
      usePathname.mockReturnValue('/es/blog/mi-post')
      
      render(<LanguageSwitcher />)
      
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/en/blog/mi-post')
    })

    it('should work correctly when useTheme returns mounted false', () => {
      useTheme.mockReturnValue({
        isDark: false,
        mounted: false,
      })
      
      render(<LanguageSwitcher />)
      
      // El componente debería renderizarse igual
      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()
    })
  })

  describe('Integración con useTheme', () => {
    it('should call useTheme hook', () => {
      render(<LanguageSwitcher />)
      
      expect(useTheme).toHaveBeenCalled()
    })

    it('should use isDark from useTheme for styles', () => {
      useTheme.mockReturnValue({
        isDark: true,
        mounted: true,
      })
      
      render(<LanguageSwitcher />)
      
      const link = screen.getByRole('link')
      expect(link).toHaveStyle({
        backgroundColor: 'rgb(39, 39, 42)',
      })
    })
  })

  describe('Integración con usePathname', () => {
    it('should call usePathname hook', () => {
      render(<LanguageSwitcher />)
      
      expect(usePathname).toHaveBeenCalled()
    })

    it('should react to pathname changes', () => {
      const { rerender } = render(<LanguageSwitcher />)
      
      // Inicialmente en inglés
      expect(screen.getByText('ES')).toBeInTheDocument()
      
      // Cambiar a español
      usePathname.mockReturnValue('/es')
      rerender(<LanguageSwitcher />)
      
      expect(screen.getByText('EN')).toBeInTheDocument()
    })
  })
})

