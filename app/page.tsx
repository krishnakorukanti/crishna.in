import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Twitter, Instagram, ArrowUpRight } from "lucide-react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getPublishedProjects } from "@/lib/projects";
import { StickyHeader } from "./components/StickyHeader";
import { ScrollRevealCard } from "./components/ScrollRevealCard";

const missionSubjects = [ "AI", "Android", "iOS", "Backend", "Frontend"];

const services = [
	{
		title: "Backend Platforms",
		description:
			"Designing resilient APIs, event pipelines, and data stores that scale calmly under real world traffic.",
		tag: "01",
	},
	{
		title: "Frontend Systems",
		description:
			"Shipping responsive, accessible web apps with React/Next.js that stay fast even as your product grows.",
		tag: "02",
	},
	{
		title: "Mobile Apps",
		description:
			"Building native-quality Android, iOS, and cross-platform apps with shared design language and telemetry.",
		tag: "03",
	},
	{
		title: "AI Assistants",
		description:
			"Embedding LLM copilots, retrieval workflows, and guardrails that earn trust with your users and teams.",
		tag: "04",
	},
];

const experiences = [
	{
		company: "Masai School",
		role: "Instructional Associate",
		years: "2020–2021",
	},
	{
		company: "Survey Heart",
		role: "Lead Mobile Developer",
		years: "2021–2023",
	},
	{
		company: "Aiphant Technologies",
		role: "Senior Software Engineer",
		years: "2023–present",
	},
	{
		company: "HelloVibe",
		role: "Founder",
		years: "2025–present",
	},
];

const socialLinks = [
	{ name: "GitHub", href: "https://github.com/krishnakorukanti", icon: Github },
	{ name: "LinkedIn", href: "https://linkedin.com/in/krishnakorukanti", icon: Linkedin },
	{ name: "Twitter", href: "https://twitter.com/crishna_k", icon: Twitter },
	{ name: "Instagram", href: "https://instagram.com/crishna_korukanti", icon: Instagram },
];

const followTags = ["Follow me!", "Instagram", "LinkedIn"];

