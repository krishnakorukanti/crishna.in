"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Printer } from "lucide-react";
import { clsx } from "@/lib/utils";

interface StickyHeaderProps {
	initialText?: string;
	scrolledText?: string;
}

export function StickyHeader({ initialText, scrolledText = "Crishna Korukanti" }: StickyHeaderProps) {
	const pathname = usePathname();
	const safePathname = pathname || "";
	const isHome = safePathname === "/";
	const isProjects = safePathname === "/projects";
	const isResume = safePathname === "/resume";
	const isProjectDetail = safePathname.startsWith("/projects/");
	const isCaseStudy = safePathname.startsWith("/case-studies/");

	// Initialize state
	const [show, setShow] = useState(true);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			
			// On home page, only show after hero
			if (isHome) {
				const hero = document.getElementById("hero");
				if (hero) {
					const heroHeight = hero.offsetHeight ?? 300;
					const threshold = heroHeight - 100;
					setShow(currentScrollY > threshold);
					setIsScrolled(currentScrollY > threshold);
				} else {
					setShow(false);
				}
			} else {
				// On other pages, always show, but change style on scroll
				setShow(true);
				setIsScrolled(currentScrollY > 50);
			}
		};

		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });
		window.addEventListener("resize", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleScroll);
		};
	}, [isHome]);

	if (!show) {
		return null;
	}

	// Determine which text to show
	const displayText = isScrolled ? scrolledText : (initialText || scrolledText);
	
	// Back button destination logic
	const backHref = isProjectDetail || isCaseStudy ? "/projects" : "/";

	return (
		<div className={clsx(
			"fixed top-6 left-1/2 z-50 w-full max-w-6xl -translate-x-1/2 px-4 lg:px-0 transition-all duration-300 print:hidden",
			!isScrolled && !isHome ? "translate-y-0" : ""
		)}>
			<header className={clsx(
				"flex items-center justify-between rounded-full border px-6 py-3 text-sm font-semibold tracking-tight transition-all duration-300",
				isScrolled || !isHome
					? "border-gray-100 bg-white/90 shadow-[0_10px_30px_rgba(0,0,0,0.04)] backdrop-blur-md text-gray-900" 
					: "border-transparent bg-transparent text-gray-900"
			)}>
				<div className="flex items-center gap-4">
					{!isHome && (
						<Link 
							href={backHref}
							className="group flex items-center justify-center w-8 h-8 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
							aria-label="Go Back"
						>
							<ArrowLeft className="w-4 h-4 text-gray-600 group-hover:text-gray-900" />
						</Link>
					)}
					<Link
						href="/"
						className="h-5 flex items-center tracking-tight hover:text-gray-600 transition-colors"
					>
						{displayText}
					</Link>
				</div>

				<nav className="flex items-center gap-1 sm:gap-4">
					{/* Desktop Nav */}
					<div className="hidden sm:flex items-center gap-1 pr-2">
						<Link
							href="/projects"
							className={clsx(
								"px-4 py-2 rounded-full transition-colors",
								isProjects || isProjectDetail || isCaseStudy ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
							)}
						>
							Work
						</Link>
						
						
							<Link
								href="/resume"
								className={clsx(
									"px-4 py-2 rounded-full transition-colors",
									"text-gray-600 hover:text-gray-900 hover:bg-gray-50"
								)}
							>
								Resume
							</Link>
						
					</div>

					<Link
						href="mailto:hello@crishna.in"
						className={clsx(
							"rounded-full px-5 py-2 text-white shadow-lg shadow-black/10 transition-all hover:scale-105 hover:shadow-black/20",
							"bg-black"
						)}
					>
						Contact
					</Link>
				</nav>
			</header>
		</div>
	);
}
