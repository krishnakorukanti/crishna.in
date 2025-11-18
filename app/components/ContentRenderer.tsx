import { renderMdx } from "@/lib/mdx";
import type { Project } from "@/lib/projects";
import { MdxFallback } from "./mdx-fallback";

interface ContentRendererProps {
	project: Project;
}

export async function ContentRenderer({ project }: ContentRendererProps) {
	try {
		const content = await renderMdx(project.body);

		return (
			<div className="prose prose-zinc prose-invert max-w-none">
				{content}
			</div>
		);
	} catch (error) {
		console.error("MDX render failed", error);

		return (
			<MdxFallback
				content={project.body || project.description}
				title={project.title}
				description={project.description}
			/>
		);
	}
}