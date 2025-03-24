import React from "react";
import DomainExpertise from "../DomainExpertise";

export default function ExpertiseSection() {
    const expertise = [
        {
            domain: "Mobile Development",
            skills: ["Kotlin", "Swift", "React Native", "Flutter", "Java"],
            description:
                "Building high-performance mobile applications for iOS and Android with apps with millions of downloads.",
            icon: "📱",
        },
        {
            domain: "Web Development",
            skills: ["React", "Next.js", "TypeScript", "Node.js"],
            description:
                "Creating modern, responsive web applications with a focus on performance, accessibility, and user experience.",
            icon: "🌐",
        },
        {
            domain: "AI & LLM's",
            skills: ["LangChain", "GPT Integration","OpenAi"],
            description:
                "Integrating artificial intelligence and machine learning models into applications to enhance functionality and user experience.",
            icon: "🤖",
        },
        {
            domain: "Backend Systems",
            skills: ["NodeJs", "Express", "AdonisJS", "TS"],
            description:
                "Designing and implementing scalable backend systems and APIs that power millions of requests per day.",
            icon: "⚙️",
        },
        {
            domain: "Database & Storage",
            skills: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch"],
            description:
                "Managing and optimizing database systems to ensure efficient data storage, retrieval, and analysis.",
            icon: "💾",
        },
    ];

    return (
        <section id="expertise"
                 className="w-full min-h-screen flex flex-col items-center justify-center relative px-4 py-24 overflow-hidden">
            <h2 className="text-3xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 animate-fade-in-up">Domain
                Expertise</h2>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {expertise.map((domain) => (
                    <DomainExpertise
                        key={domain.domain}
                        domain={domain.domain}
                        skills={domain.skills}
                        description={domain.description}
                        icon={domain.icon}
                    />
                ))}
            </div>

            {/* Scroll Down Indicator */}
            <div className="absolute bottom-10 w-full flex justify-center animate-bounce">
                <a href="#projects" aria-label="Scroll to Projects section"
                   className="w-8 h-12 border-2 border-zinc-400 rounded-full flex items-center justify-center hover:border-blue-400 hover:scale-110 transition-all duration-300 group">
                    <div className="w-1 h-3 bg-zinc-400 rounded-full group-hover:bg-blue-400 animate-bounce-slow"></div>
                </a>
            </div>
        </section>
    );
} 