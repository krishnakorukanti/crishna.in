import Link from "next/link";
import React from "react";
import { allProjects } from "contentlayer/generated";
import { Card } from "../components/card";
import { Article } from "./article";
import { Redis } from "@upstash/redis";
import { Eye } from "lucide-react";
import { FiArrowRight, FiExternalLink, FiArrowLeft } from "react-icons/fi";
import { Metadata } from "next";
import { constructMetadata } from "@/app/components/SEO";
import { Breadcrumb } from "@/app/components/Breadcrumb";

export const metadata: Metadata = constructMetadata({
  title: "Projects | Crishna Korukanti",
  description: "Explore my portfolio of web, mobile, and AI projects. From full-stack applications to mobile apps with millions of downloads.",
  url: "https://crishna.in/projects",
});

const redis = Redis.fromEnv();

// Set gradient colors for project cards
const gradientColors = [
  'from-blue-500/40 to-purple-600/40',
  'from-amber-500/40 to-orange-600/40',
  'from-emerald-500/40 to-teal-600/40',
  'from-pink-500/40 to-rose-600/40',
  'from-indigo-500/40 to-blue-600/40',
];

// Function to extract tags from a project
const extractTags = (project: { tags?: string[], description: string }) => {
  // First try to use the explicit tags if available
  if (project.tags && project.tags.length > 0) {
    return project.tags;
  }
  
  // Fallback to extracting keywords from description
  const commonTags = ["Web", "Mobile", "App", "AI", "API", "UI/UX", "Design", "Development"];
  const description = project.description.toLowerCase();
  
  const foundTags = commonTags.filter(tag => 
    description.includes(tag.toLowerCase())
  );
  
  return foundTags.length > 0 ? 
    foundTags : ["Web", "Development", "Software"];
};

