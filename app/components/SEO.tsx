import { Metadata } from 'next';
import { SEO as SEOConstants } from '../constants/seo';

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
  ogImage?: string;
  noIndex?: boolean;
  keywords?: string;
  authors?: Array<{ name: string }>;
  openGraph?: {
    type?: string;
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
    tags?: string[];
  };
}

export function constructMetadata({
  title = SEOConstants.names.primary,
  description = SEOConstants.defaultDescription,
  url = SEOConstants.baseUrl,
  ogImage = `${SEOConstants.baseUrl}/og-image.png`,
  noIndex = false,
  keywords,
  authors,
  openGraph,
}: SEOProps = {}): Metadata {
  // Combine default keywords with page-specific keywords
  const allKeywords = [
    ...SEOConstants.keywords,
    ...(keywords ? keywords.split(', ') : []),
    ...SEOConstants.names.variations
  ].join(', ');

  return {
    title: title,
    description: description,
    metadataBase: new URL(SEOConstants.baseUrl),
    alternates: {
      canonical: url,
    },
    keywords: allKeywords,
    authors: authors || [{ name: SEOConstants.names.primary }],
    openGraph: {
      title: title,
      description: description,
      url: url,
      siteName: SEOConstants.names.siteName,
      locale: 'en_US',
      type: openGraph?.type || 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      publishedTime: openGraph?.publishedTime,
      modifiedTime: openGraph?.modifiedTime,
      authors: openGraph?.authors || [SEOConstants.names.primary],
      tags: openGraph?.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [ogImage],
      creator: SEOConstants.names.twitter,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
      },
    },
  };
} 