'use client';

import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  if (!mounted) return null; // 👈 evita render en SSR y primera hidratación

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="rounded-xl border px-4 py-2 text-sm font-medium shadow-sm
      bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-50 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}