/**
 * Valida que las variables de entorno requeridas estén configuradas
 * Solo valida en tiempo de build, no en runtime
 */
export function validateEnv() {
  if (typeof window !== 'undefined') {
    // No validar en cliente
    return;
  }

  const required = [];
  const recommended = [
    'GITHUB_USERNAME',
    'NEXT_PUBLIC_CONTACT_EMAIL',
    'NEXT_PUBLIC_SITE_URL',
  ];

  const missing = required.filter(key => !process.env[key]);
  const missingRecommended = recommended.filter(key => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `❌ Missing required environment variables: ${missing.join(', ')}\n` +
      `Please set them in .env.local or Vercel environment variables.`
    );
  }

  if (missingRecommended.length > 0 && process.env.NODE_ENV === 'production') {
    console.warn(
      `⚠️ Missing recommended environment variables: ${missingRecommended.join(', ')}\n` +
      `Some features may not work correctly.`
    );
  }
}

// Ejecutar validación solo en build time
if (process.env.NODE_ENV === 'production') {
  validateEnv();
}
