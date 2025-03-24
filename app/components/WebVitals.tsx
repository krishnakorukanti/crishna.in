import React from 'react';
import { WebVitalsData } from '../lib/webVitals';

interface WebVitalsProps {
  data: WebVitalsData | null;
  url?: string;
}

/**
 * Component to display Core Web Vitals and other performance metrics
 * This helps track SEO-relevant performance indicators
 */
export function WebVitals({ data, url = 'https://crishna.in' }: WebVitalsProps) {
  if (!data) {
    return (
      <div className="space-y-4">
        <h3 className="text-md font-medium text-zinc-300">Core Web Vitals</h3>
        <div className="bg-zinc-900/40 backdrop-blur-sm rounded-xl border border-zinc-800 p-6 text-center">
          <p className="text-zinc-400">No data available. Run a PageSpeed Insights test to see your Core Web Vitals.</p>
          <a 
            href={`https://pagespeed.web.dev/report?url=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-4 py-2 bg-blue-600/80 text-white rounded-md hover:bg-blue-700/80 transition-colors"
          >
            Run Test
          </a>
        </div>
      </div>
    );
  }

  // Helper function to format scores as percentages
  const formatScore = (score?: number) => {
    return score !== undefined ? `${Math.round(score * 100)}%` : 'N/A';
  };

  // Helper function to determine color class based on value
  const getColorClass = (value: boolean) => {
    return value ? 'text-green-500' : 'text-red-500';
  };

  // Metrics display configuration
  const coreMetrics = [
    { 
      name: 'LCP', 
      value: data.metrics.lcp !== undefined ? `${data.metrics.lcp.toFixed(2)}s` : 'N/A',
      label: 'Largest Contentful Paint',
      description: 'Time until the largest content element is visible',
      passed: data.passed.lcp,
      target: '≤ 2.5s'
    },
    { 
      name: 'FID', 
      value: data.metrics.fid !== undefined ? `${data.metrics.fid.toFixed(0)}ms` : 'N/A',
      label: 'First Input Delay',
      description: 'Time from first interaction to response',
      passed: data.passed.fid,
      target: '≤ 100ms'
    },
    { 
      name: 'CLS', 
      value: data.metrics.cls !== undefined ? data.metrics.cls.toFixed(3) : 'N/A',
      label: 'Cumulative Layout Shift',
      description: 'Measure of visual stability',
      passed: data.passed.cls,
      target: '≤ 0.1'
    }
  ];

  // Other performance metrics
  const otherMetrics = [
    { 
      name: 'FCP', 
      value: data.metrics.fcp !== undefined ? `${data.metrics.fcp.toFixed(2)}s` : 'N/A',
      label: 'First Contentful Paint' 
    },
    { 
      name: 'TTFB', 
      value: data.metrics.ttfb !== undefined ? `${data.metrics.ttfb.toFixed(2)}s` : 'N/A',
      label: 'Time to First Byte' 
    },
    { 
      name: 'TTI', 
      value: data.metrics.tti !== undefined ? `${data.metrics.tti.toFixed(2)}s` : 'N/A',
      label: 'Time to Interactive' 
    },
    { 
      name: 'TBT', 
      value: data.metrics.tbt !== undefined ? `${data.metrics.tbt.toFixed(0)}ms` : 'N/A',
      label: 'Total Blocking Time' 
    }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-md font-medium text-zinc-300">Core Web Vitals</h3>
      
      {/* Overall Scores */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-zinc-900/40 backdrop-blur-sm rounded-xl border border-zinc-800 p-4">
          <p className="text-xs text-zinc-400">Performance</p>
          <p className="text-xl text-zinc-200 font-medium">{formatScore(data.scores.performance)}</p>
        </div>
        <div className="bg-zinc-900/40 backdrop-blur-sm rounded-xl border border-zinc-800 p-4">
          <p className="text-xs text-zinc-400">SEO</p>
          <p className="text-xl text-zinc-200 font-medium">{formatScore(data.scores.seo)}</p>
        </div>
        <div className="bg-zinc-900/40 backdrop-blur-sm rounded-xl border border-zinc-800 p-4">
          <p className="text-xs text-zinc-400">Accessibility</p>
          <p className="text-xl text-zinc-200 font-medium">{formatScore(data.scores.accessibility)}</p>
        </div>
        <div className="bg-zinc-900/40 backdrop-blur-sm rounded-xl border border-zinc-800 p-4">
          <p className="text-xs text-zinc-400">Best Practices</p>
          <p className="text-xl text-zinc-200 font-medium">{formatScore(data.scores.bestPractices)}</p>
        </div>
      </div>
      
      {/* Core Web Vitals Metrics */}
      <div className="bg-zinc-900/40 backdrop-blur-sm rounded-xl border border-zinc-800 p-6 space-y-6">
        <h4 className="text-sm font-medium text-zinc-200">Core Web Vitals Assessment</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coreMetrics.map((metric) => (
            <div key={metric.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm text-zinc-300 font-medium">{metric.name}: </span>
                  <span className={`text-lg font-semibold ${getColorClass(metric.passed)}`}>
                    {metric.value}
                  </span>
                </div>
                <span className={`text-xs ${getColorClass(metric.passed)}`}>
                  {metric.passed ? 'PASS' : 'FAIL'}
                </span>
              </div>
              <p className="text-xs text-zinc-400">{metric.label}</p>
              <div className="text-xs text-zinc-500 flex justify-between">
                <span>{metric.description}</span>
                <span>Target: {metric.target}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Other Metrics */}
      <div className="bg-zinc-900/40 backdrop-blur-sm rounded-xl border border-zinc-800 p-6">
        <h4 className="text-sm font-medium text-zinc-200 mb-4">Other Performance Metrics</h4>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {otherMetrics.map((metric) => (
            <div key={metric.name} className="space-y-1">
              <p className="text-xs text-zinc-400">{metric.label}</p>
              <p className="text-md text-zinc-200 font-medium">{metric.value}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-xs text-zinc-500 flex justify-between">
        <span>URL: {data.url}</span>
        <span>
          Analyzed on: {new Date(data.fetchTime).toLocaleDateString()} {new Date(data.fetchTime).toLocaleTimeString()}
        </span>
      </div>
      
      <div className="text-center mt-4">
        <a 
          href={`https://pagespeed.web.dev/report?url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-zinc-800 text-zinc-300 rounded-md hover:bg-zinc-700 transition-colors text-sm"
        >
          Run New Test
        </a>
      </div>
    </div>
  );
} 