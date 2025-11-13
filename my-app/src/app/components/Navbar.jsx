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
    <nav className="fixed top-0 left-0 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 z-50 transition-colors">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo / Título */}
        <a href="/" className="text-xl font-semibold text-black dark:text-white transition-colors">
          Daniel Bonilla Mosquera - DEV
        </a>

        {/* Enlaces (Desktop) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#" className="text-black dark:text-gray-300 hover:text-black dark:hover:text-white transition">
            Blog
          </a>
          <a href="#" className="text-black dark:text-gray-300 hover:text-black dark:hover:text-white transition">
            {t('projects')}
          </a>
          <a href="#" className="text-black dark:text-gray-300 hover:text-black dark:hover:text-white transition">
            {t('About Me')}
          </a>
          <a href="#" className="text-black dark:text-gray-300 hover:text-black dark:hover:text-white transition">
            {t('contact')}
          </a>
          <ThemeToggle />
          <LanguageSwitcher />
        </div>

        {/* Botón Menú (Mobile) */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-black dark:text-white transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Menú desplegable móvil */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 py-4 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-colors">
          <a href="#" className="text-black dark:text-gray-300 hover:text-black dark:hover:text-white transition">
            Blog
          </a>
          <a href="#" className="text-black dark:text-gray-300 hover:text-black dark:hover:text-white transition">
            {t('projects')}
          </a>
          <a href="#" className="text-black dark:text-gray-300 hover:text-black dark:hover:text-white transition">
            {t('About Me')}
          </a>
          <a href="#" className="text-black dark:text-gray-300 hover:text-black dark:hover:text-white transition">
            {t('contact')}
          </a>
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      )}
    </nav>
  );
}