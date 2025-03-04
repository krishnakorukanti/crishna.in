"use client";

import React, { useRef, useEffect, ReactNode } from 'react';

type ScrollRevealProps = {
  children: ReactNode;
  threshold?: number;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
};

export default function ScrollReveal({ 
  children, 
  threshold = 0.1, 
  delay = 0, 
  direction = 'up' 
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          setTimeout(() => {
            target.style.opacity = '1';
            target.style.transform = 'translateY(0) translateX(0)';
          }, delay);
          observer.unobserve(target);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, delay]);

  // Set initial style based on direction
  let initialStyle = {
    opacity: 0,
    transform: 'translateY(20px)',
    transition: `opacity 0.6s ease-out, transform 0.6s ease-out ${delay}ms`
  };

  if (direction === 'down') {
    initialStyle.transform = 'translateY(-20px)';
  } else if (direction === 'left') {
    initialStyle.transform = 'translateX(20px)';
  } else if (direction === 'right') {
    initialStyle.transform = 'translateX(-20px)';
  } else if (direction === 'none') {
    initialStyle.transform = 'translateY(0)';
  }

  return (
    <div ref={ref} style={initialStyle}>
      {children}
    </div>
  );
} 