import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Historia USaP Trainer',
    short_name: 'Historia USaP',
    description: 'Euskarazko entrenatzailea Historia USaP/PAU ariketak praktikatzeko.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8fafc',
    theme_color: '#064e3b',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any'
      },
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable'
      }
    ]
  };
}
