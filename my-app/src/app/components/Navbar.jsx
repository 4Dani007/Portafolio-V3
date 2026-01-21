'use client';
import {Menu, X} from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslations, useLocale } from 'next-intl';
import { useTheme } from '../../hooks/useTheme';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { isDark, mounted } = useTheme();
    const t = useTranslations();
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();

    // Detectar si estamos en la página principal
    const isHomePage = pathname === `/${locale}` || pathname === '/';

    // Función para navegar a secciones
    const handleNavigateToSection = (sectionId) => {
        setMenuOpen(false); // Cerrar sidebar en móvil
        
        if (isHomePage) {
            // Si estamos en la página principal, hacer scroll a la sección
            const element = document.getElementById(sectionId);
            if (element) {
                const offset = 80; // Altura de la navbar
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        } else {
            // Si estamos en otra página, navegar a la página principal con hash
            router.push(`/${locale}#${sectionId}`);
        }
    };

    // Evitar render hasta que esté montado para que las clases dark funcionen
    if (!mounted) {
        return (
            <nav className="fixed top-0 left-0 w-full border-b bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 z-50 transition-colors" style={{ backgroundColor: 'rgb(255, 255, 255)' }}>
                <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
                    <a href="/" className="text-xl font-semibold text-slate-900 dark:text-slate-100 transition-colors">
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
        backgroundColor: isDark ? 'rgb(15, 23, 42)' : 'rgb(255, 255, 255)',
        borderColor: isDark ? 'rgb(30, 41, 59)' : 'rgb(226, 232, 240)'
      }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo / Título */}
        <Link
          href={`/${locale}`}
          className="text-xl font-semibold transition-colors text-left"
          style={{ color: isDark ? 'rgb(241, 245, 249)' : 'rgb(26, 26, 26)' }}
        >
          Daniel Bonilla Mosquera - DEV
        </Link>

        {/* Enlaces (Desktop) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <button
            onClick={() => handleNavigateToSection('projects')}
            className="transition text-left"
            style={{ color: isDark ? 'rgb(203, 213, 225)' : 'rgb(74, 85, 104)' }}
            onMouseEnter={(e) => e.target.style.color = isDark ? 'rgb(59, 130, 246)' : 'rgb(0, 102, 204)'}
            onMouseLeave={(e) => e.target.style.color = isDark ? 'rgb(203, 213, 225)' : 'rgb(74, 85, 104)'}
          >
            {t('projects')}
          </button>
          <button
            onClick={() => handleNavigateToSection('about')}
            className="transition text-left"
            style={{ color: isDark ? 'rgb(203, 213, 225)' : 'rgb(74, 85, 104)' }}
            onMouseEnter={(e) => e.target.style.color = isDark ? 'rgb(59, 130, 246)' : 'rgb(0, 102, 204)'}
            onMouseLeave={(e) => e.target.style.color = isDark ? 'rgb(203, 213, 225)' : 'rgb(74, 85, 104)'}
          >
            {t('About Me')}
          </button>
          <Link
            href={`/${locale}/blog`}
            className="transition text-left"
            style={{ color: isDark ? 'rgb(203, 213, 225)' : 'rgb(74, 85, 104)' }}
            onMouseEnter={(e) => e.target.style.color = isDark ? 'rgb(59, 130, 246)' : 'rgb(0, 102, 204)'}
            onMouseLeave={(e) => e.target.style.color = isDark ? 'rgb(203, 213, 225)' : 'rgb(74, 85, 104)'}
          >
            {t('blog')}
          </Link>
          <button
            onClick={() => handleNavigateToSection('contact')}
            className="transition text-left"
            style={{ color: isDark ? 'rgb(203, 213, 225)' : 'rgb(74, 85, 104)' }}
            onMouseEnter={(e) => e.target.style.color = isDark ? 'rgb(59, 130, 246)' : 'rgb(0, 102, 204)'}
            onMouseLeave={(e) => e.target.style.color = isDark ? 'rgb(203, 213, 225)' : 'rgb(74, 85, 104)'}
          >
            {t('contact')}
          </button>
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
          backgroundColor: isDark ? 'rgb(15, 23, 42)' : 'rgb(255, 255, 255)'
        }}
      >
        <div className="flex flex-col h-full">
          {/* Header de la sidebar con botón cerrar */}
          <div 
            className="flex items-center justify-between p-4 border-b"
            style={{ borderColor: isDark ? 'rgb(30, 41, 59)' : 'rgb(226, 232, 240)' }}
          >
            <span 
              className="text-lg font-semibold"
              style={{ color: isDark ? 'rgb(241, 245, 249)' : 'rgb(26, 26, 26)' }}
            >
              Menú
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 rounded-lg transition"
              style={{ 
                color: isDark ? 'rgb(241, 245, 249)' : 'rgb(26, 26, 26)',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDark ? 'rgb(30, 41, 59)' : 'rgb(245, 247, 250)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <X size={22} />
            </button>
          </div>

          {/* Contenido de la sidebar */}
          <div className="flex flex-col gap-2 p-4 flex-1">
            <button
              onClick={() => handleNavigateToSection('projects')}
              className="px-4 py-3 rounded-lg transition text-left w-full"
              style={{ color: isDark ? 'rgb(203, 213, 225)' : 'rgb(74, 85, 104)' }}
              onMouseEnter={(e) => {
                e.target.style.color = isDark ? 'rgb(59, 130, 246)' : 'rgb(0, 102, 204)';
                e.target.style.backgroundColor = isDark ? 'rgb(30, 41, 59)' : 'rgb(230, 244, 255)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = isDark ? 'rgb(203, 213, 225)' : 'rgb(74, 85, 104)';
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              {t('projects')}
            </button>
            <button
              onClick={() => handleNavigateToSection('about')}
              className="px-4 py-3 rounded-lg transition text-left w-full"
              style={{ color: isDark ? 'rgb(203, 213, 225)' : 'rgb(74, 85, 104)' }}
              onMouseEnter={(e) => {
                e.target.style.color = isDark ? 'rgb(59, 130, 246)' : 'rgb(0, 102, 204)';
                e.target.style.backgroundColor = isDark ? 'rgb(30, 41, 59)' : 'rgb(230, 244, 255)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = isDark ? 'rgb(203, 213, 225)' : 'rgb(74, 85, 104)';
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              {t('About Me')}
            </button>
            <Link
              href={`/${locale}/blog`}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-3 rounded-lg transition text-left w-full"
              style={{ color: isDark ? 'rgb(203, 213, 225)' : 'rgb(74, 85, 104)' }}
              onMouseEnter={(e) => {
                e.target.style.color = isDark ? 'rgb(59, 130, 246)' : 'rgb(0, 102, 204)';
                e.target.style.backgroundColor = isDark ? 'rgb(30, 41, 59)' : 'rgb(230, 244, 255)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = isDark ? 'rgb(203, 213, 225)' : 'rgb(74, 85, 104)';
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              {t('blog')}
            </Link>
            <button
              onClick={() => handleNavigateToSection('contact')}
              className="px-4 py-3 rounded-lg transition text-left w-full"
              style={{ color: isDark ? 'rgb(203, 213, 225)' : 'rgb(74, 85, 104)' }}
              onMouseEnter={(e) => {
                e.target.style.color = isDark ? 'rgb(59, 130, 246)' : 'rgb(0, 102, 204)';
                e.target.style.backgroundColor = isDark ? 'rgb(30, 41, 59)' : 'rgb(230, 244, 255)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = isDark ? 'rgb(203, 213, 225)' : 'rgb(74, 85, 104)';
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              {t('contact')}
            </button>
            
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