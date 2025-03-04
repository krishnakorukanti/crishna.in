"use client";

import React, { useEffect, useState } from 'react';
import { FaReact, FaNodeJs, FaPython, FaJava, FaSwift, FaDocker, FaAws, FaGoogle } from 'react-icons/fa';
import { SiTailwindcss, SiTypescript, SiNextdotjs, SiMongodb, SiPostgresql, SiGraphql, SiTensorflow } from 'react-icons/si';

type Icon = {
  icon: React.ElementType;
  x: number;
  y: number;
  size: number;
  speed: number;
  direction: number;
  opacity: number;
}

type FloatingIconsProps = {
  className?: string;
}

export default function FloatingIcons({ className = '' }: FloatingIconsProps) {
  const [icons, setIcons] = useState<Icon[]>([]);
  
  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;
    
    const iconComponents = [
      FaReact, SiNextdotjs, SiTailwindcss, SiTypescript, 
      FaNodeJs, FaPython, FaJava, SiMongodb, 
      SiPostgresql, SiGraphql, FaSwift, FaDocker, 
      FaAws, FaGoogle, SiTensorflow
    ];
    
    // Create random icons
    const newIcons = Array.from({ length: 20 }, () => {
      const randomIcon = iconComponents[Math.floor(Math.random() * iconComponents.length)];
      return {
        icon: randomIcon,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 30 + 20,
        speed: Math.random() * 0.3 + 0.1,
        direction: Math.random() > 0.5 ? 1 : -1,
        opacity: Math.random() * 0.4 + 0.1
      };
    });
    
    setIcons(newIcons);
    
    // Animation loop
    let animationFrameId: number;
    let lastTime = Date.now();
    
    const animate = () => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTime;
      
      if (deltaTime > 30) {
        setIcons(prevIcons => 
          prevIcons.map(icon => {
            // Move icon
            let newX = icon.x + (icon.speed * icon.direction * deltaTime / 100);
            
            // Bounce off edges
            if (newX > 100) {
              newX = 100;
              icon.direction *= -1;
            } else if (newX < 0) {
              newX = 0;
              icon.direction *= -1;
            }
            
            return { ...icon, x: newX };
          })
        );
        
        lastTime = currentTime;
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <div className="absolute inset-0 -z-5 opacity-20 overflow-hidden pointer-events-none">
      {icons.map((icon, index) => {
        const IconComponent = icon.icon;
        return (
          <div 
            key={index}
            className="absolute transition-transform duration-[2000ms] ease-linear"
            style={{
              left: `${icon.x}%`,
              top: `${icon.y}%`,
              opacity: icon.opacity,
            }}
          >
            <IconComponent 
              style={{ width: icon.size, height: icon.size }} 
              className="text-white/30"
            />
          </div>
        );
      })}
    </div>
  );
}
