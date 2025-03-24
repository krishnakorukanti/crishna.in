import React from 'react';
import { BlogPostingJsonLd } from './JsonLd';

interface ProjectSEOProps {
  title: string;
  description: string;
  slug: string;
  date: string;
  image?: string;
  authorName?: string;
}

/**
 * A reusable component for project page SEO
 * - Adds structured data for projects
 * - Ensures consistent metadata across project pages
 */
export default function ProjectSEO({
  title,
  description,
  slug,
  date,
  image = 'https://crishna.in/og-image.png',
  authorName = 'Crishna Korukanti'
}: ProjectSEOProps) {
  const url = `https://crishna.in/projects/${slug}`;
  const formattedDate = date || new Date().toISOString();

  return (
    <BlogPostingJsonLd
      url={url}
      headline={title}
      datePublished={formattedDate}
      dateModified={formattedDate}
      authorName={authorName}
      description={description}
      image={image}
    />
  );
} 