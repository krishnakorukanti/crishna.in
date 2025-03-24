import Image from 'next/image';
import { CSSProperties } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
  sizes?: string;
}

/**
 * A wrapper around Next.js Image component that ensures all images are optimized for SEO
 * - Ensures proper alt text
 * - Adds loading priority for above-the-fold images
 * - Provides appropriate sizes attribute
 * - Uses Next.js image optimization
 */
export default function OptimizedImage({
  src,
  alt,
  width = 1200,
  height = 630,
  priority = false,
  className = '',
  style = {},
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
}: OptimizedImageProps) {
  // Make sure all external URLs are properly handled
  const imageSrc = src.startsWith('http') || src.startsWith('data:') 
    ? src 
    : src.startsWith('/') ? src : `/${src}`;
  
  // Check if we need to apply rounded styling
  const isRounded = className.includes('rounded-full');
  
  // For circular images (rounded-full), enforce square dimensions
  const finalWidth = isRounded ? width : width;
  const finalHeight = isRounded ? width : height; // Use width for height to ensure square for circles
  
  const imageStyle = {
    ...style,
    ...(isRounded ? { 
      borderRadius: '50%',
      objectFit: 'cover' as const
    } : {})
  };
  
  if (isRounded) {
    // For circular images, wrap in a div with controlled dimensions
    return (
      <div style={{ width: finalWidth, height: finalHeight, position: 'relative' }}>
        <Image
          src={imageSrc}
          alt={alt}
          fill={true}
          priority={priority}
          className={className}
          style={imageStyle}
          sizes={sizes}
          quality={90}
          loading={priority ? 'eager' : 'lazy'}
        />
      </div>
    );
  }
  
  // For regular images, return the Image component directly
  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={finalWidth}
      height={finalHeight}
      priority={priority}
      className={className}
      style={style}
      sizes={sizes}
      quality={90}
      loading={priority ? 'eager' : 'lazy'}
    />
  );
} 