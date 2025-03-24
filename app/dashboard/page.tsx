import React from 'react';
import { Redis } from "@upstash/redis";
import { allProjects } from "contentlayer/generated";
import { Metadata } from "next";
import { constructMetadata } from "@/app/components/SEO";
import { SEODashboard } from '../components/SEODashboard';
import { WebVitals } from '../components/WebVitals';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import { getSearchConsoleData } from '../lib/searchConsole';
import { getWebVitals } from '../lib/webVitals';

export const metadata: Metadata = constructMetadata({
  title: "SEO Dashboard | Crishna Korukanti",
  description: "Monitor SEO performance metrics and analytics for crishna.in",
  noIndex: true, // Don't index the dashboard page
});

const redis = Redis.fromEnv();

export default async function DashboardPage() {
  // Get page views for all projects
  const views = (
    await redis.mget<number[]>(
      ...allProjects.map((p) => ["pageviews", "projects", p.slug].join(":")),
    )
  ).reduce((acc, v, i) => {
    acc[allProjects[i].slug] = v ?? 0;
    return acc;
  }, {} as Record<string, number>);
  
  // Create array of top pages with views
  const topPages = allProjects
    .filter(p => p.published)
    .map(project => ({
      slug: project.slug,
      views: views[project.slug] ?? 0,
      title: project.title
    }))
    .sort((a, b) => b.views - a.views);
    
  // Try to get Search Console data (will return null if not configured)
  const searchConsoleData = await getSearchConsoleData();
  
  // Try to get Web Vitals data (will return null if not configured)
  const webVitalsData = await getWebVitals();
  
  return (
    <div className="bg-gradient-to-tl from-black via-zinc-800/20 to-black min-h-screen">
      <div className="fixed top-6 left-6 z-50">
        <Link 
          href="/" 
          className="flex items-center space-x-2 px-4 py-2 bg-zinc-900/80 backdrop-blur-md rounded-full text-zinc-400 hover:text-zinc-200 transition-all duration-300"
        >
          <FiArrowLeft className="h-4 w-4" />
          <span className="text-sm">Back to Home</span>
        </Link>
      </div>
      
      <div className="container mx-auto px-4 pt-24 pb-16 max-w-5xl">
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">SEO Analytics Dashboard</h1>
          <p className="text-zinc-400">Monitor your website's SEO performance and track key metrics</p>
        </header>
        
        <div className="bg-zinc-900/30 backdrop-blur-sm rounded-xl border border-zinc-800 p-6 md:p-8">
          <SEODashboard 
            pageViews={views}
            topPages={topPages}
            // Pass Search Console data if available
            searchImpressions={searchConsoleData?.impressions}
            searchClicks={searchConsoleData?.clicks}
            searchCTR={searchConsoleData?.ctr}
            searchPosition={searchConsoleData?.position}
            // These would normally come from analytics APIs
            averageTimeOnSite="2m 15s"
            bounceRate="45%"
          />
        </div>
        
        {/* Web Vitals Section */}
        <div className="mt-8 bg-zinc-900/30 backdrop-blur-sm rounded-xl border border-zinc-800 p-6 md:p-8">
          <WebVitals data={webVitalsData} />
        </div>
        
        {searchConsoleData?.topQueries && (
          <div className="mt-8 bg-zinc-900/30 backdrop-blur-sm rounded-xl border border-zinc-800 p-6 md:p-8">
            <h2 className="text-xl font-semibold text-zinc-200 mb-6">Top Search Queries</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-zinc-400 text-sm border-b border-zinc-800">
                    <th className="pb-2 pl-2">Search Query</th>
                    <th className="pb-2">Impressions</th>
                    <th className="pb-2">Clicks</th>
                    <th className="pb-2">CTR</th>
                    <th className="pb-2">Position</th>
                  </tr>
                </thead>
                <tbody>
                  {searchConsoleData.topQueries.map((query, index) => (
                    <tr key={index} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                      <td className="py-3 pl-2 text-zinc-300 font-medium">{query.query}</td>
                      <td className="py-3 text-zinc-300">{query.impressions.toLocaleString()}</td>
                      <td className="py-3 text-zinc-300">{query.clicks.toLocaleString()}</td>
                      <td className="py-3 text-zinc-300">{query.ctr}</td>
                      <td className="py-3 text-zinc-300">{query.position.toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        <div className="mt-12 space-y-6">
          <h2 className="text-xl font-semibold text-zinc-200">SEO Improvement Checklist</h2>
          
          <div className="bg-zinc-900/30 backdrop-blur-sm rounded-xl border border-zinc-800 p-6 md:p-8">
            <ul className="space-y-4 text-zinc-300">
              <li className="flex items-center">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-green-500/20 text-green-500 mr-3">✓</span>
                <span>Metadata optimization for all pages</span>
              </li>
              <li className="flex items-center">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-green-500/20 text-green-500 mr-3">✓</span>
                <span>Structured data implementation</span>
              </li>
              <li className="flex items-center">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-green-500/20 text-green-500 mr-3">✓</span>
                <span>Sitemap.xml generation</span>
              </li>
              <li className="flex items-center">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-green-500/20 text-green-500 mr-3">✓</span>
                <span>Robots.txt configuration</span>
              </li>
              <li className="flex items-center">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-green-500/20 text-green-500 mr-3">✓</span>
                <span>Image optimization with alt texts</span>
              </li>
              <li className="flex items-center">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-green-500/20 text-green-500 mr-3">✓</span>
                <span>Breadcrumb navigation</span>
              </li>
              <li className="flex items-center">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-green-500/20 text-green-500 mr-3">✓</span>
                <span>Internal linking structure</span>
              </li>
              <li className="flex items-center">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-green-500/20 text-green-500 mr-3">✓</span>
                <span>Social sharing integration</span>
              </li>
              <li className="flex items-center">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-amber-500/20 text-amber-500 mr-3">⟳</span>
                <span>Google Search Console verification and monitoring</span>
              </li>
              <li className="flex items-center">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-amber-500/20 text-amber-500 mr-3">⟳</span>
                <span>Backlink building strategy</span>
              </li>
              <li className="flex items-center">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-amber-500/20 text-amber-500 mr-3">⟳</span>
                <span>Core Web Vitals optimization</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 bg-zinc-900/30 backdrop-blur-sm rounded-xl border border-zinc-800 p-6 md:p-8">
          <h2 className="text-xl font-semibold text-zinc-200 mb-4">Next Steps to Improve SEO</h2>
          
          <ol className="space-y-4 text-zinc-300 list-decimal list-inside">
            <li>
              <span className="font-medium">Complete Google Search Console Integration</span>
              <p className="mt-1 text-zinc-400 text-sm pl-6">
                Finish verification process and start collecting search performance data for more accurate metrics.
              </p>
            </li>
            <li>
              <span className="font-medium">Run Core Web Vitals Analysis</span>
              <p className="mt-1 text-zinc-400 text-sm pl-6">
                Use tools like Lighthouse or PageSpeed Insights to identify performance bottlenecks.
              </p>
            </li>
            <li>
              <span className="font-medium">Develop a Backlink Strategy</span>
              <p className="mt-1 text-zinc-400 text-sm pl-6">
                Create a plan for building high-quality backlinks to boost domain authority.
              </p>
            </li>
            <li>
              <span className="font-medium">Set Up Regular SEO Audits</span>
              <p className="mt-1 text-zinc-400 text-sm pl-6">
                Schedule monthly checks to identify new improvement opportunities and track progress.
              </p>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
} 