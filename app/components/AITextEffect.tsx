"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface AITextEffectProps {
  texts: string[];
  typeSpeed?: number;
  delayBetweenTexts?: number;
  className?: string;
  random?: boolean;
  immediateTransition?: boolean;
}

export default function AITextEffect({
  texts,
  typeSpeed = 30,
  delayBetweenTexts = 3000,
  className = "",
  random = true,
  immediateTransition = false,
}: AITextEffectProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const textTimerRef = useRef<NodeJS.Timeout | null>(null);
  const previousIndices = useRef<number[]>([]);
  
  // Find the longest text to determine the container width
  const longestTextLength = texts.reduce((max, text) => 
    Math.max(max, text.length), 0
  );

  // Set isLoaded to true after component mounts to ensure smooth animations
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const getNextTextIndex = (currentIndex: number) => {
    if (!random) {
      return (currentIndex + 1) % texts.length;
    } else {
      if (texts.length <= 1) return 0;
      
      let newIndex: number;
      do {
        newIndex = Math.floor(Math.random() * texts.length);
      } while (newIndex === currentIndex || previousIndices.current.includes(newIndex));
      
      previousIndices.current.push(newIndex);
      if (previousIndices.current.length > Math.min(5, texts.length - 1)) {
        previousIndices.current.shift();
      }
      
      return newIndex;
    }
  };

  useEffect(() => {
    if (!isLoaded) return;
    
    const currentFullText = texts[currentTextIndex];
    
    if (isTyping) {
      if (displayedText.length < currentFullText.length) {
        const timeoutId = setTimeout(() => {
          setDisplayedText(currentFullText.substring(0, displayedText.length + 1));
        }, typeSpeed);
        
        return () => clearTimeout(timeoutId);
      } else {
        if (immediateTransition) {
          textTimerRef.current = setTimeout(() => {
            // Fade out effect
            setIsBlinking(false);
            
            setTimeout(() => {
              setDisplayedText("");
              setCurrentTextIndex((prevIndex) => getNextTextIndex(prevIndex));
            }, 300);
          }, 2000);
          
          return () => {
            if (textTimerRef.current) clearTimeout(textTimerRef.current);
          };
        } else {
          setIsTyping(false);
          setIsBlinking(true);
          
          textTimerRef.current = setTimeout(() => {
            setIsBlinking(false);
            
            setTimeout(() => {
              setIsTyping(true);
              setDisplayedText("");
              setCurrentTextIndex((prevIndex) => getNextTextIndex(prevIndex));
            }, 300);
          }, delayBetweenTexts);
          
          return () => {
            if (textTimerRef.current) clearTimeout(textTimerRef.current);
          };
        }
      }
    }
  }, [displayedText, currentTextIndex, isTyping, texts, typeSpeed, delayBetweenTexts, random, immediateTransition, isLoaded]);

  useEffect(() => {
    return () => {
      if (textTimerRef.current) clearTimeout(textTimerRef.current);
    };
  }, []);

  return (
    <div className={`relative min-h-[1.5em] ${className}`} style={{ minWidth: `${longestTextLength * 0.5}ch` }}>
      <div className="absolute inset-0 flex items-center justify-center md:justify-start">
        <motion.span 
          className="inline-block text-gradient bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {displayedText}
          {isBlinking && (
            <motion.span
              className="inline-block w-[2px] h-[1em] bg-gradient-to-r from-blue-500 to-purple-600 ml-1 align-middle"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          )}
          {isTyping && (
            <motion.span
              className="inline-block w-[2px] h-[1em] bg-gradient-to-r from-blue-500 to-purple-600 ml-1 align-middle"
              animate={{ opacity: 1 }}
            />
          )}
        </motion.span>
      </div>
    </div>
  );
} 