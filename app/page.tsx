import Link from "next/link";
import React from "react";
import Particles from "./components/particles";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { FiCode, FiTerminal, FiServer, FiSmartphone, FiCpu, FiExternalLink, FiArrowRight, FiDatabase } from "react-icons/fi";
import Avatar from "./components/Avatar";
import AITextEffect from "./components/AITextEffect";
import Image from "next/image";
import dynamic from "next/dynamic";
import { allProjects } from "contentlayer/generated";
import { 
    SiNextdotjs, SiReact, SiVuedotjs, 
    SiNodedotjs, SiAdonisjs, SiExpress, SiPostgresql, SiMongodb,
    SiAndroid, SiKotlin, SiSwift, SiFlutter, SiDart,
    SiOpenai, SiSupabase 
} from "react-icons/si";
import { DiJava } from "react-icons/di";
import { FaBrain, FaDatabase, FaServer, FaCode, FaMobile, FaRobot } from "react-icons/fa";
import { BsDatabaseCheck } from "react-icons/bs";
import SkillsSection from './components/SkillsSection';
import SectionHeader from './components/SectionHeader';
import DomainCard from './components/DomainCard';

// Dynamically import components that need to be client-side only
const Terminal = dynamic(() => import('./Terminal'), { ssr: false });
const ScrollReveal = dynamic(() => import('./components/ScrollReveal'), { 
  ssr: false,
  loading: () => <div className="w-full"></div> 
});
const FloatingIcons = dynamic(() => import('./FloatingIcons'), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 -z-5 opacity-20"></div> 
});

const navigation = [
    {name: "About", href: "#about"},
    {name: "Projects", href: "#projects"},
    {name: "Skills", href: "#skills"},
    {name: "Contact", href: "#contact"},
    {name: "All Projects", href: "/projects"},
    {name: "Persona.ai Pitch", href: "/persona-ai.html"}
];

const socialLinks = [
    { name: "GitHub", href: "https://github.com/krishnakorukanti", icon: FaGithub },
    { name: "LinkedIn", href: "https://linkedin.com/in/krishnakorukanti", icon: FaLinkedin },
    { name: "Twitter", href: "https://twitter.com/crishnak", icon: FaTwitter }
];

// Development Domains with icons - updated with specific technologies
const domains = [
    { 
        name: "Frontend", 
        icon: FaCode, 
        color: "from-blue-500 to-cyan-500",
        technologies: [
            { name: "Next.js", icon: SiNextdotjs },
            { name: "React", icon: SiReact },
            { name: "Vue.js", icon: SiVuedotjs }
        ]
    },
    { 
        name: "Backend", 
        icon: FaServer, 
        color: "from-purple-500 to-indigo-500",
        technologies: [
            { name: "Node.js", icon: SiNodedotjs },
            { name: "Adonis.js", icon: SiAdonisjs },
            { name: "Express.js", icon: SiExpress },
            { name: "PostgreSQL", icon: SiPostgresql },
            { name: "MongoDB", icon: SiMongodb }
        ]
    },
    { 
        name: "Mobile", 
        icon: FaMobile, 
        color: "from-amber-500 to-orange-500",
        technologies: [
            { name: "Android", icon: SiAndroid },
            { name: "Kotlin", icon: SiKotlin },
            { name: "iOS/Swift", icon: SiSwift },
            { name: "React Native", icon: FaMobile },
            { name: "Flutter/Dart", icon: SiFlutter }
        ]
    },
    { 
        name: "AI", 
        icon: FaBrain, 
        color: "from-emerald-500 to-green-500",
        technologies: [
            { name: "LLMs", icon: SiOpenai },
            { name: "RAG", icon: FaDatabase },
            { name: "Vector DB", icon: BsDatabaseCheck }
        ]
    }
];

