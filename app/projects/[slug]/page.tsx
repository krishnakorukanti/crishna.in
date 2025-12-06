import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Eye, Github, ExternalLink } from "lucide-react";
import { Redis } from "@upstash/redis";
import { Metadata } from "next";
import { constructMetadata } from "@/app/components/SEO";
import { BlogPostingJsonLd } from "@/app/components/JsonLd";
import { SEO as SEOConstants } from '@/app/constants/seo';
import { getProjectBySlug, getPublishedProjects } from "@/lib/projects";
import { renderMdx } from "@/lib/mdx";
import { StickyHeader } from "@/app/components/StickyHeader";
import { ScreenshotGallery } from "@/app/components/ScreenshotGallery";

// Temporarily removing TableOfContents to fix build errors
// const TableOfContents = dynamic(
//   () => import('@/app/components/TableOfContents').then(mod => mod.TableOfContents),
//   { ssr: false }
// );

export const revalidate = 60;

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const redis = Redis.fromEnv();

export async function generateStaticParams(): Promise<{slug: string}[]> {
  const projects = await getPublishedProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate dynamic metadata for each project page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  if (!slug) {
    return constructMetadata({
      title: "Project Not Found",
      description: "This project could not be found",
      noIndex: true,
    });
  }
  const project = await getProjectBySlug(slug);

  if (!project) {
    return constructMetadata({
      title: "Project Not Found",
      description: "This project could not be found",
      noIndex: true,
    });
  }

  // Extract tags for keywords
  const tags = project.tags || [];
  const projectKeywords = [
    ...tags,
    "project",
    ...SEOConstants.names.variations,
    "portfolio",
    "software development",
    project.title
  ].join(", ");

  // Create a more detailed description
  const detailedDescription = `${project.description} A project by ${SEOConstants.names.primary} built with ${tags.join(", ")}. View the full project details, source code, and implementation.`;

  return constructMetadata({
    title: `${project.title} | ${SEOConstants.names.primary}`,
    description: detailedDescription,
    url: `${SEOConstants.baseUrl}/projects/${project.slug}`,
    ogImage: project.previewImage || `${SEOConstants.baseUrl}/og-image.png`,
    keywords: projectKeywords,
    authors: [{ name: SEOConstants.names.primary }],
    openGraph: {
      type: "article",
      publishedTime: project.date,
      modifiedTime: project.date,
      authors: [SEOConstants.names.primary],
      tags: [...tags, "project", "portfolio", "software development"],
    },
  });
}

