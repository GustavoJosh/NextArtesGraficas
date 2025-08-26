import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/', '/api/', '/links/'],
    },
    sitemap: 'https://artesgraficasdigitales.com/sitemap.xml',
  }
}