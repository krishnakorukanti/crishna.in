import Image from "next/image";
import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import type { MDXComponents } from "mdx/types";
import type { SerializeOptions } from "next-mdx-remote/dist/types";
import type { PluggableList } from "unified";

function clsx(...classes: Array<string | undefined | false | null>) {
	return classes.filter(Boolean).join(" ");
}

export const mdxComponents: MDXComponents = {
	h1: ({ className, ...props }) => (
		<h1
			className={clsx(
				"mt-2 scroll-m-20 text-4xl font-bold tracking-tight text-white",
				className,
			)}
			{...props}
		/>
	),
	h2: ({ className, ...props }) => (
		<h2
			className={clsx(
				"mt-10 scroll-m-20 border-b border-b-zinc-800 pb-1 text-3xl font-semibold tracking-tight first:mt-0",
				className,
			)}
			{...props}
		/>
	),
	h3: ({ className, ...props }) => (
		<h3
			className={clsx(
				"mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
				className,
			)}
			{...props}
		/>
	),
	a: ({ className, ...props }) => (
		<Link
			className={clsx(
				"font-medium text-blue-200 underline underline-offset-4 hover:text-blue-300 transition-colors",
				className,
			)}
			{...props}
		/>
	),
	p: ({ className, ...props }) => (
		<p
			className={clsx("leading-7 text-zinc-200 [&:not(:first-child)]:mt-6", className)}
			{...props}
		/>
	),
	ul: ({ className, ...props }) => (
		<ul
			className={clsx("my-6 ml-6 list-disc text-zinc-200 space-y-2", className)}
			{...props}
		/>
	),
	ol: ({ className, ...props }) => (
		<ol
			className={clsx("my-6 ml-6 list-decimal text-zinc-200 space-y-2", className)}
			{...props}
		/>
	),
	li: ({ className, ...props }) => (
		<li className={clsx("mt-2 text-zinc-300", className)} {...props} />
	),
	blockquote: ({ className, ...props }) => (
		<blockquote
			className={clsx(
				"mt-6 border-l-2 border-zinc-600 pl-6 italic text-zinc-400 [&>*]:text-zinc-200",
				className,
			)}
			{...props}
		/>
	),
	img: ({ className, alt = "", ...props }) => (
		// eslint-disable-next-line @next/next/no-img-element
		<img
			className={clsx("rounded-md border border-zinc-800", className)}
			alt={alt}
			{...props}
		/>
	),
	Image,
	pre: ({ className, ...props }) => (
		<pre
			className={clsx(
				"mt-6 mb-4 overflow-x-auto rounded-lg bg-zinc-900/80 py-4 text-sm",
				className,
			)}
			{...props}
		/>
	),
	code: ({ className, ...props }) => (
		<code
			className={clsx(
				"relative rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 font-mono text-sm text-zinc-100",
				className,
			)}
			{...props}
		/>
	),
};

const remarkPlugins: PluggableList = [remarkGfm];

const rehypePlugins: PluggableList = [
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

const mdxOptions: SerializeOptions["mdxOptions"] = {
	remarkPlugins,
	rehypePlugins,
};

export async function renderMdx(source: string) {
	const { content } = await compileMDX({
		source,
		options: {
			mdxOptions,
		},
		components: mdxComponents,
	});

	return content;
}

