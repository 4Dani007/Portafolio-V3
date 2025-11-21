'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Extraer parámetros UTM de la URL
  const getUTMParams = () => {
    if (typeof window === 'undefined') return {};
    
    const params = new URLSearchParams(window.location.search);
    const utmParams = {};
    
    // Parámetros UTM estándar
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    utmKeys.forEach(key => {
      const value = params.get(key);
      if (value) {
        utmParams[key] = value;
      }
    });
    
    return utmParams;
  };

  // Track page views when route changes (Next.js App Router)
  useEffect(() => {
    if (gaId && typeof window !== 'undefined' && window.gtag) {
      const utmParams = getUTMParams();
      
      window.gtag('config', gaId, {
        page_path: pathname,
        ...utmParams, // Incluir parámetros UTM automáticamente
      });
    }
  }, [pathname, searchParams, gaId]);

  // Detectar si Google Analytics está bloqueado (útil para debugging)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && gaId) {
      const checkGA = setTimeout(() => {
        if (typeof window !== 'undefined' && !window.gtag) {
          console.warn('⚠️ Google Analytics puede estar bloqueado por una extensión del navegador');
          console.log('💡 Desactiva temporalmente bloqueadores de anuncios (uBlock, Privacy Badger, etc.) para probar');
        } else if (typeof window !== 'undefined' && window.gtag) {
          console.log('✅ Google Analytics cargado correctamente');
        }
      }, 2000);

      return () => clearTimeout(checkGA);
    }
  }, [gaId]);

  if (!gaId) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        onError={(e) => {
          if (process.env.NODE_ENV === 'development') {
            console.error('❌ Error al cargar Google Analytics:', e);
            console.log('💡 Esto puede deberse a una extensión bloqueadora');
          }
        }}
        onLoad={() => {
          if (process.env.NODE_ENV === 'development') {
            console.log('✅ Script de Google Analytics cargado');
          }
        }}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
              send_page_view: true,
              ${process.env.NODE_ENV === 'development' ? 'debug_mode: true,' : ''}
            });
          `,
        }}
      />
    </>
  );
}

