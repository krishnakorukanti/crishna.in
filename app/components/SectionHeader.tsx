import React from 'react';

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeader({ title, subtitle, className = '' }: SectionHeaderProps) {
  return (
    <div className={className}>
      <h2 className="text-3xl md:text-4xl text-zinc-200 font-light mb-2 text-center">{title}</h2>
      {subtitle && <p className="text-zinc-400 text-center mb-12">{subtitle}</p>}
    </div>
  );
} 