import type {MetadataRoute} from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/metro/',
    },
    sitemap: 'https://murino-arena.ru/sitemap.xml',
    host: 'https://murino-arena.ru',
  }
}
