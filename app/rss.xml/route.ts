import RSS from 'rss';
import { getPublishedProjects } from '@/lib/projects';

export async function GET() {
  const publishedProjects = (await getPublishedProjects()).sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const feed = new RSS({
    title: 'Crishna Korukanti - Projects and Updates',
    description: 'Latest projects and updates from Crishna Korukanti, Software Engineer & AI Product Developer',
    site_url: 'https://crishna.in',
    feed_url: 'https://crishna.in/rss.xml',
    language: 'en',
    copyright: `© ${new Date().getFullYear()} Crishna Korukanti`,
    pubDate: new Date(),
  });

  // Add projects to the feed
  publishedProjects.forEach((project) => {
    feed.item({
      title: project.title,
      description: project.description,
      url: `https://crishna.in/projects/${project.slug}`,
      date: project.date ? new Date(project.date) : new Date(),
      categories: project.tags || [],
      author: 'Crishna Korukanti',
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
} 