export const revalidate = 60;
export default async function ProjectsPage() {
  const views = (
    await redis.mget<number[]>(
      ...allProjects.map((p) => ["pageviews", "projects", p.slug].join(":")),
    )
  ).reduce((acc, v, i) => {
    acc[allProjects[i].slug] = v ?? 0;
    return acc;
  }, {} as Record<string, number>);

  // Featured project - prioritize Soleil Space
  const featured = allProjects.find((project) => project.slug === "soleilspace.com")!;
  // Second featured project - Survey Heart Android
  const secondFeatured = allProjects.find((project) => project.slug === "survey-heart-android")!;
  // Get other high-quality projects for the rest of the grid
  const sorted = allProjects
    .filter((p) => p.published)
    .filter(
      (project) =>
        project.slug !== featured.slug &&
        project.slug !== secondFeatured.slug,
    )
    .sort(
      (a, b) =>
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
    );

  return (
    <div className="relative pb-16 bg-gradient-to-tl from-black via-zinc-600/20 to-black min-h-screen">
      <div className="fixed top-6 left-6 z-50">
        <Link 
          href="/" 
          className="flex items-center space-x-2 px-4 py-2 bg-zinc-900/80 backdrop-blur-md rounded-full text-zinc-400 hover:text-zinc-200 transition-all duration-300"
        >
          <FiArrowLeft className="h-4 w-4" />
          <span className="text-sm">Back to Home</span>
        </Link>
      </div>
      
      <div className="container mx-auto pt-6 px-6">
        <Breadcrumb 
          items={[
            { label: 'Projects', href: '/projects', isCurrentPage: true }
          ]} 
        />
      </div>
      
      <div className="px-6 pt-16 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-20 lg:pt-24">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Projects
          </h2>
          <p className="mt-4 text-zinc-400">
            A collection of my work across various domains and technologies
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />

        {/* Featured Projects Section */}
        <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2">
          {/* Main Featured Project */}
          <div className="bg-zinc-900/40 backdrop-blur-sm rounded-xl border border-zinc-800 overflow-hidden group hover:border-zinc-700 transition-all duration-300">
            <Link href={`/projects/${featured.slug}`}>
              <div className="relative h-60 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/40 to-purple-600/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-medium text-white px-4 text-center">{featured.title}</span>
                </div>
                <div className="absolute inset-0 bg-zinc-900/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <div className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm flex items-center space-x-1 hover:bg-white/30 transition-colors duration-300">
                    <span>View Project</span>
                    <FiExternalLink className="ml-1" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs text-zinc-300">
                    {featured.date ? (
                      <time dateTime={new Date(featured.date).toISOString()}>
                        {Intl.DateTimeFormat(undefined, {
                          dateStyle: "medium",
                        }).format(new Date(featured.date))}
                      </time>
                    ) : (
                      <span>SOON</span>
                    )}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-zinc-500">
                    <Eye className="w-4 h-4" />{" "}
                    {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                      views[featured.slug] ?? 0,
                    )}
                  </span>
                </div>
                <h3 className="text-xl text-zinc-200 mb-2 font-medium">{featured.title}</h3>
                <p className="text-zinc-400 text-sm mb-4">{featured.description}</p>
                <div className="flex flex-wrap gap-2">
                  {extractTags(featured).slice(0, 4).map((tag, idx) => (
                    <span key={idx} className="px-2 py-1 bg-zinc-800 text-zinc-400 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </div>

          {/* Second Featured Project */}
          <div className="bg-zinc-900/40 backdrop-blur-sm rounded-xl border border-zinc-800 overflow-hidden group hover:border-zinc-700 transition-all duration-300">
            <Link href={`/projects/${secondFeatured.slug}`}>
              <div className="relative h-60 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/40 to-orange-600/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-medium text-white px-4 text-center">{secondFeatured.title}</span>
                </div>
                <div className="absolute inset-0 bg-zinc-900/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <div className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm flex items-center space-x-1 hover:bg-white/30 transition-colors duration-300">
                    <span>View Project</span>
                    <FiExternalLink className="ml-1" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs text-zinc-300">
                    {secondFeatured.date ? (
                      <time dateTime={new Date(secondFeatured.date).toISOString()}>
                        {Intl.DateTimeFormat(undefined, {
                          dateStyle: "medium",
                        }).format(new Date(secondFeatured.date))}
                      </time>
                    ) : (
                      <span>SOON</span>
                    )}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-zinc-500">
                    <Eye className="w-4 h-4" />{" "}
                    {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                      views[secondFeatured.slug] ?? 0,
                    )}
                  </span>
                </div>
                <h3 className="text-xl text-zinc-200 mb-2 font-medium">{secondFeatured.title}</h3>
                <p className="text-zinc-400 text-sm mb-4">{secondFeatured.description}</p>
                <div className="flex flex-wrap gap-2">
                  {extractTags(secondFeatured).slice(0, 4).map((tag, idx) => (
                    <span key={idx} className="px-2 py-1 bg-zinc-800 text-zinc-400 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </div>
        </div>
        
        <div className="hidden w-full h-px md:block bg-zinc-800" />

        {/* Remaining Projects Grid */}
        <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
          {sorted.map((project, index) => (
            <div 
              key={project.slug} 
              className="bg-zinc-900/40 backdrop-blur-sm rounded-xl border border-zinc-800 overflow-hidden group hover:border-zinc-700 transition-all duration-300"
            >
              <Link href={`/projects/${project.slug}`}>
                <div className="relative h-36 overflow-hidden">
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${gradientColors[index % gradientColors.length]}`}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-medium text-white px-4 text-center">{project.title}</span>
                  </div>
                  <div className="absolute inset-0 bg-zinc-900/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <div className="px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-xs flex items-center space-x-1 hover:bg-white/30 transition-colors duration-300">
                      <span>View Project</span>
                      <FiExternalLink className="ml-1 h-3 w-3" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-zinc-300">
                      {project.date ? (
                        <time dateTime={new Date(project.date).toISOString()}>
                          {Intl.DateTimeFormat(undefined, {
                            dateStyle: "medium",
                          }).format(new Date(project.date))}
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
                  <h3 className="text-lg text-zinc-200 mb-2 font-medium">{project.title}</h3>
                  <p className="text-zinc-400 text-xs mb-3 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {extractTags(project).slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-zinc-800 text-zinc-400 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
