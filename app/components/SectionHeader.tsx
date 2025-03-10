import React, { ReactNode } from 'react';

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  className?: string;
  icon?: ReactNode;
}

export default function SectionHeader({ title, subtitle, className = '', icon }: SectionHeaderProps) {
  return (
    <div className={className}>
      <div className="flex flex-col items-center justify-center">
        {icon && <div className="text-zinc-400 mb-3 text-2xl">{icon}</div>}
        <h2 className="text-3xl md:text-4xl text-zinc-200 font-light mb-2 text-center">{title}</h2>
        {subtitle && <p className="text-zinc-400 text-center mb-12">{subtitle}</p>}
      </div>
    </div>
  );
} 