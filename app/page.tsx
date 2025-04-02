import React from "react";
import { Metadata } from "next";
import { Redis } from "@upstash/redis";
import Particles from "./components/particles";
import { WebsiteJsonLd, PersonJsonLd } from "./components/JsonLd";
import { constructMetadata } from "./components/SEO";
import { allProjects } from "contentlayer/generated";

// Import the section components
import HeroSection from "./components/sections/HeroSection";
import TerminalSection from "./components/sections/TerminalSection";
import AboutSection from "./components/sections/AboutSection";
import ExpertiseSection from "./components/sections/ExpertiseSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import GitHubSection from "./components/sections/GitHubSection";
import ContactSection from "./components/sections/ContactSection";
import FooterSection from "./components/sections/FooterSection";
import dynamic from "next/dynamic";

// Define dynamic components
const FloatingIcons = dynamic(() => import('./FloatingIcons'), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 -z-5 opacity-20"></div> 
});

// Define navigation items for footer
const navigation = [
    { name: "Home", href: "#top" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
    { name: "All Projects", href: "/projects" },
    { name: "SEO Dashboard", href: "/dashboard" },
];

// Define social links with string icons
const socialLinks = [
    { name: "GitHub", href: "https://github.com/krishnakorukanti", icon: "github" },
    { name: "LinkedIn", href: "https://linkedin.com/in/krishnakorukanti", icon: "linkedin" },
    { name: "Twitter", href: "https://twitter.com/crishnak", icon: "twitter" }
];

// Define AI descriptions for the hero section
const aiDescriptions = [
    "Building the future software with AI-powered tools",
    "Crafting smart apps that boost digital experiences",
    "Engineering agile code that sparks true innovation",
    "Designing sleek digital tools for a truly bold era",
    "Coding innovative paths for modern digital dreams",
    "Coding agile code that sparks swift digital change",
    "Innovating modern tech to unite our digital future",
    "Empowering clear visions with smart, bold new code",
    "Coding sleek software to power bright tech futures",
    "Transforming smart code into scalable digital art",
    "Innovating code to unlock bold, new digital dreams",
    "Crafting digital code that fuels bold innovation."
];

// Define terminal commands
const terminalCommands = [
    { command: "ai-crishna start", delay: 2000, output: [
        "👋 Hello! I'm AI Crishna, your friendly guide to Krishna Korukanti's portfolio.",
        "",
        "Feel free to ask me anything about Krishna's skills, projects, or experience!",
        "",
        "Try asking about his background, tech stack, or projects like SoleilSpace.",
        "",
        "(Type 'help' if you need suggestions on what to ask.)"
    ]}
];

// Define metadata for this page
export const metadata: Metadata = constructMetadata({
  title: "Crishna Korukanti | Software Engineer & AI Product Developer",
  description: "Portfolio of Crishna Korukanti, a Software Engineer and AI Product Developer specializing in building innovative web and mobile applications.",
});

export default async function Home() {
    // Get featured projects from the actual project content
    const getFeaturedProjects = () => {
        // Get projects by specific slugs or select top 3 published projects
        const featuredSlugs = ["letmedoit", "survey-heart-android", "soleilspace.com"];
        
        // Get specific projects if they exist, otherwise get first 3 published projects
        let featuredProjects = featuredSlugs
            .map(slug => allProjects.find(p => p.slug === slug))
            .filter((p): p is typeof allProjects[number] => !!p && !!p.published);
        
        // If we don't have 3 projects, fill with other published projects
        if (featuredProjects.length < 3) {
            const otherProjects = allProjects
                .filter(p => p.published && !featuredSlugs.includes(p.slug))
                .slice(0, 3 - featuredProjects.length);
                
            featuredProjects = [...featuredProjects, ...otherProjects];
        }
        
        // Return maximum 3 projects
        return featuredProjects.slice(0, 3);
    };
    
    // Project emoji mapping based on slug
    const projectEmojis: Record<string, string> = {
        "letmedoit": "🤝", // Helping hands for LetMeDoIt
        "survey-heart-android": "📱", // Mobile for Android app
        "soleilspace.com": "🌞", // Sun for Soleil Space
        // Add more mappings as needed with appropriate emojis
    };
    
    // Emoji categories mapping based on tags
    const categoryEmojis: Record<string, string> = {
        "react": "⚛️",
        "nextjs": "▲",
        "android": "📱",
        "ios": "📱",
        "mobile": "📱",
        "web": "🌐",
        "ai": "🤖",
        "ml": "🧠",
        "api": "🔄",
        "backend": "⚙️",
        "frontend": "🎨",
        "database": "💾"
    };
    
    // Convert contentlayer projects to the format expected by ProjectsSection
    const contentProjects = getFeaturedProjects().map(project => {
        // Get project emoji from mapping or derive from tags
        let emoji = projectEmojis[project.slug] || "🚀";
        
        // If no specific emoji is mapped, try to derive one from tags
        if (emoji === "🚀" && project.tags && project.tags.length > 0) {
            // Try to find a matching tag for an emoji
            for (const tag of project.tags) {
                const normalizedTag = tag.toLowerCase();
                for (const [category, categoryEmoji] of Object.entries(categoryEmojis)) {
                    if (normalizedTag.includes(category)) {
                        emoji = categoryEmoji;
                        break;
                    }
                }
                if (emoji !== "🚀") break; // Stop if we found an emoji
            }
        }
        
        return {
            id: project.slug,
            title: project.title || "",
            description: project.description || "",
            emoji,
            techStack: project.tags || [],
            href: `/projects/${project.slug}`,
            previewImage: "", // No image field in contentlayer definition
            isPublished: !!project.published
        };
    });
    
    return (
        <div id="top" className="min-h-screen bg-zinc-950">
            {/* Structured Data */}
            <WebsiteJsonLd
                website={{
                    name: "Crishna Korukanti Portfolio",
                    url: "https://crishna.in",
                    description: "Portfolio of Crishna Korukanti, a Software Engineer and AI Product Developer specializing in building innovative web and mobile applications."
                }}
            />
            <PersonJsonLd
                person={{
                    name: "Crishna Korukanti",
                    url: "https://crishna.in",
                    jobTitle: "Software Engineer & AI Product Developer",
                    description: "Experienced Software Engineer and AI Product Developer with expertise in full-stack, mobile development, and AI integration.",
                    image: "https://crishna.in/profile.jpg",
                    sameAs: [
                        "https://github.com/krishnakorukanti",
                        "https://linkedin.com/in/krishnakorukanti",
                        "https://twitter.com/crishnak"
                    ]
                }}
            />
            
            <Particles
                className="absolute inset-0 -z-10 animate-fade-in"
                quantity={100}
            />
            
            {/* Floating tech icons - safely rendered with error boundary */}
            {FloatingIcons && <FloatingIcons className="opacity-30 md:opacity-20" />}
            
            {/* Quick Navigation Dots - Fixed on the side */}
            <div className="fixed right-4 md:right-5 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex flex-col gap-4">
                {navigation.slice(0, 4).map((item, index) => (
                    <a 
                        key={item.href}
                        href={item.href}
                        className="w-3 h-3 rounded-full bg-zinc-700 hover:bg-blue-500 transition-colors duration-300 relative group"
                        aria-label={`Navigate to ${item.name}`}
                    >
                        <span className="absolute right-full mr-2 px-2 py-1 bg-zinc-800/80 text-xs text-zinc-300 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">{item.name}</span>
                    </a>
                ))}
            </div>
            
            {/* Hero Section */}
            <HeroSection aiDescriptions={aiDescriptions} socialLinks={socialLinks} />
            
            {/* Terminal Section */}
            <TerminalSection commands={terminalCommands} />
            
            {/* About Section */}
            <AboutSection />
            
            {/* Expertise Section */}
            <ExpertiseSection />
            
            {/* Projects Section */}
            <ProjectsSection featuredSlugs={["letmedoit", "survey-heart-android", "soleilspace.com"]} />
            
            {/* GitHub Section */}
            <GitHubSection />
            
            {/* Contact Section - temporarily hidden */}
            {/* <ContactSection /> */}
            
            {/* Footer Section - temporarily hidden */}
            {/* <FooterSection navigation={navigation} /> */}
        </div>
    );
}
