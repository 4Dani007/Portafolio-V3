export default function manifest() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dev-4daniel.vercel.app';
  
  return {
    name: 'Daniel Bonilla - Portfolio',
    short_name: 'DB Portfolio',
    description: 'Portfolio de Daniel Bonilla Mosquera - Desarrollador Full Stack Junior',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
