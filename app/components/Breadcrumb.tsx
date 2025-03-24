import React from 'react';
import Link from 'next/link';
import { FiChevronRight, FiHome } from 'react-icons/fi';

interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrentPage?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  structured?: boolean; // Whether to include structured data
}

/**
 * Breadcrumb component for better navigation and SEO
 * Includes structured data markup for search engines
 */
export function Breadcrumb({ items, structured = true }: BreadcrumbProps) {
  // Add home as the first item if not already included
  const breadcrumbItems = items[0]?.href === '/' 
    ? items 
    : [{ label: 'Home', href: '/' }, ...items];
  
  // Generate structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@id': `https://crishna.in${item.href}`,
        'name': item.label
      }
    }))
  };

  return (
    <>
      {structured && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      
      <nav aria-label="Breadcrumb" className="py-4 px-4 md:px-6 flex overflow-x-auto">
        <ol className="flex items-center flex-wrap space-x-1 text-sm text-zinc-400">
          {breadcrumbItems.map((item, index) => (
            <li key={item.href} className="flex items-center">
              {index > 0 && (
                <FiChevronRight className="mx-1 h-4 w-4 text-zinc-500" aria-hidden="true" />
              )}
              
              {item.isCurrentPage ? (
                <span className="text-zinc-300 font-medium" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link 
                  href={item.href}
                  className="hover:text-zinc-200 transition-colors flex items-center"
                >
                  {index === 0 && (
                    <FiHome className="mr-1 h-4 w-4" />
                  )}
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
} 