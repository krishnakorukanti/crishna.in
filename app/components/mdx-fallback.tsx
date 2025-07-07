"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface MdxFallbackProps {
  content: string;
  title: string;
  description: string;
}

export function MdxFallback({ content, title, description }: MdxFallbackProps) {
  // Convert inline style object to React style object
  const parseInlineStyles = (styleString: string): React.CSSProperties => {
    if (!styleString) return {};
    
    try {
      // Handle JSX style object syntax {{key: 'value'}}
      if (styleString.includes('{{') && styleString.includes('}}')) {
        const objectStr = styleString.match(/\{\{([^}]+)\}\}/)?.[1];
        if (objectStr) {
          const styles: React.CSSProperties = {};
          objectStr.split(',').forEach(pair => {
            const [key, value] = pair.split(':').map(s => s.trim());
            if (key && value) {
              const cleanKey = key.replace(/['"]/g, '');
              const cleanValue = value.replace(/['"]/g, '');
              // Convert CSS property names to camelCase
              const camelKey = cleanKey.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
              (styles as any)[camelKey] = cleanValue;
            }
          });
          return styles;
        }
      }
      
      // Handle regular CSS syntax
      const styles: React.CSSProperties = {};
      styleString.split(';').forEach(declaration => {
        const [property, value] = declaration.split(':').map(s => s.trim());
        if (property && value) {
          const camelProperty = property.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
          (styles as any)[camelProperty] = value;
        }
      });
      return styles;
    } catch (error) {
      console.warn('Failed to parse inline styles:', styleString);
      return {};
    }
  };

  // Parse HTML elements and convert to React components
  const parseHtmlElement = (htmlString: string, key: number): React.ReactNode => {
    // Simple HTML parser for common elements
    const tagMatch = htmlString.match(/^<(\w+)([^>]*)>/);
    if (!tagMatch) return htmlString;
    
    const [, tagName, attributes] = tagMatch;
    const attributeObj: any = {};
    
    // Parse attributes
    const attrRegex = /(\w+)=(?:"([^"]*)"|'([^']*)'|\{([^}]*)\})/g;
    let attrMatch;
    while ((attrMatch = attrRegex.exec(attributes)) !== null) {
      const [, attrName, doubleQuoted, singleQuoted, braced] = attrMatch;
      const value = doubleQuoted || singleQuoted || braced;
      
      if (attrName === 'style') {
        attributeObj.style = parseInlineStyles(value);
      } else if (attrName === 'href') {
        attributeObj.href = value;
      } else if (attrName === 'src') {
        attributeObj.src = value;
      } else if (attrName === 'alt') {
        attributeObj.alt = value;
      } else {
        attributeObj[attrName] = value;
      }
    }

    // Extract content between tags
    const contentMatch = htmlString.match(new RegExp(`^<${tagName}[^>]*>([\\s\\S]*?)</${tagName}>`, 'i'));
    const content = contentMatch ? contentMatch[1] : '';

    // Render appropriate React component based on tag
    switch (tagName.toLowerCase()) {
      case 'div':
        return (
          <div key={key} style={attributeObj.style} className={attributeObj.className}>
            {content && parseHtmlContent(content)}
          </div>
        );
      
      case 'a':
        const isExternal = attributeObj.href?.startsWith('http');
        return isExternal ? (
          <a key={key} href={attributeObj.href} target="_blank" rel="noopener noreferrer" style={attributeObj.style} className={attributeObj.className || "text-blue-400 hover:text-blue-300"}>
            {content && parseHtmlContent(content)}
          </a>
        ) : (
          <Link key={key} href={attributeObj.href || '#'} style={attributeObj.style} className={attributeObj.className || "text-blue-400 hover:text-blue-300"}>
            {content && parseHtmlContent(content)}
          </Link>
        );
      
      case 'img':
        // Use Next.js Image for better performance when possible
        if (attributeObj.src?.startsWith('/') || attributeObj.src?.includes('localhost')) {
          return (
            <Image 
              key={key}
              src={attributeObj.src}
              alt={attributeObj.alt || ''}
              width={200}
              height={60}
              style={attributeObj.style}
              className={attributeObj.className}
            />
          );
        }
        // For external images, still use img tag to avoid CORS issues
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            key={key}
            src={attributeObj.src}
            alt={attributeObj.alt || ''}
            style={attributeObj.style}
            className={attributeObj.className}
          />
        );
      
      case 'span':
        return (
          <span key={key} style={attributeObj.style} className={attributeObj.className}>
            {content && parseHtmlContent(content)}
          </span>
        );
      
      default:
        return <span key={key}>{htmlString}</span>;
    }
  };

  // Parse mixed HTML and text content
  const parseHtmlContent = (text: string): React.ReactNode => {
    if (!text.includes('<')) {
      return text;
    }

    const parts: React.ReactNode[] = [];
    let currentIndex = 0;
    
    // Find HTML tags
    const htmlTagRegex = /<(\w+)(?:[^>]*?)>[\s\S]*?<\/\1>|<(\w+)(?:[^>]*?)\s*\/?>(?![^<]*<\/)/g;
    let match;
    
    while ((match = htmlTagRegex.exec(text)) !== null) {
      // Add text before the HTML tag
      if (match.index > currentIndex) {
        const textBefore = text.slice(currentIndex, match.index);
        if (textBefore.trim()) {
          parts.push(textBefore);
        }
      }
      
      // Add the parsed HTML element
      parts.push(parseHtmlElement(match[0], parts.length));
      currentIndex = match.index + match[0].length;
    }
    
    // Add remaining text after the last HTML tag
    if (currentIndex < text.length) {
      const textAfter = text.slice(currentIndex);
      if (textAfter.trim()) {
        parts.push(textAfter);
      }
    }
    
    return parts.length > 0 ? parts : text;
  };

  // Enhanced markdown rendering to handle more syntax
  const renderContent = (text: string) => {
    // Remove frontmatter (YAML between --- blocks)
    const cleanText = text.replace(/^---[\s\S]*?---\n/, '');
    
    const lines = cleanText.split('\n');
    const elements: React.ReactNode[] = [];
    let inList = false;
    let listItems: React.ReactNode[] = [];
    
    const flushList = () => {
      if (inList && listItems.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="my-6 ml-6 list-disc space-y-2">
            {listItems}
          </ul>
        );
        listItems = [];
        inList = false;
      }
    };
    
    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      
      // Skip empty lines but track them for spacing
      if (!trimmedLine) {
        flushList();
        return;
      }
      
      // Handle headers
      if (trimmedLine.startsWith('# ')) {
        flushList();
        elements.push(<h1 key={index} className="text-3xl font-bold mt-8 mb-4 text-zinc-100">{trimmedLine.slice(2)}</h1>);
        return;
      }
      if (trimmedLine.startsWith('## ')) {
        flushList();
        elements.push(<h2 key={index} className="text-2xl font-semibold mt-6 mb-3 text-zinc-200 border-b border-zinc-700 pb-2">{trimmedLine.slice(3)}</h2>);
        return;
      }
      if (trimmedLine.startsWith('### ')) {
        flushList();
        elements.push(<h3 key={index} className="text-xl font-medium mt-4 mb-2 text-zinc-200">{trimmedLine.slice(4)}</h3>);
        return;
      }
      
      // Handle bullet points
      if (trimmedLine.startsWith('- ')) {
        if (!inList) {
          inList = true;
        }
        const content = parseInlineMarkdown(trimmedLine.slice(2));
        listItems.push(<li key={index} className="text-zinc-300">{content}</li>);
        return;
      }
      
      // Any other content flushes the list and creates a paragraph
      flushList();
      
      // Check if line contains HTML, if so parse it directly
      if (trimmedLine.includes('<') && trimmedLine.includes('>')) {
        const htmlContent = parseHtmlContent(trimmedLine);
        elements.push(<div key={index} className="mb-4">{htmlContent}</div>);
      } else {
        // Parse inline markdown and create paragraph
        const content = parseInlineMarkdown(trimmedLine);
        if (content) {
          elements.push(<p key={index} className="text-zinc-300 mb-4 leading-relaxed">{content}</p>);
        }
      }
    });
    
    // Flush any remaining list
    flushList();
    
    return elements;
  };
  
  // Helper function to parse inline markdown (bold, links, etc.)
  const parseInlineMarkdown = (text: string): React.ReactNode => {
    // Handle bold text **text**
    if (text.includes('**')) {
      const parts = text.split(/(\*\*.*?\*\*)/);
      return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="text-zinc-100">{part.slice(2, -2)}</strong>;
        }
        return parseLinks(part, i);
      });
    }
    
    return parseLinks(text, 0);
  };
  
  // Helper function to parse links [text](url)
  const parseLinks = (text: string, baseKey: number): React.ReactNode => {
    if (!text.includes('[') || !text.includes('](')) {
      return text;
    }
    
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = text.split(linkRegex);
    
    return parts.map((part, i) => {
      if (i % 3 === 1) { // Link text
        const url = parts[i + 1];
        return url?.startsWith('http') ? (
          <a key={`${baseKey}-${i}`} href={url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">
            {part}
          </a>
        ) : (
          <Link key={`${baseKey}-${i}`} href={url || '#'} className="text-blue-400 hover:text-blue-300 underline">
            {part}
          </Link>
        );
      }
      if (i % 3 === 2) return null; // Skip URL parts
      return part;
    });
  };

  return (
    <div className="max-w-none prose prose-zinc">
      <div className="space-y-4">
        {renderContent(content)}
      </div>
    </div>
  );
} 