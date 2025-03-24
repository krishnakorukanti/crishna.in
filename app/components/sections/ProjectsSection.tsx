import React from "react";
import Link from "next/link";
import OptimizedImage from "../OptimizedImage";
import { FiArrowRight } from "react-icons/fi";

export interface Project {
  id: string;
  title: string;
  description: string;
  emoji: string;
  techStack: string[];
  href: string;
  previewImage?: string;
  isPublished?: boolean;
}

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  // Filter only published projects
  const publishedProjects = projects.filter(project => project.isPublished !== false);
  
  return (
    <section id="projects" className="w-full min-h-screen flex flex-col items-center justify-center relative px-4 py-24 overflow-hidden">
      <h2 className="text-3xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 animate-fade-in-up">Featured Projects</h2>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {publishedProjects.map((project) => (
          <Link
            href={project.href}
            key={project.id}
            className="bg-zinc-900/40 backdrop-blur-sm rounded-xl p-5 sm:p-6 border border-zinc-800 hover:border-zinc-700 transition-all duration-500 flex flex-col h-full group animate-fade-in-up"
          >
            {project.previewImage && (
              <div className="w-full h-40 overflow-hidden rounded-lg mb-4 relative">
                <OptimizedImage
                  src={project.previewImage}
                  alt={project.title}
                  width={600}
                  height={300}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent"></div>
              </div>
            )}
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-zinc-100 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300">
                {project.title}
              </h3>
              <span className="text-2xl">{project.emoji}</span>
            </div>
            <p className="text-zinc-400 flex-grow">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-zinc-800/80 text-zinc-300 text-xs rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
      
      {/* View All Projects Link */}
      <div className="mt-12 text-center">
        <Link 
          href="/projects" 
          className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 transition-colors duration-300 px-6 py-3 rounded-full text-zinc-200 font-medium group"
        >
          <span>View All Projects</span>
          <FiArrowRight className="transform group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
      
      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 w-full flex justify-center animate-bounce">
        <a href="#github" aria-label="Scroll to GitHub section" className="w-8 h-12 border-2 border-zinc-400 rounded-full flex items-center justify-center hover:border-blue-400 hover:scale-110 transition-all duration-300 group">
          <div className="w-1 h-3 bg-zinc-400 rounded-full group-hover:bg-blue-400 animate-bounce-slow"></div>
        </a>
      </div>
    </section>
  );
} 