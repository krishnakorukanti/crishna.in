import fs from "node:fs/promises";
import path from "node:path";
// @ts-ignore
import matter from "gray-matter";

export type BlogPostFrontmatter = {
	title?: string;
	category?: string;
	date?: string;
	previewImage?: string;
	tags?: string[];
	published?: boolean;
};

export type BlogPost = {
	slug: string;
	path: string;
	body: string;
	title: string;
	category: string;
	date?: string;
	previewImage?: string;
	tags: string[];
	published: boolean;
};

const CONTENT_ROOT = path.join(process.cwd(), "content");
const BLOG_DIR = path.join(CONTENT_ROOT, "blog");

let cachedPosts: BlogPost[] | null = null;

async function collectMarkdownFiles(dir: string): Promise<string[]> {
	try {
		const entries = await fs.readdir(dir, { withFileTypes: true });
		const files = await Promise.all(
			entries.map(async (entry) => {
				const resolvedPath = path.join(dir, entry.name);
				if (entry.isDirectory()) {
					return collectMarkdownFiles(resolvedPath);
				}

				return entry.name.endsWith(".md") || entry.name.endsWith(".mdx")
					? [resolvedPath]
					: [];
			}),
		);

		return files.flat();
	} catch (error) {
		console.error(`Error reading directory ${dir}:`, error);
		return [];
	}
}

function normalizeSlug(filePath: string) {
	return path
		.relative(BLOG_DIR, filePath)
		.replace(/\\/g, "/")
		.replace(/\.(md|mdx)$/, "");
}

function mapTags(value: unknown): string[] {
	if (Array.isArray(value)) {
		return value.filter((tag): tag is string => typeof tag === "string");
	}

	if (typeof value === "string" && value.length > 0) {
		return value.split(",").map((tag) => tag.trim());
	}

	return [];
}

async function parseBlogPostFile(filePath: string): Promise<BlogPost> {
	const fileContents = await fs.readFile(filePath, "utf8");
	const { data, content } = matter(fileContents);

	const slug = normalizeSlug(filePath);
	const body = content.trim();
	const frontmatter = data as BlogPostFrontmatter;

	return {
		slug,
		path: `/blog/${slug}`,
		body,
		title: frontmatter.title ?? slug,
		category: frontmatter.category ?? "General",
		date: frontmatter.date ?? undefined,
		previewImage: frontmatter.previewImage ?? undefined,
		tags: mapTags(frontmatter.tags),
		published: frontmatter.published ?? true,
	};
}

async function loadBlogPosts(): Promise<BlogPost[]> {
	const shouldUseCache = process.env.NODE_ENV === "production";

	if (shouldUseCache && cachedPosts) {
		return cachedPosts;
	}

	const filePaths = await collectMarkdownFiles(BLOG_DIR);
	const posts = await Promise.all(filePaths.map(parseBlogPostFile));

	posts.sort((a, b) => {
		if (!a.date && !b.date) return a.title.localeCompare(b.title);
		if (!a.date) return 1;
		if (!b.date) return -1;
		return new Date(b.date).getTime() - new Date(a.date).getTime();
	});

	if (shouldUseCache) {
		cachedPosts = posts;
	}

	return posts;
}

export async function getAllBlogPosts() {
	return loadBlogPosts();
}

export async function getPublishedBlogPosts() {
	const posts = await loadBlogPosts();
	return posts.filter((post) => post.published);
}

export async function getBlogPostSlugs() {
	const posts = await getPublishedBlogPosts();
	return posts.map((post) => post.slug);
}

export async function getBlogPostBySlug(slug: string) {
	const normalizedSlug = slug.replace(/^\//, "");
	const posts = await loadBlogPosts();
	return posts.find((post) => post.slug === normalizedSlug);
}