// Define tech stack by category - updated with more specific items
const techStack = {
    frontend: ["Next.js", "React", "Vue.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    backend: ["Node.js", "Adonis.js", "Express.js", "PostgreSQL", "MongoDB", "GraphQL", "REST APIs"],
    mobile: ["Android", "Kotlin", "iOS", "Swift", "SwiftUI", "React Native", "Flutter", "Dart"],
    ai: ["LLMs", "OpenAI", "RAG", "Vector Databases", "Embeddings", "Semantic Search"],
};

// Sample terminal commands for the header animation
const terminalCommands = [
    { command: "cd ~/projects", delay: 400 },
    { command: "ls", delay: 600, output: ["ai-app/", "mobile-client/", "backend-api/", "web-frontend/"] },
    { command: "cd ai-app && npm run dev", delay: 800, output: ["Starting development server...", "AI application running on http://localhost:3000"] }
];

// Set gradient colors for project cards
const gradientColors = [
    'from-blue-500/40 to-purple-600/40',
    'from-amber-500/40 to-orange-600/40',
    'from-emerald-500/40 to-teal-600/40'
];

// Get featured projects from the actual project content
const getFeaturedProjects = () => {
    // Get projects by specific slugs or select top 3 published projects
    const featuredSlugs = ["soleilspace.com", "perc", "survey-heart-android"];
    
    // Get specific projects if they exist, otherwise get first 3 published projects
    let featuredProjects = featuredSlugs
        .map(slug => allProjects.find(p => p.slug === slug))
        .filter(p => p && p.published);
    
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

// Move skills data to a separate array outside the component
// Remove this from inside the Home component
const skills = [
    // Frontend
    { name: "Next.js", category: "frontend" },
    { name: "React", category: "frontend" },
    { name: "Vue.js", category: "frontend" },
    { name: "TypeScript", category: "frontend" },
    { name: "Tailwind CSS", category: "frontend" },
    { name: "Framer Motion", category: "frontend" },
    
    // Backend
    { name: "Node.js", category: "backend" },
    { name: "Express.js", category: "backend" },
    { name: "Adonis.js", category: "backend" },
    { name: "PostgreSQL", category: "backend" },
    { name: "MongoDB", category: "backend" },
    { name: "GraphQL", category: "backend" },
    { name: "REST APIs", category: "backend" },
    
    // Mobile
    { name: "Android Development", category: "mobile" },
    { name: "Kotlin", category: "mobile" },
    { name: "iOS/Swift", category: "mobile" },
    { name: "SwiftUI", category: "mobile" },
    { name: "React Native", category: "mobile" },
    { name: "Flutter/Dart", category: "mobile" },
    
    // AI & ML
    { name: "LLM Integration", category: "ai" },
    { name: "OpenAI API", category: "ai" },
    { name: "RAG Systems", category: "ai" },
    { name: "Vector Databases", category: "ai" },
    { name: "Prompt Engineering", category: "ai" },
    { name: "GenAI Applications", category: "ai" },
];

// AI-generated descriptions that cycle
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
    "Crafting digital code that fuels bold innovation.",
    "Developing crisp code for fast evolving tech world",
    "Merging creative flair with smart software design.",
    "Optimizing digital workflows with agile coding art",
    "Empowering innovation with crisp & clean software.",
    "Sparking digital revolutions with innovative code",
    "Crafting agile apps that spark fresh digital trend",
    "Revolutionizing tech with elegant, smart software.",
    "Innovative minds coding the core of digital change"
  ];
  

// Function to extract tags from a project description (if no tags field exists)
const extractTags = (project: { tags?: string[], description: string }) => {
    if (project.tags) return project.tags;
    
    // Extract key technologies from description
    const techKeywords = [
        "React", "Next.js", "Node", "TypeScript", "JavaScript", 
        "GraphQL", "REST", "AWS", "Firebase", "Mobile", "Web",
        "Flutter", "Swift", "Kotlin", "AI", "ML", "OpenAI"
    ];
    
    // Find matches in the description
    const foundTags = techKeywords.filter(tech => 
        project.description.toLowerCase().includes(tech.toLowerCase())
    );
    
    // Return found tags or defaults
    return foundTags.length > 0 ? 
        foundTags : ["Web", "Development", "Software"];
};

export default function Home() {
    // Get actual featured projects
    const featuredProjects = getFeaturedProjects();
    
    return (
        <div className="flex flex-col items-center w-full min-h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
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
            
            {/* Hero Section with Developer Terminal */}
            <section className="w-full min-h-screen flex flex-col items-center justify-center relative px-4 pt-10 overflow-hidden">
            
                <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-20 pt-10">
                    <div className="relative order-1 md:order-1 transform transition-all duration-700 hover:scale-105">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full blur-2xl opacity-50 -z-10 animate-pulse-slow"></div>
                        <Avatar 
                            imageUrl="/profile.jpg" 
                            size={200} 
                            className="animate-fade-in"
                            isAIGenerated={false}
                        />
                        
                        <div className="absolute -bottom-3 -right-3 h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-500 hover:scale-110">
                            <span className="text-white text-xs font-medium">DEV</span>
                        </div>
                    </div>
                    
                    <div className="text-center md:text-left z-10 max-w-xl lg:max-w-2xl order-2 md:order-2">
                        <h1 className="text-5xl sm:text-6xl md:text-7xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display whitespace-nowrap bg-clip-text mb-4">
                            Crishna
                        </h1>
                        
                        <p className="mt-4 text-lg md:text-xl text-zinc-300 font-light animate-fade-in-up opacity-0" style={{animationDelay: '300ms', animationFillMode: 'forwards'}}>
                            Software Engineer & AI Product Developer
                        </p>
                        
                        <div className="h-14 mt-4 mb-6 animate-fade-in-up opacity-0" style={{animationDelay: '300ms', animationFillMode: 'forwards'}}>
                            <AITextEffect 
                                texts={aiDescriptions} 
                                className="text-sm md:text-md lg:text-lg"
                                typeSpeed={25}
                                delayBetweenTexts={2500}
                                random={true}
                                immediateTransition={true}
                            />
                        </div>
                        
                        <div className="flex space-x-6 mt-6 justify-center md:justify-start animate-fade-in-up opacity-0" style={{animationDelay: '500ms', animationFillMode: 'forwards'}}>
                            {socialLinks.map((social, index) => (
                                <a 
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-zinc-500 hover:text-zinc-300 transition-all duration-300 transform hover:scale-110"
                                    aria-label={social.name}
                                    style={{animationDelay: `${600 + index * 100}ms`}}
                                >
                                    <social.icon className="h-6 w-6" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                
                {/* Terminal Animation */}
                <div className="w-full max-w-3xl mx-auto mt-12 mb-4 px-4 animate-fade-in-up" style={{animationDelay: '700ms'}}>
                    {Terminal && <Terminal commands={terminalCommands} />}
                </div>

                {/* About Me - Moved before the Terminal */}
                <div className="max-w-4xl mx-auto mt-20 px-4">
                    <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 animate-fade-in-up" style={{animationDelay: '900ms'}}>About Me</h2>
                    
                    <div className="bg-zinc-900/40 backdrop-blur-sm rounded-xl p-5 sm:p-6 md:p-8 border border-zinc-800 relative overflow-hidden group hover:border-zinc-700 transition-all duration-300 animate-fade-in-up shadow-lg" style={{animationDelay: '1000ms'}}>
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                        
                        <p className="text-md md:text-lg text-zinc-300 leading-relaxed">
                            I'm a dynamic software engineer with robust experience in designing innovative, user-centric applications that tackle real-world challenges. My work spans a diverse range of technology platforms—from crafting intuitive Android and iOS mobile experiences to engineering high-performance web applications and backend systems, some of which have achieved over 10 million downloads.
                        </p>
                        <p className="text-md md:text-lg text-zinc-300 leading-relaxed mt-4">
                            I thrive on blending technical precision with creative problem-solving. Whether I'm integrating advanced AI and LLMs into everyday tools or architecting scalable systems that adapt seamlessly to growing demands, I focus on building solutions that are both reliable and engaging. My approach is rooted in clean code, intuitive design, and a relentless curiosity for emerging technologies.
                        </p>
                        <p className="text-md md:text-lg text-zinc-300 leading-relaxed mt-4">
                            Every project is an opportunity to push the boundaries of what's possible, transform abstract ideas into practical solutions, and ultimately empower users while driving business success. I'm excited to continue exploring new tech frontiers and to contribute innovative solutions that make a tangible impact in the digital world.
                        </p>
                    </div>
                </div>
                
                {/* <div className="absolute bottom-10 w-full flex justify-center animate-bounce">
                    <a href="#about" aria-label="Scroll to About section" className="w-8 h-8 border-2 border-zinc-400 rounded-full flex items-center justify-center hover:border-blue-400 hover:scale-110 transition-all duration-300">
                        <div className="w-1 h-3 bg-zinc-400 rounded-full group-hover:bg-blue-400"></div>
                    </a>
                </div> */}
            </section>
            
            {/* Development Domains */}
            <section id="about" className="w-full py-16 md:py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <SectionHeader 
                        title="Development Domains" 
                        subtitle="I specialize in building full-stack applications across multiple platforms" 
                    />
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {domains.map((domain, idx) => (
                            <ScrollReveal key={idx} delay={idx * 100}>
                                <DomainCard domain={domain} />
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Featured Projects Section */}
            <section id="projects" className="w-full py-16 md:py-20 px-4 bg-gradient-to-b from-zinc-900/0 to-zinc-900/30">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-10 animate-fade-in-up">
                        <h2 className="text-3xl md:text-4xl text-zinc-200 font-light mb-2 text-center">Featured Projects</h2>
                        <p className="text-zinc-400 text-center">A selection of my recent work</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {featuredProjects.map((project, index) => (
                            <div 
                                key={project!.slug} 
                                className="animate-fade-in-up bg-zinc-900/40 backdrop-blur-sm rounded-xl border border-zinc-800 overflow-hidden group hover:border-zinc-700 transition-all duration-300 h-full flex flex-col hover:shadow-xl hover:shadow-blue-900/5"
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <div 
                                        className={`absolute inset-0 bg-gradient-to-br ${gradientColors[index % gradientColors.length]}`}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-xl md:text-2xl font-light text-white px-4 text-center">{project!.title}</span>
                                    </div>
                                    <div className="absolute inset-0 bg-zinc-900/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                                        <Link 
                                            href={`/projects/${project!.slug}`}
                                            className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm flex items-center space-x-1 hover:bg-white/30 transition-colors duration-300 transform hover:scale-105"
                                        >
                                            <span>View Project</span>
                                            <FiExternalLink size={14} className="ml-1" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="p-5 md:p-6 flex flex-col flex-grow">
                                    <p className="text-zinc-400 text-sm mb-4 flex-grow">
                                        {project!.description.length > 150 
                                            ? `${project!.description.substring(0, 150)}...` 
                                            : project!.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {extractTags(project!).slice(0, 3).map((tag, i) => (
                                            <span 
                                                key={i} 
                                                className={`px-3 py-1 bg-${index === 0 ? 'blue' : index === 1 ? 'purple' : 'amber'}-500/40 text-${index === 0 ? 'blue' : index === 1 ? 'purple' : 'amber'}-200 text-xs rounded-full`}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-12 flex justify-center">
                        <Link 
                            href="/projects" 
                            className="flex items-center space-x-2 text-zinc-400 hover:text-zinc-200 transition-all duration-300 group px-6 py-2.5 border border-zinc-800 rounded-full hover:border-zinc-600 hover:scale-105"
                            aria-label="View all projects"
                        >
                            <span>View all projects</span>
                            <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300 ml-1" />
                        </Link>
                    </div>
                </div>
            </section>
            
            {/* Skills Section - Updated with component */}
            <SkillsSection skills={skills} />
            
            {/* Contact Section */}
            <section id="contact" className="w-full py-16 md:py-20 px-4 bg-gradient-to-t from-black to-zinc-900/30">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-12 animate-fade-in-up">
                        <h2 className="text-3xl md:text-4xl text-zinc-200 font-light mb-2 text-center">Get In Touch</h2>
                        <p className="text-zinc-400 text-center">Have a project in mind? Let's work together</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
                        {/* Contact Information */}
                        <div className="animate-fade-in-up" style={{animationDelay: "200ms"}}>
                            <div className="bg-zinc-900/40 backdrop-blur-sm rounded-xl p-5 sm:p-6 border border-zinc-800 relative overflow-hidden group hover:border-zinc-700 transition-all duration-300 h-full hover:shadow-xl hover:shadow-blue-900/10">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-500/10 via-purple-500/10 to-transparent rounded-full -mt-20 -mr-20"></div>
                                
                                <h3 className="text-xl text-zinc-300 mb-6">Contact Information</h3>
                                
                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-blue-500/30">
                                            <FaEnvelope className="text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                                        </div>
                                        <div>
                                            <p className="text-zinc-400 text-sm">Email</p>
                                            <a href="mailto:hello@crishna.in" className="text-zinc-300 hover:text-blue-400 transition-colors duration-300">
                                                hello@crishna.in
                                            </a>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start space-x-4">
                                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-green-500/30">
                                            <FaPhoneAlt className="text-green-400 group-hover:scale-110 transition-transform duration-300" />
                                        </div>
                                        <div>
                                            <p className="text-zinc-400 text-sm">Phone</p>
                                            <a href="tel:+919505588009" className="text-zinc-300 hover:text-green-400 transition-colors duration-300">
                                                +91 9505588009
                                            </a>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start space-x-4">
                                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-emerald-500/30">
                                            <FaWhatsapp className="text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                                        </div>
                                        <div>
                                            <p className="text-zinc-400 text-sm">WhatsApp</p>
                                            <a href="https://wa.me/919505588009" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-emerald-400 transition-colors duration-300">
                                                +91 9505588009
                                            </a>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start space-x-4">
                                        <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-purple-500/30">
                                            <FaMapMarkerAlt className="text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                                        </div>
                                        <div>
                                            <p className="text-zinc-400 text-sm">Location</p>
                                            <p className="text-zinc-300">
                                                Hyderabad, India
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="pt-4">
                                        <p className="text-zinc-400 text-sm mb-4">Connect with me</p>
                                        <div className="flex space-x-4">
                                            {socialLinks.map((social, index) => (
                                                <a 
                                                    key={social.name}
                                                    href={social.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200 hover:scale-110 transition-all duration-300"
                                                    aria-label={social.name}
                                                    style={{transitionDelay: `${index * 50}ms`}}
                                                >
                                                    <social.icon className="h-5 w-5" />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                                
                        {/* Contact Form */}
                        <div className="animate-fade-in-up" style={{animationDelay: "400ms"}}>
                            <div className="bg-zinc-900/40 backdrop-blur-sm rounded-xl p-5 sm:p-6 border border-zinc-800 relative overflow-hidden group hover:border-zinc-700 transition-all duration-300 h-full hover:shadow-xl hover:shadow-purple-900/10">
                                <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-purple-500/10 via-blue-500/10 to-transparent rounded-full -mb-20 -ml-20"></div>
                                
                                <h3 className="text-xl text-zinc-300 mb-6">Send a Message</h3>
                                
                                <form className="space-y-4 relative z-10">
                                    <div>
                                        <label htmlFor="name" className="block text-sm text-zinc-400 mb-1">Name</label>
                                        <input 
                                            type="text" 
                                            id="name" 
                                            className="w-full px-4 py-2 bg-zinc-800/80 border border-zinc-700 rounded-md text-zinc-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all duration-300"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="email" className="block text-sm text-zinc-400 mb-1">Email</label>
                                        <input 
                                            type="email" 
                                            id="email" 
                                            className="w-full px-4 py-2 bg-zinc-800/80 border border-zinc-700 rounded-md text-zinc-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all duration-300"
                                            placeholder="Your email"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="message" className="block text-sm text-zinc-400 mb-1">Message</label>
                                        <textarea 
                                            id="message" 
                                            rows={4}
                                            className="w-full px-4 py-2 bg-zinc-800/80 border border-zinc-700 rounded-md text-zinc-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all duration-300"
                                            placeholder="Your message"
                                        ></textarea>
                                    </div>
                                    
                                    <button 
                                        type="submit"
                                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-md hover:opacity-90 hover:translate-y-[-2px] transition-all duration-300 shadow-md"
                                    >
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Footer */}
            <footer className="w-full py-12 text-center px-4 border-t border-zinc-800 backdrop-blur-sm bg-black/30">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-left">
                            <h3 className="text-xl text-zinc-300 mb-1">Crishna</h3>
                            <p className="text-zinc-500 text-sm">Software Engineer & AI Product Developer</p>
                        </div>
                        
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            {navigation.slice(0, 4).map((item) => (
                                <a 
                                    key={item.href}
                                    href={item.href}
                                    className="text-zinc-400 hover:text-zinc-200 text-sm transition-colors duration-300"
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-zinc-800/50 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-zinc-500 text-sm">
                            Built with Next.js, Tailwind CSS, and AI-powered components
                        </p>
                        <p className="text-zinc-600 text-xs mt-2 md:mt-0">
                            © {new Date().getFullYear()} Crishna Korukanti
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
