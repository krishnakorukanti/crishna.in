"use client";

import React, { Suspense } from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import AITextEffect from "../AITextEffect";
import OptimizedImage from "../OptimizedImage";
import dynamic from "next/dynamic";

// Dynamic imports for 3D components to avoid SSR issues
const Hero3DScene = dynamic(() => import('../3d/Hero3DScene'), { 
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
});

const CrishnaText3D = dynamic(() => import('../3d/CrishnaText3D'), { 
  loading: () => <div className="w-full h-96 animate-pulse bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-lg" />
});

interface HeroSectionProps {
  aiDescriptions: string[];
  socialLinks: Array<{
    name: string;
    href: string;
    icon: string;
  }>;
}

export default function HeroSection3D({ aiDescriptions, socialLinks }: HeroSectionProps) {
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
    <section id="intro" className="w-full h-screen relative overflow-hidden">
      {/* Epic Hollywood Cinematic Experience */}
      <Suspense fallback={
        <div className="w-full h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="text-white text-3xl font-light tracking-[0.3em] animate-pulse mb-4">
              CRISHNA
            </div>
            <div className="text-white/60 text-lg tracking-wider">
              Loading Cinematic Experience...
            </div>
          </div>
        </div>
      }>
        <CrishnaText3D />
      </Suspense>

      {/* Social Links in Cinematic Style */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex space-x-8 justify-center animate-fade-in-up opacity-0" style={{animationDelay: '5000ms', animationFillMode: 'forwards'}}>
          {socialLinks.map((social, index) => (
            <a 
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-all duration-500 transform hover:scale-125 relative group"
              aria-label={social.name}
              style={{animationDelay: `${5100 + index * 200}ms`}}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/40 to-purple-500/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg scale-150"></div>
              <div className="relative z-10 text-2xl transition-all duration-500 group-hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">
                {renderIcon(social.icon)}
              </div>
            </a>
          ))}
        </div>
      </div>
      
      {/* Epic Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in-up opacity-0" style={{animationDelay: '6000ms', animationFillMode: 'forwards'}}>
        <a 
          href="#terminal" 
          aria-label="Continue to Experience" 
          className="group flex flex-col items-center space-y-2 transition-all duration-500 hover:scale-110"
        >
          <div className="w-12 h-16 border-2 border-white/30 rounded-full flex items-center justify-center group-hover:border-blue-400 transition-all duration-500 relative overflow-hidden">
            <div className="w-1 h-4 bg-white/50 rounded-full group-hover:bg-blue-400 animate-bounce-slow"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
          </div>
          <div className="text-white/40 text-xs font-light tracking-widest uppercase group-hover:text-white/80 transition-all duration-500">
            Continue
          </div>
        </a>
      </div>
    </section>
  );
} 