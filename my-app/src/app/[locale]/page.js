'use client';
import Navbar from '../components/Navbar';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useTheme } from '../../hooks/useTheme';


export default function HomePage() {
  const t = useTranslations();
  const { isDark } = useTheme();

  return (
    <>
    <Navbar/>
    <div  className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-6xl mx-auto"> {/* 👈 max-w-6xl limita el ancho máximo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

      {/* Columna izquierda */}
      <div className="flex flex-col justify-center space-y-6 max-w-lg">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            {t('introduction')}
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            {t('description')}
          </p>
        </div>

        {/* Columna derecha */}
          <div className="flex justify-center">
            <div className="relative max-w-md w-full h-auto">
              {!isDark ? (
                /* Imagen para modo claro */
                <Image 
                  src="/images/sketch-draw-white.webp"
                  alt="Sketch drawing"
                  width={500}
                  height={500}
                  className="rounded-lg shadow-xl w-full h-auto transition-opacity"
                  priority
                />
              ) : (
                /* Imagen para modo oscuro */
                <Image 
                  src="/images/sketch-draw.png"
                  alt="Sketch drawing"
                  width={500}
                  height={500}
                  className="rounded-lg shadow-xl w-full h-auto transition-opacity"
                  priority
                />
              )}
            </div>
          </div>
      </div>
      </div>
    </div>
    </>
  );
}