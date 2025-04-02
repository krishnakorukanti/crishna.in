import React from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import ProjectCard from "../ProjectCard";
import { allProjects } from "contentlayer/generated";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

interface ProjectsSectionProps {
  featuredSlugs?: string[];
  showAllProjects?: boolean;
}

export default async function ProjectsSection({ 
  featuredSlugs = ["letmedoit", "survey-heart-android", "crishna.in"],
  showAllProjects = false 
}: ProjectsSectionProps) {
  // Get all published projects
  const allPublishedProjects = allProjects.filter(p => p.published);
  
  // Fetch view counts for all projects
  const views = (
    await redis.mget<number[]>(
      ...allPublishedProjects.map((p) => ["pageviews", "projects", p.slug].join(":")),
    )
  ).reduce((acc, v, i) => {
    acc[allPublishedProjects[i].slug] = v ?? 0;
    return acc;
  }, {} as Record<string, number>);

  // Order projects based on featured status and view count
  const projects = showAllProjects
    ? allPublishedProjects.sort((a, b) => {
        // First sort by featured status
        const aIsFeatured = featuredSlugs.includes(a.slug);
        const bIsFeatured = featuredSlugs.includes(b.slug);
        
        if (aIsFeatured && !bIsFeatured) return -1;
        if (!aIsFeatured && bIsFeatured) return 1;
        
        // Then sort by view count
        const aViews = views[a.slug] ?? 0;
        const bViews = views[b.slug] ?? 0;
        return bViews - aViews;
      })
    : featuredSlugs.map(slug => allPublishedProjects.find(p => p.slug === slug)).filter((p): p is typeof allPublishedProjects[number] => !!p);
  
  return (
    <section id="projects" className="w-full min-h-screen flex flex-col items-center justify-center relative px-4 py-24 overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 animate-fade-in-up">
          {showAllProjects ? "All Projects" : "Featured Projects"}
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
          {showAllProjects 
            ? "Browse through my complete portfolio of projects, showcasing my expertise across different technologies and domains."
            : "Explore some of my recent work showcasing my expertise in full-stack development, mobile applications, and AI integration."}
        </p>
      </div>
      
      {/* Projects Grid */}
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard 
              key={project.slug} 
              slug={project.slug} 
              views={views[project.slug]}
            />
          ))}
        </div>
      </div>
      
      {/* View All Projects Link - Only show on home page */}
      {!showAllProjects && (
        <div className="mt-16 text-center">
          <Link 
            href="/projects" 
            className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 transition-colors duration-300 px-8 py-4 rounded-full text-zinc-200 font-medium group animate-fade-in-up animation-delay-400"
          >
            <span>View All Projects</span>
            <FiArrowRight className="transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      )}
      
      {/* Scroll Down Indicator - Only show on home page */}
      {!showAllProjects && (
        <div className="absolute bottom-10 w-full flex justify-center animate-bounce">
          <a href="#github" aria-label="Scroll to GitHub section" className="w-8 h-12 border-2 border-zinc-400 rounded-full flex items-center justify-center hover:border-blue-400 hover:scale-110 transition-all duration-300 group">
            <div className="w-1 h-3 bg-zinc-400 rounded-full group-hover:bg-blue-400 animate-bounce-slow"></div>
          </a>
        </div>
      )}
    </section>
  );
} 