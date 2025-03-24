import { Metadata } from 'next';

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://crishna.in';

export function constructMetadata({
  title = 'Crishna Korukanti',
  description = 'Personal website and portfolio of Crishna Korukanti - Developer, designer, and creator.',
  url = baseUrl,
  ogImage = `${baseUrl}/og-image.png`,
  noIndex = false,
}: SEOProps = {}): Metadata {
  return {
    title: title,
    description: description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: title,
      description: description,
      url: url,
      siteName: 'Crishna Korukanti',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [ogImage],
      creator: '@crishna',
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