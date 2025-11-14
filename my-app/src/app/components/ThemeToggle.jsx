'use client';

import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Función para obtener el tema actual
    const getCurrentTheme = () => {
      // Verificar localStorage primero
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme === 'dark';
      }
      // Si no hay tema guardado, usar preferencia del sistema
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return true;
      }
      return false;
    };

    // Establecer el tema inicial
    const currentIsDark = getCurrentTheme();
    setIsDark(currentIsDark);
    
    if (currentIsDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Escuchar cambios en la preferencia del sistema (solo si no hay tema guardado)
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
      // Solo aplicar si no hay tema guardado en localStorage
      if (!localStorage.getItem('theme')) {
        if (e.matches) {
          document.documentElement.classList.add('dark');
          setIsDark(true);
        } else {
          document.documentElement.classList.remove('dark');
          setIsDark(false);
        }
      }
    };

    // Escuchar cambios (solo en navegadores modernos)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
    } else {
      // Fallback para navegadores antiguos
      mediaQuery.addListener(handleSystemThemeChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleSystemThemeChange);
      } else {
        mediaQuery.removeListener(handleSystemThemeChange);
      }
    };
  }, []);

  if (!mounted) return null; // 👈 evita render en SSR y primera hidratación

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="rounded-xl border px-4 py-2 text-sm font-medium shadow-sm transition"
      style={{
        backgroundColor: isDark ? 'rgb(39, 39, 42)' : 'rgb(244, 244, 245)',
        borderColor: isDark ? 'rgb(63, 63, 70)' : 'rgb(228, 228, 231)',
        color: isDark ? 'rgb(250, 250, 250)' : 'rgb(0, 0, 0)'
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = isDark ? 'rgb(63, 63, 70)' : 'rgb(228, 228, 231)';
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = isDark ? 'rgb(39, 39, 42)' : 'rgb(244, 244, 245)';
      }}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}