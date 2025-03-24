"use client";

import React from "react";
import dynamic from "next/dynamic";
import { FiCommand, FiMessageSquare, FiChevronDown } from 'react-icons/fi';

// Dynamically import Terminal component
const Terminal = dynamic(() => import('../../Terminal'), { ssr: false });

interface TerminalSectionProps {
  commands: Array<{
    command: string;
    delay: number;
    output?: string[];
  }>;
}

export default function TerminalSection({ commands }: TerminalSectionProps) {
  return (
    <section id="terminal" className="w-full min-h-screen flex flex-col items-center justify-center relative px-4 py-24 overflow-hidden bg-gradient-to-b from-zinc-950 to-zinc-950/90">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full filter blur-[150px] animate-glow-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full filter blur-[150px] animate-glow-pulse delay-300"></div>
      </div>
      
      <div className="max-w-6xl w-full mx-auto z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left side content */}
        <div className="w-full lg:w-2/5 space-y-6 text-center lg:text-left animate-fade-in">
          <div className="flex items-center justify-center lg:justify-start space-x-2 text-blue-400 mb-2 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <FiCommand className="w-5 h-5" />
            <span className="text-sm uppercase tracking-wider font-medium">Interactive AI Experience</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 animate-fade-in" style={{ animationDelay: '200ms' }}>
            Chat with AI Crishna
          </h2>
          
          <p className="text-zinc-400 text-lg max-w-lg animate-fade-in" style={{ animationDelay: '300ms' }}>
            Ask questions about Krishna's experience, skills, or projects. The AI assistant is trained to answer common questions and help you learn more.
          </p>
          
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-lg p-4 space-y-2 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <div className="flex items-center text-blue-400 text-sm">
              <FiMessageSquare className="w-4 h-4 mr-2" />
              <span>Try asking:</span>
            </div>
            <ul className="space-y-1 text-zinc-400 text-sm">
              <li className="hover:text-blue-400 transition-colors cursor-pointer">• "What projects has Krishna worked on?"</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">• "What technologies does Krishna use?"</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">• "How can I contact Krishna?"</li>
            </ul>
          </div>
        </div>
        
        {/* Terminal Animation */}
        <div className="w-full lg:w-3/5 mx-auto mb-10 animate-fade-in terminal-wrapper" style={{animationDelay: '500ms'}}>
          <div className="terminal-glow"></div>
          {Terminal && <Terminal commands={commands} />}
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 w-full flex justify-center animate-fade-in" style={{ animationDelay: '800ms' }}>
        <a 
          href="#about" 
          aria-label="Scroll to About section" 
          className="flex flex-col items-center group animate-subtle-float"
        >
          <span className="text-zinc-500 text-sm mb-2 group-hover:text-blue-400 transition-colors">Continue</span>
          <div className="border-2 border-zinc-800 rounded-full p-2 group-hover:border-blue-400 group-hover:text-blue-400 transition-all">
            <FiChevronDown className="w-5 h-5 text-zinc-500 group-hover:text-blue-400 animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  );
} 