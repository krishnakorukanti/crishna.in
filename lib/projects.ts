import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type ProjectFrontmatter = {
	title?: string;
	description?: string;
	date?: string;
	url?: string;
	repository?: string;
	previewImage?: string;
	emoji?: string;
	tags?: string[];
	published?: boolean;
};

export type Project = {
	slug: string;
	path: string;
	body: string;
	title: string;
	description: string;
	date?: string;
	url?: string;
	repository?: string;
	previewImage?: string;
	emoji?: string;
	tags: string[];
	published: boolean;
};

const CONTENT_ROOT = path.join(process.cwd(), "content");
const PROJECTS_DIR = path.join(CONTENT_ROOT, "projects");

let cachedProjects: Project[] | null = null;

async function collectMdxFiles(dir: string): Promise<string[]> {
	const entries = await fs.readdir(dir, { withFileTypes: true });
	const files = await Promise.all(
		entries.map(async (entry) => {
			const resolvedPath = path.join(dir, entry.name);
			if (entry.isDirectory()) {
				return collectMdxFiles(resolvedPath);
			}

			return entry.name.endsWith(".mdx") ? [resolvedPath] : [];
		}),
	);

	return files.flat();
}

function normalizeSlug(filePath: string) {
	return path
		.relative(PROJECTS_DIR, filePath)
		.replace(/\\/g, "/")
		.replace(/\.mdx$/, "");
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

async function parseProjectFile(filePath: string): Promise<Project> {
	const fileContents = await fs.readFile(filePath, "utf8");
	const { data, content } = matter(fileContents);

	const slug = normalizeSlug(filePath);
	const body = content.trim();
	const frontmatter = data as ProjectFrontmatter;

	return {
		slug,
		path: `/projects/${slug}`,
		body,
		title: frontmatter.title ?? slug,
		description: frontmatter.description ?? "",
		date: frontmatter.date ?? undefined,
		url: frontmatter.url ?? undefined,
		repository: frontmatter.repository ?? undefined,
		previewImage: frontmatter.previewImage ?? undefined,
		emoji: frontmatter.emoji ?? undefined,
		tags: mapTags(frontmatter.tags),
		published: frontmatter.published ?? true,
	};
}

async function loadProjects(): Promise<Project[]> {
	const shouldUseCache = process.env.NODE_ENV === "production";

	if (shouldUseCache && cachedProjects) {
		return cachedProjects;
	}

	const filePaths = await collectMdxFiles(PROJECTS_DIR);
	const projects = await Promise.all(filePaths.map(parseProjectFile));

	projects.sort((a, b) => {
		if (!a.date && !b.date) return a.title.localeCompare(b.title);
		if (!a.date) return 1;
		if (!b.date) return -1;
		return new Date(b.date).getTime() - new Date(a.date).getTime();
	});

	if (shouldUseCache) {
		cachedProjects = projects;
	}

	return projects;
}

export async function getAllProjects() {
	return loadProjects();
}

export async function getPublishedProjects() {
	const projects = await loadProjects();
	return projects.filter((project) => project.published);
}

export async function getProjectSlugs() {
	const projects = await getPublishedProjects();
	return projects.map((project) => project.slug);
}

export async function getProjectBySlug(slug: string) {
	const normalizedSlug = slug.replace(/^\//, "");
	const projects = await loadProjects();
	return projects.find((project) => project.slug === normalizedSlug);
}

