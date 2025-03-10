'use client';
import React, { useEffect, useState } from 'react';
import { FaGithub, FaLock } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';

// Available color schemes for reference:
// amber, blue, bluegrey, brown, cyan, deeporange, deeppurple, green, grey, github, halloween

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionsData {
  totalContributions: number;
  weeks: ContributionWeek[];
}

const GitHubContributions: React.FC<{ 
  username: string;
  token?: string; // Optional GitHub token for private contributions
  theme?: 'standard' | 'blue'; // Theme options
}> = ({ 
  username, 
  token,
  theme = 'standard'
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contributionsData, setContributionsData] = useState<ContributionsData | null>(null);
  const [showPrivateHint, setShowPrivateHint] = useState(false);
  const [monthLabels, setMonthLabels] = useState<{label: string, index: number}[]>([]);
  
  // Color themes
  const colors = {
    standard: {
      background: '#0D1117',
      text: '#8b949e',
      meta: '#8b949e',
      grade4: '#39d353',
      grade3: '#26a641',
      grade2: '#006d32',
      grade1: '#0e4429',
      grade0: '#161b22'
    },
    blue: {
      background: '#0D1117',
      text: '#8b949e',
      meta: '#8b949e',
      grade4: '#4993EF',
      grade3: '#3178cd',
      grade2: '#21508f',
      grade1: '#193662',
      grade0: '#161b22'
    }
  };

  const selectedTheme = colors[theme];

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        setLoading(true);
        
        // If token is provided, fetch data from GitHub GraphQL API
        if (token) {
          // Calculate date range for contributions (last year)
          const today = new Date();
          const oneYearAgo = new Date();
          oneYearAgo.setFullYear(today.getFullYear() - 1);
          
          // Format dates as ISO strings for GitHub API
          const from = oneYearAgo.toISOString(); // Full ISO format with time
          const to = today.toISOString(); // Full ISO format with time

          // GraphQL query to fetch contributions
          const query = `
            query {
              user(login: "${username}") {
                contributionsCollection(from: "${from}", to: "${to}") {
                  contributionCalendar {
                    totalContributions
                    weeks {
                      firstDay
                      contributionDays {
                        date
                        contributionCount
                        contributionLevel
                      }
                    }
                  }
                }
              }
            }
          `;

          console.log('Fetching GitHub data with query:', query);

          const response = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error('GitHub API response:', errorText);
            throw new Error(`GitHub API error: ${response.status}`);
          }

          const data = await response.json();
          
          if (data.errors) {
            console.error('GraphQL errors:', data.errors);
            throw new Error(data.errors[0].message);
          }

          const calendarData = data.data?.user?.contributionsCollection?.contributionCalendar;
          
          if (!calendarData) {
            throw new Error('No contribution data found');
          }

          // Transform to our format
          setContributionsData({
            totalContributions: calendarData.totalContributions,
            weeks: calendarData.weeks.map((week: any) => ({
              contributionDays: week.contributionDays.map((day: any) => ({
                date: day.date,
                count: day.contributionCount,
                level: getLevelFromContributionLevel(day.contributionLevel)
              }))
            }))
          });
          
          // Generate month labels based on the actual data
          generateMonthLabels(calendarData.weeks);

          // If token is provided, show the private hint
          setShowPrivateHint(true);
        } else {
          // If no token, use the backup SVG approach
          // Just set loading to false and let the iframe load
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching GitHub contributions:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      } finally {
        if (token) {
          setLoading(false);
        }
      }
    };

    fetchContributions();
  }, [username, token]);
  
  // Generate month labels based on contribution data
  const generateMonthLabels = (weeks: any[]) => {
    if (!weeks || weeks.length === 0) return;
    
    const labels: {label: string, index: number}[] = [];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    let lastMonth = -1;
    
    weeks.forEach((week, weekIndex) => {
      const firstDayDate = new Date(week.firstDay);
      const month = firstDayDate.getMonth();
      
      // If this is a new month, add it to our labels
      if (month !== lastMonth) {
        labels.push({
          label: months[month],
          index: weekIndex
        });
        lastMonth = month;
      }
    });
    
    setMonthLabels(labels);
  };

  // Helper function to convert GitHub's contribution level to our numeric format
  const getLevelFromContributionLevel = (level: string): 0 | 1 | 2 | 3 | 4 => {
    switch (level) {
      case 'NONE': return 0;
      case 'FIRST_QUARTILE': return 1;
      case 'SECOND_QUARTILE': return 2;
      case 'THIRD_QUARTILE': return 3;
      case 'FOURTH_QUARTILE': return 4;
      default: return 0;
    }
  };

  // Get color based on contribution level
  const getColorForLevel = (level: number) => {
    switch (level) {
      case 0: return selectedTheme.grade0;
      case 1: return selectedTheme.grade1;
      case 2: return selectedTheme.grade2;
      case 3: return selectedTheme.grade3;
      case 4: return selectedTheme.grade4;
      default: return selectedTheme.grade0;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (error) {
    return (
      <div className="w-full py-10 text-center">
        <div className="bg-red-900/20 text-red-400 p-4 rounded-lg max-w-md mx-auto">
          <p>Failed to load GitHub contributions: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-6 md:py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center">
          {loading ? (
            <div className="w-full flex justify-center py-16">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between w-full mb-6 px-4">
                <div className="flex items-center space-x-2">
                  <FaGithub className="text-zinc-400" size={22} />
                  <h3 className="text-xl text-zinc-300">GitHub Contribution Activity</h3>
                  {showPrivateHint && (
                    <div className="flex items-center ml-2 text-xs text-zinc-500">
                      <FaLock className="mr-1" size={10} />
                      <span>Including private contributions</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center">
                  <a 
                    href={`https://github.com/${username}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-zinc-300 transition-colors flex items-center"
                  >
                    <span className="text-sm mr-1.5">@{username}</span>
                    <FiExternalLink size={15} />
                  </a>
                </div>
              </div>
              
              <div className="w-full bg-zinc-900/40 backdrop-blur-sm rounded-xl p-6 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-900/10">
                {contributionsData ? (
                  <div className="contribution-graph">
                    <div className="text-sm mb-4 text-zinc-400">
                      {contributionsData.totalContributions.toLocaleString()} contributions in the last year
                    </div>
                    
                    <div className="w-full overflow-x-auto">
                      <div className="min-w-[750px] relative">
                        {/* Months labels - Now positioned correctly based on actual data */}
                        <div className="flex text-xs text-zinc-500 relative h-5 mb-1 ml-8">
                          {monthLabels.map((month, i) => (
                            <div 
                              key={i} 
                              className="absolute text-xs text-zinc-500"
                              style={{ 
                                left: `${(month.index / contributionsData.weeks.length) * 100}%`,
                                transform: i === 0 ? 'translateX(0)' : 'translateX(-50%)'
                              }}
                            >
                              {month.label}
                            </div>
                          ))}
                        </div>
                        
                        <div className="relative">
                          {/* Days of week labels */}
                          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-zinc-500 py-1">
                            <div>Mon</div>
                            <div>Wed</div>
                            <div>Fri</div>
                          </div>
                          
                          {/* Contribution squares */}
                          <div className="ml-8 grid grid-cols-53 gap-1" style={{ gridTemplateRows: 'repeat(7, 10px)' }}>
                            {contributionsData.weeks.flatMap((week, weekIndex) => 
                              week.contributionDays.map((day, dayIndex) => (
                                <div 
                                  key={`${weekIndex}-${dayIndex}`}
                                  style={{ 
                                    backgroundColor: getColorForLevel(day.level),
                                    gridColumn: weekIndex + 1,
                                    gridRow: (new Date(day.date).getDay() % 7) + 1,
                                  }}
                                  className="w-2.5 h-2.5 rounded-sm relative group hover:ring-1 hover:ring-white/20"
                                  title={`${day.count} contributions on ${formatDate(day.date)}`}
                                >
                                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-zinc-800 text-xs text-zinc-300 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-10">
                                    <div className="text-center">
                                      <div>{formatDate(day.date)}</div>
                                      <div className="font-medium">{day.count} {day.count === 1 ? 'contribution' : 'contributions'}</div>
                                    </div>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                        
                        {/* Contribution legend */}
                        <div className="flex justify-end items-center mt-2 text-xs text-zinc-500">
                          <span>Less</span>
                          <div className="flex mx-1">
                            {[0, 1, 2, 3, 4].map((level) => (
                              <div 
                                key={level}
                                className="w-2.5 h-2.5 rounded-sm mx-[1px]"
                                style={{ backgroundColor: getColorForLevel(level) }}
                              ></div>
                            ))}
                          </div>
                          <span>More</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Fallback to iframe if no token provided
                  <div className="w-full overflow-x-auto pb-2 -mt-2">
                    <div className="min-w-[750px]">
                      <iframe 
                        src={`https://github-contributions-api.deno.dev/${username}.svg?scheme=${theme === 'blue' ? 'blue' : 'green'}&bg=0D1117`}
                        width="100%" 
                        height="170" 
                        frameBorder="0" 
                        scrolling="no"
                        title={`${username}'s GitHub Contribution Chart`}
                        className="transform scale-[0.97] origin-top-left"
                      ></iframe>
                    </div>
                  </div>
                )}
                
                {/* GitHub profile link */}
                <div className="mt-4 text-center text-sm text-zinc-500">
                  <a 
                    href={`https://github.com/${username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                  >
                    See all activity on GitHub
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GitHubContributions; 