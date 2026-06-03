import { getAllSlugs } from '@/data';
import { routing } from '@/i18n/routing';
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cloudlongmarch.com';

  const entries: MetadataRoute.Sitemap = [];

  // Homepage entries for each locale
  for (const locale of routing.locales) {
    entries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    });
  }

  // Product page entries for each locale × product
  const slugs = getAllSlugs();
  for (const locale of routing.locales) {
    for (const slug of slugs) {
      entries.push({
        url: `${baseUrl}/${locale}/product/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  }

  return entries;
}
