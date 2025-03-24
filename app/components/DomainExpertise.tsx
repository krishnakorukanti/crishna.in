"use client";

import React from 'react';

interface DomainExpertiseProps {
  domain: string;
  skills: string[];
  description: string;
  icon: string;
}

const DomainExpertise = ({ domain, skills, description, icon }: DomainExpertiseProps): JSX.Element => {
  return (
    <div className="bg-zinc-900/40 backdrop-blur-sm rounded-xl p-6 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 group animate-fade-in-up relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
      
      <div className="flex items-center mb-4">
        <div className="text-3xl mr-3">{icon}</div>
        <h3 className="text-xl font-bold text-zinc-100">{domain}</h3>
      </div>
      
      <p className="text-zinc-400 mb-4">{description}</p>
      
      <div className="flex flex-wrap gap-2 mt-auto">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-2 py-1 bg-zinc-800/80 text-zinc-300 text-xs rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default DomainExpertise; 