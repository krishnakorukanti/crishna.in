import React from 'react';
import { 
  FiTwitter, 
  FiLinkedin, 
  FiFacebook, 
  FiMail, 
  FiLink,
  FiShare2
} from 'react-icons/fi';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
}

/**
 * Social sharing component for enhancing content distribution
 * and increasing backlinks (good for SEO)
 */
export function SocialShare({ url, title, description = '' }: SocialShareProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  
  const shareLinks = [
    {
      name: 'Twitter',
      icon: FiTwitter,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'hover:bg-sky-700',
    },
    {
      name: 'LinkedIn',
      icon: FiLinkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'hover:bg-blue-800',
    },
    {
      name: 'Facebook',
      icon: FiFacebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hover:bg-blue-600',
    },
    {
      name: 'Email',
      icon: FiMail,
      url: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
      color: 'hover:bg-zinc-700',
    },
  ];
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url)
      .then(() => {
        alert('Link copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy link: ', err);
      });
  };
  
  return (
    <div className="py-4 px-6 bg-zinc-900/60 backdrop-blur-sm rounded-xl border border-zinc-800">
      <div className="flex items-center mb-3">
        <FiShare2 className="mr-2 text-zinc-400" />
        <h3 className="text-zinc-200 text-sm font-medium">Share this project</h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${link.name}`}
            className={`p-2 rounded-full bg-zinc-800 text-zinc-200 transition-colors ${link.color}`}
          >
            <link.icon className="w-4 h-4" />
          </a>
        ))}
        
        <button
          onClick={copyToClipboard}
          aria-label="Copy link"
          className="p-2 rounded-full bg-zinc-800 text-zinc-200 hover:bg-zinc-700 transition-colors"
        >
          <FiLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
} 