export default async function Home() {
	const projects = await getPublishedProjects();
	const featuredSlugs = ["letmedoit", "pocketcare", "survey-heart-android"];
	const featuredProjects = featuredSlugs
		.map((slug) => projects.find((p) => p.slug === slug))
		.filter((p): p is (typeof projects)[number] => Boolean(p));

	return (
		<>
			<div className="min-h-screen bg-[#f4f5f7] text-[#13161f]">
				<StickyHeader />

				<main className="max-w-6xl mx-auto px-4 lg:px-8 pt-6 pb-16 space-y-16">
					<header className="flex items-center justify-between mb-8">
						<span className="text-base font-semibold tracking-tight text-gray-900">Full Stack Developer</span>
						<Link 
							href="mailto:hello@crishna.in" 
							className="rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/25 transition-all duration-200"
						>
							Contact
						</Link>
					</header>

					<section id="hero" className="bg-white rounded-[32px] p-8 md:p-10 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
						<div className="grid lg:grid-cols-[1.25fr,0.9fr] gap-10 items-center">
							<div className="space-y-8">
								<div>
									<p className="text-lg text-gray-500 mb-4">
										Hello, I&apos;m Crishna 
									</p>
									<h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight text-gray-900">
										I build products and engineer experiences people love.
									</h1>
								</div>
								<p className="text-lg text-gray-500 max-w-2xl">
									From mastering Android development at a bootcamp to teaching the next generation, then scaling apps to 10M+ downloads. Today, I engineer resilient full-stack AI platforms and lead engineering teams.
								</p>
								<div className="flex flex-wrap gap-3">
									<Link
										href="/projects"
										className="rounded-full bg-black text-white px-6 py-3 text-sm font-medium shadow-lg shadow-black/20"
									>
										View selected work
									</Link>
								</div>
							</div>

							<div className="space-y-5">
								<div className="rounded-[28px] border border-gray-100 bg-white p-5 shadow-sm">
									<div className="flex items-center justify-between mb-4">
										<div>
											<p className="font-semibold text-lg text-gray-900">Crishna Korukanti</p>
											<p className="text-sm text-gray-500">Hyderabad, India </p>
										</div>
										
									</div>
									<div className="rounded-[22px] overflow-hidden h-56 relative bg-gradient-to-br from-sky-50 to-indigo-100 shadow-inner">
										<Image
											src="/profile.jpg"
											alt="Krishna portrait"
											fill
											className="object-cover object-center"
											priority
											sizes="(max-width: 768px) 100vw, 320px"
										/>
									</div>
									<div className="flex items-center gap-2 mt-4 text-sm">
										<span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-emerald-700 font-medium">
											<span className="h-2 w-2 rounded-full bg-emerald-500 mr-2" />
											Open to work
										</span>
										<span className="text-gray-500">Remote & Hyderabad</span>
									</div>
								</div>

								<div className="rounded-[28px] bg-gradient-to-r from-indigo-200 via-purple-200 to-sky-200 p-5 shadow-inner">
									<p className="text-sm font-semibold text-indigo-700 mb-2">
										The most recent brands I happily worked with
									</p>
									<div className="flex flex-wrap gap-3 text-sm font-medium text-gray-700">
										{["LetMeDoIt", "Soleil Space", "SurveyHeart"].map((client) => (
											<span key={client} className="rounded-full bg-white/60 px-4 py-1 shadow-sm">
												{client}
											</span>
										))}
									</div>
								</div>

								<div className="flex items-center gap-3 flex-wrap">
									{socialLinks.map(({ name, href, icon: Icon }) => (
										<Link
											key={name}
											href={href}
											className="h-12 w-12 rounded-full bg-white/90 border border-white shadow-[0_10px_30px_rgba(59,130,246,0.2)] backdrop-blur flex items-center justify-center text-gray-600 hover:text-black transition"
											aria-label={name}
										>
											<Icon className="h-5 w-5" />
										</Link>
									))}
								</div>
							</div>
						</div>
					</section>

					<section className="bg-white rounded-[32px] p-8 md:p-10 shadow-[0_20px_60px_rgba(15,23,42,0.06)] space-y-8">
						<div className="rounded-[28px] bg-[#3aa8b7] text-white p-8 md:p-10 space-y-6">
							<p className="text-2xl md:text-3xl font-semibold leading-snug">
								My mission is to help ambitious teams ship resilient software that feels considered—from backend APIs to
								delightful UIs to AI copilots your customers trust.
							</p>
							<div className="flex flex-wrap gap-6 text-white/80 text-sm uppercase tracking-widest font-medium">
								{missionSubjects.map((subject) => (
									<span key={subject}>{subject}</span>
								))}
							</div>
						</div>

						<div className="space-y-6">
							<h2 className="text-3xl font-semibold text-gray-900">How can I assist you?</h2>
							<div className="grid gap-5 md:grid-cols-2">
								{services.map((service) => (
									<div
										key={service.title}
										className="rounded-[24px] border border-gray-100 bg-white p-6 shadow-sm hover:-translate-y-1 transition-transform"
									>
										<div className="flex items-center justify-between mb-4">
											<span className="text-sm font-semibold text-sky-600">{service.tag}</span>
											<ArrowUpRight className="h-5 w-5 text-gray-400" />
										</div>
										<h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
										<p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
									</div>
								))}
							</div>
						</div>
					</section>

					<section className="bg-white rounded-[32px] p-8 md:p-10 shadow-[0_20px_60px_rgba(15,23,42,0.05)] space-y-8">
						<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
							<div>
								<p className="text-lg text-gray-500">Experience</p>
								<h2 className="text-3xl font-semibold text-gray-900">Professional Journey</h2>
							</div>
							<Link
								href="/resume"
								className="self-start md:self-auto rounded-full bg-black text-white px-6 py-3 text-sm font-medium shadow-lg shadow-black/15"
							>
								View Full Resume
							</Link>
						</div>
						<div className="grid gap-4 md:grid-cols-2">
							{experiences.map((experience) => (
								<div key={experience.company} className="rounded-[24px] border border-gray-100 bg-white p-6 shadow-sm">
									<p className="text-sm uppercase tracking-widest text-gray-400 mb-2">{experience.company}</p>
									<h3 className="text-xl font-semibold text-gray-900 mb-2">{experience.role}</h3>
									<p className="text-sm text-gray-500">{experience.years}</p>
								</div>
							))}
						</div>
					</section>

					<section className="space-y-8 py-8">
						<div className="max-w-6xl mx-auto px-4 lg:px-8">
							<div className="flex items-center justify-between gap-3 flex-wrap mb-8">
								<div>
									<p className="text-lg text-gray-500">Selected Work</p>
									<h2 className="text-3xl font-semibold text-gray-900">Recent projects.</h2>
								</div>
								<Link href="/projects" className="rounded-full border border-gray-200 px-5 py-2 text-sm text-gray-700 flex items-center gap-2">
									See all <ArrowUpRight className="h-4 w-4" />
								</Link>
							</div>
						</div>

						<div className="relative">
							{featuredProjects.map((project, index) => (
								<ScrollRevealCard key={project.slug} index={index}>
									<Link
										href={`/projects/${project.slug}`}
										className="block max-w-4xl mx-auto px-4 lg:px-8"
									>
										<div className="bg-white rounded-[32px] border border-gray-100 shadow-[0_20px_60px_rgba(15,23,42,0.05)] overflow-hidden group">
											<div className="relative h-80 overflow-hidden">
												{project.previewImage ? (
													<Image
														src={project.previewImage}
														alt={project.title}
														fill
														className="object-cover transition-transform duration-500 group-hover:scale-105"
														sizes="(max-width: 768px) 100vw, 1200px"
													/>
												) : (
													<div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />
												)}
											</div>
											<div className="p-8 space-y-4">
												<p className="text-xs uppercase tracking-[0.3em] text-gray-400">Project</p>
												<h3 className="text-3xl font-semibold text-gray-900">{project.title}</h3>
												<p className="text-gray-500 text-lg leading-relaxed">{project.description}</p>
												<div className="flex flex-wrap gap-2">
													{project.tags?.slice(0, 3).map((tag) => (
														<span key={tag} className="rounded-full bg-gray-100 px-4 py-1.5 text-sm text-gray-600">
															{tag}
														</span>
													))}
												</div>
											</div>
										</div>
									</Link>
								</ScrollRevealCard>
							))}
						</div>
					</section>

					<section className="bg-white rounded-[32px] p-8 md:p-10 shadow-[0_20px_60px_rgba(15,23,42,0.05)] grid gap-6 md:grid-cols-[1fr,1.2fr]">
						<div className="rounded-[28px] border border-gray-100 p-8 space-y-6">
							<p className="text-sm text-gray-500 uppercase tracking-wide">Let&apos;s chat</p>
							<h2 className="text-3xl font-semibold text-gray-900">Let’s connect and build something memorable.</h2>
							<Link href="mailto:hello@crishna.in" className="text-gray-900 font-semibold inline-flex items-center gap-2">
								hello@crishna.in
								<ArrowUpRight className="h-5 w-5" />
							</Link>
						</div>
						<div className="rounded-[28px] bg-[#3aa8b7] text-white p-8 flex flex-wrap gap-3 items-center justify-center">
							{followTags.map((tag) => (
								<span key={tag} className="rounded-full border border-white/40 px-4 py-2 text-sm font-medium">
									{tag}
								</span>
							))}
						</div>
					</section>
				</main>
			</div>

			<Analytics />
			<SpeedInsights />
		</>
	);
}
