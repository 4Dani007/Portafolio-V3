'use client';

import { usePathname} from 'next/navigation';
import Link from 'next/link';
import ES from 'country-flag-icons/react/3x2/ES';
import US from 'country-flag-icons/react/3x2/US';

export default function LanguageSwitcher() {
    const pathname = usePathname();

    const isSpanish = pathname.startsWith('/es');

    const newPath = isSpanish 
    ? pathname.replace('/es', '/en')
    : `/es${pathname.replace('/en', '')}`;

    return (
        <Link
          href={newPath}
          className="px-3 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-sm font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition flex items-center gap-2"
          title={isSpanish ? 'Switch to English' : 'Cambiar a Español'}
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