import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import '../globals.css';
import GoogleAnalytics from '../components/GoogleAnalytics';

// Metadata dinámica para SEO
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isES = locale === 'es';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dev-4daniel.vercel.app';
  
  return {
    title: isES 
      ? 'Daniel Bonilla Mosquera - Desarrollador Full Stack | Aplicaciones web y automatización'
      : 'Daniel Bonilla Mosquera - Full Stack Developer | Web apps and automation',
    description: isES
      ? 'Desarrollo aplicaciones web a medida, automatizo procesos e integro APIs para empresas y emprendedores. React, Next.js y Python.'
      : 'I build custom web applications, automate processes, and integrate APIs for businesses and entrepreneurs. React, Next.js, and Python.',
    keywords: isES
      ? 'desarrollador full stack, aplicaciones web, automatización, APIs, React, Next.js, Python, sistemas a medida, Colombia'
      : 'full stack developer, web applications, automation, APIs, React, Next.js, Python, custom systems',
    authors: [{ name: 'Daniel Bonilla Mosquera' }],
    creator: 'Daniel Bonilla Mosquera',
    openGraph: {
      type: 'website',
      locale: locale,
      url: `${baseUrl}/${locale}`,
      siteName: 'Daniel Bonilla - Portfolio',
      title: isES 
        ? 'Daniel Bonilla Mosquera - Desarrollador Full Stack'
        : 'Daniel Bonilla Mosquera - Full Stack Developer',
      description: isES
        ? 'Aplicaciones web a medida, automatización de procesos e integración de APIs para empresas'
        : 'Custom web applications, process automation, and API integrations for businesses',
      images: [
        {
          url: `${baseUrl}/images/sketch-draw.png`,
          width: 1200,
          height: 630,
          alt: 'Daniel Bonilla Portfolio',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isES 
        ? 'Daniel Bonilla Mosquera - Desarrollador Full Stack'
        : 'Daniel Bonilla Mosquera - Full Stack Developer',
      description: isES
        ? 'Aplicaciones web, automatización e integración de APIs | React, Next.js, Python'
        : 'Web applications, automation, and API integrations | React, Next.js, Python',
      images: [`${baseUrl}/images/sketch-draw.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'es': `${baseUrl}/es`,
        'en': `${baseUrl}/en`,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  };
}

export default async function LocaleLayout({children, params}) {
  // 👇 Esperar los params antes de usarlos
  const {locale} = await params;

  // Ensure that the incoming `locale` is valid
  if (!locale || !['en', 'es'].includes(locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Función para obtener el tema preferido
                  function getThemePreference() {
                    // 1. Verificar si hay un tema guardado en localStorage
                    try {
                      const savedTheme = localStorage.getItem('theme');
                      if (savedTheme === 'dark' || savedTheme === 'light') {
                        return savedTheme;
                      }
                    } catch (e) {
                      // localStorage puede no estar disponible
                    }
                    // 2. Si no hay tema guardado, detectar preferencia del sistema
                    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                      return 'dark';
                    }
                    // 3. Por defecto, modo claro
                    return 'light';
                  }
                  
                  // Aplicar el tema antes de que se renderice la página
                  const theme = getThemePreference();
                  const html = document.documentElement;
                  
                  if (theme === 'dark') {
                    html.classList.add('dark');
                  } else {
                    html.classList.remove('dark');
                  }
                } catch (e) {
                  // En caso de error, asegurar que no esté en modo oscuro
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <GoogleAnalytics />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}