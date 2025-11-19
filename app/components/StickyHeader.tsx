"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface StickyHeaderProps {
	initialText?: string;
	scrolledText?: string;
}

export function StickyHeader({ initialText, scrolledText = "Crishna Korukanti" }: StickyHeaderProps) {
	const [scrollY, setScrollY] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			setScrollY(window.scrollY);
		};

		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });
		window.addEventListener("resize", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleScroll);
		};
	}, []);

	// Determine visibility and text based on scroll position
	const hero = typeof window !== "undefined" ? document.getElementById("hero") : null;
	const hasHero = Boolean(hero);
	
	// Calculate thresholds
	let showHeader = false;
	let isScrolled = false;
	
	if (hasHero) {
		// Page with hero (home page): show header only after scrolling past hero
		const heroHeight = hero?.offsetHeight ?? 300;
		const threshold = heroHeight - 100;
		showHeader = scrollY > threshold;
		isScrolled = showHeader;
	} else if (initialText) {
		// Page without hero but with initialText (projects, project detail): always show header
		showHeader = true;
		// Switch to scrolledText after scrolling a bit
		isScrolled = scrollY > 100;
	}

	if (!showHeader) {
		return null;
	}

	// Determine which text to show
	const displayText = isScrolled ? scrolledText : (initialText || scrolledText);

	return (
		<div className="fixed top-6 left-1/2 z-50 w-full max-w-6xl -translate-x-1/2 px-4 lg:px-0">
			<header className="flex items-center justify-between rounded-full border border-gray-100 bg-white/90 px-6 py-3 text-sm font-semibold tracking-tight text-gray-900 shadow-[0_10px_30px_rgba(0,0,0,0.04)] backdrop-blur-md">
				<Link
					href="/"
					className="h-5 flex items-center tracking-tight text-gray-900 hover:text-gray-600 transition-colors"
				>
					{displayText}
				</Link>
				<Link
					href="mailto:hello@crishna.in"
					className="pointer-events-auto rounded-full bg-black px-6 py-2.5 text-white shadow-lg shadow-black/10 transition-transform hover:scale-105 hover:shadow-black/20"
				>
					Book a call
				</Link>
			</header>
		</div>
	);
}

