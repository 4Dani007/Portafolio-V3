'use client';
import Navbar from '../components/Navbar';
import { useTranslations } from 'next-intl';


export default function HomePage() {
  const t = useTranslations();

  return (
    <>
    <Navbar/>
    <main className="flex flex-col items-center justify-center py-32 text-center">
      <h1 className="text-3xl font-bold">{t('name')}</h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        {t('description')}
      </p>
    </main>
    </>
  );
}