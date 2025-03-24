'use client';

import React from 'react';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

// Temporarily replace dashboard with a simplified client component
export default function DashboardPage() {
  return (
    <div className="bg-gradient-to-tl from-black via-zinc-800/20 to-black min-h-screen">
      <div className="fixed top-6 left-6 z-50">
        <Link 
          href="/" 
          className="flex items-center space-x-2 px-4 py-2 bg-zinc-900/80 backdrop-blur-md rounded-full text-zinc-400 hover:text-zinc-200 transition-all duration-300"
        >
          <FiArrowLeft className="h-4 w-4" />
          <span className="text-sm">Back to Home</span>
        </Link>
      </div>
      
      <div className="container mx-auto px-4 pt-24 pb-16 max-w-5xl flex items-center justify-center min-h-[80vh]">
        <div className="bg-zinc-900/30 backdrop-blur-sm rounded-xl border border-zinc-800 p-8 md:p-12 text-center max-w-xl">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-4">Dashboard Coming Soon</h1>
          <p className="text-zinc-400 mb-6">
            The SEO Analytics Dashboard is currently under maintenance. We're working on adding more metrics and improving the visualization.
          </p>
          <p className="text-zinc-500 text-sm">
            Check back soon for detailed analytics on your site's performance.
          </p>
        </div>
      </div>
    </div>
  );
} 