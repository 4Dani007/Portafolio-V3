'use client';
import {Menu, X} from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslations } from 'next-intl';
import { useTheme } from '../../hooks/useTheme';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { isDark, mounted } = useTheme();
    const t = useTranslations();

    // Evitar render hasta que esté montado para que las clases dark funcionen
    if (!mounted) {
        return (
            <nav className="fixed top-0 left-0 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 z-50 transition-colors">
                <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
                    <a href="/" className="text-xl font-semibold text-black dark:text-white transition-colors">
                        Daniel Bonilla Mosquera - DEV
                    </a>
                </div>
            </nav>
        );
    }

  return (
    <nav 
      className="fixed top-0 left-0 w-full border-b z-50 transition-colors"
      style={{
        backgroundColor: isDark ? 'rgb(24, 24, 27)' : 'rgb(255, 255, 255)',
        borderColor: isDark ? 'rgb(39, 39, 42)' : 'rgb(228, 228, 231)'
      }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo / Título */}
        <a 
          href="/" 
          className="text-xl font-semibold transition-colors"
          style={{ color: isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)' }}
        >
          Daniel Bonilla Mosquera - DEV
        </a>

        {/* Enlaces (Desktop) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a 
            href="#" 
            className="transition"
            style={{ color: isDark ? 'rgb(209, 213, 219)' : 'rgb(0, 0, 0)' }}
            onMouseEnter={(e) => e.target.style.color = isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)'}
            onMouseLeave={(e) => e.target.style.color = isDark ? 'rgb(209, 213, 219)' : 'rgb(0, 0, 0)'}
          >
            Blog
          </a>
          <a 
            href="#" 
            className="transition"
            style={{ color: isDark ? 'rgb(209, 213, 219)' : 'rgb(0, 0, 0)' }}
            onMouseEnter={(e) => e.target.style.color = isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)'}
            onMouseLeave={(e) => e.target.style.color = isDark ? 'rgb(209, 213, 219)' : 'rgb(0, 0, 0)'}
          >
            {t('projects')}
          </a>
          <a 
            href="#" 
            className="transition"
            style={{ color: isDark ? 'rgb(209, 213, 219)' : 'rgb(0, 0, 0)' }}
            onMouseEnter={(e) => e.target.style.color = isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)'}
            onMouseLeave={(e) => e.target.style.color = isDark ? 'rgb(209, 213, 219)' : 'rgb(0, 0, 0)'}
          >
            {t('About Me')}
          </a>
          <a 
            href="#" 
            className="transition"
            style={{ color: isDark ? 'rgb(209, 213, 219)' : 'rgb(0, 0, 0)' }}
            onMouseEnter={(e) => e.target.style.color = isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)'}
            onMouseLeave={(e) => e.target.style.color = isDark ? 'rgb(209, 213, 219)' : 'rgb(0, 0, 0)'}
          >
            {t('contact')}
          </a>
          <ThemeToggle />
          <LanguageSwitcher />
        </div>

        {/* Botón Menú (Mobile) */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          style={{ color: isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)' }}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Overlay de fondo oscuro */}
      {menuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Sidebar móvil */}
      <div 
        className={`md:hidden fixed top-0 right-0 h-full w-64 z-50 shadow-xl transition-transform duration-300 ease-in-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          backgroundColor: isDark ? 'rgb(24, 24, 27)' : 'rgb(255, 255, 255)'
        }}
      >
        <div className="flex flex-col h-full">
          {/* Header de la sidebar con botón cerrar */}
          <div 
            className="flex items-center justify-between p-4 border-b"
            style={{ borderColor: isDark ? 'rgb(39, 39, 42)' : 'rgb(228, 228, 231)' }}
          >
            <span 
              className="text-lg font-semibold"
              style={{ color: isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)' }}
            >
              Menú
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              style={{ color: isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)' }}
            >
              <X size={22} />
            </button>
          </div>

          {/* Contenido de la sidebar */}
          <div className="flex flex-col gap-2 p-4 flex-1">
            <a 
              href="#" 
              className="hover:bg-zinc-100 dark:hover:bg-zinc-800 px-4 py-3 rounded-lg transition"
              style={{ color: isDark ? 'rgb(209, 213, 219)' : 'rgb(0, 0, 0)' }}
              onMouseEnter={(e) => {
                e.target.style.color = isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)';
                e.target.style.backgroundColor = isDark ? 'rgb(39, 39, 42)' : 'rgb(244, 244, 245)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = isDark ? 'rgb(209, 213, 219)' : 'rgb(0, 0, 0)';
                e.target.style.backgroundColor = 'transparent';
              }}
              onClick={() => setMenuOpen(false)}
            >
              Blog
            </a>
            <a 
              href="#" 
              className="hover:bg-zinc-100 dark:hover:bg-zinc-800 px-4 py-3 rounded-lg transition"
              style={{ color: isDark ? 'rgb(209, 213, 219)' : 'rgb(0, 0, 0)' }}
              onMouseEnter={(e) => {
                e.target.style.color = isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)';
                e.target.style.backgroundColor = isDark ? 'rgb(39, 39, 42)' : 'rgb(244, 244, 245)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = isDark ? 'rgb(209, 213, 219)' : 'rgb(0, 0, 0)';
                e.target.style.backgroundColor = 'transparent';
              }}
              onClick={() => setMenuOpen(false)}
            >
              {t('projects')}
            </a>
            <a 
              href="#" 
              className="hover:bg-zinc-100 dark:hover:bg-zinc-800 px-4 py-3 rounded-lg transition"
              style={{ color: isDark ? 'rgb(209, 213, 219)' : 'rgb(0, 0, 0)' }}
              onMouseEnter={(e) => {
                e.target.style.color = isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)';
                e.target.style.backgroundColor = isDark ? 'rgb(39, 39, 42)' : 'rgb(244, 244, 245)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = isDark ? 'rgb(209, 213, 219)' : 'rgb(0, 0, 0)';
                e.target.style.backgroundColor = 'transparent';
              }}
              onClick={() => setMenuOpen(false)}
            >
              {t('About Me')}
            </a>
            <a 
              href="#" 
              className="hover:bg-zinc-100 dark:hover:bg-zinc-800 px-4 py-3 rounded-lg transition"
              style={{ color: isDark ? 'rgb(209, 213, 219)' : 'rgb(0, 0, 0)' }}
              onMouseEnter={(e) => {
                e.target.style.color = isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)';
                e.target.style.backgroundColor = isDark ? 'rgb(39, 39, 42)' : 'rgb(244, 244, 245)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = isDark ? 'rgb(209, 213, 219)' : 'rgb(0, 0, 0)';
                e.target.style.backgroundColor = 'transparent';
              }}
              onClick={() => setMenuOpen(false)}
            >
              {t('contact')}
            </a>
            
            {/* Separador */}
            <div 
              className="border-t my-4"
              style={{ borderColor: isDark ? 'rgb(39, 39, 42)' : 'rgb(228, 228, 231)' }}
            />
            
            {/* Controles */}
            <div className="flex flex-col gap-3 px-4">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}