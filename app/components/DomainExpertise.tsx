"use client";

import React, { useState } from 'react';
import { IconType } from 'react-icons';
import { motion } from "framer-motion";
import { FaCheck, FaCode, FaServer, FaMobile, FaBrain, FaDatabase } from "react-icons/fa";
import { 
  SiNextdotjs, SiReact, SiVuedotjs, 
  SiNodedotjs, SiAdonisjs, SiExpress, SiPostgresql, SiMongodb,
  SiAndroid, SiKotlin, SiSwift, SiFlutter, SiDart,
  SiOpenai
} from "react-icons/si";
import { BsDatabaseCheck } from "react-icons/bs";

// Icon mapping to avoid passing functions directly
const ICON_MAP: Record<string, IconType> = {
  // Domain icons
  'FaCode': FaCode,
  'FaServer': FaServer,
  'FaMobile': FaMobile,
  'FaBrain': FaBrain,
  'FaDatabase': FaDatabase,
  
  // Technology icons
  'SiNextdotjs': SiNextdotjs,
  'SiReact': SiReact,
  'SiVuedotjs': SiVuedotjs,
  'SiNodedotjs': SiNodedotjs,
  'SiAdonisjs': SiAdonisjs,
  'SiExpress': SiExpress,
  'SiPostgresql': SiPostgresql,
  'SiMongodb': SiMongodb,
  'SiAndroid': SiAndroid,
  'SiKotlin': SiKotlin,
  'SiSwift': SiSwift,
  'SiFlutter': SiFlutter,
  'SiDart': SiDart,
  'SiOpenai': SiOpenai,
  'BsDatabaseCheck': BsDatabaseCheck
};

type Technology = {
  name: string;
  iconName: string;
}

type Domain = {
  name: string;
  iconName: string;
  color: string;
  technologies: Technology[];
}

type Skill = {
  name: string;
  category: string;
  level?: number;
}

type DomainExpertiseProps = {
  domains: Domain[];
  skills: Skill[];
}

