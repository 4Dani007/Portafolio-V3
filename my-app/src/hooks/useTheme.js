'use client';

import { useState, useEffect } from 'react';

/**
 * Hook personalizado para detectar y observar cambios en el tema
 * Evita duplicación de MutationObserver en múltiples componentes
 */
export function useTheme() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Función para verificar el tema actual
    const checkTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
    };
    
    // Verificar el tema inicial
    checkTheme();
    
    // Observar cambios en la clase dark del documento
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  return { isDark, mounted };
}

