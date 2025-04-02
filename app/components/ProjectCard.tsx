import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import { Eye } from "lucide-react";
import { allProjects } from "contentlayer/generated";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export interface ProjectCardProps {
  slug: string;
  className?: string;
  views?: number;
}

export default async function ProjectCard({ slug, className = "", views = 0 }: ProjectCardProps) {
  const project = allProjects.find((p) => p.slug === slug);
  
  if (!project) return null;

  // Increment view count when card is rendered
  const viewKey = ["pageviews", "projects", slug].join(":");
  await redis.incr(viewKey);

  return (
    <Link
      href={`/projects/${slug}`}
      className={`group relative bg-zinc-900/40 backdrop-blur-sm rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all duration-500 flex flex-col h-full animate-fade-in-up overflow-hidden ${className}`}
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Project image or gradient background */}
      <div className="relative w-full pt-[56.25%] bg-gradient-to-br from-zinc-800 to-zinc-900">
        {project.previewImage ? (
          <Image
            src={project.previewImage}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl">{project.emoji || '🚀'}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
        
        {/* Project title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-zinc-100 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300">
              {project.title}
            </h3>
            <span className="flex items-center gap-1 text-xs text-zinc-400">
              <Eye className="w-4 h-4" />
              {Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
            </span>
          </div>
        </div>
      </div>
      
      {/* Project content */}
      <div className="flex flex-col flex-grow p-4">
        <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{project.description}</p>
        
        {/* Tech stack tags */}
        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags?.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-zinc-800/80 text-zinc-300 text-xs rounded-full hover:bg-zinc-700 transition-colors duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
          
          {/* View project link */}
          <div className="flex items-center gap-2 text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
            <span className="text-sm font-medium">View Project</span>
            <FiArrowRight className="transform group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </Link>
  );
} 