const DomainExpertise = ({ domains, skills }: DomainExpertiseProps): JSX.Element => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // Map domain names to categories
  const domainToCategory: Record<string, string> = {
    'Frontend': 'frontend',
    'Backend': 'backend',
    'Mobile': 'mobile',
    'AI': 'ai'
  };

  // Get all categories from domains
  const categories = ['all', ...domains.map(domain => domainToCategory[domain.name] || '')];

  // Get color for a category based on domain color
  const getCategoryColor = (category: string): string => {
    const domain = domains.find(d => domainToCategory[d.name] === category);
    if (!domain) return 'from-gray-500/20 to-gray-500/5';
    
    // Extract color classes and convert to lower opacity versions
    const colorParts = domain.color.split(' ');
    return colorParts.map(part => {
      if (part.includes('from-')) return part.replace('from-', 'from-') + '/20';
      if (part.includes('to-')) return part.replace('to-', 'to-') + '/5';
      return part;
    }).join(' ');
  };

  // Get category button style
  const getCategoryButtonStyle = (category: string): string => {
    const isActive = activeCategory === category || activeCategory === 'all';
    let baseStyle = "px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ";
    
    // For 'all' category
    if (category === 'all') {
      return baseStyle + (activeCategory === 'all' 
        ? "bg-zinc-700 text-white" 
        : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700/70 hover:text-zinc-300");
    }
    
    // Match the domain colors
    const domain = domains.find(d => domainToCategory[d.name] === category);
    if (!domain) return baseStyle + "bg-zinc-800/50 text-zinc-400";
    
    const colorClass = domain.color.split(' ')[0].replace('from-', '');
    
    return baseStyle + (isActive 
      ? `bg-${colorClass}/30 text-${colorClass.split('-')[0]}-200` 
      : `bg-${colorClass}/10 text-${colorClass.split('-')[0]}-300/60 hover:bg-${colorClass}/20 hover:text-${colorClass.split('-')[0]}-200`);
  };

  // Helper to get icon component from string name
  const getIconComponent = (iconName: string): IconType => {
    return ICON_MAP[iconName] || FaCode; // Default to FaCode if not found
  };

  return (
    <div id="skills" className="w-full py-16 md:py-20 px-4 bg-zinc-900/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl text-zinc-200 font-light mb-2 text-center">Technical Expertise</h2>
          <p className="text-zinc-400 text-center mb-8">Specialized skills across multiple development domains</p>
        </motion.div>
        
        {/* Category Filter Buttons */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              className={getCategoryButtonStyle(category)}
              onClick={() => setActiveCategory(category)}
            >
              {category === 'all' ? 'All Domains' : domains.find(d => domainToCategory[d.name] === category)?.name}
            </button>
          ))}
        </motion.div>
        
        {/* Domains Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {domains
            .filter(domain => activeCategory === 'all' || domainToCategory[domain.name] === activeCategory)
            .map((domain, idx) => {
              const DomainIcon = getIconComponent(domain.iconName);
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * idx }}
                  className="bg-zinc-900/40 backdrop-blur-sm rounded-xl p-6 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 group relative overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${domain.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${domain.color} flex items-center justify-center p-4 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                      <DomainIcon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl text-zinc-300">{domain.name}</h3>
                    <div className="space-y-2">
                      {domain.technologies.map((tech, i) => {
                        const TechIcon = getIconComponent(tech.iconName);
                        return (
                          <div key={i} className="flex items-center justify-center gap-2 text-sm text-zinc-400">
                            <TechIcon className="w-4 h-4 text-zinc-300" />
                            <span>{tech.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </div>
        
        {/* Category skills (hidden on mobile, visible on desktop) */}
        <div className="hidden md:block">
          {activeCategory !== 'all' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl text-zinc-300 mb-6 text-center">
                {domains.find(d => domainToCategory[d.name] === activeCategory)?.name} Skills
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {skills
                  .filter(skill => skill.category === activeCategory)
                  .map((skill, index) => (
                    <motion.div 
                      key={index} 
                      className={`p-4 bg-gradient-to-br ${getCategoryColor(skill.category)} backdrop-blur-sm 
                              rounded-lg border border-zinc-700/40 transition-all duration-300 
                              flex items-center`}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.05 * index }}
                      whileHover={{ scale: 1.03 }}
                    >
                      <FaCheck className="mr-2 text-xs opacity-60" />
                      <span className="text-sm text-zinc-200 font-medium">{skill.name}</span>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          )}
        </div>
        
        {/* All skills grid when "All Domains" is selected */}
        {activeCategory === 'all' && (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {categories.filter(cat => cat !== 'all').map((category, idx) => {
              const domain = domains.find(d => domainToCategory[d.name] === category);
              const CategoryIcon = domain ? getIconComponent(domain.iconName) : FaCode;
              
              return (
                <motion.div 
                  key={category}
                  className="bg-zinc-900/40 backdrop-blur-sm rounded-xl p-6 border border-zinc-800 relative overflow-hidden group hover:border-zinc-700/80 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * idx }}
                >
                  <div className="absolute top-0 right-0 bg-gradient-to-bl from-opacity-20 to-transparent w-32 h-32 -mr-10 -mt-10 rounded-full"></div>
                  <h3 className="text-xl text-zinc-300 mb-6 relative z-10 flex items-center">
                    <CategoryIcon className="mr-3 text-zinc-300" />
                    {domain?.name} Skills
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {skills
                      .filter(skill => skill.category === category)
                      .map((skill, index) => (
                        <motion.div 
                          key={index} 
                          className={`p-4 bg-gradient-to-br ${getCategoryColor(skill.category)} backdrop-blur-sm 
                                    rounded-lg border border-zinc-700/40 transition-all duration-300 
                                    flex items-center`}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.05 * index + 0.2 }}
                          whileHover={{ scale: 1.03 }}
                        >
                          <FaCheck className="mr-2 text-xs opacity-60" />
                          <span className="text-sm text-zinc-200 font-medium">{skill.name}</span>
                        </motion.div>
                      ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DomainExpertise; 