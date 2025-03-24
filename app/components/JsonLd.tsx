import React from 'react';

interface WebsiteSchema {
  name: string;
  url: string;
  description: string;
}

interface PersonSchema {
  name: string;
  url: string;
  jobTitle: string;
  description: string;
  image: string;
  sameAs: string[];
}

export function WebsiteJsonLd({ website }: { website: WebsiteSchema }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: website.name,
    url: website.url,
    description: website.description,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function PersonJsonLd({ person }: { person: PersonSchema }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    url: person.url,
    jobTitle: person.jobTitle,
    description: person.description,
    image: person.image,
    sameAs: person.sameAs,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BlogPostingJsonLd({ 
  url,
  headline,
  datePublished,
  dateModified,
  authorName,
  description,
  image,
}: { 
  url: string;
  headline: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
  description: string;
  image: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline,
    image,
    url,
    datePublished,
    dateModified,
    description,
    author: {
      "@type": "Person",
      name: authorName,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
} 