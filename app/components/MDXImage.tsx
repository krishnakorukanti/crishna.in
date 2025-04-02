import React from 'react';
import Image from 'next/image';

interface MDXImageProps {
  src: string;
  alt: string;
  style?: React.CSSProperties;
}

export default function MDXImage({ src, alt, style }: MDXImageProps) {
  return (
    <div className="relative" style={style}>
      <Image
        src={src}
        alt={alt}
        width={800}
        height={600}
        className="rounded-lg"
        style={{
          width: style?.width || '100%',
          height: style?.height || 'auto',
          objectFit: 'cover',
        }}
      />
    </div>
  );
} 