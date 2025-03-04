"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface AvatarProps {
  imageUrl?: string;
  size?: number;
  className?: string;
  isAIGenerated?: boolean;
}

export default function Avatar({
  imageUrl = "/avatar-placeholder.png", // Default placeholder
  size = 160,
  className = "",
  isAIGenerated = false,
}: AvatarProps) {
  const [hovered, setHovered] = useState(false);
  const [rotation, setRotation] = useState(0);

  // Slow continuous rotation effect
  useEffect(() => {
    if (isAIGenerated) {
      const interval = setInterval(() => {
        setRotation((prev) => (prev + 0.5) % 360);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isAIGenerated]);

  const variants = {
    initial: { scale: 1, borderRadius: "60%" },
    hover: { scale: 1.05, borderRadius: "50%" },
  };

  const glowVariants = {
    initial: { 
      opacity: 0.5,
      scale: 1.1,
    },
    hover: { 
      opacity: 0.8,
      scale: 1.2,
    },
    pulse: {
      opacity: [0.5, 0.8, 0.5],
      scale: [1.1, 1.15, 1.1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Glow effect background */}
      {isAIGenerated && (
        <motion.div
          className="absolute rounded-full bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-teal-500/30 blur-xl"
          style={{
            width: size + 30,
            height: size + 30,
            top: -15,
            left: -15,
            zIndex: -1,
            transform: `rotate(${rotation}deg)`,
          }}
          variants={glowVariants}
          initial="initial"
          animate={hovered ? "hover" : "pulse"}
        />
      )}
      
      <motion.div
        className="overflow-hidden relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        variants={variants}
        initial="initial"
        animate={hovered ? "hover" : "initial"}
        transition={{ duration: 0.3 }}
        style={{
          width: size,
          height: size,
          borderRadius: "60%",
        }}
      >
        <Image
          src={imageUrl}
          alt="Avatar"
          width={size}
          height={size}
          className={`object-cover ${isAIGenerated ? "avatar-ai-filter" : ""}`}
          priority
        />
        
        {isAIGenerated && (
          <div className="absolute bottom-0 right-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs px-2 py-1 rounded-tl-md rounded-br-md">
            AI
          </div>
        )}
      </motion.div>
    </div>
  );
} 