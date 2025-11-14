'use client';

import { usePathname} from 'next/navigation';
import Link from 'next/link';
import ES from 'country-flag-icons/react/3x2/ES';
import US from 'country-flag-icons/react/3x2/US';
import { useTheme } from '../../hooks/useTheme';

export default function LanguageSwitcher() {
    const pathname = usePathname();
    const { isDark } = useTheme();

    const isSpanish = pathname.startsWith('/es');

    const newPath = isSpanish 
    ? pathname.replace('/es', '/en')
    : `/es${pathname.replace('/en', '')}`;

    return (
        <Link
          href={newPath}
          className="px-3 py-1 rounded text-sm font-medium transition flex items-center gap-2"
          title={isSpanish ? 'Switch to English' : 'Cambiar a Español'}
          style={{
            backgroundColor: isDark ? 'rgb(39, 39, 42)' : 'rgb(244, 244, 245)',
            color: isDark ? 'rgb(250, 250, 250)' : 'rgb(0, 0, 0)'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = isDark ? 'rgb(63, 63, 70)' : 'rgb(228, 228, 231)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = isDark ? 'rgb(39, 39, 42)' : 'rgb(244, 244, 245)';
          }}
        >
          {isSpanish ? (
            <ES className="w-5 h-auto" />
          ) : (
            <US className="w-5 h-auto" />
          )}
          <span>{isSpanish ? 'EN' : 'ES'}</span>
        </Link>
      );
    }