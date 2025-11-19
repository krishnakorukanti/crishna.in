"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function StickyHeader() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const updateVisibility = () => {
			const hero = document.getElementById("hero");
			const heroHeight = hero?.offsetHeight ?? 300;
			const threshold = heroHeight - 100;

			setIsVisible(window.scrollY > threshold);
		};

		updateVisibility();
		window.addEventListener("scroll", updateVisibility);
		window.addEventListener("resize", updateVisibility);

		return () => {
			window.removeEventListener("scroll", updateVisibility);
			window.removeEventListener("resize", updateVisibility);
		};
	}, []);

	if (!isVisible) {
		return null;
	}

	return (
		<div className="fixed top-6 left-1/2 z-50 w-full max-w-6xl -translate-x-1/2 px-4 lg:px-0">
			<header className="flex items-center justify-between rounded-full border border-gray-100 bg-white/90 px-6 py-3 text-sm font-semibold tracking-tight text-gray-900 shadow-[0_10px_30px_rgba(0,0,0,0.04)] backdrop-blur-md">
				<div className="h-5 flex items-center tracking-tight text-gray-900">
					Crishna Korukanti
				</div>
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

