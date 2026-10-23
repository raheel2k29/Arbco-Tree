import type { MetadataRoute } from 'next';
import { SITE_CANONICAL_DOMAIN } from '../lib/seoMetadata';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_CANONICAL_DOMAIN;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'OAI-SearchBot',
          'ClaudeBot',
          'AnthropicAI',
          'PerplexityBot',
          'Googlebot',
          'bingbot',
        ],
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
