"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollRevealCardProps {
	children: React.ReactNode;
	index: number;
	className?: string;
}

export function ScrollRevealCard({ children, index, className = "" }: ScrollRevealCardProps) {
	const cardRef = useRef<HTMLDivElement>(null);

	// Track scroll progress for subtle animations
	const { scrollYProgress } = useScroll({
		target: cardRef,
		offset: ["start end", "end start"],
	});

	// Subtle scale effect as it scrolls
	const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.98, 0.95]);
	// Subtle opacity fade for cards as they get covered
	const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.95, 0.85]);

	// Calculate top offset so cards stack with visible header
	// Each card sticks slightly lower than the previous one
	// This creates the stacking effect where you can see a bit of each card
	const topOffset = 100 + index * 30; // 100px from top + 30px per card for visible lip

	return (
		<motion.div
			ref={cardRef}
			className={`sticky ${className}`}
			style={{
				top: `${topOffset}px`,
				scale,
				opacity,
				zIndex: index,
				marginBottom: "4rem", // Space between cards when not stacked
			}}
		>
			{children}
		</motion.div>
	);
}

