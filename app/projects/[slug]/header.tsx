"use client";
import { ArrowLeft, Eye, Github, Twitter } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { FiExternalLink, FiArrowLeft } from "react-icons/fi";

type Props = {
	project: {
		url?: string;
		title: string;
		description: string;
		repository?: string;
		tags?: string[];
	};

	views: number;
};
export const Header: React.FC<Props> = ({ project, views }) => {
	const ref = useRef<HTMLElement>(null);
	const [isIntersecting, setIntersecting] = useState(true);

	const links: { label: string; href: string; icon: React.ElementType }[] = [];
	if (project.repository) {
		links.push({
			label: "GitHub",
			href: `https://github.com/${project.repository}`,
			icon: FaGithub
		});
	}
	if (project.url) {
		links.push({
			label: "Website",
			href: project.url,
			icon: FiExternalLink
		});
	}
	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting),
		);

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	return (
		<header
			ref={ref}
			className="relative isolate overflow-hidden bg-gradient-to-tl from-black via-zinc-900 to-black"
		>
			{/* Fixed back button */}
			<div className="fixed top-6 left-6 z-50">
				<Link 
					href="/" 
					className="flex items-center space-x-2 px-4 py-2 bg-zinc-900/80 backdrop-blur-md rounded-full text-zinc-400 hover:text-zinc-200 transition-all duration-300"
				>
					<FiArrowLeft className="h-4 w-4" />
					<span className="text-sm">Back to Home</span>
				</Link>
			</div>
			
			<div className="container mx-auto relative isolate overflow-hidden py-24 sm:py-32">
				<div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-50 -z-10"></div>
				<div className="mx-auto max-w-7xl px-6 lg:px-8 text-center flex flex-col items-center">
					<div className="mx-auto max-w-3xl lg:mx-0">
						<h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-display bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-300">
							{project.title}
						</h1>
						<p className="mt-6 text-lg leading-8 text-zinc-300">
							{project.description}
						</p>
						
						{project.tags && (
							<div className="flex flex-wrap gap-2 mt-6 justify-center">
								{project.tags.map((tag, idx) => (
									<span key={idx} className="px-3 py-1 bg-zinc-800/80 text-zinc-300 rounded-full text-sm">
										{tag}
									</span>
								))}
							</div>
						)}
					</div>

					<div className="flex items-center justify-center mt-6">
						<span
							title="View counter for this page"
							className="text-zinc-400 flex items-center gap-1 mx-4"
						>
							<Eye className="w-5 h-5" />{" "}
							{Intl.NumberFormat("en-US", { notation: "compact" }).format(
								views,
							)}
						</span>
					</div>

					{links.length > 0 && (
						<div className="mx-auto mt-8 max-w-2xl lg:mx-0 lg:max-w-none">
							<div className="grid grid-cols-1 gap-y-6 gap-x-8 text-base font-semibold leading-7 sm:grid-cols-2 md:flex lg:gap-x-10">
								{links.map((link) => (
									<Link 
										target="_blank" 
										key={link.label} 
										href={link.href}
										className="px-4 py-2 bg-zinc-800/80 backdrop-blur-sm rounded-full text-zinc-200 flex items-center space-x-2 hover:bg-zinc-700/80 transition-colors duration-300"
									>
										<link.icon className="w-4 h-4" />
										<span>{link.label}</span>
									</Link>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</header>
	);
};
