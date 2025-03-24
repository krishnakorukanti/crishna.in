/**
 * Utility to fetch Core Web Vitals data from Google PageSpeed Insights API
 * 
 * This helps monitor performance metrics that impact search rankings
 */

export type WebVitalsData = {
  url: string;
  fetchTime: string;
  scores: {
    performance?: number;
    accessibility?: number;
    bestPractices?: number;
    seo?: number;
  };
  metrics: {
    lcp?: number;  // Largest Contentful Paint (seconds)
    fid?: number;  // First Input Delay (milliseconds)
    cls?: number;  // Cumulative Layout Shift (score)
    fcp?: number;  // First Contentful Paint (seconds)
    ttfb?: number; // Time to First Byte (seconds)
    si?: number;   // Speed Index (seconds)
    tti?: number;  // Time to Interactive (seconds)
    tbt?: number;  // Total Blocking Time (milliseconds)
  };
  passed: {
    lcp: boolean;
    fid: boolean;
    cls: boolean;
  };
};

/**
 * Fetches Core Web Vitals and other performance metrics from PageSpeed Insights API
 * @param url The URL to analyze
 * @param strategy 'mobile' or 'desktop'
 * @returns WebVitals data or null if the API call fails
 */
export async function getWebVitals(
  url: string = 'https://crishna.in',
  strategy: 'mobile' | 'desktop' = 'mobile'
): Promise<WebVitalsData | null> {
  // Check if API key is available
  const apiKey = process.env.PAGESPEED_API_KEY;
  
  // Define PageSpeed Insights API URL
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}${apiKey ? `&key=${apiKey}` : ''}`;
  
  try {
    // Fetch data from PageSpeed Insights API
    const response = await fetch(apiUrl, { 
      next: { revalidate: 86400 } // Cache for 24 hours
    });
    
    if (!response.ok) {
      throw new Error(`PageSpeed API returned ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Extract the needed metrics
    const audits = data.lighthouseResult?.audits || {};
    const categories = data.lighthouseResult?.categories || {};
    
    // Metric thresholds based on Google's Core Web Vitals
    const thresholds = {
      lcp: 2.5,    // Good LCP is <= 2.5s
      fid: 100,    // Good FID is <= 100ms
      cls: 0.1,    // Good CLS is <= 0.1
    };
    
    // Extract metrics
    const lcpSeconds = audits['largest-contentful-paint']?.numericValue / 1000;
    const fidMs = audits['max-potential-fid']?.numericValue; // This is not exactly FID but closest estimate
    const cls = audits['cumulative-layout-shift']?.numericValue;
    const fcpSeconds = audits['first-contentful-paint']?.numericValue / 1000;
    const ttfbSeconds = audits['server-response-time']?.numericValue / 1000;
    const siSeconds = audits['speed-index']?.numericValue / 1000;
    const ttiSeconds = audits['interactive']?.numericValue / 1000;
    const tbtMs = audits['total-blocking-time']?.numericValue;
    
    // Determine if metrics pass the good thresholds
    const results: WebVitalsData = {
      url,
      fetchTime: new Date().toISOString(),
      scores: {
        performance: categories.performance?.score,
        accessibility: categories.accessibility?.score,
        bestPractices: categories['best-practices']?.score,
        seo: categories.seo?.score,
      },
      metrics: {
        lcp: lcpSeconds,
        fid: fidMs,
        cls,
        fcp: fcpSeconds,
        ttfb: ttfbSeconds,
        si: siSeconds,
        tti: ttiSeconds,
        tbt: tbtMs,
      },
      passed: {
        lcp: lcpSeconds !== undefined ? lcpSeconds <= thresholds.lcp : false,
        fid: fidMs !== undefined ? fidMs <= thresholds.fid : false,
        cls: cls !== undefined ? cls <= thresholds.cls : false,
      }
    };
    
    return results;
  } catch (error) {
    console.error('Error fetching PageSpeed Insights data:', error);
    return null;
  }
} 