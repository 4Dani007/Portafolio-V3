import createNextIntlPlugin from 'next-intl/plugin';

// Validación de variables de entorno (solo en build time)
if (process.env.NODE_ENV === 'production') {
  const recommended = [
    'GITHUB_USERNAME',
    'NEXT_PUBLIC_CONTACT_EMAIL',
    'NEXT_PUBLIC_SITE_URL',
  ];

  const missingRecommended = recommended.filter(key => !process.env[key]);

  if (missingRecommended.length > 0) {
    console.warn(
      `⚠️ Missing recommended environment variables: ${missingRecommended.join(', ')}\n` +
      `Some features may not work correctly.`
    );
  }
}

const withNextIntl = createNextIntlPlugin('./src/i18n/request.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
};

export default withNextIntl(nextConfig);
