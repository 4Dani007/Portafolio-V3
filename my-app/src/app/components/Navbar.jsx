'use client';
import {Menu, X} from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslations } from 'next-intl';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const t = useTranslations();

    
  return (
    <nav className="fixed top-0 left-0 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/80 backdrop-blur-md z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo / Título */}
        <a href="/" className="text-xl font-semibold text-foreground">
          Daniel Bonilla Mosquera - DEV
        </a>

        {/* Enlaces (Desktop) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#" className="hover:text-zinc-600 dark:hover:text-zinc-300 transition">Blog</a>
          <a href="#" className="hover:text-zinc-600 dark:hover:text-zinc-300 transition">{t('projects')}</a>
          <a href="#" className="hover:text-zinc-600 dark:hover:text-zinc-300 transition">{t('About Me')}</a>
          <a href="#" className="hover:text-zinc-600 dark:hover:text-zinc-300 transition">{t('contact')}</a>
          <ThemeToggle />
          <LanguageSwitcher />
        </div>

        {/* Botón Menú (Mobile) */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Menú desplegable móvil */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 py-4 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
          <a href="#" className="hover:text-zinc-600 dark:hover:text-zinc-300 transition">Inicio</a>
          <a href="#" className="hover:text-zinc-600 dark:hover:text-zinc-300 transition">Proyectos</a>
          <a href="#" className="hover:text-zinc-600 dark:hover:text-zinc-300 transition">Contacto</a>
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      )}
    </nav>
  );
}