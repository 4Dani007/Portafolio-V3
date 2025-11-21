import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import '../globals.css';
import GoogleAnalytics from '../components/GoogleAnalytics';

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