"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Avatar from "./Avatar";

interface AIAvatarGeneratorProps {
  className?: string;
}

export default function AIAvatarGenerator({ className = "" }: AIAvatarGeneratorProps) {
  const [aiAvatarUrl, setAiAvatarUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Example styles for the user to choose
  const avatarStyles = [
    "pixel art",
    "realistic portrait",
    "anime style",
    "3D render",
    "watercolor painting",
    "cyberpunk"
  ];
  
  const [selectedStyle, setSelectedStyle] = useState(avatarStyles[0]);
  const [prompt, setPrompt] = useState("");

  const generateAvatar = async () => {
    if (!prompt) {
      setError("Please enter a description for your avatar");
      return;
    }
    
    setIsGenerating(true);
    setError(null);
    
    try {
      // This is a placeholder for the actual API call
      // In a real implementation, you would call your backend API that interfaces with OpenAI
      const fullPrompt = `Generate a ${selectedStyle} avatar: ${prompt}`;
      
      // Simulating an API call for now
      setTimeout(() => {
        // For demo purposes, just using a placeholder image
        // In production, this would be the URL returned from the OpenAI API
        setAiAvatarUrl("/avatar-placeholder.png");
        setIsGenerating(false);
      }, 3000);
      
      // Actual API call would look something like this:
      /*
      const response = await fetch('/api/generate-avatar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: fullPrompt }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate avatar');
      }
      
      const data = await response.json();
      setAiAvatarUrl(data.imageUrl);
      */
      
    } catch (err) {
      setError("Failed to generate avatar. Please try again.");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={`${className} flex flex-col items-center p-4 border border-zinc-800 rounded-xl bg-zinc-900/50`}>
      <h3 className="text-xl text-zinc-300 mb-4">AI Avatar Generator</h3>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {avatarStyles.map((style) => (
          <button
            key={style}
            onClick={() => setSelectedStyle(style)}
            className={`px-3 py-1 text-xs rounded-full transition-colors duration-300 ${
              selectedStyle === style
                ? "bg-blue-600 text-white"
                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
            }`}
          >
            {style}
          </button>
        ))}
      </div>
      
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your avatar (e.g., 'a software engineer with glasses and a blue shirt')"
        className="w-full p-3 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700 focus:border-blue-500 focus:outline-none mb-4"
        rows={3}
      />
      
      {error && (
        <p className="text-red-500 text-sm mb-4">{error}</p>
      )}
      
      <button
        onClick={generateAvatar}
        disabled={isGenerating}
        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-md text-white font-medium hover:opacity-90 transition-opacity duration-300 disabled:opacity-50 mb-6"
      >
        {isGenerating ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </span>
        ) : (
          "Generate Avatar"
        )}
      </button>
      
      {aiAvatarUrl && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-2"
        >
          <Avatar
            imageUrl={aiAvatarUrl}
            isAIGenerated={true}
            size={150}
          />
          <p className="text-sm text-zinc-400 mt-2 text-center">
            Your AI-generated avatar is ready!
          </p>
        </motion.div>
      )}
    </div>
  );
} 