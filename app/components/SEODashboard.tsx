import React from 'react';
import { FiTrendingUp, FiEye, FiExternalLink, FiSearch, FiBarChart2, FiClock } from 'react-icons/fi';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: React.ReactNode;
  tooltip?: string;
}

interface SEODashboardProps {
  pageViews: Record<string, number>;
  topPages: Array<{slug: string, views: number, title: string}>;
  averageTimeOnSite?: string;
  bounceRate?: string;
  searchImpressions?: number;
  searchClicks?: number;
  searchCTR?: string;
  searchPosition?: number;
}

function MetricCard({ title, value, change, isPositive = true, icon, tooltip }: MetricCardProps) {
  return (
    <div className="bg-zinc-900/40 backdrop-blur-sm rounded-xl border border-zinc-800 p-4 relative overflow-hidden hover:border-zinc-700 transition-all duration-300">
      <div className="flex justify-between items-start mb-2">
        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
          {icon}
        </div>
        {tooltip && (
          <div className="group relative">
            <span className="text-zinc-500 cursor-help">?</span>
            <div className="absolute right-0 w-48 p-2 mt-1 text-xs bg-zinc-800 rounded-md shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              {tooltip}
            </div>
          </div>
        )}
      </div>
      
      <h3 className="text-sm font-medium text-zinc-400 mt-2">{title}</h3>
      <div className="mt-1 flex items-baseline justify-between">
        <p className="text-2xl font-semibold text-zinc-200">{value}</p>
        {change && (
          <span className={`text-xs font-medium flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? '↑' : '↓'} {change}
          </span>
        )}
      </div>
    </div>
  );
}

export function SEODashboard({
  pageViews,
  topPages,
  averageTimeOnSite = '1m 45s',
  bounceRate = '52%',
  searchImpressions = 0,
  searchClicks = 0,
  searchCTR = '0%',
  searchPosition = 0
}: SEODashboardProps) {
  // Calculate total page views
  const totalViews = Object.values(pageViews).reduce((sum, views) => sum + views, 0);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-zinc-200">SEO Performance Dashboard</h2>
        <div className="text-sm text-zinc-400">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Page Views"
          value={totalViews.toLocaleString()}
          icon={<FiEye className="text-blue-400" />}
          tooltip="Total number of views across all pages"
        />
        
        <MetricCard
          title="Avg. Time on Site"
          value={averageTimeOnSite}
          icon={<FiClock className="text-emerald-400" />}
          tooltip="Average time visitors spend on your site"
        />
        
        <MetricCard
          title="Bounce Rate"
          value={bounceRate}
          icon={<FiBarChart2 className="text-purple-400" />}
          tooltip="Percentage of visitors who navigate away after viewing only one page"
        />
        
        <MetricCard
          title="Search Position"
          value={searchPosition || "N/A"}
          icon={<FiSearch className="text-amber-400" />}
          tooltip="Average position in search results (requires Search Console data)"
        />
      </div>
      
      {(searchImpressions > 0 || searchClicks > 0) && (
        <div className="bg-zinc-900/40 backdrop-blur-sm rounded-xl border border-zinc-800 p-6 relative overflow-hidden">
          <h3 className="text-md font-medium text-zinc-300 mb-4">Search Console Performance</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <p className="text-sm text-zinc-400">Impressions</p>
              <p className="text-2xl font-semibold text-zinc-200">{searchImpressions.toLocaleString()}</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-zinc-400">Clicks</p>
              <p className="text-2xl font-semibold text-zinc-200">{searchClicks.toLocaleString()}</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-zinc-400">CTR</p>
              <p className="text-2xl font-semibold text-zinc-200">{searchCTR}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-zinc-900/40 backdrop-blur-sm rounded-xl border border-zinc-800 p-6 relative overflow-hidden">
        <h3 className="text-md font-medium text-zinc-300 mb-4">Top Performing Pages</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-zinc-400 text-sm border-b border-zinc-800">
                <th className="pb-2">Page</th>
                <th className="pb-2">Views</th>
                <th className="pb-2">% of Total</th>
                <th className="pb-2"></th>
              </tr>
            </thead>
            <tbody>
              {topPages.slice(0, 5).map((page) => (
                <tr key={page.slug} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                  <td className="py-3 text-zinc-300 font-medium truncate max-w-[200px] md:max-w-[300px]">
                    {page.title}
                  </td>
                  <td className="py-3 text-zinc-300">{page.views.toLocaleString()}</td>
                  <td className="py-3 text-zinc-400">
                    {totalViews > 0 ? `${((page.views / totalViews) * 100).toFixed(1)}%` : '0%'}
                  </td>
                  <td className="py-3 text-right">
                    <a
                      href={`/projects/${page.slug}`}
                      className="text-blue-400 hover:text-blue-300 flex items-center justify-end"
                      title="View page"
                    >
                      <FiExternalLink className="h-4 w-4" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="text-sm text-zinc-500 italic mt-2">
        Note: Connect Google Search Console for more comprehensive SEO metrics.
      </div>
    </div>
  );
} 