import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Eye } from "lucide-react";
import { constructMetadata } from "../components/SEO";
import { getPublishedProjects } from "@/lib/projects";
import { Redis } from "@upstash/redis";
import { StickyHeader } from "../components/StickyHeader";

export const metadata: Metadata = constructMetadata({
	title: "Projects | Crishna Korukanti",
	description: "Browse through my portfolio of projects, showcasing my expertise in full-stack development, mobile applications, and AI integration.",
});

const redis = Redis.fromEnv();

export default async function ProjectsPage() {
	const allProjects = await getPublishedProjects();

	// Fetch view counts
	const views = (
		await redis.mget<number[]>(
			...allProjects.map((p) => ["pageviews", "projects", p.slug].join(":")),
		)
	).reduce((acc, v, i) => {
		acc[allProjects[i].slug] = v ?? 0;
		return acc;
	}, {} as Record<string, number>);

	return (
		<>
			<div className="min-h-screen bg-[#f4f5f7] text-[#13161f]">
				<StickyHeader initialText="Projects" />

				<main className="max-w-6xl mx-auto px-4 lg:px-8 pt-6 pb-16 space-y-12">
					<header className="flex items-center justify-between mb-8">
						<span className="text-base font-semibold tracking-tight text-gray-900">Projects</span>
						<Link
							href="mailto:hello@crishna.in"
							className="rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/25 transition-all duration-200"
						>
							Book a call
						</Link>
					</header>

					<div id="hero" className="bg-white rounded-[32px] p-8 md:p-12 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
						<div className="max-w-3xl">
							<p className="text-lg text-gray-500 mb-3">Portfolio</p>
							<h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">All Projects</h1>
							<p className="text-xl text-gray-500 leading-relaxed">
								Browse through my complete portfolio of projects, showcasing my expertise across backend systems, frontend applications, mobile development, and AI integration.
							</p>
						</div>
					</div>

					<div className="grid gap-8 md:grid-cols-2">
						{allProjects.map((project) => (
							<Link
								key={project.slug}
								href={`/projects/${project.slug}`}
								className="group"
							>
								<div className="bg-white rounded-[32px] border border-gray-100 shadow-[0_10px_40px_rgba(15,23,42,0.04)] overflow-hidden transition-all duration-300 hover:shadow-[0_20px_60px_rgba(15,23,42,0.08)] hover:-translate-y-1">
									<div className="relative h-72 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
										{project.previewImage ? (
											<Image
												src={project.previewImage}
												alt={project.title}
												fill
												className="object-cover transition-transform duration-500 group-hover:scale-105"
												sizes="(max-width: 768px) 100vw, 50vw"
											/>
										) : (
											<div className="absolute inset-0 flex items-center justify-center">
												<span className="text-6xl opacity-20">{project.emoji || "📦"}</span>
											</div>
										)}
									</div>
									<div className="p-6 space-y-4">
										<div className="flex items-center justify-between">
											<p className="text-xs uppercase tracking-[0.3em] text-gray-400 font-medium">Project</p>
											<div className="flex items-center gap-4">
												<span className="flex items-center gap-1.5 text-xs text-gray-400">
													<Eye className="w-4 h-4" />
													{Intl.NumberFormat("en-US", { notation: "compact" }).format(views[project.slug] || 0)}
												</span>
												<ArrowUpRight className="h-5 w-5 text-gray-400 group-hover:text-gray-900 transition-colors" />
											</div>
										</div>
										<h3 className="text-2xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
											{project.title}
										</h3>
										<p className="text-gray-500 leading-relaxed line-clamp-2">{project.description}</p>
										<div className="flex flex-wrap gap-2 pt-2">
											{project.tags?.slice(0, 4).map((tag) => (
												<span key={tag} className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 font-medium">
													{tag}
												</span>
											))}
										</div>
									</div>
								</div>
							</Link>
						))}
					</div>
				</main>
			</div>
		</>
	);
}
