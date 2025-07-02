import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import HeroSection from './components/sections/HeroSection';
import TerminalSection from './components/sections/TerminalSection';
import AboutSection from './components/sections/AboutSection';
import ExpertiseSection from './components/sections/ExpertiseSection';
import ProjectsSection from './components/sections/ProjectsSection';
import GitHubSection from './components/sections/GitHubSection';
import ContactSection from './components/sections/ContactSection';
import FooterSection from './components/sections/FooterSection';
import Particles from './components/particles';

export default function Home() {
  // AI descriptions for the hero section
  const aiDescriptions = [
    "Building scalable web applications with React & Next.js",
    "Crafting intuitive mobile experiences for iOS & Android",
    "Developing AI-powered solutions with modern LLMs",
    "Creating full-stack applications with robust architectures",
    "Integrating cutting-edge technologies for optimal user experience",
    "Designing responsive interfaces with exceptional performance"
  ];

  // Social media links
  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/krishnakorukanti",
      icon: "github"
    },
    {
      name: "LinkedIn", 
      href: "https://linkedin.com/in/crishnakorukanti",
      icon: "linkedin"
    },
    {
      name: "Twitter",
      href: "https://twitter.com/crishna_c", 
      icon: "twitter"
    }
  ];

  // Terminal commands for the interactive section
  const commands = [
    {
      command: "ai-crishna --info",
      delay: 1500,
      output: [
        "Initializing AI Assistant...",
        "Loading Krishna's profile...",
        "",
        "👋 Hi! I'm an AI assistant trained to answer questions about Krishna.",
        "Ask me anything about his experience, skills, or projects!",
        "",
        "Try asking: 'What projects has Krishna worked on?' or 'What are his skills?'"
      ]
    },
    {
      command: "ai-crishna --skills",
      delay: 2000,
      output: [
        "🛠️  Core Technologies:",
        "• Frontend: React, Next.js, TypeScript, Tailwind CSS",
        "• Backend: Node.js, Express, Python, Java",
        "• Mobile: Android (Kotlin), iOS (Swift), React Native",
        "• AI/ML: TensorFlow, PyTorch, LangChain, OpenAI API",
        "• Database: PostgreSQL, MongoDB, Redis",
        "• Cloud: AWS, Vercel, Docker",
        "",
        "Type any question to continue our conversation!"
      ]
    }
  ];

  // Footer navigation links
  const footerNavigation = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <>
      <div className="flex flex-col items-center w-screen min-h-screen overflow-x-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
        {/* Background Particles */}
        <Particles
          className="absolute inset-0 -z-10 animate-fade-in"
          quantity={100}
        />
        
        {/* Main Content */}
        <main className="w-full">
          <HeroSection 
            aiDescriptions={aiDescriptions}
            socialLinks={socialLinks}
          />
          
          <TerminalSection commands={commands} />
          
          <AboutSection />
          
          <ExpertiseSection />
          
          <ProjectsSection />
          
          <GitHubSection />
          
          <ContactSection />
        </main>
        
        {/* Footer */}
        <FooterSection navigation={footerNavigation} />
      </div>

      {/* Analytics */}
      <Analytics />
      <SpeedInsights />
    </>
  );
}
