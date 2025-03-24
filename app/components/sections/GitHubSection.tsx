import React from "react";
import GitHubContributions from "../GitHubContributions";

export default function GitHubSection() {
  return (
    <section id="github" className="w-full min-h-screen flex flex-col items-center justify-center relative px-4 py-24 overflow-hidden">
      <h2 className="text-3xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 animate-fade-in-up">GitHub Contributions</h2>
      
      <div className="max-w-4xl w-full mx-auto bg-zinc-900/40 backdrop-blur-sm rounded-xl p-5 sm:p-6 md:p-8 border border-zinc-800 animate-fade-in-up shadow-lg">
        <GitHubContributions 
          username="krishnakorukanti" 
          token={process.env.NEXT_PUBLIC_GITHUB_TOKEN}
          theme="standard" // or "blue"
        />
      </div>
      
      {/* Scroll Down Indicator */}
      {/* <div className="absolute bottom-10 w-full flex justify-center animate-bounce">
        <a href="#contact" aria-label="Scroll to Contact section" className="w-8 h-12 border-2 border-zinc-400 rounded-full flex items-center justify-center hover:border-blue-400 hover:scale-110 transition-all duration-300 group">
          <div className="w-1 h-3 bg-zinc-400 rounded-full group-hover:bg-blue-400 animate-bounce-slow"></div>
        </a>
      </div> */}
    </section>
  );
} 