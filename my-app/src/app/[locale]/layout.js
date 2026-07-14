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
      ? 'Daniel Bonilla Mosquera - Desarrollador Full Stack Junior | Portfolio'
      : 'Daniel Bonilla Mosquera - Junior Full Stack Developer | Portfolio',
    description: isES
      ? 'Desarrollador Full Stack Junior con experiencia en React, Next.js, Python y Flask. Construyo aplicaciones web, integro APIs y automatizo procesos.'
      : 'Junior Full Stack Developer with experience in React, Next.js, Python, and Flask. I build web applications, integrate APIs, and automate workflows.',
    keywords: isES
      ? 'desarrollador full stack, React, Next.js, Python, Flask, APIs, automatización, portfolio, frontend, backend'
      : 'full stack developer, React, Next.js, Python, Flask, APIs, automation, portfolio, frontend, backend',
    authors: [{ name: 'Daniel Bonilla Mosquera' }],
    creator: 'Daniel Bonilla Mosquera',
    openGraph: {
      type: 'website',
      locale: locale,
      url: `${baseUrl}/${locale}`,
      siteName: 'Daniel Bonilla - Portfolio',
      title: isES 
        ? 'Daniel Bonilla Mosquera - Desarrollador Full Stack Junior'
        : 'Daniel Bonilla Mosquera - Junior Full Stack Developer',
      description: isES
        ? 'Desarrollador Full Stack Junior con experiencia en React, Next.js, Python y automatización con APIs'
        : 'Junior Full Stack Developer with experience in React, Next.js, Python, and API automation',
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
        ? 'Daniel Bonilla Mosquera - Desarrollador Full Stack Junior'
        : 'Daniel Bonilla Mosquera - Junior Full Stack Developer',
      description: isES
        ? 'Desarrollador Full Stack Junior | React, Next.js, Python y APIs'
        : 'Junior Full Stack Developer | React, Next.js, Python and APIs',
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