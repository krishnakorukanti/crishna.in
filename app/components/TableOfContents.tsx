"use client";

import React, { useEffect, useState, useRef } from 'react';
import { FiList } from 'react-icons/fi';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

/**
 * Table of Contents component that extracts headings from MDX content
 * and displays them as a navigation menu
 */
export function TableOfContents() {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Find all heading elements in the article content
    const article = document.querySelector('article');
    if (!article) return;

    const elements = Array.from(article.querySelectorAll('h2, h3, h4, h5, h6'));
    
    // Create TOC items from headings
    const items = elements.map(element => {
      // Ensure all headings have IDs for linking
      if (!element.id) {
        const id = element.textContent?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') || '';
        element.id = id;
      }
      
      return {
        id: element.id,
        text: element.textContent || '',
        level: parseInt(element.tagName.substring(1), 10)
      };
    });
    
    setHeadings(items);
    
    // Set up intersection observer to highlight active heading
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '0px 0px -80% 0px',
        threshold: 0.1
      }
    );
    
    // Observe all heading elements
    elements.forEach(element => {
      observer.observe(element);
    });
    
    observerRef.current = observer;
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  // If no headings, don't render the component
  if (headings.length === 0) {
    return null;
  }
  
  return (
    <div className={`fixed right-4 top-32 z-20 transition-all duration-300 ${isExpanded ? 'w-64' : 'w-10'}`}>
      <div className="bg-zinc-900/80 backdrop-blur-sm rounded-xl border border-zinc-800 overflow-hidden">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-3 flex items-center text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          <FiList className="h-4 w-4" />
          {isExpanded && <span className="ml-2 text-sm font-medium">Contents</span>}
        </button>
        
        {isExpanded && (
          <nav className="p-3 pt-0 max-h-[60vh] overflow-y-auto">
            <ul className="space-y-1 text-sm">
              {headings.map(heading => (
                <li 
                  key={heading.id} 
                  className={`transition-colors duration-200 ${
                    heading.level === 2 ? 'pl-0' : 
                    heading.level === 3 ? 'pl-3' : 
                    heading.level === 4 ? 'pl-6' : 
                    'pl-9'
                  }`}
                >
                  <a
                    href={`#${heading.id}`}
                    className={`block py-1 hover:text-zinc-200 transition-colors ${
                      activeId === heading.id 
                        ? 'text-blue-400 font-medium' 
                        : 'text-zinc-400'
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(heading.id)?.scrollIntoView({
                        behavior: 'smooth'
                      });
                      setActiveId(heading.id);
                    }}
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
} 