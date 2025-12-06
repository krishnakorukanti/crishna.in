import Image from "next/image";
import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { CaseStudySection } from "@/app/components/case-study/CaseStudySection";
import { ProjectMetrics } from "@/app/components/case-study/ProjectMetrics";
import { TechStack } from "@/app/components/case-study/TechStack";
import { ProjectQuote } from "@/app/components/case-study/ProjectQuote";
import { ScreenshotGrid } from "@/app/components/case-study/ScreenshotGrid";

import { clsx } from "@/lib/utils";

export const mdxComponents = {
	h1: ({ className, ...props }: any) => (
		<h1
			className={clsx(
				"mt-2 scroll-m-20 text-4xl font-bold tracking-tight text-gray-900",
				className,
			)}
			{...props}
		/>
	),
	h2: ({ className, ...props }: any) => (
		<h2
			className={clsx(
				"mt-10 scroll-m-20 border-b border-b-gray-200 pb-3 text-3xl font-semibold tracking-tight first:mt-0 text-gray-900",
				className,
			)}
			{...props}
		/>
	),
	h3: ({ className, ...props }: any) => (
		<h3
			className={clsx(
				"mt-8 scroll-m-20 text-2xl font-semibold tracking-tight text-gray-900",
				className,
			)}
			{...props}
		/>
	),
	a: ({ className, ...props }: any) => (
		<Link
			className={clsx(
				"font-medium text-blue-600 underline underline-offset-4 hover:text-blue-700 transition-colors",
				className,
			)}
			{...props}
		/>
	),
	p: ({ className, ...props }: any) => (
		<p
			className={clsx("leading-7 text-gray-600 [&:not(:first-child)]:mt-6", className)}
			{...props}
		/>
	),
	ul: ({ className, ...props }: any) => (
		<ul
			className={clsx("my-6 ml-6 list-disc text-gray-600 space-y-2", className)}
			{...props}
		/>
	),
	ol: ({ className, ...props }: any) => (
		<ol
			className={clsx("my-6 ml-6 list-decimal text-gray-600 space-y-2", className)}
			{...props}
		/>
	),
	li: ({ className, ...props }: any) => (
		<li className={clsx("mt-2 text-gray-600", className)} {...props} />
	),
	blockquote: ({ className, ...props }: any) => (
		<blockquote
			className={clsx(
				"mt-6 border-l-2 border-gray-300 pl-6 italic text-gray-500 [&>*]:text-gray-700",
				className,
			)}
			{...props}
		/>
	),
	img: ({ className, alt = "", src, ...props }: any) => {
		// Check if this is part of a gallery (has alt text suggesting it's a screenshot)
		const isScreenshot = alt?.toLowerCase().includes("screenshot") || 
			alt?.toLowerCase().includes("dashboard") ||
			alt?.toLowerCase().includes("interface") ||
			src?.toString().includes("pocketcare") ||
			src?.toString().includes("biskit") ||
			src?.toString().includes("perc") ||
			src?.toString().includes("soleil") ||
			src?.toString().includes("letmedoit") ||
			src?.toString().includes("survey");

		if (isScreenshot) {
			return (
				<div className="my-8 group">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						className={clsx(
							"rounded-2xl border border-gray-200 shadow-[0_10px_40px_rgba(15,23,42,0.08)] transition-all duration-300 hover:shadow-[0_20px_60px_rgba(15,23,42,0.12)] hover:scale-[1.02] w-full",
							className,
						)}
						alt={alt}
						src={src}
						{...props}
					/>
					{alt && (
						<p className="text-center text-sm text-gray-500 mt-3 font-medium">{alt}</p>
					)}
				</div>
			);
		}

		// Regular images
		return (
			// eslint-disable-next-line @next/next/no-img-element
			<img
				className={clsx("rounded-lg border border-gray-200 shadow-sm my-6", className)}
				alt={alt}
				src={src}
				{...props}
			/>
		);
	},
	Image,
	pre: ({ className, ...props }: any) => (
		<pre
			className={clsx(
				"mt-6 mb-4 overflow-x-auto rounded-lg bg-gray-900 py-4 text-sm",
				className,
			)}
			{...props}
		/>
	),
	code: ({ className, ...props }: any) => (
		<code
			className={clsx(
				"relative rounded border border-gray-200 bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-gray-800",
				className,
			)}
			{...props}
		/>
	),
	// Custom Case Study Components
	CaseStudySection,
	ProjectMetrics,
	TechStack,
	ProjectQuote,
	ScreenshotGrid,
};

const remarkPlugins = [remarkGfm];

const rehypePlugins = [
	rehypeSlug,
	[
		rehypePrettyCode,
		{
			theme: "github-dark",
			onVisitLine(node: { children: unknown[] }) {
				if (node.children.length === 0) {
					node.children = [{ type: "text", value: " " }];
				}
			},
			onVisitHighlightedLine(node: { properties: { className: string[] } }) {
				node.properties.className.push("line--highlighted");
			},
			onVisitHighlightedWord(node: { properties: { className: string[] } }) {
				node.properties.className = ["word--highlighted"];
			},
		},
	],
	[
		rehypeAutolinkHeadings,
		{
			properties: {
				className: ["subheading-anchor"],
				ariaLabel: "Link to section",
			},
		},
	],
];

const mdxOptions = {
	remarkPlugins,
	rehypePlugins,
};

export async function renderMdx(source: string) {
	const { content } = await compileMDX({
		source,
		options: {
			mdxOptions: {
				remarkPlugins,
				rehypePlugins: rehypePlugins as any,
			},
		},
		components: mdxComponents,
	});

	return content;
}
