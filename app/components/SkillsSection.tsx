"use client";

import React, { useEffect, useRef, useState } from 'react';
import { 
  SiNextdotjs, SiReact, SiVuedotjs, 
  SiNodedotjs, SiAdonisjs, SiExpress, SiPostgresql, SiMongodb,
  SiAndroid, SiKotlin, SiSwift, SiFlutter
} from "react-icons/si";
import { FaBrain, FaMobile, FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";

type Skill = {
  name: string;
  category: string;
  level?: number; // Make level optional since we won't display percentages
}

type SkillsSectionProps = {
  skills: Skill[];
  children?: React.ReactNode;
}

export default function SkillsSection({ skills, children }: SkillsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const skillCards = entry.target.querySelectorAll('.skill-card');
          skillCards.forEach((card, index) => {
            setTimeout(() => {
              (card as HTMLElement).style.opacity = '1';
              (card as HTMLElement).style.transform = 'translateY(0)';
            }, 50 * index);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Get color class based on category
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'frontend': return 'from-blue-500/20 to-blue-500/5 hover:border-blue-500/40 text-blue-400';
      case 'backend': return 'from-purple-500/20 to-purple-500/5 hover:border-purple-500/40 text-purple-400';
      case 'mobile': return 'from-amber-500/20 to-amber-500/5 hover:border-amber-500/40 text-amber-400';
      case 'ai': return 'from-emerald-500/20 to-emerald-500/5 hover:border-emerald-500/40 text-emerald-400';
      default: return 'from-gray-500/20 to-gray-500/5 hover:border-gray-500/40 text-gray-400';
    }
  };

  // Get icon based on category
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'frontend': return <SiReact className="mr-3 text-blue-400" />;
      case 'backend': return <SiNodedotjs className="mr-3 text-purple-400" />;
      case 'mobile': return <SiAndroid className="mr-3 text-amber-400" />;
      case 'ai': return <FaBrain className="mr-3 text-emerald-400" />;
      default: return null;
    }
  };

  // Get category title
  const getCategoryTitle = (category: string) => {
    switch(category) {
      case 'frontend': return 'Frontend Development';
      case 'backend': return 'Backend Development';
      case 'mobile': return 'Mobile Development';
      case 'ai': return 'AI & ML Engineering';
      default: return category;
    }
  };

  // Get category button color
  const getCategoryButtonStyle = (category: string) => {
    const isActive = activeCategory === category || activeCategory === 'all';
    
    let baseStyle = "px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ";
    
    // For 'all' category
    if (category === 'all') {
      return baseStyle + (activeCategory === 'all' 
        ? "bg-zinc-700 text-white" 
        : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700/70 hover:text-zinc-300");
    }
    
    // For other categories
    switch(category) {
      case 'frontend': 
        return baseStyle + (isActive 
          ? "bg-blue-500/30 text-blue-200" 
          : "bg-blue-500/10 text-blue-300/60 hover:bg-blue-500/20 hover:text-blue-200");
      case 'backend': 
        return baseStyle + (isActive 
          ? "bg-purple-500/30 text-purple-200" 
          : "bg-purple-500/10 text-purple-300/60 hover:bg-purple-500/20 hover:text-purple-200");
      case 'mobile': 
        return baseStyle + (isActive 
          ? "bg-amber-500/30 text-amber-200" 
          : "bg-amber-500/10 text-amber-300/60 hover:bg-amber-500/20 hover:text-amber-200");
      case 'ai': 
        return baseStyle + (isActive 
          ? "bg-emerald-500/30 text-emerald-200" 
          : "bg-emerald-500/10 text-emerald-300/60 hover:bg-emerald-500/20 hover:text-emerald-200");
      default: 
        return baseStyle + "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700/70 hover:text-zinc-300";
    }
  };

  const categories = ['all', 'frontend', 'backend', 'mobile', 'ai'];

  return (
    <section ref={sectionRef} id="skills" className="w-full py-16 md:py-20 px-4 bg-zinc-900/30">
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
        
        {children}
        
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
              {category === 'all' ? 'All Skills' : getCategoryTitle(category)}
            </button>
          ))}
        </motion.div>
        
        {/* Grid Layout for Large Screens */}
        <div className="hidden md:grid md:grid-cols-2 gap-6 lg:gap-8">
          {categories.filter(cat => cat !== 'all').map((category, idx) => (
            <motion.div 
              key={category}
              className={`bg-zinc-900/40 backdrop-blur-sm rounded-xl p-6 border border-zinc-800 relative overflow-hidden group hover:border-zinc-700/80 transition-all duration-300 ${activeCategory !== 'all' && activeCategory !== category ? 'opacity-50' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * idx }}
            >
              <div className="absolute top-0 right-0 bg-gradient-to-bl from-opacity-20 to-transparent w-32 h-32 -mr-10 -mt-10 rounded-full"></div>
              <h3 className="text-xl text-zinc-300 mb-6 relative z-10 flex items-center">
                {getCategoryIcon(category)} {getCategoryTitle(category)}
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
          ))}
        </div>
        
        {/* List Layout for Mobile */}
        <div className="md:hidden space-y-6">
          {(activeCategory === 'all' ? categories.filter(cat => cat !== 'all') : [activeCategory]).map((category) => (
            <motion.div 
              key={category}
              className="bg-zinc-900/40 backdrop-blur-sm rounded-xl p-5 border border-zinc-800 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg text-zinc-300 mb-4 relative z-10 flex items-center">
                {getCategoryIcon(category)} {getCategoryTitle(category)}
              </h3>
              
              <div className="grid grid-cols-1 gap-2">
                {skills
                  .filter(skill => skill.category === category)
                  .map((skill, index) => (
                    <motion.div 
                      key={index} 
                      className={`p-3 bg-gradient-to-br ${getCategoryColor(skill.category)} backdrop-blur-sm 
                                rounded-lg border border-zinc-700/40 transition-all duration-300 
                                flex items-center`}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.05 * index }}
                    >
                      <FaCheck className="mr-2 text-xs opacity-60" />
                      <span className="text-sm text-zinc-200">{skill.name}</span>
                    </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 