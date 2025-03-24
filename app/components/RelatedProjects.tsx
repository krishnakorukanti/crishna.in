import React from 'react';
import Link from 'next/link';
import { Eye } from 'lucide-react';
import { FiExternalLink } from 'react-icons/fi';

interface Project {
  slug: string;
  title: string;
  description: string;
  date?: string;
  tags?: string[];
  image?: string;
}

interface RelatedProjectsProps {
  currentProjectSlug: string;
  allProjects: Project[];
  views: Record<string, number>;
  maxProjects?: number;
}

/**
 * Displays related projects based on tags or categories
 * Improves internal linking and user engagement
 */
export function RelatedProjects({
  currentProjectSlug,
  allProjects,
  views,
  maxProjects = 3,
}: RelatedProjectsProps) {
  // Get current project
  const currentProject = allProjects.find(p => p.slug === currentProjectSlug);
  
  if (!currentProject || allProjects.length <= 1) {
    return null;
  }
  
  const currentTags = currentProject.tags || [];
  
  // Find projects with matching tags
  const relatedProjects = allProjects
    .filter(project => 
      project.slug !== currentProjectSlug && 
      project.tags?.some(tag => currentTags.includes(tag))
    )
    .slice(0, maxProjects);
    
  // If not enough related projects by tags, add other projects
  if (relatedProjects.length < maxProjects) {
    const otherProjects = allProjects
      .filter(project => 
        project.slug !== currentProjectSlug && 
        !relatedProjects.find(p => p.slug === project.slug)
      )
      .slice(0, maxProjects - relatedProjects.length);
      
    relatedProjects.push(...otherProjects);
  }
  
  if (relatedProjects.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-12 pt-8 border-t border-zinc-800">
      <h3 className="text-xl text-zinc-200 mb-6">Related Projects</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {relatedProjects.map((project) => (
          <div 
            key={project.slug}
            className="bg-zinc-900/40 backdrop-blur-sm rounded-xl border border-zinc-800 overflow-hidden hover:border-zinc-700 transition-all duration-300"
          >
            <Link href={`/projects/${project.slug}`}>
              <div className="p-5">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs text-zinc-400">
                    {project.date ? (
                      <time dateTime={new Date(project.date).toISOString()}>
                        {new Date(project.date).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                        })}
                      </time>
                    ) : (
                      <span>SOON</span>
                    )}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-zinc-500">
                    <Eye className="w-3 h-3" />{" "}
                    {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                      views[project.slug] ?? 0,
                    )}
                  </span>
                </div>
                
                <h4 className="text-lg text-zinc-200 mb-2 hover:text-zinc-100">{project.title}</h4>
                <p className="text-zinc-400 text-xs mb-3 line-clamp-2">{project.description}</p>
                
                <div className="flex items-center text-xs text-blue-400 hover:text-blue-300 transition-colors">
                  <span>Read more</span>
                  <FiExternalLink className="ml-1 h-3 w-3" />
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
} 