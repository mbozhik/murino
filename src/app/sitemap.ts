import type {MetadataRoute} from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://murino-arena.ru/',
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
