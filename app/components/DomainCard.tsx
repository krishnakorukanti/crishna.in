import React from 'react';
import { IconType } from 'react-icons';

type Technology = {
  name: string;
  icon: IconType;
}

type DomainCardProps = {
  domain: {
    name: string;
    icon: IconType;
    color: string;
    technologies: Technology[];
  }
}

export default function DomainCard({ domain }: DomainCardProps) {
  return (
    <div className="bg-zinc-900/40 backdrop-blur-sm rounded-xl p-6 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 group relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${domain.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
      <div className="flex flex-col items-center text-center space-y-4">
        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${domain.color} flex items-center justify-center p-4 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
          <domain.icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl text-zinc-300">{domain.name}</h3>
        <div className="space-y-2">
          {domain.technologies.map((tech, i) => (
            <div key={i} className="flex items-center justify-center gap-2 text-sm text-zinc-400">
              <tech.icon className="w-4 h-4 text-zinc-300" />
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 