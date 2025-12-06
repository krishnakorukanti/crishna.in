"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Github, Linkedin, Twitter, Instagram, Globe, ArrowUpRight, Calendar, Code, FileText, ChevronDown, ChevronUp, Printer } from "lucide-react";
import resumeData from "./resume-data.json";
import { StickyHeader } from "../components/StickyHeader";
import { clsx } from "@/lib/utils";

export default function ResumeClient() {
  const [isJsonMode, setIsJsonMode] = useState(false);
  const [expandedProjects, setExpandedProjects] = useState<string[]>([]);

  const toggleProject = (name: string) => {
    setExpandedProjects(prev => 
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      // Close any expanded project cards for cleaner print
      setExpandedProjects([]);
      // Small delay to ensure state updates
      setTimeout(() => {
        window.print();
      }, 100);
    }
  };

  useEffect(() => {
    const printStyles = `
      @media print {
        @page {
          margin: 15mm;
          size: A4;
        }
        
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }
        
        body {
          background: white !important;
          color: black !important;
          font-size: 12pt;
          line-height: 1.5;
        }
        
        .print\\:hidden,
        header,
        nav,
        button,
        [class*="print:hidden"] {
          display: none !important;
          visibility: hidden !important;
        }
        
        main {
          padding: 0 !important;
          margin: 0 !important;
          max-width: 100% !important;
        }
        
        .bg-zinc-900 {
          background: white !important;
          color: black !important;
        }
        
        .bg-zinc-50\\/30,
        .bg-zinc-50\\/50 {
          background: #f9fafb !important;
        }
        
        .text-white {
          color: black !important;
        }
        
        .text-zinc-300,
        .text-zinc-400 {
          color: #4b5563 !important;
        }
        
        .shadow-xl,
        .shadow-lg,
        .shadow-md,
        .shadow-sm {
          box-shadow: none !important;
        }
        
        .rounded-xl,
        .rounded-lg,
        .rounded-md {
          border-radius: 0 !important;
        }
      }
    `;

    const styleElement = document.createElement('style');
    styleElement.id = 'resume-print-styles';
    styleElement.textContent = printStyles;
    document.head.appendChild(styleElement);

    return () => {
      const existingStyle = document.getElementById('resume-print-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f9fa] print:bg-white print:text-black font-sans relative">
      
      {/* Background Pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none print:hidden opacity-40" 
           style={{ 
             backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', 
             backgroundSize: '24px 24px' 
           }} 
      />

      <div className="print:hidden relative z-10">
        <StickyHeader />
      </div>

      <main className="container mx-auto px-4 pt-28 pb-16 max-w-5xl print:p-0 print:max-w-none relative z-10">
        
        {/* View Toggle & Print Button */}
        <div className="flex justify-between items-center mb-4 print:hidden">
            <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-full text-sm font-medium shadow-md hover:bg-zinc-800 transition-colors"
            >
                <Printer className="w-4 h-4" />
                Print / Save as PDF
            </button>
            
            <div className="bg-white/80 backdrop-blur-sm p-1 rounded-full shadow-sm border border-zinc-200 inline-flex">
                <button 
                    onClick={() => setIsJsonMode(false)}
                    className={clsx(
                        "px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                        !isJsonMode ? "bg-zinc-900 text-white shadow-md scale-105" : "text-zinc-500 hover:text-zinc-900"
                    )}
                >
                    <FileText className="w-4 h-4" />
                    Resume
                </button>
                <button 
                    onClick={() => setIsJsonMode(true)}
                    className={clsx(
                        "px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                        isJsonMode ? "bg-zinc-900 text-white shadow-md scale-105" : "text-zinc-500 hover:text-zinc-900"
                    )}
                >
                    <Code className="w-4 h-4" />
                    JSON
                </button>
            </div>
        </div>

        {/* Resume Paper */}
        {isJsonMode ? (
          <div className="bg-[#1e1e1e] text-zinc-300 shadow-2xl shadow-zinc-900/20 rounded-xl overflow-hidden font-mono text-sm md:text-base">
            <div className="flex items-center gap-2 px-4 py-3 bg-[#252526] border-b border-[#333]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <span className="ml-2 text-xs text-zinc-500">resume-data.json</span>
            </div>
            <div className="p-4 md:p-8 overflow-x-auto">
              <pre>
                <code dangerouslySetInnerHTML={{ 
                  __html: JSON.stringify(resumeData, null, 2)
                    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
                    .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
                      let cls = 'text-[#d4d4d4]';
                      if (/^"/.test(match)) {
                        if (/:$/.test(match)) {
                          cls = 'text-[#9cdcfe]';
                        } else {
                          cls = 'text-[#ce9178]';
                        }
                      } else if (/true|false/.test(match)) {
                        cls = 'text-[#569cd6]';
                      } else if (/null/.test(match)) {
                        cls = 'text-[#569cd6]';
                      } else {
                        cls = 'text-[#b5cea8]';
                      }
                      return '<span class="' + cls + '">' + match + '</span>';
                    })
                }} />
              </pre>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow-xl shadow-zinc-200/60 rounded-none md:rounded-[4px] overflow-hidden print:shadow-none print:rounded-none">
            
            {/* Top Header Section */}
            <div className="bg-zinc-900 text-white p-8 md:p-12 print:bg-transparent print:text-black print:p-0 print:pb-8 print:border-b print:border-zinc-200 relative overflow-hidden">
                {/* Subtle grid background for header */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" 
                     style={{ 
                        backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                     }} 
                />
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-4">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter font-display">{resumeData.basics.name}</h1>
                        <p className="text-lg md:text-xl text-zinc-300 font-medium font-mono mt-2 print:text-zinc-600">{resumeData.basics.label}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-400 font-mono print:text-zinc-500">
                    {resumeData.basics.location.city && (
                        <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{resumeData.basics.location.city}, {resumeData.basics.location.countryCode}</span>
                        </div>
                    )}
                    {resumeData.basics.email && (
                        <Link href={`mailto:${resumeData.basics.email}`} className="flex items-center gap-2 hover:text-white transition-colors print:text-black">
                        <Mail className="w-4 h-4" />
                        <span>{resumeData.basics.email}</span>
                        </Link>
                    )}
                    {resumeData.basics.url && (
                        <Link href={resumeData.basics.url} className="flex items-center gap-2 hover:text-white transition-colors print:text-black">
                        <Globe className="w-4 h-4" />
                        <span>{resumeData.basics.url.replace(/^https?:\/\//, '')}</span>
                        </Link>
                    )}
                    </div>
                </div>

                <div className="flex flex-col items-end gap-4">
                    <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-xl overflow-hidden border-2 border-white/10 shadow-2xl print:border-zinc-200 print:w-24 print:h-24 group">
                        <Image
                            src={resumeData.basics.image}
                            alt={resumeData.basics.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-xl" />
                    </div>
                    
                    {/* Social Icons */}
                    <div className="flex gap-2 print:hidden">
                    {resumeData.basics.profiles.map((profile) => {
                        const Icon = 
                        profile.network === "GitHub" ? Github :
                        profile.network === "LinkedIn" ? Linkedin :
                        profile.network === "Twitter" ? Twitter :
                        profile.network === "Instagram" ? Instagram : Globe;
                        
                        return (
                        <Link 
                            key={profile.network} 
                            href={profile.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white/5 border border-white/10 rounded-md text-zinc-400 hover:bg-white hover:text-zinc-900 hover:border-white transition-all duration-200"
                            aria-label={profile.network}
                        >
                            <Icon className="w-4 h-4" />
                        </Link>
                        );
                    })}
                    </div>
                </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-0 md:divide-x divide-zinc-100 print:grid-cols-[1fr_2.5fr] print:divide-x">
                
                {/* Sidebar (Left Column) */}
                <aside className="bg-zinc-50/30 p-8 md:p-10 space-y-10 print:bg-transparent print:p-0 print:pr-8 print:py-8">
                
                {/* Education */}
                <section>
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-6 flex items-center gap-2 font-mono">
                    Education
                    </h3>
                    <div className="space-y-8">
                    {resumeData.education.map((edu, index) => (
                        <div key={index} className="group">
                        <div className="font-bold text-zinc-900 group-hover:text-indigo-600 transition-colors">{edu.institution}</div>
                        <div className="text-sm text-zinc-600 mb-2 font-medium">{edu.area}</div>
                        <div className="text-xs text-zinc-500 font-mono flex items-center gap-1.5 bg-zinc-100 w-fit px-2 py-1 rounded">
                            <Calendar className="w-3 h-3" />
                            {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                        </div>
                        </div>
                    ))}
                    </div>
                </section>

                {/* Skills */}
                <section>
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-6 font-mono">
                    Skills
                    </h3>
                    <div className="space-y-8">
                    {resumeData.skills.map((skillGroup, index) => (
                        <div key={index}>
                        <h4 className="font-semibold text-zinc-900 mb-3 text-sm border-b border-zinc-100 pb-1">{skillGroup.name}</h4>
                        <div className="flex flex-wrap gap-2">
                            {skillGroup.keywords.map((keyword, kIndex) => (
                            <span 
                                key={kIndex}
                                className="px-2 py-1 bg-white border border-zinc-200 text-zinc-600 rounded text-[11px] font-medium font-mono shadow-sm print:border-zinc-300 hover:border-zinc-300 hover:shadow transition-all cursor-default"
                            >
                                {keyword}
                            </span>
                            ))}
                        </div>
                        </div>
                    ))}
                    </div>
                </section>

                {/* Links (Sidebar for Print) */}
                <section className="hidden print:block space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-4 font-mono">
                    Links
                    </h3>
                    {resumeData.basics.profiles.map((profile) => (
                    <div key={profile.network} className="text-sm">
                        <span className="text-zinc-500 font-mono text-xs">{profile.network}: </span>
                        <a href={profile.url} className="text-black hover:underline">{profile.url.replace(/^https?:\/\//, '')}</a>
                    </div>
                    ))}
                </section>
                </aside>

                {/* Main Content (Right Column) */}
                <div className="p-8 md:p-10 bg-white print:p-0 print:pl-8 print:py-8">
                
                {/* About */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-zinc-900 mb-6 tracking-tight flex items-center gap-3">
                        <span className="w-8 h-1 bg-zinc-900 rounded-full block"></span>
                        About
                    </h2>
                    <p className="text-zinc-600 leading-relaxed text-lg">
                    {resumeData.basics.summary}
                    </p>
                </section>

                {/* Experience */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-zinc-900 mb-8 tracking-tight flex items-center gap-3">
                        <span className="w-8 h-1 bg-zinc-900 rounded-full block"></span>
                        Experience
                    </h2>
                    <div className="space-y-12 border-l-[1.5px] border-zinc-100 ml-3 pl-8 relative">
                    {resumeData.work.map((job, index) => (
                        <div key={index} className="relative group">
                        {/* Timeline dot */}
                        <span className="absolute -left-[37px] top-2 w-3.5 h-3.5 rounded-full bg-white border-[3px] border-zinc-200 group-hover:border-zinc-900 transition-colors" />
                        
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2 gap-2">
                            <h3 className="text-xl font-bold text-zinc-900 group-hover:text-indigo-600 transition-colors">{job.position}</h3>
                            <span className="text-xs font-mono font-medium text-zinc-500 shrink-0 whitespace-nowrap bg-zinc-50 px-2 py-1 rounded">
                            {formatDate(job.startDate)} — {formatDate(job.endDate)}
                            </span>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-4 text-sm">
                            <span className="font-bold text-zinc-700">{job.name}</span>
                            <span className="text-zinc-300">/</span>
                            <span className="text-zinc-500 font-mono text-xs">{job.location}</span>
                        </div>

                        <p className="text-zinc-600 mb-4 font-medium leading-relaxed">
                            {job.summary}
                        </p>

                        {job.highlights && (
                            <ul className="list-none space-y-2 text-zinc-600 text-sm leading-relaxed">
                            {job.highlights.map((highlight, hIndex) => (
                                <li key={hIndex} className="flex items-start gap-2">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-300 shrink-0" />
                                    <span>{highlight}</span>
                                </li>
                            ))}
                            </ul>
                        )}
                        </div>
                    ))}
                    </div>
                </section>

                {/* Projects */}
                <section className="break-inside-avoid">
                    <h2 className="text-2xl font-bold text-zinc-900 mb-6 tracking-tight flex items-center gap-3">
                        <span className="w-8 h-1 bg-zinc-900 rounded-full block"></span>
                        Selected Projects
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                    {resumeData.projects.map((project, index) => {
                        const isExpanded = expandedProjects.includes(project.name);
                        const hasCaseStudy = project.caseStudy;

                        return (
                            <div 
                                key={index} 
                                onClick={() => hasCaseStudy && toggleProject(project.name)}
                                className={clsx(
                                    "group relative rounded-xl border bg-zinc-50/30 p-6 transition-all duration-300 print:bg-transparent print:border-zinc-200 print:p-0 print:border-0 print:mb-4",
                                    hasCaseStudy ? "cursor-pointer hover:bg-white hover:border-zinc-200 hover:shadow-lg hover:shadow-zinc-200/50" : "border-zinc-100"
                                )}
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="font-bold text-zinc-900 text-lg flex items-center gap-2 group-hover:text-indigo-600 transition-colors">
                                        {project.name}
                                        {hasCaseStudy && (
                                            <span className="print:hidden">
                                                {isExpanded ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
                                            </span>
                                        )}
                                    </h3>
                                    {project.url && (
                                        <a 
                                            href={project.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            onClick={(e) => e.stopPropagation()}
                                            className="text-zinc-400 hover:text-indigo-600 print:hidden p-1 rounded-full hover:bg-indigo-50 transition-colors"
                                        >
                                            <ArrowUpRight className="w-4 h-4" />
                                        </a>
                                    )}
                                </div>
                                
                                <p className="text-zinc-600 text-sm mb-4 leading-relaxed">{project.description}</p>
                                
                                {/* Expandable Case Study Content */}
                                {hasCaseStudy && (
                                    <div className={clsx(
                                        "overflow-hidden transition-all duration-300 border-t border-zinc-100/50",
                                        isExpanded ? "max-h-96 opacity-100 mt-4 pt-4" : "max-h-0 opacity-0"
                                    )}>
                                        <div className="bg-indigo-50/50 p-4 rounded-lg border border-indigo-100">
                                            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2 block">Case Study</span>
                                            <p className="text-zinc-700 text-sm leading-relaxed">{project.caseStudy}</p>
                                        </div>
                                    </div>
                                )}

                                <div className={clsx("flex flex-wrap gap-2", isExpanded && "mt-4")}>
                                    {project.keywords.map((keyword, kIndex) => (
                                        <span key={kIndex} className="text-[10px] uppercase tracking-wider font-semibold text-zinc-500 bg-white border border-zinc-200 px-2 py-1 rounded font-mono print:bg-transparent print:p-0 print:text-zinc-500 print:border-zinc-300">
                                            {keyword}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                    </div>
                </section>

                </div>
            </div>
            </div>
        )}
      </main>
    </div>
  );
}

function formatDate(dateString?: string) {
  if (!dateString) return "";
  if (dateString.toLowerCase() === "present") return "Present";
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString; // Return original if not a valid date
  
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(date);
}
