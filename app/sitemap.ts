import { MetadataRoute } from 'next';
import { allProjects } from 'contentlayer/generated';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://crishna.in';
  
  // Static routes with their last modification date
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ] as MetadataRoute.Sitemap;

  // Dynamic project routes
  const projectRoutes = allProjects
    .filter(project => project.published)
    .map(project => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: project.date ? new Date(project.date) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

  return [...staticRoutes, ...projectRoutes];
}