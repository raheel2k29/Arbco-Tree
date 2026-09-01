import { MetadataRoute } from 'next'
import { allSuburbs, services, slugify } from '@/lib/locationData'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://arbcotreesolutions.com.au' // Base URL

  const baseRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/service-areas`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  // Generate sitemap entries for all 291 programmatic pages
  const serviceAreaRoutes: MetadataRoute.Sitemap = []
  
  for (const suburb of allSuburbs) {
    for (const service of services) {
      serviceAreaRoutes.push({
        url: `${baseUrl}/service-areas/${service.id}-${slugify(suburb)}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }
  }

  return [...baseRoutes, ...serviceAreaRoutes]
}
