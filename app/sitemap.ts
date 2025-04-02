import { MetadataRoute } from 'next';
import { allProjects } from 'contentlayer/generated';
import { SEO as SEOConstants } from './constants/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  // Static routes with their last modification date
  const staticRoutes = [
    {
      url: SEOConstants.baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SEOConstants.baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SEOConstants.baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ] as MetadataRoute.Sitemap;

  // Dynamic project routes with enhanced SEO information
  const projectRoutes = allProjects
    .filter(project => project.published)
    .map(project => {
      // Determine priority based on featured status and recency
      const isFeatured = ["letmedoit", "survey-heart-android", "crishna.in"].includes(project.slug);
      const isRecent = project.date && new Date(project.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // Within last 30 days
      
      let priority = 0.75; // Default priority
      if (isFeatured && isRecent) priority = 0.9;
      else if (isFeatured) priority = 0.85;
      else if (isRecent) priority = 0.8;
      
      return {
        url: `${SEOConstants.baseUrl}/projects/${project.slug}`,
        lastModified: project.date ? new Date(project.date) : new Date(),
        changeFrequency: "weekly" as const,
        priority,
      };
    });

  return [...staticRoutes, ...projectRoutes];
}