export default async function PostPage({ params }: Props) {
	const resolvedParams = await params;
	const slug = resolvedParams?.slug;
	if (!slug) {
		notFound();
	}
	const project = await getProjectBySlug(slug);

	if (!project) {
		notFound();
	}

	const views =
		(await redis.get<number>(["pageviews", "projects", slug].join(":"))) ?? 0;

	const formattedDate = project.date
		? new Date(project.date).toISOString()
		: new Date().toISOString();

	// Get other projects for related section
	const allProjects = await getPublishedProjects();
	const relatedProjects = allProjects
		.filter((p) => p.slug !== slug)
		.slice(0, 3);

	// Extract screenshots from body
	const screenshotRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
	const screenshots: Array<{ src: string; alt: string }> = [];
	let match;
	while ((match = screenshotRegex.exec(project.body)) !== null) {
		screenshots.push({
			alt: match[1],
			src: match[2],
		});
	}

	// Remove screenshot section from content for separate rendering
	const contentWithoutScreenshots = project.body.replace(/## Screenshots[\s\S]*?(?=##|$)/g, "");
	
	// Render MDX content
	const content = await renderMdx(contentWithoutScreenshots);

	return (
		<>
			<div className="min-h-screen bg-[#f4f5f7] text-[#13161f]">
				<BlogPostingJsonLd
					url={`https://crishna.in/projects/${project.slug}`}
					headline={project.title}
					datePublished={formattedDate}
					dateModified={formattedDate}
					authorName="Crishna Korukanti"
					description={project.description}
					image={project.previewImage || `https://crishna.in/og-image.png`}
				/>

				<StickyHeader initialText={project.title} />

				<main className="max-w-5xl mx-auto px-4 lg:px-8 pt-28 pb-16 space-y-12">

					{/* Hero Section */}
					<div id="project-hero" className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(15,23,42,0.08)] overflow-hidden">
						{project.previewImage && (
							<div className="relative h-96 bg-gradient-to-br from-gray-50 to-gray-100">
								<Image
									src={project.previewImage}
									alt={project.title}
									fill
									className="object-cover"
									priority
									sizes="(max-width: 768px) 100vw, 1200px"
								/>
							</div>
						)}
						<div className="p-8 md:p-12 space-y-6">
							<div className="flex items-center gap-4 text-sm text-gray-500">
								<span className="flex items-center gap-1.5">
									<Eye className="w-4 h-4" />
									{Intl.NumberFormat("en-US", { notation: "compact" }).format(views)} views
								</span>
								{project.date && (
									<>
										<span>•</span>
										<time dateTime={formattedDate}>
											{new Date(project.date).toLocaleDateString("en-US", {
												year: "numeric",
												month: "long",
											})}
										</time>
									</>
								)}
							</div>
							<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">{project.title}</h1>
							<p className="text-xl text-gray-500 leading-relaxed">{project.description}</p>

							<div className="flex flex-wrap gap-3 pt-4">
								{project.tags?.map((tag) => (
									<span key={tag} className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-600 font-medium">
										{tag}
									</span>
								))}
							</div>

							<div className="flex flex-wrap gap-3 pt-2">
								{project.url && (
									<Link
										href={project.url}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 rounded-full bg-black text-white px-6 py-3 text-sm font-medium shadow-lg shadow-black/20 hover:shadow-xl transition-all"
									>
										<ExternalLink className="w-4 h-4" />
										Visit Website
									</Link>
								)}
								{project.repository && (
									<Link
										href={`https://github.com/${project.repository}`}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-6 py-3 text-sm font-medium text-gray-700 hover:border-gray-300 transition-all"
									>
										<Github className="w-4 h-4" />
										View Repository
									</Link>
								)}
							</div>
						</div>
					</div>

					{/* Content */}
					<article className="bg-white rounded-[32px] p-8 md:p-12 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
						<div className="prose prose-lg prose-gray max-w-none">
							{content}
						</div>
					</article>

					{/* Screenshots Gallery */}
					{screenshots.length > 0 && (
						<div className="bg-white rounded-[32px] p-8 md:p-12 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
							<ScreenshotGallery images={screenshots} />
						</div>
					)}

					{/* Related Projects */}
					{relatedProjects.length > 0 && (
						<div className="bg-white rounded-[32px] p-8 md:p-10 shadow-[0_20px_60px_rgba(15,23,42,0.05)] space-y-8">
							<div className="flex items-center justify-between">
								<h2 className="text-3xl font-semibold text-gray-900">More Projects</h2>
								<Link
									href="/projects"
									className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
								>
									View all
									<ArrowUpRight className="w-4 h-4" />
								</Link>
							</div>
							<div className="grid gap-6 md:grid-cols-3">
								{relatedProjects.map((relatedProject) => (
									<Link
										key={relatedProject.slug}
										href={`/projects/${relatedProject.slug}`}
										className="group"
									>
										<div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-md hover:-translate-y-1">
											<div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100">
												{relatedProject.previewImage ? (
													<Image
														src={relatedProject.previewImage}
														alt={relatedProject.title}
														fill
														className="object-cover transition-transform duration-500 group-hover:scale-105"
														sizes="(max-width: 768px) 100vw, 400px"
													/>
												) : (
													<div className="absolute inset-0 flex items-center justify-center">
														<span className="text-4xl opacity-20">{relatedProject.emoji || "📦"}</span>
													</div>
												)}
											</div>
											<div className="p-5 space-y-2">
												<h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
													{relatedProject.title}
												</h3>
												<p className="text-sm text-gray-500 line-clamp-2">{relatedProject.description}</p>
											</div>
										</div>
									</Link>
								))}
							</div>
						</div>
					)}

					{/* Contact CTA */}
					<div className="bg-white rounded-[32px] p-8 md:p-10 shadow-[0_20px_60px_rgba(15,23,42,0.05)]">
						<div className="max-w-2xl mx-auto text-center space-y-6">
							<h2 className="text-3xl font-bold text-gray-900">Interested in working together?</h2>
							<p className="text-lg text-gray-500">
								Let's discuss how we can collaborate on your next project.
							</p>
							<Link
								href="mailto:hello@crishna.in"
								className="inline-flex items-center gap-2 rounded-full bg-black text-white px-8 py-4 text-base font-medium shadow-lg shadow-black/20 hover:shadow-xl transition-all"
							>
								Get in touch
								<ArrowUpRight className="w-5 h-5" />
							</Link>
						</div>
					</div>
				</main>
			</div>
		</>
	);
}
