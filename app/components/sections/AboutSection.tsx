import React from "react";

export default function AboutSection() {
  return (
    <section id="about" className="w-full min-h-screen flex flex-col items-center justify-center relative px-4 py-24 overflow-hidden">
      <h2 className="text-3xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 animate-fade-in-up">About Me</h2>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-zinc-900/40 backdrop-blur-sm rounded-xl p-5 sm:p-6 md:p-8 border border-zinc-800 relative overflow-hidden group hover:border-zinc-700 transition-all duration-300 animate-fade-in-up shadow-lg">
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
      
      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 w-full flex justify-center animate-bounce">
        <a href="#expertise" aria-label="Scroll to Expertise section" className="w-8 h-12 border-2 border-zinc-400 rounded-full flex items-center justify-center hover:border-blue-400 hover:scale-110 transition-all duration-300 group">
          <div className="w-1 h-3 bg-zinc-400 rounded-full group-hover:bg-blue-400 animate-bounce-slow"></div>
        </a>
      </div>
    </section>
  );
} 