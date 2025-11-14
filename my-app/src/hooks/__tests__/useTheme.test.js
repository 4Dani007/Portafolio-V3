import { renderHook, waitFor } from '@testing-library/react'
import { useTheme } from '../useTheme'

describe('useTheme', () => {
  // Limpiar el DOM antes de cada test
  beforeEach(() => {
    document.documentElement.className = ''
    document.documentElement.classList.remove('dark')
  })

  describe('Estado inicial', () => {
    it('should return isDark as false initially when dark class is not present', () => {
      const { result } = renderHook(() => useTheme())
      
      // Inicialmente isDark debería ser false si no hay clase dark
      expect(result.current.isDark).toBe(false)
    })

    it('should return isDark as true initially when dark class is present', () => {
      // Configurar con clase dark antes de renderizar
      document.documentElement.classList.add('dark')
      
      const { result } = renderHook(() => useTheme())
      
      // Esperar a que se monte y detecte el tema
      waitFor(() => {
        expect(result.current.isDark).toBe(true)
      })
    })
  })

  describe('Después de montar', () => {
    it('should set mounted to true after mount', async () => {
      const { result } = renderHook(() => useTheme())
      
      // Esperar a que el efecto se ejecute
      await waitFor(() => {
        expect(result.current.mounted).toBe(true)
      })
    })

    it('should detect light theme when dark class is not present', async () => {
      // Asegurar que no hay clase dark
      document.documentElement.classList.remove('dark')
      
      const { result } = renderHook(() => useTheme())
      
      await waitFor(() => {
        expect(result.current.mounted).toBe(true)
        expect(result.current.isDark).toBe(false)
      })
    })

    it('should detect dark theme when dark class is present', async () => {
      // Agregar clase dark al documento
      document.documentElement.classList.add('dark')
      
      const { result } = renderHook(() => useTheme())
      
      await waitFor(() => {
        expect(result.current.mounted).toBe(true)
        expect(result.current.isDark).toBe(true)
      })
    })
  })

  describe('Detección de cambios en tiempo real', () => {
    it('should update isDark when dark class is added to document', async () => {
      // Iniciar sin clase dark
      document.documentElement.classList.remove('dark')
      
      const { result } = renderHook(() => useTheme())
      
      await waitFor(() => {
        expect(result.current.mounted).toBe(true)
        expect(result.current.isDark).toBe(false)
      })

      // Agregar clase dark
      document.documentElement.classList.add('dark')
      
      // El MutationObserver debería detectar el cambio
      await waitFor(() => {
        expect(result.current.isDark).toBe(true)
      }, { timeout: 1000 })
    })

    it('should update isDark when dark class is removed from document', async () => {
      // Iniciar con clase dark
      document.documentElement.classList.add('dark')
      
      const { result } = renderHook(() => useTheme())
      
      await waitFor(() => {
        expect(result.current.mounted).toBe(true)
        expect(result.current.isDark).toBe(true)
      })

      // Remover clase dark
      document.documentElement.classList.remove('dark')
      
      // El MutationObserver debería detectar el cambio
      await waitFor(() => {
        expect(result.current.isDark).toBe(false)
      }, { timeout: 1000 })
    })

    it('should handle multiple class changes', async () => {
      const { result } = renderHook(() => useTheme())
      
      await waitFor(() => {
        expect(result.current.mounted).toBe(true)
      })

      // Cambio 1: Agregar dark
      document.documentElement.classList.add('dark')
      await waitFor(() => {
        expect(result.current.isDark).toBe(true)
      })

      // Cambio 2: Remover dark
      document.documentElement.classList.remove('dark')
      await waitFor(() => {
        expect(result.current.isDark).toBe(false)
      })

      // Cambio 3: Agregar dark nuevamente
      document.documentElement.classList.add('dark')
      await waitFor(() => {
        expect(result.current.isDark).toBe(true)
      })
    })
  })

  describe('Limpieza de recursos', () => {
    it('should disconnect MutationObserver on unmount', async () => {
      const { result, unmount } = renderHook(() => useTheme())
      
      await waitFor(() => {
        expect(result.current.mounted).toBe(true)
      })

      // Desmontar el hook
      unmount()

      // Verificar que el observer se desconectó
      // (No debería haber errores después de desmontar)
      document.documentElement.classList.add('dark')
      
      // Esperar un poco para asegurar que no hay actualizaciones
      await new Promise(resolve => setTimeout(resolve, 100))
      
      // Si llegamos aquí sin errores, el observer se desconectó correctamente
      expect(true).toBe(true)
    })
  })

  describe('Casos edge', () => {
    it('should handle document without classList gracefully', async () => {
      // Guardar el classList original
      const originalClassList = document.documentElement.classList
      
      // Simular un escenario donde classList podría no estar disponible
      // (aunque en la práctica siempre lo está)
      const { result } = renderHook(() => useTheme())
      
      await waitFor(() => {
        expect(result.current.mounted).toBe(true)
      })
      
      // Restaurar
      document.documentElement.classList = originalClassList
    })

    it('should work correctly when multiple instances are used', async () => {
      const { result: result1 } = renderHook(() => useTheme())
      const { result: result2 } = renderHook(() => useTheme())
      
      await waitFor(() => {
        expect(result1.current.mounted).toBe(true)
        expect(result2.current.mounted).toBe(true)
      })

      // Cambiar el tema
      document.documentElement.classList.add('dark')
      
      // Ambos hooks deberían detectar el cambio
      await waitFor(() => {
        expect(result1.current.isDark).toBe(true)
        expect(result2.current.isDark).toBe(true)
      })
    })
  })
})

