"use client";

import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import AITextEffect from "../AITextEffect";
import OptimizedImage from "../OptimizedImage";

interface HeroSectionProps {
  aiDescriptions: string[];
  socialLinks: Array<{
    name: string;
    href: string;
    icon: string;
  }>;
}

export default function HeroSection({ aiDescriptions, socialLinks }: HeroSectionProps) {
  // Function to render the appropriate icon based on name
  const renderIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'github':
        return <FaGithub className="h-6 w-6" />;
      case 'linkedin':
        return <FaLinkedin className="h-6 w-6" />;
      case 'twitter':
        return <FaTwitter className="h-6 w-6" />;
      default:
        return null;
    }
  };

  return (
    <section id="intro" className="w-full min-h-screen flex flex-col items-center justify-center relative px-4 pb-10 overflow-hidden">
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-20 pt-10">
        <div className="relative order-1 md:order-1 transform transition-all duration-700 hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full blur-2xl opacity-50 -z-10 animate-pulse-slow"></div>
          <div className="animate-fade-in">
            <OptimizedImage 
              src="/profile.jpg" 
              alt="Crishna Korukanti - Software Engineer & AI Product Developer"
              width={200}
              height={200}
              priority={true}
              className="rounded-full"
            />
          </div>
          
          <div className="absolute -bottom-3 -right-3 h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-500 hover:scale-110">
            <span className="text-white text-xs font-medium">DEV</span>
          </div>
        </div>
        
        <div className="text-center md:text-left z-10 max-w-xl lg:max-w-2xl order-2 md:order-2">
          <h1 className="text-5xl sm:text-6xl md:text-7xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display whitespace-nowrap bg-clip-text mb-4">
            Crishna
          </h1>
          
          <p className="mt-4 text-lg md:text-xl text-zinc-300 font-light animate-fade-in-up opacity-0" style={{animationDelay: '300ms', animationFillMode: 'forwards'}}>
            Software Engineer & AI Product Developer
          </p>
          
          <div className="h-14 mt-4 mb-6 animate-fade-in-up opacity-0 w-full" style={{animationDelay: '300ms', animationFillMode: 'forwards'}}>
            <AITextEffect 
              texts={aiDescriptions} 
              className="text-sm md:text-md lg:text-lg md:text-left text-center w-full"
              typeSpeed={25}
              delayBetweenTexts={2500}
              random={true}
              immediateTransition={true}
            />
          </div>
          
          <div className="flex space-x-6 mt-6 justify-center md:justify-start animate-fade-in-up opacity-0" style={{animationDelay: '500ms', animationFillMode: 'forwards'}}>
            {socialLinks.map((social, index) => (
              <a 
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-zinc-300 transition-all duration-300 transform hover:scale-110"
                aria-label={social.name}
                style={{animationDelay: `${600 + index * 100}ms`}}
              >
                {renderIcon(social.icon)}
              </a>
            ))}
          </div>
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 w-full flex justify-center animate-bounce">
        <a href="#terminal" aria-label="Scroll to Terminal section" className="w-8 h-12 border-2 border-zinc-400 rounded-full flex items-center justify-center hover:border-blue-400 hover:scale-110 transition-all duration-300 group">
          <div className="w-1 h-3 bg-zinc-400 rounded-full group-hover:bg-blue-400 animate-bounce-slow"></div>
        </a>
      </div>
    </section>
  );
} 