"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import Particles from "./particles";

interface PageTemplateProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  showParticles?: boolean;
  className?: string;
}

// Common navigation and social links to maintain consistency
const navigation = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
  { name: "Persona.ai Pitch", href: "/persona-ai.html" }
];

const socialLinks = [
  { name: "GitHub", href: "https://github.com/crishnak", icon: FaGithub },
  { name: "LinkedIn", href: "https://linkedin.com/in/crishnak", icon: FaLinkedin },
  { name: "Twitter", href: "https://twitter.com/crishnak", icon: FaTwitter }
];

export default function PageTemplate({
  children,
  title,
  subtitle,
  showParticles = true,
  className = "",
}: PageTemplateProps) {
  return (
    <div className="flex flex-col items-center w-screen min-h-screen overflow-x-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      {showParticles && (
        <Particles
          className="absolute inset-0 -z-10 animate-fade-in"
          quantity={100}
        />
      )}
      
      {/* Header */}
      <header className="w-full py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white mb-4 md:mb-0">
            crishna
          </Link>
          
          <nav className="flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm duration-500 text-zinc-400 hover:text-zinc-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      
      {/* Page Title Section */}
      {title && (
        <section className="w-full py-12 md:py-16 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-light text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-300 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {title}
            </motion.h1>
            
            {subtitle && (
              <motion.p 
                className="text-zinc-400 max-w-3xl mx-auto text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {subtitle}
              </motion.p>
            )}
            
            <motion.div 
              className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-8 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            />
          </div>
        </section>
      )}
      
      {/* Main Content */}
      <main className={`w-full flex-grow ${className}`}>
        {children}
      </main>
      
      {/* Footer */}
      <footer className="w-full py-12 px-4 mt-20 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl text-zinc-300 mb-4">crishna</h3>
            <p className="text-zinc-500 text-sm">
              Software Engineer & AI Product Developer
            </p>
          </div>
          
          <div>
            <h3 className="text-lg text-zinc-300 mb-4">Links</h3>
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors duration-300"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg text-zinc-300 mb-4">Connect</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-zinc-300 transition-colors duration-300"
                  aria-label={social.name}
                >
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
            <p className="text-zinc-600 text-xs mt-4">
              © {new Date().getFullYear()} Crishna Korukanti
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 