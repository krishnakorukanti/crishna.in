import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, NotebookPen } from "lucide-react";
import { Metadata } from "next";
import { constructMetadata } from "@/app/components/SEO";
import { BlogPostingJsonLd } from "@/app/components/JsonLd";
import { SEO as SEOConstants } from '@/app/constants/seo';
import { getBlogPostBySlug, getPublishedBlogPosts } from "@/lib/blog";
import { renderMdx } from "@/lib/mdx";
import { StickyHeader } from "@/app/components/StickyHeader";

export const revalidate = 60;

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams(): Promise<{slug: string}[]> {
  const posts = await getPublishedBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  if (!slug) {
    return constructMetadata({
      title: "Case Study Not Found",
      description: "This case study could not be found",
      noIndex: true,
    });
  }
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return constructMetadata({
      title: "Case Study Not Found",
      description: "This case study could not be found",
      noIndex: true,
    });
  }

  return constructMetadata({
    title: `${post.title} | Case Study`,
    description: post.title, // Using title as description since description isn't in frontmatter yet
    url: `${SEOConstants.baseUrl}/case-studies/${post.slug}`,
    ogImage: post.previewImage || `${SEOConstants.baseUrl}/og-image.png`,
    keywords: [...(post.tags || []), "case study", "engineering"],
    authors: [{ name: SEOConstants.names.primary }],
    openGraph: {
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [SEOConstants.names.primary],
      tags: [...(post.tags || []), "case study"],
    },
  });
}

export default async function CaseStudyPage({ params }: Props) {
	const resolvedParams = await params;
	const slug = resolvedParams?.slug;
	if (!slug) {
		notFound();
	}
	const post = await getBlogPostBySlug(slug);

	if (!post) {
		notFound();
	}

	const formattedDate = post.date
		? new Date(post.date).toISOString()
		: new Date().toISOString();

	// Render MDX content
	const content = await renderMdx(post.body);

	return (
		<>
			<div className="min-h-screen bg-[#f4f5f7] text-[#13161f]">
				<BlogPostingJsonLd
					url={`https://crishna.in/case-studies/${post.slug}`}
					headline={post.title}
					datePublished={formattedDate}
					dateModified={formattedDate}
					authorName="Crishna Korukanti"
					description={post.title}
					image={post.previewImage || `https://crishna.in/og-image.png`}
				/>

				<StickyHeader initialText={post.title} />

				<main className="max-w-4xl mx-auto px-4 lg:px-8 pt-28 pb-16 space-y-12">

					{/* Header Section */}
					<div id="case-study-hero" className="bg-white rounded-[32px] p-8 md:p-12 shadow-[0_20px_60px_rgba(15,23,42,0.08)] space-y-6">
						<div className="flex items-center gap-3 text-sm text-gray-500">
							<div className="flex items-center gap-2 font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
								<NotebookPen className="w-4 h-4" />
								{post.category}
							</div>
							{post.date && (
								<time dateTime={formattedDate}>
									{new Date(post.date).toLocaleDateString("en-US", {
										year: "numeric",
										month: "long",
									})}
								</time>
							)}
						</div>
						
						<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
							{post.title}
						</h1>

						<div className="flex flex-wrap gap-2 pt-2">
							{post.tags?.map((tag) => (
								<span key={tag} className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600 font-medium">
									{tag}
								</span>
							))}
						</div>
					</div>

					{/* Content */}
					<article className="bg-white rounded-[32px] p-8 md:p-12 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
						<div className="prose prose-lg prose-gray max-w-none">
							{content}
						</div>
					</article>

					{/* CTA */}
					<div className="bg-white rounded-[32px] p-8 md:p-10 shadow-[0_20px_60px_rgba(15,23,42,0.05)]">
						<div className="max-w-2xl mx-auto text-center space-y-6">
							<h2 className="text-3xl font-bold text-gray-900">Enjoyed this deep dive?</h2>
							<p className="text-lg text-gray-500">
								I write about engineering challenges, AI integration, and product development. Let's discuss how these insights apply to your project.
							</p>
							<Link
								href="mailto:hello@crishna.in"
								className="inline-flex items-center gap-2 rounded-full bg-black text-white px-8 py-4 text-base font-medium shadow-lg shadow-black/20 hover:shadow-xl transition-all"
							>
								Start a conversation
								<ArrowUpRight className="w-5 h-5" />
							</Link>
						</div>
					</div>
				</main>
			</div>
		</>
	);
}

